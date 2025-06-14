// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/login", "/register", "/about"];

  // Check if the current path is public,
  // Allow access to public paths without checking for a token
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // For all other paths, check for a session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token and it's a protected path, redirect to landing page
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // If user is authenticated, allow access to the protected path
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes, NextAuth uses /api/auth/*)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
