'use client';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import History from './components/History';

import Question from './components/Question';
import Answer from './components/Answer';
import { useState } from 'react';

export interface QuestionListProps {
  data: ExamItemProps[] | null;
  error: null | string;
}

interface ExamItemProps {
  id: string;
  question: string;
  answer: string;
}

export interface HistoryItemProps {
  id: string;
  content: {
    question: string;
    answer: QuestionListProps;
  };
  created_at: string;
}

const Generate = () => {
  const [historyList, setHistoryList] = useState<HistoryItemProps[]>([]);
  const [questionList, setQuestionList] = useState<QuestionListProps | null>(
    null
  );
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);

  return (
    <>
      <Box zIndex={2} position="relative" w="100%">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex w="100%" h="calc(100vh - 70px)" bg="white">
            <History
              setQuestionList={setQuestionList}
              setIsOpenQuestion={setIsOpenQuestion}
              historyList={historyList}
              setHistoryList={setHistoryList}
            />
            <Question
              setQuestionList={setQuestionList}
              setIsOpenQuestion={setIsOpenQuestion}
              setHistoryList={setHistoryList}
            />
          </Flex>
        </motion.div>
        <Answer
          questionList={questionList}
          isOpenQuestion={isOpenQuestion}
          setIsOpenQuestion={setIsOpenQuestion}
        />
      </Box>
    </>
  );
};

export default Generate;
