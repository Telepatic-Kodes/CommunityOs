'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Zap,
  Download,
  Upload,
  Smartphone,
  Monitor,
  Globe
} from 'lucide-react';
import { PerformanceMonitor } from '@/components/ui/PerformanceMonitor';

export default function PerformancePage() {
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await fetch('/api/performance');
        const data = await response.json();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricalData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-slide-in-top">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Performance Analytics</h1>
          <p className="text-neutral-700 max-w-2xl">
            Monitoreo avanzado del rendimiento de la aplicación. Analiza métricas en tiempo real y tendencias históricas.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" className="border-gradient hover-scale-modern">
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button size="sm" className="btn-modern glow hover-scale-modern">
            <Activity className="h-4 w-4 mr-2" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-bottom">
        <Card className="card-modern hover-scale-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Promedio</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{historicalData?.averageScore || 85}</div>
            <p className="text-xs text-neutral-600">Puntuación general</p>
          </CardContent>
        </Card>

        <Card className="card-modern hover-scale-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Métricas Totales</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{historicalData?.totalMetrics || 1250}</div>
            <p className="text-xs text-neutral-600">Registros capturados</p>
          </CardContent>
        </Card>

        <Card className="card-modern hover-scale-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Últimas 24h</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{historicalData?.last24Hours || 45}</div>
            <p className="text-xs text-neutral-600">Métricas hoy</p>
          </CardContent>
        </Card>

        <Card className="card-modern hover-scale-modern">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejora Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">24%</div>
            <p className="text-xs text-neutral-600">vs período anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="realtime" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 card-modern">
          <TabsTrigger value="realtime" className="hover-scale-modern">
            <Activity className="h-4 w-4 mr-2" />
            Tiempo Real
          </TabsTrigger>
          <TabsTrigger value="trends" className="hover-scale-modern">
            <TrendingUp className="h-4 w-4 mr-2" />
            Tendencias
          </TabsTrigger>
          <TabsTrigger value="devices" className="hover-scale-modern">
            <Smartphone className="h-4 w-4 mr-2" />
            Dispositivos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="space-y-6">
          <PerformanceMonitor />
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FCP Trend */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  First Contentful Paint
                </CardTitle>
                <CardDescription>
                  Tiempo hasta el primer contenido pintado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Actual:</span>
                    <span className="font-semibold text-green-600">
                      {historicalData?.trends?.fcp?.current || 1200}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Anterior:</span>
                    <span className="font-semibold text-neutral-600">
                      {historicalData?.trends?.fcp?.previous || 1400}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mejora:</span>
                    <span className="font-semibold text-green-600">
                      +{historicalData?.trends?.fcp?.improvement || 14}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LCP Trend */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Largest Contentful Paint
                </CardTitle>
                <CardDescription>
                  Tiempo hasta el contenido más grande pintado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Actual:</span>
                    <span className="font-semibold text-green-600">
                      {historicalData?.trends?.lcp?.current || 1800}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Anterior:</span>
                    <span className="font-semibold text-neutral-600">
                      {historicalData?.trends?.lcp?.previous || 2200}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mejora:</span>
                    <span className="font-semibold text-green-600">
                      +{historicalData?.trends?.lcp?.improvement || 18}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FID Trend */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  First Input Delay
                </CardTitle>
                <CardDescription>
                  Tiempo hasta la primera interacción del usuario
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Actual:</span>
                    <span className="font-semibold text-green-600">
                      {historicalData?.trends?.fid?.current || 45}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Anterior:</span>
                    <span className="font-semibold text-neutral-600">
                      {historicalData?.trends?.fid?.previous || 65}ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mejora:</span>
                    <span className="font-semibold text-green-600">
                      +{historicalData?.trends?.fid?.improvement || 31}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CLS Trend */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Cumulative Layout Shift
                </CardTitle>
                <CardDescription>
                  Medida de estabilidad visual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Actual:</span>
                    <span className="font-semibold text-green-600">
                      {historicalData?.trends?.cls?.current || 0.08}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Anterior:</span>
                    <span className="font-semibold text-neutral-600">
                      {historicalData?.trends?.cls?.previous || 0.12}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mejora:</span>
                    <span className="font-semibold text-green-600">
                      +{historicalData?.trends?.cls?.improvement || 33}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Distribution */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Distribución de Dispositivos
                </CardTitle>
                <CardDescription>
                  Métricas por tipo de dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Desktop:</span>
                    <span className="font-semibold text-blue-600">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Mobile:</span>
                    <span className="font-semibold text-green-600">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Tablet:</span>
                    <span className="font-semibold text-purple-600">15%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Network Distribution */}
            <Card className="card-modern animate-slide-in-bottom hover-scale-modern">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Distribución de Red
                </CardTitle>
                <CardDescription>
                  Métricas por tipo de conexión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">4G:</span>
                    <span className="font-semibold text-green-600">60%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">WiFi:</span>
                    <span className="font-semibold text-blue-600">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">3G:</span>
                    <span className="font-semibold text-yellow-600">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 