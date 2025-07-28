import React, { useState } from 'react';

function MatchCard({ match, matchNumber }) {
  const [winner, setWinner] = useState(null);
  const [student1, student2] = match;

  const handleWinner = (student) => {
    setWinner(student);
  };

  const nameColor = (gender) => {
    return gender === "male" ? "#1976d2" : "#ffd600";
  };

  const maskName = (name) => {
    if (name.length < 3) return name[0] + "*";
    return name[0] + "*" + name[name.length - 1];
  };

  return (
    <div style={{
      border: '2px solid #ddd',
      borderRadius: '8px',
      padding: '12px',
      margin: '8px 0',
      backgroundColor: winner ? '#e8f5e8' : '#fff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      width: '90%',
      margin: '8px auto'
    }}>
      <h4 style={{
        margin: '0 0 10px 0',
        fontSize: '1.2vw',
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        대진 {matchNumber}
      </h4>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px'
      }}>
        <button
          onClick={() => handleWinner(student1)}
          style={{
            flex: 1,
            padding: '12px 16px',
            backgroundColor: winner === student1 ? '#4CAF50' : '#f5f5f5',
            color: winner === student1 ? 'white' : '#333',
            border: '2px solid #ddd',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1vw',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
        >
          {maskName(student1.name)}
        </button>
        <span style={{
          fontSize: '1vw',
          color: '#666',
          fontWeight: 'bold'
        }}>
          vs
        </span>
        {student2 ? (
          <button
            onClick={() => handleWinner(student2)}
            style={{
              flex: 1,
              padding: '12px 16px',
              backgroundColor: winner === student2 ? '#4CAF50' : '#f5f5f5',
              color: winner === student2 ? 'white' : '#333',
              border: '2px solid #ddd',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '1.1vw',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            {maskName(student2.name)}
          </button>
        ) : (
          <div style={{
            flex: 1,
            padding: '12px 16px',
            backgroundColor: '#f0f0f0',
            color: '#999',
            border: '2px solid #ddd',
            borderRadius: '6px',
            fontSize: '1.1vw',
            textAlign: 'center'
          }}>
            부전승
          </div>
        )}
      </div>
      {winner && (
        <div style={{
          marginTop: '8px',
          textAlign: 'center',
          fontSize: '1vw',
          color: '#4CAF50',
          fontWeight: 'bold'
        }}>
          승자: {maskName(winner.name)}
        </div>
      )}
    </div>
  );
}

export default MatchCard; 