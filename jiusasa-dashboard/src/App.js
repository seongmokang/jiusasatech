// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import BeltColumns from "./components/BeltColumns";
import Footer from "./components/Footer";
import { fetchAttendanceData } from "./services/fetchAttendance";
import Bracket from "./components/Bracket";

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 타임스탬프에서 날짜만 추출 (예: "2025. 7. 23 오후 1:08:45" → "2025-07-23")
function parseDateFromTimestamp(ts) {
  if (!ts) return "";
  // "2025. 7. 23 오후 1:08:45" → "2025-07-23"
  const match = ts.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
  if (!match) return "";
  const [, year, month, day] = match;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function normalize(Str) {
  if (!Str) return "";
  if (Str.includes("화이트")) return "white";
  if (Str.includes("블루") || Str.includes("파랑")) return "blue";
  if (Str.includes("브라운") || Str.includes("갈색")) return "brown";
  if (Str.includes("퍼플") || Str.includes("보라")) return "purple";
  if (Str.includes("블랙") || Str.includes("검정")) return "black";
  if (Str.includes("남")) return "male";
  if (Str.includes("여")) return "female";
  return "";
}

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = getTodayString();
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allData = await fetchAttendanceData();

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
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [today]);

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>데이터를 불러오는 중...</div>;
  }

  if (error) {
    return <div style={{ textAlign: "center", padding: "50px", color: "red" }}>오류: {error}</div>;
  }

  return (
    <div
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
      />
      <div style={{ flex: 1, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
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
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          background: "#faf8f2",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bracket" element={<Bracket />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;