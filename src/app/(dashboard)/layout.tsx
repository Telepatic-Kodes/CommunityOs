'use client';

import { UserButton, useUser, useOrganization, useAuth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Vote, 
  BarChart3, 
  Bell, 
  Settings, 
  Building2,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { redirect } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Building2 },
  { name: 'Miembros', href: '/members', icon: Users },
  { name: 'Eventos', href: '/events', icon: Calendar },
  { name: 'Pagos', href: '/payments', icon: DollarSign },
  { name: 'Votaciones', href: '/voting', icon: Vote },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Notificaciones', href: '/notifications', icon: Bell },
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const { organization } = useOrganization();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { config } = useConfig();

  // Redirigir si no está autenticado
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/auth/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Acceso Requerido</h2>
            <p className="text-gray-600 text-center mb-6">
              Necesitas iniciar sesión para acceder a esta página.
            </p>
            <div className="flex gap-4">
              <Button className="flex-1" asChild>
                <Link href="/auth/sign-in">Iniciar Sesión</Link>
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/auth/sign-up">Registrarse</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para móviles */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <h1 className="text-lg font-semibold">{config.organization.name}</h1>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b">
            <h1 className="text-lg font-semibold">{config.organization.name}</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="ml-4 lg:ml-0">
                <h2 className="text-lg font-medium">
                  {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                </h2>
                {organization && (
                  <p className="text-sm text-gray-500">{organization.name}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </header>

        {/* Contenido de la página */}
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 