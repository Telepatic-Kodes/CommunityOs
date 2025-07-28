'use client';

import { useEffect, useRef, useState } from 'react';

// Hook para optimizar animaciones
export function useOptimizedAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Detectar preferencias de reducción de movimiento
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreference = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    setShouldAnimate(!mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMotionPreference);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  // Función para animación optimizada
  const animate = (callback: () => void, duration: number = 300) => {
    if (!shouldAnimate) {
      callback();
      return;
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      callback();
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return { shouldAnimate, animate };
}

// Hook para optimizar scroll
export function useOptimizedScroll() {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}

// Hook para optimizar resize
export function useOptimizedResize() {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const ticking = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
          });
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}

// Hook para optimizar intersection observer
export function useOptimizedIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options, hasIntersected]);

  return { elementRef, isIntersecting, hasIntersected };
}

// Hook para optimizar debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook para optimizar throttle
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRun = useRef<number>(0);

  useEffect(() => {
    const now = Date.now();
    if (now - lastRun.current >= delay) {
      setThrottledValue(value);
      lastRun.current = now;
    } else {
      const handler = setTimeout(() => {
        setThrottledValue(value);
        lastRun.current = Date.now();
      }, delay - (now - lastRun.current));

      return () => clearTimeout(handler);
    }
  }, [value, delay]);

  return throttledValue;
} 