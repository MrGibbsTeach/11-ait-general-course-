import type { StudentWithProgress } from '@/types/course'

export default function StudentProgressRow({ student }: { student: StudentWithProgress }) {
  return <tr><td>{student.user.full_name}</td></tr>
}
