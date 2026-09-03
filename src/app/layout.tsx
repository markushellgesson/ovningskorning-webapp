import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BottomNav } from '@/components/nav/bottom-nav';

export const metadata: Metadata = {
  title: {
    template: '%s – Övningskörning B',
    default: 'Övningskörning B',
  },
  description: 'Stöd för privat övningskörning till B-körkort — lokal variant utan konto.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // ALDRIG maximumScale eller userScalable: false — bryter WCAG (ux-spec 9.1)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="antialiased">
      <body className="flex min-h-dvh flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
