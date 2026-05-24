'use client'

import { useState } from 'react'
import type { QuizLessonContent, QuizQuestion } from '@/types/lesson-content'

interface Props {
  content: QuizLessonContent
  lessonId: string
}

type Answers = Record<string, number | boolean>

interface Result {
  score: number
  maxScore: number
  passed: boolean
  perQuestion: Record<string, boolean>
}

// ── Question cards ───────────────────────────────────────────

function MCQCard({ q, idx, answer, onChange, submitted, result }: {
  q: QuizQuestion; idx: number; answer: number | undefined
  onChange: (v: number) => void; submitted: boolean; result?: boolean
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 12, color: '#1B1B1B' }}>
        <span style={{ color: '#6B7280', marginRight: 8 }}>{idx + 1}.</span>
        {q.text}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.options!.map((opt, i) => {
          let bg = 'white', border = '1px solid #D1D5DB', color = '#1B1B1B'
          if (submitted) {
            if (i === q.correct_index) { bg = '#E6F5F0'; border = '1px solid #0A7B57'; color = '#0A7B57' }
            else if (i === answer) { bg = '#FDEAEA'; border = '1px solid #D92B2B'; color = '#D92B2B' }
          } else if (i === answer) {
            bg = '#EAF0FD'; border = '1px solid #1865F2'; color = '#1865F2'
          }
          return (
            <button key={i} onClick={() => !submitted && onChange(i)}
              disabled={submitted}
              style={{ textAlign: 'left', padding: '10px 14px', borderRadius: 6, background: bg, border, color, fontSize: 14, cursor: submitted ? 'default' : 'pointer' }}>
              <span style={{ fontWeight: 600, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
              {submitted && i === q.correct_index && <span style={{ float: 'right' }}>✓</span>}
              {submitted && i === answer && i !== q.correct_index && <span style={{ float: 'right' }}>✗</span>}
            </button>
          )
        })}
      </div>
      {submitted && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>{q.explanation}</div>
      )}
    </div>
  )
}

function TFCard({ q, idx, answer, onChange, submitted }: {
  q: QuizQuestion; idx: number; answer: boolean | undefined
  onChange: (v: boolean) => void; submitted: boolean
}) {
  function style(val: boolean) {
    let bg = 'white', border = '2px solid #D1D5DB', color = '#374151'
    if (submitted) {
      if (val === q.correct_answer) { bg = '#E6F5F0'; border = '2px solid #0A7B57'; color = '#0A7B57' }
      else if (val === answer) { bg = '#FDEAEA'; border = '2px solid #D92B2B'; color = '#D92B2B' }
    } else if (val === answer) { bg = '#EAF0FD'; border = '2px solid #1865F2'; color = '#1865F2' }
    return { flex: 1, padding: '12px 0', background: bg, border, color, borderRadius: 6, fontSize: 15, fontWeight: 700, cursor: submitted ? 'default' : 'pointer' }
  }
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 12, color: '#1B1B1B' }}>
        <span style={{ color: '#6B7280', marginRight: 8 }}>{idx + 1}.</span>{q.text}
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => !submitted && onChange(true)} style={style(true)} disabled={submitted}>TRUE</button>
        <button onClick={() => !submitted && onChange(false)} style={style(false)} disabled={submitted}>FALSE</button>
      </div>
      {submitted && (
        <div style={{ marginTop: 10, fontSize: 13, color: '#6B7280', fontStyle: 'italic' }}>{q.explanation}</div>
      )}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────

export default function QuizRunner({ content, lessonId }: Props) {
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const allAnswered = content.questions.every(q => answers[q.id] !== undefined)

  function setAnswer(id: string, val: number | boolean) {
    setAnswers(prev => ({ ...prev, [id]: val }))
  }

  async function handleSubmit() {
    if (!allAnswered || submitting) return
    setSubmitting(true)

    // Grade locally
    let score = 0
    const perQuestion: Record<string, boolean> = {}
    content.questions.forEach(q => {
      let correct = false
      if (q.type === 'mcq')        correct = answers[q.id] === q.correct_index
      if (q.type === 'true_false') correct = answers[q.id] === q.correct_answer
      perQuestion[q.id] = correct
      if (correct) score++
    })
    const maxScore = content.questions.length
    const passed = score >= content.pass_score

    // Persist (best-effort)
    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, answers, score, maxScore, attemptNumber: 1 }),
      })
    } catch { /* ignore */ }

    setResult({ score, maxScore, passed, perQuestion })
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div>
      {/* Quiz header */}
      <div style={{ background: '#F7F8FC', border: '1px solid #E0E0E0', borderRadius: 8, padding: '16px 20px', marginBottom: 28 }}>
        <div style={{ fontSize: 14, color: '#6B7280' }}>
          {content.questions.length} questions · Pass mark: {content.pass_score}/{content.questions.length}
        </div>
        {!submitted && (
          <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Answer all questions, then click Submit Quiz.</div>
        )}
      </div>

      {/* Questions */}
      {content.questions.map((q, idx) => {
        if (q.type === 'mcq') return (
          <MCQCard key={q.id} q={q} idx={idx}
            answer={answers[q.id] as number | undefined}
            onChange={v => setAnswer(q.id, v)}
            submitted={submitted} result={result?.perQuestion[q.id]} />
        )
        if (q.type === 'true_false') return (
          <TFCard key={q.id} q={q} idx={idx}
            answer={answers[q.id] as boolean | undefined}
            onChange={v => setAnswer(q.id, v)}
            submitted={submitted} />
        )
        return null
      })}

      {/* Submit / Result */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          style={{
            padding: '12px 28px', background: allAnswered ? '#1865F2' : '#E5E7EB',
            color: allAnswered ? 'white' : '#9CA3AF', border: 'none', borderRadius: 4,
            fontWeight: 700, fontSize: 15, cursor: allAnswered ? 'pointer' : 'default',
          }}
        >
          {submitting ? 'Submitting…' : 'Submit Quiz'}
        </button>
      ) : result && (
        <div style={{
          background: result.passed ? '#E6F5F0' : '#FDEAEA',
          border: `2px solid ${result.passed ? '#0A7B57' : '#D92B2B'}`,
          borderRadius: 8, padding: '20px 24px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: result.passed ? '#0A7B57' : '#D92B2B', marginBottom: 8 }}>
            {result.score}/{result.maxScore}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: result.passed ? '#0A7B57' : '#D92B2B' }}>
            {result.passed ? '🎉 Passed!' : '✗ Not quite — review and try again'}
          </div>
          <div style={{ fontSize: 14, color: '#6B7280', marginTop: 6 }}>
            {result.passed
              ? `Well done! You scored ${result.score} out of ${result.maxScore}.`
              : `You scored ${result.score} out of ${result.maxScore}. Pass mark is ${content.pass_score}.`}
          </div>
        </div>
      )}
    </div>
  )
}
