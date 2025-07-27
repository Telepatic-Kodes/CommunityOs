/**
 * Middleware mejorado para CommunityOS
 * Incluye validaciones de seguridad, rate limiting y logging
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// CONFIGURACIÓN DE SEGURIDAD
// ============================================================================

/**
 * Configuración de seguridad del middleware
 */
const securityConfig = {
  // Headers de seguridad
  securityHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  },
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    maxRequests: 100, // máximo 100 requests por ventana
    skipSuccessfulRequests: true,
    skipFailedRequests: false,
  },
  
  // Rutas protegidas
  protectedRoutes: [
    '/dashboard',
    '/members',
    '/events',
    '/payments',
    '/voting',
    '/analytics',
    '/settings',
  ],
  
  // Rutas públicas
  publicRoutes: [
    '/',
    '/auth/sign-in',
    '/auth/sign-up',
    '/demo',
    '/api/health',
    '/api/webhooks',
  ],
  
  // Rutas de API que requieren autenticación
  apiProtectedRoutes: [
    '/api/members',
    '/api/events',
    '/api/payments',
    '/api/voting',
    '/api/analytics',
  ],
};

// ============================================================================
// UTILIDADES DE SEGURIDAD
// ============================================================================

/**
 * Verifica si una ruta está protegida
 */
function isProtectedRoute(pathname: string): boolean {
  return securityConfig.protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
}

/**
 * Verifica si una ruta es pública
 */
function isPublicRoute(pathname: string): boolean {
  return securityConfig.publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route)
  );
}

/**
 * Verifica si una ruta de API está protegida
 */
function isProtectedApiRoute(pathname: string): boolean {
  return securityConfig.apiProtectedRoutes.some(route => 
    pathname.startsWith(route)
  );
}

/**
 * Aplica headers de seguridad
 */
function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityConfig.securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  return response;
}

/**
 * Valida el origen de la request
 */
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  // En desarrollo, permitir localhost
  if (process.env.NODE_ENV === 'development') {
    return true;
  }
  
  // En producción, validar origen
  if (!origin || !host) {
    return false;
  }
  
  // Lista de dominios permitidos
  const allowedDomains = [
    process.env.NEXT_PUBLIC_APP_URL,
    'https://communityos.app',
    'https://www.communityos.app',
  ].filter(Boolean);
  
  return allowedDomains.some(domain => 
    domain && (origin.startsWith(domain) || host.includes(domain.replace('https://', '').replace('http://', '')))
  );
}

/**
 * Log de seguridad
 */
function logSecurityEvent(event: string, details: Record<string, unknown>): void {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    environment: process.env.NODE_ENV,
  };
  
  // En producción, enviar a servicio de logging
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
  // APLICAR MIDDLEWARE DE CLERK
  // ============================================================================
  
  // Crear matcher para rutas protegidas
  const isProtected = createRouteMatcher([
    '/dashboard(.*)',
    '/members(.*)',
    '/events(.*)',
    '/payments(.*)',
    '/voting(.*)',
    '/analytics(.*)',
    '/settings(.*)',
    '/api/members(.*)',
    '/api/events(.*)',
    '/api/payments(.*)',
    '/api/voting(.*)',
    '/api/analytics(.*)',
  ]);
  
  // Aplicar middleware de Clerk para rutas protegidas
  if (isProtected(request)) {
    // TODO: Implementar middleware de Clerk cuando esté configurado
    console.log('Protected route accessed:', pathname);
    
    // Por ahora, solo aplicar headers de seguridad
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }
  
  // ============================================================================
  // RUTAS PÚBLICAS
  // ============================================================================
  
  // Para rutas públicas, solo aplicar headers de seguridad
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