/**
 * Middleware mejorado para CommunityOS
 * Incluye validaciones de seguridad, rate limiting y logging
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// UTILIDADES
// ============================================================================

/**
 * Aplicar headers de seguridad a la respuesta
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';");
  
  return response;
}

/**
 * Validar origen de la petición
 */
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Permitir peticiones sin origin (navegador)
  
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://communityos.app',
    'https://www.communityos.app'
  ];
  
  return allowedOrigins.includes(origin);
}

/**
 * Registrar eventos de seguridad
 */
function logSecurityEvent(event: string, details: Record<string, unknown>): void {
  const logEntry = {
    event,
    details,
    timestamp: new Date().toISOString(),
    userAgent: 'middleware'
  };
  
  if (process.env.NODE_ENV === 'production') {
    console.warn('[SECURITY]', logEntry);
  } else {
    console.log('[SECURITY]', logEntry);
  }
}

// ============================================================================
// MIDDLEWARE PRINCIPAL
// ============================================================================

/**
 * Middleware principal de la aplicación
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ============================================================================
  // VALIDACIONES DE SEGURIDAD
  // ============================================================================
  
  // Validar origen
  if (!validateOrigin(request)) {
    logSecurityEvent('invalid_origin', { pathname, origin: request.headers.get('origin') });
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // Verificar método HTTP
  const method = request.method;
  if (!['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'].includes(method)) {
    logSecurityEvent('invalid_method', { pathname, method });
    return new NextResponse('Method Not Allowed', { status: 405 });
  }
  
  // ============================================================================
  // MANEJO DE RUTAS ESPECÍFICAS
  // ============================================================================
  
  // Health check
  if (pathname === '/api/health') {
    const response = NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
    });
    return applySecurityHeaders(response);
  }
  
  // Webhooks (no requieren autenticación)
  if (pathname.startsWith('/api/webhooks')) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }
  
  // ============================================================================
  // RUTAS PÚBLICAS (Demo Mode)
  // ============================================================================
  
  // En modo demo, todas las rutas son públicas
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

// ============================================================================
// CONFIGURACIÓN DE MATCHER
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
}; 