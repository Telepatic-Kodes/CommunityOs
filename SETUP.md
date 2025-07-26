# 🚀 Guía de Configuración - AIAIAI CommunityOS

Esta guía te ayudará a configurar completamente el proyecto CommunityOS para desarrollo local.

## 📋 Prerrequisitos

- Node.js 18+ instalado
- Cuenta en [Clerk](https://clerk.com) (gratuita)
- Cuenta en [Supabase](https://supabase.com) (gratuita)
- Editor de código (VS Code, Cursor, etc.)

## 🔧 Paso 1: Configurar Clerk

### 1.1 Crear cuenta en Clerk
1. Ve a [clerk.com](https://clerk.com)
2. Haz clic en "Get Started"
3. Crea una cuenta con tu email
4. Verifica tu email

### 1.2 Crear aplicación
1. En el dashboard de Clerk, haz clic en "Add application"
2. Selecciona "Next.js" como framework
3. Dale un nombre como "CommunityOS"
4. Selecciona tu región (preferiblemente cercana a Latinoamérica)

### 1.3 Configurar autenticación
1. Ve a **User & Authentication** en el sidebar
2. En **Email, Phone, Username**, habilita:
   - ✅ Email address
   - ✅ Username (opcional)
3. En **Social Connections**, puedes habilitar:
   - ✅ Google (recomendado)
   - ✅ GitHub (para desarrolladores)

### 1.4 Obtener credenciales
1. Ve a **API Keys** en el sidebar
2. Copia las siguientes claves:
   - **Publishable Key** (empieza con `pk_test_`)
   - **Secret Key** (empieza con `sk_test_`)

## 🔧 Paso 2: Configurar Supabase

### 2.1 Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Haz clic en "Start your project"
3. Crea una cuenta con tu email
4. Verifica tu email

### 2.2 Crear proyecto
1. Haz clic en "New Project"
2. Selecciona tu organización
3. Dale un nombre como "communityos-dev"
4. Establece una contraseña para la base de datos
5. Selecciona tu región (preferiblemente cercana a Latinoamérica)
6. Haz clic en "Create new project"

### 2.3 Configurar base de datos
1. Una vez creado el proyecto, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase-schema.sql`
3. Haz clic en "Run" para ejecutar el script
4. Verifica que las tablas se crearon correctamente

### 2.4 Obtener credenciales
1. Ve a **Settings > API** en el sidebar
2. Copia las siguientes claves:
   - **Project URL**
   - **anon public** key
   - **service_role** key (en la sección Project API keys)

## 🔧 Paso 3: Configurar Variables de Entorno

### 3.1 Crear archivo .env.local
En la raíz del proyecto (`communityos-app/`), crea un archivo llamado `.env.local` con el siguiente contenido:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_TU_CLERK_PUBLISHABLE_KEY_AQUI
CLERK_SECRET_KEY=sk_test_TU_CLERK_SECRET_KEY_AQUI

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key_aqui

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3.2 Reemplazar las credenciales
Reemplaza los valores de ejemplo con tus credenciales reales:
- `pk_test_TU_CLERK_PUBLISHABLE_KEY_AQUI` → Tu Publishable Key de Clerk
- `sk_test_TU_CLERK_SECRET_KEY_AQUI` → Tu Secret Key de Clerk
- `https://tu-proyecto.supabase.co` → Tu Project URL de Supabase
- `tu_supabase_anon_key_aqui` → Tu anon public key de Supabase
- `tu_supabase_service_role_key_aqui` → Tu service_role key de Supabase

## 🔧 Paso 4: Instalar Dependencias

### 4.1 Instalar paquetes
```bash
cd communityos-app
npm install
```

### 4.2 Verificar instalación
```bash
npm run build
```

Si no hay errores, la instalación fue exitosa.

## 🔧 Paso 5: Ejecutar el Proyecto

### 5.1 Iniciar servidor de desarrollo
```bash
npm run dev
```

### 5.2 Abrir en el navegador
Ve a [http://localhost:3000](http://localhost:3000)

Deberías ver la página de inicio de CommunityOS.

## 🔧 Paso 6: Probar la Autenticación

### 6.1 Probar registro
1. Haz clic en "Registrarse" en la página principal
2. Completa el formulario de registro
3. Verifica tu email
4. Inicia sesión

### 6.2 Probar dashboard
1. Una vez autenticado, ve a `/dashboard`
2. Deberías ver el dashboard con métricas de ejemplo

## 🔧 Paso 7: Configurar Webhooks (Opcional)

### 7.1 Clerk Webhooks
1. En el dashboard de Clerk, ve a **Webhooks**
2. Crea un nuevo webhook endpoint
3. URL: `https://tu-dominio.com/api/webhooks/clerk`
4. Selecciona los eventos:
   - `user.created`
   - `user.updated`
   - `organization.created`
   - `organization.updated`

### 7.2 Supabase Webhooks
1. En Supabase, ve a **Database > Webhooks**
2. Crea un nuevo webhook para sincronización de datos

## 🐛 Solución de Problemas

### Error: "Invalid API key"
- Verifica que las credenciales de Clerk estén correctas
- Asegúrate de que el archivo `.env.local` esté en la raíz del proyecto

### Error: "Database connection failed"
- Verifica que las credenciales de Supabase estén correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error: "Build failed"
- Ejecuta `npm install` para reinstalar dependencias
- Verifica que Node.js sea versión 18+

### Error: "Page not found"
- Verifica que el servidor esté corriendo en `http://localhost:3000`
- Revisa la consola del navegador para errores

## 📞 Soporte

Si tienes problemas con la configuración:

1. **Revisa los logs** en la consola del navegador y terminal
2. **Verifica las credenciales** en los dashboards de Clerk y Supabase
3. **Consulta la documentación** de [Clerk](https://clerk.com/docs) y [Supabase](https://supabase.com/docs)
4. **Contacta soporte** en soporte@aiaiai.cl

## ✅ Verificación Final

Para verificar que todo está configurado correctamente:

- [ ] La página principal se carga sin errores
- [ ] Puedes registrarte con un email
- [ ] Puedes iniciar sesión
- [ ] El dashboard se muestra correctamente
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en la terminal

¡Felicitaciones! 🎉 Tu entorno de desarrollo está listo para continuar con el desarrollo de CommunityOS. 