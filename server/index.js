const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
app.use(cors());

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.get('/api/attendance', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: '설문지 응답 시트1!A:G', // 시트 이름과 범위
    });
    const rows = response.data.values;
    const dataRows = rows.slice(1); // 첫 줄은 헤더
    const data = dataRows.map(row => ({
      timestamp: row[0] || '',
      name: row[1] || '',
      eventSource: row[2] || '',
      phone: row[3] || '',
      affiliation: row[4] || '',
      gender: row[5] || '',
      belt: row[6] || '',
    }));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));