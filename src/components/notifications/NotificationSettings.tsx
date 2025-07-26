import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Mail, Smartphone, Save } from "lucide-react";

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

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export function NotificationSettings({ settings, onSave }: NotificationSettingsProps) {
  const [currentSettings, setCurrentSettings] = useState<NotificationSettings>(settings);

  const handleToggle = (channel: 'email' | 'push', category: keyof NotificationSettings['email']) => {
    setCurrentSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [category]: !prev[channel][category]
      }
    }));
  };

  const handleSave = () => {
    onSave(currentSettings);
  };

  const getUnreadCount = () => {
    return Object.values(currentSettings.email).filter(Boolean).length + 
           Object.values(currentSettings.push).filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Notificaciones por Email</span>
          </CardTitle>
          <CardDescription>
            Recibe notificaciones importantes por correo electrónico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email-payments"
                checked={currentSettings.email.payments}
                onChange={() => handleToggle('email', 'payments')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="email-payments">Pagos y cuotas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email-events"
                checked={currentSettings.email.events}
                onChange={() => handleToggle('email', 'events')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="email-events">Eventos y actividades</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email-voting"
                checked={currentSettings.email.voting}
                onChange={() => handleToggle('email', 'voting')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="email-voting">Votaciones activas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="email-general"
                checked={currentSettings.email.general}
                onChange={() => handleToggle('email', 'general')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="email-general">Noticias generales</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="h-5 w-5" />
            <span>Notificaciones Push</span>
          </CardTitle>
          <CardDescription>
            Recibe notificaciones instantáneas en tu dispositivo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="push-payments"
                checked={currentSettings.push.payments}
                onChange={() => handleToggle('push', 'payments')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="push-payments">Pagos y cuotas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="push-events"
                checked={currentSettings.push.events}
                onChange={() => handleToggle('push', 'events')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="push-events">Eventos y actividades</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="push-voting"
                checked={currentSettings.push.voting}
                onChange={() => handleToggle('push', 'voting')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="push-voting">Votaciones activas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="push-general"
                checked={currentSettings.push.general}
                onChange={() => handleToggle('push', 'general')}
                className="rounded border-gray-300"
              />
              <Label htmlFor="push-general">Noticias generales</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Frequency Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Frecuencia de Notificaciones</span>
          </CardTitle>
          <CardDescription>
            Configura cuándo recibir las notificaciones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frecuencia de resúmenes</Label>
            <Select 
              value={currentSettings.frequency} 
              onValueChange={(value: 'immediate' | 'daily' | 'weekly') => 
                setCurrentSettings(prev => ({ ...prev, frequency: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Inmediatas</SelectItem>
                <SelectItem value="daily">Resumen diario</SelectItem>
                <SelectItem value="weekly">Resumen semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="quiet-hours"
                checked={currentSettings.quietHours.enabled}
                onChange={(e) => setCurrentSettings(prev => ({
                  ...prev,
                  quietHours: { ...prev.quietHours, enabled: e.target.checked }
                }))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="quiet-hours">Horas de silencio</Label>
            </div>
            {currentSettings.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4 ml-6">
                <div className="space-y-1">
                  <Label htmlFor="quiet-start">Desde</Label>
                  <input
                    type="time"
                    id="quiet-start"
                    value={currentSettings.quietHours.start}
                    onChange={(e) => setCurrentSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, start: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="quiet-end">Hasta</Label>
                  <input
                    type="time"
                    id="quiet-end"
                    value={currentSettings.quietHours.end}
                    onChange={(e) => setCurrentSettings(prev => ({
                      ...prev,
                      quietHours: { ...prev.quietHours, end: e.target.value }
                    }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Guardar Configuración</span>
        </Button>
      </div>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Configuración activa</p>
              <p className="text-xs text-gray-600">
                {getUnreadCount()} tipos de notificaciones habilitados
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                Frecuencia: {currentSettings.frequency === 'immediate' ? 'Inmediatas' : 
                           currentSettings.frequency === 'daily' ? 'Diarias' : 'Semanales'}
              </p>
              {currentSettings.quietHours.enabled && (
                <p className="text-xs text-gray-600">
                  Silencio: {currentSettings.quietHours.start} - {currentSettings.quietHours.end}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 