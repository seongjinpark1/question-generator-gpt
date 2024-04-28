import useMenuAnimation from '@/hooks/useMenuAnimation';
import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { ExamListProps } from '../Generate';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import { Swiper as SwiperWrapper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import { useCallback, useEffect, useState } from 'react';

interface AnswerProps {
  examList: ExamListProps | null;
  isShowBlack: boolean;
}
const Answer = ({ examList, isShowBlack }: AnswerProps) => {
  const { scope } = useMenuAnimation(isShowBlack);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState<boolean[]>(
    new Array(examList?.data?.length).fill(false)
  );

  const handleShowAnswer = useCallback(() => {
    const copyList = showAnswer.slice();
    copyList[activeIdx] = !copyList[activeIdx];

    setShowAnswer(copyList);
  }, [activeIdx, showAnswer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isShowBlack) return;
      if (e.key === ' ') {
        handleShowAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleShowAnswer, isShowBlack]);

  return (
    <Box display={isShowBlack ? 'block' : 'none'} ref={scope}>
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
        <Center
          position="fixed"
          right={20}
          top={20}
          zIndex={4}
          bg="yellow"
          borderRadius="50%"
          w="80px"
          h="80px"
          cursor="pointer"
          onClick={handleShowAnswer}
        >
          <Text fontSize="16px" fontWeight={500}>
            {showAnswer[activeIdx] ? '해설 숨기기' : '해설 보기'}
          </Text>
        </Center>
        <SwiperWrapper
          keyboard
          navigation
          modules={[Navigation, Keyboard]}
          style={{
            height: '100%',
          }}
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
                  Q{list.id}. {list.question}
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
                >
                  <Text color="yellow" fontSize="30px">
                    A. {list.answer}
                  </Text>
                </Box>
              )}
            </SwiperSlide>
          ))}
        </SwiperWrapper>
      </Box>
    </Box>
  );
};

export default Answer;
