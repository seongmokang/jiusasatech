import React from "react";

// 성별에 따른 이름 색상
const nameColor = gender =>
    gender === "male" ? "#1976d2" : "#ffd600";

// 이름 가운데 글자 * 처리 함수
function maskName(name) {
  if (name.length < 3) return name[0] + "*";
  return name[0] + "*" + name[name.length - 1];
}

// affiliation 줄바꿈 처리 함수 (5글자 초과 시)
function formatAffiliation(affiliation) {
  if (!affiliation || affiliation.length <= 5) {
    return affiliation;
  }
  
  // 5글자마다 줄바꿈
  const chunks = [];
  for (let i = 0; i < affiliation.length; i += 5) {
    chunks.push(affiliation.slice(i, i + 5));
  }
  
  return chunks;
}

function StudentCard({ student, widthRatio = 1 }) {
  return (
    <div className="student-card" style={{ marginBottom: 6 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="student-name" style={{ color: nameColor(student.gender), fontWeight: "bold", fontSize: "1.6vw", lineHeight: 1 }}>
          {maskName(student.name)}
        </div>
      </div>
      <div 
        className="student-affiliation"
        style={{ 
          fontSize: "0.8rem", 
          color: "#555",
          textAlign: "center",
          marginTop: 2,
          lineHeight: 1.2
        }}>
        {Array.isArray(formatAffiliation(student.affiliation)) ? (
          formatAffiliation(student.affiliation).map((chunk, index) => (
            <div key={index}>{chunk}</div>
          ))
        ) : (
          formatAffiliation(student.affiliation)
        )}
      </div>
    </div>
  );
}

export default StudentCard; 