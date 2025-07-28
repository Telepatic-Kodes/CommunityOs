import * as React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'editorial';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  asChild?: boolean;
  icon?: LucideIcon;
  loading?: boolean;
  pressed?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md', 
    asChild = false, 
    icon: Icon,
    loading = false,
    pressed = false,
    fullWidth = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed touch-target relative overflow-hidden';
    
    const variants = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-500 shadow-md hover:shadow-lg active:bg-neutral-700 hover:scale-105 transition-all duration-300',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg active:bg-red-800 hover:scale-105 transition-all duration-300',
      outline: 'border-2 border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400 focus:ring-neutral-500 active:bg-neutral-100 hover:scale-105 transition-all duration-300',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500 active:bg-neutral-300 hover:scale-105 transition-all duration-300',
      ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:ring-neutral-500 active:bg-neutral-200 hover:scale-105 transition-all duration-300',
      link: 'text-neutral-900 underline-offset-4 hover:underline hover:text-neutral-700 focus:ring-neutral-500 transition-all duration-300',
      editorial: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg active:bg-blue-800 hover:scale-105 transition-all duration-300'
    };

    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      xl: 'h-14 px-8 text-xl'
    };

    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-7 w-7'
    };

    const iconSpacing = {
      sm: 'mr-2',
      md: 'mr-2.5',
      lg: 'mr-3',
      xl: 'mr-3.5'
    };

    // Clases para microinteracciones
    const interactionClasses = pressed ? 'scale-95' : 'hover:scale-105 active:scale-95';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          interactionClasses,
          widthClass,
          className
        )}
        disabled={disabled || loading}
        aria-pressed={pressed}
        aria-busy={loading}
        {...props}
      >
        {/* Ripple effect para feedback táctil */}
        <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 active:opacity-20 transition-opacity duration-200 rounded-lg" />
        
        {/* Loading spinner */}
        {loading && (
          <div className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', iconSizes[size], iconSpacing[size])} />
        )}
        
        {/* Icono */}
        {Icon && !loading && (
          <Icon className={cn(iconSizes[size], iconSpacing[size])} aria-hidden="true" />
        )}
        
        {/* Contenido */}
        <span className="relative z-10 font-semibold">{children}</span>
        
        {/* Focus ring personalizado */}
        <span className="absolute inset-0 rounded-lg ring-2 ring-transparent focus-within:ring-neutral-500 focus-within:ring-offset-2 transition-all duration-200" />
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button }; 