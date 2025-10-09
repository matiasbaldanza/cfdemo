import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  const headersList = await headers()

  // Extraer headers de Cloudflare
  const cfRay = headersList.get("cf-ray")
  const cfCountry = headersList.get("cf-ipcountry")
  const cfConnectingIP = headersList.get("cf-connecting-ip")
  const cfVisitor = headersList.get("cf-visitor")
  const cfCacheStatus = headersList.get("cf-cache-status")

  // Headers generales
  const userAgent = headersList.get("user-agent")
  const xForwardedFor = headersList.get("x-forwarded-for")
  const xRealIp = headersList.get("x-real-ip")

  // Determinar si está protegido por Cloudflare
  const isCloudflare = Boolean(cfRay || cfCountry || cfConnectingIP)

  return NextResponse.json({
    ok: true,
    message: "Hola desde /api/hello 👋",
    timestamp: new Date().toISOString(),
    cloudflare: {
      enabled: isCloudflare,
      ray: cfRay || null,
      country: cfCountry || null,
      connectingIP: cfConnectingIP || null,
      visitor: cfVisitor || null,
      cacheStatus: cfCacheStatus || null,
    },
    request: {
      userAgent: userAgent || null,
      forwardedFor: xForwardedFor || null,
      realIP: xRealIp || null,
    },
    server: {
      runtime: "Next.js",
      region: process.env.VERCEL_REGION || "local",
    }
  })
}