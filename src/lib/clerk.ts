/**
 * Configuración de Clerk para autenticación
 * Maneja la autenticación multi-tenant para organizaciones
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// ============================================================================
// TIPOS Y INTERFACES
// ============================================================================

export interface ClerkUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClerkOrganization {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClerkMembership {
  id: string;
  role: 'admin' | 'basic_member';
  organizationId: string;
}

// ============================================================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================================================

/**
 * Obtiene el usuario actual autenticado
 */
export async function getCurrentUser(): Promise<ClerkUser | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      imageUrl: user.imageUrl,
      createdAt: new Date(user.createdAt).toISOString(),
      updatedAt: new Date(user.updatedAt).toISOString(),
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Obtiene el usuario actual con su organización
 */
export async function getCurrentUserWithOrg(): Promise<{
  user: ClerkUser | null;
  organization: ClerkOrganization | null;
}> {
  try {
    const { userId, orgId } = await auth();
    
    if (!userId) {
      return { user: null, organization: null };
    }

    const user = await currentUser();
    if (!user) {
      return { user: null, organization: null };
    }

    const clerkUser: ClerkUser = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      imageUrl: user.imageUrl,
      createdAt: new Date(user.createdAt).toISOString(),
      updatedAt: new Date(user.updatedAt).toISOString(),
    };

    // Por ahora, retornamos una organización simulada
    // TODO: Implementar cuando se configure Clerk completamente
    const clerkOrg: ClerkOrganization | null = orgId ? {
      id: orgId,
      name: 'Mi Organización',
      slug: 'mi-organizacion',
      imageUrl: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } : null;

    return { user: clerkUser, organization: clerkOrg };
  } catch (error) {
    console.error('Error getting current user with org:', error);
    return { user: null, organization: null };
  }
}

/**
 * Verifica si el usuario tiene permisos de administrador en la organización
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { userId, orgId } = await auth();
    
    if (!userId || !orgId) return false;

    // Por ahora, asumimos que todos los usuarios son admin
    // TODO: Implementar verificación real cuando se configure Clerk
    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Verifica si el usuario es propietario de la organización
 */
export async function isOwner(): Promise<boolean> {
  try {
    const { userId, orgId } = await auth();
    
    if (!userId || !orgId) return false;

    // Por ahora, asumimos que todos los usuarios son propietarios
    // TODO: Implementar verificación real cuando se configure Clerk
    return true;
  } catch (error) {
    console.error('Error checking owner status:', error);
    return false;
  }
}

/**
 * Obtiene la membresía del usuario en la organización actual
 */
export async function getCurrentMembership(): Promise<ClerkMembership | null> {
  try {
    const { userId, orgId } = await auth();
    
    if (!userId || !orgId) return null;

    return {
      id: `${userId}-${orgId}`,
      role: 'admin',
      organizationId: orgId,
    };
  } catch (error) {
    console.error('Error getting current membership:', error);
    return null;
  }
}

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Obtiene el ID de la organización actual
 */
export async function getCurrentOrganizationId(): Promise<string | null> {
  const { orgId } = await auth();
  return orgId || null;
}

/**
 * Obtiene el ID del usuario actual
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId;
}

/**
 * Verifica si el usuario está en una organización
 */
export async function isInOrganization(): Promise<boolean> {
  const { orgId } = await auth();
  return !!orgId;
}

// ============================================================================
// FUNCIONES DE AUTORIZACIÓN
// ============================================================================

/**
 * Middleware para proteger rutas que requieren autenticación
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/auth/sign-in');
  }
}

/**
 * Middleware para proteger rutas que requieren permisos de administrador
 */
export async function requireAdmin() {
  const { userId, orgId } = await auth();
  
  if (!userId) {
    redirect('/auth/sign-in');
  }

  if (!orgId) {
    redirect('/dashboard');
  }

  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) {
    redirect('/dashboard');
  }
}

/**
 * Middleware para proteger rutas que requieren permisos de propietario
 */
export async function requireOwner() {
  const { userId, orgId } = await auth();
  
  if (!userId) {
    redirect('/auth/sign-in');
  }

  if (!orgId) {
    redirect('/dashboard');
  }

  const isUserOwner = await isOwner();
  if (!isUserOwner) {
    redirect('/dashboard');
  }
} 