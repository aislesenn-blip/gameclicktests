export const LOCALES = [
  'en', // English
  'ar', // Arabic
  'cs', // Czech
  'da', // Danish
  'de', // German
  'el', // Greek
  'es', // Spanish
  'fi', // Finnish
  'fr', // French
  'he', // Hebrew
  'hi', // Hindi
  'hu', // Hungarian
  'id', // Indonesian
  'it', // Italian
  'ja', // Japanese
  'ko', // Korean
  'nl', // Dutch
  'no', // Norwegian
  'pl', // Polish
  'pt', // Portuguese
  'ro', // Romanian
  'ru', // Russian
  'sv', // Swedish
  'th', // Thai
  'tr', // Turkish
  'uk', // Ukrainian
  'vi', // Vietnamese
  'zh'  // Chinese
];

export function generateAlternates(locale: string, path: string = '') {
  const languages: Record<string, string> = {};

  LOCALES.forEach(lang => {
    languages[lang] = `/${lang}${path}`;
  });

  return {
    canonical: `/${locale}${path}`,
    languages,
  };
}
