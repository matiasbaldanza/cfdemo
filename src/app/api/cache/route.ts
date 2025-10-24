import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET() {
  const headersList = await headers()

  // Simulate some processing time
  await new Promise(resolve => setTimeout(resolve, 100))

  // Extract Cloudflare headers
  const cfRay = headersList.get("cf-ray")
  const cfCountry = headersList.get("cf-ipcountry")
  const cfConnectingIP = headersList.get("cf-connecting-ip")
  const cfCacheStatus = headersList.get("cf-cache-status")
  const cfVisitor = headersList.get("cf-visitor")

  // Generate response data
  const responseData = {
    ok: true,
    message: "API con cache optimizado para Cloudflare 🚀",
    timestamp: new Date().toISOString(),
    cache: {
      strategy: "Cloudflare Edge Cache",
      ttl: "300 seconds (5 minutes)",
      status: cfCacheStatus || "No disponible"
    },
    cloudflare: {
      enabled: Boolean(cfRay || cfCountry || cfConnectingIP),
      ray: cfRay || null,
      country: cfCountry || null,
      connectingIP: cfConnectingIP || null,
      visitor: cfVisitor || null,
      cacheStatus: cfCacheStatus || null,
    },
    performance: {
      serverTime: Date.now(),
      region: process.env.VERCEL_REGION || "local",
      runtime: "Next.js API Route"
    }
  }

  // Create response with caching headers optimized for Cloudflare
  const response = NextResponse.json(responseData)

  // Set cache headers for Cloudflare
  response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
  response.headers.set('CDN-Cache-Control', 'max-age=300')
  response.headers.set('Cloudflare-CDN-Cache-Control', 'max-age=300')

  // Add custom headers for debugging
  response.headers.set('X-Cache-Strategy', 'Cloudflare-Edge')
  response.headers.set('X-Generated-At', new Date().toISOString())

  return response
}

export async function POST() {
  const headersList = await headers()

  // Simulate processing time for POST
  await new Promise(resolve => setTimeout(resolve, 200))

  const responseData = {
    ok: true,
    message: "POST request procesado - sin cache",
    timestamp: new Date().toISOString(),
    method: "POST",
    cache: {
      strategy: "No cache (POST request)",
      reason: "POST requests are not cached by default"
    },
    cloudflare: {
      ray: headersList.get("cf-ray") || null,
      country: headersList.get("cf-ipcountry") || null,
      cacheStatus: headersList.get("cf-cache-status") || null,
    }
  }

  const response = NextResponse.json(responseData)

  // POST requests should not be cached
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('X-Cache-Strategy', 'No-Cache')

  return response
}
