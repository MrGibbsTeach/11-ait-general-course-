import { NextRequest, NextResponse } from 'next/server'
import { decode } from 'next-auth/jwt'

const PUBLIC = ['/login', '/signup', '/teacher-login']

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublic = PUBLIC.some(r => path.startsWith(r))

  // NextAuth v5 cookie names
  const secureName = '__Secure-authjs.session-token'
  const plainName = 'authjs.session-token'
  const sessionToken =
    req.cookies.get(secureName)?.value ??
    req.cookies.get(plainName)?.value
  const salt = req.cookies.has(secureName) ? secureName : plainName

  let role: string | undefined
  if (sessionToken && process.env.AUTH_SECRET) {
    try {
      const token = await decode({
        token: sessionToken,
        secret: process.env.AUTH_SECRET,
        salt,
      })
      role = token?.role as string | undefined
    } catch {
      // expired or invalid token — treat as logged out
    }
  }

  const isLoggedIn = !!role

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (isLoggedIn && role === 'teacher' && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/portal', req.url))
  }
  if (isLoggedIn && role === 'student' && path.startsWith('/portal')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL(role === 'teacher' ? '/portal' : '/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)'],
}
