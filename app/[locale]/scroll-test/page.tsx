import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import ScrollTestGame from '@/components/ScrollTestGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'scroll');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="scroll" category="Hardware" locale={locale}>
      <ScrollTestGame />
    </ToolLayout>
  );
}
