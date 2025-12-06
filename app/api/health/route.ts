import { NextRequest, NextResponse } from "next/server";

/**
 * Health check endpoint
 * Requires HEALTH_CHECK_TOKEN for security
 * Usage: GET /api/health?token=YOUR_SECRET_TOKEN
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const expectedToken = process.env.HEALTH_CHECK_TOKEN;

  // If token is configured, require it
  if (expectedToken && token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "production",
  });
}
