import { MetadataRoute } from 'next';
import { locales } from '@/config/locales';

const BASE_URL = 'https://palmtweets.com';

const PATHS = [
  '', // Root (Home)
  '/cps',
  '/cps/1-second',
  '/cps/5-seconds',
  '/cps/10-seconds',
  '/cps/60-seconds',
  '/cps/stress-test',
  '/cps/jitter',
  '/cps/butterfly',
  '/cps/drag',
  '/cps/spacebar',
  '/cps/combo',
  '/cps/minecraft',
  '/cps/pubg',
  '/cps/roblox',
  '/cps/valorant',
  '/cps/fortnite',
  '/reaction-time',
  '/typing-test',
  '/keyboard-test',
  '/mouse-test',
  '/touch-test',
  '/mic-test',
  '/gamepad-test',
  '/packet-loss-test',
  '/dead-pixel',
  '/scroll-test',
  '/aim-trainer',
  '/live-cps',
  '/leaderboard',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Generate for all locales
  locales.forEach(locale => {
    PATHS.forEach(path => {
      sitemap.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.9,
      });
    });
  });

  // Also include root base URL (redirects to default locale usually, but good for index)
  sitemap.push({
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0
  });

  return sitemap;
}
