'use server'

import { signIn, signOut } from '@/lib/auth'
import { AuthError } from 'next-auth'
import { pool } from '@/lib/db'

export type AuthState = { error: string } | undefined

export async function loginStudent(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const username = (formData.get('username') as string)?.trim().toLowerCase()
  if (!username) return { error: 'Please enter your username' }

  try {
    await signIn('student', { username, redirectTo: '/dashboard' })
  } catch (err) {
    if (err instanceof AuthError) return { error: 'Username not found. Check with your teacher.' }
    throw err
  }
}

export async function signupStudent(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const username = (formData.get('username') as string)?.trim().toLowerCase()
  const fullName = (formData.get('fullName') as string)?.trim()
  const classCode = (formData.get('classCode') as string)?.trim().toUpperCase()

  if (!username || !fullName || !classCode) return { error: 'All fields are required' }

  if (!/^[a-z0-9_-]{3,20}$/.test(username)) {
    return { error: 'Username must be 3–20 characters: letters, numbers, - or _' }
  }

  const classResult = await pool.query(
    'SELECT id FROM classes WHERE class_code = $1',
    [classCode]
  )
  if (!classResult.rows[0]) return { error: 'Class code not found. Ask your teacher.' }

  const existing = await pool.query(
    'SELECT id FROM users WHERE username = $1',
    [username]
  )
  if (existing.rows[0]) return { error: 'Username already taken. Try another.' }

  const { rows } = await pool.query<{ id: string }>(
    'INSERT INTO users (username, full_name, role) VALUES ($1, $2, $3) RETURNING id',
    [username, fullName, 'student']
  )
  await pool.query(
    'INSERT INTO class_enrollments (class_id, student_id) VALUES ($1, $2)',
    [classResult.rows[0].id, rows[0].id]
  )

  try {
    await signIn('student', { username, redirectTo: '/dashboard' })
  } catch (err) {
    if (err instanceof AuthError) return { error: 'Account created but sign-in failed. Try logging in.' }
    throw err
  }
}

export async function loginTeacher(
  _state: AuthState,
  formData: FormData
): Promise<AuthState> {
  const pin = (formData.get('pin') as string)?.trim()
  if (!pin) return { error: 'Please enter your PIN' }

  try {
    await signIn('teacher', { pin, redirectTo: '/portal' })
  } catch (err) {
    if (err instanceof AuthError) return { error: 'Incorrect PIN' }
    throw err
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' })
}
