import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { QuestionListProps, HistoryItemProps } from '../Generate';
import { Dispatch, MouseEvent, SetStateAction, useEffect } from 'react';
import { deleteHistory } from '@/firebase/firebaseApi';

import HistoryList from './HistoryList';
import useGetHistory from '@/hooks/useGetHistory';
import Loading from '@/components/Loading';

interface HistoryProps {
  setQuestionList: Dispatch<SetStateAction<QuestionListProps | null>>;
  setIsOpenQuestion: Dispatch<SetStateAction<boolean>>;
  historyList: HistoryItemProps[];
  setHistoryList: Dispatch<SetStateAction<HistoryItemProps[]>>;
}
const History = ({
  historyList,
  setHistoryList,
  setQuestionList,
  setIsOpenQuestion,
}: HistoryProps) => {
  const { isPending, handleGetHistory } = useGetHistory();

  const handleSelectHistory = (data: HistoryItemProps) => {
    setQuestionList(data.content.answer);
    setIsOpenQuestion(true);
  };

  const handleDeleteHistory = async (
    e: MouseEvent<HTMLImageElement>,
    id: string
  ) => {
    e.stopPropagation();
    await deleteHistory(id);
    handleGetHistory(setHistoryList);
  };

  useEffect(() => {
    handleGetHistory(setHistoryList);
  }, []);

  return (
    <>
      <Flex
        bg="#fcf8f5"
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
        {isPending ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <HistoryList
            historyList={historyList}
            handleSelectHistory={handleSelectHistory}
            handleDeleteHistory={handleDeleteHistory}
          />
        )}
      </Flex>
    </>
  );
};

export default History;
