'use server';

import { GPT_MESSAGES } from '@/components/constants/gpt';
import { MenuListValueType } from '@/components/types/types';
import { ENV } from '@/config/env';

const API_BASE_URL = ENV.API_BASE_URL ?? '';
const OPEN_AI_KEY = ENV.OPEN_AI_KEY ?? '';

interface getGptAnswerProps {
  data: {
    question: string;
    type: MenuListValueType;
  };
}
export async function getGptAnswer({ data }: getGptAnswerProps) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_AI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          ...GPT_MESSAGES[data.type],
          {
            role: 'user',
            content: `${data.question}`,
          },
        ],
        max_tokens: 4096, // 답변 최대 글자 수,
        top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
        temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
        // frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
        // presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
        stop: ['*'],
      }),
    });
    const jsonData = await response.json();
    const aiResponse = jsonData.choices?.[0]?.message?.content || 'No response';
    console.log('@@', aiResponse);
    return aiResponse;
  } catch (error) {
    console.log(error);

    throw new Error(String(error));
  }
}
