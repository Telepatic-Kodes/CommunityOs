/**
 * Sistema de configuración centralizado para CommunityOS
 * Incluye validación, cache y gestión por organización
 */

import { z } from 'zod';

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
 * Esquema para configuración de comunicación
 */
const communicationSchema = z.object({
  email: z.object({
    enabled: z.boolean().default(true),
    provider: z.enum(['sendgrid', 'mailgun', 'ses']).default('sendgrid'),
    fromEmail: z.string().email('Email de remitente inválido'),
    fromName: z.string().min(2).max(100),
    templates: z.record(z.string(), z.string()).default({}),
  }),
  sms: z.object({
    enabled: z.boolean().default(false),
    provider: z.enum(['twilio', 'aws-sns']).optional(),
    fromNumber: z.string().optional(),
  }),
  push: z.object({
    enabled: z.boolean().default(true),
    provider: z.enum(['firebase', 'onesignal']).default('firebase'),
  }),
});

/**
 * Esquema para configuración de seguridad
 */
const securitySchema = z.object({
  passwordPolicy: z.object({
    minLength: z.number().min(8).max(128).default(8),
    requireUppercase: z.boolean().default(true),
    requireLowercase: z.boolean().default(true),
    requireNumbers: z.boolean().default(true),
    requireSymbols: z.boolean().default(true),
  }),
  session: z.object({
    timeout: z.number().min(300).max(86400).default(3600),
    maxConcurrent: z.number().min(1).max(10).default(3),
  }),
  rateLimit: z.object({
    enabled: z.boolean().default(true),
    maxRequests: z.number().min(10).max(1000).default(100),
    windowMs: z.number().min(1000).max(3600000).default(60000),
  }),
});

/**
 * Esquema para configuración de integraciones
 */
const integrationsSchema = z.object({
  slack: z.object({
    enabled: z.boolean().default(false),
    webhookUrl: z.string().url('URL de webhook inválida').optional(),
    channel: z.string().optional(),
  }),
  discord: z.object({
    enabled: z.boolean().default(false),
    webhookUrl: z.string().url('URL de webhook inválida').optional(),
    channel: z.string().optional(),
  }),
  whatsapp: z.object({
    enabled: z.boolean().default(false),
    apiKey: z.string().optional(),
    phoneNumber: z.string().optional(),
  }),
});

/**
 * Esquema para configuración regional
 */
const regionalSchema = z.object({
  locale: z.string().default('es-ES'),
  timezone: z.string().default('America/Santiago'),
  currency: z.string().default('CLP'),
  dateFormat: z.string().default('DD/MM/YYYY'),
  timeFormat: z.string().default('HH:mm'),
});

/**
 * Esquema para configuración de soporte
 */
const supportSchema = z.object({
  enabled: z.boolean().default(true),
  email: z.string().email('Email de soporte inválido').optional(),
  phone: z.string().optional(),
  hours: z.string().optional(),
  documentation: z.string().url('URL de documentación inválida').optional(),
});

/**
 * Esquema para configuración legal
 */
const legalSchema = z.object({
  privacyPolicy: z.string().url('URL de política de privacidad inválida').optional(),
  termsOfService: z.string().url('URL de términos de servicio inválida').optional(),
  cookiePolicy: z.string().url('URL de política de cookies inválida').optional(),
  gdprCompliant: z.boolean().default(false),
});

/**
 * Esquema principal de configuración
 */
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
// TIPOS DERIVADOS
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

export const defaultConfig: CommunityConfig = {
  organization: {
    name: 'Mi Comunidad',
    shortName: 'MC',
    description: 'Una comunidad increíble para conectar personas',
    email: 'admin@micomunidad.com',
    website: 'https://micomunidad.com',
    phone: '+56 9 1234 5678',
    address: 'Santiago, Chile',
    founded: '2024',
    legalName: 'Mi Comunidad SpA',
    taxId: '76.123.456-7',
  },
  branding: {
    logo: 'https://via.placeholder.com/200x80/3B82F6/FFFFFF?text=Logo',
    favicon: 'https://via.placeholder.com/32x32/3B82F6/FFFFFF?text=F',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    theme: 'auto',
    fontFamily: 'Inter',
    customCSS: '',
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
      currency: 'CLP',
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
    email: {
      enabled: true,
      provider: 'sendgrid',
      fromEmail: 'noreply@micomunidad.com',
      fromName: 'Mi Comunidad',
      templates: {},
    },
    sms: {
      enabled: false,
    },
    push: {
      enabled: true,
      provider: 'firebase',
    },
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
    session: {
      timeout: 3600,
      maxConcurrent: 3,
    },
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000,
    },
  },
  integrations: {
    slack: {
      enabled: false,
    },
    discord: {
      enabled: false,
    },
    whatsapp: {
      enabled: false,
    },
  },
  regional: {
    locale: 'es-ES',
    timezone: 'America/Santiago',
    currency: 'CLP',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
  },
  support: {
    enabled: true,
    email: 'soporte@micomunidad.com',
    phone: '+56 9 1234 5678',
    hours: 'Lunes a Viernes 9:00 - 18:00',
    documentation: 'https://docs.micomunidad.com',
  },
  legal: {
    privacyPolicy: 'https://micomunidad.com/privacy',
    termsOfService: 'https://micomunidad.com/terms',
    cookiePolicy: 'https://micomunidad.com/cookies',
    gdprCompliant: false,
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

  /**
   * Obtiene la configuración para una organización
   */
  async getConfig(organizationId: string = 'default'): Promise<CommunityConfig> {
    // Verificar cache
    const cached = this.cache.get(organizationId);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.config;
    }

    // Cargar configuración
    let config: CommunityConfig;
    
    if (this.configs.has(organizationId)) {
      config = this.configs.get(organizationId)!;
    } else {
      config = await this.loadFromDatabase(organizationId);
      this.configs.set(organizationId, config);
    }

    // Actualizar cache
    this.cache.set(organizationId, {
      config,
      timestamp: Date.now(),
    });

    return config;
  }

  /**
   * Actualiza la configuración de una organización
   */
  async updateConfig(organizationId: string, updates: Partial<CommunityConfig>): Promise<void> {
    const currentConfig = await this.getConfig(organizationId);
    const updatedConfig = { ...currentConfig, ...updates };
    
    // Validar configuración actualizada
    const validation = this.validateConfig(updatedConfig);
    if (!validation.success) {
      throw new Error(`Configuración inválida: ${validation.error}`);
    }

    // Guardar configuración
    this.configs.set(organizationId, updatedConfig);
    await this.saveToDatabase(organizationId, updatedConfig);
    
    // Limpiar cache
    this.clearCache(organizationId);
  }

  /**
   * Valida una configuración
   */
  validateConfig(config: unknown): { success: true; config: CommunityConfig } | { success: false; error: string } {
    try {
      const validatedConfig = configSchema.parse(config);
      return { success: true, config: validatedConfig };
    } catch (error) {
      return { success: false, error: 'Error de validación de configuración' };
    }
  }

  /**
   * Carga configuración desde la base de datos
   */
  private async loadFromDatabase(organizationId: string): Promise<CommunityConfig> {
    // TODO: Implementar carga desde base de datos
    console.log(`Cargando configuración para organización: ${organizationId}`);
    return defaultConfig;
  }

  /**
   * Guarda configuración en la base de datos
   */
  private async saveToDatabase(organizationId: string, config: CommunityConfig): Promise<void> {
    // TODO: Implementar guardado en base de datos
    console.log(`Guardando configuración para organización: ${organizationId}`);
  }

  /**
   * Limpia el cache
   */
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

export { ConfigManager };
export { configSchema }; 