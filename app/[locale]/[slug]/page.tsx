import { notFound } from 'next/navigation';
import { tools } from '@/config/tools';
import { getToolMetadata } from '@/utils/seo';
import ToolLayout from '@/components/ToolLayout';
import ClickGame from '@/components/ClickGame';
import ReactionGame from '@/components/ReactionGame';
import TypingGame from '@/components/TypingGame';
import KeyboardGame from '@/components/KeyboardGame';
import LiveWorldCps from '@/components/LiveWorldCps';
import DeadPixelGame from '@/components/DeadPixelGame';
import MousePrecisionGame from '@/components/MousePrecisionGame';
import Leaderboard from '@/components/Leaderboard';

// Component Mapping
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ComponentMap: Record<string, React.FC<any>> = {
  ClickGame,
  ReactionGame,
  TypingGame,
  KeyboardGame,
  LiveWorldCps,
  DeadPixelGame,
  MousePrecisionGame,
  Leaderboard,
};

export function generateStaticParams() {
  const locales = ['en', 'pt', 'id', 'es', 'ru'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const tool of tools) {
      params.push({ locale, slug: tool.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) return {};
  return getToolMetadata(locale, tool.translationKey, tool.slug);
}

export default function Page({ params: { locale, slug } }: { params: { locale: string; slug: string } }) {
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const Component = ComponentMap[tool.component];

  if (!Component) {
    return <div>Component {tool.component} not found</div>;
  }

  return (
    <ToolLayout toolKey={tool.translationKey} category={tool.category} locale={locale}>
      <Component duration={tool.duration} mode={tool.mode} />
    </ToolLayout>
  );
}
