import React, { useRef, useEffect } from "react";
import StudentCard from "../../components/ui/StudentCard";
import { BELT_LABEL_COLORS, BELT_BORDER_COLORS } from "../../constants/beltConfig";

// 2개씩 배열을 나누는 유틸 함수
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

function BeltColumn({ belt, students, widthRatio = 1 }) {
  const scrollRef = useRef(null);
  const autoScrollRef = useRef(null);
  const isManualScrollingRef = useRef(false);
  const scrollDirectionRef = useRef(1);
  
  // 비율에 따라 가로로 표시할 학생 수 계산 (글자수 한 개 높이 간격)
  const getStudentsPerRow = () => {
    if (widthRatio >= 0.3) return 4; // 30% 이상이면 4명씩
    return 2; // 그 외에는 4명씩
  };
  
  const studentsPerRow = getStudentsPerRow();
  const rows = chunkArray(students, studentsPerRow);

  // 띠 이름 색상: 띠별 고정
  const beltLabelColor = BELT_LABEL_COLORS[belt.key] || "#222";
  const borderColor = BELT_BORDER_COLORS[belt.key] || "#222";

  // 자동 스크롤 효과
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || students.length <= 6) return; // 학생이 6명 이하면 스크롤 안함

    scrollDirectionRef.current = 1; // 초기 방향 설정
    const scrollSpeed = 2; // 스크롤 속도 (픽셀/프레임)
    const scrollInterval = 50; // 스크롤 간격 (ms)

    const autoScroll = () => {
      if (!scrollContainer || isManualScrollingRef.current) return;

      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      const currentScrollTop = scrollContainer.scrollTop;
      
      if (currentScrollTop >= maxScroll) {
        scrollDirectionRef.current = -1; // 위로 스크롤
      } else if (currentScrollTop <= 0) {
        scrollDirectionRef.current = 1; // 아래로 스크롤
      }

      const newScrollTop = currentScrollTop + (scrollSpeed * scrollDirectionRef.current);
      scrollContainer.scrollTop = newScrollTop;
    };

    autoScrollRef.current = setInterval(autoScroll, scrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
    
  }, [students.length]);

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
      // 자동 스크롤 재시작 (원래 속도 유지)
      const scrollContainer = scrollRef.current;
      if (scrollContainer && students.length > 6) {
        const scrollSpeed = 2;
        const scrollInterval = 50;
        // 현재 위치에 따라 방향 결정
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const currentScrollTop = scrollContainer.scrollTop;
        if (currentScrollTop >= maxScroll) {
          scrollDirectionRef.current = -1;
        } else if (currentScrollTop <= 0) {
          scrollDirectionRef.current = 1;
        }
        autoScrollRef.current = setInterval(() => {
          if (!scrollContainer || isManualScrollingRef.current) return;

          const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          const currentScrollTop = scrollContainer.scrollTop;
          if (currentScrollTop >= maxScroll) {
            scrollDirectionRef.current = -1;
          } else if (currentScrollTop <= 0) {
            scrollDirectionRef.current = 1;
          }
          const newScrollTop = currentScrollTop + (scrollSpeed * scrollDirectionRef.current);
          scrollContainer.scrollTop = newScrollTop;
        }, scrollInterval);
      }
    }, 1000);
  };

  return (
    <div
      style={{
        background: belt.color,
        borderRadius: 24,
        padding: "2vw 1vw",
        minWidth: 0,
        flex: widthRatio,
        minHeight: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        textAlign: "center",
        border: `3px solid ${borderColor}`,
        margin: "1vw 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden", // 스크롤을 위한 설정
      }}
    >
      <div style={{
        fontWeight: "bold",
        marginBottom: "2vh",
        fontSize: "2vw",
        color: beltLabelColor,
        flexShrink: 0 // 헤더는 고정
      }}>
        {belt.label}
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
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} style={{ 
            display: "flex", 
            justifyContent: "center", 
            gap: widthRatio >= 0.4 ? 12 : 16, 
            marginBottom: 20
          }}>
            {row.map((student, idx) => (
              <StudentCard key={idx} student={student} widthRatio={widthRatio} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BeltColumn; 