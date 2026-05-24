'use client'

import { usePathname } from 'next/navigation'

interface TopNavProps {
  userName?: string
  userInitials?: string
}

export default function TopNav({ userName, userInitials }: TopNavProps) {
  const pathname = usePathname()

  const breadcrumb = buildBreadcrumb(pathname)

  return (
    <header style={{ height: 56, background: 'white', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0 }}>
      {/* Mobile hamburger placeholder — MobileNav handles this */}
      <div id="mobile-menu-trigger" style={{ display: 'none' }} />

      {/* Breadcrumb */}
      <div style={{ flex: 1, fontSize: 13, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {breadcrumb}
      </div>

      {/* Right side badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        {/* Avatar */}
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EAF0FD', color: '#1865F2', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} title={userName}>
          {userInitials ?? 'S'}
        </div>
      </div>
    </header>
  )
}

function buildBreadcrumb(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
  const parts = pathname.split('/').filter(Boolean)
  return parts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
    .join(' › ')
}
