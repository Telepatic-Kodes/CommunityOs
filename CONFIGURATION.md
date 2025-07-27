# 🎨 Configuración de CommunityOS

## 📋 Descripción General

CommunityOS es una plataforma SaaS genérica diseñada para ser completamente personalizable para cada cliente. Este documento explica cómo configurar la plataforma para organizaciones específicas.

## 🏗️ Arquitectura de Configuración

### **Estructura de Archivos:**
```
src/lib/
├── config.ts              # Configuración por defecto y tipos
├── configs/               # Configuraciones específicas de clientes
│   ├── aiaiai.ts         # Configuración para AIAIAI
│   ├── client2.ts        # Configuración para otro cliente
│   └── index.ts          # Exportaciones centralizadas
└── configProvider.ts     # Proveedor de configuración
```

## ⚙️ Tipos de Configuración

### **1. Información de la Organización**
```typescript
organization: {
  name: string;           // Nombre completo de la organización
  shortName: string;      // Nombre corto/acrónimo
  description: string;    // Descripción de la organización
  website: string;        // Sitio web oficial
  email: string;          // Email de contacto principal
  phone: string;          // Teléfono de contacto
  address: string;        // Dirección física
  founded: string;        // Año de fundación
  legalName: string;      // Nombre legal
  taxId: string;          // RUT/ID fiscal
}
```

### **2. Branding y Diseño**
```typescript
branding: {
  primaryColor: string;   // Color primario (#000000)
  secondaryColor: string; // Color secundario (#6B7280)
  accentColor: string;    // Color de acento (#3B82F6)
  logo: string;           // Ruta al logo (/logo.svg)
  favicon: string;        // Ruta al favicon (/favicon.ico)
  theme: "light" | "dark" | "auto";
  fontFamily: string;     // Familia de fuentes
}
```

### **3. Funcionalidades**
```typescript
features: {
  members: boolean;       // Gestión de miembros
  events: boolean;        // Sistema de eventos
  payments: boolean;      // Sistema de pagos
  voting: boolean;        // Votaciones digitales
  analytics: boolean;     // Analytics y reportes
  notifications: boolean; // Sistema de notificaciones
  documents: boolean;     // Gestión de documentos
  communications: boolean; // Comunicaciones
}
```

### **4. Configuración de Módulos**
```typescript
modules: {
  members: {
    enabled: boolean;
    allowRegistration: boolean;
    requireApproval: boolean;
    maxMembers: number;
    roles: string[];
    customFields: any[];
  };
  events: {
    enabled: boolean;
    allowPublicEvents: boolean;
    requireApproval: boolean;
    maxParticipants: number;
    allowWaitlist: boolean;
    categories: string[];
  };
  payments: {
    enabled: boolean;
    currency: string;
    supportedMethods: string[];
    allowRecurring: boolean;
    taxEnabled: boolean;
    taxRate: number;
  };
  // ... otros módulos
}
```

## 🚀 Cómo Crear una Nueva Configuración

### **Paso 1: Crear Archivo de Configuración**
```typescript
// src/lib/configs/nuevo-cliente.ts
import { CommunityConfig } from '../config';

export const nuevoClienteConfig: CommunityConfig = {
  organization: {
    name: "Nuevo Cliente CommunityOS",
    shortName: "NCC",
    description: "Descripción del nuevo cliente",
    website: "https://nuevo-cliente.com",
    email: "info@nuevo-cliente.com",
    phone: "+1 234 567 8900",
    address: "123 Main St, City, Country",
    founded: "2024",
    legalName: "Nuevo Cliente Inc.",
    taxId: "123456789",
  },
  // ... resto de la configuración
};
```

### **Paso 2: Actualizar el Proveedor de Configuración**
```typescript
// src/lib/config.ts
export function getConfig(organizationId?: string): CommunityConfig {
  // Lógica para determinar qué configuración usar
  switch (organizationId) {
    case 'aiaiai':
      return aiaiaiConfig;
    case 'nuevo-cliente':
      return nuevoClienteConfig;
    default:
      return defaultConfig;
  }
}
```

### **Paso 3: Configurar Variables de Entorno**
```env
# .env.local
NEXT_PUBLIC_ORGANIZATION_ID=nuevo-cliente
```

## 🎯 Ejemplos de Configuración

### **Ejemplo 1: Asociación Profesional**
```typescript
const asociacionConfig: CommunityConfig = {
  organization: {
    name: "Asociación de Ingenieros",
    shortName: "AING",
    description: "Asociación profesional de ingenieros",
    // ...
  },
  features: {
    members: true,
    events: true,
    payments: true,
    voting: true,
    analytics: true,
    notifications: true,
    documents: true,
    communications: true,
  },
  modules: {
    members: {
      maxMembers: 10000,
      roles: ["presidente", "vicepresidente", "tesorero", "secretario", "miembro"],
      requireApproval: true,
    },
    events: {
      categories: ["conferencia", "seminario", "networking", "capacitación"],
      maxParticipants: 500,
    },
    payments: {
      currency: "USD",
      supportedMethods: ["stripe", "paypal"],
      taxEnabled: true,
      taxRate: 8.5,
    },
  },
};
```

### **Ejemplo 2: Startup/Incubadora**
```typescript
const startupConfig: CommunityConfig = {
  organization: {
    name: "StartupHub",
    shortName: "SH",
    description: "Incubadora de startups tecnológicas",
    // ...
  },
  features: {
    members: true,
    events: true,
    payments: false, // No cobran membresías
    voting: false,
    analytics: true,
    notifications: true,
    documents: true,
    communications: true,
  },
  modules: {
    members: {
      maxMembers: 1000,
      roles: ["fundador", "mentor", "inversor", "startup"],
      customFields: [
        { name: "startup_name", type: "text" },
        { name: "stage", type: "select", options: ["idea", "mvp", "traction", "scale"] },
      ],
    },
    events: {
      categories: ["pitch", "mentoría", "networking", "workshop"],
      maxParticipants: 100,
    },
  },
};
```

## 🔧 Configuración Avanzada

### **Configuración Regional**
```typescript
regional: {
  timezone: "America/Santiago";
  locale: "es-CL";
  dateFormat: "DD/MM/YYYY";
  timeFormat: "24h";
  currency: "CLP";
  language: "es";
  supportedLanguages: ["es", "en"];
}
```

### **Configuración de Seguridad**
```typescript
security: {
  passwordPolicy: {
    minLength: 8;
    requireUppercase: true;
    requireLowercase: true;
    requireNumbers: true;
    requireSymbols: false;
  };
  sessionTimeout: 24 * 60 * 60; // 24 horas
  maxLoginAttempts: 5;
  lockoutDuration: 15 * 60; // 15 minutos
  twoFactorAuth: false;
}
```

### **Configuración de Comunicaciones**
```typescript
communication: {
  email: {
    enabled: true;
    provider: "sendgrid";
    fromEmail: "noreply@organizacion.com";
    fromName: "Nombre Organización";
    templates: {
      welcome: "welcome-template";
      eventReminder: "event-reminder-template";
      // ...
    };
  };
  notifications: {
    enabled: true;
    channels: ["email", "push", "sms"];
    defaultPreferences: {
      email: true;
      push: false;
      sms: false;
    };
  };
}
```

## 🎨 Personalización de UI

### **Colores Personalizados**
```typescript
branding: {
  primaryColor: "#1F2937",    // Gris oscuro
  secondaryColor: "#6B7280",  // Gris medio
  accentColor: "#3B82F6",     // Azul
}
```

### **Temas**
```typescript
branding: {
  theme: "light", // light, dark, auto
  fontFamily: "Inter, system-ui, sans-serif",
}
```

## 📊 Configuración de Analytics

```typescript
analytics: {
  enabled: true;
  trackPageViews: true;
  trackEvents: true;
  trackMembers: true;
  privacyCompliant: true;
}
```

## 🔌 Integraciones

```typescript
integrations: {
  calendar: {
    enabled: true;
    providers: ["google", "outlook", "ical"];
  };
  social: {
    enabled: true;
    providers: ["facebook", "twitter", "linkedin"];
  };
  crm: {
    enabled: false;
    providers: ["salesforce", "hubspot"];
  };
  accounting: {
    enabled: true;
    providers: ["quickbooks", "xero"];
  };
}
```

## 🚀 Despliegue con Configuración

### **1. Configuración por Organización**
```bash
# Variable de entorno para determinar la organización
NEXT_PUBLIC_ORGANIZATION_ID=aiaiai
```

### **2. Configuración Dinámica**
```typescript
// En el componente
const { config } = useConfig(process.env.NEXT_PUBLIC_ORGANIZATION_ID);
```

### **3. Configuración en Vercel**
- Ve a tu proyecto en Vercel
- Settings → Environment Variables
- Agrega `NEXT_PUBLIC_ORGANIZATION_ID` con el valor correspondiente

## 📝 Mejores Prácticas

### **1. Nomenclatura**
- Usa nombres descriptivos para las configuraciones
- Mantén consistencia en la estructura
- Documenta cambios importantes

### **2. Seguridad**
- No incluyas información sensible en la configuración
- Usa variables de entorno para claves y secretos
- Valida la configuración en tiempo de ejecución

### **3. Mantenimiento**
- Versiona las configuraciones
- Mantén backups de configuraciones importantes
- Prueba cambios en desarrollo antes de producción

### **4. Escalabilidad**
- Diseña configuraciones que puedan crecer
- Usa valores por defecto sensatos
- Permite override de configuraciones específicas

## 🆘 Troubleshooting

### **Problema: Configuración no se aplica**
```bash
# Verificar variable de entorno
echo $NEXT_PUBLIC_ORGANIZATION_ID

# Verificar que el archivo existe
ls src/lib/configs/

# Verificar importaciones
npm run build
```

### **Problema: Errores de tipos**
```bash
# Verificar tipos TypeScript
npx tsc --noEmit

# Verificar configuración
npm run lint
```

### **Problema: Configuración no persiste**
- Verificar que `updateConfig` está implementado
- Verificar conexión a base de datos
- Verificar permisos de escritura

## 📞 Soporte

Para ayuda con la configuración:
- 📧 Email: support@communityos.app
- 📖 Documentación: https://docs.communityos.app
- 💬 Chat: Disponible en la plataforma

---

**¡CommunityOS está diseñado para ser completamente flexible y personalizable!** 🎉 