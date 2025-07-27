#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔐 Configuración de Variables de Entorno para CommunityOS');
console.log('========================================================\n');

const envContent = `# ============================================================================
# CONFIGURACIÓN DE AUTENTICACIÓN - CLERK
# ============================================================================
# Claves de API de Clerk para autenticación y gestión de usuarios
# Obtén estas claves desde: https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================
# URL base de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Entorno de ejecución
NODE_ENV=development

# ============================================================================
# CONFIGURACIÓN DE SEGURIDAD
# ============================================================================
# Clave secreta para encriptación de sesiones y tokens
# Genera una clave segura: openssl rand -base64 32
NEXTAUTH_SECRET=your_nextauth_secret_here

# Configuración de CORS
NEXT_PUBLIC_ALLOWED_ORIGINS=http://localhost:3000

# ============================================================================
# CONFIGURACIÓN DE BASE DE DATOS - SUPABASE (OPCIONAL POR AHORA)
# ============================================================================
# Configuración de Supabase para almacenamiento de datos
# Obtén estas claves desde: https://supabase.com/dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
`;

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    
    // Verificar si el archivo ya existe
    if (fs.existsSync(envPath)) {
      const overwrite = await question('⚠️  El archivo .env.local ya existe. ¿Quieres sobrescribirlo? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('❌ Configuración cancelada.');
        rl.close();
        return;
      }
    }

    console.log('\n📝 Configurando variables de entorno...\n');

    // Solicitar las claves de Clerk
    const publishableKey = await question('🔑 Publishable Key de Clerk (pk_test_...): ');
    const secretKey = await question('🔐 Secret Key de Clerk (sk_test_...): ');

    // Generar una clave secreta para NextAuth
    const crypto = require('crypto');
    const nextAuthSecret = crypto.randomBytes(32).toString('base64');

    // Crear el contenido del archivo con las claves reales
    const finalEnvContent = envContent
      .replace('pk_test_your_clerk_publishable_key_here', publishableKey)
      .replace('sk_test_your_clerk_secret_key_here', secretKey)
      .replace('your_nextauth_secret_here', nextAuthSecret);

    // Escribir el archivo
    fs.writeFileSync(envPath, finalEnvContent);

    console.log('\n✅ Archivo .env.local creado exitosamente!');
    console.log('\n📋 Variables configuradas:');
    console.log('   ✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
    console.log('   ✅ CLERK_SECRET_KEY');
    console.log('   ✅ NEXTAUTH_SECRET (generada automáticamente)');
    console.log('   ✅ NEXT_PUBLIC_APP_URL');
    console.log('   ✅ NODE_ENV');
    console.log('   ✅ NEXT_PUBLIC_ALLOWED_ORIGINS');
    
    console.log('\n🔧 Próximos pasos:');
    console.log('   1. Reinicia el servidor de desarrollo: npm run dev');
    console.log('   2. Ve a http://localhost:3000 para probar la aplicación');
    console.log('   3. Configura las organizaciones en el dashboard de Clerk');
    console.log('   4. Prueba el sistema de autenticación');
    
    console.log('\n📚 Recursos útiles:');
    console.log('   📖 Guía completa: CLERK_SETUP.md');
    console.log('   🔗 Dashboard de Clerk: https://dashboard.clerk.com');
    console.log('   📚 Documentación: https://clerk.com/docs');

  } catch (error) {
    console.error('❌ Error al crear el archivo .env.local:', error.message);
  } finally {
    rl.close();
  }
}

setupEnv(); 