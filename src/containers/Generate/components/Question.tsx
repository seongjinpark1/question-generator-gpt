import { Flex, Button, Textarea, Text } from '@chakra-ui/react';

import { Dispatch, SetStateAction, useState, useTransition } from 'react';
import { getGptAnswer } from '../actions/get-gpt';
import { HistoryItemProps, QuestionListProps } from '../Generate';
import Loading from '@/components/Loading';

import formatDate from '@/utils/format/formatDate';

import { saveDb } from '@/firebase/firebaseApi';
import CustomSelect from '@/components/CustomSelect';
import { MENU_LIST } from '@/components/constants/constants';
import {
  QUIZ_PLACEHOLDER,
  STUDY_PLACEHOLDER,
} from '@/components/constants/placeholder';
import useGetHistory from '@/hooks/useGetHistory';

interface QuestionProps {
  setQuestionList: Dispatch<SetStateAction<QuestionListProps | null>>;
  setIsOpenQuestion: Dispatch<SetStateAction<boolean>>;
  setHistoryList: Dispatch<SetStateAction<HistoryItemProps[]>>;
}
let count = 0;
const Question = ({
  setQuestionList,
  setIsOpenQuestion,
  setHistoryList,
}: QuestionProps) => {
  const { handleGetHistory } = useGetHistory();
  const [selectType, setSelectType] = useState(MENU_LIST[0]);
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

  const handleFetch = () => {
    try {
      startTransition(async () => {
        try {
          const data = await getGptAnswer({
            data: {
              question: inputValue,
              type: selectType.value,
            },
          });

          const parseData = JSON.parse(data);

          if (!parseData.error) {
            setIsOpenQuestion(true);
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

  const onSuccess = (parseData: QuestionListProps) => {
    setQuestionList(parseData);
    setInputValue('');
    saveDb(parseData, date, inputValue);
    handleGetHistory(setHistoryList);
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

        <Flex gap="10px">
          <CustomSelect selectType={selectType} setSelectType={setSelectType} />
          <Button
            border="1px solid"
            borderColor="#e3d5ca"
            borderRadius="16px"
            px="16px"
            h="32px"
            bg="#e3d5ca"
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            _hover={{
              opacity: '0.7',
            }}
            isDisabled={isDisabled}
            _disabled={{
              bg: '#CBD5E0',
              borderColor: '#CBD5E0',
            }}
            isLoading={isPending}
            _loading={{
              color: 'white',
              borderColor: '#CBD5E0',
            }}
            onClick={handleFetch}
          >
            <Text color="white">Generate</Text>
          </Button>
        </Flex>
      </Flex>
      <Textarea
        w="100%"
        h="100%"
        p="16px"
        resize="none"
        borderColor="#e3e3e3"
        borderRadius="16px"
        fontSize="20px"
        placeholder={
          selectType.value === 'study' ? STUDY_PLACEHOLDER : QUIZ_PLACEHOLDER
        }
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
