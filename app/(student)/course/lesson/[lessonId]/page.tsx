import { getLessonById } from '@/lib/db-queries/courses'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const TYPE_BADGE_COLOR: Record<string, { bg: string; color: string }> = {
  article:  { bg: '#EAF0FD', color: '#1865F2' },
  video:    { bg: '#F2ECFF', color: '#9059FF' },
  quiz:     { bg: '#FEF3E2', color: '#E07B00' },
  exercise: { bg: '#E6F5F0', color: '#0A7B57' },
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const lesson = await getLessonById(lessonId)

  if (!lesson) redirect('/dashboard')

  const badge = TYPE_BADGE_COLOR[lesson.type] ?? { bg: '#F3F4F6', color: '#6B7280' }

  return (
    // Full width — no sidebar padding applied here (lesson is full-width by design)
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Lesson top bar */}
      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href=".." style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', flexShrink: 0 }}>← Back to topic</Link>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, background: badge.bg, color: badge.color, borderRadius: 4, padding: '2px 8px', fontWeight: 600, textTransform: 'capitalize' }}>{lesson.type}</span>
        <span style={{ fontSize: 12, color: '#6B7280' }}>~{lesson.estimated_minutes} min</span>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1B1B1B', marginTop: 0, marginBottom: 16 }}>{lesson.title}</h1>

            {/* Content placeholder — will be rendered by LessonRenderer in a future phase */}
            <div style={{ color: '#6B7280', fontSize: 14, padding: '40px 0', textAlign: 'center', borderTop: '1px solid #E0E0E0' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
              <div>Lesson content will appear here</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Type: {lesson.type}</div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80 }}>
          {/* In this lesson */}
          <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1B1B1B', marginBottom: 12 }}>In this lesson</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['Introduction', 'Key concepts', 'Practice', 'Summary'].map(obj => (
                <div key={obj} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 3, border: '1.5px solid #D1D5DB', flexShrink: 0 }} />
                  {obj}
                </div>
              ))}
            </div>
          </div>

          {/* Complete button */}
          <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Complete this lesson</div>
            <button
              style={{ width: '100%', background: '#0A7B57', color: 'white', border: 'none', borderRadius: 4, padding: '12px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
            >
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
