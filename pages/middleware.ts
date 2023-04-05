import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization")?.value;
  const isLogin = request.nextUrl.pathname.startsWith("/login");

  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}/api/user/me`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    if (user && !isLogin) return NextResponse.next();

    if (user && isLogin) return NextResponse.redirect("/");
  } catch (e) {}

  return NextResponse.redirect("/login");
}
