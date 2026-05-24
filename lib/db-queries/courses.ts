import { pool } from '@/lib/db'
import type { UnitRow, TopicRow, LessonRow } from '@/types/database'
import type { UnitWithTopics, TopicWithLessons } from '@/types/course'

export async function getUnits(): Promise<UnitRow[]> {
  const { rows } = await pool.query<UnitRow>(
    'SELECT * FROM units ORDER BY order_index'
  )
  return rows
}

export async function getUnitById(id: string): Promise<UnitWithTopics | null> {
  const unitResult = await pool.query<UnitRow>(
    'SELECT * FROM units WHERE id = $1',
    [id]
  )
  const unit = unitResult.rows[0]
  if (!unit) return null

  const topicsResult = await pool.query<TopicRow>(
    'SELECT * FROM topics WHERE unit_id = $1 ORDER BY order_index',
    [id]
  )

  return { ...unit, topics: topicsResult.rows }
}

export async function getTopicById(id: string): Promise<TopicWithLessons | null> {
  const topicResult = await pool.query<TopicRow>(
    'SELECT * FROM topics WHERE id = $1',
    [id]
  )
  const topic = topicResult.rows[0]
  if (!topic) return null

  const lessonsResult = await pool.query<LessonRow>(
    'SELECT * FROM lessons WHERE topic_id = $1 ORDER BY order_index',
    [id]
  )

  return { ...topic, lessons: lessonsResult.rows }
}

export async function getLessonById(id: string): Promise<LessonRow | null> {
  const { rows } = await pool.query<LessonRow>(
    'SELECT * FROM lessons WHERE id = $1',
    [id]
  )
  return rows[0] ?? null
}

export async function getLessonsForTopic(topicId: string): Promise<LessonRow[]> {
  const { rows } = await pool.query<LessonRow>(
    'SELECT * FROM lessons WHERE topic_id = $1 ORDER BY order_index',
    [topicId]
  )
  return rows
}
