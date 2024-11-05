import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext';
import OrganizerHome from './OrganizerHome';
import CreateTournament from './CreateTournament';
import ViewTournaments from './ViewTournaments';
import '../../styles/OrganizerDashboard.css';

const OrganizerDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>Organizer Dashboard</h1>
        <ul>
          <li><Link to="/organizer-dashboard">Home</Link></li>
          <li><Link to="/organizer-dashboard/create-tournament">Create Tournament</Link></li>
          <li><Link to="/organizer-dashboard/view-tournaments">View Tournaments</Link></li>
        </ul>
        <ul className="logout-link">
          <li><a href="/" onClick={logout}>Logout</a></li>
        </ul>
      </nav>

      <main className="dashboard-content">
        <Routes>
          <Route path="" element={<OrganizerHome />} />
          <Route path="create-tournament" element={<CreateTournament />} />
          <Route path="view-tournaments" element={<ViewTournaments />} />
        </Routes>
      </main>
    </div>
  );
};

export default OrganizerDashboard;
