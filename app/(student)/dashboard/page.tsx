import { getUnits } from '@/lib/db-queries/courses'
import Link from 'next/link'

export default async function DashboardPage() {
  const units = await getUnits()

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{ background: '#1865F2', borderRadius: 8, padding: '28px 32px', marginBottom: 32, color: 'white' }}>
        <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>AIT General Course</div>
        <div style={{ fontSize: 15, opacity: 0.9 }}>Applied Information Technology — select a unit below to get started.</div>
      </div>

      {/* Units */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {units.map((unit, i) => {
          const locked = unit.status !== 'available'
          const color = unit.color ?? '#1865F2'
          return (
            <div
              key={unit.id}
              style={{
                background: 'white',
                border: '1px solid #E0E0E0',
                borderRadius: 8,
                overflow: 'hidden',
                opacity: locked ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                {/* Color strip */}
                <div style={{ width: 6, background: color, flexShrink: 0 }} />

                <div style={{ flex: 1, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                  {/* Unit number bubble */}
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: color + '18', color, fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {i + 1}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, color: '#1B1B1B', marginBottom: 4 }}>{unit.title}</div>
                    {unit.subtitle && (
                      <div style={{ fontSize: 13, color: '#6B7280' }}>{unit.subtitle}</div>
                    )}
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>
                      {(unit as { topics?: unknown[] }).topics?.length ?? 0} topics
                    </div>
                  </div>

                  {/* CTA */}
                  {locked ? (
                    <span style={{ fontSize: 12, background: '#F3F4F6', color: '#6B7280', borderRadius: 4, padding: '4px 10px', flexShrink: 0 }}>Coming soon</span>
                  ) : (
                    <Link
                      href={`/course/unit/${unit.id}`}
                      style={{ background: color, color: 'white', padding: '10px 18px', borderRadius: 4, fontWeight: 600, fontSize: 13, textDecoration: 'none', flexShrink: 0 }}
                    >
                      Start unit →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {units.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: '#6B7280', background: 'white', borderRadius: 8, border: '1px solid #E0E0E0' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>No units yet</div>
            <div style={{ fontSize: 13 }}>Course content will appear here once units are added.</div>
          </div>
        )}
      </div>
    </div>
  )
}
