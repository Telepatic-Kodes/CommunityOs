/**
 * Configuración de Clerk para CommunityOS
 * Centraliza todas las configuraciones relacionadas con autenticación
 */

// ============================================================================
// CONFIGURACIÓN DE CLERK
// ============================================================================

export const clerkConfig = {
  // Configuración básica
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
  secretKey: process.env.CLERK_SECRET_KEY!,
  
  // Configuración de la aplicación
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Configuración de organizaciones
  organization: {
    // Permitir creación de organizaciones
    createOrganization: true,
    
    // Configuración de roles
    roles: {
      admin: {
        name: 'Administrador',
        description: 'Acceso completo a todas las funcionalidades',
        permissions: [
          'manage_members',
          'manage_events',
          'manage_payments',
          'manage_voting',
          'view_analytics',
          'manage_settings',
          'invite_members',
          'remove_members',
          'change_roles'
        ]
      },
      member: {
        name: 'Miembro',
        description: 'Acceso a funcionalidades básicas',
        permissions: [
          'view_members',
          'view_events',
          'participate_voting',
          'view_analytics'
        ]
      },
      viewer: {
        name: 'Observador',
        description: 'Acceso de solo lectura',
        permissions: [
          'view_members',
          'view_events',
          'view_analytics'
        ]
      }
    },
    
    // Configuración de invitaciones
    invitations: {
      // Permitir invitaciones por email
      emailInvitations: true,
      
      // Configuración de roles por defecto
      defaultRole: 'member',
      
      // Plantillas de email personalizadas
      emailTemplates: {
        invitation: {
          subject: 'Invitación a unirse a {{organization_name}}',
          body: `
            Hola {{invitee_email}},
            
            Has sido invitado a unirte a {{organization_name}} en CommunityOS.
            
            Para aceptar la invitación, haz clic en el siguiente enlace:
            {{invitation_url}}
            
            Si tienes alguna pregunta, no dudes en contactarnos.
            
            Saludos,
            El equipo de CommunityOS
          `
        }
      }
    }
  },
  
  // Configuración de autenticación
  auth: {
    // Métodos de autenticación permitidos
    signInMethods: ['email', 'google', 'github'],
    
    // Configuración de sesiones
    session: {
      // Duración de la sesión (en segundos)
      duration: 24 * 60 * 60, // 24 horas
      
      // Renovación automática
      autoRenew: true,
      
      // Configuración de cookies
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true
      }
    },
    
    // Configuración de verificación de email
    emailVerification: {
      required: true,
      redirectUrl: '/dashboard'
    },
    
    // Configuración de recuperación de contraseña
    passwordReset: {
      enabled: true,
      redirectUrl: '/auth/reset-password'
    }
  },
  
  // Configuración de seguridad
  security: {
    // Configuración de MFA (Multi-Factor Authentication)
    mfa: {
      enabled: false, // TODO: Habilitar en producción
      methods: ['totp', 'sms'],
      required: false
    },
    
    // Configuración de rate limiting
    rateLimit: {
      enabled: true,
      maxAttempts: 5,
      windowMs: 15 * 60 * 1000, // 15 minutos
      blockDuration: 60 * 60 * 1000 // 1 hora
    },
    
    // Configuración de IP allowlist
    ipAllowlist: {
      enabled: false, // TODO: Configurar en producción
      allowedIPs: []
    }
  },
  
  // Configuración de webhooks
  webhooks: {
    enabled: true,
    endpoints: {
      userCreated: '/api/webhooks/clerk/user-created',
      userUpdated: '/api/webhooks/clerk/user-updated',
      userDeleted: '/api/webhooks/clerk/user-deleted',
      organizationCreated: '/api/webhooks/clerk/organization-created',
      organizationUpdated: '/api/webhooks/clerk/organization-updated',
      organizationDeleted: '/api/webhooks/clerk/organization-deleted',
      membershipCreated: '/api/webhooks/clerk/membership-created',
      membershipUpdated: '/api/webhooks/clerk/membership-updated',
      membershipDeleted: '/api/webhooks/clerk/membership-deleted'
    }
  },
  
  // Configuración de personalización
  appearance: {
    // Colores de la marca
    colors: {
      primary: '#3B82F6',
      secondary: '#6B7280',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444'
    },
    
    // Logo de la aplicación
    logo: '/logo.png',
    
    // Configuración de idioma
    locale: 'es',
    
    // Configuración de tema
    theme: 'light' // 'light' | 'dark' | 'auto'
  }
};

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

/**
 * Verifica si Clerk está configurado correctamente
 */
export function isClerkConfigured(): boolean {
  return !!(clerkConfig.publishableKey && clerkConfig.secretKey);
}

/**
 * Obtiene la configuración de Clerk para el cliente
 */
export function getClerkClientConfig() {
  return {
    publishableKey: clerkConfig.publishableKey,
    appearance: clerkConfig.appearance,
    organization: {
      createOrganization: clerkConfig.organization.createOrganization,
      defaultRole: clerkConfig.organization.invitations.defaultRole
    }
  };
}

/**
 * Obtiene la configuración de Clerk para el servidor
 */
export function getClerkServerConfig() {
  return {
    secretKey: clerkConfig.secretKey,
    webhooks: clerkConfig.webhooks,
    security: clerkConfig.security
  };
}

/**
 * Valida la configuración de Clerk
 */
export function validateClerkConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!clerkConfig.publishableKey) {
    errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY no está configurada');
  }
  
  if (!clerkConfig.secretKey) {
    errors.push('CLERK_SECRET_KEY no está configurada');
  }
  
  if (!clerkConfig.appUrl) {
    errors.push('NEXT_PUBLIC_APP_URL no está configurada');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

// ============================================================================
// TIPOS DE CONFIGURACIÓN
// ============================================================================

export interface ClerkRole {
  name: string;
  description: string;
  permissions: string[];
}

export interface ClerkInvitationConfig {
  emailInvitations: boolean;
  defaultRole: string;
  emailTemplates: {
    invitation: {
      subject: string;
      body: string;
    };
  };
}

export interface ClerkSecurityConfig {
  mfa: {
    enabled: boolean;
    methods: string[];
    required: boolean;
  };
  rateLimit: {
    enabled: boolean;
    maxAttempts: number;
    windowMs: number;
    blockDuration: number;
  };
  ipAllowlist: {
    enabled: boolean;
    allowedIPs: string[];
  };
}

export interface ClerkWebhookConfig {
  enabled: boolean;
  endpoints: {
    userCreated: string;
    userUpdated: string;
    userDeleted: string;
    organizationCreated: string;
    organizationUpdated: string;
    organizationDeleted: string;
    membershipCreated: string;
    membershipUpdated: string;
    membershipDeleted: string;
  };
} 