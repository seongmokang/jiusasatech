import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import BeltColumns from "./BeltColumns";
import Footer from "../../components/layout/Footer";
import RouletteAnimation from "../../components/ui/RouletteAnimation";
import { fetchAttendanceData } from "../../services/fetchAttendance";
import { getTodayString, parseDateFromTimestamp } from "../../utils/dateUtils";
import { normalize } from "../../utils/normalize";
import { REFRESH_INTERVAL, ROULETTE_DURATION } from "../../constants/config";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [winners, setWinners] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showRoulette, setShowRoulette] = useState(false);

  const today = getTodayString();
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allData = await fetchAttendanceData();

        // allData가 배열인지 확인하고 안전하게 처리
        if (!Array.isArray(allData)) {
          console.error('allData is not an array:', allData);
          setStudents([]);
          setTotalStudents(0);
          return;
        }

        // 오늘 출석자만 필터링
        const todayStudents = allData
          .filter(student => parseDateFromTimestamp(student.timestamp) === today)
          .map(student => ({
            name: student.name,
            belt: normalize(student.belt),
            affiliation: student.affiliation,
            gender: normalize(student.gender),
          }));
        setTotalStudents(allData.length);
        // 벨트, 성별 등 한글 → 영문/색상 변환 필요시 여기서 가공
        setStudents(todayStudents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [today]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>데이터를 불러오는 중...</div>;
  }

  // 추첨 함수 (룰렛 스타일)
  const drawWinners = (count) => {
    if (students.length === 0) return;
    
    setIsDrawing(true);
    setShowRoulette(true);
    
    // 룰렛 애니메이션 완료 후 결과 표시
    setTimeout(() => {
      const shuffled = [...students].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(count, students.length));
      setWinners(selected);
      setIsDrawing(false);
      setShowRoulette(false);
    }, ROULETTE_DURATION);
  };

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>오류: {error}</div>;
  }

  return (
    <div
      className="dashboard-container"
      style={{
        height: "100vh",
        width: "100vw",
        background: "#faf8f2",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header
        todayCount={students.length}
        totalCount={totalStudents}
        date={today}
        onDrawWinners={drawWinners}
        winners={winners}
        isDrawing={isDrawing}
      />
      <div 
        className="dashboard-main"
        style={{ flex: 1, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
        <div style={{
          flex: 1,
          padding: "0 5vw",
          boxSizing: "border-box",
          height: "100%",
          display: "flex",
          overflow: "hidden"
        }}>
          <BeltColumns students={students} />
        </div>
      </div>
      <Footer winners={winners} isDrawing={isDrawing} />
      
      {/* 룰렛 애니메이션 */}
      {showRoulette && (
        <RouletteAnimation 
          isSpinning={isDrawing}
          onComplete={() => {
            // 애니메이션 완료 시 호출될 함수
          }}
        />
      )}
    </div>
  );
}

export default Dashboard;