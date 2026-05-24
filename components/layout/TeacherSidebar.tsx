import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

interface TeacherSidebarProps {
  teacherName: string
  className?: string
  classCode?: string
}

const NAV_ITEMS = [
  { href: '/portal', icon: '📊', label: 'Class Overview' },
  { href: '/portal/students', icon: '👥', label: 'Students' },
  { href: '/portal/assignments', icon: '📋', label: 'Assignments' },
  { href: '/portal/progress', icon: '📈', label: 'Progress Reports' },
]

export default function TeacherSidebar({ teacherName, className, classCode }: TeacherSidebarProps) {
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

      {/* Teacher footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid #E0E0E0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#E6F5F0', color: '#0A7B57', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {initials(teacherName)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1B1B1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{teacherName}</div>
            {className && <div style={{ fontSize: 11, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{className}</div>}
          </div>
        </div>
        {classCode && (
          <div style={{ fontSize: 11, color: '#6B7280', marginBottom: 8 }}>
            Class code: <strong style={{ color: '#1865F2', letterSpacing: '0.05em' }}>{classCode}</strong>
          </div>
        )}
        <SignOutButton
          style={{ width: '100%', background: 'none', border: '1px solid #E0E0E0', borderRadius: 4, padding: '6px 12px', fontSize: 12, color: '#6B7280', cursor: 'pointer', textAlign: 'center' }}
        />
      </div>
    </aside>
  )
}
