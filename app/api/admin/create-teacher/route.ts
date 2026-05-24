import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { pool } from '@/lib/db'

function randomClassCode(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-admin-secret')
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { pin, fullName, className } = body as { pin: string; fullName: string; className: string }

  if (!pin || !fullName || !className) {
    return NextResponse.json({ error: 'pin, fullName, and className are required' }, { status: 400 })
  }

  const pinHash = await bcrypt.hash(String(pin), 12)

  const { rows: userRows } = await pool.query<{ id: string }>(
    'INSERT INTO users (full_name, role, pin_hash) VALUES ($1, $2, $3) RETURNING id',
    [fullName, 'teacher', pinHash]
  )
  const teacherId = userRows[0].id

  let classCode = randomClassCode()
  let attempts = 0
  while (attempts < 10) {
    const exists = await pool.query('SELECT id FROM classes WHERE class_code = $1', [classCode])
    if (!exists.rows[0]) break
    classCode = randomClassCode()
    attempts++
  }

  const { rows: classRows } = await pool.query<{ id: string }>(
    'INSERT INTO classes (name, year, teacher_id, class_code) VALUES ($1, $2, $3, $4) RETURNING id',
    [className, new Date().getFullYear(), teacherId, classCode]
  )

  return NextResponse.json({ success: true, teacherId, classCode, classId: classRows[0].id })
}
