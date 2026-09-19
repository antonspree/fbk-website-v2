import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === "/admin";
  const isAdminRoute = pathname.startsWith("/admin/");

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  if (isAdminRoute && !isLoginPage && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (isLoginPage && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
