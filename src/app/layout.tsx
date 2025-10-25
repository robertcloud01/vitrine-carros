import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn, generateWhatsAppUrl } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SessionProvider from '@/components/providers/SessionProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VitrineLux - Veículos Premium de Alto Padrão',
  description: 'Curadoria de veículos premium. Inspeção técnica. Atendimento boutique. Dirija o futuro com VitrineLux.',
  keywords: ['veículos premium', 'carros de luxo', 'concessionária', 'alto padrão', 'curadoria automotiva'],
  authors: [{ name: 'VitrineLux' }],
  creator: 'VitrineLux',
  publisher: 'VitrineLux',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vitrinelux.com.br'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'VitrineLux - Veículos Premium de Alto Padrão',
    description: 'Curadoria de veículos premium. Inspeção técnica. Atendimento boutique.',
    url: 'https://vitrinelux.com.br',
    siteName: 'VitrineLux',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VitrineLux - Veículos Premium',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VitrineLux - Veículos Premium de Alto Padrão',
    description: 'Curadoria de veículos premium. Inspeção técnica. Atendimento boutique.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn(inter.variable, playfair.variable)}>
      <body className={cn(
        'min-h-screen bg-primary-black font-sans antialiased',
        'text-primary-white selection:bg-primary-gold selection:text-primary-black'
      )}>
        <SessionProvider>
          <Header />
          {children}
          {/* Botão flutuante global do WhatsApp */}
          <a
            href={generateWhatsAppUrl('11999999999', 'Olá! Gostaria de mais informações sobre os veículos da VitrineLux.')}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-4 right-4 z-50 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2"
            aria-label="Falar no WhatsApp"
          >
            <span>💬</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
