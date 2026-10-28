import React, { useState } from 'react';
import { Search, PlayCircle, MonitorPlay, ExternalLink, X, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';
import './Media.css';

const CURATED_VIDEOS = [
  {
    id: 'ztHopE5Wcdc',
    title: 'Database Design Course - Learn How to Design and Plan a Database for Beginners',
    channel: 'freeCodeCamp.org',
    subject: 'DBMS',
    duration: '8h 15m'
  },
  {
    id: 'HXV3zeRR3h4',
    title: 'SQL Tutorial - Full Database Course for Beginners',
    channel: 'freeCodeCamp.org',
    subject: 'DBMS',
    duration: '4h 20m'
  },
  {
    id: 'eIrMbAQSU34',
    title: 'Java Tutorial for Beginners - Full Course',
    channel: 'Programming with Mosh',
    subject: 'Java',
    duration: '2h 30m'
  },
  {
    id: 'A74TOX803D0',
    title: 'Java Full Course for free ☕ (Object Oriented Programming)',
    channel: 'Bro Code',
    subject: 'Java',
    duration: '12h'
  },
  {
    id: 'i_LwzRVP7bg',
    title: 'Machine Learning for Everybody – Full Course',
    channel: 'freeCodeCamp.org',
    subject: 'AI/ML',
    duration: '3h 50m'
  },
  {
    id: 'kqtD5dpn9C8',
    title: 'Python for Beginners - Full Course [Programming Tutorial]',
    channel: 'Programming with Mosh',
    subject: 'Coding',
    duration: '6h 15m'
  },
  {
    id: '8jLOx1hD3_o',
    title: 'Lofi Study Beats - Deep Focus & Concentration Stream',
    channel: 'Lofi Girl',
    subject: 'Focus Beats',
    duration: 'Live / Ambient'
  }
];

const Media = () => {
  const { addXp } = useUser();
  const [activeTab, setActiveTab] = useState('youtube'); // 'youtube' or 'google'
  const [query, setQuery] = useState('');
  const [activeSubject, setActiveSubject] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [notes, setNotes] = useState('');
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  const filteredVideos = CURATED_VIDEOS.filter(v => {
    const matchesQuery = v.title.toLowerCase().includes(query.toLowerCase()) || 
                         v.subject.toLowerCase().includes(query.toLowerCase()) ||
                         v.channel.toLowerCase().includes(query.toLowerCase());
    const matchesSubject = activeSubject === 'All' || v.subject === activeSubject;
    return matchesQuery && matchesSubject;
  });

  const handleSelectVideo = (video) => {
    setActiveVideo(video);
    addXp(25);
  };

  const handleGoogleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const safeQuery = encodeURIComponent(`${query} computer science tutorial documentation site:.edu OR site:.org OR site:developer.mozilla.org OR site:geeksforgeeks.org`);
    window.open(`https://www.google.com/search?q=${safeQuery}`, '_blank');
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`focusflow_notes_${activeVideo?.id || 'general'}`, notes);
    setSavedNotesMessage(true);
    setTimeout(() => setSavedNotesMessage(false), 2500);
  };

  return (
    <div className="media-container fade-in">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1>Edu Search & Media</h1>
          <p className="text-muted">Distraction-free educational lessons and filtered search</p>
        </div>
      </header>

      <div className="tabs-container mb-6 flex gap-4">
        <button 
          className={`tab-btn ${activeTab === 'youtube' ? 'active' : ''}`}
          onClick={() => { setActiveTab('youtube'); setQuery(''); }}
        >
          <MonitorPlay size={18} className="mr-2 inline" /> Curated Video Lessons
        </button>
        <button 
          className={`tab-btn ${activeTab === 'google' ? 'active' : ''}`}
          onClick={() => { setActiveTab('google'); setQuery(''); }}
        >
          <ExternalLink size={18} className="mr-2 inline" /> Academic Safe Search
        </button>
      </div>

      {activeTab === 'youtube' && (
        <>
          <div className="flex gap-4 mb-6 flex-wrap">
            <div className="search-bar" style={{ flex: 1 }}>
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search curated educational tutorials..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              {['All', 'DBMS', 'Java', 'AI/ML', 'Coding', 'Focus Beats'].map(sub => (
                <button
                  key={sub}
                  className={`filter-pill ${activeSubject === sub ? 'active' : ''}`}
                  onClick={() => setActiveSubject(sub)}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {activeVideo && (
            <div className="video-player-section glass-panel mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="badge">{activeVideo.subject}</span>
                  <h2 className="mt-2 text-2xl">{activeVideo.title}</h2>
                  <p className="text-muted text-sm">{activeVideo.channel} • {activeVideo.duration}</p>
                </div>
                <button className="icon-btn" onClick={() => setActiveVideo(null)} aria-label="Close Video">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '1.5rem' }}>
                <div className="video-wrapper" style={{ borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                  <iframe 
                    width="100%" 
                    height="420" 
                    src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`} 
                    title={activeVideo.title} 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>

                <div className="video-notes-panel flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <FileText size={16} className="text-primary" /> Study Notes
                    </h3>
                    <span className="text-xs text-muted">Auto-saves to browser</span>
                  </div>
                  <textarea
                    rows={12}
                    placeholder="Jot down formulas, code snippets, or timestamp notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      color: 'var(--text-main)',
                      padding: '0.75rem',
                      resize: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                  <div className="flex justify-between items-center">
                    {savedNotesMessage ? (
                      <span className="text-xs text-accent flex items-center gap-1">
                        <CheckCircle2 size={14} /> Notes saved!
                      </span>
                    ) : <span />}
                    <button className="primary text-xs" onClick={handleSaveNotes}>
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="video-grid">
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card glass-panel" onClick={() => handleSelectVideo(video)}>
                <div className="thumbnail-placeholder flex items-center justify-center">
                  <PlayCircle size={48} className="play-icon" />
                </div>
                <div className="video-info">
                  <div className="flex justify-between items-center">
                    <span className="badge">{video.subject}</span>
                    <span className="text-xs text-muted">{video.duration}</span>
                  </div>
                  <h4 className="mt-2 mb-1">{video.title}</h4>
                  <p className="text-muted text-xs">{video.channel}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'google' && (
        <div className="google-search-container glass-panel text-center py-12" style={{ padding: '4rem 2rem' }}>
          <Sparkles className="text-primary mx-auto mb-3" size={36} />
          <h2 className="text-2xl mb-4">Academic & Safe Web Search</h2>
          <p className="text-muted mb-8 mx-auto" style={{ maxWidth: '480px' }}>
            Queries are automatically enriched with educational domain filters (.edu, .org, MDN, GeeksforGeeks) to protect you from clickbait and distractions.
          </p>
          
          <form onSubmit={handleGoogleSearch} className="search-bar mx-auto mb-4" style={{ maxWidth: '640px', display: 'flex' }}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="e.g. BCNF decomposition examples, Java Streams tutorial..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="primary" style={{ padding: '0.5rem 1.25rem', borderRadius: '12px' }}>
              Search
            </button>
          </form>
          <p className="text-xs text-muted">Opens safely in a secure new browser tab.</p>
        </div>
      )}
    </div>
  );
};

export default Media;
