import type { TeacherDashboardData } from '@/types/course'

export default function ClassOverview({ data }: { data: TeacherDashboardData }) {
  return <div>{data.class.name}</div>
}
