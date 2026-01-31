import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import ClickGame from '@/components/ClickGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'cps_60s');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="cps_60s" category="CPS" locale={locale}>
      <ClickGame duration={60} mode="standard" />
    </ToolLayout>
  );
}
