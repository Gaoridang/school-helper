"use client";

import Realistic from "react-canvas-confetti/dist/presets/realistic";

const ReactCanvasConfetti = () => {
  const canvasStyles: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  };

  const decorateOptions = (originalOptions: any) => {
    return {
      ...originalOptions,
      particleCount: 100, // 조각 개수 설정
      spread: 160, // 퍼짐 정도 설정
      startVelocity: 50, // 초기 속도 설정
      ticks: 200, // 애니메이션 지속 시간 설정
      origin: { x: 0.5, y: 1 }, // 발사 위치 설정
      gravity: 2, // 중력 설정
    };
  };

  return (
    <Realistic
      autorun={{ speed: 0.5, duration: 3 }}
      style={canvasStyles}
      decorateOptions={decorateOptions} // 함수 실행을 위해 괄호를 추가
    />
  );
};

export default ReactCanvasConfetti;
