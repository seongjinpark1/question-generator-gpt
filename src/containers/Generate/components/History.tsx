import { Flex, Text } from '@chakra-ui/react';

const History = () => {
  return (
    <Flex
      bg="#F9F9F9"
      flex={1}
      borderRadius="16px 0 0 16px"
      p="32px 16px"
      direction="column"
      gap="28px"
    >
      <Flex p="8px" h="40px">
        <Text fontSize="20px" fontWeight="500">
          History
        </Text>
      </Flex>
      <Flex direction="column" overflowY="auto">
        {new Array(30).fill(0).map((list, idx) => {
          return (
            <Flex
              key={idx}
              p="8px"
              h="40px"
              borderRadius="8px"
              _hover={{
                bg: '#ececec',
              }}
            >
              <Text fontSize="14px" mt="4px" noOfLines={1}>
                히스토리{idx}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default History;
