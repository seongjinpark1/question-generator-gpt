import { STUDY_PEOPLE } from '@/constants/people';
import Shuffled from '@/utils/shuffled';
import { Button, Center, Text } from '@chakra-ui/react';
import { useState } from 'react';

interface RandomCardsProps {
  mixProduct: string[];
}
const RandomCards = ({ mixProduct }: RandomCardsProps) => {
  const [cardOpacity, setCardOpacity] = useState([1, 1, 1, 1]);
  const [mixPeople, setMixPeople] = useState(STUDY_PEOPLE);

  const handleSelectCard = (idx: number) => {
    const copy = cardOpacity.slice(0);
    copy[idx] = 0;
    setCardOpacity(copy);
  };

  const handleRandomPeople = () => {
    const shuffledArray = Shuffled(STUDY_PEOPLE);

    setMixPeople(shuffledArray);
  };
  return (
    <Center gap="10px" w="100%" h="100vh" px="20px" position="relative">
      <Button
        position="absolute"
        top="50px"
        left="50%"
        transform="translateX(-50%)"
        bg="#f5ebe0"
        w="150px"
        h="50px"
        onClick={handleRandomPeople}
      >
        <Text>섞기</Text>
      </Button>
      {mixPeople.map((person, idx) => {
        return (
          <Center
            key={idx}
            bg="#f5ebe0"
            flex={1}
            h="200px"
            borderRadius="8px"
            position="relative"
          >
            <Text fontSize="30px">{mixProduct[idx]}</Text>
            <Center
              position="absolute"
              w="100%"
              h="100%"
              bg="black"
              borderRadius="8px"
              cursor="pointer"
              opacity={cardOpacity[idx]}
              transition="1s"
              onClick={() => handleSelectCard(idx)}
            >
              <Text color="white" fontSize="50px">
                {person}
              </Text>
            </Center>
          </Center>
        );
      })}
    </Center>
  );
};

export default RandomCards;
