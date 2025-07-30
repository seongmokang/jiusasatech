import React from 'react';
import ad01 from '../assets/ad_01.jpeg';
import qrCode from '../assets/qr_code.jpeg';

function Footer({ winners = [], isDrawing = false }) {
  return (
    <div style={{
      background: "#f5f5f5",
      borderTop: "1px solid #e0e0e0",
      padding: "20px 32px",
      height: "30vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch"
    }}>
      {/* 추첨 결과 표시 */}
      {winners.length > 0 && !isDrawing && (
        <div style={{
          marginBottom: "15px",
          padding: "15px",
          backgroundColor: "#fff3cd",
          border: "2px solid #ffeaa7",
          borderRadius: "8px",
          fontSize: "1.2rem",
          color: "#856404",
          animation: "slideIn 0.5s ease-out",
          width: "98%"
        }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            {winners.map((winner, index) => (
              <div key={index} style={{
                backgroundColor: "#fff",
                padding: "8px 12px",
                borderRadius: "20px",
                border: "2px solid #ffeaa7",
                fontSize: "1rem",
                fontWeight: "bold",
                animation: `popIn 0.3s ease-out ${index * 0.1}s both, winnerGlow 2s ease-in-out infinite`,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "120px"
              }}>
                <div style={{ fontWeight: "bold", marginBottom: "2px" }}>
                  {winner.name}
                </div>
                <div style={{ 
                  fontSize: "0.8rem", 
                  color: "#666", 
                  fontWeight: "normal",
                  textAlign: "center"
                }}>
                  {winner.affiliation}
                </div>
                {/* 컨페티 효과 */}
                <div style={{
                  position: "absolute",
                  top: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#ffd700",
                  borderRadius: "50%",
                  animation: `confetti 1s ease-out ${index * 0.2}s both`
                }} />
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 광고 영역과 QR/기본정보 */}
      <div 
        className="scrollbar-hidden"
        style={{
          flex: 1,
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          overflow: "hidden"
        }}
      >
        {/* 광고 영역 1 */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative"
        }}>
          <img 
            src={ad01} 
            alt="광고 1" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "6px",
              maxWidth: "100%",
              maxHeight: "100%"
            }}
          />
        </div>
        
        {/* 광고 영역 2 */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: "1.2vw",
          fontWeight: "bold"
        }}>
          광고 영역 2
        </div>
        
        {/* 광고 영역 3 */}
        <div style={{
          flex: 1,
          background: "#fff",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: "1.2vw",
          fontWeight: "bold"
        }}>
          광고 영역 3
        </div>
        
        {/* QR 코드와 기본 정보 영역 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          minWidth: "120px",
          height: "100%"
        }}>
          {/* QR 코드 */}
          <div style={{
            width: "100%",
            height: "60%",
            borderRadius: "8px",
            overflow: "hidden",
            border: "2px solid #e0e0e0",
            marginBottom: "10px"
          }}>
            <img 
              src={qrCode} 
              alt="QR Code" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          
          {/* 기본 정보 */}
          <div 
            className="scrollbar-hidden"
            style={{
              textAlign: "right",
              color: "#666",
              fontSize: "0.5vw",
              lineHeight: 1.5,
              overflow: "hidden",
              height: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end"
            }}
          >
            <div>© 2025 JIUSASA. All rights reserved.</div>
            <div>마곡 와이어 주짓수</div>
            <div>Contact: info@jiusasa.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer; 