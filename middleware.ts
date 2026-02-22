import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimit = new Map<string, { count: number; time: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 1; // max 1 question per minute per IP

  if (request.nextUrl.pathname.startsWith("/api/submit-question")) {
    const record = rateLimit.get(ip);
    if (record) {
      if (now - record.time < windowMs) {
        if (record.count >= maxRequests) {
          const secondsLeft = Math.ceil((windowMs - (now - record.time)) / 1000);
          return NextResponse.json(
            { 
              error: `Mohon tunggu ${secondsLeft} detik sebelum mengirim pertanyaan lagi`,
              retryAfter: secondsLeft 
            },
            { status: 429 }
          );
        }
        record.count++;
      } else {
        rateLimit.set(ip, { count: 1, time: now });
      }
    } else {
      rateLimit.set(ip, { count: 1, time: now });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
