'use client';

import { Center, Flex, Text } from '@chakra-ui/react';

import RobotComponents from './components/RobotComponents';
import useValidTime from '@/hooks/useValidTime';
import Link from 'next/link';

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
      <Center
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Link
          href="/generate"
          style={{
            width: '60%',
            height: '55vh',
          }}
        >
          <Center
            border="1px solid"
            h="100%"
            bg="black"
            borderRadius="100px"
            boxShadow="3px 3px 3px rgba(0,0,0,0.4)"
            _active={{
              border: 'none',
            }}
            _hover={{
              transform: 'translateY(-20px)',
            }}
            transition="0.3s"
          >
            <Text fontSize="5vw" color="white" textDecoration="none">
              질문 입력하기
            </Text>
          </Center>
        </Link>
      </Center>
    </Center>
  );
};

export default Home;
