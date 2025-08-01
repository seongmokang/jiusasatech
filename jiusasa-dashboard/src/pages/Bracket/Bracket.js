import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAttendanceData } from '../../services/fetchAttendance';
import BracketColumn from './BracketColumn';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

import { getTodayString, parseDateFromTimestamp } from '../../utils/dateUtils';
import { normalize } from '../../utils/normalize';

function Bracket() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);

  const today = getTodayString();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const allData = await fetchAttendanceData();

        // allData가 배열인지 확인하고 안전하게 처리
        if (!Array.isArray(allData)) {
          console.error('allData is not an array:', allData);
          setStudents([]);
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
        
        setStudents(todayStudents);
        
        // 데이터 로딩 완료 후 자동으로 대진 생성
        const allMatches = {};
        ['white', 'blue', 'purple', 'brown', 'black'].forEach(belt => {
          const beltStudents = todayStudents.filter(s => s.belt === belt);
          if (beltStudents.length >= 2) {
            allMatches[belt] = generateMatches(beltStudents);
          }
        });
        setMatches(allMatches);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [today]);

  // 대진 생성 함수
  const generateMatches = (beltStudents) => {
    if (beltStudents.length < 2) return [];
    
    // 랜덤 매칭
    const shuffled = [...beltStudents].sort(() => Math.random() - 0.5);
    const matches = [];
    
    for (let i = 0; i < shuffled.length; i += 2) {
      if (i + 1 < shuffled.length) {
        matches.push([shuffled[i], shuffled[i + 1]]);
      } else {
        // 홀수 명일 경우 마지막 사람은 부전승
        matches.push([shuffled[i], null]);
      }
    }
    
    return matches;
  };

  // 대진 생성 버튼
  const handleGenerateMatches = () => {
    if (!students || students.length === 0) return;
    
    const allMatches = {};
    ['white', 'blue', 'purple', 'brown', 'black'].forEach(belt => {
      const beltStudents = students.filter(s => s.belt === belt);
      if (beltStudents.length >= 2) {
        allMatches[belt] = generateMatches(beltStudents);
      }
    });
    setMatches(allMatches);
  };

  if (loading) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "50px",
        fontSize: "18px",
        color: "#666"
      }}>
        대진표 데이터를 불러오는 중...
      </div>
    );
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
        todayCount={students ? students.length : 0}
        totalCount={students ? students.length : 0}
        date={today}
        onGenerateMatches={handleGenerateMatches}
      />
      

      
      {/* 벨트 컬럼 영역 */}
      <div style={{ flex: 1, display: "flex", alignItems: "stretch", overflow: "hidden" }}>
        <div style={{
          flex: 1,
          padding: "0 5vw",
          boxSizing: "border-box",
          height: "100%",
          display: "flex",
          overflow: "hidden"
        }}>
          <div style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-around",
            alignItems: "stretch",
            gap: 32,
            width: "100%",
            height: "100%",
            overflow: "hidden"
          }}>
            {(() => {
              const beltsWithMatches = ['white', 'blue', 'purple', 'brown', 'black']
                .filter(belt => matches[belt] && matches[belt].length > 0);
              
              // 모든 띠를 동일한 고정 너비로 설정
              return beltsWithMatches.map(belt => {
                const ratio = 1; // 모든 띠 동일한 너비 (flex: 1)
                
                return (
                  <BracketColumn 
                    key={belt} 
                    belt={belt} 
                    matches={matches[belt] || []}
                    widthRatio={ratio}
                  />
                );
              });
            })()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bracket; 