import React from 'react';
import '../styles/Login.css';

const Login: React.FC = () => (
  <div className="login">
    <div className="login-container">
      <h2 className="login-header">Welcome Back to Cricket Tournament Management</h2>
      <p className="login-subtitle">Access your account to manage teams, track player stats, and more!</p>

      <form>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit">Login</button>
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
      </form>

      <p className="login-footer">Don’t have an account? <a href="/signup">Sign up here</a></p>
    </div>
  </div>
);

export default Login;
