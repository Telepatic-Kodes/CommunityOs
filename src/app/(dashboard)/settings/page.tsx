'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Building2, 
  Palette, 
  Shield, 
  Bell, 
  CreditCard,
  Save,
  Globe
} from 'lucide-react';
import { useConfig } from '@/hooks/useConfig';

export default function SettingsPage() {
  const { config } = useConfig();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    organization: {
      name: 'Mi Comunidad',
      email: 'admin@micomunidad.com',
      website: 'https://micomunidad.com',
      phone: '+56 9 1234 5678'
    },
    features: {
      events: true,
      members: true,
      payments: true,
      voting: true,
      analytics: true,
      notifications: true
    },
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordPolicy: true
    }
  });

  // Simular carga de datos
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = () => {
    // Simular guardado
    console.log('Settings saved:', settings);
    alert('Configuración guardada exitosamente');
  };

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
          <h1 className="text-2xl font-bold">Configuración</h1>
          <p className="text-gray-600">Administra la configuración de tu comunidad</p>
        </div>
        <Button onClick={handleSave} className="mt-4 sm:mt-0">
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      {/* Settings Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5" />
              <span>Información de la Organización</span>
            </CardTitle>
            <CardDescription>
              Configura los datos básicos de tu organización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="org-name">Nombre de la Organización</Label>
              <Input
                id="org-name"
                value={settings.organization.name}
                onChange={(e) => setSettings({
                  ...settings,
                  organization: { ...settings.organization, name: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="org-email">Email de Contacto</Label>
              <Input
                id="org-email"
                type="email"
                value={settings.organization.email}
                onChange={(e) => setSettings({
                  ...settings,
                  organization: { ...settings.organization, email: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="org-website">Sitio Web</Label>
              <Input
                id="org-website"
                value={settings.organization.website}
                onChange={(e) => setSettings({
                  ...settings,
                  organization: { ...settings.organization, website: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="org-phone">Teléfono</Label>
              <Input
                id="org-phone"
                value={settings.organization.phone}
                onChange={(e) => setSettings({
                  ...settings,
                  organization: { ...settings.organization, phone: e.target.value }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Módulos Habilitados</span>
            </CardTitle>
            <CardDescription>
              Activa o desactiva los módulos de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(settings.features).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={`feature-${key}`} className="capitalize">
                  {key === 'events' && 'Eventos'}
                  {key === 'members' && 'Miembros'}
                  {key === 'payments' && 'Pagos'}
                  {key === 'voting' && 'Votaciones'}
                  {key === 'analytics' && 'Analytics'}
                  {key === 'notifications' && 'Notificaciones'}
                </Label>
                <Switch
                  id={`feature-${key}`}
                  checked={value}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    features: { ...settings.features, [key]: checked }
                  })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Configuración de Notificaciones</span>
            </CardTitle>
            <CardDescription>
              Configura cómo recibir las notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-email">Notificaciones por Email</Label>
              <Switch
                id="notif-email"
                checked={settings.notifications.email}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-push">Notificaciones Push</Label>
              <Switch
                id="notif-push"
                checked={settings.notifications.push}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, push: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-sms">Notificaciones SMS</Label>
              <Switch
                id="notif-sms"
                checked={settings.notifications.sms}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, sms: checked }
                })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Configuración de Seguridad</span>
            </CardTitle>
            <CardDescription>
              Configura las opciones de seguridad de la cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="security-2fa">Autenticación de Dos Factores</Label>
              <Switch
                id="security-2fa"
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactor: checked }
                })}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="security-password">Política de Contraseñas</Label>
              <Switch
                id="security-password"
                checked={settings.security.passwordPolicy}
                onCheckedChange={(checked) => setSettings({
                  ...settings,
                  security: { ...settings.security, passwordPolicy: checked }
                })}
              />
            </div>
            <div>
              <Label htmlFor="security-timeout">Tiempo de Sesión (minutos)</Label>
              <Input
                id="security-timeout"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e) => setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

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