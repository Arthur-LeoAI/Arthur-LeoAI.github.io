import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Jiaming Li — Applied AI & Business Workflows',
  description:
    'Computer Science MSc graduate connecting business experience, software development and LLM integration. Seeking AI application, solutions and implementation roles.',
};
// Apply the language hint; leave server-rendered content readable if hydration fails.
const boot = `try{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('jl-site-lang');if(l==='zh')document.documentElement.lang='zh-CN'}catch(e){}`;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
