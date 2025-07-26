export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Explora AIAIAI CommunityOS
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Descubre cómo nuestra plataforma revoluciona la gestión de asociaciones y comunidades en Latinoamérica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
                Ver Demo Completo
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium">
                Solicitar Demo Personalizado
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">162</div>
              <div className="text-sm text-gray-600 mb-1">Miembros Activos</div>
              <div className="text-sm text-green-600 font-medium">+12%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">$3.8M</div>
              <div className="text-sm text-gray-600 mb-1">Ingresos Mensuales</div>
              <div className="text-sm text-green-600 font-medium">+8.5%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">78%</div>
              <div className="text-sm text-gray-600 mb-1">Participación Eventos</div>
              <div className="text-sm text-green-600 font-medium">+5.2%</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black mb-2">71%</div>
              <div className="text-sm text-gray-600 mb-1">Participación Votaciones</div>
              <div className="text-sm text-green-600 font-medium">+3.1%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Funcionalidades Principales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Una plataforma completa que cubre todas las necesidades de gestión de comunidades
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Gestión de Miembros</h3>
              <p className="text-gray-600 mb-4">CRM completo para gestionar socios, roles y estados</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Registro y onboarding de miembros</li>
                <li>• Gestión de roles y permisos</li>
                <li>• Estados de membresía</li>
                <li>• Búsqueda y filtros avanzados</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Sistema de Pagos</h3>
              <p className="text-gray-600 mb-4">Gestión completa de cuotas y múltiples métodos de pago</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Múltiples métodos de pago</li>
                <li>• Recordatorios automáticos</li>
                <li>• Reportes financieros</li>
                <li>• Integración con APIs locales</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Portal de Eventos</h3>
              <p className="text-gray-600 mb-4">Creación y gestión de eventos con inscripciones</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Creación de eventos</li>
                <li>• Sistema de inscripciones</li>
                <li>• Gestión de capacidad</li>
                <li>• Recordatorios automáticos</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Votaciones Digitales</h3>
              <p className="text-gray-600 mb-4">Sistema de gobernanza digital con diferentes tipos de voto</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Diferentes tipos de votación</li>
                <li>• Resultados en tiempo real</li>
                <li>• Trazabilidad completa</li>
                <li>• Participación automática</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Analytics Avanzado</h3>
              <p className="text-gray-600 mb-4">Métricas detalladas y reportes con gráficos interactivos</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Dashboard de métricas</li>
                <li>• Gráficos interactivos</li>
                <li>• Reportes personalizables</li>
                <li>• Insights automáticos</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold mb-2">Sistema de Notificaciones</h3>
              <p className="text-gray-600 mb-4">Comunicación en tiempo real con configuración personalizada</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Notificaciones en tiempo real</li>
                <li>• Configuración granular</li>
                <li>• Horas de silencio</li>
                <li>• Múltiples canales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para revolucionar tu comunidad?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a las organizaciones que ya están transformando su gestión con AIAIAI CommunityOS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-lg font-medium">
              Comenzar Gratis
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-medium">
              Contactar Ventas
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 