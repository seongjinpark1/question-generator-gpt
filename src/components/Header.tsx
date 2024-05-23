'use client';

import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/' && (
        <Flex
          as="header"
          w="100%"
          h="70px"
          py="5px"
          bg="#fcf8f5"
          justifyContent="center"
          position="fixed"
          top="0"
          borderBottom="1px solid"
          borderColor="gray.200"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            px="20px"
          >
            <Link href="/">
              <Image src="/images/logo.png" alt="logo" width={65} height={60} />
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Header;
