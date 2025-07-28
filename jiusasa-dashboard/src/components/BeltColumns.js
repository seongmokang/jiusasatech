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
      {grouped.map(belt => (
        <BeltColumn key={belt.key} belt={belt} students={belt.students} />
      ))}
    </div>
  );
}

export default BeltColumns;