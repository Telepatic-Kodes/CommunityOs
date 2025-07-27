'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/useConfig";
import { CommunityConfig } from "@/lib/config";
import { 
  Building2, 
  Palette, 
  Settings, 
  Shield, 
  Mail, 
  Globe, 
  CreditCard,
  Bell,
  Save,
  RefreshCw,
  Users,
  Calendar
} from "lucide-react";

export default function SettingsPage() {
  const { config, updateConfig } = useConfig();
  const [currentConfig, setCurrentConfig] = useState<CommunityConfig>(config);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateConfig(currentConfig);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentConfig(config);
  };

  const updateConfigField = (path: string, value: any) => {
    const keys = path.split('.');
    setCurrentConfig(prev => {
      const newConfig = { ...prev };
      let current: any = newConfig;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-black">Configuración</h1>
              <span className="text-sm text-gray-500">Personaliza tu CommunityOS</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Restaurar
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </div>
          </div>
          {saved && (
            <div className="mt-2 text-sm text-green-600">
              ✅ Configuración guardada exitosamente
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="organization" className="flex items-center space-x-2">
              <Building2 className="h-4 w-4" />
              <span>Organización</span>
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Branding</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Funcionalidades</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Módulos</span>
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Comunicación</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Seguridad</span>
            </TabsTrigger>
          </TabsList>

          {/* Organization Tab */}
          <TabsContent value="organization" className="space-y-6">
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgName">Nombre de la Organización</Label>
                    <Input
                      id="orgName"
                      value={currentConfig.organization.name}
                      onChange={(e) => updateConfigField('organization.name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="orgShortName">Nombre Corto</Label>
                    <Input
                      id="orgShortName"
                      value={currentConfig.organization.shortName}
                      onChange={(e) => updateConfigField('organization.shortName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="orgDescription">Descripción</Label>
                  <textarea
                    id="orgDescription"
                    value={currentConfig.organization.description}
                    onChange={(e) => updateConfigField('organization.description', e.target.value)}
                    className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="orgEmail">Email</Label>
                    <Input
                      id="orgEmail"
                      type="email"
                      value={currentConfig.organization.email}
                      onChange={(e) => updateConfigField('organization.email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="orgPhone">Teléfono</Label>
                    <Input
                      id="orgPhone"
                      value={currentConfig.organization.phone}
                      onChange={(e) => updateConfigField('organization.phone', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="orgWebsite">Sitio Web</Label>
                  <Input
                    id="orgWebsite"
                    value={currentConfig.organization.website}
                    onChange={(e) => updateConfigField('organization.website', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Branding y Diseño</span>
                </CardTitle>
                <CardDescription>
                  Personaliza los colores y el diseño de tu plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Color Primario</Label>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={currentConfig.branding.primaryColor}
                      onChange={(e) => updateConfigField('branding.primaryColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Color Secundario</Label>
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={currentConfig.branding.secondaryColor}
                      onChange={(e) => updateConfigField('branding.secondaryColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Color de Acento</Label>
                    <Input
                      id="accentColor"
                      type="color"
                      value={currentConfig.branding.secondaryColor}
                      onChange={(e) => updateConfigField('branding.secondaryColor', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Tema</Label>
                    <Select
                      value={currentConfig.branding.theme}
                      onValueChange={(value) => updateConfigField('branding.theme', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fontFamily">Fuente</Label>
                    <Select 
                      value={currentConfig.branding.fontFamily}
                      onValueChange={(value) => updateConfigField('branding.fontFamily', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar fuente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inter, system-ui, sans-serif">Inter</SelectItem>
                        <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                        <SelectItem value="Open Sans, sans-serif">Open Sans</SelectItem>
                        <SelectItem value="Lato, sans-serif">Lato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Funcionalidades</span>
                </CardTitle>
                <CardDescription>
                  Habilita o deshabilita las funcionalidades de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentConfig.features).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label className="font-medium capitalize">{key}</Label>
                        <p className="text-sm text-gray-500">
                          {key === 'members' && 'Gestión de miembros'}
                          {key === 'events' && 'Eventos y calendario'}
                          {key === 'payments' && 'Sistema de pagos'}
                          {key === 'voting' && 'Votaciones digitales'}
                          {key === 'analytics' && 'Analytics y reportes'}
                          {key === 'notifications' && 'Notificaciones'}
                          {key === 'documents' && 'Gestión de documentos'}
                          {key === 'communications' && 'Comunicaciones'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => updateConfigField(`features.${key}`, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Configuración de Módulos</span>
                </CardTitle>
                <CardDescription>
                  Configura los parámetros específicos de cada módulo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Members Module */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Módulo de Miembros</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxMembers">Máximo de Miembros</Label>
                      <Input
                        id="maxMembers"
                        type="number"
                        value={currentConfig.modules.members.maxMembers}
                        onChange={(e) => updateConfigField('modules.members.maxMembers', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentConfig.modules.members.allowSelfRegistration}
                        onCheckedChange={(checked) => updateConfigField('modules.members.allowSelfRegistration', checked)}
                      />
                      <Label>Permitir Registro Público</Label>
                    </div>
                  </div>
                </div>

                {/* Events Module */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Módulo de Eventos</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="maxEvents">Máximo de Eventos</Label>
                      <Input
                        id="maxEvents"
                        type="number"
                        value={currentConfig.modules.events.maxEvents}
                        onChange={(e) => updateConfigField('modules.events.maxEvents', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={currentConfig.modules.events.allowRecurring}
                        onCheckedChange={(checked) => updateConfigField('modules.events.allowRecurring', checked)}
                      />
                      <Label>Permitir Eventos Recurrentes</Label>
                    </div>
                  </div>
                </div>

                {/* Payments Module */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4 flex items-center space-x-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Módulo de Pagos</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="currency">Moneda</Label>
                      <Select 
                        value={currentConfig.modules.payments.currency}
                        onValueChange={(value) => updateConfigField('modules.payments.currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - Dólar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="CLP">CLP - Peso Chileno</SelectItem>
                          <SelectItem value="MXN">MXN - Peso Mexicano</SelectItem>
                          <SelectItem value="COP">COP - Peso Colombiano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tab */}
          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Configuración de Comunicaciones</span>
                </CardTitle>
                <CardDescription>
                  Configura el sistema de emails y notificaciones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fromEmail">Email Remitente</Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      value={currentConfig.communication.email.fromEmail}
                      onChange={(e) => updateConfigField('communication.email.fromEmail', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fromName">Nombre Remitente</Label>
                    <Input
                      id="fromName"
                      value={currentConfig.communication.email.fromName}
                      onChange={(e) => updateConfigField('communication.email.fromName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emailProvider">Proveedor de Email</Label>
                  <Select 
                    value={currentConfig.communication.email.provider}
                    onValueChange={(value) => updateConfigField('communication.email.provider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sendgrid">SendGrid</SelectItem>
                      <SelectItem value="mailgun">Mailgun</SelectItem>
                      <SelectItem value="ses">Amazon SES</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Configuración de Seguridad</span>
                </CardTitle>
                <CardDescription>
                  Configura las políticas de seguridad y privacidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="minLength">Longitud mínima de contraseña</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={currentConfig.security.passwordPolicy.minLength}
                      onChange={(e) => updateConfigField('security.passwordPolicy.minLength', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentConfig.security.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) => updateConfigField('security.passwordPolicy.requireUppercase', checked)}
                    />
                    <Label>Requiere mayúsculas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentConfig.security.passwordPolicy.requireLowercase}
                      onCheckedChange={(checked) => updateConfigField('security.passwordPolicy.requireLowercase', checked)}
                    />
                    <Label>Requiere minúsculas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentConfig.security.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) => updateConfigField('security.passwordPolicy.requireNumbers', checked)}
                    />
                    <Label>Requiere números</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={currentConfig.security.passwordPolicy.requireSymbols}
                      onCheckedChange={(checked) => updateConfigField('security.passwordPolicy.requireSymbols', checked)}
                    />
                    <Label>Requiere símbolos</Label>
                  </div>
                  <div>
                    <Label htmlFor="sessionTimeout">Duración de sesión (segundos)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={currentConfig.security.session.timeout}
                      onChange={(e) => updateConfigField('security.session.timeout', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxConcurrent">Sesiones simultáneas máximas</Label>
                    <Input
                      id="maxConcurrent"
                      type="number"
                      value={currentConfig.security.session.maxConcurrent}
                      onChange={(e) => updateConfigField('security.session.maxConcurrent', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxRequests">Límite de peticiones por ventana</Label>
                    <Input
                      id="maxRequests"
                      type="number"
                      value={currentConfig.security.rateLimit.maxRequests}
                      onChange={(e) => updateConfigField('security.rateLimit.maxRequests', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="windowMs">Ventana de rate limit (ms)</Label>
                    <Input
                      id="windowMs"
                      type="number"
                      value={currentConfig.security.rateLimit.windowMs}
                      onChange={(e) => updateConfigField('security.rateLimit.windowMs', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
} 