'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricsCard } from "@/components/analytics/MetricsCard";
import { LineChart } from "@/components/analytics/LineChart";
import { BarChart } from "@/components/analytics/BarChart";
import { PieChart } from "@/components/analytics/PieChart";
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Vote, 
  TrendingUp, 
  TrendingDown,
  Download,
  Filter
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  // Datos de ejemplo para los gráficos
  const memberGrowthData = [
    { name: 'Ene', value: 120 },
    { name: 'Feb', value: 135 },
    { name: 'Mar', value: 142 },
    { name: 'Abr', value: 158 },
    { name: 'May', value: 165 },
    { name: 'Jun', value: 178 }
  ];

  const revenueData = [
    { name: 'Ene', value: 2500000 },
    { name: 'Feb', value: 2800000 },
    { name: 'Mar', value: 3200000 },
    { name: 'Abr', value: 2900000 },
    { name: 'May', value: 3500000 },
    { name: 'Jun', value: 3800000 }
  ];

  const eventAttendanceData = [
    { name: 'Reunión Mensual', value: 45 },
    { name: 'Taller Marketing', value: 28 },
    { name: 'Conferencia', value: 150 },
    { name: 'Networking', value: 35 },
    { name: 'Capacitación', value: 22 }
  ];

  const votingParticipationData = [
    { name: 'Cambio Fecha', value: 70, color: '#000000' },
    { name: 'Temas Taller', value: 56, color: '#6B7280' },
    { name: 'Elección Presidente', value: 84, color: '#9CA3AF' },
    { name: 'Presupuesto', value: 76, color: '#D1D5DB' }
  ];

  const memberStatusData = [
    { name: 'Activos', value: 142, color: '#10B981' },
    { name: 'Pendientes', value: 8, color: '#F59E0B' },
    { name: 'Inactivos', value: 12, color: '#EF4444' }
  ];

  const paymentStatusData = [
    { name: 'Completados', value: 85, color: '#10B981' },
    { name: 'Pendientes', value: 12, color: '#F59E0B' },
    { name: 'Vencidos', value: 3, color: '#EF4444' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Analytics & Reportes</h1>
              <span className="text-sm text-gray-500">ASECH - Asociación de Emprendedores</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <option value="7d">Últimos 7 días</option>
                <option value="30d">Últimos 30 días</option>
                <option value="90d">Últimos 90 días</option>
                <option value="1y">Último año</option>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Miembros"
            value="162"
            description="Miembros activos"
            change={12}
            changeType="increase"
            trend="up"
            icon={<Users className="h-4 w-4" />}
          />
          <MetricsCard
            title="Ingresos Mensuales"
            value="$3.8M"
            description="CLP este mes"
            change={8.5}
            changeType="increase"
            trend="up"
            icon={<DollarSign className="h-4 w-4" />}
          />
          <MetricsCard
            title="Participación Eventos"
            value="78%"
            description="Promedio asistencia"
            change={-2.3}
            changeType="decrease"
            trend="down"
            icon={<Calendar className="h-4 w-4" />}
          />
          <MetricsCard
            title="Participación Votaciones"
            value="71%"
            description="Promedio participación"
            change={5.2}
            changeType="increase"
            trend="up"
            icon={<Vote className="h-4 w-4" />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <LineChart
            title="Crecimiento de Miembros"
            description="Evolución del número de miembros en los últimos 6 meses"
            data={memberGrowthData}
            dataKey="value"
            color="#000000"
          />
          <LineChart
            title="Ingresos Mensuales"
            description="Evolución de los ingresos por cuotas y eventos"
            data={revenueData}
            dataKey="value"
            color="#10B981"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <BarChart
            title="Asistencia a Eventos"
            description="Número de participantes por evento"
            data={eventAttendanceData}
            dataKey="value"
            color="#3B82F6"
          />
          <PieChart
            title="Estado de Miembros"
            description="Distribución por estado de membresía"
            data={memberStatusData}
          />
          <PieChart
            title="Estado de Pagos"
            description="Distribución por estado de pagos"
            data={paymentStatusData}
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Participación en Votaciones</CardTitle>
              <CardDescription>
                Tasa de participación por votación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingParticipationData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-black h-2 rounded-full" 
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Engagement</CardTitle>
              <CardDescription>
                Indicadores clave de participación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tiempo promedio en la plataforma</span>
                  <span className="text-sm text-gray-600">12.5 min/sesión</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Eventos por miembro</span>
                  <span className="text-sm text-gray-600">2.3 eventos/mes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Interacciones por día</span>
                  <span className="text-sm text-gray-600">156 interacciones</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tasa de retención</span>
                  <span className="text-sm text-gray-600">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">NPS Score</span>
                  <span className="text-sm text-gray-600">+42</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Insights y Recomendaciones</CardTitle>
            <CardDescription>
              Análisis automático de tendencias y sugerencias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-600">✅ Tendencias Positivas</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Crecimiento constante de miembros (+12% este mes)</li>
                  <li>• Alta participación en votaciones (71% promedio)</li>
                  <li>• Ingresos estables y crecientes</li>
                  <li>• Excelente tasa de retención (94.2%)</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-600">⚠️ Áreas de Mejora</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Participación en eventos disminuyó 2.3%</li>
                  <li>• 3 pagos vencidos requieren seguimiento</li>
                  <li>• Considerar más eventos en horarios flexibles</li>
                  <li>• Implementar recordatorios automáticos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 