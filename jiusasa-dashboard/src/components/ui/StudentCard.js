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
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: nameColor(student.gender), fontWeight: "bold", fontSize: "1.6vw", lineHeight: 1 }}>
          {maskName(student.name)}
        </div>
      </div>
      <div style={{ 
        fontSize: "0.8rem", 
        color: "#555",
        textAlign: "center",
        marginTop: 2
      }}>
        {student.affiliation}
      </div>
    </div>
  );
}

export default StudentCard; 