'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  Plus, 
  Trash2, 
  Edit, 
  Play, 
  Pause, 
  ArrowRight,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Mail,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Database,
  BarChart3
} from 'lucide-react';

interface AutomationStep {
  id: string;
  type: 'trigger' | 'action' | 'condition';
  service: string;
  action: string;
  config: any;
  position: number;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  steps: AutomationStep[];
  lastRun?: string;
  runCount: number;
  successRate: number;
}

const availableServices = [
  { id: 'system', name: 'Sistema', icon: Settings, color: 'blue' },
  { id: 'mailchimp', name: 'Mailchimp', icon: Mail, color: 'orange' },
  { id: 'slack', name: 'Slack', icon: MessageSquare, color: 'purple' },
  { id: 'google-calendar', name: 'Google Calendar', icon: Calendar, color: 'blue' },
  { id: 'stripe', name: 'Stripe', icon: CreditCard, color: 'green' },
  { id: 'google-analytics', name: 'Google Analytics', icon: BarChart3, color: 'red' },
  { id: 'database', name: 'Base de Datos', icon: Database, color: 'gray' }
];

const availableTriggers = [
  { service: 'system', triggers: ['Nuevo miembro registrado', 'Pago recibido', 'Evento creado', 'Votación cerrada'] },
  { service: 'stripe', triggers: ['Pago exitoso', 'Suscripción cancelada', 'Reembolso procesado'] },
  { service: 'google-calendar', triggers: ['Evento próximo', 'Evento cancelado', 'Evento modificado'] }
];

const availableActions = [
  { service: 'mailchimp', actions: ['Enviar email', 'Agregar a lista', 'Enviar campaña'] },
  { service: 'slack', actions: ['Enviar mensaje', 'Crear canal', 'Mencionar usuario'] },
  { service: 'google-calendar', actions: ['Crear evento', 'Actualizar evento', 'Eliminar evento'] },
  { service: 'system', actions: ['Enviar notificación', 'Actualizar estado', 'Registrar actividad'] }
];

export default function AutomationBuilder() {
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Nuevo Miembro - Email de Bienvenida',
      description: 'Envía email automático cuando se registra un nuevo miembro',
      status: 'active',
      steps: [
        {
          id: '1-1',
          type: 'trigger',
          service: 'system',
          action: 'Nuevo miembro registrado',
          config: {},
          position: 1
        },
        {
          id: '1-2',
          type: 'action',
          service: 'mailchimp',
          action: 'Enviar email',
          config: { template: 'welcome-email', delay: 0 },
          position: 2
        }
      ],
      lastRun: '2024-01-15T10:30:00Z',
      runCount: 156,
      successRate: 98.7
    },
    {
      id: '2',
      name: 'Pago Recibido - Notificación Slack',
      description: 'Notifica en Slack cuando se recibe un pago',
      status: 'active',
      steps: [
        {
          id: '2-1',
          type: 'trigger',
          service: 'stripe',
          action: 'Pago exitoso',
          config: {},
          position: 1
        },
        {
          id: '2-2',
          type: 'action',
          service: 'slack',
          action: 'Enviar mensaje',
          config: { channel: '#payments', message: 'Nuevo pago recibido: ${{amount}}' },
          position: 2
        }
      ],
      lastRun: '2024-01-15T09:15:00Z',
      runCount: 89,
      successRate: 100
    }
  ]);

  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const getServiceIcon = (serviceId: string) => {
    const service = availableServices.find(s => s.id === serviceId);
    return service ? service.icon : Settings;
  };

  const getServiceColor = (serviceId: string) => {
    const service = availableServices.find(s => s.id === serviceId);
    return service ? service.color : 'gray';
  };

  const formatLastRun = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    const date = new Date(dateString);
    return date.toLocaleString('es-CO');
  };

  const handleToggleAutomation = (automationId: string) => {
    setAutomations(prev => prev.map(automation => {
      if (automation.id === automationId) {
        const newStatus = automation.status === 'active' ? 'inactive' : 'active';
        return { ...automation, status: newStatus };
      }
      return automation;
    }));
  };

  const handleDeleteAutomation = (automationId: string) => {
    setAutomations(prev => prev.filter(automation => automation.id !== automationId));
    if (selectedAutomation?.id === automationId) {
      setSelectedAutomation(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Constructor de Automatizaciones
          </h1>
          <p className="text-gray-600 mt-2">
            Crea flujos de trabajo automatizados entre tus integraciones
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Automatización
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{automations.length}</p>
                <p className="text-sm text-gray-600">Automatizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Play className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{automations.filter(a => a.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Activas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {automations.reduce((total, a) => total + a.runCount, 0)}
                </p>
                <p className="text-sm text-gray-600">Ejecuciones</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(automations.reduce((total, a) => total + a.successRate, 0) / automations.length)}%
                </p>
                <p className="text-sm text-gray-600">Tasa de Éxito</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Automatizaciones */}
      <div className="grid gap-6">
        {automations.map((automation) => {
          const firstStep = automation.steps.find(s => s.type === 'trigger');
          const lastStep = automation.steps.find(s => s.type === 'action');
          
          return (
            <Card key={automation.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Zap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        {automation.name}
                        <Badge 
                          variant={automation.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {automation.status === 'active' ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{automation.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAutomation(automation)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleAutomation(automation.id)}
                    >
                      {automation.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAutomation(automation.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Flujo de Automatización */}
                  <div>
                    <h4 className="font-semibold mb-3">Flujo de Automatización</h4>
                    <div className="space-y-3">
                      {automation.steps.map((step, index) => {
                        const Icon = getServiceIcon(step.service);
                        const color = getServiceColor(step.service);
                        
                        return (
                          <div key={step.id} className="flex items-center space-x-3">
                            <div 
                              className="p-2 rounded-lg"
                              style={{ backgroundColor: `${color}20` }}
                            >
                              <Icon 
                                className="h-4 w-4" 
                                style={{ color }}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{step.action}</p>
                              <p className="text-xs text-gray-500">{step.service}</p>
                            </div>
                            {index < automation.steps.length - 1 && (
                              <ArrowRight className="h-4 w-4 text-neutral-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Estadísticas */}
                  <div>
                    <h4 className="font-semibold mb-3">Estadísticas</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Última ejecución:</span>
                        <span>{formatLastRun(automation.lastRun)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total ejecuciones:</span>
                        <span>{automation.runCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tasa de éxito:</span>
                        <span className="text-green-600">{automation.successRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Servicios Disponibles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Servicios Disponibles para Integración
          </CardTitle>
          <CardDescription>
            Conecta tu automatización con estas herramientas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableServices.map((service) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Icon 
                        className="h-5 w-5" 
                        style={{ color: service.color }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-gray-500">Disponible</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Plantillas de Automatización */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Plantillas de Automatización
          </CardTitle>
          <CardDescription>
            Automatizaciones predefinidas para casos de uso comunes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Onboarding de Miembros</h4>
              <p className="text-sm text-gray-600 mb-3">
                Email de bienvenida + invitación a Slack + agregar a calendario
              </p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Usar Plantilla
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Gestión de Pagos</h4>
              <p className="text-sm text-gray-600 mb-3">
                Notificación de pago + actualizar estado + enviar recibo
              </p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Usar Plantilla
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Eventos Automáticos</h4>
              <p className="text-sm text-gray-600 mb-3">
                Crear evento + enviar invitaciones + recordatorios
              </p>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Usar Plantilla
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 