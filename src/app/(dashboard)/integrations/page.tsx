'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CreditCard, 
  FileText, 
  Users, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Plus,
  BarChart3
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

// Tipos para las integraciones
interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'communication' | 'payment' | 'analytics' | 'automation' | 'storage' | 'marketing';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  icon: any;
  color: string;
  lastSync?: string;
  syncStatus?: 'success' | 'error' | 'pending';
  config?: any;
}

export default function IntegrationsPage() {
  const { config } = useConfig();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Automatización de email marketing y campañas',
      category: 'marketing',
      status: 'connected',
      icon: Mail,
      color: 'orange',
      lastSync: '2024-01-15T10:30:00Z',
      syncStatus: 'success',
      config: {
        apiKey: 'mc_****_****_****',
        audienceId: 'aud_123456',
        automationEnabled: true
      }
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Comunicación en tiempo real y notificaciones',
      category: 'communication',
      status: 'connected',
      icon: MessageSquare,
      color: 'purple',
      lastSync: '2024-01-15T09:15:00Z',
      syncStatus: 'success',
      config: {
        webhookUrl: 'https://hooks.slack.com/...',
        channel: '#community-updates',
        notificationsEnabled: true
      }
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sincronización de eventos y calendarios',
      category: 'automation',
      status: 'connected',
      icon: Calendar,
      color: 'blue',
      lastSync: '2024-01-15T08:45:00Z',
      syncStatus: 'success',
      config: {
        calendarId: 'primary',
        syncEvents: true,
        autoCreateEvents: true
      }
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todas', icon: Settings },
    { id: 'communication', name: 'Comunicación', icon: MessageSquare },
    { id: 'payment', name: 'Pagos', icon: CreditCard },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'automation', name: 'Automatización', icon: Zap },
    { id: 'storage', name: 'Almacenamiento', icon: FileText },
    { id: 'marketing', name: 'Marketing', icon: Mail }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatLastSync = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('es-CO');
  };

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Integraciones Avanzadas
          </h1>
          <p className="text-gray-600 mt-2">
            Conecta tu comunidad con las mejores herramientas del mercado
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Integración
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sincronizar Todo
          </Button>
        </div>
      </div>

      {/* Filtros por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Categorías de Integraciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de Integraciones */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'connected').length}</p>
                <p className="text-sm text-gray-600">Conectadas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'pending').length}</p>
                <p className="text-sm text-gray-600">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-600">Automatizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">98.5%</p>
                <p className="text-sm text-gray-600">Tasa de Éxito</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Integraciones */}
      <div className="grid gap-6">
        {filteredIntegrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="p-3 rounded-lg"
                      style={{ backgroundColor: `${integration.color}20` }}
                    >
                      <Icon 
                        className="h-6 w-6" 
                        style={{ color: integration.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {integration.name}
                        <Badge className={getStatusColor(integration.status)}>
                          {getStatusIcon(integration.status)}
                          <span className="ml-1 capitalize">{integration.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription>{integration.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {integration.status === 'connected' && (
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {integration.status === 'connected' && (
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Configuración</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(integration.config || {}).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                              {typeof value === 'string' && value.includes('****') 
                                ? value 
                                : String(value).substring(0, 20) + '...'
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Estado de Sincronización</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Última sincronización:</span>
                          <span>{formatLastSync(integration.lastSync)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Estado:</span>
                          <Badge 
                            variant={integration.syncStatus === 'success' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {integration.syncStatus === 'success' ? 'Exitoso' : 
                             integration.syncStatus === 'error' ? 'Error' : 'Pendiente'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
} 