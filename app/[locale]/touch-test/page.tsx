import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import TouchTestGame from '@/components/TouchTestGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'touch_test');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="touch_test" category="Hardware" locale={locale}>
      <TouchTestGame />
    </ToolLayout>
  );
}
