#!/usr/bin/env node

/**
 * Script de configuración rápida para Clerk
 * Ayuda a configurar las variables de entorno necesarias
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Configuración Rápida de Clerk para CommunityOS\n');

// Verificar si ya existe .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log('⚠️  El archivo .env.local ya existe.');
  rl.question('¿Quieres sobrescribirlo? (y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      createEnvFile();
    } else {
      console.log('❌ Configuración cancelada.');
      rl.close();
    }
  });
} else {
  createEnvFile();
}

function createEnvFile() {
  console.log('\n📝 Configurando variables de entorno...\n');
  
  rl.question('🔑 Publishable Key de Clerk (pk_test_...): ', (publishableKey) => {
    rl.question('🔐 Secret Key de Clerk (sk_test_...): ', (secretKey) => {
      rl.question('🌐 URL de la aplicación (http://localhost:3000): ', (appUrl) => {
        const envContent = generateEnvContent(publishableKey, secretKey, appUrl || 'http://localhost:3000');
        
        try {
          fs.writeFileSync(envPath, envContent);
          console.log('\n✅ Archivo .env.local creado exitosamente!');
          console.log('\n📋 Próximos pasos:');
          console.log('1. Reinicia el servidor de desarrollo: npm run dev');
          console.log('2. Ve a http://localhost:3000 para verificar la configuración');
          console.log('3. Consulta CLERK_SETUP.md para configuración completa');
        } catch (error) {
          console.error('❌ Error al crear el archivo:', error.message);
        }
        
        rl.close();
      });
    });
  });
}

function generateEnvContent(publishableKey, secretKey, appUrl) {
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
NEXT_PUBLIC_SENTRY_DSN=https://your_sentry_dsn_here
`;
} 