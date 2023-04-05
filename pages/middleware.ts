import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserByMe } from "../src/services/getUserByMe";

export default async function middleware(request: NextRequest) {
  const authorization = request.cookies.get("authorization")?.value;
  const isLogin = request.nextUrl.pathname.startsWith("/login");

  try {
    const user = await getUserByMe({ authorization });

    if (user && !isLogin) return NextResponse.next();

    if (user && isLogin) return NextResponse.redirect("/");
  } catch (e) {}

  return NextResponse.redirect("/login");
}
