import { LINK_LIST } from '@/constants/home-list';
import { Center, SimpleGrid, Text } from '@chakra-ui/react';
import Link from 'next/link';

const HomeList = () => {
  return (
    <Center
      w="100%"
      h="100%"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <SimpleGrid columns={2} gap={15} w="100%" px="16px" justifyItems="center">
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
                bg="#d5bdaf"
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
  );
};

export default HomeList;
