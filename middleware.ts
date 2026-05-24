import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/signup', '/teacher-login']

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role
  const isPublic = PUBLIC_ROUTES.some(r => nextUrl.pathname.startsWith(r))

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Teacher → portal, student → dashboard role guards
  if (isLoggedIn && role === 'teacher' && nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/portal', req.url))
  }

  if (isLoggedIn && role === 'student' && nextUrl.pathname.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Already logged in — redirect away from auth pages
  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL(role === 'teacher' ? '/portal' : '/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)'],
}
