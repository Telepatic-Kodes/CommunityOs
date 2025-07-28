'use client';

// Tipos para métricas de performance
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  fmp: number; // First Meaningful Paint
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
  si: number; // Speed Index
}

export interface PerformanceData {
  timestamp: number;
  url: string;
  metrics: PerformanceMetrics;
  userAgent: string;
  connection?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}

// Clase para monitoreo de performance
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: PerformanceObserver[] = [];
  private metrics: PerformanceMetrics = {
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fmp: 0,
    tti: 0,
    tbt: 0,
    si: 0,
  };

  private constructor() {
    this.initObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initObservers() {
    // Observer para FCP (First Contentful Paint)
    if ('PerformanceObserver' in window) {
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries[entries.length - 1];
          this.metrics.fcp = fcpEntry.startTime;
          this.logMetric('FCP', this.metrics.fcp);
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
        this.observers.push(fcpObserver);
      } catch (e) {
        console.warn('FCP Observer not supported');
      }

      // Observer para LCP (Largest Contentful Paint)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1];
          this.metrics.lcp = lcpEntry.startTime;
          this.logMetric('LCP', this.metrics.lcp);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP Observer not supported');
      }

      // Observer para FID (First Input Delay)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fidEntry = entries[entries.length - 1];
          this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          this.logMetric('FID', this.metrics.fid);
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID Observer not supported');
      }

      // Observer para CLS (Cumulative Layout Shift)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.metrics.cls = clsValue;
          this.logMetric('CLS', this.metrics.cls);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS Observer not supported');
      }
    }
  }

  private logMetric(name: string, value: number) {
    console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
    
    // Enviar métrica al servidor (en producción)
    if (process.env.NODE_ENV === 'production') {
      this.sendMetricToServer(name, value);
    }
  }

  private async sendMetricToServer(name: string, value: number) {
    try {
      const performanceData: PerformanceData = {
        timestamp: Date.now(),
        url: window.location.href,
        metrics: this.metrics,
        userAgent: navigator.userAgent,
        connection: (navigator as any).connection?.effectiveType,
        deviceMemory: (navigator as any).deviceMemory,
        hardwareConcurrency: navigator.hardwareConcurrency,
      };

      await fetch('/api/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceData),
      });
    } catch (error) {
      console.warn('Failed to send performance metric:', error);
    }
  }

  // Método para obtener métricas actuales
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Método para calcular métricas adicionales
  calculateAdditionalMetrics(): Partial<PerformanceMetrics> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navigation) {
      return {
        ttfb: navigation.responseStart - navigation.requestStart,
        fmp: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        tti: navigation.domInteractive - navigation.fetchStart,
        tbt: this.calculateTotalBlockingTime(),
        si: this.calculateSpeedIndex(),
      };
    }

    return {};
  }

  private calculateTotalBlockingTime(): number {
    const longTasks = performance.getEntriesByType('longtask');
    return longTasks.reduce((total, task) => {
      return total + (task.duration > 50 ? task.duration - 50 : 0);
    }, 0);
  }

  private calculateSpeedIndex(): number {
    // Implementación simplificada del Speed Index
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  // Método para obtener score de performance
  getPerformanceScore(): number {
    const { fcp, lcp, fid, cls } = this.metrics;
    
    let score = 100;
    
    // FCP scoring
    if (fcp > 1800) score -= 20;
    else if (fcp > 1000) score -= 10;
    
    // LCP scoring
    if (lcp > 2500) score -= 25;
    else if (lcp > 1500) score -= 15;
    
    // FID scoring
    if (fid > 100) score -= 20;
    else if (fid > 50) score -= 10;
    
    // CLS scoring
    if (cls > 0.25) score -= 25;
    else if (cls > 0.1) score -= 15;
    
    return Math.max(0, score);
  }

  // Método para limpiar observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Hook para usar el monitor de performance
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    fmp: 0,
    tti: 0,
    tbt: 0,
    si: 0,
  });
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    
    // Actualizar métricas cada segundo
    const interval = setInterval(() => {
      const currentMetrics = monitor.getMetrics();
      const additionalMetrics = monitor.calculateAdditionalMetrics();
      
      setMetrics({
        ...currentMetrics,
        ...additionalMetrics,
      });
      
      setScore(monitor.getPerformanceScore());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { metrics, score };
}

// Función para obtener información del dispositivo
export function getDeviceInfo() {
  return {
    userAgent: navigator.userAgent,
    connection: (navigator as any).connection?.effectiveType || 'unknown',
    deviceMemory: (navigator as any).deviceMemory || 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    platform: navigator.platform,
    language: navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
  };
}

// Función para obtener información de la red
export function getNetworkInfo() {
  const connection = (navigator as any).connection;
  return {
    effectiveType: connection?.effectiveType || 'unknown',
    downlink: connection?.downlink || 'unknown',
    rtt: connection?.rtt || 'unknown',
    saveData: connection?.saveData || false,
  };
} 