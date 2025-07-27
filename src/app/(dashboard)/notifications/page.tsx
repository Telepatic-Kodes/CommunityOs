'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Settings
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  status: 'read' | 'unread';
  date: string;
  category: string;
}

// Datos mock para la demo
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Nuevo miembro registrado',
    message: 'María González se ha unido a la comunidad',
    type: 'success',
    status: 'unread',
    date: '2024-01-20T10:30:00Z',
    category: 'members'
  },
  {
    id: '2',
    title: 'Evento próximo',
    message: 'El taller de Marketing Digital comienza en 2 horas',
    type: 'info',
    status: 'unread',
    date: '2024-01-20T08:15:00Z',
    category: 'events'
  },
  {
    id: '3',
    title: 'Pago procesado',
    message: 'Se ha procesado exitosamente el pago de Juan Pérez',
    type: 'success',
    status: 'read',
    date: '2024-01-19T16:45:00Z',
    category: 'payments'
  },
  {
    id: '4',
    title: 'Votación cerrada',
    message: 'La votación para el nuevo presidente ha finalizado',
    type: 'info',
    status: 'read',
    date: '2024-01-19T14:20:00Z',
    category: 'voting'
  },
  {
    id: '5',
    title: 'Error en el sistema',
    message: 'Se ha detectado un problema con el sistema de pagos',
    type: 'error',
    status: 'unread',
    date: '2024-01-19T12:30:00Z',
    category: 'system'
  },
  {
    id: '6',
    title: 'Recordatorio de membresía',
    message: 'Tu membresía vence en 7 días. Renueva ahora',
    type: 'warning',
    status: 'read',
    date: '2024-01-18T09:15:00Z',
    category: 'payments'
  }
];

const MOCK_STATS = {
  total: 156,
  unread: 23,
  read: 133,
  today: 8,
  thisWeek: 45
};

export default function NotificationsPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [stats, setStats] = useState(MOCK_STATS);
  const [filter, setFilter] = useState<string>('all');

  // Simular carga de datos
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true);
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotifications(MOCK_NOTIFICATIONS);
        setStats(MOCK_STATS);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Bell className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-green-100 text-green-800">Éxito</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Advertencia</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return notification.status === 'unread';
    if (filter === 'read') return notification.status === 'read';
    return notification.category === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notificaciones</h1>
          <p className="text-gray-600">Gestiona las notificaciones de tu comunidad</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuración
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Notificación
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">No leídas</p>
                <p className="text-2xl font-bold">{stats.unread}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Leídas</p>
                <p className="text-2xl font-bold">{stats.read}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Hoy</p>
                <p className="text-2xl font-bold">{stats.today}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Esta Semana</p>
                <p className="text-2xl font-bold">{stats.thisWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              Todas
            </Button>
            <Button
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('unread')}
            >
              No leídas
            </Button>
            <Button
              variant={filter === 'read' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('read')}
            >
              Leídas
            </Button>
            <Button
              variant={filter === 'members' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('members')}
            >
              Miembros
            </Button>
            <Button
              variant={filter === 'events' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('events')}
            >
              Eventos
            </Button>
            <Button
              variant={filter === 'payments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('payments')}
            >
              Pagos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Notificaciones ({filteredNotifications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start space-x-4 p-4 border rounded-lg ${
                  notification.status === 'unread' ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                    <div className="flex items-center space-x-2">
                      {getTypeBadge(notification.type)}
                      {notification.status === 'unread' && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(notification.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 text-yellow-600">⚠️</div>
            <p className="text-sm text-yellow-800">
              <strong>Demo Mode:</strong> Esta es una versión de demostración con datos simulados. 
              En producción, estos datos vendrían de la base de datos real.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 