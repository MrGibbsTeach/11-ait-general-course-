'use client'

import { useState } from 'react'

interface Props {
  lessonId: string
  nextLessonHref?: string
}

export default function MarkCompleteButton({ lessonId, nextLessonHref }: Props) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [toast, setToast] = useState(false)

  async function handleComplete() {
    if (state !== 'idle') return
    setState('loading')
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, status: 'completed', timeSpentMinutes: 1 }),
      })
    } catch {
      // best-effort — show success regardless
    }
    setState('done')
    setToast(true)
    setTimeout(() => setToast(false), 3000)
  }

  if (state === 'done') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
        {toast && (
          <div style={{
            position: 'absolute', top: -48, left: '50%', transform: 'translateX(-50%)',
            background: '#0A7B57', color: 'white', borderRadius: 6,
            padding: '8px 16px', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>
            +100 pts earned!
          </div>
        )}
        <div style={{
          width: '100%', background: '#0A7B57', color: 'white',
          borderRadius: 4, padding: '12px', fontWeight: 600, fontSize: 14, textAlign: 'center',
        }}>
          ✓ Complete
        </div>
        {nextLessonHref && (
          <a
            href={nextLessonHref}
            style={{
              width: '100%', background: '#1865F2', color: 'white',
              borderRadius: 4, padding: '12px', fontWeight: 600, fontSize: 14,
              textAlign: 'center', textDecoration: 'none', display: 'block',
            }}
          >
            Next lesson →
          </a>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={handleComplete}
      disabled={state === 'loading'}
      style={{
        width: '100%', background: state === 'loading' ? '#6B7280' : '#0A7B57',
        color: 'white', border: 'none', borderRadius: 4,
        padding: '12px', fontWeight: 600, fontSize: 14,
        cursor: state === 'loading' ? 'default' : 'pointer',
      }}
    >
      {state === 'loading' ? 'Saving…' : 'Mark Complete'}
    </button>
  )
}
