'use client'

import { logout } from '@/app/actions/auth'

interface SignOutButtonProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function SignOutButton({ className, style, children }: SignOutButtonProps) {
  return (
    <button
      onClick={() => logout()}
      className={className}
      style={style}
    >
      {children ?? 'Sign out'}
    </button>
  )
}
