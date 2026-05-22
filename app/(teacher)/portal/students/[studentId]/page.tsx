export default function StudentDetailPage({ params }: { params: { studentId: string } }) {
  return <div>Student {params.studentId}</div>
}
