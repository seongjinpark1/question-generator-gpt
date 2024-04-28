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
  id: number;
  question: string;
  answer: string;
}
const Generate = () => {
  const [examList, setExamList] = useState<ExamListProps | null>(null);
  const [isShowBlack, setIsShowBlack] = useState(false);
  return (
    <>
      <Box zIndex={2} position="relative" p="16px" w="100%">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Flex w="100%" h="calc(100vh - 32px)" bg="white" borderRadius="16px">
            <History />
            <Question
              setExamList={setExamList}
              setIsShowBlack={setIsShowBlack}
            />
          </Flex>
        </motion.div>
        <Answer examList={examList} isShowBlack={isShowBlack} />
      </Box>
    </>
  );
};

export default Generate;
