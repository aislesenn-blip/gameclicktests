import { MetadataRoute } from 'next';
import { locales as LOCALES } from '@/config/locales';

const BASE_URL = 'https://palmtweets.com';
const PATHS = [
  '',
  '/cps',
  '/cps/1-second',
  '/cps/5-seconds',
  '/cps/60-seconds',
  '/cps/jitter',
  '/cps/butterfly',
  '/cps/drag',
  '/cps/minecraft',
  '/reaction-time',
  '/typing-test',
  '/keyboard-test',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  PATHS.forEach(path => {
    LOCALES.forEach(locale => {
      sitemap.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });
  });

  return sitemap;
}