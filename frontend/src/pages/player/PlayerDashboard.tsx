// src/components/PlayerDashboard.tsx
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerHome from './PlayerHome';
import PlayerProfile from './PlayerProfile';
import TeamArea from './TeamArea';
import PlayerStatistics from './PlayerStatistics';
import PlayerFitness from './PlayerFitness';
import '../../styles/PlayerDashboard.css'

const PlayerDashboard: React.FC = () => (
  <div className="dashboard">
    <nav className="dashboard-nav">
      <h1>Player Dashboard</h1>
      <ul>
        <li><Link to="/player-dashboard/">Home</Link></li>
        <li><Link to="/player-dashboard/profile">Profile</Link></li>
        <li><Link to="/player-dashboard/team">Team</Link></li>
        <li><Link to="/player-dashboard/statistics">Statistics</Link></li>
        <li><Link to="/player-dashboard/fitness">Fitness</Link></li>
      </ul>
    </nav>

    <main className="dashboard-content">
      <Routes>
        <Route path="" element={<PlayerHome />} />
        <Route path="profile" element={<PlayerProfile />} />
        <Route path="team" element={<TeamArea />} />
        <Route path="statistics" element={<PlayerStatistics />} />
        <Route path="fitness" element={<PlayerFitness />} />
      </Routes>
    </main>
  </div>
);

export default PlayerDashboard;
