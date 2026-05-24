import { getTopicById } from '@/lib/db-queries/courses'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { LessonRow } from '@/types/database'

const LESSON_TYPE_ICON: Record<string, string> = {
  article: '📄',
  video: '▶️',
  quiz: '🎯',
  exercise: '✏️',
}

function LessonRow({ lesson, index }: { lesson: LessonRow; index: number }) {
  return (
    <Link href={`/course/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        {/* Status dot */}
        <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #D1D5DB', background: 'white', flexShrink: 0 }} />

        {/* Type icon */}
        <span style={{ fontSize: 18 }}>{LESSON_TYPE_ICON[lesson.type] ?? '📄'}</span>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: '#1B1B1B' }}>
            {index + 1}. {lesson.title}
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>~{lesson.estimated_minutes} min</div>
        </div>

        <div style={{ fontSize: 13, color: '#1865F2', fontWeight: 500, flexShrink: 0 }}>Start →</div>
      </div>
    </Link>
  )
}

export default async function TopicPage({ params }: { params: Promise<{ topicId: string }> }) {
  const { topicId } = await params
  const topic = await getTopicById(topicId)

  if (!topic) redirect('/dashboard')

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: topic.color, borderRadius: 8, padding: '24px 24px 20px', marginBottom: 8, color: 'white' }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{topic.title}</div>
        <div style={{ fontSize: 13, opacity: 0.9 }}>{topic.lessons.length} lessons · ~{topic.estimated_hours}h</div>
      </div>

      {/* Progress bar below header */}
      <div style={{ height: 4, background: '#E0E0E0', borderRadius: '0 0 4px 4px', marginBottom: 24, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: '0%', background: topic.color }} />
      </div>

      {/* Lesson list */}
      <div>
        {topic.lessons.map((lesson, i) => (
          <LessonRow key={lesson.id} lesson={lesson} index={i} />
        ))}

        {topic.lessons.length === 0 && (
          <div style={{ textAlign: 'center', color: '#6B7280', padding: 40, background: 'white', borderRadius: 8, border: '1px solid #E0E0E0' }}>
            No lessons available yet
          </div>
        )}
      </div>
    </div>
  )
}
