'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, Star, CheckCircle, AlertTriangle, XCircle, DollarSign, Calendar, Users, Settings } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'payment' | 'event' | 'member' | 'system';
  priority: 'low' | 'medium' | 'high' | 'critical';
  read: boolean;
  starred: boolean;
  timestamp: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Nuevo miembro registrado',
      message: 'María González se ha unido a la comunidad. Revisa su perfil y asigna roles.',
      type: 'member',
      priority: 'medium',
      read: false,
      starred: false,
      timestamp: '2024-12-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Pago procesado exitosamente',
      message: 'El pago de la membresía anual de Juan Pérez ha sido procesado correctamente.',
      type: 'payment',
      priority: 'low',
      read: false,
      starred: true,
      timestamp: '2024-12-15T09:15:00Z'
    },
    {
      id: '3',
      title: 'Evento próximo',
      message: 'El evento "Networking Anual" comienza en 2 horas. 45 personas confirmadas.',
      type: 'event',
      priority: 'high',
      read: true,
      starred: false,
      timestamp: '2024-12-15T08:00:00Z'
    },
    {
      id: '4',
      title: 'Error en el sistema',
      message: 'Se detectó un problema con el sistema de votaciones. El equipo técnico está trabajando en la solución.',
      type: 'error',
      priority: 'critical',
      read: false,
      starred: false,
      timestamp: '2024-12-15T07:45:00Z'
    },
    {
      id: '5',
      title: 'Actualización del sistema',
      message: 'Se ha completado la actualización del sistema. Nuevas funcionalidades disponibles.',
      type: 'system',
      priority: 'low',
      read: true,
      starred: false,
      timestamp: '2024-12-14T23:30:00Z'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'critical' && !n.read).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-blue-600" />;
      case 'event':
        return <Calendar className="h-4 w-4 text-purple-600" />;
      case 'member':
        return <Users className="h-4 w-4 text-indigo-600" />;
      case 'system':
        return <Settings className="h-4 w-4 text-neutral-600" />;
      default:
        return <Bell className="h-4 w-4 text-neutral-600" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `Hace ${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)}h`;
    return notificationTime.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant={criticalCount > 0 ? "destructive" : "secondary"}
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificaciones</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Marcar todas como leídas
            </Button>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-neutral-600">
            <Bell className="h-8 w-8 mx-auto mb-2 text-neutral-500" />
            <p className="text-sm">No hay notificaciones</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0 mt-0.5">
                    {getTypeIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${!notification.read ? 'text-neutral-900' : 'text-neutral-700'}`}>
                        {notification.title}
                      </p>
                      {notification.starred && (
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-neutral-600">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      
                      {notification.priority === 'critical' && (
                        <Badge variant="destructive" className="text-xs">
                          Crítico
                        </Badge>
                      )}
                      {notification.priority === 'high' && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                          Alto
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="text-center text-blue-600 hover:text-blue-700">
          Ver todas las notificaciones
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 