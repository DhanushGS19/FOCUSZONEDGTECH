import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { LayoutDashboard, Timer, BookOpen, GraduationCap, Trophy, LineChart, Bot, User, LogOut, X } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { user, logout } = useUser();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/focus', label: 'Focus', icon: Timer },
    { path: '/study-plan', label: 'Study Plan', icon: BookOpen },
    { path: '/learn', label: 'Learn', icon: GraduationCap },
    { path: '/competition', label: 'Competition', icon: Trophy },
    { path: '/progress', label: 'Progress', icon: LineChart },
    { path: '/chat', label: 'AI Assistant', icon: Bot },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    if (onClose) onClose();
    logout();
  };

  return (
    <>
      {/* Backdrop overlay for mobile drawer */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header-row">
          <div className="sidebar-brand">
            <div className="brand-logo">FF</div>
            <h2>Focus Flow</h2>
          </div>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="user-mini-profile">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div className="user-info">
            <p className="user-name">{user.name}</p>
            <p className="user-xp">{user.xp} XP • Lvl {Math.floor(user.xp / 1000) + 1}</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

