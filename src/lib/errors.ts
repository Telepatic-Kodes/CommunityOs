/**
 * Sistema centralizado de manejo de errores para CommunityOS
 * Incluye tipos de errores específicos, logging y recuperación
 */

// ============================================================================
// TIPOS DE ERRORES
// ============================================================================

/**
 * Tipos de errores de la aplicación
 */
export enum ErrorType {
  // Errores de autenticación
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // Errores de autorización
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',
  ACCESS_DENIED = 'ACCESS_DENIED',
  
  // Errores de validación
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT = 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  
  // Errores de base de datos
  DATABASE_ERROR = 'DATABASE_ERROR',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  DUPLICATE_RECORD = 'DUPLICATE_RECORD',
  CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
  
  // Errores de red
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // Errores de negocio
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  INVALID_STATE = 'INVALID_STATE',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  
  // Errores del sistema
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
}

/**
 * Niveles de severidad de errores
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * Interfaz base para errores de la aplicación
 */
export interface AppError {
  type: ErrorType;
  message: string;
  code: string;
  severity: ErrorSeverity;
  timestamp: string;
  context?: Record<string, unknown>;
  originalError?: Error;
  stack?: string;
}

// ============================================================================
// CLASES DE ERRORES ESPECÍFICOS
// ============================================================================

/**
 * Error base de la aplicación
 */
export class CommunityOSError extends Error implements AppError {
  public readonly type: ErrorType;
  public readonly code: string;
  public readonly severity: ErrorSeverity;
  public readonly timestamp: string;
  public readonly context?: Record<string, unknown>;
  public readonly originalError?: Error;

  constructor(
    type: ErrorType,
    message: string,
    code: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context?: Record<string, unknown>,
    originalError?: Error
  ) {
    super(message);
    this.name = 'CommunityOSError';
    this.type = type;
    this.code = code;
    this.severity = severity;
    this.timestamp = new Date().toISOString();
    this.context = context;
    this.originalError = originalError;
    
    // Mantener el stack trace
    if (originalError?.stack) {
      this.stack = originalError.stack;
    }
  }
}

/**
 * Error de autenticación
 */
export class AuthenticationError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.AUTHENTICATION_FAILED,
      message,
      'AUTH_001',
      ErrorSeverity.HIGH,
      context,
      originalError
    );
    this.name = 'AuthenticationError';
  }
}

/**
 * Error de autorización
 */
export class AuthorizationError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.UNAUTHORIZED,
      message,
      'AUTH_002',
      ErrorSeverity.HIGH,
      context,
      originalError
    );
    this.name = 'AuthorizationError';
  }
}

/**
 * Error de validación
 */
export class ValidationError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.VALIDATION_ERROR,
      message,
      'VAL_001',
      ErrorSeverity.MEDIUM,
      context,
      originalError
    );
    this.name = 'ValidationError';
  }
}

/**
 * Error de base de datos
 */
export class DatabaseError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.DATABASE_ERROR,
      message,
      'DB_001',
      ErrorSeverity.HIGH,
      context,
      originalError
    );
    this.name = 'DatabaseError';
  }
}

/**
 * Error de registro no encontrado
 */
export class NotFoundError extends CommunityOSError {
  constructor(resource: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.RECORD_NOT_FOUND,
      `${resource} no encontrado`,
      'DB_002',
      ErrorSeverity.MEDIUM,
      { resource, ...context },
      originalError
    );
    this.name = 'NotFoundError';
  }
}

/**
 * Error de red
 */
export class NetworkError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.NETWORK_ERROR,
      message,
      'NET_001',
      ErrorSeverity.HIGH,
      context,
      originalError
    );
    this.name = 'NetworkError';
  }
}

/**
 * Error de negocio
 */
export class BusinessError extends CommunityOSError {
  constructor(message: string, context?: Record<string, unknown>, originalError?: Error) {
    super(
      ErrorType.BUSINESS_RULE_VIOLATION,
      message,
      'BUS_001',
      ErrorSeverity.MEDIUM,
      context,
      originalError
    );
    this.name = 'BusinessError';
  }
}

// ============================================================================
// MANEJADOR DE ERRORES
// ============================================================================

/**
 * Configuración del manejador de errores
 */
export interface ErrorHandlerConfig {
  logErrors: boolean;
  logToConsole: boolean;
  logToExternalService: boolean;
  externalServiceUrl?: string;
  includeStackTraces: boolean;
  maskSensitiveData: boolean;
}

/**
 * Manejador centralizado de errores
 */
export class ErrorHandler {
  private static instance: ErrorHandler;
  private config: ErrorHandlerConfig;

  private constructor(config: ErrorHandlerConfig) {
    this.config = config;
  }

  static getInstance(config?: ErrorHandlerConfig): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler(config || {
        logErrors: true,
        logToConsole: true,
        logToExternalService: false,
        includeStackTraces: process.env.NODE_ENV === 'development',
        maskSensitiveData: true,
      });
    }
    return ErrorHandler.instance;
  }

  /**
   * Maneja un error de forma centralizada
   */
  handleError(error: Error | AppError, context?: Record<string, unknown>): void {
    const appError = this.normalizeError(error, context);
    
    if (this.config.logErrors) {
      this.logError(appError);
    }
    
    // En desarrollo, mostrar en consola
    if (this.config.logToConsole && process.env.NODE_ENV === 'development') {
      console.error('Error handled:', appError);
    }
  }

  /**
   * Normaliza un error a AppError
   */
  private normalizeError(error: Error | AppError, context?: Record<string, unknown>): AppError {
    if (this.isAppError(error)) {
      return error;
    }

    // Determinar tipo de error basado en el mensaje o propiedades
    const errorType = this.determineErrorType(error);
    const severity = this.determineSeverity(errorType);
    
    return new CommunityOSError(
      errorType,
      error.message,
      this.generateErrorCode(errorType),
      severity,
      context,
      error
    );
  }

  /**
   * Determina el tipo de error basado en el error original
   */
  private determineErrorType(error: Error): ErrorType {
    const message = error.message.toLowerCase();
    const name = error.name.toLowerCase();

    if (name.includes('auth') || message.includes('unauthorized')) {
      return ErrorType.AUTHENTICATION_FAILED;
    }
    
    if (name.includes('validation') || message.includes('validation')) {
      return ErrorType.VALIDATION_ERROR;
    }
    
    if (name.includes('network') || message.includes('network')) {
      return ErrorType.NETWORK_ERROR;
    }
    
    if (name.includes('database') || message.includes('database')) {
      return ErrorType.DATABASE_ERROR;
    }
    
    return ErrorType.INTERNAL_ERROR;
  }

  /**
   * Determina la severidad del error
   */
  private determineSeverity(errorType: ErrorType): ErrorSeverity {
    switch (errorType) {
      case ErrorType.AUTHENTICATION_FAILED:
      case ErrorType.UNAUTHORIZED:
      case ErrorType.DATABASE_ERROR:
      case ErrorType.NETWORK_ERROR:
        return ErrorSeverity.HIGH;
      
      case ErrorType.VALIDATION_ERROR:
      case ErrorType.BUSINESS_RULE_VIOLATION:
        return ErrorSeverity.MEDIUM;
      
      case ErrorType.RECORD_NOT_FOUND:
        return ErrorSeverity.LOW;
      
      default:
        return ErrorSeverity.MEDIUM;
    }
  }

  /**
   * Genera un código de error único
   */
  private generateErrorCode(errorType: ErrorType): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${errorType}_${timestamp}_${random}`.toUpperCase();
  }

  /**
   * Verifica si un error es AppError
   */
  private isAppError(error: Error | AppError): error is AppError {
    return 'type' in error && 'code' in error && 'severity' in error;
  }

  /**
   * Registra el error
   */
  private logError(error: AppError): void {
    const logEntry = {
      ...error,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    };

    // En producción, enviar a servicio de logging
    if (this.config.logToExternalService && this.config.externalServiceUrl) {
      this.sendToExternalService(logEntry);
    }
  }

  /**
   * Envía error a servicio externo
   */
  private async sendToExternalService(logEntry: AppError): Promise<void> {
    try {
      if (this.config.externalServiceUrl) {
        await fetch(this.config.externalServiceUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(logEntry),
        });
      }
    } catch (sendError) {
      console.error('Failed to send error to external service:', sendError);
    }
  }
}

// ============================================================================
// UTILIDADES DE ERROR
// ============================================================================

/**
 * Instancia global del manejador de errores
 */
export const errorHandler = ErrorHandler.getInstance();

/**
 * Wrapper para manejar errores en funciones async
 */
export function withErrorHandling<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  context?: Record<string, unknown>
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      errorHandler.handleError(error as Error, context);
      throw error;
    }
  };
}

/**
 * Crea un error de validación
 */
export function createValidationError(message: string, field?: string): ValidationError {
  return new ValidationError(message, field ? { field } : undefined);
}

/**
 * Crea un error de no encontrado
 */
export function createNotFoundError(resource: string, id?: string): NotFoundError {
  return new NotFoundError(resource, id ? { id } : undefined);
}

/**
 * Crea un error de autenticación
 */
export function createAuthenticationError(message: string, userId?: string): AuthenticationError {
  return new AuthenticationError(message, userId ? { userId } : undefined);
}

/**
 * Crea un error de autorización
 */
export function createAuthorizationError(message: string, userId?: string, resource?: string): AuthorizationError {
  return new AuthorizationError(message, { userId, resource });
}

/**
 * Crea un error de negocio
 */
export function createBusinessError(message: string, rule?: string): BusinessError {
  return new BusinessError(message, rule ? { rule } : undefined);
} 