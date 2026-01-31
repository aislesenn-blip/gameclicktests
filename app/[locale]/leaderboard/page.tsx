import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import Leaderboard from '@/components/Leaderboard';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'leaderboard');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="leaderboard" category="Community" locale={locale}>
      <Leaderboard />
    </ToolLayout>
  );
}
