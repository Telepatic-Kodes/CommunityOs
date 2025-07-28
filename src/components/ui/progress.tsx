import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, size = 'md', variant = 'default', ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4'
    };

    const variants = {
      default: 'bg-neutral-900',
      success: 'bg-green-600',
      warning: 'bg-yellow-600',
      danger: 'bg-red-600'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full overflow-hidden rounded-full bg-neutral-100 shadow-inner',
          sizes[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 transition-all duration-500 ease-out shadow-sm',
            variants[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress }; 