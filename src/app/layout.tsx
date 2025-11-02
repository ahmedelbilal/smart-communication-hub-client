import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Smart communication hub',
  description:
    'This is a smart communication hub project request by code-quest as a part of their challenge to join vconnect.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">{children}</body>
    </html>
  );
}
