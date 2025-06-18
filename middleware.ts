export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/chat/:path*",
    "/api/chats/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|signin|signup).*)",
  ],
};
