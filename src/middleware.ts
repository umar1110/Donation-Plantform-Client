// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isLoggedIn = request.cookies.get('auth')?.value === '1'
  
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/signup')
  const isProtectedPage = pathname.startsWith('/dashboard')

  // Logged in → redirect away from auth pages
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Not logged in → redirect to login from protected pages
  if (!isLoggedIn && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}