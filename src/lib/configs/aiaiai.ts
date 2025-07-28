import { type CommunityConfig } from '../config';

export function getDevelopmentConfig(): CommunityConfig {
  return {
    organization: {
      name: 'CommunityOS Development',
      shortName: 'COS-DEV',
      description: 'Plataforma de gestión inteligente para comunidades - Entorno de desarrollo',
      email: 'dev@communityos.com',
      website: 'https://dev.communityos.com',
      phone: '+52 55 1234 5678',
      address: 'Ciudad de México, México',
      founded: '2024',
      legalName: 'CommunityOS Development, S.A. de C.V.',
      taxId: 'COS-DEV-240101',
    },
    branding: {
      logo: 'https://dev.communityos.com/logo.png',
      favicon: 'https://dev.communityos.com/favicon.ico',
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
        maxEvents: 50,
        allowRecurring: true,
        requireApproval: false,
      },
      members: {
        enabled: true,
        maxMembers: 500,
        allowSelfRegistration: true,
        requireApproval: false,
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
        welcome: 'Bienvenido a nuestra comunidad de desarrollo',
        eventReminder: 'Recordatorio de evento de desarrollo',
        paymentConfirmation: 'Confirmación de pago de desarrollo',
        votingReminder: 'Recordatorio de votación de desarrollo',
      },
      notifications: {
        enabled: true,
        frequency: 'immediate',
        channels: ['email'],
      },
    },
    security: {
      authentication: {
        requireEmailVerification: false,
        requirePhoneVerification: false,
        allowSocialLogin: true,
        sessionTimeout: 120,
      },
      dataProtection: {
        encryptPersonalData: false,
        anonymizeAnalytics: true,
        gdprCompliance: false,
        dataRetentionDays: 30,
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
        email: 'dev-support@communityos.com',
      },
      help: {
        enabled: true,
      },
    },
    legal: {
      gdpr: {
        enabled: false,
        consentRequired: false,
        dataProcessingBasis: 'consent',
      },
    },
  };
} 