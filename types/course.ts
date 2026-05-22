import type {
  UserRow,
  UnitRow,
  TopicRow,
  LessonRow,
  LessonProgressRow,
  TopicProgressRow,
  AssignmentRow,
  AssignmentSubmissionRow,
  ClassRow,
} from './database'

// ============================================================
// RE-EXPORTS
// ============================================================

export type { UserRow as User, UnitRow as Unit, TopicRow as Topic, LessonRow as Lesson }

// ============================================================
// RELATIONS
// ============================================================

export interface UnitWithTopics extends UnitRow {
  topics: TopicRow[]
}

export interface TopicWithLessons extends TopicRow {
  lessons: LessonRow[]
}

export interface LessonWithProgress extends LessonRow {
  progress: LessonProgressRow | null
}

export interface TopicWithProgress extends TopicRow {
  lessons: LessonWithProgress[]
  progress: TopicProgressRow | null
}

export interface UnitWithProgress extends UnitRow {
  topics: TopicWithProgress[]
  total_lessons: number
  completed_lessons: number
  progress_percent: number
}

export interface StudentWithProgress {
  user: UserRow
  completed_lessons: number
  total_lessons: number
  progress_percent: number
  mastery_counts: Record<string, number>
}

export interface AssignmentWithSubmission extends AssignmentRow {
  submission: AssignmentSubmissionRow | null
}

export interface ClassWithTeacher extends ClassRow {
  teacher: Pick<UserRow, 'id' | 'full_name' | 'email' | 'avatar_url'>
}

// ============================================================
// LESSON CONTENT INTERFACES
// ============================================================

export interface ArticleContent {
  type: 'article'
  html: string
  reading_time_minutes: number
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correct_index: number
  explanation?: string
}

export interface QuizContent {
  type: 'quiz'
  questions: QuizQuestion[]
  pass_score: number
}

export interface ExerciseContent {
  type: 'exercise'
  instructions: string
  starter_code?: string
  solution?: string
}

export interface VideoContent {
  type: 'video'
  url: string
  duration_seconds: number
  transcript?: string
}

export type LessonContent = ArticleContent | QuizContent | ExerciseContent | VideoContent

// ============================================================
// DASHBOARD SUMMARY TYPES
// ============================================================

export interface StudentDashboardData {
  units: UnitWithProgress[]
  recent_lessons: LessonWithProgress[]
  pending_assignments: AssignmentWithSubmission[]
  total_time_spent_minutes: number
}

export interface TeacherDashboardData {
  class: ClassWithTeacher
  students: StudentWithProgress[]
  recent_submissions: AssignmentSubmissionRow[]
  ungraded_count: number
}
