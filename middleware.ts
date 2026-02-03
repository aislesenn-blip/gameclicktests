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
  matcher: ['/', '/(en|ar|cs|da|de|el|es|fi|fr|he|hi|hu|id|it|ja|ko|nl|no|pl|pt|ro|ru|sv|th|tr|uk|vi|zh)/:path*']
};
