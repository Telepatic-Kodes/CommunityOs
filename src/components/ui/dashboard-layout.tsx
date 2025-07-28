import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarItem } from './sidebar';
import { Header, HeaderProps } from './header';

export interface DashboardLayoutProps {
  sidebarItems: SidebarItem[];
  headerProps?: Omit<HeaderProps, 'onMenuClick'>;
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout = React.forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({ sidebarItems, headerProps, children, className }, ref) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    // Manejar hidratación
    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Mostrar estado de carga si no está montado
    if (!mounted) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Cargando...</p>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex h-screen bg-neutral-50 font-serif', className)}
      >
        {/* Sidebar - Optimizado para móvil */}
        <div className={cn(
          'fixed inset-y-0 left-0 z-50 w-80 sm:w-72 transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0 mobile-sidebar',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <Sidebar items={sidebarItems} />
        </div>

        {/* Overlay para móvil - Mejorado */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Contenido principal - Responsive */}
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          {/* Header - Optimizado para móvil */}
          <Header
            {...headerProps}
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          />

          {/* Contenido - Responsive con padding adaptativo */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12 bg-gradient-to-br from-neutral-50 to-white">
            <div className="max-w-7xl mx-auto w-full">
              {/* Contenedor responsive para el contenido */}
              <div className="mobile-optimized">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

export { DashboardLayout }; 