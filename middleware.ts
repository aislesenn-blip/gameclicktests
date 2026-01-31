import createMiddleware from 'next-intl/middleware';
import { locales } from './config/locales';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  // We need to dynamically generate the matcher regex or hardcode it.
  // Hardcoding for clarity and stability with the known list.
  matcher: ['/', '/(en|pt|es|ru|id|de|fr|it|nl|pl|tr|vi|th|sv|da|fi|ro|cs|hu|uk|ja|ko|zh-TW|ms|ar)/:path*']
};
