import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './Login.css';

const Login = () => {
  const { login } = useUser();
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // Mock login logic
  };

  return (
    <div className="login-container">
      <div className="login-glass">
        <h1 className="brand-title">Focus Flow</h1>
        <p className="brand-tagline">Focus. Learn. Grow.</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="form-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="e.g. Alex" required={!isLogin} />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="alex@student.edu" required />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <button type="submit" className="primary full-width-btn">
            {isLogin ? 'Login to Focus Flow' : 'Start Learning'}
          </button>
        </form>
        
        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button className="text-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
