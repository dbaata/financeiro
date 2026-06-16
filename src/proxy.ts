import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = Boolean(req.auth);
  const isPrivate = req.nextUrl.pathname !== "/login";

  if (isPrivate && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (req.nextUrl.pathname === "/login" && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|images|favicon.ico).*)"]
};
