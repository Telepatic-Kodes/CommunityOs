'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Vote, 
  BarChart3, 
  Bell, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

export default function ManagementReport() {
  const { config } = useConfig();

  // Datos simulados para el reporte
  const kpiData = {
    members: {
      total: 1247,
      growth: 12.5,
      active: 1189,
      retention: 95.3,
      newThisMonth: 89
    },
    revenue: {
      total: 45000000,
      growth: 8.7,
      monthly: 3750000,
      projected: 52000000
    },
    events: {
      total: 45,
      attendance: 78.2,
      satisfaction: 4.6,
      upcoming: 8
    },
    engagement: {
      participation: 78.4,
      growth: 15.2,
      satisfaction: 4.7,
      retention: 96.1
    },
    voting: {
      total: 12,
      participation: 82.3,
      transparency: 100,
      efficiency: 94.5
    },
    communications: {
      sent: 156,
      openRate: 87.3,
      clickRate: 23.1,
      satisfaction: 4.5
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header del Reporte */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Reporte de Gestión - {config.organization.name}
              </h1>
              <p className="text-gray-600 mt-2">
                Consolidado de KPIs y métricas de rendimiento
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Período: Enero - Diciembre 2024</p>
              <p className="text-sm text-gray-500">Generado: {new Date().toLocaleDateString('es-CO')}</p>
            </div>
          </div>
          
          {/* Resumen Ejecutivo */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Resumen Ejecutivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(kpiData.revenue.total)}
                  </div>
                  <div className="text-sm text-gray-600">Ingresos Totales</div>
                  <div className="text-xs text-green-600 flex items-center justify-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{kpiData.revenue.growth}% vs 2023
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {kpiData.members.total.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Miembros Activos</div>
                  <div className="text-xs text-blue-600 flex items-center justify-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{kpiData.members.growth}% vs 2023
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {kpiData.engagement.participation}%
                  </div>
                  <div className="text-sm text-gray-600">Participación</div>
                  <div className="text-xs text-purple-600 flex items-center justify-center mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{kpiData.engagement.growth}% vs 2023
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs Principales */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Gestión de Miembros */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Gestión de Miembros
              </CardTitle>
              <CardDescription>
                Métricas de crecimiento y retención de miembros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total de Miembros</span>
                  <span className="font-semibold">{kpiData.members.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Miembros Activos</span>
                  <span className="font-semibold text-green-600">{kpiData.members.active.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Retención</span>
                  <span className="font-semibold text-blue-600">{formatPercentage(kpiData.members.retention)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nuevos este mes</span>
                  <span className="font-semibold text-purple-600">+{kpiData.members.newThisMonth}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">+{kpiData.members.growth}% crecimiento anual</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gestión Financiera */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Gestión Financiera
              </CardTitle>
              <CardDescription>
                Ingresos, proyecciones y salud financiera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ingresos Totales</span>
                  <span className="font-semibold">{formatCurrency(kpiData.revenue.total)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ingresos Mensuales</span>
                  <span className="font-semibold text-green-600">{formatCurrency(kpiData.revenue.monthly)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Proyección 2025</span>
                  <span className="font-semibold text-blue-600">{formatCurrency(kpiData.revenue.projected)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Crecimiento Anual</span>
                  <span className="font-semibold text-purple-600">+{kpiData.revenue.growth}%</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">Sostenibilidad financiera confirmada</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eventos y Participación */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Eventos y Participación
              </CardTitle>
              <CardDescription>
                Métricas de eventos y engagement de la comunidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total de Eventos</span>
                  <span className="font-semibold">{kpiData.events.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Asistencia</span>
                  <span className="font-semibold text-green-600">{formatPercentage(kpiData.events.attendance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfacción Promedio</span>
                  <span className="font-semibold text-blue-600">{kpiData.events.satisfaction}/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eventos Próximos</span>
                  <span className="font-semibold text-purple-600">{kpiData.events.upcoming}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">Alta participación y satisfacción</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Votaciones y Gobernanza */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Vote className="h-5 w-5 mr-2" />
                Votaciones y Gobernanza
              </CardTitle>
              <CardDescription>
                Transparencia y eficiencia en procesos democráticos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Votaciones Realizadas</span>
                  <span className="font-semibold">{kpiData.voting.total}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Participación Promedio</span>
                  <span className="font-semibold text-green-600">{formatPercentage(kpiData.voting.participation)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transparencia</span>
                  <span className="font-semibold text-blue-600">{formatPercentage(kpiData.voting.transparency)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Eficiencia del Proceso</span>
                  <span className="font-semibold text-purple-600">{formatPercentage(kpiData.voting.efficiency)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <Target className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">Procesos democráticos optimizados</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos y Análisis */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Análisis de Engagement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Análisis de Engagement
              </CardTitle>
              <CardDescription>
                Métricas de participación y satisfacción de miembros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Participación General</span>
                  <span className="font-semibold text-green-600">{formatPercentage(kpiData.engagement.participation)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Crecimiento de Engagement</span>
                  <span className="font-semibold text-blue-600">+{kpiData.engagement.growth}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfacción de Miembros</span>
                  <span className="font-semibold text-purple-600">{kpiData.engagement.satisfaction}/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Retención de Miembros</span>
                  <span className="font-semibold text-orange-600">{formatPercentage(kpiData.engagement.retention)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">Engagement en crecimiento constante</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comunicaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Efectividad de Comunicaciones
              </CardTitle>
              <CardDescription>
                Métricas de comunicación y alcance de mensajes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comunicaciones Enviadas</span>
                  <span className="font-semibold">{kpiData.communications.sent}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Apertura</span>
                  <span className="font-semibold text-green-600">{formatPercentage(kpiData.communications.openRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tasa de Clic</span>
                  <span className="font-semibold text-blue-600">{formatPercentage(kpiData.communications.clickRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Satisfacción Comunicaciones</span>
                  <span className="font-semibold text-purple-600">{kpiData.communications.satisfaction}/5.0</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center text-sm">
                    <Activity className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">Alto engagement en comunicaciones</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conclusiones y Recomendaciones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Conclusiones y Recomendaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-3">✅ Fortalezas Identificadas</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Crecimiento sostenido de miembros (+{kpiData.members.growth}%)</li>
                  <li>• Alta tasa de retención ({formatPercentage(kpiData.members.retention)})</li>
                  <li>• Participación excepcional en eventos ({formatPercentage(kpiData.events.attendance)})</li>
                  <li>• Procesos democráticos transparentes ({formatPercentage(kpiData.voting.transparency)})</li>
                  <li>• Sostenibilidad financiera confirmada</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-3">🎯 Oportunidades de Mejora</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Incrementar tasa de clic en comunicaciones</li>
                  <li>• Optimizar procesos de onboarding de nuevos miembros</li>
                  <li>• Expandir eventos virtuales para mayor alcance</li>
                  <li>• Implementar más herramientas de engagement</li>
                  <li>• Desarrollar programas de liderazgo</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Acciones del Directorio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Acciones Estratégicas para el Directorio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Inmediatas</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Aprobar presupuesto 2025</li>
                  <li>• Validar plan de expansión</li>
                  <li>• Confirmar inversión en tecnología</li>
                </ul>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Corto Plazo</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Implementar nuevas funcionalidades</li>
                  <li>• Lanzar programa de referidos</li>
                  <li>• Optimizar procesos internos</li>
                </ul>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Mediano Plazo</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Expansión a nuevas regiones</li>
                  <li>• Desarrollo de productos premium</li>
                  <li>• Alianzas estratégicas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button size="lg" className="px-8">
            <LineChart className="h-4 w-4 mr-2" />
            Exportar Reporte PDF
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <PieChart className="h-4 w-4 mr-2" />
            Análisis Detallado
          </Button>
          <Button variant="outline" size="lg" className="px-8">
            <BarChart className="h-4 w-4 mr-2" />
            Comparativo Anual
          </Button>
        </div>
      </div>
    </div>
  );
} 