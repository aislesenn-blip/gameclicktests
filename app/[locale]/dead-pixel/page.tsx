import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import DeadPixelGame from '@/components/DeadPixelGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'dead_pixel');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="dead_pixel" category="Hardware" locale={locale}>
      <DeadPixelGame />
    </ToolLayout>
  );
}
