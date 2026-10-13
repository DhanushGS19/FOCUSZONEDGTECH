import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { LayoutDashboard, Timer, BookOpen, GraduationCap, Trophy, LineChart, Bot, User, LogOut } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
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

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">FF</div>
        <h2>Focus Flow</h2>
      </div>

      <div className="user-mini-profile">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div className="user-info">
          <p className="user-name">{user.name}</p>
          <p className="user-xp">{user.xp} XP • Lvl {Math.floor(user.xp/1000)+1}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
