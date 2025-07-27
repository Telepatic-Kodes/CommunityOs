'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, Shield, Zap, Globe, Calendar, CreditCard, BarChart3, Bell } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';
import { ClerkStatus } from '@/components/ui/ClerkStatus';

export default function Home() {
  const { config } = useConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-black" />
            <h1 className="text-2xl font-bold text-black">{config.organization.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/setup">Configurar Clerk</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/sign-in">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/sign-up">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-black mb-6">
            Gestión Inteligente para{' '}
            <span className="text-gray-600">Comunidades</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {config.organization.description}. Plataforma SaaS completa para la gestión de asociaciones, 
            gremios y comunidades. Reduce costos operativos y aumenta la retención de miembros.
          </p>
          
          {/* Clerk Status Check */}
          <div className="mb-8">
            <ClerkStatus />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/demo">Ver Demo</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/sign-up">Comenzar Gratis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            Todo lo que necesitas en una plataforma
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Diseñado específicamente para las necesidades de organizaciones y comunidades
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.features.members && (
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-black mb-4" />
                <CardTitle>CRM & Gestión de Miembros</CardTitle>
                <CardDescription>
                  Gestión completa de miembros con perfiles personalizados y onboarding automatizado
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.events && (
            <Card>
              <CardHeader>
                <Calendar className="h-12 w-12 text-black mb-4" />
                <CardTitle>Eventos & Calendario</CardTitle>
                <CardDescription>
                  Creación y gestión de eventos, registro de participantes y calendario integrado
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.payments && (
            <Card>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-black mb-4" />
                <CardTitle>Membresías & Pagos</CardTitle>
                <CardDescription>
                  Sistema de pagos integrado con gestión de membresías y cobros automáticos
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.voting && (
            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-black mb-4" />
                <CardTitle>Gobernanza & Votaciones</CardTitle>
                <CardDescription>
                  Votaciones digitales, actas PDF y trazabilidad completa de decisiones
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.analytics && (
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-black mb-4" />
                <CardTitle>Analytics & Reportes</CardTitle>
                <CardDescription>
                  Métricas detalladas, reportes personalizados y insights para la toma de decisiones
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.notifications && (
            <Card>
              <CardHeader>
                <Bell className="h-12 w-12 text-black mb-4" />
                <CardTitle>Comunicaciones</CardTitle>
                <CardDescription>
                  Sistema de notificaciones, emails automáticos y comunicación multicanal
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            Plataforma confiable y escalable
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilizada por organizaciones de todos los tamaños en todo el mundo
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">500+</div>
            <div className="text-gray-600">Organizaciones</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">50K+</div>
            <div className="text-gray-600">Miembros</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">99.9%</div>
            <div className="text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">24/7</div>
            <div className="text-gray-600">Soporte</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-6">
            ¿Listo para transformar tu comunidad?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a cientos de organizaciones que ya confían en {config.organization.name} 
            para gestionar sus comunidades de manera eficiente y profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/auth/sign-up">Comenzar Ahora</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/demo">Solicitar Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-black" />
                <h3 className="text-lg font-bold text-black">{config.organization.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {config.organization.description}
              </p>
              <div className="text-sm text-gray-500">
                <p>Email: {config.organization.email}</p>
                <p>Teléfono: {config.organization.phone}</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Plataforma</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/features" className="hover:text-black">Características</Link></li>
                <li><Link href="/pricing" className="hover:text-black">Precios</Link></li>
                <li><Link href="/demo" className="hover:text-black">Demo</Link></li>
                <li><Link href="/docs" className="hover:text-black">Documentación</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/help" className="hover:text-black">Centro de Ayuda</Link></li>
                <li><Link href="/contact" className="hover:text-black">Contacto</Link></li>
                <li><Link href="/status" className="hover:text-black">Estado del Sistema</Link></li>
                <li><Link href="/support" className="hover:text-black">Soporte Técnico</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-black mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/terms" className="hover:text-black">Términos de Servicio</Link></li>
                <li><Link href="/privacy" className="hover:text-black">Política de Privacidad</Link></li>
                <li><Link href="/cookies" className="hover:text-black">Política de Cookies</Link></li>
                <li><Link href="/security" className="hover:text-black">Seguridad</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} {config.organization.name}. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
