import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const bearerToken = req.cookies["bearerToken"];
  if (!bearerToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
