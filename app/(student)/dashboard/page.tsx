import { requireStudent } from '@/lib/auth-helpers'
import { getStudentDashboardData } from '@/lib/db-queries/progress'
import Link from 'next/link'

function ProgressBar({ value, color = '#1865F2' }: { value: number; color?: string }) {
  return (
    <div style={{ height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${Math.min(100, value)}%`, background: color, borderRadius: 3, transition: 'width 0.3s' }} />
    </div>
  )
}

function DueBadge({ due }: { due: string | null }) {
  if (!due) return <span style={{ fontSize: 11, color: '#6B7280' }}>No due date</span>
  const days = Math.ceil((new Date(due).getTime() - Date.now()) / 86400000)
  const color = days < 3 ? '#D92B2B' : days < 7 ? '#E07B00' : '#0A7B57'
  const bg = days < 3 ? '#FDEAEA' : days < 7 ? '#FEF3E2' : '#E6F5F0'
  return (
    <span style={{ fontSize: 11, background: bg, color, borderRadius: 4, padding: '2px 8px', fontWeight: 500 }}>
      {days <= 0 ? 'Overdue' : `Due in ${days}d`}
    </span>
  )
}

export default async function DashboardPage() {
  const session = await requireStudent()
  const data = await getStudentDashboardData(session.user.id)
  const firstName = (session.user.fullName ?? session.user.name ?? 'Student').split(' ')[0]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Welcome bar */}
      <div style={{ background: '#1865F2', borderRadius: 8, padding: '24px 28px', marginBottom: 24, color: 'white' }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Welcome back, {firstName}!</div>
        <div style={{ fontSize: 14, opacity: 0.9 }}>Keep up the great work</div>
      </div>

      {/* Continue learning */}
      {data.nextLesson ? (
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#6B7280', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Continue where you left off</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: data.nextLesson.topic_color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>{data.nextLesson.topic_title}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1B1B1B', marginBottom: 4 }}>{data.nextLesson.lesson_title}</div>
              <div style={{ fontSize: 12, color: '#6B7280' }}>~{data.nextLesson.estimated_minutes} min</div>
            </div>
            <Link
              href={`/course/lesson/${data.nextLesson.lesson_id}`}
              style={{ background: '#1865F2', color: 'white', padding: '10px 20px', borderRadius: 4, fontWeight: 600, fontSize: 14, textDecoration: 'none', flexShrink: 0 }}
            >
              Continue
            </Link>
          </div>
        </div>
      ) : (
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 24, marginBottom: 24, textAlign: 'center', color: '#6B7280' }}>
          🎉 You're all caught up! Check back when new content is added.
        </div>
      )}

      {/* Topic progress grid */}
      {data.topicProgress.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#1B1B1B', marginBottom: 16 }}>Your Topics</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {data.topicProgress.map(tp => {
              const pct = tp.lessons_total > 0 ? Math.round((tp.lessons_completed / tp.lessons_total) * 100) : 0
              return (
                <div key={tp.topic_id} style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: tp.topic_color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: tp.topic_color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#1B1B1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tp.topic_title}</div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>{tp.lessons_completed} of {tp.lessons_total} lessons</div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: tp.topic_color }}>{pct}%</div>
                  </div>
                  <ProgressBar value={pct} color={tp.topic_color} />
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Recent activity */}
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1B1B1B', marginBottom: 14 }}>Recent Activity</div>
          {data.recentLessons.length === 0 ? (
            <div style={{ fontSize: 13, color: '#6B7280' }}>No lessons completed yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {data.recentLessons.map(r => (
                <div key={r.lesson_id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#E6F5F0', color: '#0A7B57', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✓</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, color: '#1B1B1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.lesson_title}</div>
                    <div style={{ fontSize: 11, color: '#6B7280' }}>{r.topic_title}{r.score != null ? ` · ${r.score}/${r.max_score}` : ''}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming assignments */}
        <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1B1B1B', marginBottom: 14 }}>Upcoming Assignments</div>
          {data.upcomingAssignments.length === 0 ? (
            <div style={{ fontSize: 13, color: '#6B7280' }}>No assignments due — check back soon</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.upcomingAssignments.map(a => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#1B1B1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: '#6B7280', textTransform: 'capitalize' }}>{a.type}</div>
                  </div>
                  <DueBadge due={a.due_date} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
