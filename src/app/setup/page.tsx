'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SetupPage() {
  const [step, setStep] = useState(1);
  const [publishableKey, setPublishableKey] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [appUrl, setAppUrl] = useState('http://localhost:3000');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateEnvContent = () => {
    return `# ============================================================================
# CONFIGURACIÓN DE AUTENTICACIÓN - CLERK
# ============================================================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${publishableKey}
CLERK_SECRET_KEY=${secretKey}

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================
NEXT_PUBLIC_APP_URL=${appUrl}

# ============================================================================
# CONFIGURACIÓN DE BASE DE DATOS - SUPABASE
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ============================================================================
# CONFIGURACIÓN DE SEGURIDAD
# ============================================================================
NEXTAUTH_SECRET=your_nextauth_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# ============================================================================
# CONFIGURACIÓN DE EMAIL
# ============================================================================
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=CommunityOS

# ============================================================================
# CONFIGURACIÓN DE PAGOS
# ============================================================================
PAYMENT_PROVIDER=stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here

# ============================================================================
# CONFIGURACIÓN DE ANALYTICS
# ============================================================================
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# ============================================================================
# CONFIGURACIÓN DE MONITOREO
# ============================================================================
NEXT_PUBLIC_SENTRY_DSN=https://your_sentry_dsn_here`;
  };

  const downloadEnvFile = () => {
    const content = generateEnvContent();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '.env.local';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔐 Configuración Rápida de Clerk
          </h1>
          <p className="text-xl text-gray-600">
            Configura la autenticación para CommunityOS en minutos
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {step === 1 && <Badge variant="secondary">Paso 1</Badge>}
              {step === 2 && <Badge variant="secondary">Paso 2</Badge>}
              {step === 3 && <Badge variant="secondary">Paso 3</Badge>}
              {step === 4 && <Badge variant="secondary">Paso 4</Badge>}
              <span>
                {step === 1 && 'Crear cuenta en Clerk'}
                {step === 2 && 'Obtener claves de API'}
                {step === 3 && 'Configurar variables de entorno'}
                {step === 4 && 'Verificar configuración'}
              </span>
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Regístrate en Clerk y crea tu primer proyecto'}
              {step === 2 && 'Copia las claves de API desde el dashboard de Clerk'}
              {step === 3 && 'Configura las variables de entorno en tu proyecto'}
              {step === 4 && 'Verifica que todo esté funcionando correctamente'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Create Clerk Account */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">
                    📋 Pasos para crear tu cuenta:
                  </h4>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Ve a <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">clerk.com</a></li>
                    <li>Haz clic en "Get Started" o "Sign Up"</li>
                    <li>Crea una cuenta con tu email</li>
                    <li>Verifica tu email</li>
                    <li>Haz clic en "Create Application"</li>
                    <li>Nombre: <code>CommunityOS</code></li>
                    <li>Framework: <code>Next.js</code></li>
                    <li>Haz clic en "Create"</li>
                  </ol>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={() => window.open('https://clerk.com', '_blank')}
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ir a Clerk.com</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Get API Keys */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">
                    🔑 Obtener claves de API:
                  </h4>
                  <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
                    <li>En el dashboard de Clerk, ve a "API Keys"</li>
                    <li>Copia la "Publishable Key" (empieza con <code>pk_test_</code>)</li>
                    <li>Copia la "Secret Key" (empieza con <code>sk_test_</code>)</li>
                    <li>⚠️ Nunca compartas la Secret Key</li>
                  </ol>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="publishableKey">Publishable Key</Label>
                    <Input
                      id="publishableKey"
                      type="text"
                      placeholder="pk_test_..."
                      value={publishableKey}
                      onChange={(e) => setPublishableKey(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secretKey">Secret Key</Label>
                    <Input
                      id="secretKey"
                      type="password"
                      placeholder="sk_test_..."
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="appUrl">URL de la aplicación</Label>
                  <Input
                    id="appUrl"
                    type="text"
                    placeholder="http://localhost:3000"
                    value={appUrl}
                    onChange={(e) => setAppUrl(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Configure Environment */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-800 mb-2">
                    ✅ Configuración automática:
                  </h4>
                  <p className="text-sm text-green-700">
                    Hemos generado el archivo <code>.env.local</code> con todas las variables necesarias.
                    Descárgalo y colócalo en la raíz de tu proyecto.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-800">Contenido del archivo .env.local:</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(generateEnvContent())}
                      className="flex items-center space-x-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </Button>
                  </div>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                    {generateEnvContent()}
                  </pre>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={downloadEnvFile} size="lg">
                    📥 Descargar .env.local
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => copyToClipboard(generateEnvContent())}
                  >
                    📋 Copiar contenido
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Verify Configuration */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">
                    🧪 Verificar configuración:
                  </h4>
                  <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                    <li>Coloca el archivo <code>.env.local</code> en la raíz del proyecto</li>
                    <li>Reinicia el servidor de desarrollo: <code>npm run dev</code></li>
                    <li>Ve a <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="underline">localhost:3000</a></li>
                    <li>Verifica que no aparezca el error de Clerk</li>
                    <li>Prueba el registro de usuarios</li>
                  </ol>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={() => window.open('http://localhost:3000', '_blank')}
                    size="lg"
                    className="flex items-center space-x-2 mx-auto"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Ir a la aplicación</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                Anterior
              </Button>
              
              <Button
                onClick={() => setStep(Math.min(4, step + 1))}
                disabled={step === 4}
              >
                {step === 4 ? 'Completado' : 'Siguiente'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>Recursos útiles</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="/CLERK_SETUP.md" target="_blank">
                  📖 Guía completa de configuración
                </Link>
              </Button>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="https://clerk.com/docs" target="_blank">
                  📚 Documentación oficial de Clerk
                </Link>
              </Button>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href="https://dashboard.clerk.com" target="_blank">
                  🔗 Dashboard de Clerk
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span>Solución de problemas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">
                Si encuentras problemas:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Verifica que las claves sean válidas</li>
                <li>Asegúrate de que el archivo .env.local esté en la raíz</li>
                <li>Reinicia el servidor después de cambios</li>
                <li>Verifica que los dominios estén configurados en Clerk</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">
              ← Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 