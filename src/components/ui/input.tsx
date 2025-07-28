import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Componente Input del design system - Estilo Editorial
 */

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-serif ring-offset-white file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-neutral-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-600 focus-visible:ring-offset-2 focus-visible:border-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300', // MEJORADO: placeholder:text-neutral-600 y focus-visible:ring-neutral-600 para mejor contraste
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input }; 