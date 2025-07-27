'use client';

import React from 'react';
import { ConfigManager, defaultConfig, type CommunityConfig, type FeaturesConfig, type ModulesConfig } from '@/lib/config';

/**
 * Hook para usar la configuración de la aplicación
 */
export function useConfig(organizationId?: string) {
  const [config, setConfig] = React.useState<CommunityConfig>(defaultConfig);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const configManager = ConfigManager.getInstance();

  React.useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedConfig = await configManager.getConfig(organizationId);
        setConfig(loadedConfig);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar configuración');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, [organizationId]);

  const updateConfigAsync = React.useCallback(async (updates: Partial<CommunityConfig>) => {
    try {
      setError(null);
      await configManager.updateConfig(organizationId || 'default', updates);
      const updatedConfig = await configManager.getConfig(organizationId);
      setConfig(updatedConfig);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar configuración');
      throw err;
    }
  }, [organizationId, configManager]);

  const isFeatureEnabled = React.useCallback((feature: keyof FeaturesConfig): boolean => {
    return config.features[feature];
  }, [config.features]);

  const isModuleEnabled = React.useCallback((module: keyof ModulesConfig): boolean => {
    return config.modules[module].enabled;
  }, [config.modules]);

  return {
    config,
    loading,
    error,
    updateConfig: updateConfigAsync,
    isFeatureEnabled,
    isModuleEnabled,
  };
} 