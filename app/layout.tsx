import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';
import { Agentation } from 'agentation';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
    title: {
        default: 'wiki.nitaking dev | Personal wiki',
        template: '%s | nitaking.dev'
    },
    description: "Satoshi Nitawaki's Personal Wiki",
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Script
          src="https://tinylytics.app/embed/U9qfcSxsEP_izZvF-UUN.js"
          strategy="afterInteractive"
        />
        <RootProvider>{children}</RootProvider>
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
