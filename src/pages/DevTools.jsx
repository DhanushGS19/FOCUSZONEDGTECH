import React, { useState } from 'react';
import { 
  Wrench, Code2, Globe, BarChart2, GitBranch, Search, 
  Terminal, FileText, Database, Send, Hash, Sparkles, Check 
} from 'lucide-react';
import { ProgrammingUtilities } from '../components/devtools/ProgrammingUtilities';
import { WebDevTools } from '../components/devtools/WebDevTools';
import { CSVisualizers } from '../components/devtools/CSVisualizers';
import { SqlPlayground } from '../components/devtools/SqlPlayground';
import { GitTools } from '../components/devtools/GitTools';
import { ApiTester } from '../components/devtools/ApiTester';
import { AsciiTable } from '../components/devtools/AsciiTable';
import { MarkdownPreviewer } from '../components/devtools/MarkdownPreviewer';
import './DevTools.css';

const MAIN_CATEGORIES = [
  { 
    id: 'code-utils', 
    label: 'Code Utilities', 
    icon: Code2, 
    desc: 'JSON Formatter & Validator, HTML/CSS/JS Formatters, Regex Tester, Diff Checker' 
  },
  { 
    id: 'web-dev', 
    label: 'Web Development', 
    icon: Globe, 
    desc: 'Color Palette Generator, CSS Gradient, Box Shadow, Responsive Preview, HTML Entities' 
  },
  { 
    id: 'programming', 
    label: 'Programming', 
    icon: BarChart2, 
    desc: 'Algorithm Visualizer, Number Base Converter, ASCII Table, String Utilities, Timestamps, SQL' 
  },
  { 
    id: 'git-dev', 
    label: 'Git & Development', 
    icon: GitBranch, 
    desc: 'Git Command Reference, Workflow Guide, GitHub Guide, Markdown Previewer, API Tester' 
  }
];

const DevTools = () => {
  const [activeCategory, setActiveCategory] = useState('code-utils');
  const [searchQuery, setSearchQuery] = useState('');

  // Sub-tabs for Programming and Git categories
  const [programmingSubTab, setProgrammingSubTab] = useState('visualizers'); // 'visualizers' | 'ascii' | 'bases' | 'sql'
  const [gitSubTab, setGitSubTab] = useState('git-studio'); // 'git-studio' | 'markdown' | 'api'

  const handleSearchJump = (catId, subTabId = null) => {
    setActiveCategory(catId);
    if (catId === 'programming' && subTabId) setProgrammingSubTab(subTabId);
    if (catId === 'git-dev' && subTabId) setGitSubTab(subTabId);
    setSearchQuery('');
  };

  return (
    <div className="devtools-container fade-in">
      {/* Top Header */}
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge cyan">TechVerse Suite</span>
            <span className="badge">4 Core Categories</span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Wrench className="text-cyan" size={26} /> Developer Tools Center
          </h1>
          <p className="text-muted text-xs">
            Comprehensive directory of developer utilities, web studios, computer science visualizers, Git simulator, and markdown tools
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ minWidth: '300px' }}>
          <Search size={16} className="text-muted mr-2" />
          <input
            type="text"
            placeholder="Search tools (e.g. JSON, Regex, ASCII, Git, Gradient)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Quick Search Recommendations if searching */}
      {searchQuery.trim() && (
        <div className="search-results-banner glass-panel p-4 mb-6 fade-in">
          <span className="text-xs text-muted block mb-2 font-bold uppercase">Quick Navigation Matches:</span>
          <div className="flex gap-2 flex-wrap">
            {searchQuery.toLowerCase().includes('json') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('code-utils')}>
                Open JSON Formatter & Validator
              </button>
            )}
            {searchQuery.toLowerCase().includes('regex') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('code-utils')}>
                Open Regex Tester
              </button>
            )}
            {(searchQuery.toLowerCase().includes('gradient') || searchQuery.toLowerCase().includes('color') || searchQuery.toLowerCase().includes('shadow')) && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('web-dev')}>
                Open Web Development Tools
              </button>
            )}
            {searchQuery.toLowerCase().includes('ascii') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('programming', 'ascii')}>
                Open ASCII Table Reference
              </button>
            )}
            {(searchQuery.toLowerCase().includes('sort') || searchQuery.toLowerCase().includes('algo') || searchQuery.toLowerCase().includes('bfs')) && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('programming', 'visualizers')}>
                Open Algorithm Visualizer
              </button>
            )}
            {searchQuery.toLowerCase().includes('markdown') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('git-dev', 'markdown')}>
                Open Markdown Previewer
              </button>
            )}
            {searchQuery.toLowerCase().includes('git') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('git-dev', 'git-studio')}>
                Open Git & GitHub Guide
              </button>
            )}
            {searchQuery.toLowerCase().includes('sql') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('programming', 'sql')}>
                Open SQL Playground
              </button>
            )}
            {searchQuery.toLowerCase().includes('api') && (
              <button className="filter-pill active text-xs" onClick={() => handleSearchJump('git-dev', 'api')}>
                Open API Testing Studio
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4 Main Category Cards */}
      <div className="category-tabs-grid grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {MAIN_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <div
              key={cat.id}
              className={`dev-cat-card glass-panel p-3.5 cursor-pointer transition-all ${isActive ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-card text-muted'}`}>
                  <Icon size={16} />
                </div>
                <span className="font-bold text-xs uppercase tracking-wider">{cat.label}</span>
              </div>
              <p className="text-[11px] text-muted line-clamp-2 leading-relaxed">{cat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Category Content Views */}
      <div className="devtools-content">
        {/* Category 1: CODE UTILITIES */}
        {activeCategory === 'code-utils' && (
          <ProgrammingUtilities />
        )}

        {/* Category 2: WEB DEVELOPMENT */}
        {activeCategory === 'web-dev' && (
          <WebDevTools />
        )}

        {/* Category 3: PROGRAMMING */}
        {activeCategory === 'programming' && (
          <div>
            <div className="subtool-pills-bar flex gap-2 flex-wrap mb-4">
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${programmingSubTab === 'visualizers' ? 'active' : ''}`}
                onClick={() => setProgrammingSubTab('visualizers')}
              >
                <BarChart2 size={13} />
                <span>Algorithm Visualizer</span>
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${programmingSubTab === 'ascii' ? 'active' : ''}`}
                onClick={() => setProgrammingSubTab('ascii')}
              >
                <Hash size={13} />
                <span>ASCII Table (0-127)</span>
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${programmingSubTab === 'sql' ? 'active' : ''}`}
                onClick={() => setProgrammingSubTab('sql')}
              >
                <Database size={13} />
                <span>SQL Playground</span>
              </button>
            </div>

            {programmingSubTab === 'visualizers' && <CSVisualizers />}
            {programmingSubTab === 'ascii' && <AsciiTable />}
            {programmingSubTab === 'sql' && <SqlPlayground />}
          </div>
        )}

        {/* Category 4: GIT AND DEVELOPMENT */}
        {activeCategory === 'git-dev' && (
          <div>
            <div className="subtool-pills-bar flex gap-2 flex-wrap mb-4">
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${gitSubTab === 'git-studio' ? 'active' : ''}`}
                onClick={() => setGitSubTab('git-studio')}
              >
                <GitBranch size={13} />
                <span>Git & GitHub Learning Studio</span>
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${gitSubTab === 'markdown' ? 'active' : ''}`}
                onClick={() => setGitSubTab('markdown')}
              >
                <FileText size={13} />
                <span>Markdown Previewer</span>
              </button>
              <button
                className={`filter-pill text-xs flex items-center gap-1.5 ${gitSubTab === 'api' ? 'active' : ''}`}
                onClick={() => setGitSubTab('api')}
              >
                <Send size={13} />
                <span>API Testing Studio</span>
              </button>
            </div>

            {gitSubTab === 'git-studio' && <GitTools />}
            {gitSubTab === 'markdown' && <MarkdownPreviewer />}
            {gitSubTab === 'api' && <ApiTester />}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevTools;
