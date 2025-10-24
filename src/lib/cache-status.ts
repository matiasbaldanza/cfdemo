// Helper function to get cache status information
export function getCacheStatusInfo(headersList: Headers) {
  const cfRay = headersList.get('cf-ray')
  const cfCountry = headersList.get('cf-ipcountry')
  const cfConnectingIP = headersList.get('cf-connecting-ip')
  const cfCacheStatus = headersList.get('cf-cache-status')
  const cfVisitor = headersList.get('cf-visitor')

  const isCloudflare = Boolean(cfRay || cfCountry || cfConnectingIP)

  // Determine cache status explanation
  let cacheStatusExplanation = ''
  if (!isCloudflare) {
    cacheStatusExplanation = 'No protegido por Cloudflare'
  } else if (!cfCacheStatus) {
    cacheStatusExplanation = 'Cloudflare activo, pero sin cache status (primera request o contenido no cacheable)'
  } else {
    switch (cfCacheStatus) {
      case 'HIT':
        cacheStatusExplanation = '✅ Contenido servido desde cache de Cloudflare'
        break
      case 'MISS':
        cacheStatusExplanation = '❌ Cache miss - contenido generado desde origen'
        break
      case 'BYPASS':
        cacheStatusExplanation = '🔄 Cache bypassed - contenido dinámico'
        break
      case 'EXPIRED':
        cacheStatusExplanation = '⏰ Cache expirado - regenerando'
        break
      case 'STALE':
        cacheStatusExplanation = '📦 Contenido stale - sirviendo mientras regenera'
        break
      default:
        cacheStatusExplanation = `Estado: ${cfCacheStatus}`
    }
  }

  return {
    isCloudflare,
    cfRay,
    cfCountry,
    cfConnectingIP,
    cfCacheStatus,
    cfVisitor,
    cacheStatusExplanation
  }
}
