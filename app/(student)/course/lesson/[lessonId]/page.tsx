export default function LessonPage({ params }: { params: { lessonId: string } }) {
  return <div>Lesson {params.lessonId}</div>
}
