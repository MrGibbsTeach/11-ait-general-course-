import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/portal', icon: '📊', label: 'Course Overview' },
  { href: '/portal/students', icon: '👥', label: 'Students' },
  { href: '/portal/assignments', icon: '📋', label: 'Assignments' },
  { href: '/portal/progress', icon: '📈', label: 'Progress Reports' },
]

export default function TeacherSidebar() {
  return (
    <aside style={{ width: 240, flexShrink: 0, height: '100vh', position: 'sticky', top: 0, background: 'white', borderRight: '1px solid #E0E0E0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #E0E0E0' }}>
        <div style={{ color: '#1865F2', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>Teacher Portal</div>
        <div style={{ color: '#1865F2', fontWeight: 700, fontSize: 15 }}>AIT General Course</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '12px 0' }}>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', fontSize: 13, fontWeight: 500, color: '#1B1B1B', textDecoration: 'none' }}
          >
            <span style={{ width: 20, textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #E0E0E0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E6F5F0', color: '#0A7B57', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            MG
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1B1B1B' }}>Mr Gibbs</div>
            <div style={{ fontSize: 11, color: '#6B7280' }}>Teacher</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
