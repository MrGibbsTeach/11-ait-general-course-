import { pool } from '@/lib/db'

interface TopicSummary {
  topic_id: string
  topic_title: string
  topic_color: string
  unit_title: string
  lesson_count: string
  completed_count: string
  student_count: string
}

export default async function ProgressPage() {
  // Get lesson completion counts per topic (across all students)
  const { rows: topics } = await pool.query<TopicSummary>(
    `SELECT t.id AS topic_id, t.title AS topic_title, t.color AS topic_color,
            u.title AS unit_title,
            COUNT(DISTINCT l.id) AS lesson_count,
            COUNT(lp.id) FILTER (WHERE lp.status = 'completed') AS completed_count,
            COUNT(DISTINCT lp.student_id) FILTER (WHERE lp.status = 'completed') AS student_count
     FROM topics t
     JOIN units u ON u.id = t.unit_id
     LEFT JOIN lessons l ON l.topic_id = t.id
     LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id
     GROUP BY t.id, t.title, t.color, u.title
     ORDER BY u.order_index, t.order_index`
  )

  const totalCompletions = topics.reduce((s, t) => s + parseInt(t.completed_count), 0)
  const hasData = totalCompletions > 0

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B1B1B', margin: '0 0 4px' }}>Progress Reports</h1>
        <div style={{ fontSize: 13, color: '#6B7280' }}>Lesson completion across all students</div>
      </div>

      {!hasData ? (
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 10, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📈</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1B1B1B', marginBottom: 8 }}>No progress data yet</div>
          <div style={{ fontSize: 13, color: '#6B7280' }}>
            Progress will appear here once students start completing lessons.
          </div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 10, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#F7F8FC', borderBottom: '1px solid #E0E0E0' }}>
                <th style={{ textAlign: 'left', padding: '12px 20px', color: '#6B7280', fontWeight: 600 }}>Topic</th>
                <th style={{ textAlign: 'left', padding: '12px 16px', color: '#6B7280', fontWeight: 600 }}>Unit</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', color: '#6B7280', fontWeight: 600 }}>Lessons</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', color: '#6B7280', fontWeight: 600 }}>Completions</th>
                <th style={{ textAlign: 'right', padding: '12px 20px', color: '#6B7280', fontWeight: 600 }}>Students</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t, i) => (
                <tr key={t.topic_id} style={{ borderBottom: i < topics.length - 1 ? '1px solid #F5F5F5' : undefined }}>
                  <td style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: t.topic_color, flexShrink: 0 }} />
                    <span style={{ fontWeight: 500, color: '#1B1B1B' }}>{t.topic_title}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#6B7280' }}>{t.unit_title}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: '#6B7280' }}>{t.lesson_count}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: parseInt(t.completed_count) > 0 ? '#0A7B57' : '#9CA3AF', fontWeight: 600 }}>
                    {t.completed_count}
                  </td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', color: '#6B7280' }}>{t.student_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
