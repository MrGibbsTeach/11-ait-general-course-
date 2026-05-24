import Link from 'next/link'
import { auth } from '@/lib/auth'
import { getUnits } from '@/lib/db-queries/courses'
import SignOutButton from '@/components/SignOutButton'

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default async function StudentSidebar() {
  const session = await auth()
  const units = await getUnits()

  return (
    <aside style={{ width: 240, flexShrink: 0, height: '100vh', position: 'sticky', top: 0, background: 'white', borderRight: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #E0E0E0' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <span style={{ color: '#1865F2', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>AIT General Course</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        <div style={{ padding: '4px 16px 8px', fontSize: 10, fontWeight: 600, color: '#6B7280', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Course
        </div>

        <NavItem href="/dashboard" icon="⊞" label="Dashboard" />

        {units.map((unit, i) => {
          const locked = unit.status !== 'available'
          return (
            <div key={unit.id}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', fontSize: 13, fontWeight: 500,
                  color: locked ? '#9CA3AF' : '#1B1B1B',
                  opacity: locked ? 0.6 : 1,
                }}
              >
                {locked && <span style={{ fontSize: 11 }}>🔒</span>}
                <span style={{ flex: 1 }}>Unit {i + 1} — {unit.title}</span>
                {locked
                  ? <span style={{ fontSize: 10, background: '#F3F4F6', color: '#6B7280', borderRadius: 4, padding: '1px 6px' }}>Soon</span>
                  : <Link href={`/course/unit/${unit.id}`} style={{ fontSize: 11, color: '#1865F2', textDecoration: 'none' }}>›</Link>
                }
              </div>

              {!locked && (
                <div style={{ paddingLeft: 16 }}>
                  <Link
                    href={`/course/unit/${unit.id}`}
                    style={{ display: 'block', padding: '4px 16px', fontSize: 12, color: '#6B7280', textDecoration: 'none' }}
                  >
                    View topics →
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #E0E0E0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAF0FD', color: '#1865F2', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {initials(session?.user?.fullName ?? session?.user?.name ?? 'S')}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1B1B1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {session?.user?.fullName ?? session?.user?.name}
            </div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>Student</div>
          </div>
        </div>
        <SignOutButton
          style={{ width: '100%', background: 'none', border: '1px solid #E0E0E0', borderRadius: 4, padding: '6px 12px', fontSize: 12, color: '#6B7280', cursor: 'pointer', textAlign: 'center' }}
        />
      </div>
    </aside>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: string; label: string }) {
  return (
    <Link
      href={href}
      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', fontSize: 13, fontWeight: 500, color: '#1B1B1B', textDecoration: 'none' }}
    >
      <span style={{ width: 18, textAlign: 'center', fontSize: 14 }}>{icon}</span>
      {label}
    </Link>
  )
}
