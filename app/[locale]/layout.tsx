import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Inter} from 'next/font/google';
import "../globals.css";

const inter = Inter({subsets: ['latin']});

export async function generateMetadata() {
  const messages = await getMessages();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const seo = (messages as any).seo;

  const alternates = {
    languages: {
      'en': '/en',
      'pt': '/pt',
      'id': '/id',
      'es': '/es',
      'ru': '/ru',
    },
  };

  return {
    title: seo.title,
    description: seo.description,
    alternates: alternates,
  };
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Palmtweets CPS Test",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "12500"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}