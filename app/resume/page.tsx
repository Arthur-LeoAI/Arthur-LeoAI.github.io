import Portfolio from '@/app/portfolio';
export const metadata = {
  title: 'Résumé — Jiaming Li',
  description:
    'Implementation, business systems and process analysis. European and North American Amazon operations, process-to-tool and data-integration projects, education and skills.',
};
export default function ResumePage() {
  return <Portfolio view="resume" />;
}
