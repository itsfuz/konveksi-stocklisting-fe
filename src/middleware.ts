// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server' // Change 'next/request' to 'next/server'

export function middleware(request: NextRequest) {
  const user = request.cookies.get('currentUser')?.value
  const { pathname } = request.nextUrl

  if (!user && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - public (any files in your public folder)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)'
  ],
}