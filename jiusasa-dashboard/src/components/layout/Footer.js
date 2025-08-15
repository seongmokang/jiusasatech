import React from 'react';
import qrCode from '../../assets/qr_code.jpeg';

// 광고 이미지를 안전하게 import
import ad01Image from '../../assets/ad_01.jpeg';
import ad02Image from '../../assets/ad_02.jpeg';
import ad03Image from '../../assets/ad_03.jpeg';

// 광고 이미지 컴포넌트 - 이미지 로드 실패 시 fallback 처리
const AdImage = ({ src, alt, fallbackText }) => {
  const [imageError, setImageError] = React.useState(false);
  
  // 디버깅을 위한 로그
  React.useEffect(() => {
    console.log(`AdImage ${alt}:`, { src, imageError });
  }, [src, alt, imageError]);
  
  if (!src || imageError) {
    return fallbackText;
  }
  
  return (
    <img 
      src={src} 
      alt={alt}
      onError={(e) => {
        console.error(`Image load failed for ${alt}:`, e);
        setImageError(true);
      }}
      onLoad={() => {
        console.log(`Image loaded successfully for ${alt}`);
      }}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "6px",
        maxWidth: "100%",
        maxHeight: "100%"
      }}
    />
  );
};

// 광고 이미지들 할당
const ad01 = ad01Image;  // 존재하는 파일은 import 사용
const ad02 = ad02Image;  // 존재하는 파일은 import 사용
const ad03 = ad03Image;  // 존재하는 파일은 import 사용


// 디버깅을 위한 로그
console.log('Ad images loaded:', { ad01, ad02, ad03 });
console.log('QR code loaded:', qrCode);


function Footer({ winners = [], isDrawing = false }) {
  return (
    <div 
      className="footer-container"
      style={{
      background: "#f5f5f5",
      borderTop: "1px solid #e0e0e0",
      padding: "20px 32px",
      height: "34vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "stretch"
    }}>
      {/* 경품추첨 안내 */}
      <div style={{
        backgroundColor: "#fff",
        border: "2px solid #4CAF50",
        borderRadius: "10px",
        padding: "12px 20px",
        marginBottom: "15px",
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#2E7D32",
        boxShadow: "0 2px 8px rgba(76, 175, 80, 0.15)",
        background: "linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)"
      }}>
        🎁 대회 종료 후 경품추첨이 진행됩니다! 🎁
      </div>
      
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
        className="scrollbar-hidden footer-content"
        style={{
          flex: 1,
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          overflow: "hidden"
        }}
      >
        {/* 광고 영역 */}
        <div className="footer-ad-section" style={{
          display: "flex",
          gap: "10px",
          flex: 1
        }}>
          {/* 광고 영역 1 */}
          <div className="footer-ad-item" style={{
            flex: 1,
            background: "#fff",
            border: "2px dashed #ccc",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            color: "#666",
            fontSize: "1.2vw",
            fontWeight: "bold"
          }}>
            <AdImage 
              src={ad01} 
              alt="광고 1" 
              fallbackText="광고 영역 1"
            />
          </div>
          
          {/* 광고 영역 2 */}
          <div className="footer-ad-item" style={{
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
            <AdImage 
              src={ad02} 
              alt="광고 2" 
              fallbackText="광고 영역 2"
            />
          </div>
          
          {/* 광고 영역 3 */}
          <div className="footer-ad-item" style={{
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
            <AdImage 
              src={ad03} 
              alt="광고 3" 
              fallbackText="광고 영역 3"
            />
          </div>
        </div>
        
        {/* QR 코드와 기본 정보 영역 */}
        <div className="footer-qr-section" style={{
          display: "flex",
          flexDirection: "column",
          width: "calc(30vh * 0.6)", // 광고 영역 높이(30vh)의 60%를 기준으로 가로 길이 설정
          flexShrink: 0
        }}>
          {/* QR 코드 */}
          <div className="footer-qr-code" style={{
            height: "calc(30vh * 0.6)", // 광고 영역 높이의 60%
            width: "calc(30vh * 0.6)",  // 정사각형으로 설정
            border: "2px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
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
          <div className="footer-info" style={{
            flex: 1,
            textAlign: "right",
            color: "#666",
            fontSize: "0.5vw",
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}>
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