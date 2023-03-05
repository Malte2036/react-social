import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/login" && req.cookies.has("bearerToken")){
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
