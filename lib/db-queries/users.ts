import { pool } from '@/lib/db'
import type { UserRow, ClassRow } from '@/types/database'

export async function getUserById(id: string): Promise<UserRow | null> {
  const { rows } = await pool.query<UserRow>(
    'SELECT id, username, full_name, role, pin_hash, avatar_url, created_at, updated_at FROM users WHERE id = $1',
    [id]
  )
  return rows[0] ?? null
}

export async function getUserByUsername(username: string): Promise<UserRow | null> {
  const { rows } = await pool.query<UserRow>(
    'SELECT id, username, full_name, role, pin_hash, avatar_url, created_at, updated_at FROM users WHERE username = $1',
    [username]
  )
  return rows[0] ?? null
}

export async function getStudentClass(studentId: string): Promise<ClassRow | null> {
  const { rows } = await pool.query<ClassRow>(
    `SELECT c.id, c.name, c.year, c.teacher_id, c.created_at
     FROM classes c
     JOIN class_enrollments ce ON ce.class_id = c.id
     WHERE ce.student_id = $1
     LIMIT 1`,
    [studentId]
  )
  return rows[0] ?? null
}
