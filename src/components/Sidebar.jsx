import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Timer, CheckCircle, PlaySquare, User, MessageCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Sidebar.css';

const Sidebar = () => {
  const { xp, level } = useUser();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Focus', path: '/focus', icon: <Timer size={20} /> },
    { name: 'Tests', path: '/tests', icon: <CheckCircle size={20} /> },
    { name: 'Media', path: '/media', icon: <PlaySquare size={20} /> },
    { name: 'Tutor', path: '/chat', icon: <MessageCircle size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-3d"></div>
          <h2>Study Zone</h2>
        </div>
        <div className="user-mini-stats">
          <span className="level-badge">Lvl {level}</span>
          <span className="xp-text">{xp} XP</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="daily-quote">
          <p>"Focus is the new IQ."</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
