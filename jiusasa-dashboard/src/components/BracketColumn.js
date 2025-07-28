import React, { useRef, useEffect } from 'react';
import MatchCard from './MatchCard';

// 띠별 라벨 색상 매핑 (대시보드와 동일)
const beltLabelColors = {
  white: "#222",      // 검정
  blue: "#1976d2",    // 파랑
  brown: "#8d5524",   // 갈색
  purple: "#7c3aed",  // 보라
  black: "#222"       // 검정
};

// 띠별 테두리 색상 매핑 (대시보드와 동일)
const beltBorderColors = {
  white: "#bbb",
  blue: "#1976d2",
  brown: "#8d5524",
  purple: "#7c3aed",
  black: "#222"
};

// 띠별 배경색 매핑 (대시보드와 동일)
const beltColors = {
  white: '#fff',
  blue: '#fff',
  brown: '#fff',
  purple: '#fff',
  black: '#fff'
};

function BracketColumn({ belt, matches }) {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isManualScrollingRef = useRef(false);
  const scrollPositionRef = useRef(0);
  const scrollDirectionRef = useRef(1);
  
  const beltNames = {
    white: 'White',
    blue: 'Blue',
    brown: 'Brown',
    purple: 'Purple',
    black: 'Black'
  };

  const beltLabelColor = beltLabelColors[belt] || "#222";
  const borderColor = beltBorderColors[belt] || "#222";
  const backgroundColor = beltColors[belt] || "#fff";

    // 자동 스크롤 효과
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || matches.length <= 3) return; // 대진이 3개 이하면 스크롤 안함

    scrollDirectionRef.current = 1; // 초기 방향 설정
    scrollPositionRef.current = scrollContainer.scrollTop; // 현재 스크롤 위치로 초기화
    const scrollSpeed = 5; // 스크롤 속도 (픽셀/프레임) - 더 빠르게
    const scrollInterval = 1; // 스크롤 간격 (ms) - 더 빠른 업데이트

    const autoScroll = () => {
      if (!scrollContainer || isManualScrollingRef.current) return;

      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      
      if (scrollPositionRef.current >= maxScroll) {
        scrollDirectionRef.current = -1; // 위로 스크롤
      } else if (scrollPositionRef.current <= 0) {
        scrollDirectionRef.current = 1; // 아래로 스크롤
      }

      scrollPositionRef.current += scrollSpeed * scrollDirectionRef.current;
      scrollContainer.scrollTop = scrollPositionRef.current;
    };

    autoScrollRef.current = setInterval(autoScroll, scrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [matches.length]);

  // 수동 스크롤 이벤트 핸들러
  const handleScroll = () => {
    // 수동 스크롤 시작 시 자동 스크롤 중단
    isManualScrollingRef.current = true;
    
    // 기존 타이머가 있다면 클리어
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    
    // 1초 후 자동 스크롤 재개
    setTimeout(() => {
      isManualScrollingRef.current = false;
      // 수동 스크롤 후 현재 위치로 scrollPosition 동기화
      if (scrollRef.current) {
        scrollPositionRef.current = scrollRef.current.scrollTop;
        // 수동 스크롤 후 방향을 기본값으로 초기화
        scrollDirectionRef.current = 1;
      }
      
      // 자동 스크롤 재시작
      const scrollContainer = scrollRef.current;
      if (scrollContainer && matches.length > 3) {
        const scrollSpeed = 5;
        const scrollInterval = 1;
        
        autoScrollRef.current = setInterval(() => {
          if (!scrollContainer || isManualScrollingRef.current) return;

          const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          
          if (scrollPositionRef.current >= maxScroll) {
            scrollDirectionRef.current = -1;
          } else if (scrollPositionRef.current <= 0) {
            scrollDirectionRef.current = 1;
          }

          scrollPositionRef.current += scrollSpeed * scrollDirectionRef.current;
          scrollContainer.scrollTop = scrollPositionRef.current;
        }, scrollInterval);
      }
    }, 1000);
  };

  return (
    <div style={{
      background: backgroundColor,
      borderRadius: 24,
      padding: "2vw 1vw",
      minWidth: 0,
      flex: 1,
      minHeight: 0,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      textAlign: "center",
      border: `3px solid ${borderColor}`,
      margin: "1vw 0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      overflow: "hidden", // 스크롤을 위한 설정
    }}>
      <div style={{
        fontWeight: "bold",
        marginBottom: "2vh",
        fontSize: "2vw",
        color: beltLabelColor,
        flexShrink: 0 // 헤더는 고정
      }}>
        {beltNames[belt]}
      </div>
      <div 
        ref={scrollRef}
        className="scrollbar-hidden"
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          width: "100%"
        }}
        onScroll={handleScroll}
      >
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <MatchCard
              key={index}
              match={match}
              matchNumber={index + 1}
            />
          ))
        ) : (
          <div style={{
            textAlign: 'center',
            color: '#666',
            fontStyle: 'italic',
            padding: '20px',
            fontSize: '1.5vw'
          }}>
            대진이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

export default BracketColumn; 