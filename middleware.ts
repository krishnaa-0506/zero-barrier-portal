import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get auth token from cookie
  const token = request.cookies.get("auth-token")?.value

  // Check if the route needs authentication
  if (request.nextUrl.pathname.startsWith("/api/") && !request.nextUrl.pathname.startsWith("/api/auth/")) {
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}