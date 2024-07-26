export const PRESET_ANSWERS = {
  "1": {
    message:
      "CheckMate는 학생 스스로 자신의 목표를 세우고, 성취도를 파악하여 메타인지를 향상시키기 위한 서비스입니다.",
  },
  "2": {
    message:
      "자기평가 옆 새로 만들기를 눌러 평가지를 만들 수 있습니다. 이미 평가지를 만든 경우에는 자기평가 시작하기를 눌러 평가를 시작할 수 있습니다.",
  },
};

export const PRESET_QUESTIONS = [
  {
    answerId: "1",
    isBot: false,
    isUser: false,
    isQuestion: true,
    message: "무엇을 위한 서비스인가요?",
  },
  {
    answerId: "2",
    isBot: false,
    isUser: false,
    isQuestion: true,
    message: "자기평가는 어떻게 시작하나요?",
  },
];

export const PRESET_MESSAGES = [
  {
    answerId: "0",
    message: "안녕하세요! 무엇을 도와드릴까요?",
    isBot: true,
    isUser: false,
    isQuestion: false,
  },
  ...PRESET_QUESTIONS,
];
