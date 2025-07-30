import React from "react";
import BeltColumn from "./BeltColumn";
import { BELTS } from "../../constants/beltConfig";
import { BELT_WIDTH_RATIOS } from "../../constants/config";

function BeltColumns({ students }) {
  // 띠별로 학생 분류
  const grouped = BELTS.map(belt => ({
    ...belt,
    students: students.filter(s => s.belt === belt.key),
  }));

  // 학생이 있는 벨트만 필터링
  const beltsWithStudents = grouped.filter(belt => belt.students.length > 0);

  return (
    <div 
      className="belt-columns-container"
      style={{
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
        // 학생 수에 따른 단계별 고정 너비
        const getWidthRatio = (studentCount) => {
          if (studentCount === 1) return BELT_WIDTH_RATIOS.ONE_STUDENT;
          if (studentCount === 2) return BELT_WIDTH_RATIOS.TWO_STUDENTS;
          return BELT_WIDTH_RATIOS.THREE_OR_MORE;
        };
        
        const ratio = getWidthRatio(belt.students.length);
        
        return (
          <BeltColumn 
            key={belt.key} 
            belt={belt} 
            students={belt.students}
            widthRatio={ratio}
            className="belt-column"
          />
        );
      })}
    </div>
  );
}

export default BeltColumns;