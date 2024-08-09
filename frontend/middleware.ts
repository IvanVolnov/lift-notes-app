import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import decodeJwtToken from './app/utils/decodeJwtToken';

// 1. Specify protected and public routes
const protectedRoutes = ['/account'];
const publicRoutes = ['/auth', '/'];

export default async function middleware(req: NextRequest) {
  console.log('middleware started');
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get('accessToken')?.value || '';
  const session = decodeJwtToken(cookie);
  // const session = decodeJwt(cookie);
  const userId = session?.user_id;

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL('auth/login', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    userId &&
    !req.nextUrl.pathname.startsWith('/account/workouts')
  ) {
    return NextResponse.redirect(new URL('/account/workouts', req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
