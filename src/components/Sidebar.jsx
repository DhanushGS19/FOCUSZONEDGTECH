import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { TechVerseLogo, TechVerseSymbol } from './TechVerseLogo';
import { 
  Terminal, FolderGit2, Wrench, Sparkles, LineChart, Award, 
  Compass, Brain, LayoutDashboard, Timer,
  Settings, ChevronLeft, ChevronRight, X, Sun, Moon, Search, LogOut
} from 'lucide-react';
import './Sidebar.css';

const NAV_SECTIONS = [
  {
    id: 'primary',
    title: 'WORKSPACE',
    items: [
      { path: '/', label: 'Overview Dashboard', icon: LayoutDashboard, end: true },
      { path: '/code-lab', label: 'Code Studio', icon: Terminal },
      { path: '/learn', label: 'Tech Curricula', icon: Compass },
      { path: '/practice', label: 'DSA Arena', icon: Brain },
      { path: '/focus', label: 'Focus & DND Lock', icon: Timer }
    ]
  },
  {
    id: 'tools',
    title: 'BUILD & UTILITIES',
    items: [
      { path: '/dev-tools', label: 'Developer Tools', icon: Wrench },
      { path: '/projects', label: 'Project Blueprints', icon: FolderGit2 },
      { path: '/flow-ai', label: 'AI Assistant', icon: Sparkles }
    ]
  },
  {
    id: 'credentials',
    title: 'CREDENTIALS & PROFILE',
    items: [
      { path: '/certificates', label: 'Verified Certificates', icon: Award },
      { path: '/progress', label: 'Learning Analytics', icon: LineChart },
      { path: '/profile', label: 'Profile & Settings', icon: Settings }
    ]
  }
];

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { user, logout, theme, toggleTheme } = useUser();
  const location = useLocation();

  // Collapsible state persisted in localStorage
  const [isCollapsed, setIsCollapsed] = useState(() => {
    try {
      return localStorage.getItem('techverse_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const toggleCollapse = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('techverse_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

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

      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        {/* Header Branding Row */}
        <div className="sidebar-header-row">
          <NavLink to="/" onClick={handleNavClick} className="sidebar-brand-link">
            {isCollapsed ? (
              <TechVerseSymbol size={34} />
            ) : (
              <TechVerseLogo variant="sidebar" size={32} showTagline={true} />
            )}
          </NavLink>

          {/* Desktop Collapse Toggle Button */}
          <button
            type="button"
            className="sidebar-toggle-collapse-btn"
            onClick={toggleCollapse}
            aria-label={isCollapsed ? 'Expand navigation rail' : 'Collapse navigation rail'}
            title={isCollapsed ? 'Expand rail (~250px)' : 'Collapse rail (~76px)'}
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Global Search Shortcut Button */}
        <button
          type="button"
          className="sidebar-search-btn"
          onClick={() => {
            window.dispatchEvent(new CustomEvent('techverse_open_search'));
            if (onClose) onClose();
          }}
          title="Search courses, projects, tools (Ctrl+K)"
        >
          <Search size={15} className="text-cyan shrink-0" />
          {!isCollapsed && (
            <>
              <span className="search-text">Search...</span>
              <kbd className="sidebar-kbd">Ctrl K</kbd>
            </>
          )}
        </button>

        {/* Categorized Navigation Rail */}
        <nav className="sidebar-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.id} className="nav-group">
              <span className="nav-group-title" title={section.title}>
                {isCollapsed ? '•' : section.title}
              </span>
              <div className="nav-group-items">
                {section.items.map((item, idx) => {
                  const fullTarget = item.path;
                  const currentPathWithSearch = location.pathname + location.search;
                  const isActive = item.end 
                    ? location.pathname === fullTarget
                    : (fullTarget.includes('?') 
                        ? currentPathWithSearch === fullTarget 
                        : location.pathname === fullTarget);

                  return (
                    <NavLink
                      key={`${section.id}-${item.label}-${idx}`}
                      to={item.path}
                      onClick={handleNavClick}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      title={isCollapsed ? item.label : undefined}
                      end={item.end}
                    >
                      <item.icon size={17} className="nav-icon shrink-0" />
                      {!isCollapsed && <span className="nav-label">{item.label}</span>}
                      {isActive && <div className="active-glow-indicator" />}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Navigation Rail: User Profile Area */}
        <div className="sidebar-footer">
          <div className="sidebar-profile-card">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'T'}
              </div>
              <span className="status-online-dot" title="Connected" />
            </div>

            {!isCollapsed && (
              <div className="profile-info">
                <div className="profile-name-row">
                  <span className="profile-name" title={user?.name || 'Developer'}>
                    {user?.name || 'Alex Rivera'}
                  </span>
                  <span className="profile-badge">PRO</span>
                </div>
                <div className="profile-stats-row">
                  <span className="profile-xp font-mono">{user?.xp || 2450} XP</span>
                  <span className="profile-streak font-mono">⚡ {user?.streak || 7}d</span>
                </div>
              </div>
            )}
          </div>

          <div className="sidebar-footer-actions">
            <button 
              type="button" 
              onClick={toggleTheme} 
              className="footer-action-btn"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Midnight Dark'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} className="text-warning" /> : <Moon size={15} className="text-primary" />}
              {!isCollapsed && <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>}
            </button>

            <button 
              type="button"
              onClick={handleLogout} 
              className="footer-action-btn logout"
              title="Sign out of TechVerse"
              aria-label="Logout"
            >
              <LogOut size={15} />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
