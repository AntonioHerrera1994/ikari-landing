// src/middleware.js
export function onRequest({ request, url }, next) {
  const pathname = url.pathname;

  // Si ya está en /en o es un asset, no hacer nada
  if (pathname.startsWith("/en") || pathname.includes(".")) {
    return next();
  }

  // Leer cabecera de país (Netlify la inyecta automáticamente)
  const country =
    request.headers.get("x-nf-country") ||       // Netlify
    request.headers.get("cf-ipcountry") ||        // Cloudflare
    request.headers.get("x-vercel-ip-country") || // Vercel
    null;

  // Si es USA y está en la raíz, redirigir a /en
  if (country === "US" && pathname === "/") {
    return Response.redirect(new URL("/en", url), 302);
  }

  return next();
}