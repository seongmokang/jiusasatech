import React from 'react';
import ad01 from '../assets/ad_01.jpeg';

function Footer() {
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
      {/* 광고 영역 */}
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
          overflow: "hidden"
        }}>
          <img 
            src={ad01} 
            alt="광고 1" 
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px"
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
      </div>
      
      {/* 기본 정보 */}
      <div 
        className="scrollbar-hidden"
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "0.5vw",
          lineHeight: 1.5,
          overflow: "hidden"
        }}
      >
        <div>© 2025 JIUSASA. All rights reserved.</div>
        <div>마곡 와이어 주짓수</div>
        <div>Contact: info@jiusasa.com</div>
      </div>
    </div>
  );
}

export default Footer; 