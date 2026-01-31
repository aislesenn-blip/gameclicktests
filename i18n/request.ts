import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { locales } from '../config/locales';

export default getRequestConfig(async ({requestLocale}) => {
  // Validate that the incoming `locale` parameter is valid
  let locale = await requestLocale;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !locales.includes(locale as any)) {
      locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
