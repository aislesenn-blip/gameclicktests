"use client";
import React from 'react';
import { useTranslations } from 'next-intl';
import AdUnit from '@/components/AdUnit';
import StarRating from '@/components/StarRating';
import { SOFTWARE_APPLICATION_SCHEMA, GAME_SCHEMA, HOWTO_SCHEMA, FAQ_SCHEMA, BREADCRUMB_SCHEMA } from '../seo/schema';
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
  const tLayout = useTranslations("tool_layout");
  const tm = useTranslations("mobile_nav");

  // Always call hooks unconditionally
  // We can't conditionally call useTranslations.
  // We must load BOTH namespaces (if they exist) or use a smarter pattern.
  // Next-intl doesn't support "try load".
  // However, we can just load "seo_content" and "toolKey" (which we already did).
  // If we injected the content into `toolKey.content` in the JSON, we can access it via `t('content.h2_hook')`.
  // If it doesn't exist, `t` will return the key path. We can check that.

  const tGlobalContent = useTranslations("seo_content");

  // Helper to get content with fallback
  const getContent = (key: string) => {
      // Check if tool specific content exists (by checking if it returns a non-key value)
      // This is a bit hacky with next-intl on client side without rich objects sometimes.
      // Better approach: We injected `content` object into `toolKey` in the JSON.
      // So `t('content.h2_hook')` should work.

      const specific = t(`content.${key}`);
      // If the translation is missing, next-intl returns "toolKey.content.key".
      if (specific && !specific.includes(toolKey)) {
          return specific;
      }
      return tGlobalContent(key);
  };

  // Use generic FAQ keys based on category
  const faqCategory = category === 'CPS' ? 'cps'
                    : category === 'Reaction' ? 'reaction'
                    : category === 'Typing' ? 'typing'
                    : 'keyboard';

  const tFaq = useTranslations(`faq.${faqCategory}`);

  const title = t('h1');
  const description = tSeo('description');

  const jsonLd = SOFTWARE_APPLICATION_SCHEMA(title, description);
  const gameSchema = (category === 'CPS' || category === 'Reaction') ? GAME_SCHEMA(title, description) : null;
  const howToSchema = HOWTO_SCHEMA(title, [tLayout('step1'), tLayout('step2'), tLayout('step3')]);

  // Dynamically load up to 7 FAQs if they exist
  const faqData = [];
  for (let i = 1; i <= 7; i++) {
      try {
          const q = tFaq(`q${i}.question`);
          const a = tFaq(`q${i}.answer`);
          if (q && a && q !== `faq.${faqCategory}.q${i}.question`) {
              faqData.push({ question: q, answer: a });
          }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) { break; }
  }

  const faqSchema = FAQ_SCHEMA(faqData);

  const breadcrumbSchema = BREADCRUMB_SCHEMA([
    { name: tNav('home'), url: `/${locale}` },
    { name: category, url: `/${locale}` },
    { name: title, url: `/${locale}` }
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [jsonLd, howToSchema, faqSchema, breadcrumbSchema];
  if (gameSchema) schemas.push(gameSchema);

  return (
    <div className="w-full flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
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
        <h2 className="text-neon-green">{tLayout('about')} {title}</h2>
        <p>
          {description}
        </p>

        <h3 className="text-neon-green">{tLayout('how_to')}</h3>
        <ol>
          <li>{tLayout('step1')}</li>
          <li>{tLayout('step2')}</li>
          <li>{tLayout('step3')}</li>
        </ol>

        <h2 className="text-neon-green">{getContent('h2_improve') || getContent('h2_hook')}</h2>
        <p>{getContent('p_improve') || getContent('p_hook')}</p>

        <h3 className="text-neon-green">{getContent('h2_styles') || getContent('h2_science')}</h3>
        <p>{getContent('p_styles') || getContent('p_science')}</p>

        <h3 className="text-neon-green">{getContent('h2_record') || getContent('h2_gaming')}</h3>
        <p>{getContent('p_record') || getContent('p_gaming')}</p>

        <h3 className="text-neon-green">{getContent('h2_useful') || getContent('h2_hardware')}</h3>
        <p>{getContent('p_useful') || getContent('p_hardware')}</p>

        <h3 className="text-neon-green">{getContent('h2_hardware') || getContent('h2_technique')}</h3>
        <p>{getContent('p_hardware') || getContent('p_technique')}</p>

        <h3 className="text-neon-green">{tLayout('faq')}</h3>
        <dl className="space-y-4">
          {faqData.map((faq, i) => (
            <div key={i}>
              <dt className="font-bold text-white">{faq.question}</dt>
              <dd className="text-gray-400 mt-1">{faq.answer}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 pt-8 border-t border-gray-800">
             <h4 className="text-white font-bold mb-4">{tLayout('related')}</h4>
             <div className="flex flex-wrap gap-4 text-sm md:text-base">
                 <Link href={`/${locale}/cps`} className="text-neon-green hover:underline">{tm('cps_cluster')}</Link>
                 <Link href={`/${locale}/cps/1-second`} className="text-neon-green hover:underline">{tm('cps_1s')}</Link>
                 <Link href={`/${locale}/cps/5-seconds`} className="text-neon-green hover:underline">{tm('cps_5s')}</Link>
                 <Link href={`/${locale}/cps/jitter`} className="text-neon-green hover:underline">{tm('jitter')}</Link>
                 <Link href={`/${locale}/reaction-time`} className="text-neon-green hover:underline">{tm('reaction')}</Link>
                 <Link href={`/${locale}/typing-test`} className="text-neon-green hover:underline">{tm('typing')}</Link>
             </div>
        </div>
      </section>
    </div>
  );
}

export default ToolLayout;
