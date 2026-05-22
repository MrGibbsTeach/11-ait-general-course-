import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { lessonId, answers, score, maxScore, attemptNumber } = await request.json()
  const passed = score >= maxScore * 0.7

  await pool.query(
    `INSERT INTO quiz_attempts (student_id, lesson_id, answers, score, max_score, passed, attempt_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [session.user.id, lessonId, JSON.stringify(answers), score, maxScore, passed, attemptNumber ?? 1]
  )

  return NextResponse.json({ passed, score, maxScore })
}
