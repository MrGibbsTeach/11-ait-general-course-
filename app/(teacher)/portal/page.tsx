import { pool } from '@/lib/db'
import Link from 'next/link'

interface UnitRow {
  id: string
  title: string
  subtitle: string | null
  semester: number
  order_index: number
  status: string
  color: string
  icon: string | null
}

interface TopicRow {
  id: string
  unit_id: string
  title: string
  order_index: number
  color: string
  icon: string | null
  estimated_hours: number
  lesson_count: string
  quiz_count: string
}

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: string; color: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, background: color + '22', color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#1B1B1B' }}>{value}</div>
        <div style={{ fontSize: 13, color: '#6B7280' }}>{label}</div>
      </div>
    </div>
  )
}

export default async function TeacherPortalPage() {
  const [unitsResult, topicsResult, countResult] = await Promise.all([
    pool.query<UnitRow>('SELECT * FROM units ORDER BY order_index'),
    pool.query<TopicRow>(
      `SELECT t.*,
              COUNT(l.id) FILTER (WHERE l.type != 'quiz') AS lesson_count,
              COUNT(l.id) FILTER (WHERE l.type = 'quiz') AS quiz_count
       FROM topics t
       LEFT JOIN lessons l ON l.topic_id = t.id
       GROUP BY t.id
       ORDER BY t.unit_id, t.order_index`
    ),
    pool.query<{ unit_count: string; topic_count: string; lesson_count: string; quiz_count: string }>(
      `SELECT
         (SELECT COUNT(*) FROM units) AS unit_count,
         (SELECT COUNT(*) FROM topics) AS topic_count,
         (SELECT COUNT(*) FROM lessons WHERE type != 'quiz') AS lesson_count,
         (SELECT COUNT(*) FROM lessons WHERE type = 'quiz') AS quiz_count`
    ),
  ])

  const units = unitsResult.rows
  const allTopics = topicsResult.rows
  const counts = countResult.rows[0]

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', margin: '0 0 4px' }}>Course Overview</h1>
        <div style={{ fontSize: 13, color: '#6B7280' }}>AIT General Course · {new Date().getFullYear()}</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 36 }}>
        <StatCard label="Units" value={parseInt(counts.unit_count)} icon="📚" color="#1865F2" />
        <StatCard label="Topics" value={parseInt(counts.topic_count)} icon="📂" color="#0A7B57" />
        <StatCard label="Lessons" value={parseInt(counts.lesson_count)} icon="📄" color="#E07B00" />
        <StatCard label="Quizzes" value={parseInt(counts.quiz_count)} icon="✅" color="#7C3AED" />
      </div>

      {/* Units and Topics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {units.map(unit => {
          const topics = allTopics.filter(t => t.unit_id === unit.id)
          const totalLessons = topics.reduce((s, t) => s + parseInt(t.lesson_count), 0)
          const totalQuizzes = topics.reduce((s, t) => s + parseInt(t.quiz_count), 0)

          return (
            <div key={unit.id} style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 10, overflow: 'hidden' }}>
              {/* Unit header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: unit.color + '22', color: unit.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>
                  {unit.icon ?? '📚'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#1B1B1B' }}>
                    Unit {unit.order_index}: {unit.title}
                  </div>
                  {unit.subtitle && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 1 }}>{unit.subtitle}</div>}
                </div>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#6B7280' }}>
                  <span>{topics.length} topics</span>
                  <span>{totalLessons} lessons</span>
                  <span>{totalQuizzes} quizzes</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: unit.status === 'available' ? '#E6F5F0' : '#F3F4F6',
                    color: unit.status === 'available' ? '#0A7B57' : '#6B7280',
                  }}>
                    {unit.status === 'available' ? 'Live' : 'Coming soon'}
                  </span>
                </div>
              </div>

              {/* Topics */}
              <div>
                {topics.map((topic, i) => (
                  <div key={topic.id} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '12px 20px',
                    borderBottom: i < topics.length - 1 ? '1px solid #F5F5F5' : undefined,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: topic.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1B1B1B' }}>
                        Topic {topic.order_index}: {topic.title}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#9CA3AF' }}>
                      <span>{parseInt(topic.lesson_count)} lessons</span>
                      {parseInt(topic.quiz_count) > 0 && <span>{parseInt(topic.quiz_count)} quiz</span>}
                      <span>{topic.estimated_hours}h est.</span>
                    </div>
                    <Link href={`/course/topic/${topic.id}`} style={{ fontSize: 12, color: '#1865F2', textDecoration: 'none', fontWeight: 500 }}>
                      Preview →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
