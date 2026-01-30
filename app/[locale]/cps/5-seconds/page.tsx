import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import ClickGame from '@/components/ClickGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'cps_5s');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="cps_5s" category="CPS" locale={locale}>
      <ClickGame duration={5} mode="standard" />
    </ToolLayout>
  );
}
