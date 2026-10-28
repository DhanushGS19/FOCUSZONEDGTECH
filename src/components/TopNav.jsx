import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { TechVerseSymbol } from './TechVerseLogo';
import { 
  Search, Bell, Moon, Sun, ChevronRight, Plus, Terminal, 
  FolderPlus, Brain, Sparkles, User, LogOut,
  Timer, ShieldCheck, Award
} from 'lucide-react';
import './TopNav.css';

const BREADCRUMB_MAP = {
  '/': { section: 'Workspace', title: 'Dashboard' },
  '/learn': { section: 'Learning Ecosystem', title: 'Technologies & Languages' },
  '/code-lab': { section: 'Development', title: 'Code Studio' },
  '/projects': { section: 'Development', title: 'Engineering Blueprints' },
  '/dev-tools': { section: 'Development', title: 'Developer Tools' },
  '/flow-ai': { section: 'Intelligence', title: 'AI Coding Assistant' },
  '/practice': { section: 'Learning', title: 'Coding Challenges & DSA' },
  '/progress': { section: 'Intelligence', title: 'Learning Analytics' },
  '/focus': { section: 'Workspace', title: 'Deep Work Timer' },
  '/certificates': { section: 'Credentials', title: 'Verified Certificates' },
  '/profile': { section: 'System', title: 'Settings & Profile' },
  '/admin': { section: 'System', title: 'Help Center & Admin' },
  '/media': { section: 'Resources', title: 'Media Library' },
  '/competition': { section: 'Community', title: 'Leaderboard' }
};

export const TopNav = ({ onOpenSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, theme, toggleTheme, logout } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickCreate, setShowQuickCreate] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const createRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setShowQuickCreate(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const currentCrumb = BREADCRUMB_MAP[location.pathname] || { section: 'TechVerse', title: 'Workspace' };

  const notifications = [
    { id: 'n1', text: 'Daily coding challenge available: Two Sum', time: '10m ago', unread: true },
    { id: 'n2', text: 'Weekly streak active: 7 days continuous learning', time: '1h ago', unread: false },
    { id: 'n3', text: 'Piston container compiler runtime is online', time: '2h ago', unread: false }
  ];

  return (
    <header className="topnav-bar">
      {/* 1. Left Cluster: System Operational Indicator + Dynamic Breadcrumbs */}
      <div className="topnav-left-cluster">
        {/* Repositioned: Operational Status Badge on far-left */}
        <div className="system-status-indicator" title="All systems operational: Piston Sandbox, TechVerse DB & Compiler">
          <span className="status-dot"></span>
          <span className="status-label">Operational</span>
        </div>

        <div className="breadcrumb-divider-vertical" />

        <div className="topnav-breadcrumb">
          <div className="breadcrumb-brand flex items-center gap-1.5 cursor-pointer" onClick={() => navigate('/')}>
            <TechVerseSymbol size={18} />
            <span className="brand-root font-bold">TECHVERSE</span>
          </div>
          <ChevronRight size={13} className="breadcrumb-separator" />
          <span className="breadcrumb-section">{currentCrumb.section}</span>
          <ChevronRight size={13} className="breadcrumb-separator" />
          <span className="breadcrumb-current font-medium">{currentCrumb.title}</span>
        </div>
      </div>

      {/* 2. Center Cluster: Global Command Search (Repositioned to prominent center) */}
      <div className="topnav-center-cluster">
        <button
          type="button"
          className="topnav-search-btn-center"
          onClick={onOpenSearch}
          title="Search courses, projects, tools (Ctrl+K)"
        >
          <Search size={14} className="text-emerald shrink-0" />
          <span className="search-placeholder">Search across TechVerse (Ctrl + K)...</span>
          <kbd className="topnav-kbd">Ctrl K</kbd>
        </button>
      </div>

      {/* 3. Right Cluster: Quick Create Action + Notifications + Utilities + Profile */}
      <div className="topnav-right-cluster">
        {/* Quick Create Action Button (Moved next to user actions) */}
        <div className="relative" ref={createRef}>
          <button
            type="button"
            className={`btn-primary topnav-create-btn ${showQuickCreate ? 'active' : ''}`}
            onClick={() => setShowQuickCreate(!showQuickCreate)}
            title="Quick Launch Action"
          >
            <Plus size={15} />
            <span>Create</span>
          </button>

          {showQuickCreate && (
            <div className="topnav-dropdown quick-create-dropdown fade-in">
              <div className="dropdown-header">
                <span className="text-2xs font-mono uppercase tracking-wider text-muted">Quick Actions</span>
              </div>
              <div className="dropdown-menu-list">
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowQuickCreate(false); navigate('/code-lab'); }}
                >
                  <Terminal size={15} className="text-primary-accent" />
                  <div className="menu-item-text">
                    <span className="item-title">New Code Session</span>
                    <span className="item-desc">Open isolated scratchpad</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowQuickCreate(false); navigate('/projects'); }}
                >
                  <FolderPlus size={15} className="text-emerald" />
                  <div className="menu-item-text">
                    <span className="item-title">Start Project</span>
                    <span className="item-desc">Select engineering blueprint</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowQuickCreate(false); navigate('/practice'); }}
                >
                  <Brain size={15} className="text-warning" />
                  <div className="menu-item-text">
                    <span className="item-title">Practice Challenge</span>
                    <span className="item-desc">Solve algorithmic problem</span>
                  </div>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowQuickCreate(false); navigate('/flow-ai'); }}
                >
                  <Sparkles size={15} className="text-primary-accent" />
                  <div className="menu-item-text">
                    <span className="item-title">Ask AI Assistant</span>
                    <span className="item-desc">Debug code or explain theory</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            className={`topnav-icon-btn ${showNotifications ? 'active' : ''}`}
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications & Activity"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="notification-badge-dot"></span>
          </button>

          {showNotifications && (
            <div className="topnav-dropdown notification-dropdown fade-in">
              <div className="dropdown-header flex justify-between items-center">
                <span className="text-xs font-bold text-white">Notifications</span>
                <span className="text-2xs text-emerald font-mono">3 updates</span>
              </div>
              <div className="notification-list">
                {notifications.map(n => (
                  <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}>
                    <p className="notification-text">{n.text}</p>
                    <span className="notification-time">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Focus Timer Trigger Shortcut */}
        <button
          type="button"
          className="topnav-icon-btn"
          onClick={() => navigate('/focus')}
          title="Open Focus Zone Deep Work Timer"
          aria-label="Focus timer"
        >
          <Timer size={16} className="text-warning" />
        </button>

        {/* Theme Settings Toggle */}
        <button
          type="button"
          className="topnav-icon-btn"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Midnight Dark'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} className="text-warning" /> : <Moon size={16} className="text-primary" />}
        </button>

        {/* User Profile Pill & Dropdown */}
        <div className="relative" ref={profileRef}>
          <div 
            className="topnav-profile-pill"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="User Profile Menu"
          >
            <div className="user-avatar-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="user-details-mini">
              <span className="user-name-text">{user?.name || 'Alex Rivera'}</span>
              <span className="user-xp-sub">{user?.xp || 2450} XP</span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="topnav-dropdown profile-dropdown fade-in">
              <div className="dropdown-header">
                <span className="text-xs font-bold text-white block">{user?.name || 'Alex Rivera'}</span>
                <span className="text-2xs text-muted font-mono">{user?.email || 'alex@student.edu'}</span>
              </div>
              <div className="dropdown-menu-list">
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowProfileMenu(false); navigate('/profile'); }}
                >
                  <User size={15} className="text-primary-accent" />
                  <span className="item-title">Profile & Achievements</span>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowProfileMenu(false); navigate('/certificates'); }}
                >
                  <Award size={15} className="text-emerald" />
                  <span className="item-title">Verified Certificates</span>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowProfileMenu(false); navigate('/focus'); }}
                >
                  <Timer size={15} className="text-warning" />
                  <span className="item-title">Focus Zone Timer</span>
                </button>
                <button
                  type="button"
                  className="dropdown-menu-item"
                  onClick={() => { setShowProfileMenu(false); navigate('/admin'); }}
                >
                  <ShieldCheck size={15} className="text-emerald" />
                  <span className="item-title">Help & Admin Center</span>
                </button>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-menu-item text-danger"
                  onClick={() => { setShowProfileMenu(false); logout(); }}
                >
                  <LogOut size={15} />
                  <span className="item-title">Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
