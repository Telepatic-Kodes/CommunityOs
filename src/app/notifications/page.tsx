'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { NotificationSettings } from "@/components/notifications/NotificationSettings";
import { 
  Bell, 
  Settings, 
  Check
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'payment' | 'event' | 'voting' | 'member' | 'general';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

interface NotificationSettings {
  email: {
    payments: boolean;
    events: boolean;
    voting: boolean;
    general: boolean;
  };
  push: {
    payments: boolean;
    events: boolean;
    voting: boolean;
    general: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'settings'>('notifications');
  const [filter, setFilter] = useState<'all' | 'unread' | 'payment' | 'event' | 'voting' | 'member'>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Pago de cuota recibido',
      message: 'Se ha confirmado el pago de tu cuota mensual de $50,000 CLP.',
      type: 'success',
      category: 'payment',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
      actionUrl: '/payments'
    },
    {
      id: '2',
      title: 'Nuevo evento: Taller de Marketing Digital',
      message: 'Te invitamos al taller de Marketing Digital que se realizará el próximo viernes.',
      type: 'info',
      category: 'event',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      actionUrl: '/events'
    },
    {
      id: '3',
      title: 'Votación activa: Cambio de fecha de reunión',
      message: 'Hay una nueva votación activa para cambiar la fecha de la próxima reunión mensual.',
      type: 'warning',
      category: 'voting',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      actionUrl: '/voting'
    },
    {
      id: '4',
      title: 'Nuevo miembro registrado',
      message: 'María González se ha unido a la asociación. ¡Dale la bienvenida!',
      type: 'info',
      category: 'member',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
      actionUrl: '/members'
    },
    {
      id: '5',
      title: 'Recordatorio: Cuota vence en 3 días',
      message: 'Tu cuota mensual vence el próximo lunes. Realiza el pago para mantener tu membresía activa.',
      type: 'warning',
      category: 'payment',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      actionUrl: '/payments'
    },
    {
      id: '6',
      title: 'Evento cancelado: Networking Nocturno',
      message: 'El evento Networking Nocturno programado para mañana ha sido cancelado debido al mal tiempo.',
      type: 'error',
      category: 'event',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(), // 4 days ago
      actionUrl: '/events'
    }
  ]);

  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      payments: true,
      events: true,
      voting: true,
      general: false
    },
    push: {
      payments: true,
      events: true,
      voting: true,
      general: true
    },
    frequency: 'immediate',
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleSaveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    // Aquí normalmente se enviaría al backend
    console.log('Settings saved:', newSettings);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Notificaciones</h1>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} sin leer
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab(activeTab === 'notifications' ? 'settings' : 'notifications')}
              >
                <Settings className="h-4 w-4 mr-2" />
                {activeTab === 'notifications' ? 'Configuración' : 'Notificaciones'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'notifications' ? (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Select value={filter} onChange={(e) => setFilter(e.target.value as "payment" | "event" | "voting" | "member" | "all" | "unread")}>
                  <option value="all">Todas</option>
                  <option value="unread">Sin leer</option>
                  <option value="payment">Pagos</option>
                  <option value="event">Eventos</option>
                  <option value="voting">Votaciones</option>
                  <option value="member">Miembros</option>
                </Select>
                <span className="text-sm text-gray-600">
                  {filteredNotifications.length} notificación{filteredNotifications.length !== 1 ? 'es' : ''}
                </span>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <Check className="h-4 w-4 mr-2" />
                  Marcar todas como leídas
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No hay notificaciones
                    </h3>
                    <p className="text-gray-600">
                      {filter === 'all' 
                        ? 'No tienes notificaciones en este momento.'
                        : `No hay notificaciones ${filter === 'unread' ? 'sin leer' : `de ${filter}`}.`
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>

            {/* Notification Stats */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">Resumen de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-black">{notifications.length}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
                    <div className="text-sm text-gray-600">Sin leer</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {notifications.filter(n => n.type === 'success').length}
                    </div>
                    <div className="text-sm text-gray-600">Éxitos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {notifications.filter(n => n.type === 'warning').length}
                    </div>
                    <div className="text-sm text-gray-600">Advertencias</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Configuración de Notificaciones</h2>
              <p className="text-gray-600">
                Personaliza cómo y cuándo recibir notificaciones de la plataforma.
              </p>
            </div>
            <NotificationSettings 
              settings={settings} 
              onSave={handleSaveSettings} 
            />
          </div>
        )}
      </main>
    </div>
  );
} 