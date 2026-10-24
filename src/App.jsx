import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Focus from './pages/Focus';
import StudyPlan from './pages/StudyPlan';
import Learn from './pages/Learn';
import Competition from './pages/Competition';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { useUser } from './context/UserContext';
import { Menu, LayoutDashboard, Timer, BookOpen, Bot } from 'lucide-react';

const App = () => {
  const { isAuthenticated, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile navigation drawer whenever route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="layout">
      {/* Mobile Top Bar (visible on mobile only) */}
      <header className="mobile-topbar">
        <div className="mobile-topbar-left">
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <Menu size={22} />
          </button>
          <div className="mobile-topbar-brand">
            <div className="brand-logo sm">FF</div>
            <span>Focus Flow</span>
          </div>
        </div>
        <div className="mobile-topbar-right">
          <div className="mobile-xp-pill">{user?.xp || 0} XP</div>
          <NavLink to="/profile" className="mobile-avatar-badge" aria-label="Profile">
            {user?.name ? user.name.charAt(0) : 'U'}
          </NavLink>
        </div>
      </header>

      {/* Sidebar: Left drawer on desktop, slide-over drawer with overlay on mobile */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation for quick thumb-reach access */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/focus" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <Timer size={20} />
          <span>Focus</span>
        </NavLink>
        <NavLink to="/study-plan" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>Plan</span>
        </NavLink>
        <NavLink to="/chat" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
          <Bot size={20} />
          <span>AI Chat</span>
        </NavLink>
        <button
          type="button"
          className={`bottom-nav-item ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
          <span>Menu</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
