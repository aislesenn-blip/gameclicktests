import { useTranslations } from 'next-intl';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  // Use generic metadata for privacy or specific if available
  return {
    title: 'Privacy Policy - Palmtweets',
    description: 'Privacy Policy for Palmtweets Global Speed Test Platform.',
    alternates: {
        canonical: `https://palmtweets.com/${locale}/privacy`,
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('privacy');

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4 text-white">
      <h1 className="text-4xl font-bold text-neon-green mb-8 uppercase tracking-widest">{t('title')}</h1>

      <div className="prose prose-invert prose-lg">
        <p>{t('intro')}</p>

        <h2 className="text-neon-green mt-8">{t('cookies_title')}</h2>
        <p>{t('cookies_text')}</p>

        <h2 className="text-neon-green mt-8">{t('data_title')}</h2>
        <p>{t('data_text')}</p>

        <h2 className="text-neon-green mt-8">{t('contact_title')}</h2>
        <p>{t('contact_text')}</p>
      </div>
    </div>
  );
}
