import { type CommunityConfig } from '../config';

export function getProductionConfig(): CommunityConfig {
  return {
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
        maxEvents: 1000,
        allowRecurring: true,
        requireApproval: true,
      },
      members: {
        enabled: true,
        maxMembers: 10000,
        allowSelfRegistration: true,
        requireApproval: true,
        roles: ['admin', 'member', 'viewer'],
      },
      payments: {
        enabled: true,
        currency: 'MXN',
        allowMultiplePlans: true,
        requirePayment: false,
        providers: ['stripe', 'paypal'],
      },
      voting: {
        enabled: true,
        allowMultipleVotes: false,
        requireAuthentication: true,
        methods: ['simple', 'ranked'],
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
        sms: true,
        channels: ['email', 'push', 'sms'],
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
        channels: ['email', 'push'],
      },
    },
    security: {
      authentication: {
        requireEmailVerification: true,
        requirePhoneVerification: true,
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
        enabled: true,
      },
      sendgrid: {
        enabled: true,
      },
      google: {
        enabled: true,
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
        phone: '+52 55 1234 5678',
        website: 'https://support.communityos.com',
      },
      help: {
        enabled: true,
        documentation: 'https://docs.communityos.com',
        tutorials: 'https://tutorials.communityos.com',
      },
    },
    legal: {
      termsOfService: 'https://communityos.com/terms',
      privacyPolicy: 'https://communityos.com/privacy',
      cookiePolicy: 'https://communityos.com/cookies',
      gdpr: {
        enabled: true,
        consentRequired: true,
        dataProcessingBasis: 'consent',
      },
    },
  };
} 