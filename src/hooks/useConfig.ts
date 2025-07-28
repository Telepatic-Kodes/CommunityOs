'use client';

import { useState, useEffect } from 'react';
import { configManager, type CommunityConfig } from '@/lib/config';

interface UseConfigReturn {
  config: CommunityConfig;
  loading: boolean;
  error: string | null;
  isFeatureEnabled: (feature: keyof CommunityConfig['features']) => boolean;
  isModuleEnabled: (module: keyof CommunityConfig['modules']) => boolean;
  updateConfig: (updates: Partial<CommunityConfig>) => Promise<void>;
}

export function useConfig(organizationId: string = 'default'): UseConfigReturn {
  const [config, setConfig] = useState<CommunityConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedConfig = await configManager.getConfig(organizationId);
        setConfig(loadedConfig);
      } catch (err) {
        console.error('Error loading config:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [organizationId, mounted]);

  const isFeatureEnabled = (feature: keyof CommunityConfig['features']): boolean => {
    if (!config) return false;
    return config.features[feature] ?? false;
  };

  const isModuleEnabled = (module: keyof CommunityConfig['modules']): boolean => {
    if (!config) return false;
    return config.modules[module]?.enabled ?? false;
  };

  const updateConfig = async (updates: Partial<CommunityConfig>): Promise<void> => {
    if (!config) return;
    
    try {
      await configManager.updateConfig(organizationId, updates);
      const updatedConfig = await configManager.getConfig(organizationId);
      setConfig(updatedConfig);
    } catch (err) {
      console.error('Error updating config:', err);
      throw err;
    }
  };

  // Retornar configuración por defecto si no está montado
  if (!mounted) {
    return {
      config: {
        organization: { name: '', shortName: '', description: '', email: '' },
        branding: { primaryColor: '#000000', secondaryColor: '#000000', theme: 'auto', fontFamily: 'Inter' },
        features: { events: false, members: false, payments: false, voting: false, analytics: false, notifications: false, portal: false, settings: false },
        modules: {
          events: { enabled: false, maxEvents: 0, allowRecurring: false, requireApproval: false },
          members: { enabled: false, maxMembers: 0, allowSelfRegistration: false, requireApproval: false, roles: [] },
          payments: { enabled: false, currency: 'USD', allowMultiplePlans: false, requirePayment: false, providers: [] },
          voting: { enabled: false, allowMultipleVotes: false, requireAuthentication: false, methods: [] },
          analytics: { enabled: false, trackEvents: false, trackMembers: false, trackPayments: false, privacyMode: false },
          notifications: { enabled: false, email: false, push: false, sms: false, channels: [] }
        },
        communication: { emailTemplates: { welcome: '', eventReminder: '', paymentConfirmation: '', votingReminder: '' }, notifications: { enabled: false, frequency: 'immediate', channels: [] } },
        security: { authentication: { requireEmailVerification: false, requirePhoneVerification: false, allowSocialLogin: false, sessionTimeout: 0 }, dataProtection: { encryptPersonalData: false, anonymizeAnalytics: false, gdprCompliance: false, dataRetentionDays: 0 } },
        integrations: { stripe: { enabled: false }, sendgrid: { enabled: false }, google: { enabled: false } },
        regional: { locale: 'es-ES', timezone: 'UTC', currency: 'USD', dateFormat: 'DD/MM/YYYY', numberFormat: { decimal: ',', thousands: '.' } },
        support: { contact: {}, help: { enabled: false } },
        legal: { gdpr: { enabled: false, consentRequired: false, dataProcessingBasis: 'consent' } }
      },
      loading: true,
      error: null,
      isFeatureEnabled: () => false,
      isModuleEnabled: () => false,
      updateConfig: async () => {}
    };
  }

  return {
    config: config!,
    loading,
    error,
    isFeatureEnabled,
    isModuleEnabled,
    updateConfig
  };
} 