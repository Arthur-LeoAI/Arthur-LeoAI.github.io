import Portfolio from '@/app/portfolio';
export const metadata = {
  title: 'Transformer lab — Jiaming Li',
  description:
    'A hands-on explorer of how a tiny decoder computes attention, computed locally with fixed untrained weights.',
};
export default function LabPage() {
  return <Portfolio view="lab" />;
}
