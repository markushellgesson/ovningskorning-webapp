import type { Metadata, Viewport } from 'next';
import './globals.css';
import { familjenGrotesk } from './fonts';
import { BottomNav } from '@/components/nav/bottom-nav';
import { ServiceWorkerRegister } from '@/components/pwa/service-worker-register';
import { BASE_PATH } from '@/lib/base-path';

export const metadata: Metadata = {
  title: {
    template: '%s – Övningskörning B',
    default: 'Övningskörning B',
  },
  description: 'Stöd för privat övningskörning till B-körkort — lokal variant utan konto.',
  manifest: `${BASE_PATH}/manifest.webmanifest`,
  icons: {
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  appleWebApp: {
    // iOS läser inte manifest.webmanifest för installerbarhet — dessa
    // metataggar är det Safari faktiskt tittar på.
    capable: true,
    statusBarStyle: 'default',
    title: 'Övningskörning',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // ALDRIG maximumScale eller userScalable: false — bryter WCAG (ux-spec 9.1)
  themeColor: [
    // Matchar --ground i globals.css för respektive färgläge (vägren
    // respektive asfalt), så att systemfältet (statusbar/adressfält)
    // smälter in i appen i stället för att sticka ut som en egen list.
    { media: '(prefers-color-scheme: light)', color: '#f3f1ea' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1318' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${familjenGrotesk.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <ServiceWorkerRegister />
        <div className="flex flex-1 flex-col">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
