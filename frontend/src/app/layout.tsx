import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from '@/components/layout/navbar';

import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/providers/theme-provider';

import { Footer } from '@/components/layout/footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prioro",
  description: "AI-powered customer support ticket triage and automation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <Toaster richColors position="top-right" theme="system" />

          <div className="flex min-h-screen flex-col bg-background text-foreground">
  <Navbar />

  <main className="flex-1">
    {children}
  </main>

  <Footer />
</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
