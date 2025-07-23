import React from "react";
import StudentCard from "./StudentCard";

// 2개씩 배열을 나누는 유틸 함수
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

// 띠별 라벨 색상 매핑
const beltLabelColors = {
    white: "#222",      // 검정
    blue: "#1976d2",    // 파랑
    brown: "#8d5524",   // 갈색
    purple: "#7c3aed",  // 보라
    black: "#222"       // 검정
  };

// 띠별 테두리 색상 매핑
const beltBorderColors = {
  white: "#bbb",
  blue: "#1976d2",
  brown: "#8d5524",
  purple: "#7c3aed",
  black: "#222"
};

function BeltColumn({ belt, students }) {
  // 2개씩 묶기
  const rows = chunkArray(students, 2);

    // 띠 이름 색상: 띠별 고정
    const beltLabelColor = beltLabelColors[belt.key] || "#222";
    const borderColor = beltBorderColors[belt.key] || "#222";

  return (
    <div
      style={{
        background: belt.color,
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
      }}
    >
      <div style={{
        fontWeight: "bold",
        marginBottom: "2vh",
        fontSize: "2vw",
        color: beltLabelColor
      }}>
        {belt.label}
      </div>
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
          {row.map((student, idx) => (
            <StudentCard key={idx} student={student} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default BeltColumn; 