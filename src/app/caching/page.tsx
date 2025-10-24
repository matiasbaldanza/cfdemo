import { headers } from 'next/headers'
import Link from 'next/link'

export default async function CachingPage() {
  const headersList = await headers()

  return (
    <main className="min-h-dvh bg-gradient-to-br from-slate-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg mb-4 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧪 Demo de Caching con Cloudflare
          </h1>
          <p className="text-gray-600">
            Explora diferentes estrategias de cache y renderizado
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Rendering Strategies */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Estrategias de Renderizado</h3>
            <div className="space-y-3">
              <Link
                href="/ssg"
                className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                SSG - Static Site Generation
              </Link>
              <Link
                href="/isr"
                className="block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                ISR - Incremental Static Regeneration
              </Link>
              <Link
                href="/dynamic/test"
                className="block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                Dynamic - Server-side Rendering
              </Link>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🔌 API Endpoints</h3>
            <div className="space-y-3">
              <Link
                href="/api/hello"
                className="block px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
              >
                /api/hello - Básico
              </Link>
              <Link
                href="/api/cache"
                className="block px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                /api/cache - Con Cache
              </Link>
              <Link
                href="/api/strategies"
                className="block px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
              >
                /api/strategies - Estrategias
              </Link>
            </div>
          </div>
        </div>

        {/* Cache Testing Instructions */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">🧪 Cómo Probar el Cache</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Estrategias de Cache:</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-semibold mr-3">SSG</span>
                  <span>Cache permanente (edge) - Ideal para contenido estático</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold mr-3">ISR</span>
                  <span>Cache con revalidación (60s) - Balance velocidad/frescura</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-semibold mr-3">Dynamic</span>
                  <span>Sin cache (siempre fresco) - Contenido personalizado</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold mr-3">API</span>
                  <span>Cache configurable - Múltiples estrategias</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Headers a Observar:</h3>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">cf-cache-status</code>
                  <span>HIT, MISS, BYPASS, EXPIRED</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">cf-ray</code>
                  <span>ID único de la request</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">cf-ipcountry</code>
                  <span>País del usuario</span>
                </li>
                <li className="flex items-center">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">cache-control</code>
                  <span>Estrategia de cache</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Testing Commands */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">💻 Comandos para Probar</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Probar SSG (Static)</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>curl -I https://tu-dominio.com/ssg</div>
                <div className="text-gray-400"># Observa: cache-control con valores largos</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Probar ISR (Incremental)</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>curl https://tu-dominio.com/isr</div>
                <div className="text-gray-400"># Recarga varias veces - datos iguales por 60s</div>
                <div className="text-gray-400"># Espera 60+ segundos y recarga - datos cambian</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Probar Dynamic</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>curl https://tu-dominio.com/dynamic/test</div>
                <div>curl https://tu-dominio.com/dynamic/demo</div>
                <div>curl https://tu-dominio.com/dynamic/cloudflare</div>
                <div className="text-gray-400"># Siempre datos frescos</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Probar APIs con Cache</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>curl https://tu-dominio.com/api/cache</div>
                <div>curl https://tu-dominio.com/api/strategies?strategy=long</div>
                <div>curl https://tu-dominio.com/api/strategies?strategy=short</div>
                <div>curl https://tu-dominio.com/api/strategies?strategy=none</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cache Status Interpretation */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">📊 Interpretando Resultados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cache Status Headers:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold mr-3">HIT</span>
                  <span className="text-gray-700">Contenido servido desde cache</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold mr-3">MISS</span>
                  <span className="text-gray-700">Cache miss, contenido generado</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-semibold mr-3">BYPASS</span>
                  <span className="text-gray-700">Cache bypassed (dynamic content)</span>
                </li>
                <li className="flex items-center">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-semibold mr-3">EXPIRED</span>
                  <span className="text-gray-700">Cache expirado, regenerando</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cache-Control Headers:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">public</code>
                  <span className="text-gray-700">Cacheable por CDN</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">s-maxage=X</code>
                  <span className="text-gray-700">TTL para CDN (segundos)</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">stale-while-revalidate=X</code>
                  <span className="text-gray-700">Tiempo para servir stale mientras regenera</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">no-cache</code>
                  <span className="text-gray-700">Siempre validar con origen</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3">no-store</code>
                  <span className="text-gray-700">No cachear en absoluto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Current Cloudflare Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">☁️ Estado Actual de Cloudflare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Headers Detectados:</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">CF-Ray:</span>
                  <span className="text-xs text-gray-600 font-mono">
                    {headersList.get('cf-ray') || 'No disponible'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">CF-Cache-Status:</span>
                  <span className="text-xs text-gray-600 font-mono">
                    {headersList.get('cf-cache-status') || 'No disponible'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">CF-IPCountry:</span>
                  <span className="text-xs text-gray-600 font-mono">
                    {headersList.get('cf-ipcountry') || 'No disponible'}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Estado:</h3>
              {headersList.get('cf-ray') ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-600 text-2xl mr-3">✅</span>
                    <div>
                      <p className="text-green-800 font-semibold">Protegido por Cloudflare</p>
                      <p className="text-green-600 text-sm">Los headers de Cloudflare están presentes</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-600 text-2xl mr-3">⚠️</span>
                    <div>
                      <p className="text-yellow-800 font-semibold">No protegido por Cloudflare</p>
                      <p className="text-yellow-600 text-sm">Los headers de Cloudflare no están presentes</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
