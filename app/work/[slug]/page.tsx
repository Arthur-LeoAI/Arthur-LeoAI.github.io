import Portfolio from '@/app/portfolio';
import { projects } from '@/lib/content';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  return {
    title: `${p?.title || 'Project'} — Jiaming Li`,
    description: p?.summary,
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
