import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/providers/Providers';
import Navbar from '@/components/layout/Navbar';
import { env } from '@/lib/config/env';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

const APP_BASE_URL = new URL(env.NEXT_PUBLIC_APP_BASE_URL);

export const metadata: Metadata = {
  metadataBase: APP_BASE_URL,
  title: {
    template: '%s | Alchemy Pay test',
    default: 'Alchemy Pay test'
  },
  description: 'description',
  applicationName: 'Alchemy Pay test',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} h-dvh`}>
        <Providers>
          <div className='flex flex-col h-full bg-neutral-300'>
            <Navbar />
            <div className='flex-1 bg-neutral-500'>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
