import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import AimTrainerGame from '@/components/AimTrainerGame';

export function generateStaticParams() {
  return ['en', 'pt', 'id', 'es', 'ru'].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'aim');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="aim" category="Hardware" locale={locale}>
      <AimTrainerGame />
    </ToolLayout>
  );
}
