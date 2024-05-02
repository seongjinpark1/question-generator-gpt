import { Flex, Text } from '@chakra-ui/react';
import { ExamListProps, HistoryListProps } from '../Generate';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { deleteHistory, getHistories } from '@/firebase/firebaseApi';
import Image from 'next/image';

interface HistoryProps {
  setExamList: Dispatch<SetStateAction<ExamListProps | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  historyList: HistoryListProps[];
  setHistoryList: Dispatch<SetStateAction<HistoryListProps[]>>;
}
const History = ({
  historyList,
  setHistoryList,
  setExamList,
  setIsOpen,
}: HistoryProps) => {
  const [isPending, startTransition] = useTransition();

  const handleGetHistory = () => {
    startTransition(async () => {
      const res = await getHistories();
      const sortDate = res.toSorted((item1, item2) => {
        return (
          Number(new Date(item2.created_at)) -
          Number(new Date(item1.created_at))
        );
      });
      setHistoryList(sortDate);
    });
  };

  const handleSelectHistory = (data: HistoryListProps) => {
    setExamList(data.content.answer);
    setIsOpen(true);
  };

  const handleDeleteHistory = (e: MouseEvent<HTMLImageElement>, id: string) => {
    e.stopPropagation();
    deleteHistory(id);
    handleGetHistory();
  };

  useEffect(() => {
    handleGetHistory();
  }, []);

  return (
    <>
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
                      <Text
                        fontSize="14px"
                        fontWeight={500}
                        mt="4px"
                        noOfLines={1}
                      >
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
      </Flex>
    </>
  );
};

export default History;
