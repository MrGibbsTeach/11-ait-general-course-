'use client'

import { useState } from 'react'
import type {
  MCQBlock,
  TrueFalseBlock,
  ShortAnswerBlock,
  MatchingBlock,
  ExerciseQuestionBlock,
} from '@/types/lesson-content'

// ── shared ──────────────────────────────────────────────────

const CORRECT_BG   = '#E6F5F0'
const CORRECT_BD   = '#0A7B57'
const CORRECT_TEXT = '#0A7B57'
const WRONG_BG     = '#FDEAEA'
const WRONG_BD     = '#D92B2B'
const WRONG_TEXT   = '#D92B2B'

function FeedbackBox({ correct, text }: { correct: boolean; text: string }) {
  return (
    <div style={{
      marginTop: 12, padding: '12px 16px', borderRadius: 6,
      background: correct ? CORRECT_BG : '#FEF3E2',
      borderLeft: `4px solid ${correct ? CORRECT_BD : '#E07B00'}`,
      color: correct ? CORRECT_TEXT : '#B45309',
      fontSize: 14,
    }}>
      <strong>{correct ? '✓ Correct! ' : '✗ Incorrect. '}</strong>{text}
    </div>
  )
}

// ── MCQ ─────────────────────────────────────────────────────

function MCQ({ block }: { block: MCQBlock }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
  }

  return (
    <div>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 16, color: '#1B1B1B' }}>{block.text}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {block.options.map((opt, i) => {
          let bg = 'white'
          let border = '1px solid #D1D5DB'
          let color = '#1B1B1B'
          if (submitted) {
            if (i === block.correct_index) { bg = CORRECT_BG; border = `1px solid ${CORRECT_BD}`; color = CORRECT_TEXT }
            else if (i === selected) { bg = WRONG_BG; border = `1px solid ${WRONG_BD}`; color = WRONG_TEXT }
          } else if (i === selected) {
            bg = '#EAF0FD'; border = '1px solid #1865F2'; color = '#1865F2'
          }

          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(i)}
              disabled={submitted}
              style={{
                textAlign: 'left', padding: '12px 16px', borderRadius: 6,
                background: bg, border, color, fontSize: 15, cursor: submitted ? 'default' : 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontWeight: 600, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
              {opt}
              {submitted && i === block.correct_index && <span style={{ float: 'right' }}>✓</span>}
              {submitted && i === selected && i !== block.correct_index && <span style={{ float: 'right' }}>✗</span>}
            </button>
          )
        })}
      </div>

      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          style={{
            marginTop: 14, padding: '10px 22px', background: selected === null ? '#E5E7EB' : '#1865F2',
            color: selected === null ? '#9CA3AF' : 'white', border: 'none', borderRadius: 4,
            fontWeight: 600, fontSize: 14, cursor: selected === null ? 'default' : 'pointer',
          }}
        >
          Check answer
        </button>
      )}

      {submitted && (
        <FeedbackBox correct={selected === block.correct_index} text={block.explanation} />
      )}
    </div>
  )
}

// ── TRUE / FALSE ─────────────────────────────────────────────

function TrueFalse({ block }: { block: TrueFalseBlock }) {
  const [selected, setSelected] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (value: boolean) => {
    if (submitted) return
    setSelected(value)
    setSubmitted(true)
  }

  function btnStyle(value: boolean) {
    let bg = 'white'
    let border = '2px solid #D1D5DB'
    let color = '#374151'
    if (submitted) {
      if (value === block.correct_answer) { bg = CORRECT_BG; border = `2px solid ${CORRECT_BD}`; color = CORRECT_TEXT }
      else if (value === selected) { bg = WRONG_BG; border = `2px solid ${WRONG_BD}`; color = WRONG_TEXT }
    } else if (value === selected) {
      bg = '#EAF0FD'; border = '2px solid #1865F2'; color = '#1865F2'
    }
    return { flex: 1, padding: '14px 0', background: bg, border, color, borderRadius: 6, fontSize: 16, fontWeight: 700, cursor: submitted ? 'default' : 'pointer' }
  }

  return (
    <div>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 16, color: '#1B1B1B' }}>{block.text}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => handleSelect(true)} style={btnStyle(true)}>TRUE</button>
        <button onClick={() => handleSelect(false)} style={btnStyle(false)}>FALSE</button>
      </div>
      {submitted && <FeedbackBox correct={selected === block.correct_answer} text={block.explanation} />}
    </div>
  )
}

// ── SHORT ANSWER ─────────────────────────────────────────────

function ShortAnswer({ block }: { block: ShortAnswerBlock }) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [correct, setCorrect] = useState(false)

  const handleSubmit = () => {
    if (!value.trim()) return
    const normalised = value.trim().toLowerCase()
    const isCorrect = block.accepted_answers.some(a => a.toLowerCase() === normalised)
    setCorrect(isCorrect)
    setSubmitted(true)
  }

  return (
    <div>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 12, color: '#1B1B1B' }}>{block.text}</p>
      <input
        type="text"
        value={value}
        onChange={e => !submitted && setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !submitted && handleSubmit()}
        disabled={submitted}
        placeholder="Type your answer…"
        style={{
          width: '100%', padding: '10px 14px', fontSize: 15, border: '1px solid #D1D5DB',
          borderRadius: 6, background: submitted ? '#F9FAFB' : 'white', color: '#1B1B1B', boxSizing: 'border-box',
        }}
      />
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          style={{
            marginTop: 10, padding: '10px 22px', background: !value.trim() ? '#E5E7EB' : '#1865F2',
            color: !value.trim() ? '#9CA3AF' : 'white', border: 'none', borderRadius: 4,
            fontWeight: 600, fontSize: 14, cursor: !value.trim() ? 'default' : 'pointer',
          }}
        >
          Submit
        </button>
      )}
      {submitted && <FeedbackBox correct={correct} text={block.explanation} />}
    </div>
  )
}

// ── MATCHING ─────────────────────────────────────────────────

function Matching({ block }: { block: MatchingBlock }) {
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState<Record<string, boolean>>({})

  const shuffledDefs = useState(() =>
    [...block.pairs.map(p => p.definition)].sort(() => Math.random() - 0.5)
  )[0]

  const handleTermClick = (term: string) => {
    if (submitted) return
    setSelectedTerm(prev => prev === term ? null : term)
  }

  const handleDefClick = (def: string) => {
    if (submitted || !selectedTerm) return
    setMatches(prev => {
      const next = { ...prev }
      // Remove any previous match for this term or this def
      Object.keys(next).forEach(t => { if (next[t] === def) delete next[t] })
      next[selectedTerm] = def
      return next
    })
    setSelectedTerm(null)
  }

  const handleCheck = () => {
    const res: Record<string, boolean> = {}
    block.pairs.forEach(p => {
      res[p.term] = matches[p.term] === p.definition
    })
    setResults(res)
    setSubmitted(true)
  }

  const allMatched = block.pairs.every(p => matches[p.term])
  const score = submitted ? Object.values(results).filter(Boolean).length : 0

  return (
    <div>
      <p style={{ fontWeight: 500, fontSize: 16, marginBottom: 4, color: '#1B1B1B' }}>{block.text}</p>
      {!submitted && <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>Click a term, then click its matching definition.</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Terms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Terms</div>
          {block.pairs.map(p => {
            const matched = matches[p.term]
            let bg = 'white'
            let border = '1px solid #D1D5DB'
            let color = '#1B1B1B'
            if (submitted) {
              bg = results[p.term] ? CORRECT_BG : WRONG_BG
              border = `1px solid ${results[p.term] ? CORRECT_BD : WRONG_BD}`
              color = results[p.term] ? CORRECT_TEXT : WRONG_TEXT
            } else if (selectedTerm === p.term) {
              bg = '#EAF0FD'; border = '1px solid #1865F2'; color = '#1865F2'
            } else if (matched) {
              bg = '#F0FDF4'; border = '1px solid #86EFAC'
            }
            return (
              <button
                key={p.term}
                onClick={() => handleTermClick(p.term)}
                disabled={submitted}
                style={{
                  textAlign: 'left', padding: '10px 14px', background: bg, border, color,
                  borderRadius: 6, fontSize: 14, cursor: submitted ? 'default' : 'pointer', fontWeight: 500,
                }}
              >
                {p.term}
                {submitted && <span style={{ float: 'right' }}>{results[p.term] ? '✓' : '✗'}</span>}
              </button>
            )
          })}
        </div>

        {/* Definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Definitions</div>
          {shuffledDefs.map(def => {
            const matchedTerm = Object.entries(matches).find(([, d]) => d === def)?.[0]
            const isTarget = selectedTerm !== null && !Object.values(matches).includes(def)
            let bg = 'white'
            let border = '1px solid #D1D5DB'
            if (submitted) {
              if (matchedTerm) {
                bg = results[matchedTerm] ? CORRECT_BG : WRONG_BG
                border = `1px solid ${results[matchedTerm] ? CORRECT_BD : WRONG_BD}`
              }
            } else if (matchedTerm) {
              bg = '#F0FDF4'; border = '1px solid #86EFAC'
            } else if (isTarget) {
              border = '1px dashed #1865F2'
            }
            return (
              <button
                key={def}
                onClick={() => handleDefClick(def)}
                disabled={submitted}
                style={{
                  textAlign: 'left', padding: '10px 14px', background: bg, border,
                  borderRadius: 6, fontSize: 14, cursor: submitted ? 'default' : 'pointer', color: '#1B1B1B',
                }}
              >
                {def}
              </button>
            )
          })}
        </div>
      </div>

      {submitted && (
        <div style={{
          marginTop: 16, padding: '12px 16px', borderRadius: 6,
          background: score === block.pairs.length ? CORRECT_BG : WRONG_BG,
          borderLeft: `4px solid ${score === block.pairs.length ? CORRECT_BD : WRONG_BD}`,
        }}>
          <strong style={{ color: score === block.pairs.length ? CORRECT_TEXT : WRONG_TEXT }}>
            {score}/{block.pairs.length} correct
          </strong>
          {score < block.pairs.length && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#374151' }}>
              <strong>Correct matches:</strong>
              <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                {block.pairs.map(p => (
                  <li key={p.term}><strong>{p.term}</strong> → {p.definition}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!submitted && (
        <button
          onClick={handleCheck}
          disabled={!allMatched}
          style={{
            marginTop: 14, padding: '10px 22px',
            background: allMatched ? '#1865F2' : '#E5E7EB',
            color: allMatched ? 'white' : '#9CA3AF',
            border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 14,
            cursor: allMatched ? 'pointer' : 'default',
          }}
        >
          Check matches
        </button>
      )}
    </div>
  )
}

// ── EXPORT ───────────────────────────────────────────────────

export default function ExerciseQuestion({ block }: { block: ExerciseQuestionBlock }) {
  const wrapper = {
    background: 'white',
    border: '1px solid #E0E0E0',
    borderRadius: 8,
    padding: '20px 24px',
    marginBottom: 24,
  }

  if (block.question_type === 'mcq')          return <div style={wrapper}><MCQ block={block} /></div>
  if (block.question_type === 'true_false')   return <div style={wrapper}><TrueFalse block={block} /></div>
  if (block.question_type === 'short_answer') return <div style={wrapper}><ShortAnswer block={block} /></div>
  if (block.question_type === 'matching')     return <div style={wrapper}><Matching block={block} /></div>
  return null
}
