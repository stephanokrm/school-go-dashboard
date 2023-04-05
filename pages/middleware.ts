import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const hasAuthorization = !!request.cookies.get("authorization")?.value;
  const nextUrlIsLogin = request.nextUrl.pathname.startsWith("/login");

  if (hasAuthorization && !nextUrlIsLogin) return NextResponse.next();

  if (hasAuthorization && nextUrlIsLogin) return NextResponse.redirect("/");

  return NextResponse.redirect("/login");
}
