import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { HistoryItemProps } from '../Generate';
import { MouseEvent } from 'react';

interface HistoryListProps {
  handleSelectHistory: (data: HistoryItemProps) => void;
  handleDeleteHistory: (
    e: MouseEvent<HTMLImageElement>,
    id: string
  ) => Promise<void>;
  historyList: HistoryItemProps[];
}
const HistoryList = ({
  historyList,
  handleDeleteHistory,
  handleSelectHistory,
}: HistoryListProps) => {
  return (
    <Flex direction="column" overflowY="auto">
      {historyList.length === 0 ? (
        <Text fontSize="14px" textAlign="center">
          등록된 질문이 없습니다.
        </Text>
      ) : (
        <>
          {historyList.map((list) => {
            return (
              <Flex
                key={list.id}
                p="8px"
                borderRadius="8px"
                alignItems="center"
                cursor="pointer"
                gap="10px"
                onClick={() => handleSelectHistory(list)}
                _hover={{
                  bg: '#EDF2F7',
                }}
              >
                <Flex direction="column" gap="4px">
                  <Text fontSize="14px" fontWeight={500} mt="4px" noOfLines={1}>
                    {list.content.question}
                  </Text>
                  <Text
                    minW="fit-content"
                    fontSize="12px"
                    color="#A0AEC0"
                    mt="4px"
                  >
                    {list.created_at}
                  </Text>
                </Flex>
                <Image
                  src="/icons/trash.svg"
                  alt="trash"
                  width={15}
                  height={15}
                  onClick={(e) => {
                    handleDeleteHistory(e, list.id);
                  }}
                />
              </Flex>
            );
          })}
        </>
      )}
    </Flex>
  );
};

export default HistoryList;
