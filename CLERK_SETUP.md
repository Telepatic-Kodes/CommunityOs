# 🔐 Configuración de Clerk para CommunityOS

Esta guía te ayudará a configurar Clerk completamente para la autenticación y gestión de organizaciones en CommunityOS.

## 📋 **Prerrequisitos**

1. **Cuenta de Clerk**: Regístrate en [clerk.com](https://clerk.com)
2. **Proyecto de Clerk**: Crea un nuevo proyecto en el dashboard de Clerk
3. **Variables de entorno**: Configura las claves de API

---

## 🚀 **Paso 1: Crear Proyecto en Clerk**

### 1.1 Acceder al Dashboard
1. Ve a [dashboard.clerk.com](https://dashboard.clerk.com)
2. Inicia sesión con tu cuenta
3. Haz clic en "Create Application"

### 1.2 Configurar la Aplicación
1. **Nombre**: `CommunityOS`
2. **Tipo**: Web Application
3. **Framework**: Next.js
4. **Región**: Selecciona la más cercana a tus usuarios

### 1.3 Configurar Dominios
En la sección "Domains":
- **Development**: `localhost:3000`, `localhost:3001`
- **Production**: `tu-dominio.com`, `www.tu-dominio.com`

---

## 🔑 **Paso 2: Obtener Claves de API**

### 2.1 Claves Públicas
1. Ve a **API Keys** en el sidebar
2. Copia la **Publishable Key** (empieza con `pk_`)

### 2.2 Claves Secretas
1. En la misma sección, copia la **Secret Key** (empieza con `sk_`)
2. ⚠️ **IMPORTANTE**: Nunca expongas esta clave en el frontend

---

## ⚙️ **Paso 3: Configurar Variables de Entorno**

### 3.1 Crear archivo `.env.local`
```bash
# Copiar el archivo de ejemplo
cp env.example .env.local
```

### 3.2 Configurar las variables
```env
# ============================================================================
# CONFIGURACIÓN DE AUTENTICACIÓN - CLERK
# ============================================================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_publica_aqui
CLERK_SECRET_KEY=sk_test_tu_clave_secreta_aqui

# ============================================================================
# CONFIGURACIÓN DE LA APLICACIÓN
# ============================================================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🏢 **Paso 4: Configurar Organizaciones**

### 4.1 Habilitar Organizaciones
1. Ve a **Organizations** en el sidebar
2. Haz clic en **Enable Organizations**
3. Configura los siguientes parámetros:

### 4.2 Configuración de Roles
```json
{
  "admin": {
    "name": "Administrador",
    "description": "Acceso completo a todas las funcionalidades",
    "permissions": [
      "manage_members",
      "manage_events", 
      "manage_payments",
      "manage_voting",
      "view_analytics",
      "manage_settings",
      "invite_members",
      "remove_members",
      "change_roles"
    ]
  },
  "member": {
    "name": "Miembro",
    "description": "Acceso a funcionalidades básicas",
    "permissions": [
      "view_members",
      "view_events",
      "participate_voting",
      "view_analytics"
    ]
  },
  "viewer": {
    "name": "Observador", 
    "description": "Acceso de solo lectura",
    "permissions": [
      "view_members",
      "view_events",
      "view_analytics"
    ]
  }
}
```

### 4.3 Configuración de Invitaciones
1. **Email Invitations**: Habilitado
2. **Default Role**: `member`
3. **Custom Email Templates**: Configurar según necesidades

---

## 🔐 **Paso 5: Configurar Métodos de Autenticación**

### 5.1 Métodos Disponibles
En **User & Authentication** > **Email, Phone, Username**:

1. **Email Address**: ✅ Habilitado
2. **Password**: ✅ Habilitado
3. **OAuth Providers**:
   - **Google**: Configurar (recomendado)
   - **GitHub**: Configurar (opcional)
   - **Microsoft**: Configurar (opcional)

### 5.2 Configuración de Verificación
1. **Email Verification**: Requerido
2. **Redirect URL**: `/dashboard`
3. **Custom Email Templates**: Personalizar

---

## 🛡️ **Paso 6: Configurar Seguridad**

### 6.1 Multi-Factor Authentication (MFA)
1. Ve a **Security** > **Multi-factor Authentication**
2. **Habilitar**: TOTP (Google Authenticator)
3. **Required**: Solo para roles admin (opcional)

### 6.2 Rate Limiting
1. **Max Sign-in Attempts**: 5
2. **Block Duration**: 1 hora
3. **Window**: 15 minutos

### 6.3 Session Management
1. **Session Duration**: 24 horas
2. **Auto Renew**: Habilitado
3. **Idle Timeout**: 8 horas

---

## 🔗 **Paso 7: Configurar Webhooks**

### 7.1 Crear Endpoints
Crea los siguientes endpoints en tu aplicación:

```typescript
// /api/webhooks/clerk/user-created
// /api/webhooks/clerk/user-updated  
// /api/webhooks/clerk/user-deleted
// /api/webhooks/clerk/organization-created
// /api/webhooks/clerk/organization-updated
// /api/webhooks/clerk/organization-deleted
// /api/webhooks/clerk/membership-created
// /api/webhooks/clerk/membership-updated
// /api/webhooks/clerk/membership-deleted
```

### 7.2 Configurar en Clerk
1. Ve a **Webhooks** en el sidebar
2. **Add Endpoint** para cada evento
3. **URL**: `https://tu-dominio.com/api/webhooks/clerk/[event]`
4. **Events**: Seleccionar eventos específicos

---

## 🎨 **Paso 8: Personalizar Apariencia**

### 8.1 Configurar Branding
En **Appearance**:

1. **Logo**: Subir logo de tu organización
2. **Colors**:
   - Primary: `#3B82F6` (azul)
   - Secondary: `#6B7280` (gris)
   - Success: `#10B981` (verde)
   - Warning: `#F59E0B` (amarillo)
   - Error: `#EF4444` (rojo)

### 8.2 Configurar Idiomas
1. **Default Locale**: `es` (español)
2. **Supported Locales**: `es`, `en`

---

## 🧪 **Paso 9: Probar la Configuración**

### 9.1 Verificar Variables de Entorno
```bash
# Verificar que las variables estén configuradas
npm run dev
```

### 9.2 Probar Autenticación
1. Ve a `http://localhost:3000/auth/sign-in`
2. Intenta registrarte con un email
3. Verifica que recibas el email de confirmación
4. Completa el proceso de verificación

### 9.3 Probar Organizaciones
1. Inicia sesión
2. Ve a `/dashboard`
3. Intenta crear una organización
4. Verifica que puedas invitar miembros

---

## 🔧 **Paso 10: Configuración Avanzada**

### 10.1 Configurar Middleware
El middleware ya está configurado en `src/middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

export default clerkMiddleware((auth, request) => {
  // Lógica de protección de rutas
});
```

### 10.2 Configurar Layout
El layout principal ya incluye `ClerkProvider`:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
```

---

## 🚨 **Solución de Problemas Comunes**

### Error: "Clerk not configured"
```bash
# Verificar variables de entorno
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
echo $CLERK_SECRET_KEY
```

### Error: "Invalid domain"
1. Verificar que el dominio esté en la lista de dominios permitidos
2. En desarrollo, usar `localhost:3000` o `localhost:3001`

### Error: "Organization not found"
1. Verificar que las organizaciones estén habilitadas
2. Verificar permisos de usuario en la organización

### Error: "Webhook failed"
1. Verificar que los endpoints de webhook estén funcionando
2. Verificar la URL del webhook en Clerk
3. Verificar logs del servidor

---

## 📚 **Recursos Adicionales**

### Documentación Oficial
- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Organizations Guide](https://clerk.com/docs/organizations/overview)

### Ejemplos de Código
- [Clerk Examples](https://github.com/clerkinc/clerk-nextjs-examples)
- [Organization Management](https://clerk.com/docs/organizations/management)

### Soporte
- [Clerk Support](https://clerk.com/support)
- [Community Discord](https://discord.gg/clerk)

---

## ✅ **Verificación Final**

Antes de considerar Clerk completamente configurado, verifica:

- [ ] Variables de entorno configuradas
- [ ] Dominios permitidos configurados
- [ ] Organizaciones habilitadas
- [ ] Roles y permisos configurados
- [ ] Métodos de autenticación funcionando
- [ ] Webhooks configurados
- [ ] Apariencia personalizada
- [ ] Pruebas de autenticación exitosas
- [ ] Pruebas de organizaciones exitosas

**¡Con esto tendrás Clerk completamente configurado para CommunityOS!** 🎉 