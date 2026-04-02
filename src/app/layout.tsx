import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: {
    default: 'Seguro Comp — интернет-магазин электроники в Казахстане',
    template: '%s | Seguro Comp'
  },
  description: 'Ноутбуки, комплектующие, серверное оборудование и аксессуары с актуальными ценами в тенге.',
  openGraph: {
    title: 'Seguro Comp',
    description: 'Современный магазин электроники Seguro Comp',
    type: 'website'
  },
  metadataBase: new URL('https://seguro-comp.kz')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="min-h-[70vh] py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
