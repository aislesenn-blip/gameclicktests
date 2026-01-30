import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import "../globals.css";
import { WEBSITE_SCHEMA } from '@/seo/schema';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages({ locale });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (messages as any).seo;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://palmtweets.com/${locale}`,
      languages: {
        'en': `/en`,
        'pt': `/pt`,
        'id': `/id`,
        'es': `/es`,
        'ru': `/ru`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: 'Palmtweets',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const websiteSchema = WEBSITE_SCHEMA(locale);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (messages as any).nav;
  const currentYear = new Date().getFullYear();

  return (
    <html lang={locale} className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preload" href="/sounds/click.mp3" as="audio" />
      </head>
      <body className={`${inter.variable} font-mono bg-cyber-black text-foreground min-h-screen flex flex-col`}>
        <NextIntlClientProvider messages={messages}>

          {/* Header */}
          <header className="w-full border-b border-neon-green/30 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              <Link href={`/${locale}`} className="text-2xl font-bold text-neon-green tracking-tighter hover:shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-shadow">
                PALMTWEETS
              </Link>
              <nav className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                <Link href={`/${locale}/cps`} className="hover:text-neon-green transition-colors">{t.cps}</Link>
                <Link href={`/${locale}/reaction-time`} className="hover:text-neon-green transition-colors">{t.reaction}</Link>
                <Link href={`/${locale}/typing-test`} className="hover:text-neon-green transition-colors">{t.typing}</Link>
                <Link href={`/${locale}/keyboard-test`} className="hover:text-neon-green transition-colors">{t.keyboard}</Link>
              </nav>
              <div className="flex gap-2 text-xs font-bold">
                {['en', 'pt', 'id', 'es', 'ru'].map(l => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    className={`px-2 py-1 rounded ${locale === l ? 'bg-neon-green text-black' : 'text-gray-500 hover:text-white'}`}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          </header>

          {/* Main Layout */}
          <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 p-4 md:p-8">

            {/* Left Sidebar (Desktop Ad) */}
            <aside className="hidden lg:flex flex-col gap-4 w-[300px] flex-shrink-0 pt-4">
               <div className="sticky top-24">
                  <AdUnit size="sidebar" />
                  <div className="mt-8 p-4 border border-gray-800 rounded bg-gray-900/30">
                    <h3 className="text-neon-green text-sm mb-4 font-bold uppercase">Popular Tools</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li><Link href={`/${locale}/cps/1-second`} className="hover:text-white">1 Second Test</Link></li>
                      <li><Link href={`/${locale}/cps/5-seconds`} className="hover:text-white">5 Seconds Test</Link></li>
                      <li><Link href={`/${locale}/cps/jitter`} className="hover:text-white">Jitter Click</Link></li>
                      <li><Link href={`/${locale}/cps/butterfly`} className="hover:text-white">Butterfly Click</Link></li>
                    </ul>
                  </div>
               </div>
            </aside>

            {/* Content Area */}
            <main className="flex-1 flex flex-col min-w-0">
               {children}
            </main>
          </div>

          {/* Footer */}
          <footer className="border-t border-gray-800 bg-black py-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
              <p>&copy; {currentYear} Palmtweets. The #1 Global Speed Test Platform.</p>
              <div className="mt-4 flex justify-center gap-4">
                <Link href={`/${locale}`} className="hover:text-gray-400">{t.home}</Link>
                <Link href={`/${locale}/cps`} className="hover:text-gray-400">{t.cps}</Link>
                <Link href={`/${locale}/privacy`} className="hover:text-gray-400">{t.privacy}</Link>
              </div>
            </div>
          </footer>

        </NextIntlClientProvider>
      </body>
    </html>
  );
}