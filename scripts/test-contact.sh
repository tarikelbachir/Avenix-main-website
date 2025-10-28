#!/usr/bin/env bash
set -e

echo "========================================"
echo "🧪 Avenix Contact Form Tests"
echo "========================================"
echo ""

# Test 1: Zonder Turnstile token (verwachte fout: Captcha failed)
echo "Test 1: Zonder Turnstile token (verwacht: Captcha failed)"
echo "----------------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST https://www.avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hallo","cf-turnstile-response":"FAKE"}')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" = "400" ]; then
    echo "✅ Test 1 PASSED: Invalid Turnstile token rejected"
else
    echo "❌ Test 1 FAILED: Expected 400, got $http_code"
fi

echo ""
echo "========================================"
echo ""

# Test 2: Ontbrekende velden
echo "Test 2: Ontbrekende velden (verwacht: error)"
echo "----------------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST https://www.avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" = "400" ]; then
    echo "✅ Test 2 PASSED: Missing fields rejected"
else
    echo "❌ Test 2 FAILED: Expected 400, got $http_code"
fi

echo ""
echo "========================================"
echo ""

# Test 3: Honeypot test (moet silent succeeden)
echo "Test 3: Honeypot spam protection (verwacht: 200 OK, geen email)"
echo "----------------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST https://www.avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@spam.com","message":"Spam","company":"filled-by-bot","cf-turnstile-response":"token"}')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" = "200" ]; then
    echo "✅ Test 3 PASSED: Honeypot working (bot silently accepted)"
else
    echo "❌ Test 3 FAILED: Expected 200, got $http_code"
fi

echo ""
echo "========================================"
echo ""

# Test 4: Invalid email format
echo "Test 4: Invalid email format (verwacht: error)"
echo "----------------------------------------"
response=$(curl -s -w "\n%{http_code}" -X POST https://www.avenix.nl/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid-email","message":"Test","cf-turnstile-response":"token"}')

http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | head -n-1)

echo "HTTP Status: $http_code"
echo "Response: $body"
echo ""

if [ "$http_code" = "400" ]; then
    echo "✅ Test 4 PASSED: Invalid email rejected"
else
    echo "❌ Test 4 FAILED: Expected 400, got $http_code"
fi

echo ""
echo "========================================"
echo ""
echo "📝 NOTES:"
echo "- Voor een echte test met Turnstile: gebruik het formulier op de website"
echo "- Check Cloudflare Functions logs voor meer details"
echo "- Test emails worden verzonden naar: info@avenix.nl"
echo ""
echo "🔗 Live test: https://www.avenix.nl/contact.html"
echo ""

