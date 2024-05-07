'use client';
import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import History from './components/History';

import Question from './components/Question';
import Answer from './components/Answer';
import { useState } from 'react';

export interface ExamListProps {
  data: ExamItemProps[] | null;
  error: null | string;
}

interface ExamItemProps {
  id: string;
  question: string;
  answer: string;
}

export interface HistoryListProps {
  id: string;
  content: {
    question: string;
    answer: ExamListProps;
  };
  created_at: string;
}

const Generate = () => {
  const [historyList, setHistoryList] = useState<HistoryListProps[]>([]);
  const [examList, setExamList] = useState<ExamListProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box zIndex={2} position="relative" w="100%">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex w="100%" h="100vh" bg="white">
            <History
              setExamList={setExamList}
              setIsOpen={setIsOpen}
              historyList={historyList}
              setHistoryList={setHistoryList}
            />
            <Question
              setExamList={setExamList}
              setIsOpen={setIsOpen}
              setHistoryList={setHistoryList}
            />
          </Flex>
        </motion.div>
        <Answer examList={examList} isOpen={isOpen} setIsOpen={setIsOpen} />
      </Box>
    </>
  );
};

export default Generate;
