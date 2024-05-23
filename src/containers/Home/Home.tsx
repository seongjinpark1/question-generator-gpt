'use client';

import { Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import HomeList from './components/HomeList';

const Home = () => {
  return (
    <Center
      as="main"
      flexDirection="column"
      w="100%"
      h="100vh"
      bg="#fcf8f5"
      position="relative"
      zIndex={2}
    >
      <Flex
        w="100%"
        position="absolute"
        top="80px"
        left="50%"
        alignItems="center"
        justifyContent="center"
        transform="translateX(-50%)"
      >
        <Image
          src="/images/logo.png"
          alt="robot"
          width={200}
          height={200}
          priority
        />
      </Flex>
      <HomeList />
    </Center>
  );
};

export default Home;
