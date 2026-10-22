import Portfolio from '@/app/portfolio';
export const metadata = {
  title: 'Résumé — Jiaming Li',
  description:
    'Data analyst · business and marketplace analytics. Experience, projects, education and skills.',
};
export default function ResumePage() {
  return <Portfolio view="resume" />;
}
