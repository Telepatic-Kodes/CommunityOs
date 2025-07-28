/**
 * Sistema de configuración centralizado para CommunityOS
 * Incluye validación, cache y gestión por organización
 */

import { z } from 'zod';
import { getDevelopmentConfig } from './configs/aiaiai';
import { getProductionConfig } from './configs/production';

// ============================================================================
// ESQUEMAS DE VALIDACIÓN
// ============================================================================

/**
 * Esquema para configuración de organización
 */
const organizationSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  shortName: z.string().min(2).max(20),
  description: z.string().min(10).max(500),
  email: z.string().email('Email inválido'),
  website: z.string().url('URL inválida').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  founded: z.string().optional(),
  legalName: z.string().optional(),
  taxId: z.string().optional(),
});

/**
 * Esquema para configuración de marca
 */
const brandingSchema = z.object({
  logo: z.string().url('URL de logo inválida').optional(),
  favicon: z.string().url('URL de favicon inválida').optional(),
  primaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color primario inválido'),
  secondaryColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color secundario inválido'),
  theme: z.enum(['light', 'dark', 'auto']).default('auto'),
  fontFamily: z.string().default('Inter'),
  customCSS: z.string().optional(),
});

/**
 * Esquema para configuración de características
 */
const featuresSchema = z.object({
  events: z.boolean().default(true),
  members: z.boolean().default(true),
  payments: z.boolean().default(true),
  voting: z.boolean().default(true),
  analytics: z.boolean().default(true),
  notifications: z.boolean().default(true),
  portal: z.boolean().default(true),
  settings: z.boolean().default(true),
});

/**
 * Esquema para configuración de módulos
 */
const modulesSchema = z.object({
  events: z.object({
    enabled: z.boolean().default(true),
    maxEvents: z.number().min(1).max(1000).default(100),
    allowRecurring: z.boolean().default(true),
    requireApproval: z.boolean().default(false),
  }),
  members: z.object({
    enabled: z.boolean().default(true),
    maxMembers: z.number().min(1).max(10000).default(1000),
    allowSelfRegistration: z.boolean().default(true),
    requireApproval: z.boolean().default(true),
    roles: z.array(z.enum(['admin', 'member', 'viewer'])).default(['admin', 'member', 'viewer']),
  }),
  payments: z.object({
    enabled: z.boolean().default(true),
    currency: z.string().default('USD'),
    allowMultiplePlans: z.boolean().default(true),
    requirePayment: z.boolean().default(false),
    providers: z.array(z.enum(['stripe', 'paypal', 'mercadopago'])).default(['stripe']),
  }),
  voting: z.object({
    enabled: z.boolean().default(true),
    allowMultipleVotes: z.boolean().default(false),
    requireAuthentication: z.boolean().default(true),
    methods: z.array(z.enum(['simple', 'ranked', 'approval'])).default(['simple']),
  }),
  analytics: z.object({
    enabled: z.boolean().default(true),
    trackEvents: z.boolean().default(true),
    trackMembers: z.boolean().default(true),
    trackPayments: z.boolean().default(true),
    privacyMode: z.boolean().default(false),
  }),
  notifications: z.object({
    enabled: z.boolean().default(true),
    email: z.boolean().default(true),
    push: z.boolean().default(true),
    sms: z.boolean().default(false),
    channels: z.array(z.enum(['email', 'push', 'sms'])).default(['email', 'push']),
  }),
});

/**
 * Esquema para configuración de comunicaciones
 */
const communicationSchema = z.object({
  emailTemplates: z.object({
    welcome: z.string().default('Bienvenido a nuestra comunidad'),
    eventReminder: z.string().default('Recordatorio de evento'),
    paymentConfirmation: z.string().default('Confirmación de pago'),
    votingReminder: z.string().default('Recordatorio de votación'),
  }),
  notifications: z.object({
    enabled: z.boolean().default(true),
    frequency: z.enum(['immediate', 'daily', 'weekly']).default('immediate'),
    channels: z.array(z.enum(['email', 'push', 'sms'])).default(['email']),
  }),
});

/**
 * Esquema para configuración de seguridad
 */
const securitySchema = z.object({
  authentication: z.object({
    requireEmailVerification: z.boolean().default(true),
    requirePhoneVerification: z.boolean().default(false),
    allowSocialLogin: z.boolean().default(true),
    sessionTimeout: z.number().min(15).max(1440).default(60), // minutos
  }),
  dataProtection: z.object({
    encryptPersonalData: z.boolean().default(true),
    anonymizeAnalytics: z.boolean().default(false),
    gdprCompliance: z.boolean().default(true),
    dataRetentionDays: z.number().min(30).max(3650).default(1095), // 3 años
  }),
});

/**
 * Esquema para configuración de integraciones
 */
const integrationsSchema = z.object({
  stripe: z.object({
    enabled: z.boolean().default(false),
    publishableKey: z.string().optional(),
    secretKey: z.string().optional(),
    webhookSecret: z.string().optional(),
  }),
  sendgrid: z.object({
    enabled: z.boolean().default(false),
    apiKey: z.string().optional(),
    fromEmail: z.string().email().optional(),
  }),
  google: z.object({
    enabled: z.boolean().default(false),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
  }),
});

/**
 * Esquema para configuración regional
 */
const regionalSchema = z.object({
  locale: z.string().default('es-ES'),
  timezone: z.string().default('America/Mexico_City'),
  currency: z.string().default('MXN'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  numberFormat: z.object({
    decimal: z.string().default(','),
    thousands: z.string().default('.'),
  }),
});

/**
 * Esquema para configuración de soporte
 */
const supportSchema = z.object({
  contact: z.object({
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
  }),
  help: z.object({
    enabled: z.boolean().default(true),
    documentation: z.string().url().optional(),
    tutorials: z.string().url().optional(),
  }),
});

/**
 * Esquema para configuración legal
 */
const legalSchema = z.object({
  termsOfService: z.string().url().optional(),
  privacyPolicy: z.string().url().optional(),
  cookiePolicy: z.string().url().optional(),
  gdpr: z.object({
    enabled: z.boolean().default(true),
    consentRequired: z.boolean().default(true),
    dataProcessingBasis: z.enum(['consent', 'legitimate_interest', 'contract']).default('consent'),
  }),
});

// ============================================================================
// ESQUEMA PRINCIPAL
// ============================================================================

const configSchema = z.object({
  organization: organizationSchema,
  branding: brandingSchema,
  features: featuresSchema,
  modules: modulesSchema,
  communication: communicationSchema,
  security: securitySchema,
  integrations: integrationsSchema,
  regional: regionalSchema,
  support: supportSchema,
  legal: legalSchema,
});

// ============================================================================
// TIPOS EXPORTADOS
// ============================================================================

export type CommunityConfig = z.infer<typeof configSchema>;
export type OrganizationConfig = z.infer<typeof organizationSchema>;
export type BrandingConfig = z.infer<typeof brandingSchema>;
export type FeaturesConfig = z.infer<typeof featuresSchema>;
export type ModulesConfig = z.infer<typeof modulesSchema>;
export type CommunicationConfig = z.infer<typeof communicationSchema>;
export type SecurityConfig = z.infer<typeof securitySchema>;
export type IntegrationsConfig = z.infer<typeof integrationsSchema>;
export type RegionalConfig = z.infer<typeof regionalSchema>;
export type SupportConfig = z.infer<typeof supportSchema>;
export type LegalConfig = z.infer<typeof legalSchema>;

// ============================================================================
// CONFIGURACIÓN POR DEFECTO
// ============================================================================

const defaultConfig: CommunityConfig = {
  organization: {
    name: 'CommunityOS',
    shortName: 'COS',
    description: 'Plataforma de gestión inteligente para comunidades',
    email: 'info@communityos.com',
    website: 'https://communityos.com',
    phone: '+52 55 1234 5678',
    address: 'Ciudad de México, México',
    founded: '2024',
    legalName: 'CommunityOS, S.A. de C.V.',
    taxId: 'COS240101ABC',
  },
  branding: {
    logo: 'https://communityos.com/logo.png',
    favicon: 'https://communityos.com/favicon.ico',
    primaryColor: '#2563eb',
    secondaryColor: '#7c3aed',
    theme: 'auto',
    fontFamily: 'Inter',
  },
  features: {
    events: true,
    members: true,
    payments: true,
    voting: true,
    analytics: true,
    notifications: true,
    portal: true,
    settings: true,
  },
  modules: {
    events: {
      enabled: true,
      maxEvents: 100,
      allowRecurring: true,
      requireApproval: false,
    },
    members: {
      enabled: true,
      maxMembers: 1000,
      allowSelfRegistration: true,
      requireApproval: true,
      roles: ['admin', 'member', 'viewer'],
    },
    payments: {
      enabled: true,
      currency: 'MXN',
      allowMultiplePlans: true,
      requirePayment: false,
      providers: ['stripe'],
    },
    voting: {
      enabled: true,
      allowMultipleVotes: false,
      requireAuthentication: true,
      methods: ['simple'],
    },
    analytics: {
      enabled: true,
      trackEvents: true,
      trackMembers: true,
      trackPayments: true,
      privacyMode: false,
    },
    notifications: {
      enabled: true,
      email: true,
      push: true,
      sms: false,
      channels: ['email', 'push'],
    },
  },
  communication: {
    emailTemplates: {
      welcome: 'Bienvenido a nuestra comunidad',
      eventReminder: 'Recordatorio de evento',
      paymentConfirmation: 'Confirmación de pago',
      votingReminder: 'Recordatorio de votación',
    },
    notifications: {
      enabled: true,
      frequency: 'immediate',
      channels: ['email'],
    },
  },
  security: {
    authentication: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      allowSocialLogin: true,
      sessionTimeout: 60,
    },
    dataProtection: {
      encryptPersonalData: true,
      anonymizeAnalytics: false,
      gdprCompliance: true,
      dataRetentionDays: 1095,
    },
  },
  integrations: {
    stripe: {
      enabled: false,
    },
    sendgrid: {
      enabled: false,
    },
    google: {
      enabled: false,
    },
  },
  regional: {
    locale: 'es-ES',
    timezone: 'America/Mexico_City',
    currency: 'MXN',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: {
      decimal: ',',
      thousands: '.',
    },
  },
  support: {
    contact: {
      email: 'soporte@communityos.com',
    },
    help: {
      enabled: true,
    },
  },
  legal: {
    gdpr: {
      enabled: true,
      consentRequired: true,
      dataProcessingBasis: 'consent',
    },
  },
};

// ============================================================================
// GESTOR DE CONFIGURACIÓN
// ============================================================================

class ConfigManager {
  private static instance: ConfigManager;
  private configs: Map<string, CommunityConfig> = new Map();
  private cache: Map<string, { config: CommunityConfig; timestamp: number }> = new Map();
  private readonly cacheTimeout = 5 * 60 * 1000; // 5 minutos

  private constructor() {}

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  async getConfig(organizationId: string = 'default'): Promise<CommunityConfig> {
    try {
      // Verificar cache
      const cached = this.cache.get(organizationId);
      if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.config;
      }

      // Cargar configuración
      let config: CommunityConfig;
      
      if (organizationId === 'default') {
        config = process.env.NODE_ENV === 'production' 
          ? getProductionConfig() 
          : getDevelopmentConfig();
      } else {
        config = await this.loadFromDatabase(organizationId);
      }

      // Validar configuración
      const validation = this.validateConfig(config);
      if (!validation.success) {
        console.error('Error de validación de configuración:', validation.error);
        config = defaultConfig;
      }

      // Actualizar cache
      this.cache.set(organizationId, {
        config,
        timestamp: Date.now()
      });

      return config;
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      return defaultConfig;
    }
  }

  async updateConfig(organizationId: string, updates: Partial<CommunityConfig>): Promise<void> {
    try {
      const currentConfig = await this.getConfig(organizationId);
      const updatedConfig = { ...currentConfig, ...updates };
      
      const validation = this.validateConfig(updatedConfig);
      if (!validation.success) {
        throw new Error(`Configuración inválida: ${validation.error}`);
      }

      await this.saveToDatabase(organizationId, updatedConfig);
      this.clearCache(organizationId);
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
      throw error;
    }
  }

  validateConfig(config: unknown): { success: true; config: CommunityConfig } | { success: false; error: string } {
    try {
      const validatedConfig = configSchema.parse(config);
      return { success: true, config: validatedConfig };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { success: false, error: error.issues.map(e => e.message).join(', ') };
      }
      return { success: false, error: 'Error de validación desconocido' };
    }
  }

  private async loadFromDatabase(organizationId: string): Promise<CommunityConfig> {
    try {
      // Simulación de carga desde base de datos
      // En producción, aquí se cargaría desde Supabase
      return defaultConfig;
    } catch (error) {
      console.error('Error al cargar desde base de datos:', error);
      return defaultConfig;
    }
  }

  private async saveToDatabase(organizationId: string, config: CommunityConfig): Promise<void> {
    try {
      // Simulación de guardado en base de datos
      // En producción, aquí se guardaría en Supabase
      console.log(`Configuración guardada para organización: ${organizationId}`);
    } catch (error) {
      console.error('Error al guardar en base de datos:', error);
      throw error;
    }
  }

  clearCache(organizationId?: string): void {
    if (organizationId) {
      this.cache.delete(organizationId);
    } else {
      this.cache.clear();
    }
  }
}

// ============================================================================
// EXPORTACIONES
// ============================================================================

export const configManager = ConfigManager.getInstance();
export { defaultConfig }; 