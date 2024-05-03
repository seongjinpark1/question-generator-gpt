'use client';

import useValidTime from '@/hooks/useValidTime';
import { Center, Text } from '@chakra-ui/react';

const NotOpen = () => {
  const { studyDate } = useValidTime();
  return (
    // <Center
    //   position="fixed"
    //   w="100%"
    //   h="100vh"
    //   bg="black"
    //   zIndex={99999}
    //   top="0"
    //   left="0"
    // >
    //   <Text fontSize="40px" color="white">
    //     아직 오픈 전 입니다.
    //   </Text>
    // </Center>
    <>{studyDate.format('YYYY-MM-DD, HH:mm:ssZ')}</>
  );
};

export default NotOpen;
