'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbProps {
  className?: string;
  items?: Array<{
    label: string;
    href: string;
  }>;
}

export function Breadcrumb({ className, items }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generar breadcrumbs automáticamente si no se proporcionan items
  const generateBreadcrumbs = () => {
    if (items) return items;

    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [
      { label: 'Inicio', href: '/' }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapear segmentos a nombres legibles
      const label = getSegmentLabel(segment);
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const getSegmentLabel = (segment: string): string => {
    const labels: Record<string, string> = {
      'dashboard': 'Dashboard',
      'members': 'Miembros',
      'events': 'Eventos',
      'payments': 'Pagos',
      'analytics': 'Analytics',
      'notifications': 'Notificaciones',
      'settings': 'Configuración',
      'voting': 'Votaciones',
      'initiatives': 'Iniciativas',
      'integrations': 'Integraciones',
      'demo': 'Demo',
      'portal': 'Portal',
      'report': 'Reporte'
    };

    return labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 text-sm', className)}>
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li key={`breadcrumb-${index}-${item.href}`} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-neutral-600 mr-2" aria-hidden="true" />
              )}
              
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-neutral-900 font-semibold font-serif" // MEJORADO: font-semibold para mejor legibilidad
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-neutral-700 hover:text-neutral-900 transition-colors duration-200 font-serif"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Componentes adicionales para uso más granular
export function BreadcrumbItem({ children, href, isCurrent = false }: {
  children: React.ReactNode;
  href?: string;
  isCurrent?: boolean;
}) {
  if (isCurrent) {
    return (
      <span aria-current="page" className="text-neutral-900 font-medium">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href || '#'}
      className="text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
  return (
    <ChevronRight 
      className={`h-4 w-4 text-neutral-600 ${className}`}
      aria-hidden="true" 
    />
  );
} 