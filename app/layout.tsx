import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Infinity Arena',
  description: 'Competitive real-time arena platform built with Next.js 14.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
