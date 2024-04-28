'use client';
import BackgroundVideo from '@/containers/Home/components/BackgroundVideo';
import { PropsWithChildren } from 'react';

const CommonLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <BackgroundVideo />
    </>
  );
};

export default CommonLayout;
