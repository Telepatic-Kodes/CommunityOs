'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { usePerformanceMonitor, getDeviceInfo, getNetworkInfo } from '@/lib/performance';

interface PerformanceMetricProps {
  label: string;
  value: number;
  unit: string;
  threshold: { good: number; needsImprovement: number };
  description: string;
}

function PerformanceMetric({ label, value, unit, threshold, description }: PerformanceMetricProps) {
  const getStatus = () => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = () => {
    const status = getStatus();
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'needs-improvement': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = () => {
    const status = getStatus();
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement': return <AlertTriangle className="h-4 w-4" />;
      case 'poor': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getProgressValue = () => {
    const maxValue = threshold.needsImprovement * 1.5;
    return Math.min((value / maxValue) * 100, 100);
  };

  return (
    <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{label}</CardTitle>
          <Badge className={getStatusColor()}>
            {getStatusIcon()}
          </Badge>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gradient">
            {value.toFixed(2)}
          </span>
          <span className="text-sm text-neutral-600">{unit}</span>
        </div>
        <Progress value={getProgressValue()} className="h-2" />
        <div className="flex justify-between text-xs text-neutral-600">
          <span>Good: ≤{threshold.good}</span>
          <span>Needs Improvement: ≤{threshold.needsImprovement}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceMonitor() {
  const { metrics, score } = usePerformanceMonitor();
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setDeviceInfo(getDeviceInfo());
    setNetworkInfo(getNetworkInfo());
  }, []);

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = () => {
    if (score >= 90) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 70) return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  const performanceMetrics = [
    {
      label: 'First Contentful Paint',
      value: metrics.fcp,
      unit: 'ms',
      threshold: { good: 1000, needsImprovement: 1800 },
      description: 'Time until the first content is painted',
    },
    {
      label: 'Largest Contentful Paint',
      value: metrics.lcp,
      unit: 'ms',
      threshold: { good: 1500, needsImprovement: 2500 },
      description: 'Time until the largest content is painted',
    },
    {
      label: 'First Input Delay',
      value: metrics.fid,
      unit: 'ms',
      threshold: { good: 50, needsImprovement: 100 },
      description: 'Time until the first user interaction',
    },
    {
      label: 'Cumulative Layout Shift',
      value: metrics.cls,
      unit: '',
      threshold: { good: 0.1, needsImprovement: 0.25 },
      description: 'Visual stability measure',
    },
    {
      label: 'Time to First Byte',
      value: metrics.ttfb,
      unit: 'ms',
      threshold: { good: 600, needsImprovement: 1000 },
      description: 'Server response time',
    },
    {
      label: 'Time to Interactive',
      value: metrics.tti,
      unit: 'ms',
      threshold: { good: 2000, needsImprovement: 3500 },
      description: 'Time until page is fully interactive',
    },
  ];

  return (
    <div className="space-y-6 animate-slide-in-bottom">
      {/* Header */}
      <div className="flex items-center justify-between animate-slide-in-top">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gradient">Performance Monitor</h2>
          <p className="text-neutral-600">
            Monitoreo en tiempo real del rendimiento de la aplicación
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gradient hover-scale-modern"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Performance Score */}
      <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Performance Score</CardTitle>
              <CardDescription>
                Puntuación general del rendimiento de la aplicación
              </CardDescription>
            </div>
            {getScoreIcon()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-4xl font-bold text-gradient">
              {score}
            </div>
            <div className="text-sm text-neutral-600">
              <div>Excelente: 90-100</div>
              <div>Bueno: 70-89</div>
              <div>Necesita Mejora: 0-69</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900">Core Web Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceMetrics.slice(0, 3).map((metric, index) => (
            <PerformanceMetric key={metric.label} {...metric} />
          ))}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">Métricas Adicionales</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover-scale-modern"
          >
            {isExpanded ? 'Mostrar Menos' : 'Mostrar Más'}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in-bottom">
            {performanceMetrics.slice(3).map((metric, index) => (
              <PerformanceMetric key={metric.label} {...metric} />
            ))}
          </div>
        )}
      </div>

      {/* Device & Network Info */}
      {isExpanded && deviceInfo && networkInfo && (
        <div className="space-y-4 animate-slide-in-bottom">
          <h3 className="text-lg font-semibold text-neutral-900">Información del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Dispositivo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Plataforma:</span>
                  <span className="text-sm font-medium">{deviceInfo.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Memoria:</span>
                  <span className="text-sm font-medium">{deviceInfo.deviceMemory} GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Núcleos:</span>
                  <span className="text-sm font-medium">{deviceInfo.hardwareConcurrency}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Red
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Tipo:</span>
                  <span className="text-sm font-medium">{networkInfo.effectiveType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">Velocidad:</span>
                  <span className="text-sm font-medium">{networkInfo.downlink} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-neutral-600">RTT:</span>
                  <span className="text-sm font-medium">{networkInfo.rtt} ms</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
} 