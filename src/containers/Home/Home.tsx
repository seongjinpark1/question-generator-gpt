'use client';

import { Center, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';

import Link from 'next/link';

const LINK_LIST = [
  {
    id: 0,
    name: '스터디 질문 만들기',
    href: '/generate',
  },
  {
    id: 1,
    name: '랜덤 발표자 뽑기',
    href: '/random',
  },
];
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
        <Text fontSize="60px" fontWeight={500}>
          STUDY GPT
        </Text>
        <Image
          src="/images/cute-robot.webp"
          alt="robot"
          width={100}
          height={100}
          priority
        />
      </Flex>
      <Center
        w="100%"
        h="100%"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <SimpleGrid
          columns={2}
          gap={15}
          w="100%"
          px="16px"
          justifyItems="center"
        >
          {LINK_LIST.map((list) => {
            return (
              <Link
                key={list.id}
                href={list.href}
                style={{
                  width: '50%',
                }}
              >
                <Center
                  h="100px"
                  bg="black"
                  borderRadius="100px"
                  boxShadow="3px 3px 3px rgba(0,0,0,0.4)"
                  border="none"
                  _active={{
                    border: 'none',
                  }}
                  _hover={{
                    transform: 'translateY(-5px)',
                  }}
                  transition="0.3s"
                >
                  <Text fontSize="2vw" color="white" textDecoration="none">
                    {list.name}
                  </Text>
                </Center>
              </Link>
            );
          })}
        </SimpleGrid>
      </Center>
    </Center>
  );
};

export default Home;
