import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TransitionWrapper from './components/TransitionWrapper'
import RoleSelection from './components/RoleSelection';
import PlayerDashboard from './pages/player/PlayerDashboard';
import PlayerFitness from './pages/player/PlayerFitness';
import PlayerHome from './pages/player/PlayerHome';
import PlayerProfile from './pages/player/PlayerProfile';
import PlayerStatistics from './pages/player/PlayerStatistics';
import TeamArea from './pages/player/TeamArea';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/select-role" element={<RoleSelection/>} />
      <Route path="/player-dashboard/*" element={<PlayerDashboard />} />
      {/* <Route path="/player-fitness" element={<PlayerFitness/>} />
      <Route path="/player-home" element={<PlayerHome/>} />
      <Route path="/player-profile" element={<PlayerProfile/>} />
      <Route path="/player-statistics" element={<PlayerStatistics/>} />
      <Route path="/team-area" element={<TeamArea/>} /> */}
    </Routes>
  </Router>
);

export default App;
