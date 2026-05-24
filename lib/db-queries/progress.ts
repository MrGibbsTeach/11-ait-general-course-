import { pool } from '@/lib/db'
import type { LessonProgressRow, TopicProgressRow, AssignmentRow } from '@/types/database'

interface RecentLesson {
  lesson_id: string
  lesson_title: string
  topic_title: string
  topic_color: string
  completed_at: string | null
  score: number | null
  max_score: number | null
}

interface NextLesson {
  lesson_id: string
  lesson_title: string
  topic_id: string
  topic_title: string
  topic_color: string
  estimated_minutes: number
}

export interface StudentDashboardData {
  recentLessons: RecentLesson[]
  topicProgress: (TopicProgressRow & { topic_title: string; topic_color: string })[]
  nextLesson: NextLesson | null
  upcomingAssignments: AssignmentRow[]
}

export async function getStudentDashboardData(studentId: string): Promise<StudentDashboardData> {
  const [recentResult, progressResult, nextResult, assignmentsResult] = await Promise.all([
    // Last 5 completed lessons
    pool.query<RecentLesson>(
      `SELECT lp.lesson_id, l.title AS lesson_title, t.title AS topic_title,
              t.color AS topic_color, lp.completed_at,
              qa.score, qa.max_score
       FROM lesson_progress lp
       JOIN lessons l ON l.id = lp.lesson_id
       JOIN topics t ON t.id = l.topic_id
       LEFT JOIN LATERAL (
         SELECT score, max_score FROM quiz_attempts
         WHERE student_id = lp.student_id AND lesson_id = lp.lesson_id
         ORDER BY completed_at DESC LIMIT 1
       ) qa ON true
       WHERE lp.student_id = $1 AND lp.status = 'completed'
       ORDER BY lp.completed_at DESC
       LIMIT 5`,
      [studentId]
    ),

    // Topic progress
    pool.query<TopicProgressRow & { topic_title: string; topic_color: string }>(
      `SELECT tp.*, t.title AS topic_title, t.color AS topic_color
       FROM topic_progress tp
       JOIN topics t ON t.id = tp.topic_id
       WHERE tp.student_id = $1
       ORDER BY t.order_index`,
      [studentId]
    ),

    // Next incomplete lesson
    pool.query<NextLesson>(
      `SELECT l.id AS lesson_id, l.title AS lesson_title,
              t.id AS topic_id, t.title AS topic_title,
              t.color AS topic_color, l.estimated_minutes
       FROM lessons l
       JOIN topics t ON t.id = l.topic_id
       JOIN units u ON u.id = t.unit_id
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.student_id = $1
       WHERE u.status = 'available'
         AND (lp.status IS NULL OR lp.status != 'completed')
       ORDER BY u.order_index, t.order_index, l.order_index
       LIMIT 1`,
      [studentId]
    ),

    // Upcoming assignments (next 3)
    pool.query<AssignmentRow>(
      `SELECT a.*
       FROM assignments a
       JOIN class_enrollments ce ON ce.class_id = a.class_id
       WHERE ce.student_id = $1
         AND (a.due_date IS NULL OR a.due_date > NOW())
       ORDER BY a.due_date ASC NULLS LAST
       LIMIT 3`,
      [studentId]
    ),
  ])

  return {
    recentLessons: recentResult.rows,
    topicProgress: progressResult.rows,
    nextLesson: nextResult.rows[0] ?? null,
    upcomingAssignments: assignmentsResult.rows,
  }
}

export async function updateLessonProgress(
  studentId: string,
  lessonId: string,
  data: { status: string; timeSpentMinutes?: number }
) {
  await pool.query(
    `INSERT INTO lesson_progress (student_id, lesson_id, status, time_spent_minutes, started_at, completed_at)
     VALUES ($1, $2, $3, $4, NOW(), CASE WHEN $3 = 'completed' THEN NOW() ELSE NULL END)
     ON CONFLICT (student_id, lesson_id) DO UPDATE
       SET status = EXCLUDED.status,
           time_spent_minutes = lesson_progress.time_spent_minutes + EXCLUDED.time_spent_minutes,
           completed_at = CASE WHEN EXCLUDED.status = 'completed' THEN NOW() ELSE lesson_progress.completed_at END`,
    [studentId, lessonId, data.status, data.timeSpentMinutes ?? 0]
  )
}

export async function updateTopicProgress(studentId: string, topicId: string) {
  const { rows } = await pool.query<{ total: string; completed: string }>(
    `SELECT COUNT(*) AS total,
            COUNT(*) FILTER (WHERE lp.status = 'completed') AS completed
     FROM lessons l
     LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.student_id = $1
     WHERE l.topic_id = $2`,
    [studentId, topicId]
  )
  const total = parseInt(rows[0].total)
  const completed = parseInt(rows[0].completed)

  const mastery: string =
    completed === 0 ? 'not_started' :
    completed < total * 0.5 ? 'developing' :
    completed < total ? 'achieved' :
    'mastered'

  await pool.query(
    `INSERT INTO topic_progress (student_id, topic_id, mastery_level, lessons_completed, lessons_total, last_accessed_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (student_id, topic_id) DO UPDATE
       SET mastery_level = EXCLUDED.mastery_level,
           lessons_completed = EXCLUDED.lessons_completed,
           lessons_total = EXCLUDED.lessons_total,
           last_accessed_at = NOW()`,
    [studentId, topicId, mastery, completed, total]
  )
}
