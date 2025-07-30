// src/services/fetchAttendance.js
export const fetchAttendanceData = async () => {
    try {
      const res = await fetch('https://jiusasatech.onrender.com/api/attendance');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // 데이터가 배열인지 확인
      if (!Array.isArray(data)) {
        console.error('API returned non-array data:', data);
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      return [];
    }
  };