import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = ['/login', '/signup', '/teacher-login']

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (!isLoggedIn && !isPublicRoute) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirectedFrom', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isLoggedIn && isPublicRoute) {
    const role = req.auth?.user?.role
    const dest = role === 'teacher' ? '/portal' : '/dashboard'
    return NextResponse.redirect(new URL(dest, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)'],
}
