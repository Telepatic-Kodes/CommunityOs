'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  Vote, 
  Target, 
  Settings, 
  Bell, 
  BarChart3, 
  Zap,
  Activity,
  Menu,
  X,
  ChevronRight,
  Home,
  User,
  LogOut,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DashboardLayout } from '@/components/ui/dashboard-layout';
import { SidebarItem } from '@/components/ui/sidebar';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { FullScreenLoading } from '@/components/ui/loading';
import { useConfig } from '@/hooks/useConfig';

const navigation: SidebarItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Miembros', href: '/members', icon: Users },
  { title: 'Eventos', href: '/events', icon: Calendar },
  { title: 'Pagos', href: '/payments', icon: DollarSign },
  { title: 'Votaciones', href: '/voting', icon: Vote },
  { title: 'Iniciativas', href: '/initiatives', icon: Target },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Reportes', href: '/report', icon: BarChart3 },
  { title: 'Performance', href: '/performance', icon: Activity }, // ✅ AGREGADO
  { title: 'Integraciones', href: '/integrations', icon: Zap },
  { title: 'Notificaciones', href: '/notifications', icon: Bell },
  { title: 'Configuración', href: '/settings', icon: Settings },
];

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { config, loading, error } = useConfig();
  const [mounted, setMounted] = useState(false);

  // Manejar hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  // Obtener el título de la página actual
  const getPageTitle = () => {
    const currentNav = navigation.find(item => item.href === pathname);
    return currentNav?.title || 'Dashboard';
  };

  // Crear breadcrumbs
  const breadcrumbs = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: getPageTitle(), href: pathname }
  ];

  // Mostrar estado de carga
  if (!mounted || loading) {
    return <FullScreenLoading text="Cargando aplicación..." />;
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Error al cargar la aplicación</h2>
          <p className="text-neutral-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout
        sidebarItems={navigation}
        headerProps={{
          title: getPageTitle(),
          showSearch: true,
          showNotifications: true
        }}
      >
        {children}
      </DashboardLayout>
    </ErrorBoundary>
  );
} 