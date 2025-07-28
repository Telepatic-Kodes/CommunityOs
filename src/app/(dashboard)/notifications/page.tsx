'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Bell, 
  BellOff, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Star,
  Filter,
  Search,
  Settings,
  Trash2,
  Archive,
  Mail,
  MessageSquare,
  Calendar,
  CreditCard,
  Users,
  Target,
  Zap,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  TabletSmartphone,
  Globe,
  Shield,
  User,
  MoreHorizontal,
  Reply,
  Forward,
  Bookmark,
  Tag,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'payment' | 'event' | 'member' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'general' | 'payments' | 'events' | 'members' | 'system' | 'marketing';
  read: boolean;
  starred: boolean;
  archived: boolean;
  timestamp: string;
  sender?: string;
  actionUrl?: string;
  metadata?: any;
  deliveryStatus: 'sent' | 'delivered' | 'read' | 'failed';
  channels: ('email' | 'push' | 'sms' | 'in-app')[];
}

export default function NotificationsPage() {
  const { config } = useConfig();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'type'>('date');

  // Configuración de notificaciones
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
      frequency: 'immediate',
      categories: ['critical', 'payments', 'events']
    },
    push: {
      enabled: true,
      frequency: 'immediate',
      categories: ['critical', 'payments']
    },
    sms: {
      enabled: false,
      frequency: 'daily',
      categories: ['critical']
    },
    inApp: {
      enabled: true,
      frequency: 'immediate',
      categories: ['all']
    }
  });

  // Datos simulados de notificaciones
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Nuevo Pago Recibido',
        message: 'Se ha recibido un pago de $150,000 de María García por membresía anual',
        type: 'payment',
        priority: 'high',
        category: 'payments',
        read: false,
        starred: true,
        archived: false,
        timestamp: '2024-01-15T10:30:00Z',
        sender: 'Sistema de Pagos',
        actionUrl: '/payments',
        metadata: { amount: 150000, memberId: '123', paymentMethod: 'credit_card' },
        deliveryStatus: 'read',
        channels: ['email', 'push', 'in-app']
      },
      {
        id: '2',
        title: 'Evento Próximo: Asamblea General',
        message: 'Recordatorio: La Asamblea General se realizará mañana a las 18:00',
        type: 'event',
        priority: 'medium',
        category: 'events',
        read: false,
        starred: false,
        archived: false,
        timestamp: '2024-01-15T09:15:00Z',
        sender: 'Sistema de Eventos',
        actionUrl: '/events',
        metadata: { eventId: '456', date: '2024-01-16T18:00:00Z', location: 'Auditorio Principal' },
        deliveryStatus: 'delivered',
        channels: ['email', 'in-app']
      },
      {
        id: '3',
        title: 'Nuevo Miembro Registrado',
        message: 'Carlos López se ha unido a la comunidad. Bienvenido!',
        type: 'member',
        priority: 'low',
        category: 'members',
        read: true,
        starred: false,
        archived: false,
        timestamp: '2024-01-15T08:45:00Z',
        sender: 'Sistema de Miembros',
        actionUrl: '/members',
        metadata: { memberId: '789', joinDate: '2024-01-15', plan: 'basic' },
        deliveryStatus: 'read',
        channels: ['email', 'in-app']
      },
      {
        id: '4',
        title: 'Mantenimiento Programado',
        message: 'El sistema estará en mantenimiento el domingo de 02:00 a 04:00',
        type: 'system',
        priority: 'medium',
        category: 'system',
        read: false,
        starred: false,
        archived: false,
        timestamp: '2024-01-15T07:30:00Z',
        sender: 'Equipo Técnico',
        metadata: { maintenanceId: 'maint-001', duration: '2h', impact: 'low' },
        deliveryStatus: 'sent',
        channels: ['email', 'in-app']
      },
      {
        id: '5',
        title: 'Iniciativa Completada',
        message: 'La iniciativa "Expansión Digital" ha sido completada exitosamente',
        type: 'success',
        priority: 'high',
        category: 'general',
        read: false,
        starred: true,
        archived: false,
        timestamp: '2024-01-15T06:20:00Z',
        sender: 'Sistema de Iniciativas',
        actionUrl: '/initiatives',
        metadata: { initiativeId: 'init-001', completionDate: '2024-01-15', impact: 'high' },
        deliveryStatus: 'delivered',
        channels: ['email', 'push', 'in-app']
      },
      {
        id: '6',
        title: 'Error de Sincronización',
        message: 'No se pudo sincronizar con Google Calendar. Reintentando...',
        type: 'error',
        priority: 'critical',
        category: 'system',
        read: false,
        starred: false,
        archived: false,
        timestamp: '2024-01-15T05:10:00Z',
        sender: 'Sistema de Integraciones',
        metadata: { service: 'google-calendar', errorCode: 'sync-001', retryCount: 2 },
        deliveryStatus: 'sent',
        channels: ['email', 'push', 'sms']
      }
    ];

    setNotifications(mockNotifications);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'member': return <Users className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment': return 'text-green-600 bg-green-100';
      case 'event': return 'text-blue-600 bg-blue-100';
      case 'member': return 'text-purple-600 bg-purple-100';
      case 'system': return 'text-gray-600 bg-gray-100';
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `Hace ${diffInMinutes} min`;
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString('es-CO');
    }
  };

  const filteredNotifications = notifications
    .filter(notification => {
      if (filter !== 'all' && notification.category !== filter) return false;
      if (!showArchived && notification.archived) return false;
      if (searchTerm && !notification.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !notification.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
    });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleToggleStar = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, starred: !notification.starred } : notification
    ));
  };

  const handleArchive = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, archived: true } : notification
    ));
  };

  const handleBulkAction = (action: 'read' | 'archive' | 'delete') => {
    setNotifications(prev => prev.map(notification => {
      if (selectedNotifications.includes(notification.id)) {
        switch (action) {
          case 'read':
            return { ...notification, read: true };
          case 'archive':
            return { ...notification, archived: true };
          case 'delete':
            return notification;
          default:
            return notification;
        }
      }
      return notification;
    }));
    setSelectedNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
  const starredCount = notifications.filter(n => n.starred && !n.archived).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notificaciones Inteligentes
          </h1>
          <p className="text-neutral-700 mt-2">
            Sistema avanzado de notificaciones con filtros inteligentes y gestión personalizada
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowArchived(!showArchived)}>
            {showArchived ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
            {showArchived ? 'Ocultar Archivadas' : 'Mostrar Archivadas'}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Bell className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-neutral-700">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-sm text-neutral-700">No Leídas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Star className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{starredCount}</p>
                <p className="text-sm text-neutral-700">Destacadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-neutral-700">Tasa de Entrega</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros y Búsqueda
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar notificaciones..."
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">Todas las Categorías</option>
                <option value="payments">Pagos</option>
                <option value="events">Eventos</option>
                <option value="members">Miembros</option>
                <option value="system">Sistema</option>
                <option value="general">General</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="date">Por Fecha</option>
                <option value="priority">Por Prioridad</option>
                <option value="type">Por Tipo</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Acciones Masivas */}
      {selectedNotifications.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedNotifications.length} notificación(es) seleccionada(s)
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('read')}>
                  Marcar como Leídas
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction('archive')}>
                  Archivar
                </Button>
                <Button size="sm" variant="outline" onClick={() => setSelectedNotifications([])}>
                  Cancelar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Notificaciones */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all duration-200 hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''
            } ${notification.starred ? 'border-yellow-200 bg-yellow-50' : ''}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNotifications(prev => [...prev, notification.id]);
                      } else {
                        setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <div className={`p-2 rounded-lg ${getTypeColor(notification.type)}`}>
                    {getTypeIcon(notification.type)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                          {notification.title}
                        </h3>
                        <Badge className={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Badge>
                        {notification.starred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                      </div>
                      
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-neutral-600">
                        <span>{formatTimestamp(notification.timestamp)}</span>
                        {notification.sender && <span>• {notification.sender}</span>}
                        <div className="flex items-center space-x-1">
                          {notification.channels.includes('email') && <Mail className="h-3 w-3" />}
                          {notification.channels.includes('push') && <Bell className="h-3 w-3" />}
                          {notification.channels.includes('sms') && <Smartphone className="h-3 w-3" />}
                          {notification.channels.includes('in-app') && <Globe className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {!notification.read && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleStar(notification.id)}
                      >
                        <Star className={`h-4 w-4 ${notification.starred ? 'text-yellow-500 fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleArchive(notification.id)}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      
                      <Button size="sm" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuración de Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Configuración de Notificaciones
          </CardTitle>
          <CardDescription>
            Personaliza cómo y cuándo recibir notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Canales de Notificación</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">Notificaciones por correo electrónico</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.email.enabled}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, enabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Push</p>
                      <p className="text-sm text-gray-600">Notificaciones push en el navegador</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.push.enabled}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, enabled: checked }
                    }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">SMS</p>
                      <p className="text-sm text-gray-600">Notificaciones por mensaje de texto</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.sms.enabled}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({
                      ...prev,
                      sms: { ...prev.sms, enabled: checked }
                    }))}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Preferencias de Frecuencia</h4>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Frecuencia de Email</label>
                  <select 
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={notificationSettings.email.frequency}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, frequency: e.target.value }
                    }))}
                  >
                    <option value="immediate">Inmediata</option>
                    <option value="hourly">Cada hora</option>
                    <option value="daily">Diaria</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Frecuencia de Push</label>
                  <select 
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={notificationSettings.push.frequency}
                    onChange={(e) => setNotificationSettings(prev => ({
                      ...prev,
                      push: { ...prev.push, frequency: e.target.value }
                    }))}
                  >
                    <option value="immediate">Inmediata</option>
                    <option value="batched">Agrupadas</option>
                    <option value="daily">Diaria</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 