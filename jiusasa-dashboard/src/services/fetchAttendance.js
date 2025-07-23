// src/services/fetchAttendance.js
export const fetchAttendanceData = async () => {
    const res = await fetch('https://jiusasatech.onrender.com/api/attendance');
    return await res.json();
  };