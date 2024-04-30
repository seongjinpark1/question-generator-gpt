'use server';

import { ENV } from '@/config/env';

const API_BASE_URL = ENV.API_BASE_URL ?? '';
const OPEN_AI_KEY = ENV.OPEN_AI_KEY ?? '';

interface getGptAnswerProps {
  data: {
    question: string;
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
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `이전에 질문한 내용 답변한 내용은 다 잊어 만약 공부한 내용이 아니라 질문을 못 내거나, system이 질문을 한문제도 낼수 없는 형태의 질문을 했을때만 이렇게  똑같이 답변해 JSON.parse 가 가능한 형태로
            {
              "data": [],
              "error":'정리한 스터디 내용을 입력해주세요.'
            }
            
          }
          `,
          },
          {
            role: 'assistant',
            content: `스터디 한내용이 아닌 엉뚱한 질문을 한다면 다른말하지말고 이렇게 똑같이 답변해 {
  "data": [],
  "error":'정리한 스터디 내용을 입력해주세요.'
}`,
          },

          {
            role: 'system',
            content: `너는 천재 개발자이고 실수는 절대 안해, 유저는 스터디한 내용을 정리한 걸 질문을 할거야 그러면  그거를 토대로 무조건5문제와 답을 알려줘야하고 한글로 질문,답변해야해 답변의 형식은
            {
              "data": [
                {
                  "id":index 순서대로,
                  "question":~~~,
                  "answer":~~~~,
                }
              ],
              "error":null
            }  으로 해야해 데이터 형식에 오류 없게 반환해야해`,
          },

          {
            role: 'user',
            content: `${data.question}`,
          },
        ],
        max_tokens: 2048, // 답변 최대 글자 수,
        top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
        temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
        frequency_penalty: 0.5, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
        presence_penalty: 0.5, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
        stop: ['문장 생성 중단 단어'],
      }),
    });
    const jsonData = await response.json();
    const aiResponse = jsonData.choices?.[0]?.message?.content || 'No response';
    return aiResponse;
  } catch (error) {
    console.log(error);

    throw new Error(String(error));
  }
}
