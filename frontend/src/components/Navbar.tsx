import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => (
  <nav className="navbar">
    <Link to="/" className="logo">Cricket Tournament</Link>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/features">Features</Link>
      <Link to="/select-role">Login</Link>
      <Link to="/signup" className="signup-button">Sign Up</Link>
    </div>
  </nav>
);

export default Navbar;
