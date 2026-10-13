import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Search, Star, Book, Video, Filter, ArrowRight } from 'lucide-react';
import './Learn.css';

const Learn = () => {
  const { materials, classes, goals } = useUser();
  const [activeTab, setActiveTab] = useState('materials'); // 'materials' or 'classes'
  const activeGoal = goals[0];

  return (
    <div className="learn-container fade-in">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1>Learn</h1>
          <p className="text-muted">Discover top-rated materials and online classes</p>
        </div>
        
        <div className="search-bar">
          <Search size={18} className="text-muted" />
          <input type="text" placeholder="Search by subject, topic..." />
        </div>
      </header>

      {/* AI Recommendation Banner */}
      {activeGoal && (
        <div className="ai-rec-banner glass-panel mb-8 flex items-center justify-between">
          <div>
            <span className="badge-ai mb-2 inline-block">AI Recommended for you</span>
            <h3 className="text-xl">Boost your {activeGoal.subject} prep</h3>
            <p className="text-muted text-sm mt-1">Based on your goal: "{activeGoal.title}"</p>
          </div>
          <div className="flex gap-4">
            <button className="primary outline-btn">View Materials</button>
          </div>
        </div>
      )}

      <div className="tabs mb-6 flex gap-4">
        <button 
          className={`tab-btn ${activeTab === 'materials' ? 'active' : ''}`}
          onClick={() => setActiveTab('materials')}
        >
          <Book size={18} /> Study Materials
        </button>
        <button 
          className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
          onClick={() => setActiveTab('classes')}
        >
          <Video size={18} /> Online Classes
        </button>
      </div>

      <div className="filters flex gap-3 mb-6">
        <button className="filter-pill active">All</button>
        <button className="filter-pill">DBMS</button>
        <button className="filter-pill">Java</button>
        <button className="filter-pill">AI/ML</button>
        <button className="filter-pill icon-only ml-auto"><Filter size={16} /></button>
      </div>

      <div className="resource-grid">
        {activeTab === 'materials' && materials.map(m => (
          <div key={m.id} className="resource-card glass-panel">
            <div className="card-header flex justify-between items-start mb-3">
              <span className="category-tag">{m.category}</span>
              <span className="price-tag">{m.price}</span>
            </div>
            <h3 className="mb-1 text-lg">{m.title}</h3>
            <p className="text-sm text-muted mb-4">by {m.author}</p>
            
            <div className="card-footer flex justify-between items-center mt-auto pt-4 border-t border-white-10">
              <div className="rating flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="text-warning fill-warning" /> {m.rating}
              </div>
              <button className="text-btn primary-text text-sm flex items-center gap-1">
                View <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'classes' && classes.map(c => (
          <div key={c.id} className="resource-card class-card-lg glass-panel">
            <div className="thumbnail-placeholder flex items-center justify-center mb-4">
              <PlayCircleIcon />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg">{c.title}</h3>
              <span className="price-tag">{c.price}</span>
            </div>
            <p className="text-sm text-muted mb-4">{c.instructor} • {c.duration} • {c.level}</p>
            
            <div className="card-footer flex justify-between items-center mt-auto pt-4 border-t border-white-10">
              <div className="rating flex items-center gap-1 text-sm font-bold">
                <Star size={14} className="text-warning fill-warning" /> {c.rating} 
                <span className="text-muted font-normal">({c.students})</span>
              </div>
              <button className="primary text-sm px-4 py-2">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlayCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="rgba(255,255,255,0.5)"/></svg>
);

export default Learn;
