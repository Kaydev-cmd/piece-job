import { NextResponse, NextRequest } from "next/server";
import { users } from "@/data/users";

export function middleware(req: NextRequest, res: NextResponse) {
  const token = req.cookies.get("sessionToken")?.value;

  // Look up user by token
  const user = users.find((user) => user.sessionToken === token);

  if (!user) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/job-feed") &&
    user.role !== "jobSeeker"
  ) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/job-poster-feed") &&
    user.role !== "employer"
  ) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}
