import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Input } from './input';
import { Bell, Search, User, Menu } from 'lucide-react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  onMenuClick?: () => void;
  className?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    title, 
    subtitle, 
    showSearch = false, 
    showNotifications = false, 
    showUserMenu = false,
    onMenuClick,
    className 
  }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'flex items-center justify-between p-4 sm:p-6 bg-white border-b border-neutral-200 shadow-sm',
          className
        )}
      >
        {/* Left side */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Title */}
          {title && (
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm sm:text-base text-neutral-700 font-medium">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search */}
          {showSearch && (
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-10 w-64 sm:w-80 bg-neutral-50 border-neutral-200 focus:bg-white focus:border-neutral-300"
              />
            </div>
          )}

          {/* Notifications */}
          {showNotifications && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
          )}

          {/* User menu */}
          {showUserMenu && (
            <Button variant="ghost" size="sm" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-neutral-600" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-neutral-900">
                Usuario
              </span>
            </Button>
          )}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';

export { Header }; 