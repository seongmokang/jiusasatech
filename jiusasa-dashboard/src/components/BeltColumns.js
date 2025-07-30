import React from "react";
import BeltColumn from "./BeltColumn";

// 띠 종류와 색상 매핑
const belts = [
  { key: "white", label: "White", color: "#fff" },
  { key: "blue", label: "Blue", color: "#fff" },
  { key: "purple", label: "Purple", color: "#fff" },
  { key: "brown", label: "Brown", color: "#fff" },
  { key: "black", label: "Black", color: "#fff" },
];

function BeltColumns({ students }) {
  // 띠별로 학생 분류
  const grouped = belts.map(belt => ({
    ...belt,
    students: students.filter(s => s.belt === belt.key),
  }));

  // 학생이 있는 벨트만 필터링
  const beltsWithStudents = grouped.filter(belt => belt.students.length > 0);
  
  // 전체 학생 수 계산
  const totalStudents = beltsWithStudents.reduce((sum, belt) => sum + belt.students.length, 0);

  return (
    <div style={{
      display: "flex",
      flex: 1,
      justifyContent: "space-around",
      alignItems: "stretch",
      gap: 32,
      width: "100%",
      height: "100%",
      overflow: "hidden",
    }}>
      {beltsWithStudents.map(belt => {
        // 각 벨트의 비율 계산 (최소 15% 보장)
        const ratio = totalStudents > 0 ? Math.max(0.15, belt.students.length / totalStudents) : 0.15;
        
        return (
          <BeltColumn 
            key={belt.key} 
            belt={belt} 
            students={belt.students}
            widthRatio={ratio}
          />
        );
      })}
    </div>
  );
}

export default BeltColumns;