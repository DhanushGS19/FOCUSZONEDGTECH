import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Focus from './pages/Focus';
import Tests from './pages/Tests';
import Media from './pages/Media';
import Profile from './pages/Profile';
import Chat from './pages/Chat';

const App = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/media" element={<Media />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
