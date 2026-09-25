import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/favicon.svg' },
  title: 'Jiaming Li — Data & Decisions',
  description:
    'Data analyst combining business understanding, analytical thinking and product craft. Explore decision tools, real-time data systems and AI workflows.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
