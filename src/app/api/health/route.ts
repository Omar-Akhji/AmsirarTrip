import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tokenFromQuery = searchParams.get("token");
  const tokenFromHeader = request.headers.get("x-health-token");
  const token = tokenFromHeader || tokenFromQuery;
  const expectedToken = process.env["HEALTH_CHECK_TOKEN"];

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
