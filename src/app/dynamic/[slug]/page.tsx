import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface DynamicPageProps {
  params: {
    slug: string
  }
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Simulate fetching data based on slug
async function getDynamicData(slug: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200))

  // Simulate different data based on slug
  const dataMap: Record<string, any> = {
    'test': {
      title: 'Página de Prueba',
      description: 'Esta es una página de prueba para testing',
      color: 'purple',
      features: ['Renderizado dinámico', 'Sin cache', 'Tiempo real']
    },
    'demo': {
      title: 'Página Demo',
      description: 'Demostración de renderizado dinámico',
      color: 'indigo',
      features: ['Datos personalizados', 'URL dinámica', 'Cloudflare headers']
    },
    'cloudflare': {
      title: 'Cloudflare Test',
      description: 'Testing específico para Cloudflare',
      color: 'orange',
      features: ['Edge computing', 'Global CDN', 'Security features']
    }
  }

  return dataMap[slug] || null
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const headersList = await headers()
  const data = await getDynamicData(params.slug)

  if (!data) {
    notFound()
  }

  const colorClasses = {
    purple: 'from-purple-50 to-violet-100',
    indigo: 'from-indigo-50 to-blue-100',
    orange: 'from-orange-50 to-amber-100'
  }

  const buttonColors = {
    purple: 'bg-purple-600 hover:bg-purple-700',
    indigo: 'bg-indigo-600 hover:bg-indigo-700',
    orange: 'bg-orange-600 hover:bg-orange-700'
  }

  return (
    <main className={`min-h-dvh bg-gradient-to-br ${colorClasses[data.color as keyof typeof colorClasses]} p-8`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg mb-4 transition-colors"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {data.title}
          </h1>
          <p className="text-gray-600 mb-2">
            {data.description}
          </p>
          <div className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-mono">
            /dynamic/{params.slug}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dynamic Content */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              🎯 Contenido Dinámico
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Slug</h3>
                <p className="text-sm text-gray-600 font-mono">{params.slug}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Timestamp</h3>
                <p className="text-sm text-gray-600 font-mono">{new Date().toISOString()}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Renderizado</h3>
                <p className="text-sm text-gray-600">Server-side (dinámico)</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">Características</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {data.features.map((feature: string, index: number) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
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
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">CF-Connecting-IP:</span>
                <span className="text-xs text-gray-600 font-mono">
                  {headersList.get('cf-connecting-ip') || 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Rendering Info */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🔄 Renderizado Dinámico
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-gray-800 mb-1">Tiempo Real</h3>
              <p className="text-sm text-gray-600">Datos frescos en cada request</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-800 mb-1">Personalizado</h3>
              <p className="text-sm text-gray-600">Contenido basado en URL</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">🔄</div>
              <h3 className="font-semibold text-gray-800 mb-1">Sin Cache</h3>
              <p className="text-sm text-gray-600">Siempre procesado en servidor</p>
            </div>
          </div>
        </div>

        {/* Test Different Slugs */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🧪 Probar Otros Slugs
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/dynamic/test"
              className={`px-4 py-2 ${buttonColors[data.color as keyof typeof buttonColors]} text-white rounded-lg font-semibold transition-colors`}
            >
              /test
            </Link>
            <Link
              href="/dynamic/demo"
              className={`px-4 py-2 ${buttonColors[data.color as keyof typeof buttonColors]} text-white rounded-lg font-semibold transition-colors`}
            >
              /demo
            </Link>
            <Link
              href="/dynamic/cloudflare"
              className={`px-4 py-2 ${buttonColors[data.color as keyof typeof buttonColors]} text-white rounded-lg font-semibold transition-colors`}
            >
              /cloudflare
            </Link>
          </div>
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
            href="/isr"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            Ver ISR →
          </Link>
        </div>
      </div>
    </main>
  )
}
