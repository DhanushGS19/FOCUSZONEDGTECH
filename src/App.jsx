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
import { useUser } from './context/UserContext';
import { 
  Menu, LayoutDashboard, Compass, Terminal, Brain, Award, Sparkles, X, Search 
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
      {/* Sidebar: Left persistent rail on desktop, slide-over drawer with overlay on mobile */}
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Layout Body with Unified Responsive TopNav and Content Area */}
      <div className="layout-body">
        {/* Executive Top Navigation Bar (Adaptive across Desktop, Tablet & Mobile) */}
        <TopNav 
          onOpenSearch={() => setSearchModalOpen(true)} 
          onToggleSidebar={() => setMobileMenuOpen(true)} 
        />

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
      <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
        <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} end onClick={() => setMobileMenuOpen(false)}>
          <LayoutDashboard size={18} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/learn" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Compass size={18} />
          <span>Learn</span>
        </NavLink>
        <NavLink to="/code-lab" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Terminal size={18} />
          <span>Code</span>
        </NavLink>
        <NavLink to="/practice" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Brain size={18} />
          <span>Arena</span>
        </NavLink>
        <NavLink to="/certificates" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
          <Award size={18} />
          <span>Certs</span>
        </NavLink>
        <button
          type="button"
          className={`bottom-nav-item ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open Navigation Drawer"
        >
          <Menu size={18} />
          <span>More</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
