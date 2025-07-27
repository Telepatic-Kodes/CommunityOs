'use client';

import Link from 'next/link';

export function DevNavigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                CommunityOS
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                📊 Dashboard
              </Link>
              <Link href="/members" className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                👥 Miembros
              </Link>
              <Link href="/events" className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                📅 Eventos
              </Link>
              <Link href="/payments" className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700">
                💳 Pagos
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              Modo Demo
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
} 