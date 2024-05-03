import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import CommonLayout from '@/components/Layout/CommonLayout';
import NotOpenPage from './@notopen/page';
import useValidTime from '@/hooks/useValidTime';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '스터디 질문 생성기',
  description: '스터디 질문 생성기',
};

export default function RootLayout({
  children,
  notopen,
}: Readonly<{
  children: React.ReactNode;
  notopen: React.ReactNode;
}>) {
  const { today, studyDate, isValidTime } = useValidTime();
  console.log('today', today.format('YYYY-MM-DD, HH:mm:ssZ'));
  console.log('study', studyDate.format('YYYY-MM-DD, HH:mm:ssZ'));
  console.log('invalidTime', isValidTime);

  return (
    <html lang="en">
      <body className={inter.className}>
        {dayjs().format('YYYY-MM-DD, HH:mm:ssZ')} <br />
        {studyDate.format('YYYY-MM-DD, HH:mm:ssZ')}
        <br />
        test{isValidTime ? 'true' : 'false'}
        {/* <CommonLayout>{isValidTime ? children : notopen}</CommonLayout> */}
      </body>
    </html>
  );
}
