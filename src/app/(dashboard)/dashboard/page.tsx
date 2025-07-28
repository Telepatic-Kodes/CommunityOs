'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/ui/stats-card';
import { DataTable } from '@/components/ui/data-table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { FullScreenLoading } from '@/components/ui/loading';
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
  Target,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Star,
  Zap,
  Award,
  TrendingDown,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';

export default function Dashboard() {
  const { config, loading, error } = useConfig();
  const [mounted, setMounted] = useState(false);

  // Manejar hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Definir breadcrumbs para la navegación
  const breadcrumbs = [
    { label: 'Inicio', href: '/' },
    { label: 'Dashboard', href: '/dashboard' }
  ];

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
    },
    financial: {
      monthlyRevenue: 3750000
    }
  };

  // Datos simulados de iniciativas destacadas
  const keyInitiatives = [
    {
      id: '1',
      title: 'Expansión de Membresía Digital',
      description: 'Implementar sistema de membresía digital para aumentar la base de miembros en un 25%',
      status: 'in-progress',
      priority: 'high',
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
      status: 'planning',
      priority: 'high',
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
      status: 'on-hold',
      priority: 'critical',
      progress: 30,
      startDate: '2024-02-01',
      endDate: '2024-08-31',
      budget: 75000000,
      actualSpent: 22500000,
      teamMembers: ['Jorge Hernández', 'Sofia Torres'],
      leader: 'Jorge Hernández',
    }
  ];

  // Datos para la tabla de miembros recientes
  const recentMembers = [
    { id: 1, name: 'María González', email: 'maria@email.com', status: 'active', joinDate: '2024-12-01', membership: 'Premium' },
    { id: 2, name: 'Carlos Rodríguez', email: 'carlos@email.com', status: 'active', joinDate: '2024-11-28', membership: 'Standard' },
    { id: 3, name: 'Ana Martínez', email: 'ana@email.com', status: 'pending', joinDate: '2024-11-25', membership: 'Basic' },
    { id: 4, name: 'Luis Pérez', email: 'luis@email.com', status: 'active', joinDate: '2024-11-20', membership: 'Premium' },
    { id: 5, name: 'Sofia Torres', email: 'sofia@email.com', status: 'inactive', joinDate: '2024-11-15', membership: 'Standard' },
  ];

  const memberColumns = [
    { key: 'name', title: 'Nombre', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { 
      key: 'status', 
      title: 'Estado', 
      sortable: true,
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'default' : value === 'pending' ? 'secondary' : 'outline'}>
          {value === 'active' ? 'Activo' : value === 'pending' ? 'Pendiente' : 'Inactivo'}
        </Badge>
      )
    },
    { key: 'membership', title: 'Membresía', sortable: true },
    { key: 'joinDate', title: 'Fecha de Ingreso', sortable: true },
  ];

  // Datos de actividad reciente
  const recentActivity = [
    { title: 'Nuevo miembro registrado', time: 'Hace 5 minutos', icon: Users },
    { title: 'Evento creado: Reunión Comunitaria', time: 'Hace 1 hora', icon: Calendar },
    { title: 'Pago procesado exitosamente', time: 'Hace 2 horas', icon: DollarSign },
    { title: 'Votación iniciada: Nuevas reglas', time: 'Hace 3 horas', icon: Vote },
    { title: 'Comunicación enviada a todos los miembros', time: 'Hace 4 horas', icon: Bell },
  ];

  // Datos de próximos eventos
  const upcomingEvents = [
    { title: 'Reunión de Líderes', description: 'Planificación estratégica mensual', date: '15 Dic, 14:00', type: 'Reunión' },
    { title: 'Taller de Tecnología', description: 'Introducción a nuevas herramientas', date: '18 Dic, 10:00', type: 'Taller' },
    { title: 'Asamblea General', description: 'Votación de propuestas comunitarias', date: '22 Dic, 16:00', type: 'Asamblea' },
    { title: 'Evento Social', description: 'Celebración de fin de año', date: '28 Dic, 19:00', type: 'Social' },
  ];

  // Mostrar estado de carga
  if (!mounted || loading) {
    return <FullScreenLoading text="Cargando dashboard..." />;
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error al cargar el dashboard</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-in-top">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
            Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-neutral-700 font-medium">
            Bienvenido a tu panel de control comunitario
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="lg" className="border-gradient hover-scale-modern">
            <Bell className="mr-2 h-5 w-5" />
            Notificaciones
          </Button>
          <Button size="lg" className="btn-modern glow hover-scale-modern">
            <Plus className="mr-2 h-5 w-5" />
            Nueva Acción
          </Button>
        </div>
      </div>

      {/* KPIs Section */}
      <section className="space-y-6 animate-slide-in-bottom">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Métricas Principales
          </h2>
          <Button variant="ghost" size="sm" className="hover-scale-modern">
            Ver todas
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Miembros"
            value={kpiData.members.total.toLocaleString()}
            description={`${kpiData.members.active} activos`}
            icon={Users}
            trend={{ value: kpiData.members.growth, isPositive: true }}
          />
          <StatsCard
            title="Ingresos Mensuales"
            value={`$${kpiData.revenue.monthly.toLocaleString()}`}
            description="Este mes"
            icon={DollarSign}
            trend={{ value: kpiData.revenue.growth, isPositive: true }}
          />
          <StatsCard
            title="Eventos Activos"
            value={kpiData.events.total}
            description={`${kpiData.events.upcoming} próximos`}
            icon={Calendar}
            trend={{ value: kpiData.events.attendance, isPositive: true }}
          />
          <StatsCard
            title="Participación"
            value={`${kpiData.engagement.participation}%`}
            description="Tasa de participación"
            icon={Vote}
            trend={{ value: kpiData.engagement.growth, isPositive: true }}
          />
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Iniciativas Destacadas */}
                  <div className="lg:col-span-2 space-y-6 animate-slide-in-left">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900">
                Iniciativas Destacadas
              </h2>
              <Button variant="ghost" size="sm" className="hover-scale-modern">
                Ver todas
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-6">
              {keyInitiatives.map((initiative, index) => (
                <Card key={initiative.id} className={`hover:shadow-lg transition-all duration-300 card-modern animate-slide-in-bottom`} style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl sm:text-2xl">
                        {initiative.title}
                      </CardTitle>
                      <CardDescription className="text-base sm:text-lg">
                        {initiative.description}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={initiative.status === 'completed' ? 'success' : 
                              initiative.status === 'in-progress' ? 'default' : 'warning'}
                      size="sm"
                    >
                      {initiative.status === 'completed' ? 'Completado' :
                       initiative.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 font-medium">Progreso</span>
                      <span className="text-neutral-900 font-semibold">{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-700 font-medium">Presupuesto</span>
                      <p className="text-neutral-900 font-semibold">
                        ${initiative.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-neutral-700 font-medium">Gastado</span>
                      <p className="text-neutral-900 font-semibold">
                        ${initiative.actualSpent.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-neutral-600" />
                      <span className="text-sm text-neutral-700 font-medium">
                        Líder: {initiative.leader}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                    <activity.icon className="h-4 w-4 text-neutral-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 leading-tight">
                      {activity.title}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Próximos Eventos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-neutral-900">{event.title}</h4>
                      <p className="text-sm text-neutral-700">{event.description}</p>
                      <div className="flex items-center space-x-2 text-xs text-neutral-600">
                        <Calendar className="h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    <Badge variant="outline" size="sm">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Estadísticas Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Estadísticas Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-900">{kpiData.voting.total}</div>
                  <div className="text-sm text-neutral-700">Votaciones</div>
                </div>
                <div className="text-center p-4 bg-neutral-50 rounded-lg">
                  <div className="text-2xl font-bold text-neutral-900">{kpiData.communications.sent}</div>
                  <div className="text-sm text-neutral-700">Comunicaciones</div>
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">{kpiData.engagement.participation}%</div>
                <div className="text-sm text-blue-700">Participación General</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 