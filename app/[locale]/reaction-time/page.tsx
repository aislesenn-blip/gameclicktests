import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import ReactionGame from '@/components/ReactionGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'reaction');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="reaction" category="Reaction" locale={locale}>
      <ReactionGame  />
    </ToolLayout>
  );
}
