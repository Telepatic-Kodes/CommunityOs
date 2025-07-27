import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilidad para combinar clases de Tailwind de forma segura
 * Evita conflictos y duplicados en las clases CSS
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea fechas en formato legible
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Formatea moneda según la configuración regional
 */
export function formatCurrency(amount: number, currency: string = 'CLP'): string {
  const currencyConfigs: Record<string, { locale: string; currency: string }> = {
    'CLP': { locale: 'es-CL', currency: 'CLP' },
    'USD': { locale: 'en-US', currency: 'USD' },
    'EUR': { locale: 'es-ES', currency: 'EUR' },
    'BRL': { locale: 'pt-BR', currency: 'BRL' },
    'MXN': { locale: 'es-MX', currency: 'MXN' },
  };

  const config = currencyConfigs[currency] || currencyConfigs['CLP'];
  
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Genera un slug a partir de un texto
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitaliza la primera letra de cada palabra
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
} 