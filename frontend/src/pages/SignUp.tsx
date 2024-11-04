import React from 'react';
import '../styles/SignUp.css';

const SignUp: React.FC = () => (
  <div className="signup">
    <div className="signup-container">
      <h2 className="signup-header">Join the Ultimate Cricket Tournament Platform</h2>
      <p className="signup-subtitle">Manage teams, track player stats, organize tournaments, and more!</p>

      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit">Sign Up</button>
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
      </form>

      <p className="signup-footer">Already have an account? <a href="/select-role">Log in</a></p>
    </div>
  </div>
);

export default SignUp;
