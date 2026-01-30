"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import AdUnit from '@/components/AdUnit';
import StarRating from '@/components/StarRating';
import { SOFTWARE_APPLICATION_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA } from '../seo/schema';
import Link from 'next/link';

interface ToolLayoutProps {
  children: React.ReactNode;
  toolKey: string;
  category: string;
  locale: string;
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ children, toolKey, category, locale }) => {
  const t = useTranslations(toolKey);
  const tSeo = useTranslations(`${toolKey}.seo`);
  const tNav = useTranslations("nav");

  // Use generic FAQ keys based on category
  const faqCategory = category === 'CPS' ? 'cps'
                    : category === 'Reaction' ? 'reaction'
                    : category === 'Typing' ? 'typing'
                    : 'keyboard';

  const tFaq = useTranslations(`faq.${faqCategory}`);

  const title = t('h1');
  const description = tSeo('description');

  const jsonLd = SOFTWARE_APPLICATION_SCHEMA(title, description);

  const faqData = [
    { question: tFaq('q1.question'), answer: tFaq('q1.answer') },
    { question: tFaq('q2.question'), answer: tFaq('q2.answer') },
    { question: tFaq('q3.question'), answer: tFaq('q3.answer') }
  ];

  const faqSchema = FAQ_SCHEMA(faqData);

  const breadcrumbSchema = BREADCRUMB_SCHEMA([
    { name: tNav('home'), url: `/${locale}` },
    { name: category, url: `/${locale}` },
    { name: title, url: `/${locale}` }
  ]);

  return (
    <div className="w-full flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, faqSchema, breadcrumbSchema]) }}
      />

      <section className="flex flex-col items-center text-center space-y-6 pt-8 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-neon-green neon-text tracking-tight animate-fade-in uppercase">
          {title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          {description}
        </p>
        <StarRating />
      </section>

      <AdUnit size="responsive" />

      <section className="w-full max-w-4xl mx-auto bg-gray-900/40 p-6 rounded-2xl border border-neon-green/20 backdrop-blur-sm shadow-2xl relative min-h-[400px] flex items-center justify-center">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none"></div>
        {children}
      </section>

      <AdUnit size="responsive" />

      <section className="prose prose-invert max-w-3xl mx-auto mt-12 px-4">
        <h2 className="text-neon-green">About {title}</h2>
        <p>
          Welcome to the ultimate <strong>{title}</strong>. This tool is designed to help you measure and improve your performance.
          Whether you are a gamer looking to improve your APM or just testing your hardware, Palmtweets provides the most accurate results.
        </p>

        <h3 className="text-neon-green">How to Use</h3>
        <ol>
          <li>Click the start button or the designated area.</li>
          <li>Perform the action as quickly/accurately as possible.</li>
          <li>View your result and share with friends.</li>
        </ol>

        <h3 className="text-neon-green">Frequently Asked Questions</h3>
        <dl className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i}>
              <dt className="font-bold text-white">{faq.question}</dt>
              <dd className="text-gray-400 mt-1">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-8 border-t border-gray-800">
             <h4 className="text-white font-bold mb-4">Related Tools</h4>
             <div className="flex flex-wrap gap-4 text-sm md:text-base">
                 <Link href={`/${locale}/cps`} className="text-neon-green hover:underline">CPS Test</Link>
                 <Link href={`/${locale}/cps/1-second`} className="text-neon-green hover:underline">1 Second Test</Link>
                 <Link href={`/${locale}/cps/5-seconds`} className="text-neon-green hover:underline">5 Seconds Test</Link>
                 <Link href={`/${locale}/cps/60-seconds`} className="text-neon-green hover:underline">60 Seconds Marathon</Link>
                 <Link href={`/${locale}/cps/jitter`} className="text-neon-green hover:underline">Jitter Click</Link>
                 <Link href={`/${locale}/cps/butterfly`} className="text-neon-green hover:underline">Butterfly Click</Link>
                 <Link href={`/${locale}/cps/drag`} className="text-neon-green hover:underline">Drag Click</Link>
                 <Link href={`/${locale}/cps/minecraft`} className="text-neon-green hover:underline">Minecraft PvP</Link>
                 <Link href={`/${locale}/reaction-time`} className="text-neon-green hover:underline">Reaction Time</Link>
                 <Link href={`/${locale}/typing-test`} className="text-neon-green hover:underline">Typing Test</Link>
                 <Link href={`/${locale}/keyboard-test`} className="text-neon-green hover:underline">Keyboard Test</Link>
             </div>
        </div>
      </section>
    </div>
  );
}

export default ToolLayout;