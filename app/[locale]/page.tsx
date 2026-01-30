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

  const jsonLd = SOFTWARE_APPLICATION_SCHEMA(tSeo('title'), tSeo('description'));

  const faqData = [
    { question: "What is CPS Test?", answer: "CPS stands for Clicks Per Second. It is a measure of how fast you can click your mouse in a given time frame." },
    { question: "What is a good CPS score?", answer: "The average human click speed is about 6-7 CPS. Professional gamers can achieve 12+ CPS using techniques like Jitter or Butterfly clicking." },
    { question: "How to improve click speed?", answer: "Practice techniques like Jitter Clicking or Butterfly Clicking. Use a gaming mouse with good switches and lower debouncetime." }
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
        <h2 className="text-neon-green">About the CPS Test</h2>
        <p>
          The <strong>CPS Test</strong> (Clicks Per Second) is the ultimate way to measure your finger speed and mouse clicking capability.
          Used by millions of gamers worldwide, specifically in Minecraft PvP communities, this tool helps you track your improvement over time.
        </p>

        <h3 className="text-neon-green">How to Rank Up?</h3>
        <ul>
          <li><strong>Turtle (0-5 CPS):</strong> You are clicking too slow! Try to tense your arm muscles.</li>
          <li><strong>Pro (5-10 CPS):</strong> The average gamer speed. Good for casual play.</li>
          <li><strong>Godlike (10+ CPS):</strong> You are mastering advanced techniques like Jitter or Butterfly clicking.</li>
        </ul>

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