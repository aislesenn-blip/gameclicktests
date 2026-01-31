import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import GamepadTestGame from '@/components/GamepadTestGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'gamepad_test');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="gamepad_test" category="Hardware" locale={locale}>
      <GamepadTestGame />
    </ToolLayout>
  );
}
