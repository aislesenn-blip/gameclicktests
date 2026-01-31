import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import "../globals.css";
import { WEBSITE_SCHEMA } from '@/seo/schema';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';
import MobileNav from '@/components/MobileNav';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { locales } from '@/config/locales';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const messages = await getMessages({ locale });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (messages as any).seo;

  const alternatesLanguages = locales.reduce((acc, l) => {
    acc[l] = `/${l}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `https://palmtweets.com/${locale}`,
      languages: alternatesLanguages,
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tm = (messages as any).mobile_nav;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tf = (messages as any).footer;
  const currentYear = new Date().getFullYear();

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  // Extract menu items for client component to prevent raw keys if hook hydration is slow
  const menuLabels = {
    time_modes: tm.time_modes,
    click_modes: tm.click_modes,
    game_challenges: tm.game_challenges,
    hardware_tests: tm.hardware_tests,
    community: tm.community,
    cps_1s: tm.cps_1s,
    cps_5s: tm.cps_5s,
    cps_10s: tm.cps_10s,
    cps_60s: tm.cps_60s,
    stress: tm.stress,
    jitter: tm.jitter,
    butterfly: tm.butterfly,
    drag: tm.drag,
    spacebar: tm.spacebar,
    combo: tm.combo,
    minecraft: tm.minecraft,
    pubg: tm.pubg,
    roblox: tm.roblox,
    valorant: tm.valorant,
    fortnite: tm.fortnite,
    reaction: tm.reaction,
    typing: tm.typing,
    keyboard: tm.keyboard,
    mouse: tm.mouse,
    dead_pixel: tm.dead_pixel,
    scroll: tm.scroll,
    aim: tm.aim,
    touch_test: tm.touch_test,
    mic_test: tm.mic_test,
    gamepad_test: tm.gamepad_test,
    packet_loss: tm.packet_loss,
    live: tm.live,
    leaderboard: tm.leaderboard
  };

  return (
    <html lang={locale} dir={dir} className="dark">
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

              {/* Desktop Nav */}
              <nav className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
                <Link href={`/${locale}/cps`} className="hover:text-neon-green transition-colors">{t.cps}</Link>
                <Link href={`/${locale}/reaction-time`} className="hover:text-neon-green transition-colors">{t.reaction}</Link>
                <Link href={`/${locale}/typing-test`} className="hover:text-neon-green transition-colors">{t.typing}</Link>
                <Link href={`/${locale}/keyboard-test`} className="hover:text-neon-green transition-colors">{t.keyboard}</Link>
              </nav>

              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                {/* Mobile Nav Toggle */}
                <MobileNav locale={locale} labels={menuLabels} />
              </div>
            </div>
          </header>

          {/* Main Layout */}
          <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 p-4 md:p-8">

            {/* Left Sidebar (Desktop Ad) */}
            <aside className="hidden lg:flex flex-col gap-4 w-[300px] flex-shrink-0 pt-4">
               <div className="sticky top-24">
                  <AdUnit size="sidebar" />

                  <nav className="mt-8 space-y-6 overflow-y-auto max-h-[600px] custom-scrollbar pr-2">

                    <div className="p-4 border border-gray-800 rounded bg-gray-900/30">
                      <h3 className="text-neon-green text-xs mb-3 font-bold uppercase tracking-widest border-b border-gray-800 pb-2">{tm.time_modes}</h3>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/cps/1-second`} className="hover:text-white transition-colors">{tm.cps_1s}</Link></li>
                        <li><Link href={`/${locale}/cps/5-seconds`} className="hover:text-white transition-colors">{tm.cps_5s}</Link></li>
                        <li><Link href={`/${locale}/cps/10-seconds`} className="hover:text-white transition-colors">{tm.cps_10s}</Link></li>
                        <li><Link href={`/${locale}/cps/60-seconds`} className="hover:text-white transition-colors">{tm.cps_60s}</Link></li>
                        <li><Link href={`/${locale}/cps/stress-test`} className="hover:text-white transition-colors">{tm.stress}</Link></li>
                      </ul>
                    </div>

                    <div className="p-4 border border-gray-800 rounded bg-gray-900/30">
                      <h3 className="text-neon-green text-xs mb-3 font-bold uppercase tracking-widest border-b border-gray-800 pb-2">{tm.click_modes}</h3>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/cps/jitter`} className="hover:text-white transition-colors">{tm.jitter}</Link></li>
                        <li><Link href={`/${locale}/cps/butterfly`} className="hover:text-white transition-colors">{tm.butterfly}</Link></li>
                        <li><Link href={`/${locale}/cps/drag`} className="hover:text-white transition-colors">{tm.drag}</Link></li>
                        <li><Link href={`/${locale}/cps/spacebar`} className="hover:text-white transition-colors">{tm.spacebar}</Link></li>
                        <li><Link href={`/${locale}/cps/combo`} className="hover:text-white transition-colors">{tm.combo}</Link></li>
                      </ul>
                    </div>

                    <div className="p-4 border border-gray-800 rounded bg-gray-900/30">
                      <h3 className="text-neon-green text-xs mb-3 font-bold uppercase tracking-widest border-b border-gray-800 pb-2">{tm.game_challenges}</h3>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/cps/minecraft`} className="hover:text-white transition-colors">{tm.minecraft}</Link></li>
                        <li><Link href={`/${locale}/cps/pubg`} className="hover:text-white transition-colors">{tm.pubg}</Link></li>
                        <li><Link href={`/${locale}/cps/roblox`} className="hover:text-white transition-colors">{tm.roblox}</Link></li>
                        <li><Link href={`/${locale}/cps/valorant`} className="hover:text-white transition-colors">{tm.valorant}</Link></li>
                        <li><Link href={`/${locale}/cps/fortnite`} className="hover:text-white transition-colors">{tm.fortnite}</Link></li>
                      </ul>
                    </div>

                    <div className="p-4 border border-gray-800 rounded bg-gray-900/30">
                      <h3 className="text-neon-green text-xs mb-3 font-bold uppercase tracking-widest border-b border-gray-800 pb-2">{tm.hardware_tests}</h3>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/reaction-time`} className="hover:text-white transition-colors">{tm.reaction}</Link></li>
                        <li><Link href={`/${locale}/typing-test`} className="hover:text-white transition-colors">{tm.typing}</Link></li>
                        <li><Link href={`/${locale}/keyboard-test`} className="hover:text-white transition-colors">{tm.keyboard}</Link></li>
                        <li><Link href={`/${locale}/mouse-test`} className="hover:text-white transition-colors">{tm.mouse}</Link></li>
                        <li><Link href={`/${locale}/dead-pixel`} className="hover:text-white transition-colors">{tm.dead_pixel}</Link></li>
                        <li><Link href={`/${locale}/scroll-test`} className="hover:text-white transition-colors">{tm.scroll}</Link></li>
                        <li><Link href={`/${locale}/aim-trainer`} className="hover:text-white transition-colors">{tm.aim}</Link></li>
                        <li><Link href={`/${locale}/touch-test`} className="hover:text-white transition-colors">{tm.touch_test}</Link></li>
                        <li><Link href={`/${locale}/mic-test`} className="hover:text-white transition-colors">{tm.mic_test}</Link></li>
                        <li><Link href={`/${locale}/gamepad-test`} className="hover:text-white transition-colors">{tm.gamepad_test}</Link></li>
                        <li><Link href={`/${locale}/packet-loss-test`} className="hover:text-white transition-colors">{tm.packet_loss}</Link></li>
                      </ul>
                    </div>

                  </nav>
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
              <p>&copy; {currentYear} Palmtweets. {tf.tagline}</p>
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