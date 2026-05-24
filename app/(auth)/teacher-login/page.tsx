'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginTeacher } from '@/app/actions/auth'

export default function TeacherLoginPage() {
  const [state, action, pending] = useActionState(loginTeacher, undefined)

  return (
    <div style={{ background: '#F7F8FC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '0 16px' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <span style={{ color: '#1865F2', fontWeight: 700, fontSize: 20 }}>AIT General Course</span>
      </div>

      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 40, width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', marginBottom: 6, marginTop: 0 }}>Teacher Sign In</h1>
        <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 24, marginTop: 0 }}>
          Enter your teacher PIN to access the portal
        </p>

        <form action={action}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3B3B3B', marginBottom: 6 }}>
              PIN
            </label>
            <input
              name="pin"
              type="password"
              placeholder="••••••"
              autoFocus
              inputMode="numeric"
              style={{ width: '100%', border: '1px solid #E0E0E0', borderRadius: 4, padding: '12px 16px', fontSize: 18, letterSpacing: '0.3em', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
              required
            />
          </div>

          {state?.error && (
            <p style={{ color: '#D92B2B', fontSize: 13, marginBottom: 12, marginTop: 0 }}>{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{ width: '100%', background: '#0A7B57', color: 'white', border: 'none', borderRadius: 4, padding: '14px', fontWeight: 600, fontSize: 15, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.7 : 1, fontFamily: 'inherit' }}
          >
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={{ color: '#6B7280', fontSize: 12, marginTop: 20, marginBottom: 0, textAlign: 'center' }}>
          Teacher accounts are set up by your IT administrator
        </p>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <Link href="/login" style={{ color: '#1865F2', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
            ← Back to student login
          </Link>
        </div>
      </div>
    </div>
  )
}
