import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/public(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  
  // Allow local development to simulate subdomains via localhost:3000 (main) vs test.localhost:3000
  // For production, replace 'ceve.info' with your actual domain env var if needed
  const currentHost = process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ? hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : hostname.replace(`.localhost:3000`, "");

  // If accessing a subdomain (e.g. "asik" from asik.ceve.info)
  // And it's NOT the main domain (www or the root itself)
  if (
    hostname.includes(".") &&
    !hostname.includes("www") &&
    (process.env.NEXT_PUBLIC_ROOT_DOMAIN ? hostname.endsWith(process.env.NEXT_PUBLIC_ROOT_DOMAIN) : true) &&
    currentHost !== "ceve.info" // explicit check for root domain
  ) {
    // Rewrite to the public profile view
    return NextResponse.rewrite(new URL(`/u/${currentHost}${url.pathname}`, req.url));
  }

  // If Clerk is not configured, just continue
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || !process.env.CLERK_SECRET_KEY) {
    return NextResponse.next();
  }

  // Protect non-public routes
  if (!isPublicRoute(req)) {
    await auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};