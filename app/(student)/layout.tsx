import { getUnits } from '@/lib/db-queries/courses'
import StudentSidebar from '@/components/layout/StudentSidebar'
import TopNav from '@/components/layout/TopNav'
import MobileNav from '@/components/layout/MobileNav'

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const units = await getUnits()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FC' }}>
      {/* Desktop sidebar */}
      <div style={{ display: 'none' }} className="desktop-sidebar">
        <StudentSidebar />
      </div>

      {/* Mobile nav */}
      <MobileNav units={units} />

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopNav />
        <main style={{ flex: 1, padding: '32px 24px' }}>
          {children}
        </main>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .desktop-sidebar { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
