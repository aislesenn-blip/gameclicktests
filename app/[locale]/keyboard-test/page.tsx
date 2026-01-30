import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import KeyboardGame from '@/components/KeyboardGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'keyboard');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="keyboard" category="Keyboard" locale={locale}>
      <KeyboardGame  />
    </ToolLayout>
  );
}
