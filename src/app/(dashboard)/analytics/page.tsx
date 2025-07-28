'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/ui/stats-card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  Activity, 
  BarChart3, 
  TrendingUp, 
  Target,
  Calendar,
  Eye,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useState } from 'react';

// Componente de gráfico de barras simplificado
function BarChart({ data, title }: { data: any[], title: string }) {
  return (
    <Card className="border-0 shadow-sm card-modern animate-slide-in-bottom hover-scale-modern">
      <CardHeader>
        <CardTitle className="text-lg text-gradient">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between hover:bg-neutral-50 p-2 rounded-lg transition-all duration-300">
              <span className="text-sm text-neutral-600">{item.label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((item.value / Math.max(...data.map(d => d.value))) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900">{item.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de gráfico de líneas simplificado
function LineChartComponent({ data, title }: { data: any[], title: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">{item.label}</span>
              <span className="text-sm font-medium text-neutral-900">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de gráfico circular simplificado
function PieChartComponent({ data, title }: { data: any[], title: string }) {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-neutral-900 rounded-full"></div>
                <span className="text-sm text-neutral-600">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-neutral-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Datos simulados para analytics
  const analyticsData = {
    members: {
      total: 1247,
      active: 1189,
      growth: 12.5,
      retention: 87.3,
      churn: 2.1
    },
    revenue: {
      total: 45000000,
      monthly: 3750000,
      growth: 8.7,
      average: 36000
    },
    engagement: {
      participation: 78.4,
      interactionsPerUser: 12.3,
      growth: 15.2,
      satisfaction: 4.6
    },
    events: {
      total: 45,
      satisfaction: 4.8,
      attendance: 78.2
    }
  };

  // Datos para gráficos
  const memberGrowthData = [
    { label: 'Ene', value: 1100 },
    { label: 'Feb', value: 1150 },
    { label: 'Mar', value: 1180 },
    { label: 'Abr', value: 1200 },
    { label: 'May', value: 1220 },
    { label: 'Jun', value: 1247 }
  ];

  const revenueData = [
    { label: 'Ene', value: 3200000 },
    { label: 'Feb', value: 3400000 },
    { label: 'Mar', value: 3500000 },
    { label: 'Abr', value: 3600000 },
    { label: 'May', value: 3700000 },
    { label: 'Jun', value: 3750000 }
  ];

  const eventTypeData = [
    { label: 'Networking', value: 35 },
    { label: 'Educativo', value: 25 },
    { label: 'Social', value: 20 },
    { label: 'Profesional', value: 20 }
  ];

  const memberSegmentData = [
    { label: 'Premium', value: 40 },
    { label: 'Standard', value: 45 },
    { label: 'Basic', value: 15 }
  ];

  const engagementTrendData = [
    { label: 'Semana 1', value: 75 },
    { label: 'Semana 2', value: 78 },
    { label: 'Semana 3', value: 82 },
    { label: 'Semana 4', value: 79 }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-slide-in-bottom">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-slide-in-top">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gradient">Analytics</h1>
          <p className="text-neutral-700 max-w-2xl">
            Métricas detalladas y análisis de rendimiento de la organización. Monitorea el crecimiento y la participación de tu comunidad.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" className="border-gradient hover-scale-modern">
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button variant="outline" size="sm" className="border-gradient hover-scale-modern">
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar Datos
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-neutral-50 rounded-lg card-modern animate-slide-in-bottom">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-neutral-600" />
          <span className="text-sm font-medium text-neutral-700">Período:</span>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              className={selectedPeriod === period ? 'btn-modern glow' : 'border-gradient hover-scale-modern'}
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-in-bottom">
        <StatsCard
          title="Miembros Totales"
          value={analyticsData.members.total.toLocaleString()}
          description={`${analyticsData.members.active} activos`}
          icon={Users}
          trend={{ value: analyticsData.members.growth, isPositive: true }}
        />
        
        <StatsCard
          title="Ingresos Totales"
          value={formatCurrency(analyticsData.revenue.total)}
          description={`${formatCurrency(analyticsData.revenue.monthly)} este mes`}
          icon={DollarSign}
          trend={{ value: analyticsData.revenue.growth, isPositive: true }}
        />
        
        <StatsCard
          title="Tasa de Engagement"
          value={`${analyticsData.engagement.participation}%`}
          description={`${analyticsData.engagement.interactionsPerUser} interacciones/usuario`}
          icon={Activity}
          trend={{ value: analyticsData.engagement.growth, isPositive: true }}
        />
        
        <StatsCard
          title="Satisfacción Promedio"
          value={`${analyticsData.events.satisfaction}/5`}
          description={`${analyticsData.events.total} eventos evaluados`}
          icon={BarChart3}
          trend={{ value: 8.5, isPositive: true }}
        />
      </div>

      {/* Gráficos Principales */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crecimiento de Miembros */}
        <BarChart 
          data={memberGrowthData} 
          title="Crecimiento de Miembros (Últimos 6 meses)" 
        />
        
        {/* Ingresos Mensuales */}
        <BarChart 
          data={revenueData.map(d => ({ ...d, value: d.value / 1000000 }))} 
          title="Ingresos Mensuales (Millones COP)" 
        />
      </div>

      {/* Análisis Detallado */}
      {showDetailedMetrics && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-900">Análisis Detallado</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Tipos de Eventos */}
            <PieChartComponent 
              data={eventTypeData} 
              title="Distribución por Tipo de Evento"
            />
            
            {/* Segmentación de Miembros */}
            <PieChartComponent 
              data={memberSegmentData} 
              title="Segmentación de Miembros"
            />
            
            {/* Tendencias de Engagement */}
            <LineChartComponent 
              data={engagementTrendData} 
              title="Tendencias de Engagement"
            />
          </div>

          {/* Métricas Avanzadas */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-neutral-600" />
                  Métricas de Retención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Tasa de Retención</span>
                    <span className="font-semibold text-neutral-900">{analyticsData.members.retention}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Tasa de Churn</span>
                    <span className="font-semibold text-neutral-900">{analyticsData.members.churn}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Lifetime Value</span>
                    <span className="font-semibold text-neutral-900">{formatCurrency(analyticsData.revenue.average)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-neutral-600" />
                  Métricas de Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Total de Eventos</span>
                    <span className="font-semibold text-neutral-900">{analyticsData.events.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Tasa de Asistencia</span>
                    <span className="font-semibold text-neutral-900">{analyticsData.events.attendance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Satisfacción Promedio</span>
                    <span className="font-semibold text-neutral-900">{analyticsData.events.satisfaction}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Botón para mostrar/ocultar métricas detalladas */}
      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => setShowDetailedMetrics(!showDetailedMetrics)}
        >
          {showDetailedMetrics ? 'Ocultar' : 'Mostrar'} Métricas Detalladas
        </Button>
      </div>
    </div>
  );
} 