export default function ProgressBar({ percent }: { percent: number }) {
  return <div style={{ width: `${percent}%` }} />
}
