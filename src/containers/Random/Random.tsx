'use client';
import { Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import RandomCards from './components/RandomCards';
import Shuffled from '@/utils/shuffled';

const productList = ['PASS', 'PASS', 'PASS', '발표 당첨!!'];

const Random = () => {
  const [isStart, setIsStart] = useState(false);
  const [mixProduct, setMixProduct] = useState(['']);

  const handleRandom = () => {
    setIsStart(true);
    const shuffledArray = Shuffled(productList);
    setMixProduct(shuffledArray);
  };

  return (
    <Center h="calc(100vh - 70px)">
      {isStart ? (
        <RandomCards mixProduct={mixProduct} />
      ) : (
        <Center
          bg="#d5bdaf"
          w="300px"
          h="100px"
          textAlign="center"
          borderRadius="100px"
          boxShadow="3px 3px 3px rgba(0,0,0,0.4)"
          cursor="pointer"
          _active={{
            border: 'none',
          }}
          _hover={{
            transform: 'translateY(-5px)',
          }}
          transition="0.3s"
          onClick={handleRandom}
        >
          <Text color="white" fontSize="2vw">
            뽑기
          </Text>
        </Center>
      )}
    </Center>
  );
};

export default Random;
