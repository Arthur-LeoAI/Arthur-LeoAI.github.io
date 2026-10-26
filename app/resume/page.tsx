import Portfolio from '@/app/portfolio';
export const metadata = {
  title: 'Résumé — Jiaming Li',
  description:
    'Implementation, business systems and process analysis. European and US Amazon operations, process-to-tool and data-integration projects, education and skills.',
};
export default function ResumePage() {
  return <Portfolio view="resume" />;
}
