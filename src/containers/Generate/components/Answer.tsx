import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ExamListProps } from '../Generate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import { Swiper as SwiperWrapper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import AnswerCount from './AnswerCount';
import Swiper from 'swiper';

interface AnswerProps {
  examList: ExamListProps | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const Answer = ({ examList, isOpen, setIsOpen }: AnswerProps) => {
  const [swiperEvent, setSwiperEvent] = useState<Swiper>();

  const [activeIdx, setActiveIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    new Array(examList?.data?.length).fill(false)
  );

  const handleShowAnswer = useCallback(() => {
    const copyList = showAnswer.slice();
    copyList[activeIdx] = !copyList[activeIdx];

    setShowAnswer(copyList);
  }, [activeIdx, showAnswer]);

  const handleReTry = () => {
    setIsOpen(false);
    setActiveIdx(0);
    swiperEvent?.slideTo(0);
    setShowAnswer(new Array(examList?.data?.length).fill(false));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === ' ') {
        handleShowAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleShowAnswer, isOpen]);

  return (
    <Box display={isOpen ? 'block' : 'none'}>
      <Box
        className="container"
        w="100%"
        h="100vh"
        bg="black"
        position="fixed"
        top="0"
        left="0"
        zIndex={3}
        p="32px"
      >
        <Flex
          position="fixed"
          alignItems="center"
          right={10}
          top={10}
          zIndex={4}
          gap="10px"
        >
          <Center
            bg="#F56565"
            borderRadius="50%"
            w="70px"
            h="70px"
            cursor="pointer"
            onClick={handleReTry}
          >
            <Text fontSize="16px" fontWeight={500}>
              ReTry
            </Text>
          </Center>
          <Center
            bg="#FAF089"
            borderRadius="50%"
            w="70px"
            h="70px"
            cursor="pointer"
            onClick={handleShowAnswer}
          >
            <Text fontSize="16px" fontWeight={500}>
              {showAnswer[activeIdx] ? 'Hide' : 'Answer'}
            </Text>
          </Center>
        </Flex>
        <SwiperWrapper
          keyboard
          navigation
          modules={[Navigation, Keyboard]}
          style={{
            height: '100%',
          }}
          onBeforeInit={(e) => setSwiperEvent(e)}
          onSlideChange={(e) => setActiveIdx(e.activeIndex)}
        >
          {examList?.data?.map((list, idx) => (
            <SwiperSlide
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                position: 'relative',
              }}
            >
              <Flex
                as="li"
                key={idx}
                direction="column"
                py="8px"
                gap="10px"
                w="80%"
              >
                <Text color="white" fontSize="50px">
                  Q{idx + 1}. {list.question}
                </Text>
              </Flex>

              {showAnswer[idx] && (
                <Box
                  p="16px"
                  position="absolute"
                  left="0"
                  bottom="00px"
                  border="1px solid yellow"
                  w="100%"
                  h="200px"
                  overflowY="auto"
                >
                  <Text
                    color="yellow"
                    fontSize="30px"
                    wordBreak="break-all"
                    dangerouslySetInnerHTML={{
                      __html: `${list.answer.replaceAll('\n', '<br />')}`,
                    }}
                  />
                </Box>
              )}
            </SwiperSlide>
          ))}
        </SwiperWrapper>
        <AnswerCount
          count={examList?.data?.length || 0}
          currentIdx={activeIdx + 1}
        />
      </Box>
    </Box>
  );
};

export default Answer;
