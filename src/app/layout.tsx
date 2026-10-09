import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { SiteHeader } from '@/components/SiteHeader';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURÈLE | Premium Salon',
  description: 'A premium cinematic salon experience.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans bg-[#FAF7F2] text-[#1A1A1A]">
        <SmoothScrollProvider>
          <CustomCursor />
          <SiteHeader />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
