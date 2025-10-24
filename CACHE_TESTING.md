# Cloudflare Caching Demo

Esta aplicación demuestra diferentes estrategias de caching con Cloudflare en Next.js.

## 🚀 Características Implementadas

### Estrategias de Renderizado

1. **SSG (Static Site Generation)** - `/ssg`
   - Página estática generada en build time
   - Cache permanente en Cloudflare Edge
   - Ideal para contenido que no cambia

2. **ISR (Incremental Static Regeneration)** - `/isr`
   - Regeneración incremental cada 60 segundos
   - Balance entre velocidad y datos frescos
   - Cache con revalidación en segundo plano

3. **Dynamic Rendering** - `/dynamic/[slug]`
   - Renderizado en servidor por request
   - Sin cache (siempre datos frescos)
   - Ideal para contenido personalizado

### API Endpoints

1. **`/api/hello`** - Endpoint básico con headers Cloudflare
2. **`/api/cache`** - API con cache optimizado para Cloudflare (5 min TTL)
3. **`/api/strategies`** - API con diferentes estrategias de cache:
   - `?strategy=long` - Cache largo (1 hora)
   - `?strategy=short` - Cache corto (30 segundos)
   - `?strategy=none` - Sin cache
   - `?strategy=stale` - Stale-while-revalidate

## 🧪 Cómo Probar el Cache

### 1. Verificar Headers Cloudflare
Observa estos headers en las respuestas:
- `cf-cache-status`: HIT, MISS, BYPASS, etc.
- `cf-ray`: ID único de la request
- `cf-ipcountry`: País del usuario
- `cache-control`: Estrategia de cache

### 2. Probar SSG
```bash
# La página se genera estáticamente
curl -I https://tu-dominio.com/ssg
# Observa: cache-control con valores largos
```

### 3. Probar ISR
```bash
# Recarga varias veces - datos iguales por 60s
curl https://tu-dominio.com/isr
# Espera 60+ segundos y recarga - datos cambian
```

### 4. Probar Dynamic
```bash
# Siempre datos frescos
curl https://tu-dominio.com/dynamic/test
curl https://tu-dominio.com/dynamic/demo
curl https://tu-dominio.com/dynamic/cloudflare
```

### 5. Probar APIs con Cache
```bash
# Cache por defecto (5 min)
curl https://tu-dominio.com/api/cache

# Diferentes estrategias
curl https://tu-dominio.com/api/strategies?strategy=long
curl https://tu-dominio.com/api/strategies?strategy=short
curl https://tu-dominio.com/api/strategies?strategy=none
```

## 📊 Interpretando Resultados

### Cache Status Headers
- **HIT**: Contenido servido desde cache
- **MISS**: Cache miss, contenido generado
- **BYPASS**: Cache bypassed (dynamic content)
- **EXPIRED**: Cache expirado, regenerando

### Cache-Control Headers
- `public`: Cacheable por CDN
- `s-maxage=X`: TTL para CDN (segundos)
- `stale-while-revalidate=X`: Tiempo para servir stale mientras regenera
- `no-cache`: Siempre validar con origen
- `no-store`: No cachear en absoluto

## 🌐 Cloudflare Features

La aplicación detecta automáticamente si está protegida por Cloudflare y muestra:
- CF-Ray ID
- País del usuario
- Estado del cache
- IP real del usuario

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

## 📝 Notas

- Las páginas SSG se generan en build time
- Las páginas ISR se regeneran cada 60 segundos
- Las páginas Dynamic se procesan en cada request
- Los APIs pueden tener diferentes estrategias de cache
- Cloudflare respeta los headers `Cache-Control` y `CDN-Cache-Control`
