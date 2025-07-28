import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'glass' | 'editorial';
  hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, ...props }, ref) => {
    const baseStyles = 'rounded-xl sm:rounded-2xl transition-all duration-500 font-serif';
    
    const variants = {
      default: 'bg-white border border-neutral-200 shadow-sm hover:shadow-md',
      elevated: 'bg-white border border-neutral-200 shadow-md hover:shadow-lg',
      bordered: 'bg-white border-2 border-neutral-300 shadow-sm hover:shadow-md',
      glass: 'bg-white/90 backdrop-blur-sm border border-white/30 shadow-md hover:shadow-lg',
      editorial: 'bg-white border border-neutral-200 shadow-md hover:shadow-xl hover:-translate-y-1'
    };

    const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          hoverStyles,
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 p-4 sm:p-6 md:p-8', className)}
      {...props}
    />
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg sm:text-xl md:text-2xl font-bold leading-tight tracking-wide text-neutral-900', className)}
      {...props}
    />
  )
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm sm:text-base md:text-lg text-neutral-700 font-medium leading-relaxed', className)}
      {...props}
    />
  )
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-4 sm:p-6 md:p-8 pt-0', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-4 sm:p-6 md:p-8 pt-0', className)}
      {...props}
    />
  )
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 