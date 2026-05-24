import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { pool } from '@/lib/db'
import type { UserRow } from '@/types/database'

export async function getSession() {
  return auth()
}

export async function requireStudent() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'student') redirect('/login')
  return session
}

export async function requireTeacher() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'teacher') redirect('/teacher-login')
  return session
}

export async function getCurrentUser(): Promise<UserRow | null> {
  const session = await auth()
  if (!session?.user?.id) return null

  const result = await pool.query<UserRow>(
    'SELECT id, username, full_name, role, pin_hash, avatar_url, created_at, updated_at FROM users WHERE id = $1',
    [session.user.id]
  )
  return result.rows[0] ?? null
}
