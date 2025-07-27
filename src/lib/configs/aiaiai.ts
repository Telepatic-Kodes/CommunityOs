import { CommunityConfig } from '../config';

export const aiaiaiConfig: CommunityConfig = {
  // Información de la organización
  organization: {
    name: "AIAIAI CommunityOS",
    shortName: "AIAIAI",
    description: "Plataforma de gestión para la Asociación de Emprendedores de Chile",
    website: "https://aiaiai.cl",
    email: "info@aiaiai.cl",
    phone: "+56 2 2345 6789",
    address: "Av. Providencia 1234, Santiago, Chile",
    founded: "2020",
    legalName: "AIAIAI Consulting SpA",
    taxId: "76.123.456-7",
  },

  // Branding y diseño
  branding: {
    primaryColor: "#1F2937", // Gris oscuro
    secondaryColor: "#3B82F6", // Azul (antes accentColor)
    logo: "/aiaiai-logo.svg",
    favicon: "/aiaiai-favicon.ico",
    theme: "light",
    fontFamily: "Inter, system-ui, sans-serif",
  },

  // Funcionalidades habilitadas
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

  // Configuración de módulos
  modules: {
    members: {
      enabled: true,
      maxMembers: 5000,
      allowSelfRegistration: true,
      requireApproval: true,
      roles: ["admin", "member", "viewer"],
    },
    events: {
      enabled: true,
      maxEvents: 200,
      allowRecurring: true,
      requireApproval: true,
    },
    payments: {
      enabled: true,
      currency: "CLP",
      allowMultiplePlans: true,
      requirePayment: false,
      providers: ["stripe"],
    },
    voting: {
      enabled: true,
      allowMultipleVotes: false,
      requireAuthentication: true,
      methods: ["simple", "ranked"],
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
      channels: ["email", "push"],
    },
  },

  // Configuración de comunicación
  communication: {
    email: {
      enabled: true,
      provider: "sendgrid",
      fromEmail: "noreply@aiaiai.cl",
      fromName: "AIAIAI",
      templates: {
        welcome: "aiaiai-welcome-email",
        eventReminder: "aiaiai-event-reminder",
        paymentConfirmation: "aiaiai-payment-confirmation",
        votingReminder: "aiaiai-voting-reminder",
      },
    },
    sms: {
      enabled: false,
    },
    push: {
      enabled: true,
      provider: "firebase",
    },
  },

  // Configuración de seguridad
  security: {
    passwordPolicy: {
      minLength: 10,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true,
    },
    session: {
      timeout: 8 * 60 * 60, // 8 horas en segundos
      maxConcurrent: 3,
    },
    rateLimit: {
      enabled: true,
      maxRequests: 100,
      windowMs: 60000,
    },
  },

  // Configuración de integraciones
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

  // Configuración regional
  regional: {
    locale: "es-ES",
    timezone: "America/Santiago",
    currency: "CLP",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm",
  },

  // Configuración de soporte
  support: {
    enabled: true,
    email: "soporte@aiaiai.cl",
    phone: "+56 2 2345 6789",
    hours: "Lunes-Viernes 9:00-18:00 CLT",
    documentation: "https://docs.aiaiai.cl",
  },

  // Configuración legal
  legal: {
    privacyPolicy: "https://aiaiai.cl/privacidad",
    termsOfService: "https://aiaiai.cl/terminos",
    cookiePolicy: "https://aiaiai.cl/cookies",
    gdprCompliant: true,
  },
};

// Función para obtener configuración de AIAIAI
export function getAiaiaiConfig(): CommunityConfig {
  return aiaiaiConfig;
} 