import type { NextAuthConfig } from 'next-auth'

// Edge-safe config — no pg, no bcrypt.
// Used by middleware. Full providers live in lib/auth.ts.
export const authConfig = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role?: string }).role
        token.fullName = (user as { fullName?: string }).fullName
        token.classCode = (user as { classCode?: string | null }).classCode ?? null
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      session.user.fullName = token.fullName as string
      session.user.classCode = (token.classCode as string | null) ?? null
      return session
    },
  },
  providers: [],
} satisfies NextAuthConfig
