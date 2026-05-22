import type { LessonWithProgress } from '@/types/course'

export default function LessonCard({ lesson }: { lesson: LessonWithProgress }) {
  return <div>{lesson.title}</div>
}
