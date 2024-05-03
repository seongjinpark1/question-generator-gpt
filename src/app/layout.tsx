import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import CommonLayout from '@/components/Layout/CommonLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '스터디 질문 생성기',
  description: '스터디 질문 생성기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
