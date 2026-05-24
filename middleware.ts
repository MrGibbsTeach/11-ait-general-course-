import { NextRequest, NextResponse } from 'next/server'

// Auth is parked — all routes are public while course content is being built.
// See memory/project_auth_parked.md for full resume checklist.
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon\\.ico|.*\\.png$).*)'],
}
