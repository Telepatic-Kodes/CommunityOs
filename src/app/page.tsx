import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, TrendingUp, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-black" />
            <h1 className="text-2xl font-bold text-black">CommunityOS</h1>
          </div>
          <div className="flex items-center space-x-4">
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
            La plataforma SaaS que revoluciona la gestión de asociaciones, gremios y comunidades 
            en Latinoamérica. Reduce costos operativos en 30% y aumenta la retención de socios.
          </p>
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
            Diseñado específicamente para las necesidades de organizaciones latinoamericanas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-black mb-4" />
              <CardTitle>CRM & Onboarding</CardTitle>
              <CardDescription>
                Gestión completa de miembros con perfiles personalizados y onboarding automatizado
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-black mb-4" />
              <CardTitle>Membresías & Cobros</CardTitle>
              <CardDescription>
                Sistema de pagos local con boleta electrónica y gestión de morosidad
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-12 w-12 text-black mb-4" />
              <CardTitle>Portal Miembro</CardTitle>
              <CardDescription>
                Feed interactivo, foros y eventos para aumentar el engagement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-black mb-4" />
              <CardTitle>Gobernanza</CardTitle>
              <CardDescription>
                Votaciones digitales, actas PDF y trazabilidad completa
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-black mb-4" />
              <CardTitle>Analytics 360°</CardTitle>
              <CardDescription>
                Dashboards con métricas clave: MAU, MRR, churn y recomendaciones
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-black mb-4" />
              <CardTitle>Automation Hub</CardTitle>
              <CardDescription>
                Workflows no-code conectando CRM, Slack/WhatsApp y BI
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">30%</div>
              <div className="text-gray-600">Reducción en costos operativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">+15%</div>
              <div className="text-gray-600">Aumento en retención de socios</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">60%</div>
              <div className="text-gray-600">Aceleración en time-to-value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">CommunityOS</span>
          </div>
          <p className="text-gray-400 mb-4">
            Plataforma SaaS para asociaciones, gremios y comunidades de Latinoamérica
          </p>
          <div className="text-sm text-gray-500">
            © 2025 AIAIAI Consulting. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
