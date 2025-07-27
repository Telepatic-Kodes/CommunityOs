'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Calendar, 
  Activity, 
  BarChart3,
  PieChart,
  LineChart,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Calendar as CalendarIcon,
  Eye,
  EyeOff,
  RefreshCw,
  Download as DownloadIcon,
  Share2,
  Settings
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';
import KPICard from '@/components/ui/KPICard';

// Componente de gráfico de barras simple
function BarChart({ data, title, color = 'blue' }: { data: any[], title: string, color?: string }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`bg-${color}-600 h-2 rounded-full transition-all duration-300`}
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: color === 'blue' ? '#2563eb' : 
                                  color === 'green' ? '#16a34a' : 
                                  color === 'purple' ? '#9333ea' : '#ea580c'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de gráfico de líneas simple
function LineChartComponent({ data, title }: { data: any[], title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.value}</span>
                {item.trend > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${item.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.trend > 0 ? '+' : ''}{item.trend}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de gráfico circular simple
function PieChartComponent({ data, title }: { data: any[], title: string }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{item.value}</div>
                <div className="text-xs text-gray-500">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function AnalyticsPage() {
  const { config } = useConfig();
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false);

  // Datos simulados para analytics
  const analyticsData = {
    members: {
      total: 1247,
      growth: 12.5,
      active: 1189,
      newThisMonth: 89,
      retention: 95.3,
      churn: 4.7,
      engagement: 78.4
    },
    revenue: {
      total: 45000000,
      growth: 8.7,
      monthly: 3750000,
      projected: 52000000,
      averageTicket: 36000,
      recurring: 85.2
    },
    events: {
      total: 45,
      attendance: 78.2,
      satisfaction: 4.6,
      upcoming: 8,
      virtual: 12,
      hybrid: 8,
      inPerson: 25
    },
    engagement: {
      participation: 78.4,
      growth: 15.2,
      satisfaction: 4.7,
      retention: 96.1,
      timeOnPlatform: 24.5,
      interactionsPerUser: 12.3
    }
  };

  // Datos para gráficos
  const memberGrowthData = [
    { label: 'Ene', value: 1100 },
    { label: 'Feb', value: 1150 },
    { label: 'Mar', value: 1200 },
    { label: 'Abr', value: 1180 },
    { label: 'May', value: 1220 },
    { label: 'Jun', value: 1247 }
  ];

  const revenueData = [
    { label: 'Ene', value: 3500000 },
    { label: 'Feb', value: 3600000 },
    { label: 'Mar', value: 3700000 },
    { label: 'Abr', value: 3650000 },
    { label: 'May', value: 3750000 },
    { label: 'Jun', value: 3800000 }
  ];

  const eventTypeData = [
    { label: 'Presencial', value: 25, color: '#2563eb' },
    { label: 'Virtual', value: 12, color: '#16a34a' },
    { label: 'Híbrido', value: 8, color: '#9333ea' }
  ];

  const memberSegmentData = [
    { label: 'Activos', value: 1189, color: '#16a34a' },
    { label: 'Inactivos', value: 35, color: '#ea580c' },
    { label: 'Nuevos', value: 23, color: '#2563eb' }
  ];

  const engagementTrendData = [
    { label: 'Participación', value: 78.4, trend: 15.2, color: '#16a34a' },
    { label: 'Satisfacción', value: 4.7, trend: 8.5, color: '#2563eb' },
    { label: 'Retención', value: 96.1, trend: 2.1, color: '#9333ea' },
    { label: 'Tiempo en Plataforma', value: 24.5, trend: -3.2, color: '#ea580c' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Avanzados
          </h1>
          <p className="text-gray-600 mt-2">
            Business Intelligence y métricas ejecutivas para la toma de decisiones
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Filtros de Período */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Período:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetailedMetrics(!showDetailedMetrics)}
            >
              {showDetailedMetrics ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showDetailedMetrics ? 'Métricas Básicas' : 'Métricas Detalladas'}
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Miembros Totales"
          value={analyticsData.members.total}
          description={`${analyticsData.members.active} activos`}
          icon={Users}
          trend={{ value: analyticsData.members.growth, isPositive: true }}
          color="blue"
          format="number"
        />
        
        <KPICard
          title="Ingresos Totales"
          value={analyticsData.revenue.total}
          description={`${formatCurrency(analyticsData.revenue.monthly)} este mes`}
          icon={DollarSign}
          trend={{ value: analyticsData.revenue.growth, isPositive: true }}
          color="green"
          format="currency"
        />
        
        <KPICard
          title="Tasa de Engagement"
          value={analyticsData.engagement.participation}
          description={`${analyticsData.engagement.interactionsPerUser} interacciones/usuario`}
          icon={Activity}
          trend={{ value: analyticsData.engagement.growth, isPositive: true }}
          color="purple"
          format="percentage"
        />
        
        <KPICard
          title="Satisfacción Promedio"
          value={analyticsData.events.satisfaction}
          description={`${analyticsData.events.total} eventos evaluados`}
          icon={BarChart3}
          trend={{ value: 8.5, isPositive: true }}
          color="orange"
          format="text"
        />
      </div>

      {/* Gráficos Principales */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crecimiento de Miembros */}
        <BarChart 
          data={memberGrowthData} 
          title="Crecimiento de Miembros (Últimos 6 meses)" 
          color="blue"
        />
        
        {/* Ingresos Mensuales */}
        <BarChart 
          data={revenueData.map(d => ({ ...d, value: d.value / 1000000 }))} 
          title="Ingresos Mensuales (Millones COP)" 
          color="green"
        />
      </div>

      {/* Análisis Detallado */}
      {showDetailedMetrics && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Análisis Detallado</h2>
          
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Métricas de Retención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasa de Retención</span>
                    <span className="font-semibold text-green-600">{analyticsData.members.retention}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tasa de Churn</span>
                    <span className="font-semibold text-red-600">{analyticsData.members.churn}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Lifetime Value</span>
                    <span className="font-semibold">{formatCurrency(analyticsData.revenue.averageTicket)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ingresos Recurrentes</span>
                    <span className="font-semibold text-blue-600">{analyticsData.revenue.recurring}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Métricas de Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Participación General</span>
                    <span className="font-semibold text-purple-600">{analyticsData.engagement.participation}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Satisfacción</span>
                    <span className="font-semibold text-green-600">{analyticsData.engagement.satisfaction}/5.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tiempo en Plataforma</span>
                    <span className="font-semibold text-blue-600">{analyticsData.engagement.timeOnPlatform} min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Interacciones/Usuario</span>
                    <span className="font-semibold text-orange-600">{analyticsData.engagement.interactionsPerUser}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Insights y Recomendaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Insights y Recomendaciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-600 mb-3">✅ Fortalezas Identificadas</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Crecimiento sostenido de miembros (+{analyticsData.members.growth}%)</li>
                <li>• Alta tasa de retención ({analyticsData.members.retention}%)</li>
                <li>• Engagement excepcional ({analyticsData.engagement.participation}%)</li>
                <li>• Satisfacción alta en eventos ({analyticsData.events.satisfaction}/5.0)</li>
                <li>• Ingresos recurrentes sólidos ({analyticsData.revenue.recurring}%)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600 mb-3">🎯 Oportunidades de Mejora</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Reducir tiempo de inactividad de usuarios</li>
                <li>• Incrementar eventos virtuales para mayor alcance</li>
                <li>• Optimizar onboarding de nuevos miembros</li>
                <li>• Implementar más herramientas de engagement</li>
                <li>• Desarrollar programas de fidelización</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones Estratégicas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Acciones Estratégicas Basadas en Datos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">Inmediatas</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lanzar campaña de re-engagement</li>
                <li>• Optimizar flujo de onboarding</li>
                <li>• Implementar gamificación</li>
              </ul>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">Corto Plazo</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Desarrollar programa de referidos</li>
                <li>• Crear contenido personalizado</li>
                <li>• Mejorar experiencia móvil</li>
              </ul>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">Mediano Plazo</div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Expandir a nuevos mercados</li>
                <li>• Desarrollar productos premium</li>
                <li>• Implementar IA predictiva</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 