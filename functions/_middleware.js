// functions/_middleware.js
// Security headers middleware voor alle routes

export async function onRequest(context) {
  const response = await context.next();
  
  // Create new headers object
  const newHeaders = new Headers(response.headers);
  
  // Security headers
  newHeaders.set('X-Content-Type-Options', 'nosniff');
  newHeaders.set('X-Frame-Options', 'DENY');
  newHeaders.set('X-XSS-Protection', '1; mode=block');
  newHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  newHeaders.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy
  newHeaders.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com https://www.google.com https://www.gstatic.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.tailwindcss.com; " +
    "font-src 'self' https://fonts.gstatic.com; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.resend.com; " +
    "frame-src https://www.google.com;"
  );

  // HSTS (HTTP Strict Transport Security)
  newHeaders.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Cache headers for static assets
  const url = new URL(context.request.url);
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/')) {
    newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (url.pathname.endsWith('.html')) {
    newHeaders.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
}

