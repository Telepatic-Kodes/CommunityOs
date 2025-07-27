'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ClerkStatusProps {
  className?: string;
}

export function ClerkStatus({ className }: ClerkStatusProps) {
  const [status, setStatus] = useState<'loading' | 'configured' | 'not-configured' | 'error'>('loading');
  const [publishableKey, setPublishableKey] = useState<string>('');

  useEffect(() => {
    const checkClerkConfig = () => {
      const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
      
      if (!key) {
        setStatus('not-configured');
        return;
      }

      if (key.startsWith('pk_test_') || key.startsWith('pk_live_')) {
        setPublishableKey(key);
        setStatus('configured');
      } else {
        setStatus('error');
      }
    };

    checkClerkConfig();
  }, []);

  const getStatusInfo = () => {
    switch (status) {
      case 'loading':
        return {
          title: 'Verificando configuración...',
          description: 'Comprobando las variables de entorno de Clerk',
          badge: <Badge variant="secondary">Verificando</Badge>,
          color: 'text-blue-600'
        };
      
      case 'configured':
        return {
          title: 'Clerk configurado correctamente',
          description: 'Las variables de entorno están configuradas y son válidas',
          badge: <Badge variant="default" className="bg-green-500">Configurado</Badge>,
          color: 'text-green-600'
        };
      
      case 'not-configured':
        return {
          title: 'Clerk no está configurado',
          description: 'Necesitas configurar las variables de entorno para usar la autenticación',
          badge: <Badge variant="destructive">No configurado</Badge>,
          color: 'text-red-600'
        };
      
      case 'error':
        return {
          title: 'Error en la configuración',
          description: 'Las variables de entorno están configuradas pero son inválidas',
          badge: <Badge variant="destructive">Error</Badge>,
          color: 'text-red-600'
        };
      
      default:
        return {
          title: 'Estado desconocido',
          description: 'No se pudo determinar el estado de la configuración',
          badge: <Badge variant="secondary">Desconocido</Badge>,
          color: 'text-gray-600'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={statusInfo.color}>
            🔐 Estado de Clerk
          </CardTitle>
          {statusInfo.badge}
        </div>
        <CardDescription>
          {statusInfo.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'configured' && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Publishable Key:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                {publishableKey.substring(0, 20)}...
              </code>
            </div>
            <p className="text-sm text-green-600">
              ✅ Clerk está listo para usar. Puedes proceder con la autenticación.
            </p>
          </div>
        )}

        {status === 'not-configured' && (
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">
                📋 Pasos para configurar Clerk:
              </h4>
              <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                <li>Regístrate en <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="underline">clerk.com</a></li>
                <li>Crea un nuevo proyecto</li>
                <li>Copia las claves de API</li>
                <li>Crea un archivo <code>.env.local</code></li>
                <li>Agrega las variables de entorno</li>
              </ol>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                📝 Variables requeridas:
              </h4>
              <div className="text-sm font-mono text-gray-700 space-y-1">
                <div>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</div>
                <div>CLERK_SECRET_KEY=sk_test_...</div>
                <div>NEXT_PUBLIC_APP_URL=http://localhost:3000</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => window.open('CLERK_SETUP.md', '_blank')}
                variant="outline"
                size="sm"
              >
                📖 Ver guía completa
              </Button>
              <Button 
                onClick={() => window.open('https://dashboard.clerk.com', '_blank')}
                variant="outline"
                size="sm"
              >
                🔗 Ir a Clerk Dashboard
              </Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">
                ⚠️ Error en la configuración:
              </h4>
              <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                <li>Verifica que las claves empiecen con <code>pk_test_</code> o <code>pk_live_</code></li>
                <li>Asegúrate de que las claves sean válidas</li>
                <li>Revisa que no haya espacios extra en las variables</li>
              </ul>
            </div>
            
            <Button 
              onClick={() => window.open('CLERK_SETUP.md', '_blank')}
              variant="outline"
              size="sm"
            >
              🔧 Verificar configuración
            </Button>
          </div>
        )}

        {status === 'loading' && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Verificando configuración...</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 