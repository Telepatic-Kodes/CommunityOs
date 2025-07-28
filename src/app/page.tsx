'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, Shield, Zap, Globe, Calendar, CreditCard, BarChart3, Bell, ArrowRight, CheckCircle, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';
import Navigation from '@/components/Navigation';
import { FullScreenLoading } from '@/components/ui/loading';

export default function Home() {
  const { config, loading, error } = useConfig();

  // Mostrar loading mientras se carga la configuración
  if (loading) {
    return <FullScreenLoading text="Cargando..." />;
  }

  // Mostrar error si hay problema con la configuración
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Configuración</h1>
          <p className="text-neutral-600">{error}</p>
        </div>
      </div>
    );
  }

  // Valores por defecto si config es null
  const defaultConfig = {
    organization: {
      name: 'CommunityOS',
      description: 'Plataforma SaaS completa para la gestión de asociaciones, gremios y comunidades. Reduce costos operativos y aumenta la retención de miembros.'
    },
    features: {
      members: true,
      events: true,
      payments: true,
      voting: true,
      analytics: true,
      notifications: true
    }
  };

  // Usar config o valores por defecto
  const safeConfig = config || defaultConfig;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 text-blue-800 text-lg font-bold mb-8 shadow-lg border border-blue-200">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
              <span className="hidden sm:inline">✨ Plataforma de gestión inteligente para comunidades</span>
              <span className="sm:hidden">✨ Gestión Inteligente</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gradient mb-8 leading-tight tracking-tight animate-slide-in-top">
              Gestión{' '}
              <span className="text-neutral-700">Inteligente</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              para Comunidades
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-slide-in-bottom">
              {safeConfig.organization.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 px-4 animate-slide-in-bottom">
              <Button size="lg" variant="editorial" className="text-lg px-8 py-6 font-bold btn-modern glow hover-scale-modern" asChild>
                <Link href="/dashboard">
                  Explorar Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-bold border-2 border-gradient hover-scale-modern" asChild>
                <Link href="/demo">Ver Funcionalidades</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto px-4">
              <div className="text-center group card-modern p-6 animate-slide-in-left">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-all duration-300">1,247</div>
                <div className="text-sm sm:text-base text-neutral-700 font-semibold uppercase tracking-widest">Miembros</div>
              </div>
              <div className="text-center group card-modern p-6 animate-slide-in-bottom">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-all duration-300">45</div>
                <div className="text-sm sm:text-base text-neutral-700 font-semibold uppercase tracking-widest">Eventos</div>
              </div>
              <div className="text-center group card-modern p-6 animate-slide-in-bottom">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-all duration-300">78%</div>
                <div className="text-sm sm:text-base text-neutral-700 font-semibold uppercase tracking-widest">Participación</div>
              </div>
              <div className="text-center group card-modern p-6 animate-slide-in-right">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gradient mb-2 group-hover:scale-110 transition-all duration-300">$45M</div>
                <div className="text-sm sm:text-base text-neutral-700 font-semibold uppercase tracking-widest">Ingresos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-8">
              Todo lo que necesitas
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 max-w-4xl mx-auto px-4">
              Diseñado específicamente para las necesidades de organizaciones modernas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeConfig.features.members && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-left">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <Users className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-blue-600 transition-colors duration-300">Gestión de Miembros</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    CRM completo con perfiles personalizados y onboarding automatizado
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/members">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {safeConfig.features.events && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-bottom">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <Calendar className="h-8 w-8 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-green-600 transition-colors duration-300">Gestión de Eventos</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    Organización de eventos, conferencias y reuniones con registro automático
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-green-600 hover:text-green-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/events">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {safeConfig.features.payments && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-bottom">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <CreditCard className="h-8 w-8 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-purple-600 transition-colors duration-300">Gestión de Pagos</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    Procesamiento de pagos y facturación automatizada
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-purple-600 hover:text-purple-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/payments">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {safeConfig.features.voting && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-bottom">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <BarChart3 className="h-8 w-8 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-orange-600 transition-colors duration-300">Sistema de Votaciones</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    Votaciones seguras y elecciones transparentes
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-orange-600 hover:text-orange-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/voting">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {safeConfig.features.analytics && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-bottom">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <TrendingUp className="h-8 w-8 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-teal-600 transition-colors duration-300">Analytics & Reportes</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    Métricas detalladas e insights para decisiones estratégicas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-teal-600 hover:text-teal-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/analytics">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            {safeConfig.features.notifications && (
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white hover-lift group card-modern animate-slide-in-right">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                    <Bell className="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-black text-neutral-900 group-hover:text-pink-600 transition-colors duration-300">Comunicaciones</CardTitle>
                  <CardDescription className="text-base text-neutral-700 leading-relaxed">
                    Notificaciones automáticas y gestión de comunicaciones
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button variant="ghost" className="p-0 h-auto text-pink-600 hover:text-pink-800 text-lg font-semibold group-hover:translate-x-2 transition-all duration-300" asChild>
                    <Link href="/dashboard/notifications">
                      Saber más <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-800/20 opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-8">
              ¿Listo para transformar tu comunidad?
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 mb-12 max-w-3xl mx-auto">
              Únete a cientos de organizaciones que ya confían en CommunityOS para gestionar sus comunidades de manera eficiente y profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Button size="lg" variant="editorial" className="text-lg px-8 py-6 font-bold" asChild>
                <Link href="/dashboard">
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 font-bold border-2 border-white text-white hover:bg-white hover:text-neutral-900" asChild>
                <Link href="/demo">Solicitar Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
