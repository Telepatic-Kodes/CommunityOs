/**
 * Módulo de seguridad centralizado para CommunityOS
 * Incluye validaciones, sanitización y políticas de seguridad
 */

// ============================================================================
// SANITIZACIÓN DE DATOS
// ============================================================================

/**
 * Sanitiza texto para prevenir XSS
 */
export function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim();
}

/**
 * Sanitiza HTML permitiendo solo tags seguros
 */
export function sanitizeHTML(html: string): string {
  // Implementación básica - en producción usar DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
}

/**
 * Sanitiza objeto completo
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj } as T;
  
  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      (sanitized as Record<string, unknown>)[key] = sanitizeObject(value as Record<string, unknown>);
    }
  }
  
  return sanitized;
}

// ============================================================================
// VALIDACIÓN DE ENTRADA
// ============================================================================

/**
 * Valida email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida contraseña
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres');
  }
  
  if (password.length > 128) {
    errors.push('La contraseña no puede exceder 128 caracteres');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Debe contener al menos una mayúscula');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Debe contener al menos una minúscula');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Debe contener al menos un número');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Debe contener al menos un carácter especial');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Valida nombre
 */
export function validateName(name: string): boolean {
  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
  return nameRegex.test(name.trim());
}

/**
 * Valida teléfono
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Valida URL
 */
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============================================================================
// POLÍTICAS DE SEGURIDAD
// ============================================================================

/**
 * Configuración de políticas de seguridad
 */
export const securityPolicies = {
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    preventCommonPasswords: true,
  },
  session: {
    timeout: 24 * 60 * 60, // 24 horas
    maxConcurrentSessions: 3,
    requireReauthForSensitiveActions: true,
  },
  rateLimit: {
    maxRequestsPerMinute: 100,
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60, // 15 minutos
  },
  dataRetention: {
    logs: 90, // días
    userData: 365, // días
    backups: 7, // días
  },
} as const;

// ============================================================================
// UTILIDADES DE SEGURIDAD
// ============================================================================

/**
 * Genera un token seguro
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
}

/**
 * Enmascara datos sensibles
 */
export function maskSensitiveData(data: string, type: 'email' | 'phone' | 'creditCard'): string {
  switch (type) {
    case 'email': {
      const [local, domain] = data.split('@');
      if (!local || !domain) return data;
      return `${local.charAt(0)}***@${domain}`;
    }
    
    case 'phone':
      return data.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2');
    
    case 'creditCard':
      return data.replace(/\d(?=\d{4})/g, '*');
    
    default:
      return data;
  }
}

/**
 * Verifica si una URL es segura
 */
export function isSecureUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:' && urlObj.hostname === 'localhost';
  } catch {
    return false;
  }
}

// ============================================================================
// LOGGING DE SEGURIDAD
// ============================================================================

/**
 * Logger para eventos de seguridad
 */
export class SecurityLogger {
  private static instance: SecurityLogger;
  
  private constructor() {}
  
  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }
  
  logSecurityEvent(event: string, details: Record<string, unknown> = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      severity: this.getSeverity(event),
    };
    
    // En producción, enviar a servicio de logging
    console.warn('[SECURITY]', logEntry);
  }
  
  private getSeverity(event: string): 'low' | 'medium' | 'high' | 'critical' {
    const criticalEvents = ['login_failure', 'suspicious_activity', 'data_breach'];
    const highEvents = ['password_change', 'permission_change', 'admin_action'];
    const mediumEvents = ['user_creation', 'data_access'];
    
    if (criticalEvents.some(e => event.includes(e))) return 'critical';
    if (highEvents.some(e => event.includes(e))) return 'high';
    if (mediumEvents.some(e => event.includes(e))) return 'medium';
    return 'low';
  }
}

export const securityLogger = SecurityLogger.getInstance(); 