import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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

const App = () => {
  const { isAuthenticated } = useUser();

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
      <Sidebar />
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
    </div>
  );
};

export default App;
