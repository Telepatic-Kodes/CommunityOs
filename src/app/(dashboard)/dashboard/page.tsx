'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, DollarSign, Calendar, Activity, Vote, Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';
import { getMembers, getMemberStats } from '@/lib/members';
import { getEvents, getEventStats } from '@/lib/events';
import { getPaymentStats } from '@/lib/payments';
import { getVotingStats } from '@/lib/voting';

// ID temporal de organización para testing
const TEMP_ORG_ID = "temp-org-id";

export default function DashboardPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    members: { total: 0, active: 0, pending: 0, inactive: 0, admins: 0, members: 0, viewers: 0 },
    events: { total: 0, draft: 0, published: 0, cancelled: 0, upcoming: 0, past: 0 },
    payments: { totalRevenue: 0, pendingAmount: 0, overdueAmount: 0, totalPayments: 0, completedPayments: 0, pendingPayments: 0, failedPayments: 0 },
    voting: { total: 0, active: 0, closed: 0, draft: 0, cancelled: 0, upcoming: 0, averageParticipation: 0 }
  });

  // Cargar estadísticas
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const [memberStats, eventStats, paymentStats, votingStats] = await Promise.all([
          getMemberStats(TEMP_ORG_ID),
          getEventStats(TEMP_ORG_ID),
          getPaymentStats(TEMP_ORG_ID),
          getVotingStats(TEMP_ORG_ID)
        ]);

        setStats({
          members: memberStats,
          events: eventStats,
          payments: paymentStats,
          voting: votingStats
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Miembros</CardTitle>
            <Users className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.members.total.toLocaleString()}</div>
            <p className="text-xs text-green-600">+12% desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: config.modules.payments.currency,
                minimumFractionDigits: 0
              }).format(stats.payments.totalRevenue)}
            </div>
            <p className="text-xs text-green-600">{stats.payments.totalPayments > 0 ? Math.round((stats.payments.completedPayments / stats.payments.totalPayments) * 100) : 0}% tasa de éxito</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Activos</CardTitle>
            <Calendar className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events.published}</div>
            <p className="text-xs text-blue-600">{stats.events.upcoming} próximos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Votaciones Activas</CardTitle>
            <Vote className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.voting.active}</div>
            <p className="text-xs text-purple-600">{stats.voting.averageParticipation}% participación</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Gestionar Miembros
            </CardTitle>
            <CardDescription>
              Agregar, editar y gestionar perfiles de miembros
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Miembros activos</span>
              <Badge variant="outline">{stats.members.active}</Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/members">Ver Miembros</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Gestionar Eventos
            </CardTitle>
            <CardDescription>
              Crear y gestionar eventos de la comunidad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Eventos próximos</span>
              <Badge variant="outline">{stats.events.upcoming}</Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/events">Ver Eventos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Gestión de Pagos
            </CardTitle>
            <CardDescription>
              Monitorear pagos y membresías
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Pendientes</span>
              <Badge variant="outline" className={stats.payments.pendingAmount > 0 ? 'bg-yellow-100 text-yellow-800' : ''}>
                {new Intl.NumberFormat('es-CL', {
                  style: 'currency',
                  currency: config.modules.payments.currency,
                  minimumFractionDigits: 0
                }).format(stats.payments.pendingAmount)}
              </Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/payments">Ver Pagos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="h-5 w-5 mr-2" />
              Sistema de Votaciones
            </CardTitle>
            <CardDescription>
              Gestionar votaciones y elecciones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Votaciones activas</span>
              <Badge variant="outline" className={stats.voting.active > 0 ? 'bg-green-100 text-green-800' : ''}>
                {stats.voting.active}
              </Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/voting">Ver Votaciones</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Analytics
            </CardTitle>
            <CardDescription>
              Ver métricas y reportes detallados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Reportes disponibles</span>
              <Badge variant="outline">4</Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/analytics">Ver Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Gestionar comunicaciones y alertas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Pendientes</span>
              <Badge variant="outline" className="bg-red-100 text-red-800">3</Badge>
            </div>
            <Button className="w-full" size="sm" asChild>
              <Link href="/notifications">Ver Notificaciones</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo miembro registrado</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Evento creado: Taller de Marketing</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Votación iniciada: Elección de Presidente</p>
                  <p className="text-xs text-gray-500">Hace 6 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Pago procesado exitosamente</p>
                  <p className="text-xs text-gray-500">Hace 8 horas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alertas y Recordatorios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.payments.overdueAmount > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">Pagos vencidos</p>
                    <p className="text-xs text-red-600">
                      {new Intl.NumberFormat('es-CL', {
                        style: 'currency',
                        currency: config.modules.payments.currency,
                        minimumFractionDigits: 0
                      }).format(stats.payments.overdueAmount)} por cobrar
                    </p>
                  </div>
                </div>
              )}
              
              {stats.events.upcoming > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Eventos próximos</p>
                    <p className="text-xs text-blue-600">{stats.events.upcoming} eventos en los próximos 7 días</p>
                  </div>
                </div>
              )}

              {stats.voting.active > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Vote className="h-4 w-4 text-purple-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-800">Votaciones activas</p>
                    <p className="text-xs text-purple-600">{stats.voting.active} votaciones en curso</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Sistema funcionando correctamente</p>
                  <p className="text-xs text-green-600">Todos los módulos operativos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 