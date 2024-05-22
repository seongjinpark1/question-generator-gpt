'use client';
import { Center, Text } from '@chakra-ui/react';
import { useState } from 'react';
import RandomCards from './components/RandomCards';

const productList = ['PASS', 'PASS', 'PASS', '발표 당첨!!'];
const Random = () => {
  const [isStart, setIsStart] = useState(false);
  const [mixProduct, setMixProduct] = useState(['']);
  const handleRandom = () => {
    setIsStart(true);

    let shuffledArray = productList.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    setMixProduct(shuffledArray);
  };

  return (
    <Center h="100vh">
      {isStart ? (
        <RandomCards mixProduct={mixProduct} />
      ) : (
        <Center
          bg="black"
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
