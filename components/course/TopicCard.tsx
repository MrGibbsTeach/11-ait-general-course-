import type { TopicWithProgress } from '@/types/course'

export default function TopicCard({ topic }: { topic: TopicWithProgress }) {
  return <div>{topic.title}</div>
}
