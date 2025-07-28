'use client';

import { Button } from '@/components/ui/button';
import { Building2, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useConfig } from '@/hooks/useConfig';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { config, loading } = useConfig();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Funcionalidades', href: '/demo' },
    { name: 'Precios', href: '/pricing' },
    { name: 'Contacto', href: '/contact' },
  ];

  // Valor por defecto para el nombre de la organización
  const organizationName = config?.organization?.name || 'CommunityOS';

  return (
    <>
      {/* Banner editorial */}
      <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-7 h-7 bg-neutral-700 rounded-lg flex items-center justify-center shadow-sm">
                <Building2 className="h-4 w-4 text-neutral-200" />
              </div>
              <span className="text-neutral-100 text-base font-serif font-semibold tracking-wide">
                Demo Funcional - CommunityOS
              </span>
            </div>
            <div className="text-neutral-200 text-sm font-serif font-medium bg-neutral-800 px-4 py-2 rounded-full">
              Versión de demostración
            </div>
          </div>
        </div>
      </div>

      {/* Navegación principal - Editorial */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center space-x-5">
              <Link href="/" className="flex items-center space-x-5 group">
                <div className="w-12 h-12 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-xl flex items-center justify-center group-hover:from-neutral-800 group-hover:to-neutral-700 transition-all duration-300 shadow-md group-hover:shadow-lg">
                  <Building2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-serif font-black text-neutral-900 group-hover:text-neutral-700 transition-colors duration-300 tracking-tight">
                  {organizationName}
                </span>
              </Link>
            </div>

            {/* Navegación desktop */}
            <div className="hidden md:flex items-center space-x-12">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-700 hover:text-neutral-900 font-serif font-semibold transition-all duration-300 relative group text-lg tracking-wide hover:scale-105"
                >
                  {item.name}
                  <span className="absolute -bottom-3 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300 rounded-full shadow-sm"></span>
                </Link>
              ))}
            </div>

            {/* Botones de acción */}
            <div className="hidden md:flex items-center space-x-5">
              <Button variant="ghost" size="lg" asChild className="hover:bg-gradient-to-r hover:from-neutral-100 hover:to-neutral-200">
                <Link href="/login" className="text-lg font-serif font-semibold">Iniciar Sesión</Link>
              </Button>
              <Button variant="editorial" size="lg" asChild className="shadow-lg hover:shadow-xl">
                <Link href="/dashboard" className="text-lg font-serif font-semibold group">
                  Explorar Demo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>

            {/* Botón móvil */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-3"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-neutral-700 hover:text-neutral-900 font-serif font-semibold text-lg py-3 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-neutral-200 space-y-4">
                <Button variant="ghost" size="lg" asChild className="w-full justify-start text-lg font-serif font-semibold">
                  <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button variant="editorial" size="lg" asChild className="w-full justify-start text-lg font-serif font-semibold">
                  <Link href="/dashboard">
                    Explorar Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
} 