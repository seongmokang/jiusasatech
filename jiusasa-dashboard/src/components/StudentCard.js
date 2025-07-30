import React from "react";

const STRIPE_COUNT = 5;

// 성별에 따른 이름 색상
const nameColor = gender =>
    gender === "male" ? "#1976d2" : "#ffd600";

// 이름 가운데 글자 * 처리 함수
function maskName(name) {
  if (name.length < 3) return name[0] + "*";
  return name[0] + "*" + name[name.length - 1];
}

function StudentCard({ student, widthRatio = 1 }) {
  // 비율에 따른 폰트 크기 계산
  const getFontSize = () => {
    if (widthRatio >= 0.4) return "1.8vw"; // 40% 이상이면 작게
    if (widthRatio >= 0.25) return "2vw"; // 25% 이상이면 보통
    return "2.2vw"; // 그 외에는 크게
  };
  
  const fontSize = getFontSize();
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: nameColor(student.gender), fontWeight: "bold", fontSize: fontSize, lineHeight: 1.1 }}>
          {maskName(student.name)}
        </div>
      </div>
      <div style={{ 
        fontSize: widthRatio >= 0.4 ? "0.8rem" : "1rem", 
        color: "#555",
        textAlign: "center"
      }}>
        {student.affiliation}
      </div>
    </div>
  );
}

export default StudentCard; 