import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  Eye
} from 'lucide-react';
import Link from 'next/link';

type InitiativeStatus = 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
type InitiativePriority = 'low' | 'medium' | 'high' | 'critical';

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

interface InitiativeCardProps {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  priority: InitiativePriority;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  actualSpent: number;
  teamMembers: string[];
  leader: string;
  compact?: boolean;
}

export default function InitiativeCard({
  id,
  title,
  description,
  status,
  priority,
  progress,
  startDate,
  endDate,
  budget,
  actualSpent,
  teamMembers,
  leader,
  compact = false
}: InitiativeCardProps) {
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

  if (compact) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">{title}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={statusConfig[status].color}>
                  {getStatusIcon(status)}
                  <span className="ml-1 text-xs">{statusConfig[status].label}</span>
                </Badge>
                <Badge className={priorityConfig[priority].color}>
                  <span className="text-xs">{priorityConfig[priority].label}</span>
                </Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/initiatives`}>
                <Eye className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Progreso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-600">
              <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
              <span>{formatCurrency(budget)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Badge className={statusConfig[status].color}>
                {getStatusIcon(status)}
                <span className="ml-1">{statusConfig[status].label}</span>
              </Badge>
              <Badge className={priorityConfig[priority].color}>
                {priorityConfig[priority].label}
              </Badge>
            </div>
            <p className="text-gray-600 mb-3 text-sm">{description}</p>
            
            {/* Información adicional */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-neutral-500" />
                <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-neutral-500" />
                <span>{teamMembers.length} miembros</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-neutral-500" />
                <span>{formatCurrency(budget)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-neutral-500" />
                <span>Líder: {leader}</span>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" asChild>
            <Link href={`/initiatives`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Barra de progreso */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progreso</span>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Información del equipo y presupuesto */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Ejecutado:</span>
            <span className="font-medium">{formatCurrency(actualSpent)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Restante:</span>
            <span className="font-medium">{formatCurrency(budget - actualSpent)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 