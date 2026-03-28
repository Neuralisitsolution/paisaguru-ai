import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export const metadata: Metadata = {
  title: {
    default: 'PaisaGuru - India\'s #1 Personal Finance Guide | Tax, Investment, Insurance',
    template: '%s | PaisaGuru',
  },
  description: 'Free financial calculators, expert articles, and AI-powered advice for Indian investors. Income tax calculator, SIP calculator, EMI calculator, and more.',
  keywords: ['personal finance India', 'income tax calculator', 'SIP calculator', 'EMI calculator', 'tax saving', 'mutual funds India', 'insurance India'],
  authors: [{ name: 'PaisaGuru Team' }],
  creator: 'PaisaGuru',
  publisher: 'PaisaGuru',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'PaisaGuru',
    title: 'PaisaGuru - India\'s #1 Personal Finance Guide',
    description: 'Free financial calculators, expert articles, and AI-powered advice for Indian investors.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'PaisaGuru' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PaisaGuru - India\'s #1 Personal Finance Guide',
    description: 'Free financial calculators, expert articles, and AI-powered advice for Indian investors.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'PaisaGuru',
              url: 'https://paisaguru.com',
              logo: 'https://paisaguru.com/logo.png',
              description: 'India\'s trusted personal finance guide with free calculators and expert advice.',
              foundingDate: '2024',
              sameAs: [
                'https://twitter.com/paisaguru',
                'https://facebook.com/paisaguru',
                'https://linkedin.com/company/paisaguru',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@paisaguru.com',
                contactType: 'customer service',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
