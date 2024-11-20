"use client"
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { EstudiantesProvider } from '@/lib/StudentsContext';
import localFont from "next/font/local";
import { usePathname } from 'next/navigation';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith('/detail/')

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isDetailPage ? (
          <>{children}</>
        ) : (
          <EstudiantesProvider>
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              {children}
            </div>
          </EstudiantesProvider>
        )}
        <Toaster />
      </body>
    </html>
  );
}