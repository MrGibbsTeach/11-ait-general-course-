import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { lessonId, status, timeSpentMinutes } = await request.json()

  // Auth is parked — attempt to get session but proceed regardless
  let studentId: string | null = null
  try {
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    studentId = session?.user?.id ?? null
  } catch { /* auth unavailable */ }

  if (studentId && lessonId) {
    try {
      await pool.query(
        `INSERT INTO lesson_progress (student_id, lesson_id, status, time_spent_minutes, started_at, completed_at)
         VALUES ($1, $2, $3, $4, NOW(), CASE WHEN $3 = 'completed' THEN NOW() ELSE NULL END)
         ON CONFLICT (student_id, lesson_id) DO UPDATE
           SET status = EXCLUDED.status,
               time_spent_minutes = lesson_progress.time_spent_minutes + EXCLUDED.time_spent_minutes,
               completed_at = CASE WHEN EXCLUDED.status = 'completed' THEN NOW() ELSE lesson_progress.completed_at END`,
        [studentId, lessonId, status, timeSpentMinutes ?? 0]
      )
    } catch (err) {
      console.error('progress update error:', err)
    }
  }

  return NextResponse.json({ ok: true })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topicId = searchParams.get('topicId')
  if (!topicId) return NextResponse.json({ error: 'topicId required' }, { status: 400 })

  let studentId: string | null = null
  try {
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    studentId = session?.user?.id ?? null
  } catch { /* auth unavailable */ }

  if (!studentId) return NextResponse.json([])

  const { rows } = await pool.query(
    `SELECT lp.* FROM lesson_progress lp
     JOIN lessons l ON l.id = lp.lesson_id
     WHERE l.topic_id = $1 AND lp.student_id = $2`,
    [topicId, studentId]
  )
  return NextResponse.json(rows)
}
