import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  disabled?: boolean;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ items, className }, ref) => {
    const pathname = usePathname();

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-2 p-4 bg-white border-r border-neutral-200 min-h-screen',
          className
        )}
      >
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-neutral-900 text-white shadow-md hover:bg-neutral-800'
                  : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100',
                item.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent'
              )}
            >
              {/* Background hover effect */}
              <div className="absolute inset-0 bg-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon */}
              <Icon className={cn(
                'h-5 w-5 flex-shrink-0 transition-all duration-300',
                isActive ? 'text-white' : 'text-neutral-600 group-hover:text-neutral-800'
              )} />
              
              {/* Text */}
              <span className="relative z-10 font-semibold text-sm sm:text-base">
                {item.title}
              </span>
              
              {/* Badge */}
              {item.badge && (
                <span className={cn(
                  'ml-auto px-2 py-1 text-xs font-semibold rounded-full',
                  isActive
                    ? 'bg-white text-neutral-900'
                    : 'bg-neutral-200 text-neutral-700 group-hover:bg-neutral-300'
                )}>
                  {item.badge}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar }; 