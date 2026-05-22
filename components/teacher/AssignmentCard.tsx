import type { AssignmentWithSubmission } from '@/types/course'

export default function AssignmentCard({ assignment }: { assignment: AssignmentWithSubmission }) {
  return <div>{assignment.title}</div>
}
