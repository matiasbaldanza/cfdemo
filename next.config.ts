import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Headers para páginas SSG
        source: '/ssg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=31536000, stale-while-revalidate=86400',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=31536000',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'max-age=31536000',
          },
          {
            key: 'X-Cache-Strategy',
            value: 'SSG-Static',
          },
        ],
      },
      {
        // Headers para páginas ISR
        source: '/isr',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'max-age=60',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'max-age=60',
          },
          {
            key: 'X-Cache-Strategy',
            value: 'ISR-Revalidating',
          },
        ],
      },
      {
        // Headers para páginas dinámicas
        source: '/dynamic/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-cache',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-cache',
          },
          {
            key: 'X-Cache-Strategy',
            value: 'Dynamic-No-Cache',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
