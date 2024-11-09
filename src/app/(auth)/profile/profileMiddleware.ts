import { NextRequest, NextResponse } from "next/server";

export const profileMiddleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/profile") {
    const cookies = req.cookies;
    const username = cookies.get("username");
    const password = cookies.get("password");
    console.log("Profile MiddleWare: ", username, password);

    if (username && password) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/access-denied', req.nextUrl.origin))
  }
};

export const profileConfig = {
  matcher: "/profile",
};
