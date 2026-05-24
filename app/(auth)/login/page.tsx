'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { loginStudent } from '@/app/actions/auth'

const inputStyle: React.CSSProperties = {
  width: '100%',
  border: '1px solid #E0E0E0',
  borderRadius: 4,
  padding: '12px 16px',
  fontSize: 14,
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const btnStyle: React.CSSProperties = {
  width: '100%',
  background: '#0A7B57',
  color: 'white',
  border: 'none',
  borderRadius: 4,
  padding: '14px',
  fontWeight: 600,
  fontSize: 15,
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginStudent, undefined)

  return (
    <div style={{ background: '#F7F8FC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '0 16px' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <span style={{ color: '#1865F2', fontWeight: 700, fontSize: 20 }}>AIT General Course</span>
      </div>

      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 40, width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', marginBottom: 6, marginTop: 0 }}>Student Sign In</h1>
        <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 24, marginTop: 0 }}>
          Enter the username given to you by your teacher
        </p>

        <form action={action}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3B3B3B', marginBottom: 6 }}>
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="your-username"
              autoComplete="username"
              autoFocus
              style={inputStyle}
              required
            />
          </div>

          {state?.error && (
            <p style={{ color: '#D92B2B', fontSize: 13, marginBottom: 12, marginTop: 0 }}>{state.error}</p>
          )}

          <button type="submit" disabled={pending} style={{ ...btnStyle, opacity: pending ? 0.7 : 1, cursor: pending ? 'not-allowed' : 'pointer' }}>
            {pending ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: 24, borderTop: '1px solid #E0E0E0', paddingTop: 20, fontSize: 13, color: '#6B7280', textAlign: 'center' }}>
          <div>
            New student?{' '}
            <Link href="/signup" style={{ color: '#1865F2', fontWeight: 500, textDecoration: 'none' }}>
              Create account
            </Link>
          </div>
          <div style={{ marginTop: 10 }}>
            <Link href="/teacher-login" style={{ color: '#1865F2', fontWeight: 500, textDecoration: 'none' }}>
              Teacher? Sign in here →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
