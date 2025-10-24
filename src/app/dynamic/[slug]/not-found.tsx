import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-dvh bg-gradient-to-br from-red-50 to-pink-100 p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            El slug que buscas no existe en nuestro sistema dinámico
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            🧪 Slugs Disponibles para Probar
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/dynamic/test"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
              /test
            </Link>
            <Link
              href="/dynamic/demo"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
            >
              /demo
            </Link>
            <Link
              href="/dynamic/cloudflare"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors"
            >
              /cloudflare
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  )
}
