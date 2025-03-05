import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/admin-panel')) {
    if (!token || token?.role !== 1) {
      return NextResponse.redirect(new URL('/403', req.url));
    }
  }

  if (token && (pathname === '/sign-in' || pathname === '/sign-up')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in', '/sign-up', '/admin-panel/:path*'],
};
