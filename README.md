# CommunityOS - Plataforma de Gestión de Comunidades

Una plataforma SaaS completa para la gestión de asociaciones, gremios y comunidades de Latinoamérica. Desarrollada con Next.js 15, TypeScript, Clerk y Supabase.

## 🚀 Características

- **Gestión de Miembros**: CRM completo con perfiles personalizados
- **Eventos y Calendario**: Creación y gestión de eventos
- **Sistema de Pagos**: Integración con pasarelas de pago
- **Votaciones Digitales**: Sistema de gobernanza con trazabilidad
- **Analytics**: Métricas y reportes detallados
- **Notificaciones**: Comunicación multicanal
- **Multi-tenancy**: Soporte para múltiples organizaciones
- **Responsive**: Diseño adaptativo para todos los dispositivos

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS v4
- **Autenticación**: Clerk
- **Base de Datos**: Supabase (PostgreSQL)
- **Gráficos**: Recharts
- **Iconos**: Lucide React

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta en [Clerk](https://clerk.com)
- Cuenta en [Supabase](https://supabase.com)

## ⚙️ Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd communityos-app
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Configurar Clerk

1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Crea una nueva aplicación
3. Configura las URLs permitidas:
   - Development: `http://localhost:3000/*`
   - Production: `https://yourdomain.com/*`
4. Copia las claves API a tu `.env.local`

### 4. Configurar Supabase

1. Ve a [Supabase Dashboard](https://supabase.com/dashboard)
2. Crea un nuevo proyecto
3. Ejecuta el script SQL en el SQL Editor:

```sql
-- Copia y pega el contenido de supabase-schema.sql
```

4. Copia las credenciales a tu `.env.local`

### 5. Ejecutar la aplicación

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (dashboard)/       # Layout para páginas autenticadas
│   ├── auth/              # Páginas de autenticación
│   ├── dashboard/         # Dashboard principal
│   ├── members/           # Gestión de miembros
│   ├── events/            # Gestión de eventos
│   ├── payments/          # Sistema de pagos
│   ├── voting/            # Sistema de votaciones
│   ├── analytics/         # Analytics y reportes
│   └── settings/          # Configuración
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes base (shadcn/ui)
│   ├── members/          # Componentes específicos de miembros
│   ├── events/           # Componentes específicos de eventos
│   └── ...
├── hooks/                # Hooks personalizados
├── lib/                  # Utilidades y configuración
└── types/                # Definiciones de tipos TypeScript
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecutar en modo desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en modo producción
- `npm run lint` - Ejecutar linter

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en Vercel
3. Deploy automático en cada push

### Otros proveedores

La aplicación es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Documentación

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](https://docs.communityos.app)
2. Busca en los [issues existentes](https://github.com/your-repo/issues)
3. Crea un nuevo issue con detalles del problema

## 🗺️ Roadmap

- [ ] Integración con WhatsApp Business API
- [ ] Sistema de facturación automática
- [ ] App móvil nativa
- [ ] Integración con CRM externos
- [ ] Sistema de gamificación
- [ ] API pública para desarrolladores

---

Desarrollado con ❤️ para las comunidades de Latinoamérica
