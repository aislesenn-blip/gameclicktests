import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import LiveWorldCps from '@/components/LiveWorldCps';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'live');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="live" category="Community" locale={locale}>
      <LiveWorldCps />
    </ToolLayout>
  );
}
