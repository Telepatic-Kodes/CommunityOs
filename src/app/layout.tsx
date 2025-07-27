import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIAIAI CommunityOS - Gestión de Comunidades",
  description: "Plataforma SaaS para asociaciones, gremios y comunidades de Latinoamérica",
  keywords: "comunidades, asociaciones, gremios, gestión, latinoamérica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verificar si las variables de entorno están configuradas
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.warn('⚠️ Clerk no está configurado. Las variables de entorno no están definidas.');
    return (
      <html lang="es">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-black`}
        >
          <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  ⚠️ Configuración Requerida
                </h1>
                <p className="text-gray-600 mb-4">
                  Clerk no está configurado. Por favor, configura las variables de entorno:
                </p>
                <div className="bg-gray-100 p-4 rounded-md text-left text-sm font-mono">
                  <p className="mb-2">Crea un archivo <code>.env.local</code> con:</p>
                  <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...</p>
                  <p>CLERK_SECRET_KEY=sk_test_...</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Consulta <code>CLERK_SETUP.md</code> para instrucciones detalladas.
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-black`}
      >
        <ClerkProvider
          publishableKey={publishableKey}
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: '#3B82F6',
              colorBackground: '#ffffff',
              colorText: '#1f2937',
              colorTextSecondary: '#6b7280',
              borderRadius: '0.5rem',
            },
            elements: {
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
              card: 'bg-white shadow-lg border border-gray-200',
              headerTitle: 'text-gray-900',
              headerSubtitle: 'text-gray-600',
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
