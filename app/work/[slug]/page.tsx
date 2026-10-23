import Portfolio from '@/app/portfolio';
import { published } from '@/lib/content';
export function generateStaticParams() {
  return published.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = published.find((x) => x.id === slug);
  return {
    title: `${p?.title.en || 'Project'} — Jiaming Li`,
    description: p?.summary.en,
  };
}
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <Portfolio projectId={slug} />;
}
