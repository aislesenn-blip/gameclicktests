import { getMessages } from 'next-intl/server';
import { generateAlternates } from '../seo/hreflang';

export async function getToolMetadata(locale: string, toolKey: string) {
  const messages = await getMessages({ locale });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (messages as any)[toolKey]?.seo;

  if (!seo) {
    return { title: 'Palmtweets', description: 'Global CPS Test' };
  }

  const { canonical, languages } = generateAlternates(toolKey === 'home' ? '' : `/${toolKey}`);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages,
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
