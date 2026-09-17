import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments the user and token on the request
  function middleware(req) {
    console.log("Middleware running for:", req.nextUrl.pathname);
    console.log("User in middleware:", req.nextauth.token);

    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Role check: Only users with 'admin' role are permitted in admin section
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      return NextResponse.redirect(new URL("/login?error=Unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
