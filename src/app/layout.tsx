import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import { ClerkProvider } from '@clerk/nextjs';
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
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-black`}
      >
        {/* <ClerkProvider> */}
          {children}
        {/* </ClerkProvider> */}
      </body>
    </html>
  );
}
