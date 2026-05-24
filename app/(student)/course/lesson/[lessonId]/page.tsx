import { getLessonById, getLessonsForTopic } from '@/lib/db-queries/courses'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import LessonRenderer from '@/components/course/LessonRenderer'
import MarkCompleteButton from '@/components/course/MarkCompleteButton'
import type { LessonContent } from '@/types/lesson-content'

const TYPE_BADGE: Record<string, { bg: string; color: string }> = {
  article:  { bg: '#EAF0FD', color: '#1865F2' },
  video:    { bg: '#F2ECFF', color: '#9059FF' },
  quiz:     { bg: '#FEF3E2', color: '#E07B00' },
  exercise: { bg: '#E6F5F0', color: '#0A7B57' },
}

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params
  const lesson = await getLessonById(lessonId)

  if (!lesson) redirect('/dashboard')

  // Find next lesson in the same topic
  const siblings = await getLessonsForTopic(lesson.topic_id)
  const idx = siblings.findIndex(l => l.id === lessonId)
  const nextLesson = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null

  const badge = TYPE_BADGE[lesson.type] ?? { bg: '#F3F4F6', color: '#6B7280' }
  const isQuiz = lesson.type === 'quiz'

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Top bar */}
      <div style={{
        background: 'white', border: '1px solid #E0E0E0', borderRadius: 8,
        padding: '12px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <Link href={`/course/topic/${lesson.topic_id}`} style={{ color: '#6B7280', fontSize: 13, textDecoration: 'none', flexShrink: 0 }}>
          ← Back to topic
        </Link>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, background: badge.bg, color: badge.color, borderRadius: 4, padding: '2px 8px', fontWeight: 600, textTransform: 'capitalize' }}>
          {lesson.type}
        </span>
        <span style={{ fontSize: 12, color: '#6B7280' }}>~{lesson.estimated_minutes} min</span>
      </div>

      {/* Layout */}
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#1B1B1B', marginTop: 0, marginBottom: 24 }}>
              {lesson.title}
            </h1>

            {lesson.content ? (
              <LessonRenderer
                lessonType={lesson.type}
                content={lesson.content as unknown as LessonContent}
                lessonId={lesson.id}
              />
            ) : (
              <div style={{ color: '#6B7280', fontSize: 14, padding: '40px 0', textAlign: 'center', borderTop: '1px solid #E0E0E0' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>📄</div>
                <div>Content coming soon</div>
              </div>
            )}
          </div>
        </div>

        {/* Right panel — hidden for quiz (quiz is full-width) */}
        {!isQuiz && (
          <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 80 }}>
            {/* Lesson info */}
            <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1B1B1B', marginBottom: 8 }}>This lesson</div>
              <div style={{ fontSize: 13, color: '#6B7280' }}>
                {siblings.findIndex(l => l.id === lessonId) + 1} of {siblings.length} in topic
              </div>
            </div>

            {/* Mark complete */}
            <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Complete this lesson</div>
              <MarkCompleteButton
                lessonId={lessonId}
                nextLessonHref={nextLesson ? `/course/lesson/${nextLesson.id}` : undefined}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
