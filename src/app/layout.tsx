import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast';
import { FontLoader } from '@/components/ui/FontLoader';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CommunityOS - Gestión Inteligente para Comunidades',
  description: 'Plataforma SaaS completa para la gestión de asociaciones, gremios y comunidades. Reduce costos operativos y aumenta la retención de miembros.',
  keywords: 'gestión de comunidades, asociaciones, gremios, SaaS, CRM, eventos, pagos, votaciones',
  authors: [{ name: 'CommunityOS Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CommunityOS - Gestión Inteligente para Comunidades',
    description: 'Plataforma SaaS completa para la gestión de asociaciones, gremios y comunidades.',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CommunityOS - Gestión Inteligente para Comunidades',
    description: 'Plataforma SaaS completa para la gestión de asociaciones, gremios y comunidades.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning={true}>
        <FontLoader />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
