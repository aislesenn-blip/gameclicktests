import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import MouseTestGame from '@/components/MouseTestGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'mouse');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="mouse" category="Hardware" locale={locale}>
      <MouseTestGame />
    </ToolLayout>
  );
}
