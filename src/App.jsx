import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import CodeLab from './pages/CodeLab';
import Chat from './pages/Chat';
import Tests from './pages/Tests';
import DevTools from './pages/DevTools';
import Projects from './pages/Projects';
import Focus from './pages/Focus';
import Progress from './pages/Progress';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Certificates from './pages/Certificates';
import Media from './pages/Media';
import StudyPlan from './pages/StudyPlan';
import Competition from './pages/Competition';
import Login from './pages/Login';
import AuraBot from './components/AuraBot';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import TopNav from './components/TopNav';
import { TechVerseSymbol } from './components/TechVerseLogo';
import { useUser } from './context/UserContext';
import { 
  Menu, LayoutDashboard, Code2, Bot, Wrench, Sparkles, X, Search 
} from 'lucide-react';

const App = () => {
  const { isAuthenticated, user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auraBotOpen, setAuraBotOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const location = useLocation();

  // Global search listener
  useEffect(() => {
    const handleOpen = () => setSearchModalOpen(true);
    window.addEventListener('techverse_open_search', handleOpen);
    return () => window.removeEventListener('techverse_open_search', handleOpen);
  }, []);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="layout" key={location.pathname.startsWith('/login') ? 'auth' : 'main'}>
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
            <TechVerseSymbol size={24} />
            <span>TechVerse</span>
          </div>
        </div>
        <div className="mobile-topbar-right">
          <button 
            type="button" 
            className="mobile-menu-btn" 
            onClick={() => setSearchModalOpen(true)}
            aria-label="Search TechVerse"
            title="Search (Ctrl+K)"
          >
            <Search size={18} />
          </button>
          <div className="mobile-xp-pill">{user?.xp || 0} XP</div>
          <NavLink to="/profile" className="mobile-avatar-badge" aria-label="Profile">
            {user?.name ? user.name.charAt(0) : 'U'}
          </NavLink>
        </div>
      </header>

      {/* Sidebar: Left drawer on desktop, slide-over drawer with overlay on mobile */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Layout Body with TopNav and Content Area */}
      <div className="layout-body">
        {/* Desktop Top Navigation Bar */}
        <TopNav onOpenSearch={() => setSearchModalOpen(true)} />

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            {/* Main 10 Required Sections */}
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/code-lab" element={<CodeLab />} />
            <Route path="/flow-ai" element={<Chat />} />
            <Route path="/practice" element={<Tests />} />
            <Route path="/dev-tools" element={<DevTools />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/focus" element={<Focus />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/certificates" element={<Certificates />} />

            {/* Aliases & Preserved Features */}
            <Route path="/chat" element={<Navigate to="/flow-ai" replace />} />
            <Route path="/tests" element={<Navigate to="/practice" replace />} />
            <Route path="/media" element={<Media />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/competition" element={<Competition />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Command Palette Search Modal */}
      <GlobalSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />

      {/* Floating Aura Bot Trigger and Modal */}
      <button
        type="button"
        className={`aurabot-floating-btn ${auraBotOpen ? 'active' : ''}`}
        onClick={() => setAuraBotOpen(!auraBotOpen)}
        aria-label="Toggle Aura AI Study Buddy"
        title="Chat with Aura Bot ✨"
      >
        {auraBotOpen ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {auraBotOpen && (
        <aside className="aurabot-floating-window" aria-label="Aura Bot Assistant">
          <AuraBot onClose={() => setAuraBotOpen(false)} />
        </aside>
      )}

      {/* Mobile Bottom Navigation for quick thumb-reach access */}
      <nav className="mobile-bottom-nav">
        <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} end onClick={() => setMobileMenuOpen(false)}>
          <LayoutDashboard size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/code-lab" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Code2 size={18} />
          <span>Code</span>
        </NavLink>
        <NavLink to="/flow-ai" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Bot size={18} />
          <span>Flow AI</span>
        </NavLink>
        <NavLink to="/dev-tools" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Wrench size={18} />
          <span>Tools</span>
        </NavLink>
        <button
          type="button"
          className={`bottom-nav-item ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
