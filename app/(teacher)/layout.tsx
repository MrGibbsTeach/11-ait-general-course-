import { requireTeacher } from '@/lib/auth-helpers'
import { getStudentClass } from '@/lib/db-queries/users'
import TeacherSidebar from '@/components/layout/TeacherSidebar'

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const session = await requireTeacher()
  const fullName = session.user.fullName ?? session.user.name ?? 'Teacher'

  // Get the teacher's class (first one)
  const teacherClass = await getStudentClass(session.user.id).catch(() => null)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F8FC' }}>
      <TeacherSidebar
        teacherName={fullName}
        className={teacherClass?.name}
        classCode={session.user.classCode ?? undefined}
      />
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '32px 32px' }}>
        {children}
      </main>
    </div>
  )
}
