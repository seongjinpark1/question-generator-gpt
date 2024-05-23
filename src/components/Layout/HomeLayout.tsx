'use client';
import { Box } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

const HomeLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  return <Box pt={pathname !== '/' ? '70px' : '0'}>{children}</Box>;
};

export default HomeLayout;
