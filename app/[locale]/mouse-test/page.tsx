import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import MouseTestGame from '@/components/MouseTestGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
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
