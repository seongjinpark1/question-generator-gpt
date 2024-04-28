import { Button, Center, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

const RobotComponents = () => {
  return (
    <Flex direction="column" alignItems="center">
      <Image
        src="/images/cute-robot.webp"
        alt="robot"
        // layout="fill"
        width={600}
        height={600}
        priority
      />
      <Link href="/generate">
        <Button
          w="200px"
          h="48px"
          border="none"
          borderRadius="16px"
          boxShadow="0 4px 6px rgba(0,0,0,0.2)"
          bg="white"
          cursor="pointer"
          _hover={{
            boxShadow: '3px 3px 3px',
            // top: '3px',
          }}
          transition="0.3s"
        >
          <Text fontSize="20px">질문 입력하기</Text>
        </Button>
      </Link>
    </Flex>
  );
};

export default RobotComponents;
