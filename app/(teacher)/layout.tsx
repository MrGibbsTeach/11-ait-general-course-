import TeacherSidebar from '@/components/layout/TeacherSidebar'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FC' }}>
      <TeacherSidebar />
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '32px 32px' }}>
        {children}
      </main>
    </div>
  )
}
