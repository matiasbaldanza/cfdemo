#!/bin/bash

echo "🧪 Testing Cloudflare Cache Status"
echo "=================================="
echo ""

echo "1. Testing SSG page (should show cache behavior):"
echo "   curl -I http://localhost:3000/ssg"
echo ""

echo "2. Testing ISR page (should show cache with revalidation):"
echo "   curl -I http://localhost:3000/isr"
echo ""

echo "3. Testing Dynamic page (should show BYPASS or no cache status):"
echo "   curl -I http://localhost:3000/dynamic/test"
echo ""

echo "4. Testing API with cache:"
echo "   curl -I http://localhost:3000/api/cache"
echo ""

echo "5. Testing API strategies:"
echo "   curl -I 'http://localhost:3000/api/strategies?strategy=long'"
echo ""

echo "💡 Important Notes:"
echo "- CF-Cache-Status only appears when behind Cloudflare"
echo "- In local development, you won't see this header"
echo "- Deploy to production with Cloudflare to see cache behavior"
echo "- SSG pages will show HIT after first access"
echo "- ISR pages will show HIT until cache expires"
echo "- Dynamic pages will show BYPASS or no header"
