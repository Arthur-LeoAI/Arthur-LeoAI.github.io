import Portfolio from '@/app/portfolio';
export const metadata = {
  title: 'Résumé — Jiaming Li',
  description:
    'Applied AI, software development and business workflows. LLM integration projects, European and US Amazon experience, education and skills.',
};
export default function ResumePage() {
  return <Portfolio view="resume" />;
}
