import { getUnitById } from '@/lib/db-queries/courses'
import { requireStudent } from '@/lib/auth-helpers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  await requireStudent()
  const { unitId } = await params
  const unit = await getUnitById(unitId)

  if (!unit) redirect('/dashboard')
  if (unit.status === 'coming_soon' || unit.status === 'locked') redirect('/dashboard')

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header strip */}
      <div style={{ background: unit.color, borderRadius: 8, padding: '32px 28px', marginBottom: 24, color: 'white' }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8 }}>Unit</div>
        <div style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{unit.title}</div>
        {unit.subtitle && <div style={{ fontSize: 15, opacity: 0.9 }}>{unit.subtitle}</div>}
      </div>

      {/* Topic list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {unit.topics.map(topic => (
          <Link
            key={topic.id}
            href={`/course/topic/${topic.id}`}
            style={{ textDecoration: 'none' }}
          >
            <div style={{ background: 'white', border: '1px solid #E0E0E0', borderRadius: 8, display: 'flex', overflow: 'hidden', transition: 'box-shadow 0.15s' }}>
              {/* Color strip */}
              <div style={{ width: 8, background: topic.color, flexShrink: 0 }} />

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px' }}>
                {/* Icon */}
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: topic.color + '22', color: topic.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {topic.icon ?? '📚'}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#1B1B1B', marginBottom: 4 }}>{topic.title}</div>
                  {topic.description && (
                    <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topic.description}</div>
                  )}
                  <div style={{ fontSize: 12, color: '#6B7280' }}>~{topic.estimated_hours}h estimated</div>
                </div>

                {/* Arrow */}
                <div style={{ color: '#6B7280', fontSize: 18, flexShrink: 0 }}>›</div>
              </div>
            </div>
          </Link>
        ))}

        {unit.topics.length === 0 && (
          <div style={{ textAlign: 'center', color: '#6B7280', padding: 40, background: 'white', borderRadius: 8, border: '1px solid #E0E0E0' }}>
            No topics available yet
          </div>
        )}
      </div>
    </div>
  )
}
