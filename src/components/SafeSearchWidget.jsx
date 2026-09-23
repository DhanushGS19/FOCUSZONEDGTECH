import React, { useState } from 'react';
import { Search } from 'lucide-react';
import './SafeSearchWidget.css';

const SafeSearchWidget = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const safeQuery = encodeURIComponent(`${query} education tutorial lesson for students site:.edu OR site:.org`);
    window.open(`https://www.google.com/search?q=${safeQuery}`, '_blank');
  };

  return (
    <div className="safe-search-widget">
      <div className="widget-header">
        <h3 className="font-bold">Safe Web Search</h3>
        <p className="text-xs text-muted">Opens safely in new tab</p>
      </div>
      <div className="widget-content">
        <form onSubmit={handleSearch} className="widget-search-form">
          <input 
            type="text" 
            placeholder="Search securely..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="primary"><Search size={16} /></button>
        </form>
      </div>
    </div>
  );
};

export default SafeSearchWidget;
