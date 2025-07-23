import React from "react";
import logo from "../assets/logo.png"; // 경로와 파일명 확인

function Header({ todayCount, totalCount, date }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        padding: "20px 20px 10px 20px",
        boxSizing: "border-box",
        minHeight: "100px", // 필요시 높이 조정
      }}
    >
      {/* 좌측: 로고 */}
      <img
        src={logo}
        alt="MAGOK WIRE JIU-JITSU Logo"
        style={{ height: 80, objectFit: "contain" }}
      />
      {/* 우측: 출석 정보 + 날짜 */}
      <div
        style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%", // 부모 높이만큼 세로 중앙
        }}
      >
        오늘 출석 {todayCount}명 / 지금까지 함께한 사람들 {totalCount+566}명
        <span style={{ color: "#888", fontWeight: "bold", marginLeft: 8 }}>
          ({date})
        </span>
      </div>
    </div>
  );
}

export default Header; 