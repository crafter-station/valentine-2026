import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const hasClerkKeys = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
                     process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'YOUR_PUBLISHABLE_KEY';

export default function middleware(request: NextRequest) {
  if (!hasClerkKeys) {
    return NextResponse.next();
  }
  return clerkMiddleware()(request);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
