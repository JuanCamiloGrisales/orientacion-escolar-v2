"use client";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/detail/");

  return (
    <html lang="es">
      <body className={`antialiased`}>
        {isDetailPage ? (
          <>{children}</>
        ) : (
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            {children}
          </div>
        )}
        <Toaster />
      </body>
    </html>
  );
}
