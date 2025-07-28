import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const baseStyles = 'shrink-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200';
    
    const orientations = {
      horizontal: 'h-0.5 w-full',
      vertical: 'h-full w-0.5'
    };

    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={cn(
          baseStyles,
          orientations[orientation],
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator }; 