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

  // Try to find SEO content specific to the tool, fallback to category, fallback to generic
  // Since useTranslations doesn't support fallback chains easily without try/catch or knowing existence,
  // We will assume "seo_content" has keys like "cps.h2_improve", or just "h2_improve" inside a namespace.
  // Current messages/en.json has "seo_content": { "h2_improve": ... } which is hardcoded for CPS.
  // I will assume I'll restructure messages/en.json to have `seo_content` as a namespace with nested categories.
  const contentNamespace = `seo_content.${category.toLowerCase()}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tContent = useTranslations(contentNamespace as any);

  // Use generic FAQ keys based on category
  const faqCategory = category === 'CPS' ? 'cps'
                    : category === 'Reaction' ? 'reaction'
                    : category === 'Typing' ? 'typing'
                    : category === 'Keyboard' ? 'keyboard'
                    : category === 'Mouse' ? 'mouse'
                    : category === 'Display' ? 'display'
                    : 'other';

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

  // Content Rendering Helper
  const renderContent = () => {
      // We try to render generic headers. If translation is missing (returns key), we skip?
      // useTranslations returns key if missing? No, next-intl returns "Namespace.key".
      // We can wrap in try/catch or just checking if it contains "h2_".
      // But better: we know we will populate these in en.json.

      return (
          <>
            <h3 className="text-neon-green">{tLayout('rank_up')}</h3>
            <ul>
              <li><strong>{tLayout('rank_turtle')}</strong> {tLayout('rank_turtle_desc')}</li>
              <li><strong>{tLayout('rank_pro')}</strong> {tLayout('rank_pro_desc')}</li>
              <li><strong>{tLayout('rank_god')}</strong> {tLayout('rank_god_desc')}</li>
            </ul>

            <h2 className="text-neon-green">{tContent('h2_improve')}</h2>
            <p>{tContent('p_improve')}</p>

            <h3 className="text-neon-green">{tContent('h2_styles')}</h3>
            <p>{tContent('p_styles')}</p>

            <h3 className="text-neon-green">{tContent('h2_record')}</h3>
            <p>{tContent('p_record')}</p>

            <h3 className="text-neon-green">{tContent('h2_useful')}</h3>
            <p>{tContent('p_useful')}</p>
          </>
      );
  };

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

        {renderContent()}

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
                 <Link href={`/${locale}/cps-test`} className="text-neon-green hover:underline">{tm('cps_cluster')}</Link>
                 <Link href={`/${locale}/cps-test-1s`} className="text-neon-green hover:underline">{tm('cps_1s')}</Link>
                 <Link href={`/${locale}/cps-test-5s`} className="text-neon-green hover:underline">{tm('cps_5s')}</Link>
                 <Link href={`/${locale}/jitter-click`} className="text-neon-green hover:underline">{tm('jitter')}</Link>
                 <Link href={`/${locale}/reaction-time`} className="text-neon-green hover:underline">{tm('reaction')}</Link>
                 <Link href={`/${locale}/typing-test`} className="text-neon-green hover:underline">{tm('typing')}</Link>
             </div>
        </div>
      </section>
    </div>
  );
}

export default ToolLayout;