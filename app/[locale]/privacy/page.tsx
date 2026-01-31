import { locales } from '@/config/locales';
import React from 'react';
import { useTranslations } from 'next-intl';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Page({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('privacy');

  return (
    <div className="prose prose-invert max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-neon-green">{t('title')}</h1>
      <p>{t('intro')}</p>

      <h2 className="text-white">{t('cookies_title')}</h2>
      <p>{t('cookies_text')}</p>

      <h2 className="text-white">{t('data_title')}</h2>
      <p>{t('data_text')}</p>

      <h2 className="text-white">{t('contact_title')}</h2>
      <p>{t('contact_text')}</p>
    </div>
  );
}
