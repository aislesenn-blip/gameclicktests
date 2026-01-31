import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import PacketLossTestGame from '@/components/PacketLossTestGame';
import { locales } from '@/config/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getToolMetadata(locale, 'packet_loss');
}

export default function Page({ params: { locale } }: { params: { locale: string } }) {
  return (
    <ToolLayout toolKey="packet_loss" category="Hardware" locale={locale}>
      <PacketLossTestGame />
    </ToolLayout>
  );
}
