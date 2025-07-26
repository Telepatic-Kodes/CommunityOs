import { clerkClient } from '@clerk/nextjs/server';
import { auth } from '@clerk/nextjs';

/**
 * Configuración de Clerk para autenticación
 * Maneja la autenticación multi-tenant para organizaciones
 */

export async function getCurrentUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }

  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function getCurrentUserWithOrg() {
  const { userId, orgId } = auth();
  
  if (!userId) {
    return { user: null, organization: null };
  }

  try {
    const [user, organization] = await Promise.all([
      clerkClient.users.getUser(userId),
      orgId ? clerkClient.organizations.getOrganization({ organizationId: orgId }) : null
    ]);

    return { user, organization };
  } catch (error) {
    console.error('Error fetching user with organization:', error);
    return { user: null, organization: null };
  }
}

/**
 * Verifica si el usuario tiene permisos de administrador en la organización
 */
export async function isAdmin() {
  const { userId, orgId } = auth();
  
  if (!userId || !orgId) {
    return false;
  }

  try {
    const membership = await clerkClient.organizations.getOrganizationMembership({
      organizationId: orgId,
      userId
    });

    return membership.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
} 