import { Flex, Button, Textarea, Text } from '@chakra-ui/react';

import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { getGptAnswer } from '../actions/get-gpt';
import { ExamListProps, HistoryListProps } from '../Generate';
import Loading from '@/components/Loading';

import formatDate from '@/utils/format/formatDate';

import { getHistories, saveDb } from '@/firebase/firebaseApi';

interface QuestionProps {
  setExamList: Dispatch<SetStateAction<ExamListProps | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setHistoryList: Dispatch<SetStateAction<HistoryListProps[]>>;
}
let count = 0;
const Question = ({
  setExamList,
  setIsOpen,
  setHistoryList,
}: QuestionProps) => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const { date } = formatDate();
  const isDisabled = inputValue.replaceAll(' ', '').length === 0;

  const handleError = () => {
    if (count === 3) {
      alert('알 수 없는 에러가 발생했습니다. 새로고침하고 다시 시도해주세요.');
      return;
    }
    handleFetch();
    count++;
  };

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

  const handleFetch = () => {
    try {
      startTransition(async () => {
        try {
          const data = await getGptAnswer({
            data: {
              question: inputValue,
            },
          });

          const parseData = JSON.parse(data);

          if (!parseData.error) {
            setIsOpen(true);
          }
          if (parseData.error) {
            alert(parseData.error);
            return;
          }

          onSuccess(parseData);
        } catch (err) {
          handleError();
        }
      });
    } catch (err) {
      handleError();
    }
  };

  const onSuccess = (parseData: ExamListProps) => {
    setExamList(parseData);
    setInputValue('');
    saveDb(parseData, date, inputValue);
    handleGetHistory();
  };

  return (
    <Flex
      bg="white"
      flex={4}
      borderRadius="16px"
      p="32px 16px"
      direction="column"
      gap="28px"
    >
      <Flex p="8px" h="40px" alignItems="center" justifyContent="space-between">
        <Text fontSize="20px" fontWeight="500">
          Question
        </Text>

        <Button
          border="1px solid"
          borderRadius="16px"
          px="16px"
          h="32px"
          bg="black"
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          _hover={{
            opacity: '0.7',
          }}
          isDisabled={isDisabled}
          _disabled={{
            bg: '#CBD5E0',
            border: 'none',
          }}
          isLoading={isPending}
          _loading={{
            color: 'white',
            borderColor: 'black',
          }}
          onClick={handleFetch}
        >
          <Text color="white">Generate</Text>
        </Button>
      </Flex>
      <Textarea
        w="100%"
        h="100%"
        p="16px"
        resize="none"
        borderColor="#e3e3e3"
        borderRadius="16px"
        fontSize="20px"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        _focusVisible={{
          outline: 'none',
        }}
      />
      {isPending && <Loading />}
    </Flex>
  );
};

export default Question;
