'use client';

import React from 'react';

interface HydrationProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function HydrationProvider({ children, fallback }: HydrationProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto mb-4"></div>
          <p className="text-lg font-medium">Cargando...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Hook para manejar hidratación
export function useHydration() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
} 