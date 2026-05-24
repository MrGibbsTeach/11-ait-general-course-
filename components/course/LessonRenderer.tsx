import ExerciseQuestion from './ExerciseQuestion'
import QuizRunner from './QuizRunner'
import type {
  ContentBlock,
  ArticleLessonContent,
  QuizLessonContent,
} from '@/types/lesson-content'

// ── Article block renderers ─────────────────────────────────

function Heading({ text, level }: { text: string; level: 2 | 3 }) {
  if (level === 2) {
    return (
      <h2 style={{
        fontSize: 22, fontWeight: 600, color: '#1B1B1B',
        marginTop: 32, marginBottom: 8, paddingBottom: 8,
        borderBottom: '1px solid #E0E0E0',
      }}>
        {text}
      </h2>
    )
  }
  return (
    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1B1B1B', marginTop: 24, marginBottom: 8 }}>
      {text}
    </h3>
  )
}

function Paragraph({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 16, fontWeight: 400, lineHeight: 1.75, color: '#1B1B1B', marginBottom: 16, marginTop: 0 }}>
      {text}
    </p>
  )
}

const CALLOUT_STYLES = {
  info:      { bg: '#EAF0FD', border: '#1865F2', icon: 'ℹ️' },
  tip:       { bg: '#E6F5F0', border: '#0A7B57', icon: '💡' },
  warning:   { bg: '#FEF3E2', border: '#E07B00', icon: '⚠️' },
  important: { bg: '#FDEAEA', border: '#D92B2B', icon: '🚨' },
}

function Callout({ variant, text }: { variant: 'info' | 'tip' | 'warning' | 'important'; text: string }) {
  const s = CALLOUT_STYLES[variant]
  return (
    <div style={{
      background: s.bg, borderLeft: `4px solid ${s.border}`,
      borderRadius: 4, padding: '16px 20px', marginBottom: 20,
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#1B1B1B', paddingLeft: 8 }}>{text}</p>
    </div>
  )
}

function KeyTerm({ term, definition }: { term: string; definition: string }) {
  return (
    <div style={{
      background: '#F7F8FC', border: '1px solid #E0E0E0', borderRadius: 6,
      padding: '12px 16px', marginBottom: 12,
    }}>
      <span style={{ fontSize: 15, fontWeight: 700, color: '#1865F2' }}>{term}</span>
      <span style={{ fontSize: 15, color: '#1B1B1B' }}> — {definition}</span>
    </div>
  )
}

function List({ style, items }: { style: 'bullet' | 'numbered'; items: string[] }) {
  const Tag = style === 'numbered' ? 'ol' : 'ul'
  return (
    <Tag style={{ fontSize: 16, lineHeight: 1.75, paddingLeft: 24, marginBottom: 16, color: '#1B1B1B' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 6 }}>{item}</li>
      ))}
    </Tag>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} style={{
                background: '#F7F8FC', padding: '10px 16px', textAlign: 'left',
                fontWeight: 600, fontSize: 13, color: '#6B7280', textTransform: 'uppercase',
                letterSpacing: '0.04em', border: '1px solid #E0E0E0',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? 'white' : '#FAFAFA' }}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ padding: '10px 16px', border: '1px solid #E0E0E0', color: '#1B1B1B' }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Divider() {
  return <hr style={{ border: 'none', borderTop: '1px solid #E0E0E0', margin: '32px 0' }} />
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'heading':          return <Heading text={block.text} level={block.level} />
    case 'paragraph':        return <Paragraph text={block.text} />
    case 'callout':          return <Callout variant={block.variant} text={block.text} />
    case 'key_term':         return <KeyTerm term={block.term} definition={block.definition} />
    case 'list':             return <List style={block.style} items={block.items} />
    case 'table':            return <Table headers={block.headers} rows={block.rows} />
    case 'divider':          return <Divider />
    case 'exercise_question':return <ExerciseQuestion block={block} />
    default:                 return null
  }
}

// ── Main renderer ────────────────────────────────────────────

interface Props {
  lessonType: 'article' | 'video' | 'quiz' | 'exercise'
  content: ArticleLessonContent | QuizLessonContent
  lessonId: string
}

export default function LessonRenderer({ lessonType, content, lessonId }: Props) {
  if (lessonType === 'quiz' && 'questions' in content) {
    return <QuizRunner content={content as QuizLessonContent} lessonId={lessonId} />
  }

  if ('blocks' in content) {
    return (
      <div>
        {(content as ArticleLessonContent).blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    )
  }

  return (
    <div style={{ color: '#6B7280', textAlign: 'center', padding: '40px 0' }}>
      No content available for this lesson yet.
    </div>
  )
}
