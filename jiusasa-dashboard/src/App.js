// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard/Dashboard";
import Bracket from "./pages/Bracket/Bracket";
import { APP_BACKGROUND_COLOR } from "./constants/config";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          minWidth: "100vw",
          background: APP_BACKGROUND_COLOR,
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