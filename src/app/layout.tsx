import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CommunityOS - Gestión de Comunidades",
  description: "Plataforma SaaS para asociaciones, gremios y comunidades de Latinoamérica",
  keywords: "comunidades, asociaciones, gremios, gestión, latinoamérica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-black`}
        suppressHydrationWarning={true}
      >
        <div className="min-h-screen">
          {/* Banner de demo */}
          <div className="bg-blue-100 border-b border-blue-200 px-4 py-2">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-800 text-sm font-medium">
                  🎯 Demo Funcional - CommunityOS
                </span>
              </div>
              <div className="text-blue-700 text-xs">
                Versión de demostración con datos simulados
              </div>
            </div>
          </div>
          
          {/* Navegación principal */}
          <Navigation />
          
          {children}
        </div>
      </body>
    </html>
  );
}
