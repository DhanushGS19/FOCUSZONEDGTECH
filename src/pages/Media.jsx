import React, { useState } from 'react';
import { Search, PlayCircle, MonitorPlay, Search as SearchIcon } from 'lucide-react';
import './Media.css';

const MOCK_VIDEOS = [
  { id: 'dQw4w9WgXcQ', title: 'The History of the Universe in 10 Minutes', channel: 'Science Plus', subject: 'Science' },
  { id: 'N1RoB_Fk5Zg', title: 'Algebra Basics - Solving Equations', channel: 'Math Wizard', subject: 'Math' },
  { id: '35O_5yYk9mU', title: 'World War II Summary', channel: 'History Buffs', subject: 'History' },
  { id: 'kqtD5dpn9C8', title: 'Introduction to Python Programming', channel: 'Code School', subject: 'Coding' },
];

const Media = () => {
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' or 'google'
  const [query, setQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredVideos = MOCK_VIDEOS.filter(v => 
    v.title.toLowerCase().includes(query.toLowerCase()) || 
    v.subject.toLowerCase().includes(query.toLowerCase())
  );

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // Append education-specific keywords to ensure safer search
    const safeQuery = encodeURIComponent(`${query} education tutorial lesson for students site:.edu OR site:.org`);
    // Open in new tab since Google blocks iframe embedding
    window.open(`https://www.google.com/search?q=${safeQuery}`, '_blank');
  };

  return (
    <div className="media-container">
      <h1 className="mb-4">Edu Search & Media</h1>
      <p className="text-muted mb-6">Search and watch curated educational content without the rabbit hole of distractions.</p>

      <div className="tabs-container mb-6 flex gap-4">
        <button 
          className={`tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
          onClick={() => {setActiveTab('youtube'); setQuery('');}}
        >
          <MonitorPlay size={18} className="mr-2 inline" /> YouTube Lessons
        </button>
        <button 
          className={`tab-btn ${activeTab === 'google' ? 'active' : ''}`}
          onClick={() => {setActiveTab('google'); setQuery('');}}
        >
          <SearchIcon size={18} className="mr-2 inline" /> Google Safe Search
        </button>
      </div>

      {activeTab === 'youtube' && (
        <>
          <div className="search-bar mb-8">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search curated YouTube lessons..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {activeVideo && (
            <div className="video-player-section glass-panel mb-8">
              <div className="video-wrapper">
                <iframe 
                  width="100%" 
                  height="400" 
                  src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} 
                  title={activeVideo.title} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen>
                </iframe>
              </div>
              <h3 className="mt-4 text-2xl">{activeVideo.title}</h3>
              <p className="text-muted">{activeVideo.channel}</p>
              <button className="mt-4" onClick={() => setActiveVideo(null)}>Close Video</button>
            </div>
          )}

          <div className="video-grid">
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card glass-panel" onClick={() => setActiveVideo(video)}>
                <div className="thumbnail-placeholder flex items-center justify-center">
                  <PlayCircle size={48} className="play-icon" />
                </div>
                <div className="video-info">
                  <span className="badge">{video.subject}</span>
                  <h4 className="mt-2">{video.title}</h4>
                  <p className="text-muted text-sm">{video.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'google' && (
        <div className="google-search-container glass-panel text-center py-12" style={{ padding: '4rem 2rem' }}>
          <h2 className="text-2xl mb-4">Safe Web Search</h2>
          <p className="text-muted mb-8 mx-auto" style={{ maxWidth: '400px' }}>
            Your searches will automatically be filtered to prioritize educational content, tutorials, and safe resources.
          </p>
          
          <form onSubmit={handleGoogleSearch} className="search-bar mx-auto mb-4" style={{ maxWidth: '600px', display: 'flex' }}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="What do you want to learn?" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="primary" style={{ padding: '0.5rem 1rem', borderRadius: '12px' }}>Search</button>
          </form>
          <p className="text-xs text-muted">Opens safely in a new tab.</p>
        </div>
      )}
    </div>
  );
};

export default Media;
