import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import LiveWorldCps from '@/components/LiveWorldCps';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
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
