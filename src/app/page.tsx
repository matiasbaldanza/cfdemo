import { headers } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  // Verificar si la request pasa por Cloudflare
  const headersList = await headers()
  const isCloudflare = headersList.has('cf-ray') ||
    headersList.has('cf-connecting-ip') ||
    headersList.has('cf-ipcountry')

  return (
    <main className="min-h-dvh grid place-items-center p-8 bg-[#1B66D6]">
      <section className="max-w-2xl text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link
            href="https://donweb.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-[#FF6602] hover:bg-[#FF7722] rounded-full mb-4 transition-colors"
          >
            <span className="text-white text-sm font-semibold tracking-wider">
              DONWEB CLOUD
            </span>
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Demo taller Cloudflare
          </h1>
          {isCloudflare ? (
            <div className="space-y-2">
              <p className="text-2xl text-balance text-white/90 max-w-lg mx-auto leading-relaxed">
                ✅ Protegido por Cloudflare
              </p>
              <p className="text-sm text-white/70">
                CF-Ray: {headersList.get('cf-ray')}
              </p>
            </div>
          ) : (
            <p className="text-2xl text-balance text-white/70 max-w-lg mx-auto leading-relaxed">
              ⚠️ Esta aplicación aún no está protegida por Cloudflare
            </p>
          )}
        </div>

        {/* API Info Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <p className="text-white/90 mb-4">Prueba el endpoint de la API:</p>
          <Link
            href="/api/hello"
            className="inline-block px-6 py-3 bg-[#FF6602] hover:bg-[#FF7722] text-white rounded-lg text-lg font-mono font-semibold shadow-lg transition-colors cursor-pointer"
          >
            /api/hello
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-[#FF6602] text-3xl mb-2">⚡</div>
            <h3 className="text-white font-semibold mb-2">Rápido</h3>
            <p className="text-white/80 text-sm">Entrega global ultrarrápida</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-[#FF6602] text-3xl mb-2">🔒</div>
            <h3 className="text-white font-semibold mb-2">Seguro</h3>
            <p className="text-white/80 text-sm">Protegido por Cloudflare</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-[#FF6602] text-3xl mb-2">🌍</div>
            <h3 className="text-white font-semibold mb-2">Global</h3>
            <p className="text-white/80 text-sm">Red edge mundial</p>
          </div>
        </div>
      </section>
    </main>
  )
}