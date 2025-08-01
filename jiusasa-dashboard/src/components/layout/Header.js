import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
console.log('Logo loaded:', logo);

function Header({ todayCount = 0, totalCount = 0, date, onDrawWinners, winners = [], isDrawing = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDrawPopup, setShowDrawPopup] = useState(false);
  const [drawCount, setDrawCount] = useState(3);
  
  const isDashboard = location.pathname === "/";
  const isBracket = location.pathname === "/bracket";
  return (
    <div
      className="header-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "100%",
        padding: "20px 20px 10px 20px",
        boxSizing: "border-box",
        minHeight: "100px",
      }}
    >
      {/* 모바일에서는 첫 번째 행 - 로고와 네비게이션 */}
      <div className="header-top-row" style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "30px" 
      }}>
        <img
          className="header-logo"
          src={logo}
          alt="JIUSASA Logo"
          style={{ height: 100, objectFit: "contain" }}
        />
        
        <div className="header-nav-buttons" style={{
          display: "flex",
          gap: "30px",
          alignItems: "center"
        }}>
          {isDashboard && (
            <>
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
                대진
              </button>
              <button
                onClick={() => setShowDrawPopup(true)}
                disabled={isDrawing || todayCount === 0}
                style={{
                  padding: "12px 20px",
                  fontSize: "16px",
                  backgroundColor: isDrawing || todayCount === 0 ? "#ccc" : "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: isDrawing || todayCount === 0 ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => {
                  if (!isDrawing && todayCount > 0) {
                    e.target.style.backgroundColor = "#c0392b";
                  }
                }}
                onMouseOut={(e) => {
                  if (!isDrawing && todayCount > 0) {
                    e.target.style.backgroundColor = "#e74c3c";
                  }
                }}
              >
                {isDrawing ? "추첨 중..." : "추첨"}
              </button>
            </>
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
      </div>
      
      {/* 모바일에서는 두 번째 행 - 출석 정보 */}
      <div
        className="header-attendance-info"
        style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
        }}
      >
        <div>
          오늘 함께한 사람들 {todayCount}명 / 지금까지 함께한 사람들 {totalCount+566}명
          <span className="header-attendance-date" style={{ color: "#888", fontWeight: "bold", marginLeft: 8 }}>
            <br></br>({date})
          </span>
        </div>
      </div>
      
      {/* 추첨 팝업 */}
      {showDrawPopup && (
        <div 
          className="draw-popup-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px"
          }}>
          <div 
            className="draw-popup-content"
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              minWidth: "400px",
              maxWidth: "90vw",
              width: "100%",
              textAlign: "center"
            }}>
            <h2 style={{
              margin: "0 0 20px 0",
              color: "#333",
              fontSize: "24px"
            }}>
              🎯 룰렛 추첨
            </h2>
            
            <div style={{
              marginBottom: "20px",
              fontSize: "16px",
              color: "#666"
            }}>
              오늘 출석: <strong>{todayCount}명</strong>
            </div>
            
            <div style={{
              marginBottom: "30px"
            }}>
              <label style={{
                display: "block",
                marginBottom: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#333"
              }}>
                추첨할 인원 수:
              </label>
              <input
                type="number"
                min="1"
                max={todayCount}
                value={drawCount}
                onChange={(e) => setDrawCount(parseInt(e.target.value) || 1)}
                style={{
                  width: "100px",
                  padding: "10px",
                  fontSize: "18px",
                  border: "2px solid #ddd",
                  borderRadius: "6px",
                  textAlign: "center"
                }}
              />
              <div style={{
                fontSize: "14px",
                color: "#666",
                marginTop: "5px"
              }}>
                (최대 {todayCount}명)
              </div>
            </div>
            
            <div style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center"
            }}>
              <button
                onClick={() => setShowDrawPopup(false)}
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                취소
              </button>
              <button
                onClick={() => {
                  onDrawWinners(drawCount);
                  setShowDrawPopup(false);
                }}
                disabled={drawCount < 1 || drawCount > todayCount}
                style={{
                  padding: "12px 24px",
                  fontSize: "16px",
                  backgroundColor: drawCount < 1 || drawCount > todayCount ? "#ccc" : "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: drawCount < 1 || drawCount > todayCount ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => {
                  if (!(drawCount < 1 || drawCount > todayCount)) {
                    e.target.style.transform = "scale(1.05)";
                  }
                }}
                onMouseOut={(e) => {
                  if (!(drawCount < 1 || drawCount > todayCount)) {
                    e.target.style.transform = "scale(1)";
                  }
                }}
              >
                🎯 룰렛 시작!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header; 