import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lessonId, status, timeSpentMinutes } = await request.json()

  await pool.query(
    `INSERT INTO lesson_progress (student_id, lesson_id, status, time_spent_minutes, started_at, completed_at)
     VALUES ($1, $2, $3, $4, NOW(), CASE WHEN $3 = 'completed' THEN NOW() ELSE NULL END)
     ON CONFLICT (student_id, lesson_id) DO UPDATE
       SET status = EXCLUDED.status,
           time_spent_minutes = lesson_progress.time_spent_minutes + EXCLUDED.time_spent_minutes,
           completed_at = CASE WHEN EXCLUDED.status = 'completed' THEN NOW() ELSE lesson_progress.completed_at END`,
    [session.user.id, lessonId, status, timeSpentMinutes ?? 0]
  )

  return NextResponse.json({ ok: true })
}
