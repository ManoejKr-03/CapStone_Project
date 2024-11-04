// src/components/PlayerStatistics.tsx
import React from 'react';
import '../../styles/PlayerStatistics.css'; // Import the CSS file

const PlayerStatistics: React.FC = () => (
  <div className="statistics-section">
    <h2>Your Statistics</h2>
    <div className="cards-container">
      <div className="stat-card batting">
        <h3>Batting</h3>
        <p>Matches Played: 10</p>
        <p>Runs Scored: 300</p>
        <p>Average: 30.0</p>
      </div>
      <div className="stat-card bowling">
        <h3>Bowling</h3>
        <p>Matches Played: 10</p>
        <p>Wickets Taken: 15</p>
        <p>Economy Rate: 5.0</p>
      </div>
      <div className="stat-card catching">
        <h3>Catching</h3>
        <p>Catches Taken: 5</p>
        <p>Matches Played: 10</p>
      </div>
    </div>
  </div>
);

export default PlayerStatistics;
