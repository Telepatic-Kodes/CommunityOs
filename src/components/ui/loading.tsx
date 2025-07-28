import React from 'react';
import { Loader2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'pulse' | 'dots' | 'spinner';
  className?: string;
}

export function Loading({ 
  size = 'md', 
  text = 'Cargando...', 
  variant = 'spinner',
  className 
}: LoadingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const renderSpinner = () => (
    <Loader2 className={cn('animate-spin', sizes[size])} />
  );

  const renderPulse = () => (
    <div className={cn('animate-pulse bg-neutral-300 rounded-full', sizes[size])} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );

  const renderZap = () => (
    <Zap className={cn('animate-pulse text-blue-500', sizes[size])} />
  );

  const renderIcon = () => {
    switch (variant) {
      case 'pulse':
        return renderPulse();
      case 'dots':
        return renderDots();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4', className)}>
      {renderIcon()}
      {text && (
        <p className={cn('text-neutral-600 font-medium', textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  );
}

// Componente de carga para pantalla completa
export function FullScreenLoading({ 
  text = 'Cargando aplicación...',
  variant = 'spinner'
}: Omit<LoadingProps, 'size'>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center">
        <Loading size="xl" text={text} variant={variant} />
      </div>
    </div>
  );
}

// Componente de carga para componentes
export function ComponentLoading({ 
  text = 'Cargando...',
  variant = 'spinner'
}: Omit<LoadingProps, 'size'>) {
  return (
    <div className="flex items-center justify-center p-8">
      <Loading size="md" text={text} variant={variant} />
    </div>
  );
}

// Componente de carga para botones
export function ButtonLoading({ 
  text = 'Cargando...',
  variant = 'spinner'
}: Omit<LoadingProps, 'size'>) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <Loading size="sm" text="" variant={variant} />
      {text && <span className="text-sm">{text}</span>}
    </div>
  );
}

// Componente de skeleton para contenido
export function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-neutral-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-3 bg-neutral-200 rounded"></div>
          <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-3 bg-neutral-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
}

// Componente de skeleton para tablas
export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-4 bg-neutral-200 rounded"></div>
            <div className="h-4 bg-neutral-200 rounded"></div>
          </div>
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 border-b border-neutral-100 last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Componente de skeleton para KPIs
export function SkeletonKPI() {
  return (
    <div className="animate-pulse">
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
          <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
        </div>
        <div className="h-8 bg-neutral-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
      </div>
    </div>
  );
} 