import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 font-serif';
    
    const variants = {
      default: 'bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-500 shadow-sm',
      secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500 border border-neutral-200',
      outline: 'border-2 border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-50 focus:ring-neutral-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
      success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm',
      warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 shadow-sm'
    };

    const sizes = {
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-5 py-2 text-base'
    };

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge }; 