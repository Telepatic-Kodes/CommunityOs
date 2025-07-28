'use client';

import { useState, useEffect, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoader({ 
  children, 
  fallback = <Loader2 className="h-6 w-6 animate-spin" />,
  threshold = 0.1,
  rootMargin = '50px'
}: LazyLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const element = document.getElementById('lazy-loader');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  if (!isVisible) {
    return (
      <div id="lazy-loader" className="flex items-center justify-center p-8">
        {fallback}
      </div>
    );
  }

  return (
    <Suspense fallback={fallback}>
      <div onLoad={() => setHasLoaded(true)}>
        {children}
      </div>
    </Suspense>
  );
}

// Componente para lazy loading de imágenes
export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.svg' 
}: {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };
    img.onerror = () => {
      setImageSrc(placeholder);
      setIsLoading(false);
    };
  }, [src, placeholder]);

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
}

// Componente para lazy loading de componentes
export function LazyComponent({ 
  component: Component, 
  props = {},
  fallback = <Loader2 className="h-6 w-6 animate-spin" />
}: {
  component: React.ComponentType<any>;
  props?: any;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
} 