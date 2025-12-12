import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getNewAccessToken } from "./service/auth/auth.service";
import { deleteCookie, getCookie } from "./service/auth/cookiesHandler";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./service/auth/auth-utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUserInfo } from "./service/auth/getUserIfo";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const hasTokenRefreshedParams =
    request.nextUrl.searchParams.get("tokenRefreshed");

  if (hasTokenRefreshedParams) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const tokenRefreshedResult = await getNewAccessToken();

  if (tokenRefreshedResult?.tokenRefreshed) {
    const url = request.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    const verifyToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string
    );
    if (typeof verifyToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifyToken.role;
  }

  const routeOwner = getRouteOwner(pathname);

  const isAuth = isAuthRoute(pathname);

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  if (routeOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken) {
    const userInfo = await getUserInfo();
    if (userInfo.needPasswordChange) {
      if (pathname !== "/reset-password") {
        const resetPasswordUrl = new URL("/reset-password", request.url);
        resetPasswordUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(resetPasswordUrl);
      }
    }
    if (
      userInfo &&
      !userInfo.needPasswordChange &&
      pathname === "/reset-password"
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  if (routeOwner === "COMMON") {
    return NextResponse.next();
  }
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "HOST" ||
    routeOwner === "USER"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt.well-known).*)",
  ],
};
