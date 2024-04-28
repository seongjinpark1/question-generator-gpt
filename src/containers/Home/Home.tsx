'use client';

import { Center, Flex } from '@chakra-ui/react';

import RobotComponents from './components/RobotComponents';

const Home = () => {
  return (
    <Center
      as="main"
      flexDirection="column"
      w="100%"
      h="100vh"
      position="relative"
      zIndex={2}
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <RobotComponents />
      </Flex>
    </Center>
  );
};

export default Home;
