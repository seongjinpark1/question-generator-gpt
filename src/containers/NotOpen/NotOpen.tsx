import { Center, Text } from '@chakra-ui/react';

const NotOpen = () => {
  return (
    <Center
      position="fixed"
      w="100%"
      h="100vh"
      bg="black"
      zIndex={99999}
      top="0"
      left="0"
    >
      <Text fontSize="40px" color="white">
        아직 오픈 전 입니다.
      </Text>
    </Center>
  );
};

export default NotOpen;