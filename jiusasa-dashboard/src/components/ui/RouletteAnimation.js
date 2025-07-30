import React, { useState, useEffect } from 'react';

function RouletteAnimation({ isSpinning, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinningNames, setSpinningNames] = useState([]);
  const [finalWinner, setFinalWinner] = useState(null);

  useEffect(() => {
    if (isSpinning) {
      // 룰렛 돌리는 애니메이션 시작
      const interval = setInterval(() => {
        setCurrentIndex(prev => prev + 1);
      }, 100); // 빠른 속도로 이름들이 순환

      // 3초 후 애니메이션 완료
      setTimeout(() => {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isSpinning, onComplete]);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
      flexDirection: "column"
    }}>
      {/* 룰렛 원형 배경 */}
      <div style={{
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        border: "8px solid #ffd700",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        boxShadow: "0 0 50px rgba(255, 215, 0, 0.5)",
        animation: isSpinning ? "spin 0.1s linear infinite" : "none"
      }}>
        {/* 중앙 포인터 */}
        <div style={{
          position: "absolute",
          top: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "20px solid #e74c3c",
          zIndex: 10
        }} />
        
        {/* 룰렛 내용 */}
        <div style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          animation: isSpinning ? "blur 0.1s ease-in-out infinite alternate" : "none"
        }}>
          {isSpinning ? "🎯" : "🎉"}
        </div>
      </div>
      
      {/* 하단 텍스트 */}
      <div style={{
        marginTop: "30px",
        fontSize: "28px",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        animation: isSpinning ? "pulse 0.5s ease-in-out infinite" : "none"
      }}>
        {isSpinning ? "룰렛 돌리는 중..." : "추첨 완료!"}
      </div>
      
      {/* 파티클 효과 */}
      {isSpinning && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none"
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                backgroundColor: "#ffd700",
                borderRadius: "50%",
                animation: `particle ${2 + Math.random() * 2}s linear infinite`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RouletteAnimation; 