import { Flex, Text } from '@chakra-ui/react';
import { ExamListProps, HistoryListProps } from '../Generate';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react';
import { getHistories } from '@/firebase/firebaseApi';

interface HistoryProps {
  setExamList: Dispatch<SetStateAction<ExamListProps | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const History = ({ setExamList, setIsOpen }: HistoryProps) => {
  const [isPending, startTransition] = useTransition();
  const [historyList, setHistoryList] = useState<HistoryListProps[]>([]);

  const handleSelectHistory = (data: HistoryListProps) => {
    setExamList(data.content.answer);
    setIsOpen(true);
  };

  useEffect(() => {
    startTransition(async () => {
      const res = await getHistories();
      setHistoryList(res);
    });
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
                    direction="column"
                    p="8px"
                    borderRadius="8px"
                    justifyContent="space-between"
                    gap="4px"
                    cursor="pointer"
                    onClick={() => handleSelectHistory(list)}
                    _hover={{
                      bg: '#EDF2F7',
                    }}
                  >
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
