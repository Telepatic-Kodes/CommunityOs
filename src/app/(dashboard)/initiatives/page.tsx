'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Filter, 
  Search, 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Edit,
  Eye,
  MoreHorizontal,
  Flag,
  Award,
  Lightbulb,
  Building2,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

// Tipos de iniciativas
type InitiativeStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
type InitiativePriority = 'low' | 'medium' | 'high' | 'critical';
type InitiativeCategory = 'strategic' | 'operational' | 'financial' | 'community' | 'technology';

interface Initiative {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  priority: InitiativePriority;
  category: InitiativeCategory;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpent: number;
  teamMembers: string[];
  leader: string;
  milestones: Milestone[];
  createdAt: string;
  updatedAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  progress: number;
}

const statusConfig = {
  planning: { label: 'Planificación', color: 'bg-blue-100 text-blue-800', icon: Clock },
  'in-progress': { label: 'En Progreso', color: 'bg-yellow-100 text-yellow-800', icon: TrendingUp },
  completed: { label: 'Completado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'on-hold': { label: 'En Pausa', color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-800', icon: XCircle },
};

const priorityConfig = {
  low: { label: 'Baja', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Media', color: 'bg-blue-100 text-blue-800' },
  high: { label: 'Alta', color: 'bg-orange-100 text-orange-800' },
  critical: { label: 'Crítica', color: 'bg-red-100 text-red-800' },
};

const categoryConfig = {
  strategic: { label: 'Estratégico', icon: Target, color: 'text-purple-600' },
  operational: { label: 'Operacional', icon: Building2, color: 'text-blue-600' },
  financial: { label: 'Financiero', icon: DollarSign, color: 'text-green-600' },
  community: { label: 'Comunidad', icon: Users, color: 'text-orange-600' },
  technology: { label: 'Tecnología', icon: BarChart3, color: 'text-indigo-600' },
};

// Datos simulados de iniciativas
const mockInitiatives: Initiative[] = [
  {
    id: '1',
    title: 'Expansión de Membresía Digital',
    description: 'Implementar sistema de membresía digital para aumentar la base de miembros en un 25%',
    status: 'in-progress',
    priority: 'high',
    category: 'strategic',
    progress: 65,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 50000000,
    actualSpent: 32500000,
    teamMembers: ['Ana García', 'Carlos López', 'María Rodríguez'],
    leader: 'Ana García',
    milestones: [
      { id: '1-1', title: 'Análisis de Requisitos', description: 'Definir necesidades del sistema', dueDate: '2024-02-15', completed: true, progress: 100 },
      { id: '1-2', title: 'Desarrollo del Sistema', description: 'Crear plataforma digital', dueDate: '2024-04-30', completed: false, progress: 75 },
      { id: '1-3', title: 'Pruebas y Validación', description: 'Testing del sistema', dueDate: '2024-05-15', completed: false, progress: 0 },
      { id: '1-4', title: 'Lanzamiento', description: 'Implementación final', dueDate: '2024-06-30', completed: false, progress: 0 },
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Optimización de Procesos Financieros',
    description: 'Automatizar procesos de facturación y cobros para reducir tiempo de procesamiento en un 40%',
    status: 'completed',
    priority: 'medium',
    category: 'financial',
    progress: 100,
    startDate: '2023-10-01',
    endDate: '2024-02-28',
    budget: 25000000,
    actualSpent: 22000000,
    teamMembers: ['Roberto Silva', 'Laura Martínez'],
    leader: 'Roberto Silva',
    milestones: [
      { id: '2-1', title: 'Análisis de Procesos', description: 'Evaluar procesos actuales', dueDate: '2023-11-15', completed: true, progress: 100 },
      { id: '2-2', title: 'Implementación', description: 'Desarrollar automatizaciones', dueDate: '2024-01-30', completed: true, progress: 100 },
      { id: '2-3', title: 'Capacitación', description: 'Entrenar al equipo', dueDate: '2024-02-15', completed: true, progress: 100 },
    ],
    createdAt: '2023-09-15',
    updatedAt: '2024-02-28',
  },
  {
    id: '3',
    title: 'Programa de Liderazgo Comunitario',
    description: 'Desarrollar programa de formación para líderes emergentes de la comunidad',
    status: 'planning',
    priority: 'high',
    category: 'community',
    progress: 15,
    startDate: '2024-04-01',
    endDate: '2024-12-31',
    budget: 35000000,
    actualSpent: 5000000,
    teamMembers: ['Carmen Vargas', 'Diego Morales', 'Patricia Ruiz'],
    leader: 'Carmen Vargas',
    milestones: [
      { id: '3-1', title: 'Diseño del Programa', description: 'Crear estructura del programa', dueDate: '2024-04-30', completed: false, progress: 60 },
      { id: '3-2', title: 'Selección de Participantes', description: 'Identificar candidatos', dueDate: '2024-05-15', completed: false, progress: 0 },
      { id: '3-3', title: 'Implementación', description: 'Ejecutar programa', dueDate: '2024-08-31', completed: false, progress: 0 },
      { id: '3-4', title: 'Evaluación', description: 'Medir resultados', dueDate: '2024-12-31', completed: false, progress: 0 },
    ],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-15',
  },
  {
    id: '4',
    title: 'Actualización de Infraestructura Tecnológica',
    description: 'Modernizar sistemas tecnológicos para mejorar eficiencia y seguridad',
    status: 'on-hold',
    priority: 'critical',
    category: 'technology',
    progress: 30,
    startDate: '2024-02-01',
    endDate: '2024-08-31',
    budget: 75000000,
    actualSpent: 22500000,
    teamMembers: ['Jorge Hernández', 'Sofia Torres'],
    leader: 'Jorge Hernández',
    milestones: [
      { id: '4-1', title: 'Evaluación de Necesidades', description: 'Analizar requerimientos', dueDate: '2024-03-15', completed: true, progress: 100 },
      { id: '4-2', title: 'Adquisición de Equipos', description: 'Comprar nueva infraestructura', dueDate: '2024-04-30', completed: false, progress: 50 },
      { id: '4-3', title: 'Implementación', description: 'Instalar y configurar', dueDate: '2024-07-31', completed: false, progress: 0 },
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
  },
  {
    id: '5',
    title: 'Estrategia de Comunicación Digital',
    description: 'Desarrollar estrategia integral de comunicación digital para aumentar engagement',
    status: 'in-progress',
    priority: 'medium',
    category: 'operational',
    progress: 45,
    startDate: '2024-01-01',
    endDate: '2024-05-31',
    budget: 15000000,
    actualSpent: 6750000,
    teamMembers: ['Valentina Castro', 'Andrés Jiménez'],
    leader: 'Valentina Castro',
    milestones: [
      { id: '5-1', title: 'Análisis de Audiencia', description: 'Estudiar público objetivo', dueDate: '2024-01-31', completed: true, progress: 100 },
      { id: '5-2', title: 'Desarrollo de Contenido', description: 'Crear materiales', dueDate: '2024-03-31', completed: false, progress: 70 },
      { id: '5-3', title: 'Implementación', description: 'Lanzar campañas', dueDate: '2024-05-31', completed: false, progress: 0 },
    ],
    createdAt: '2023-12-15',
    updatedAt: '2024-03-12',
  },
];

export default function InitiativesPage() {
  const { config } = useConfig();
  const [initiatives, setInitiatives] = useState<Initiative[]>(mockInitiatives);
  const [selectedStatus, setSelectedStatus] = useState<InitiativeStatus | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<InitiativePriority | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<InitiativeCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar iniciativas
  const filteredInitiatives = initiatives.filter(initiative => {
    const matchesStatus = selectedStatus === 'all' || initiative.status === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || initiative.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || initiative.category === selectedCategory;
    const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  // Calcular estadísticas
  const stats = {
    total: initiatives.length,
    completed: initiatives.filter(i => i.status === 'completed').length,
    inProgress: initiatives.filter(i => i.status === 'in-progress').length,
    planning: initiatives.filter(i => i.status === 'planning').length,
    onHold: initiatives.filter(i => i.status === 'on-hold').length,
    totalBudget: initiatives.reduce((sum, i) => sum + i.budget, 0),
    totalSpent: initiatives.reduce((sum, i) => sum + i.actualSpent, 0),
    averageProgress: Math.round(initiatives.reduce((sum, i) => sum + i.progress, 0) / initiatives.length),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  const getStatusIcon = (status: InitiativeStatus) => {
    const Icon = statusConfig[status].icon;
    return <Icon className="h-4 w-4" />;
  };

  const getCategoryIcon = (category: InitiativeCategory) => {
    const Icon = categoryConfig[category].icon;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Seguimiento de Iniciativas
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona y da seguimiento a proyectos, objetivos y metas de la organización
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Iniciativa
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Iniciativas</CardTitle>
            <Target className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500">
              {stats.completed} completadas, {stats.inProgress} en progreso
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Promedio</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs text-gray-500">
              Progreso general de todas las iniciativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalBudget)}</div>
            <p className="text-xs text-gray-500">
              {formatCurrency(stats.totalSpent)} ejecutado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Pausa</CardTitle>
            <AlertCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.onHold}</div>
            <p className="text-xs text-gray-500">
              Iniciativas que requieren atención
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar iniciativas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por Estado */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as InitiativeStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los Estados</option>
              <option value="planning">Planificación</option>
              <option value="in-progress">En Progreso</option>
              <option value="completed">Completado</option>
              <option value="on-hold">En Pausa</option>
              <option value="cancelled">Cancelado</option>
            </select>

            {/* Filtro por Prioridad */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value as InitiativePriority | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las Prioridades</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
              <option value="critical">Crítica</option>
            </select>

            {/* Filtro por Categoría */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as InitiativeCategory | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las Categorías</option>
              <option value="strategic">Estratégico</option>
              <option value="operational">Operacional</option>
              <option value="financial">Financiero</option>
              <option value="community">Comunidad</option>
              <option value="technology">Tecnología</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Iniciativas */}
      <div className="space-y-4">
        {filteredInitiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{initiative.title}</h3>
                    <Badge className={statusConfig[initiative.status].color}>
                      {getStatusIcon(initiative.status)}
                      <span className="ml-1">{statusConfig[initiative.status].label}</span>
                    </Badge>
                    <Badge className={priorityConfig[initiative.priority].color}>
                      {priorityConfig[initiative.priority].label}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{initiative.description}</p>
                  
                  {/* Información adicional */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{formatDate(initiative.startDate)} - {formatDate(initiative.endDate)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{initiative.teamMembers.length} miembros</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <span>{formatCurrency(initiative.budget)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(initiative.category)}
                      <span className={categoryConfig[initiative.category].color}>
                        {categoryConfig[initiative.category].label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {/* Barra de progreso */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progreso</span>
                  <span className="text-sm text-gray-600">{initiative.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Información del equipo */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Líder:</span>
                  <span className="text-sm font-medium">{initiative.leader}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Ejecutado:</span>
                  <span className="text-sm font-medium">{formatCurrency(initiative.actualSpent)}</span>
                </div>
              </div>

              {/* Milestones */}
              {initiative.milestones.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Hitos Principales</h4>
                  <div className="space-y-2">
                    {initiative.milestones.slice(0, 3).map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {milestone.completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
                            {milestone.title}
                          </span>
                        </div>
                        <span className="text-gray-500">{formatDate(milestone.dueDate)}</span>
                      </div>
                    ))}
                    {initiative.milestones.length > 3 && (
                      <div className="text-sm text-gray-500">
                        +{initiative.milestones.length - 3} hitos más
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredInitiatives.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron iniciativas</h3>
            <p className="text-gray-600">
              No hay iniciativas que coincidan con los filtros aplicados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 