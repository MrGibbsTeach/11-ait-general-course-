import { pool } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { lessonId, answers, score, maxScore, attemptNumber } = await request.json()
  const passed = score >= (maxScore ?? 10) * 0.7

  let studentId: string | null = null
  try {
    const { auth } = await import('@/lib/auth')
    const session = await auth()
    studentId = session?.user?.id ?? null
  } catch { /* auth unavailable */ }

  if (studentId && lessonId) {
    try {
      await pool.query(
        `INSERT INTO quiz_attempts (student_id, lesson_id, answers, score, max_score, passed, attempt_number)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [studentId, lessonId, JSON.stringify(answers), score, maxScore, passed, attemptNumber ?? 1]
      )
    } catch (err) {
      console.error('quiz submit error:', err)
    }
  }

  return NextResponse.json({ passed, score, maxScore })
}
