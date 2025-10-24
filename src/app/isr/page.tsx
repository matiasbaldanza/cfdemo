import { headers } from 'next/headers'
import Link from 'next/link'

// ISR: Revalidate every 60 seconds
export const revalidate = 60

// Simulate fetching data that changes over time
async function getDynamicData() {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    timestamp: new Date().toISOString(),
    randomValue: Math.floor(Math.random() * 1000),
    serverTime: Date.now(),
    message: 'Este contenido se regenera cada 60 segundos'
  }
}

export default async function ISRPage() {
  const headersList = await headers()
  const data = await getDynamicData()

  return (
    <main className="min-h-dvh bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-4 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Incremental Static Regeneration (ISR)
          </h1>
          <p className="text-gray-600">
            Esta página se regenera cada 60 segundos
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dynamic Data */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🔄 Datos Dinámicos
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Timestamp</h3>
                <p className="text-sm text-gray-600 font-mono">{data.timestamp}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Valor Aleatorio</h3>
                <p className="text-sm text-gray-600 font-mono">{data.randomValue}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Server Time</h3>
                <p className="text-sm text-gray-600 font-mono">{data.serverTime}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Mensaje</h3>
                <p className="text-sm text-gray-600">{data.message}</p>
              </div>
            </div>
          </div>

          {/* Cache Information */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📊 Información de Cache
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Revalidation:</span>
                <span className="text-xs text-gray-600 font-mono">60 segundos</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-Cache-Status:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {headersList.get('cf-cache-status') || 'No disponible'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-Ray:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {headersList.get('cf-ray') || 'No disponible'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-IPCountry:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {headersList.get('cf-ipcountry') || 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ISR Benefits */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🎯 Beneficios del ISR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Rápido + Fresco</h3>
              <p className="text-sm text-gray-600">Cache + datos actualizados</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-800 mb-1">Regeneración</h3>
              <p className="text-sm text-gray-600">En segundo plano</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-800 mb-1">Escalable</h3>
              <p className="text-sm text-gray-600">Solo cuando es necesario</p>
            </div>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            🧪 Cómo Probar ISR
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
            <li>Recarga la página varias veces - verás los mismos datos por 60 segundos</li>
            <li>Espera 60+ segundos y recarga - los datos cambiarán</li>
            <li>Observa el header <code className="bg-yellow-100 px-1 rounded">cf-cache-status</code></li>
            <li>En Cloudflare, verás <code className="bg-yellow-100 px-1 rounded">HIT</code> o <code className="bg-yellow-100 px-1 rounded">MISS</code></li>
          </ol>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/ssg"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
          >
            ← Ver SSG
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
