import type { NextAuthConfig } from 'next-auth'

const PUBLIC_ROUTES = ['/login', '/signup', '/teacher-login']

// Edge-safe config — no pg, no bcrypt.
// Routing logic lives here so middleware.ts stays trivial.
export const authConfig = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const role = (auth?.user as { role?: string } | undefined)?.role
      const path = nextUrl.pathname
      const isPublic = PUBLIC_ROUTES.some(r => path.startsWith(r))

      if (isLoggedIn && role === 'teacher' && path.startsWith('/dashboard')) {
        return Response.redirect(new URL('/portal', nextUrl))
      }
      if (isLoggedIn && role === 'student' && path.startsWith('/portal')) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      if (isLoggedIn && isPublic) {
        return Response.redirect(new URL(role === 'teacher' ? '/portal' : '/dashboard', nextUrl))
      }
      if (!isLoggedIn && !isPublic) return false
      return true
    },
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
