import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import CommonLayout from '@/components/Layout/CommonLayout';

import useValidTime from '@/hooks/useValidTime';

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
  const { isValidTime, studyDate, today } = useValidTime();
  console.log(studyDate.format('YYYY-MM-DD, HH:mm:ssZ'));
  return (
    <html lang="en">
      <body className={inter.className}>
        {today.isAfter(studyDate) ? 'true' : 'false'}
        <br />
        {today.isBefore(studyDate.add(1, 'hour').add(30, 'minute'))
          ? 'true'
          : 'false'}
        <br />
        {isValidTime ? 'true' : 'false'}
        <br />
        {today.format('YYYY-MM-DD, HH:mm:ss')}
        <br />
        {studyDate.format('YYYY-MM-DD, HH:mm:ss')}
        <br />
        {/* {notopen} */}
        {/* <CommonLayout>{isValidTime ? children : notopen}</CommonLayout> */}
      </body>
    </html>
  );
}
