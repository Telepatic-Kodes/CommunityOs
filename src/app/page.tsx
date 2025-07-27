'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, Shield, Zap, Globe, Calendar, CreditCard, BarChart3, Bell } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';

export default function Home() {
  const { config } = useConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Explorar Demo</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/demo">Ver Funcionalidades</Link>
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
                <CardTitle>Gestión de Pagos</CardTitle>
                <CardDescription>
                  Procesamiento de pagos, gestión de membresías y facturación automatizada
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.voting && (
            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-black mb-4" />
                <CardTitle>Sistema de Votaciones</CardTitle>
                <CardDescription>
                  Votaciones seguras, elecciones transparentes y participación democrática
                </CardDescription>
              </CardHeader>
            </Card>
          )}

          {config.features.analytics && (
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-black mb-4" />
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
                  Notificaciones automáticas, emails personalizados y gestión de comunicaciones
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comunidades que han transformado su gestión con nuestra plataforma
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">1,247</div>
            <div className="text-gray-600">Miembros Activos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">45</div>
            <div className="text-gray-600">Eventos Organizados</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">78%</div>
            <div className="text-gray-600">Tasa de Participación</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">$45M</div>
            <div className="text-gray-600">Ingresos Gestionados</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            ¿Listo para transformar tu comunidad?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a cientos de organizaciones que ya confían en CommunityOS para gestionar sus comunidades
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Comenzar Demo</Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <Link href="/demo">Ver Funcionalidades</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
