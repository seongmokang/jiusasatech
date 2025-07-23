// src/services/fetchAttendance.js
export const fetchAttendanceData = async () => {
    const res = await fetch('http://localhost:4000/api/attendance');
    return await res.json();
  };