import { headers } from 'next/headers'
import Link from 'next/link'
import { getCacheStatusInfo } from '@/lib/cache-status'

// This page is statically generated at build time
export default async function SSGPage() {
  const headersList = await headers()
  const cacheInfo = getCacheStatusInfo(headersList)
  const buildTime = new Date().toISOString()

  return (
    <main className="min-h-dvh bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mb-4 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Static Site Generation (SSG)
          </h1>
          <p className="text-gray-600">
            Esta página se genera estáticamente en tiempo de build
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Static Content */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📄 Contenido Estático
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Tiempo de Build</h3>
                <p className="text-sm text-gray-600 font-mono">{buildTime}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Tipo de Renderizado</h3>
                <p className="text-sm text-gray-600">Static Site Generation</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Cache Strategy</h3>
                <p className="text-sm text-gray-600">Cloudflare Edge Cache (muy largo)</p>
              </div>
            </div>
          </div>

          {/* Cloudflare Headers */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ☁️ Headers Cloudflare
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-Ray:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {cacheInfo.cfRay || 'No disponible'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-Cache-Status:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {cacheInfo.cfCacheStatus || 'No disponible'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-IPCountry:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {cacheInfo.cfCountry || 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cache Status Explanation */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📊 Estado del Cache
          </h2>
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Explicación del Cache Status:</h3>
            <p className="text-sm text-gray-700">{cacheInfo.cacheStatusExplanation}</p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">💡 Para SSG (Static Site Generation):</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>Primera visita:</strong> <code className="bg-blue-100 px-1 rounded">MISS</code> - Página generada desde origen</li>
              <li>• <strong>Visitas posteriores:</strong> <code className="bg-blue-100 px-1 rounded">HIT</code> - Servida desde cache de Cloudflare</li>
              <li>• <strong>Cache permanente:</strong> Esta página se cachea indefinidamente hasta que se redeploye</li>
              <li>• <strong>Sin Cloudflare:</strong> No aparecerá el header <code className="bg-blue-100 px-1 rounded">cf-cache-status</code></li>
            </ul>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Beneficios del SSG
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Ultra Rápido</h3>
              <p className="text-sm text-gray-600">Servido desde CDN edge</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-semibold text-gray-800 mb-1">Económico</h3>
              <p className="text-sm text-gray-600">Sin procesamiento en servidor</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800 mb-1">Confiable</h3>
              <p className="text-sm text-gray-600">Sin puntos de falla</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/isr"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
          >
            Ver ISR →
          </Link>
          <Link
            href="/dynamic/test"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
          >
            Ver Dynamic →
          </Link>
        </div>
      </div>
    </main>
  )
}
