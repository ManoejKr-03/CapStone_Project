import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import RoleSelection from './components/RoleSelection';
import PlayerDashboard from './pages/player/PlayerDashboard';
import { AuthProvider } from './components/AuthContext';
import PlayerProfile from './pages/player/PlayerProfile';
import PlayerDetails from './pages/player/PlayerDetails';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/player-dashboard/*" element={<PlayerDashboard />} />
        <Route path="/player-profile" element={<PlayerProfile/>}/>
        {/* <Route path = "/palyer-details" element = {<PlayerDetails/>}/> */}
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
