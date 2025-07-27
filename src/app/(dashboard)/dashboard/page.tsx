'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Vote, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Bell,
  Target
} from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';
import KPICard from '@/components/ui/KPICard';
import InitiativeCard from '@/components/initiatives/InitiativeCard';

export default function Dashboard() {
  const { config } = useConfig();

  // Datos simulados para KPIs
  const kpiData = {
    members: {
      total: 1247,
      growth: 12.5,
      active: 1189,
      newThisMonth: 89
    },
    revenue: {
      total: 45000000,
      growth: 8.7,
      monthly: 3750000
    },
    events: {
      total: 45,
      attendance: 78.2,
      upcoming: 8
    },
    engagement: {
      participation: 78.4,
      growth: 15.2
    },
    voting: {
      total: 12,
      participation: 82.3
    },
    communications: {
      sent: 156,
      openRate: 87.3
    }
  };

  // Datos simulados de iniciativas destacadas
  const keyInitiatives = [
    {
      id: '1',
      title: 'Expansión de Membresía Digital',
      description: 'Implementar sistema de membresía digital para aumentar la base de miembros en un 25%',
      status: 'in-progress' as const,
      priority: 'high' as const,
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      budget: 50000000,
      actualSpent: 32500000,
      teamMembers: ['Ana García', 'Carlos López', 'María Rodríguez'],
      leader: 'Ana García',
    },
    {
      id: '3',
      title: 'Programa de Liderazgo Comunitario',
      description: 'Desarrollar programa de formación para líderes emergentes de la comunidad',
      status: 'planning' as const,
      priority: 'high' as const,
      progress: 15,
      startDate: '2024-04-01',
      endDate: '2024-12-31',
      budget: 35000000,
      actualSpent: 5000000,
      teamMembers: ['Carmen Vargas', 'Diego Morales', 'Patricia Ruiz'],
      leader: 'Carmen Vargas',
    },
    {
      id: '4',
      title: 'Actualización de Infraestructura Tecnológica',
      description: 'Modernizar sistemas tecnológicos para mejorar eficiencia y seguridad',
      status: 'on-hold' as const,
      priority: 'critical' as const,
      progress: 30,
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      budget: 75000000,
      actualSpent: 22500000,
      teamMembers: ['Jorge Hernández', 'Sofia Torres'],
      leader: 'Jorge Hernández',
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard - {config.organization.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Resumen ejecutivo y métricas clave de la organización
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/report">
              <BarChart3 className="h-4 w-4 mr-2" />
              Reporte Completo
            </Link>
          </Button>
          <Button asChild>
            <Link href="/analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Miembros Activos"
          value={kpiData.members.total}
          description={`${kpiData.members.active} activos este mes`}
          icon={Users}
          trend={{ value: kpiData.members.growth, isPositive: true }}
          color="blue"
          format="number"
        />
        
        <KPICard
          title="Ingresos Totales"
          value={kpiData.revenue.total}
          description={`${kpiData.revenue.monthly.toLocaleString()} este mes`}
          icon={DollarSign}
          trend={{ value: kpiData.revenue.growth, isPositive: true }}
          color="green"
          format="currency"
        />
        
        <KPICard
          title="Participación"
          value={kpiData.engagement.participation}
          description="Tasa de participación general"
          icon={Activity}
          trend={{ value: kpiData.engagement.growth, isPositive: true }}
          color="purple"
          format="percentage"
        />
        
        <KPICard
          title="Eventos Organizados"
          value={kpiData.events.total}
          description={`${kpiData.events.upcoming} próximos eventos`}
          icon={Calendar}
          trend={{ value: 23.5, isPositive: true }}
          color="orange"
          format="number"
        />
      </div>

      {/* Iniciativas Destacadas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Iniciativas Destacadas
          </h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/initiatives">
              Ver Todas las Iniciativas
            </Link>
          </Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {keyInitiatives.map((initiative) => (
            <InitiativeCard
              key={initiative.id}
              {...initiative}
              compact={true}
            />
          ))}
        </div>
      </div>

      {/* Métricas Detalladas */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gestión de Miembros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Gestión de Miembros
            </CardTitle>
            <CardDescription>
              Estadísticas de crecimiento y retención
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
                <span className="text-sm text-gray-600">Nuevos este mes</span>
                <span className="font-semibold text-blue-600">+{kpiData.members.newThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Crecimiento anual</span>
                <span className="font-semibold text-purple-600 flex items-center">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +{kpiData.members.growth}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actividad Reciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Eventos y actividades de la semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Eventos realizados</span>
                <span className="font-semibold">{kpiData.events.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tasa de asistencia</span>
                <span className="font-semibold text-green-600">{kpiData.events.attendance}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Votaciones realizadas</span>
                <span className="font-semibold text-blue-600">{kpiData.voting.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Participación votaciones</span>
                <span className="font-semibold text-purple-600">{kpiData.voting.participation}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Asamblea General</span>
                <span className="text-xs text-gray-500">15 Dic</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Workshop Tecnología</span>
                <span className="text-xs text-gray-500">20 Dic</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Networking Anual</span>
                <span className="text-xs text-gray-500">28 Dic</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Ver Todos los Eventos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Vote className="h-5 w-5 mr-2" />
              Votaciones Activas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nuevo Presidente</span>
                <span className="text-xs text-green-600">Activa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cambio de Estatutos</span>
                <span className="text-xs text-green-600">Activa</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Presupuesto 2025</span>
                <span className="text-xs text-gray-500">Cerrada</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Participar en Votaciones
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Nuevo miembro registrado</span>
                <span className="text-xs text-gray-500">2h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pago recibido</span>
                <span className="text-xs text-gray-500">4h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Evento confirmado</span>
                <span className="text-xs text-gray-500">1d</span>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Ver Todas las Notificaciones
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enlaces Rápidos */}
      <Card>
        <CardHeader>
          <CardTitle>Acceso Rápido</CardTitle>
          <CardDescription>
            Navega rápidamente a las funciones más utilizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col">
              <Link href="/members">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Miembros</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col">
              <Link href="/events">
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Eventos</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col">
              <Link href="/payments">
                <DollarSign className="h-6 w-6 mb-2" />
                <span className="text-sm">Pagos</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col">
              <Link href="/voting">
                <Vote className="h-6 w-6 mb-2" />
                <span className="text-sm">Votaciones</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex flex-col">
              <Link href="/initiatives">
                <Target className="h-6 w-6 mb-2" />
                <span className="text-sm">Iniciativas</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 