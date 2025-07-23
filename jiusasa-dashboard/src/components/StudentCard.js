import React from "react";

const NAME_FONT_SIZE = "2vw"; // 이름 폰트 크기
const STRIPE_COUNT = 5;

// 성별에 따른 이름 색상
const nameColor = gender =>
    gender === "male" ? "#1976d2" : "#ffd600";

// 이름 가운데 글자 * 처리 함수
function maskName(name) {
  if (name.length < 3) return name[0] + "*";
  return name[0] + "*" + name[name.length - 1];
}

function StudentCard({ student }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: nameColor(student.gender), fontWeight: "bold", fontSize: NAME_FONT_SIZE, lineHeight: 1.1 }}>
          {maskName(student.name)}
        </div>
      </div>
      <div style={{ fontSize: 20, color: "#555" }}>{student.affiliation}</div>
    </div>
  );
}

export default StudentCard; 