import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/public(.*)"
]);

// Explicitly typing auth as any to prevent TS error if types are missing during install
export default clerkMiddleware(async (auth: any, req: NextRequest) => {
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
    // We keep the path (e.g. /blog) if you want multi-page profiles later
    return NextResponse.rewrite(new URL(`/u/${currentHost}${url.pathname}`, req.url));
  }

  // Protect routes if needed, but for now we allow public access to main page
  // and handle auth checks inside the components/actions
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};