import { Flex, Button, Textarea, Text } from '@chakra-ui/react';

import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { getGptAnswer } from '../actions/get-gpt';
import { ExamListProps } from '../Generate';
import Loading from '@/components/Loading';
import { addDoc, collection } from 'firebase/firestore';

import formatDate from '@/utils/format/formatDate';
import fireStore from '@/firebase/fireStore';
import { saveDb } from '@/firebase/firebaseApi';

interface QuestionProps {
  setExamList: Dispatch<SetStateAction<ExamListProps | null>>;
  setIsShowBlack: Dispatch<SetStateAction<boolean>>;
}
let count = 0;
const Question = ({ setExamList, setIsShowBlack }: QuestionProps) => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState('');
  const { date } = formatDate();

  const handleError = () => {
    if (count === 3) {
      alert('알 수 없는 에러가 발생했습니다. 새로고침하고 다시 시도해주세요.');
      return;
    }
    handleFetch();
    count++;
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
            setIsShowBlack(true);
          }
          if (parseData.error) {
            alert(parseData.error);
            return;
          }

          setExamList(parseData);
          saveDb(parseData, date, inputValue);
        } catch (err) {
          handleError();
        }
      });
    } catch (err) {
      handleError();
    }
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
          cursor="pointer"
          _hover={{
            opacity: '0.7',
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (e.nativeEvent.isComposing) return;
            handleFetch();
          }
        }}
        _focusVisible={{
          outline: 'none',
        }}
      />
      {isPending && <Loading />}
    </Flex>
  );
};

export default Question;
