import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import PlayerHome from './PlayerHome';
import PlayerProfile from './PlayerProfile';
import TeamArea from './TeamArea';
import PlayerStatistics from './PlayerStatistics';
import PlayerFitness from './PlayerFitness';
import { useAuth } from '../../components/AuthContext'; // Assuming the AuthContext is in src/components
import '../../styles/PlayerDashboard.css';
import Home from '../Home';

const PlayerDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
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
        <ul className="logout-link">
          <li><a href="/" onClick={logout}>Logout</a></li> {/* Correct usage of logout */}
        </ul>
      </nav>

      <main className="dashboard-content">
        <Routes>
          <Route path="" element={<PlayerHome />} />
          <Route path="profile" element={<PlayerProfile />} />
          <Route path="team" element={<TeamArea />} />
          <Route path="statistics" element={<PlayerStatistics />} />
          <Route path="fitness" element={<PlayerFitness />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default PlayerDashboard;
