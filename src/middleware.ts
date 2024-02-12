import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isPublicRoute = ["/auth/login", "/auth/register"].includes(
    request.nextUrl.pathname || ""
  );

  const token =
    request.cookies.get("process.env.SECRET_KEY_COOKIE!")?.value || "";

  if (!token && !isPublicRoute) {
    // Construct an absolute URL for the login page = As the when I give the provided url it given the error
    /*Here, we're using the URL constructor to create a new URL object. The constructor takes two parameters:

"/auth/login": This is the path we want to append to the base URL.
request.url: This is the base URL. We use request.url to ensure that the new URL inherits the protocol, host, and other information from the current request. */
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl.href);
  }

  if (token && isPublicRoute) {
    // Redirect to the home page for authenticated users
    return NextResponse.redirect("/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/"],
};

//Complicated code i wrote before
/*import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  let isPublicRoute = false;
  if (
    request.nextUrl.pathname === "/auth/login" ||
    request.nextUrl.pathname === "/auth/register"
  ) {
    isPublicRoute = true;
  }

  // if the token is not present and the route is not public, redirect to login
  const token =
    request.cookies.get("process.env.SECRET_KEY_COOKIE!")?.value || "";
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // if the token is present and the route is public, redirect to home
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/"],
}; */
