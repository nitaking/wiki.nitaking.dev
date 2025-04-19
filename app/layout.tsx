import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import {Metadata} from "next";

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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
