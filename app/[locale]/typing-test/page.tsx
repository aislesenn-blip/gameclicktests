import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import TypingGame from '@/components/TypingGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'typing');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="typing" category="Typing" locale={locale}>
      <TypingGame  />
    </ToolLayout>
  );
}
