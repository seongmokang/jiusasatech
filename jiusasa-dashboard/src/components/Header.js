import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"; // 경로와 파일명 확인

function Header({ todayCount, totalCount, date }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isDashboard = location.pathname === "/";
  const isBracket = location.pathname === "/bracket";
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
      {/* 좌측: 로고 + 네비게이션 버튼 */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "30px" 
      }}>
        <img
          src={logo}
          alt="JIUSASA Logo"
          style={{ height: 100, objectFit: "contain" }}
        />
        {isDashboard && (
          <button
            onClick={() => navigate("/bracket")}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#222",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#444"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#222"}
          >
            대진표 보기
          </button>
        )}
        {isBracket && (
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: "#222",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#444"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#222"}
          >
            대시보드
          </button>
        )}
      </div>
      
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
        오늘 함께한 사람들 {todayCount}명 / 지금까지 함께한 사람들 {totalCount+566}명
        <span style={{ color: "#888", fontWeight: "bold", marginLeft: 8 }}>
          ({date})
        </span>
      </div>
    </div>
  );
}

export default Header; 