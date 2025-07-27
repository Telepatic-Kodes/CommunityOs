# CommunityOS - Gestor de Comunidades

Una aplicación moderna y completa para la gestión de comunidades, construida con Next.js 15, TypeScript, Clerk Authentication, y Supabase.

## 🚀 Características Principales

### ✅ **Funcionalidades Implementadas**
- **Autenticación Completa**: Integración con Clerk para gestión de usuarios y organizaciones
- **Dashboard Interactivo**: Métricas en tiempo real y acciones rápidas
- **Gestión de Miembros**: CRUD completo con búsqueda y filtros
- **Sistema de Eventos**: Creación, edición y gestión de eventos comunitarios
- **Sistema de Pagos**: Integración con pasarelas de pago
- **Sistema de Votaciones**: Creación y gestión de votaciones comunitarias
- **Notificaciones**: Sistema de notificaciones en tiempo real
- **Configuración Avanzada**: Panel de configuración completo
- **Portal de Miembros**: Área dedicada para miembros de la comunidad

### 🔒 **Seguridad Implementada**
- Middleware de seguridad con headers CSP, HSTS, X-Frame-Options
- Validación de origen y rate limiting
- Sanitización de datos para prevenir XSS
- Manejo centralizado de errores
- Configuración de TypeScript estricta
- ESLint con reglas de seguridad

### 🛠 **Arquitectura Técnica**
- **Frontend**: Next.js 15 con App Router
- **Lenguaje**: TypeScript con configuración estricta
- **Autenticación**: Clerk con gestión de organizaciones
- **Base de Datos**: Supabase (PostgreSQL)
- **UI**: Tailwind CSS v4 + shadcn/ui
- **Validación**: Zod schemas
- **Logging**: Sistema centralizado de logs

## 📋 Estado del Proyecto

### ✅ **Completado**
- [x] Configuración inicial del proyecto
- [x] Integración completa con Clerk
- [x] Middleware de seguridad
- [x] Sistema de configuración centralizado
- [x] Componentes UI reutilizables
- [x] Hooks personalizados para gestión de estado
- [x] Validación de datos con Zod
- [x] Manejo de errores centralizado
- [x] Documentación completa
- [x] Configuración de TypeScript estricta
- [x] ESLint con reglas de seguridad
- [x] Todas las páginas principales implementadas
- [x] Sistema de logging
- [x] Sanitización de datos

### 🔄 **En Progreso**
- [ ] Configuración de Supabase en producción
- [ ] Implementación de webhooks de Clerk
- [ ] Tests unitarios y de integración
- [ ] Optimización de rendimiento

### 📝 **Pendiente**
- [ ] Configuración de dominio personalizado
- [ ] Implementación de analytics
- [ ] Sistema de backup automático
- [ ] Documentación de API

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Cuenta de Clerk
- Cuenta de Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/Telepatic-Kodes/CommunityOs.git
cd CommunityOs
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo `.env.example` a `.env.local` y configura las variables:

```bash
cp .env.example .env.local
```

**Variables requeridas:**
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### 4. Configurar Clerk
1. Ve a [Clerk Dashboard](https://dashboard.clerk.com)
2. Crea una nueva aplicación
3. Configura los dominios permitidos
4. Habilita las organizaciones
5. Configura los roles de usuario

### 5. Configurar Supabase
1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script `supabase-schema.sql` en tu base de datos
3. Configura las políticas de seguridad

### 6. Ejecutar el proyecto
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
communityos-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # Rutas protegidas del dashboard
│   │   ├── auth/              # Páginas de autenticación
│   │   ├── setup/             # Página de configuración
│   │   └── globals.css        # Estilos globales
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base (shadcn/ui)
│   │   ├── analytics/        # Componentes de analytics
│   │   ├── events/           # Componentes de eventos
│   │   ├── members/          # Componentes de miembros
│   │   ├── notifications/    # Componentes de notificaciones
│   │   ├── payments/         # Componentes de pagos
│   │   └── voting/           # Componentes de votaciones
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Utilidades y configuraciones
│   │   ├── config.ts         # Configuración centralizada
│   │   ├── clerk.ts          # Utilidades de Clerk
│   │   ├── supabase.ts       # Cliente de Supabase
│   │   ├── security.ts       # Utilidades de seguridad
│   │   ├── errors.ts         # Manejo de errores
│   │   └── logger.ts         # Sistema de logging
│   └── types/                # Definiciones de tipos
├── public/                   # Archivos estáticos
├── docs/                     # Documentación
└── scripts/                  # Scripts de utilidad
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run start        # Servidor de producción

# Linting y Testing
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de linting
npm run type-check   # Verificar tipos de TypeScript

# Utilidades
npm run setup-clerk  # Script de configuración de Clerk
```

## 📚 Documentación

- **[CLERK_SETUP.md](./CLERK_SETUP.md)**: Guía completa de configuración de Clerk
- **[COMPONENT_USAGE.md](./COMPONENT_USAGE.md)**: Patrones de uso de componentes
- **[CONFIGURATION.md](./CONFIGURATION.md)**: Guía de configuración del proyecto
- **[DEPLOYMENT.md](./DEPLOYMENT.md)**: Guía de despliegue
- **[FINAL_STATUS.md](./FINAL_STATUS.md)**: Estado final del proyecto

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

1. Revisa la documentación en la carpeta `docs/`
2. Abre un issue en GitHub
3. Contacta al equipo de desarrollo

## 🎯 Roadmap

### Versión 1.1
- [ ] Sistema de notificaciones push
- [ ] Integración con calendarios
- [ ] Sistema de archivos adjuntos
- [ ] API REST completa

### Versión 1.2
- [ ] Aplicación móvil
- [ ] Integración con redes sociales
- [ ] Sistema de gamificación
- [ ] Analytics avanzados

### Versión 2.0
- [ ] Multi-tenancy completo
- [ ] Marketplace de plugins
- [ ] API GraphQL
- [ ] Microservicios

---

**Desarrollado con ❤️ por el equipo de CommunityOS**
