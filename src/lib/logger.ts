/**
 * Sistema de logging centralizado para CommunityOS
 * Incluye diferentes niveles, formatos y destinos de logging
 */

// ============================================================================
// TIPOS Y ENUMERACIONES
// ============================================================================

/**
 * Niveles de logging
 */
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace',
}

/**
 * Destinos de logging
 */
export enum LogDestination {
  CONSOLE = 'console',
  FILE = 'file',
  EXTERNAL = 'external',
  DATABASE = 'database',
}

/**
 * Contexto del log
 */
export interface LogContext {
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  method?: string;
  url?: string;
  [key: string]: unknown;
}

/**
 * Entrada de log
 */
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
  metadata?: Record<string, unknown>;
}

/**
 * Configuración del logger
 */
export interface LoggerConfig {
  level: LogLevel;
  destinations: LogDestination[];
  includeTimestamp: boolean;
  includeContext: boolean;
  format: 'json' | 'text';
  maxFileSize: number; // en bytes
  maxFiles: number;
  externalServiceUrl?: string;
  externalServiceKey?: string;
}

// ============================================================================
// CLASE LOGGER PRINCIPAL
// ============================================================================

/**
 * Logger principal de la aplicación
 */
export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private logQueue: LogEntry[] = [];
  private isProcessing = false;

  private constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      level: LogLevel.INFO,
      destinations: [LogDestination.CONSOLE],
      includeTimestamp: true,
      includeContext: true,
      format: 'json',
      maxFileSize: 10 * 1024 * 1024, // 10MB
      maxFiles: 5,
      ...config,
    };
  }

  /**
   * Obtiene la instancia singleton del logger
   */
  static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config);
    }
    return Logger.instance;
  }

  /**
   * Configura el logger
   */
  configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  // ============================================================================
  // MÉTODOS DE LOGGING
  // ============================================================================

  /**
   * Log de error
   */
  error(message: string, context?: LogContext, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  /**
   * Log de advertencia
   */
  warn(message: string, context?: LogContext): void {
    this.log(LogLevel.WARN, message, context);
  }

  /**
   * Log de información
   */
  info(message: string, context?: LogContext): void {
    this.log(LogLevel.INFO, message, context);
  }

  /**
   * Log de debug
   */
  debug(message: string, context?: LogContext): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  /**
   * Log de trace
   */
  trace(message: string, context?: LogContext): void {
    this.log(LogLevel.TRACE, message, context);
  }

  /**
   * Método principal de logging
   */
  private log(level: LogLevel, message: string, context?: LogContext, error?: Error): void {
    // Verificar nivel de logging
    if (!this.shouldLog(level)) {
      return;
    }

    // Crear entrada de log
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
      metadata: {
        environment: process.env.NODE_ENV,
        version: process.env.npm_package_version || 'unknown',
      },
    };

    // Agregar a la cola
    this.logQueue.push(entry);

    // Procesar cola de forma asíncrona
    this.processQueue();
  }

  /**
   * Verifica si debe hacer log basado en el nivel
   */
  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel);
    const configLevelIndex = levels.indexOf(this.config.level);
    const currentLevelIndex = levels.indexOf(level);
    
    return currentLevelIndex <= configLevelIndex;
  }

  /**
   * Procesa la cola de logs
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.logQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const entries = [...this.logQueue];
      this.logQueue = [];

      for (const entry of entries) {
        await this.writeToDestinations(entry);
      }
    } catch (error) {
      console.error('Error processing log queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Escribe a los destinos configurados
   */
  private async writeToDestinations(entry: LogEntry): Promise<void> {
    const promises = this.config.destinations.map(destination => {
      switch (destination) {
        case LogDestination.CONSOLE:
          return this.writeToConsole(entry);
        case LogDestination.FILE:
          return this.writeToFile(entry);
        case LogDestination.EXTERNAL:
          return this.writeToExternal(entry);
        case LogDestination.DATABASE:
          return this.writeToDatabase(entry);
        default:
          return Promise.resolve();
      }
    });

    await Promise.allSettled(promises);
  }

  // ============================================================================
  // DESTINOS DE LOGGING
  // ============================================================================

  /**
   * Escribe a consola
   */
  private writeToConsole(entry: LogEntry): void {
    const formatted = this.formatEntry(entry);
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formatted);
        break;
      case LogLevel.WARN:
        console.warn(formatted);
        break;
      case LogLevel.INFO:
        console.info(formatted);
        break;
      case LogLevel.DEBUG:
        console.debug(formatted);
        break;
      case LogLevel.TRACE:
        console.trace(formatted);
        break;
    }
  }

  /**
   * Escribe a archivo
   */
  private async writeToFile(entry: LogEntry): Promise<void> {
    // En el navegador, no podemos escribir archivos
    if (typeof window !== 'undefined') {
      return;
    }

    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const logDir = path.join(process.cwd(), 'logs');
      const logFile = path.join(logDir, `${entry.level}.log`);
      
      // Crear directorio si no existe
      await fs.mkdir(logDir, { recursive: true });
      
      // Formatear entrada
      const formatted = this.formatEntry(entry) + '\n';
      
      // Escribir archivo
      await fs.appendFile(logFile, formatted);
      
      // Rotar archivo si es muy grande
      await this.rotateLogFile(logFile);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  }

  /**
   * Escribe a servicio externo
   */
  private async writeToExternal(entry: LogEntry): Promise<void> {
    if (!this.config.externalServiceUrl || !this.config.externalServiceKey) {
      return;
    }

    try {
      const response = await fetch(this.config.externalServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.externalServiceKey}`,
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error(`External logging service returned ${response.status}`);
      }
    } catch (error) {
      console.error('Error writing to external service:', error);
    }
  }

  /**
   * Escribe a base de datos
   */
  private async writeToDatabase(entry: LogEntry): Promise<void> {
    try {
      // TODO: Implementar escritura a Supabase
      console.log('Writing to database:', entry);
    } catch (error) {
      console.error('Error writing to database:', error);
    }
  }

  // ============================================================================
  // UTILIDADES
  // ============================================================================

  /**
   * Formatea una entrada de log
   */
  private formatEntry(entry: LogEntry): string {
    if (this.config.format === 'json') {
      return JSON.stringify(entry, null, 2);
    }

    // Formato de texto
    let formatted = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`;
    
    if (entry.error) {
      formatted += `\nError: ${entry.error.message}\nStack: ${entry.error.stack}`;
    }
    
    if (entry.context && this.config.includeContext) {
      formatted += `\nContext: ${JSON.stringify(entry.context)}`;
    }
    
    return formatted;
  }

  /**
   * Rota archivos de log
   */
  private async rotateLogFile(logFile: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const stats = await fs.stat(logFile);
      
      if (stats.size > this.config.maxFileSize) {
        const dir = path.dirname(logFile);
        const ext = path.extname(logFile);
        const base = path.basename(logFile, ext);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const newFile = path.join(dir, `${base}.${timestamp}${ext}`);
        
        await fs.rename(logFile, newFile);
        
        // Eliminar archivos antiguos
        await this.cleanOldLogFiles(dir, base, ext);
      }
    } catch (error) {
      console.error('Error rotating log file:', error);
    }
  }

  /**
   * Limpia archivos de log antiguos
   */
  private async cleanOldLogFiles(dir: string, base: string, ext: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      const files = await fs.readdir(dir);
      const logFiles = files
        .filter(file => file.startsWith(base) && file.endsWith(ext))
        .map(file => path.join(dir, file))
        .sort()
        .reverse();
      
      // Mantener solo los archivos más recientes
      if (logFiles.length > this.config.maxFiles) {
        const filesToDelete = logFiles.slice(this.config.maxFiles);
        
        for (const file of filesToDelete) {
          await fs.unlink(file);
        }
      }
    } catch (error) {
      console.error('Error cleaning old log files:', error);
    }
  }
}

// ============================================================================
// INSTANCIA GLOBAL
// ============================================================================

/**
 * Instancia global del logger
 */
export const logger = Logger.getInstance({
  level: process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG,
  destinations: process.env.NODE_ENV === 'production' 
    ? [LogDestination.CONSOLE, LogDestination.EXTERNAL]
    : [LogDestination.CONSOLE],
  format: process.env.NODE_ENV === 'production' ? 'json' : 'text',
});

// ============================================================================
// HOOKS DE LOGGING
// ============================================================================

/**
 * Hook para logging en componentes React
 */
export function useLogger() {
  return {
    error: (message: string, context?: LogContext) => logger.error(message, context),
    warn: (message: string, context?: LogContext) => logger.warn(message, context),
    info: (message: string, context?: LogContext) => logger.info(message, context),
    debug: (message: string, context?: LogContext) => logger.debug(message, context),
    trace: (message: string, context?: LogContext) => logger.trace(message, context),
  };
}

/**
 * Wrapper para logging de errores en funciones async
 */
export function withLogging<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  context?: LogContext
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now();
    
    try {
      logger.debug('Function started', { ...context, args });
      const result = await fn(...args);
      logger.debug('Function completed', { 
        ...context, 
        duration: Date.now() - startTime 
      });
      return result;
    } catch (error) {
      logger.error('Function failed', { 
        ...context, 
        error: error as Error,
        duration: Date.now() - startTime 
      });
      throw error;
    }
  };
} 