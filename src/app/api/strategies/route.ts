import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(request: Request) {
  const headersList = await headers()
  const url = new URL(request.url)
  const strategy = url.searchParams.get('strategy') || 'default'

  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 150))

  const baseData = {
    ok: true,
    timestamp: new Date().toISOString(),
    strategy: strategy,
    cloudflare: {
      ray: headersList.get("cf-ray") || null,
      country: headersList.get("cf-ipcountry") || null,
      cacheStatus: headersList.get("cf-cache-status") || null,
    }
  }

  const response = NextResponse.json(baseData)

  // Apply different caching strategies based on query parameter
  switch (strategy) {
    case 'long':
      // Long cache (1 hour)
      response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200')
      response.headers.set('CDN-Cache-Control', 'max-age=3600')
      baseData.message = "Cache largo (1 hora) - Ideal para contenido estático"
      break

    case 'short':
      // Short cache (30 seconds)
      response.headers.set('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=60')
      response.headers.set('CDN-Cache-Control', 'max-age=30')
      baseData.message = "Cache corto (30 segundos) - Para contenido semi-dinámico"
      break

    case 'none':
      // No cache
      response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      response.headers.set('CDN-Cache-Control', 'no-cache')
      baseData.message = "Sin cache - Datos siempre frescos"
      break

    case 'stale':
      // Stale while revalidate
      response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300')
      response.headers.set('CDN-Cache-Control', 'max-age=60')
      baseData.message = "Stale-while-revalidate - Balance entre velocidad y frescura"
      break

    default:
      // Default cache (5 minutes)
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      response.headers.set('CDN-Cache-Control', 'max-age=300')
      baseData.message = "Cache por defecto (5 minutos) - Balance óptimo"
  }

  // Add debugging headers
  response.headers.set('X-Cache-Strategy', strategy)
  response.headers.set('X-Generated-At', new Date().toISOString())

  return response
}
