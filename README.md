# AIAIAI CommunityOS - MVP

Plataforma SaaS para gestión de asociaciones, gremios y comunidades de Latinoamérica.

## 🚀 Características del MVP

- **Autenticación Multi-tenant** con Clerk
- **Base de datos** con Supabase y Row Level Security
- **Design System** limpio en blanco y negro
- **Dashboard** con métricas clave
- **Arquitectura escalable** con Next.js 15

## 📋 Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta en [Clerk](https://clerk.com) para autenticación
- Cuenta en [Supabase](https://supabase.com) para base de datos

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd communityos-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp env.example .env.local
   ```
   
   Editar `.env.local` con tus credenciales:
   - Clerk Publishable Key y Secret Key
   - Supabase URL y API Keys

4. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── dashboard/         # Páginas del dashboard
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes del design system
├── lib/                  # Utilidades y configuraciones
│   ├── clerk.ts          # Configuración de Clerk
│   ├── supabase.ts       # Configuración de Supabase
│   └── utils.ts          # Utilidades generales
└── types/                # Definiciones de tipos TypeScript
```

## 🎨 Design System

El proyecto utiliza un design system minimalista en blanco y negro:

- **Colores**: Blanco, negro y escalas de gris
- **Tipografía**: Geist Sans (Google Fonts)
- **Componentes**: Button, Card, Input, etc.
- **Iconos**: Lucide React

## 🔐 Autenticación

Utilizamos Clerk para manejar:
- Registro e inicio de sesión
- Organizaciones multi-tenant
- Roles y permisos
- Magic links

## 🗄️ Base de Datos

Supabase proporciona:
- PostgreSQL con Row Level Security
- Autenticación integrada
- APIs automáticas
- Tiempo real

## 📊 Funcionalidades Implementadas

### ✅ **MVP Completo (Fases 1-7)**
- ✅ **Sistema de Miembros** - CRUD completo con roles y estados
- ✅ **Sistema de Pagos** - Gestión de cuotas, múltiples métodos de pago
- ✅ **Portal de Eventos** - Creación, gestión y inscripciones
- ✅ **Sistema de Votaciones** - Votaciones digitales con diferentes tipos
- ✅ **Analytics Avanzado** - Métricas, gráficos y reportes detallados
- ✅ **Sistema de Notificaciones** - Notificaciones en tiempo real y configuración
- ✅ **Página de Demo Interactiva** - Demostración completa de funcionalidades

### 🚧 En Desarrollo
- 🔄 **Portal de Miembros Público** - Para que los miembros vean sus datos
- 🔄 **Integración con APIs** - Pagos locales, email, etc.
- 🔄 **Sistema de Certificados** - Certificados de participación
- [x] Página de inicio atractiva
- [x] Dashboard básico con métricas
- [x] Componentes UI reutilizables

### 🚧 En Desarrollo
- [ ] Sistema de miembros
- [ ] Gestión de pagos
- [ ] Portal de eventos
- [ ] Sistema de votaciones
- [ ] Analytics avanzado

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests de integración
npm run test:e2e
```

## 🚀 Deployment

### Vercel (Recomendado)
1. Conectar repositorio a Vercel
2. Configurar variables de entorno
3. Deploy automático

### Otros proveedores
- Netlify
- Railway
- DigitalOcean App Platform

## 📈 Métricas de Éxito

Según el PRD, el MVP debe lograr:
- **KR1**: ≥3 clientes piloto activos
- **KR2**: Registro → 1er pago <5 min (90% usuarios)
- **KR3**: Retención mensual ≥95%
- **KR4**: Uptime 99.5%, errores P1 <0.1%

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto es propiedad de AIAIAI Consulting.

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@aiaiai.cl
- Documentación: [docs.communityos.app](https://docs.communityos.app)

---

**Desarrollado con ❤️ por AIAIAI Consulting**
