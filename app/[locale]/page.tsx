import React from 'react';
import { useTranslations } from 'next-intl';
import ClickGame from '@/components/ClickGame';
import AdUnit from '@/components/AdUnit';
import StarRating from '@/components/StarRating';
import { SOFTWARE_APPLICATION_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA } from '@/seo/schema';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('ui');
  const tSeo = useTranslations('seo');
  const tSeoContent = useTranslations('seo_content');
  const tFaq = useTranslations('faq.cps');

  const jsonLd = SOFTWARE_APPLICATION_SCHEMA(tSeo('title'), tSeo('description'));

  const faqData = [
    { question: tFaq('q1.question'), answer: tFaq('q1.answer') },
    { question: tFaq('q2.question'), answer: tFaq('q2.answer') },
    { question: tFaq('q3.question'), answer: tFaq('q3.answer') }
  ];
  const faqSchema = FAQ_SCHEMA(faqData);

  const breadcrumbSchema = BREADCRUMB_SCHEMA([
    { name: "Home", url: `/${locale}` },
    { name: "CPS Test", url: `/${locale}` }
  ]);

  return (
    <div className="w-full flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqSchema, breadcrumbSchema]) }}
      />

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-6 pt-8 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-neon-green neon-text tracking-tight animate-fade-in">
          {t('h1')}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {tSeo('description')}
        </p>
        <StarRating />
      </section>

      {/* Top Ad */}
      <AdUnit size="responsive" />

      {/* Game Area */}
      <section className="w-full max-w-3xl mx-auto bg-gray-900/40 p-6 rounded-2xl border border-neon-green/20 backdrop-blur-sm shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none"></div>
        <ClickGame duration={10} mode="standard" />
      </section>

      {/* Bottom Ad */}
      <AdUnit size="responsive" />

      {/* Content / SEO Text */}
      <section className="prose prose-invert max-w-3xl mx-auto mt-12">
        <h2 className="text-neon-green">{tSeoContent('h2_improve')}</h2>
        <p>{tSeoContent('p_improve')}</p>

        <h3 className="text-neon-green">{tSeoContent('h2_styles')}</h3>
        <p>{tSeoContent('p_styles')}</p>

        <h3 className="text-neon-green">{tSeoContent('h2_record')}</h3>
        <p>{tSeoContent('p_record')}</p>

        <h3 className="text-neon-green">{tSeoContent('h2_useful')}</h3>
        <p>{tSeoContent('p_useful')}</p>

        <h3 className="text-neon-green">FAQ</h3>
        <dl className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i}>
              <dt className="font-bold text-white">{faq.question}</dt>
              <dd className="text-gray-400 mt-1">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}