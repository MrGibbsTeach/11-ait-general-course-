import type { MasteryLevel } from '@/types/database'

export default function MasteryBadge({ level }: { level: MasteryLevel }) {
  return <span>{level}</span>
}
