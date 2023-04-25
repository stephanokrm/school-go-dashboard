import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const hasAuthorization = !!request.cookies.get("authorization")?.value;
  const nextUrlIsLogin = request.nextUrl.pathname.startsWith("/login");

  if (nextUrlIsLogin && hasAuthorization)
    return NextResponse.redirect(
      new URL("/dashboard/itinerarios", request.url)
    );

  if (!nextUrlIsLogin && !hasAuthorization)
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};
