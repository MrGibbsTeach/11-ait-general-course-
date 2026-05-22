import type { UnitWithProgress } from '@/types/course'

export default function UnitCard({ unit }: { unit: UnitWithProgress }) {
  return <div>{unit.title}</div>
}
