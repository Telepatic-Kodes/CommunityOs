# 🚀 Despliegue de CommunityOS en Vercel

## 📋 Requisitos Previos

- ✅ Cuenta en [Vercel](https://vercel.com)
- ✅ Cuenta en [GitHub](https://github.com)
- ✅ Proyecto subido a GitHub
- ✅ Variables de entorno configuradas

## 🔧 Configuración de Variables de Entorno

### En Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Navega a **Settings** → **Environment Variables**
3. Agrega las siguientes variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dG9wLW1vbGUtNDAuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://wccgxvwjfggbmlpstyga.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjY2d4dndqZmdnYm1scHN0eWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NzE0MTQsImV4cCI6MjA2OTE0NzQxNH0.mIz2GOo81gij21lU6eIT3WlY0Rp6WSbzvtVRsEEtzZw
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

## 🚀 Pasos para el Despliegue

### Opción 1: Despliegue Automático (Recomendado)

1. **Conectar con GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en **"New Project"**

2. **Importar Repositorio:**
   - Selecciona el repositorio `CommunityOs`
   - Vercel detectará automáticamente que es un proyecto Next.js

3. **Configurar Variables de Entorno:**
   - En la pantalla de configuración, agrega todas las variables de entorno
   - Haz clic en **"Deploy"**

4. **¡Listo!** Tu aplicación estará disponible en `https://your-app.vercel.app`

### Opción 2: Despliegue Manual con Vercel CLI

1. **Instalar Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Iniciar sesión:**
   ```bash
   vercel login
   ```

3. **Desplegar:**
   ```bash
   vercel --prod
   ```

## 🔒 Configuración de Seguridad

### Headers de Seguridad (ya configurados en vercel.json):
- ✅ **X-Content-Type-Options**: nosniff
- ✅ **X-Frame-Options**: DENY
- ✅ **X-XSS-Protection**: 1; mode=block

### Dominio Personalizado (Opcional):
1. Ve a **Settings** → **Domains**
2. Agrega tu dominio personalizado
3. Configura los registros DNS según las instrucciones

## 📊 Monitoreo y Analytics

### Vercel Analytics:
- Automáticamente habilitado
- Ve a **Analytics** en tu dashboard de Vercel

### Logs y Debugging:
- Ve a **Functions** para ver logs de API
- Usa **Real-time** para monitoreo en vivo

## 🔄 Actualizaciones Automáticas

Con el despliegue automático:
- ✅ Cada push a `main` despliega automáticamente
- ✅ Pull requests crean previews automáticos
- ✅ Rollback fácil desde el dashboard

## 🛠️ Troubleshooting

### Error de Build:
```bash
# Verificar build localmente
npm run build

# Verificar dependencias
npm install
```

### Variables de Entorno:
- Verificar que todas las variables estén configuradas
- Asegurar que las claves de Clerk y Supabase sean correctas

### Dominio:
- Verificar configuración DNS
- Esperar propagación (puede tomar hasta 24 horas)

## 📞 Soporte

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Clerk Docs**: [clerk.com/docs](https://clerk.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

---

## 🎉 ¡Tu CommunityOS estará en producción!

Una vez desplegado, podrás:
- ✅ Acceder desde cualquier dispositivo
- ✅ Compartir con tu comunidad
- ✅ Recibir feedback en tiempo real
- ✅ Escalar automáticamente según el tráfico 