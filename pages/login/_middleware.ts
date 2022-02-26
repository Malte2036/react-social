import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const bearerToken = req.cookies.bearerToken;
  if (bearerToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
