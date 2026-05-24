'use client'

import { usePathname } from 'next/navigation'

export default function TopNav() {
  const pathname = usePathname()
  const breadcrumb = buildBreadcrumb(pathname)

  return (
    <header style={{ height: 56, background: 'white', borderBottom: '1px solid #E0E0E0', display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16, flexShrink: 0 }}>
      <div style={{ flex: 1, fontSize: 13, color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {breadcrumb}
      </div>
    </header>
  )
}

function buildBreadcrumb(pathname: string): string {
  if (pathname === '/dashboard') return 'Course Overview'
  const parts = pathname.split('/').filter(Boolean)
  return parts
    .map(p => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
    .join(' › ')
}
