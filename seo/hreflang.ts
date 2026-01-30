export const LOCALES = ['en', 'pt', 'id', 'es', 'ru'];

export function generateAlternates(path: string = '') {
  const languages: Record<string, string> = {};

  LOCALES.forEach(locale => {
    languages[locale] = `/${locale}${path}`;
  });

  return {
    canonical: `/en${path}`,
    languages,
  };
}
