// Middleware temporal - se configurará cuando tengas las credenciales de Clerk
export function middleware() {
  // Middleware básico que permite todas las rutas por ahora
  // Se actualizará cuando se configure Clerk correctamente
  return;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}; 