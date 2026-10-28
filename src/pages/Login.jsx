import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { TechVerseLogo } from '../components/TechVerseLogo';
import { ArrowRight, Lock, Mail, User, Sparkles, ShieldCheck } from 'lucide-react';
import './Login.css';

const Login = () => {
  const { login, updateUserProfile } = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const updates = {};
    if (name.trim()) updates.name = name.trim();
    if (email.trim()) updates.email = email.trim();
    if (Object.keys(updates).length > 0) {
      updateUserProfile(updates);
    }
    login();
  };

  return (
    <div className="login-container techverse-grid-bg">
      <div className="login-card fade-in">
        {/* Brand Header with Custom TechVerse Logo */}
        <div className="login-brand-header">
          <TechVerseLogo variant="full" size={48} showTagline={true} className="justify-center" />
          <p className="login-ecosystem-desc">
            Next-Generation Technology Learning Ecosystem
          </p>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-title-row">
            <h2 className="form-heading">{isLogin ? 'Developer Sign In' : 'Create TechVerse Account'}</h2>
            <span className="badge-pro font-mono">v2.0 PRO</span>
          </div>
          
          {!isLogin && (
            <div className="form-field">
              <label htmlFor="auth-name" className="field-label">Full Name</label>
              <div className="field-input-wrap">
                <User size={16} className="field-icon text-muted" />
                <input 
                  id="auth-name"
                  type="text" 
                  placeholder="e.g. Alex Rivera" 
                  required={!isLogin} 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                />
              </div>
            </div>
          )}
          
          <div className="form-field">
            <label htmlFor="auth-email" className="field-label">Engineering Email</label>
            <div className="field-input-wrap">
              <Mail size={16} className="field-icon text-muted" />
              <input 
                id="auth-email"
                type="email" 
                placeholder="alex@student.edu" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>
          
          <div className="form-field">
            <div className="flex justify-between items-center">
              <label htmlFor="auth-password" className="field-label">Access Token / Password</label>
              {isLogin && (
                <span className="text-2xs text-cyan cursor-pointer hover:underline font-mono">
                  Forgot?
                </span>
              )}
            </div>
            <div className="field-input-wrap">
              <Lock size={16} className="field-icon text-muted" />
              <input 
                id="auth-password"
                type="password" 
                placeholder="••••••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary full-width-btn flex items-center justify-center gap-2">
            <span>{isLogin ? 'Launch TechVerse' : 'Initialize Workspace'}</span>
            <ArrowRight size={16} />
          </button>
        </form>
        
        {/* Toggle between Login and Signup */}
        <div className="auth-footer-row">
          <p className="toggle-auth">
            {isLogin ? "New to TechVerse? " : "Already have an account? "}
            <button type="button" className="text-link-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Create Developer Account' : 'Sign in to workspace'}
            </button>
          </p>

          <div className="auth-security-note">
            <ShieldCheck size={13} className="text-accent" />
            <span className="font-mono text-2xs text-muted">Sandbox isolation & ADC secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
