import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Jiaming Li — Applied AI · Data · Business Operations',
  description:
    'Jiaming Li puts AI to work in real business operations, combining data analysis, e-commerce and engineering. Based in China · Open to Europe, North America & Oceania · Visa sponsorship required.',
};
// Applies the saved (or ?lang=) language and hides reveal targets before first paint.
const boot = `try{var l=new URLSearchParams(location.search).get('lang')||localStorage.getItem('jl-site-lang');if(l==='zh')document.documentElement.lang='zh-CN'}catch(e){}if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.dataset.motion='on'`;
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
