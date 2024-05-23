import { Box, Center, Spinner } from '@chakra-ui/react';
import Image from 'next/image';

const Loading = () => {
  return (
    <>
      <Center
        position="fixed"
        top="0"
        left="0"
        bg="var(--Opacity-Black-64, rgba(26, 26, 26, 0.64))"
        opacity={0.7}
        zIndex={9}
        w="100%"
        h="100vh"
      />

      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={99}
      >
        <Spinner size="lg" color="#fcbf49" />
      </Box>
    </>
  );
};

export default Loading;
