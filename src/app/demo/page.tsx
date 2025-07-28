'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  BarChart3, 
  Bell, 
  Shield, 
  Zap, 
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Activity,
  Target,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { useConfig } from '@/hooks/useConfig';
import Navigation from '@/components/Navigation';

export default function DemoPage() {
  const { config } = useConfig();

  const stats = [
    { label: 'Miembros Activos', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Ingresos Mensuales', value: '$45M', icon: DollarSign, color: 'text-green-600' },
    { label: 'Participación Eventos', value: '78%', icon: Calendar, color: 'text-purple-600' },
    { label: 'Participación Votaciones', value: '92%', icon: BarChart3, color: 'text-orange-600' }
  ];

  const features = [
    {
      title: 'Gestión de Miembros',
      description: 'CRM completo para gestionar socios, roles y estados',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
      benefits: [
        'Perfiles personalizados con campos personalizables',
        'Sistema de roles y permisos granular',
        'Estados de membresía automatizados',
        'Importación masiva de datos'
      ]
    },
    {
      title: 'Gestión de Pagos',
      description: 'Gestión completa de cuotas y múltiples métodos de pago',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600',
      benefits: [
        'Procesamiento de pagos automático',
        'Facturación electrónica integrada',
        'Múltiples métodos de pago',
        'Reportes financieros detallados'
      ]
    },
    {
      title: 'Eventos y Calendario',
      description: 'Creación y gestión de eventos con inscripciones',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      benefits: [
        'Calendario integrado con Google/Outlook',
        'Sistema de inscripciones automático',
        'Gestión de capacidad y listas de espera',
        'Certificados de participación'
      ]
    },
    {
      title: 'Sistema de Votaciones',
      description: 'Sistema de gobernanza digital con diferentes tipos de voto',
      icon: BarChart3,
      color: 'bg-orange-100 text-orange-600',
      benefits: [
        'Votaciones seguras con blockchain',
        'Múltiples tipos de votación',
        'Resultados en tiempo real',
        'Auditoría completa de votos'
      ]
    },
    {
      title: 'Analytics y Reportes',
      description: 'Métricas detalladas y reportes con gráficos interactivos',
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600',
      benefits: [
        'Dashboard personalizable',
        'Reportes automáticos por email',
        'Exportación en múltiples formatos',
        'Análisis predictivo'
      ]
    },
    {
      title: 'Comunicaciones',
      description: 'Comunicación en tiempo real con configuración personalizada',
      icon: Bell,
      color: 'bg-pink-100 text-pink-600',
      benefits: [
        'Notificaciones push y email',
        'Plantillas personalizables',
        'Programación automática',
        'Análisis de engagement'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800">
              <Star className="h-4 w-4 mr-2" />
              Plataforma Completa de Gestión
            </Badge>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Descubre todas las{' '}
              <span className="text-blue-600">funcionalidades</span>
            </h1>
            
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto mb-8 leading-relaxed">
              Explora las herramientas profesionales que transformarán la gestión de tu comunidad
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="editorial" asChild>
                <Link href="/dashboard">
                  Probar Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contactar Ventas</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-neutral-700">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              Herramientas diseñadas específicamente para las necesidades de organizaciones modernas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <CardHeader className="pb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-bold text-neutral-900">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-neutral-700">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 px-3 py-1 text-sm bg-green-100 text-green-800">
                <Shield className="h-4 w-4 mr-1" />
                Seguridad Empresarial
              </Badge>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Seguridad y Cumplimiento
              </h2>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Tu información está protegida con los más altos estándares de seguridad empresarial y cumplimiento normativo.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-neutral-700">Cifrado de datos de extremo a extremo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-neutral-700">Cumplimiento GDPR y LGPD</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-neutral-700">Backups automáticos diarios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-neutral-700">Monitoreo 24/7 de seguridad</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="border-0 bg-white/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                      <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-neutral-900">99.9%</div>
                      <div className="text-xs text-neutral-700">Uptime</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-white/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                      <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-neutral-900">256-bit</div>
                      <div className="text-xs text-neutral-700">Cifrado</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-white/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                      <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-neutral-900">Global</div>
                      <div className="text-xs text-neutral-700">CDN</div>
                    </CardContent>
                  </Card>
                  <Card className="border-0 bg-white/80 backdrop-blur">
                    <CardContent className="p-4 text-center">
                      <Target className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                      <div className="text-sm font-medium text-neutral-900">ISO 27001</div>
                      <div className="text-xs text-neutral-700">Certificado</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu comunidad?
          </h2>
          <p className="text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
            Únete a cientos de organizaciones que ya confían en nuestra plataforma para gestionar sus comunidades de manera eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">
                Comenzar Demo Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-neutral-900" asChild>
              <Link href="/contact">Hablar con un Experto</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 