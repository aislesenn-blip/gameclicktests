import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import MicTestGame from '@/components/MicTestGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'mic_test');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="mic_test" category="Hardware" locale={locale}>
      <MicTestGame />
    </ToolLayout>
  );
}
