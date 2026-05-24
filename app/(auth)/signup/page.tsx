'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signupStudent } from '@/app/actions/auth'

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

export default function SignupPage() {
  const [state, action, pending] = useActionState(signupStudent, undefined)

  return (
    <div style={{ background: '#F7F8FC', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', padding: '0 16px' }}>
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <span style={{ color: '#1865F2', fontWeight: 700, fontSize: 20 }}>AIT General Course</span>
      </div>

      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 40, width: '100%', maxWidth: 420 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', marginBottom: 6, marginTop: 0 }}>Create Student Account</h1>
        <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 24, marginTop: 0 }}>
          You'll use your username to sign in each time — no password needed.
        </p>

        <form action={action}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3B3B3B', marginBottom: 6 }}>
              Full Name
            </label>
            <input name="fullName" type="text" placeholder="Alex Smith" autoComplete="name" autoFocus style={inputStyle} required />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3B3B3B', marginBottom: 6 }}>
              Username
            </label>
            <input
              name="username"
              type="text"
              placeholder="alex-smith"
              autoComplete="username"
              style={inputStyle}
              required
            />
            <p style={{ color: '#6B7280', fontSize: 12, marginTop: 4, marginBottom: 0 }}>
              3–20 characters: letters, numbers, hyphens, underscores
            </p>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: '#3B3B3B', marginBottom: 6 }}>
              Class Code
            </label>
            <input
              name="classCode"
              type="text"
              placeholder="ABC123"
              maxLength={6}
              style={{ ...inputStyle, textTransform: 'uppercase', letterSpacing: '0.1em' }}
              required
            />
            <p style={{ color: '#6B7280', fontSize: 12, marginTop: 4, marginBottom: 0 }}>
              Ask your teacher for this code
            </p>
          </div>

          {state?.error && (
            <p style={{ color: '#D92B2B', fontSize: 13, marginBottom: 12, marginTop: 0 }}>{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            style={{ width: '100%', background: '#0A7B57', color: 'white', border: 'none', borderRadius: 4, padding: '14px', fontWeight: 600, fontSize: 15, cursor: pending ? 'not-allowed' : 'pointer', opacity: pending ? 0.7 : 1, fontFamily: 'inherit' }}
          >
            {pending ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: 13, color: '#6B7280', borderTop: '1px solid #E0E0E0', paddingTop: 16 }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#1865F2', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
