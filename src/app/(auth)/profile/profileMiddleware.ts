import { NextRequest, NextResponse } from "next/server";

export const profileMiddleware = (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname === "/profile") {
    const cookies = req.cookies;
    const usernameCookie = cookies.get("username");
    const passwordCookie = cookies.get("password");
    console.log("Profile MiddleWare: ", usernameCookie, passwordCookie);

    const hasCookies = usernameCookie && passwordCookie;
    if (hasCookies) {
      const { value: username } = usernameCookie;
      const { value: password } = passwordCookie;
      if (typeof username === "string" && typeof password === "string") {
        return NextResponse.next();

        /*
        return NextResponse.json(
          { error: "Incorrect Credentials" },
          { status: 403 }
        );
        */
      }
    }

    return NextResponse.redirect(new URL("/access-denied", req.nextUrl.origin));
  }
};

export const profileConfig = {
  matcher: "/profile",
};
