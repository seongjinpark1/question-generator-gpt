import { Flex, Text } from '@chakra-ui/react';

interface AnswerCountProps {
  count: number;
  currentIdx: number;
}
const AnswerCount = ({ count, currentIdx }: AnswerCountProps) => {
  return (
    <Flex
      position="absolute"
      top="5%"
      left="50%"
      transform="translateX(-50%)"
      gap="10px"
      zIndex={99999}
    >
      <Text fontSize="30px" color="#FAF089">
        {currentIdx}
      </Text>

      <Text color="white" fontSize="30px">
        /
      </Text>

      <Text color="white" fontSize="30px">
        {count}
      </Text>
    </Flex>
  );
};

export default AnswerCount;
