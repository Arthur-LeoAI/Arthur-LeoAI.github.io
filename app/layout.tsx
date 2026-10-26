import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Jiaming Li — Implementation & Business Systems',
  description:
    'Jiaming Li maps business processes, builds the tools that improve them and helps teams adopt them. Seeking implementation, business systems, process and technical business analyst roles. Based in China · Open to Europe & the UK, North America, Australia & New Zealand · Visa sponsorship required.',
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
