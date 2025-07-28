'use client';

import { useEffect } from 'react';

export function FontLoader() {
  useEffect(() => {
    // Cargar fuentes de manera optimizada
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    link.media = 'print';
    
    link.onload = () => {
      link.media = 'all';
    };
    
    document.head.appendChild(link);
    
    return () => {
      // Cleanup si es necesario
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return null;
} 