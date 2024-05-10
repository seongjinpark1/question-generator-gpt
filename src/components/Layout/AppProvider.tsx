'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { PropsWithChildren } from 'react';

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <CacheProvider>
      <ChakraProvider resetCSS>{children}</ChakraProvider>
    </CacheProvider>
  );
};

export default AppProvider;
