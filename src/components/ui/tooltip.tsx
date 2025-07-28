import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  className?: string;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, side = 'top', align = 'center', className }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const getPositionStyles = () => {
      const baseStyles = 'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-neutral-900 rounded shadow-lg whitespace-nowrap';
      
      switch (side) {
        case 'top':
          return `${baseStyles} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
        case 'bottom':
          return `${baseStyles} top-full left-1/2 transform -translate-x-1/2 mt-2`;
        case 'left':
          return `${baseStyles} right-full top-1/2 transform -translate-y-1/2 mr-2`;
        case 'right':
          return `${baseStyles} left-full top-1/2 transform -translate-y-1/2 ml-2`;
        default:
          return `${baseStyles} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {isVisible && (
          <div
            className={cn(
              getPositionStyles(),
              'animate-in fade-in-0 zoom-in-95 duration-200'
            )}
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';

export { Tooltip }; 