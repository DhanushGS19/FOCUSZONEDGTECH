import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, BookOpen, Code2, Wrench, FolderGit2, Brain, 
  Timer, Award, ArrowRight, X, Command, Sparkles, Terminal, 
  Database, GitBranch, Send 
} from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { COMPREHENSIVE_PROJECTS } from '../data/projectData';
import './GlobalSearchModal.css';

// Pre-indexed searchable items
const STATIC_TOOLS_AND_PAGES = [
  { id: 'tool_json', title: 'JSON Formatter & Validator', category: 'Dev Tools', url: '/dev-tools', icon: Wrench, desc: 'Beautify, validate, and minify JSON data with syntax checking' },
  { id: 'tool_base64', title: 'Base64 & URL Encoder / Decoder', category: 'Dev Tools', url: '/dev-tools', icon: Wrench, desc: 'Encode and decode strings using standard Base64 and URL encoding' },
  { id: 'tool_regex', title: 'Regular Expression Tester', category: 'Dev Tools', url: '/dev-tools', icon: Wrench, desc: 'Test regex patterns with live match highlights and flags' },
  { id: 'tool_web_sandbox', title: 'HTML / CSS / JS Live Sandbox', category: 'Dev Tools', url: '/dev-tools', icon: Wrench, desc: 'Instant preview browser playground with responsive viewports' },
  { id: 'tool_visualizer', title: 'CS Visualizers (Sorting & Searching)', category: 'Dev Tools', url: '/dev-tools', icon: Wrench, desc: 'Interactive step-by-step visualizers for Bubble Sort, Binary Search, BFS' },
  { id: 'tool_sql', title: 'SQL Playground', category: 'Dev Tools', url: '/dev-tools', icon: Database, desc: 'Practice SQL queries against relational tables with live results' },
  { id: 'tool_git', title: 'Git & GitHub Studio', category: 'Dev Tools', url: '/dev-tools', icon: GitBranch, desc: 'Interactive commit graph, branch simulator, and merge conflict studio' },
  { id: 'tool_api', title: 'API Testing Studio (REST Client)', category: 'Dev Tools', url: '/dev-tools', icon: Send, desc: 'Send HTTP requests (GET, POST, etc.) and inspect headers and JSON payload' },
  { id: 'page_code_lab', title: 'Code Lab (Multi-Language IDE)', category: 'IDE', url: '/code-lab', icon: Code2, desc: 'Write, compile, and execute Python, C, C++, Java, and Node.js' },
  { id: 'page_flow_ai', title: 'Flow AI Programming Tutor', category: 'AI', url: '/flow-ai', icon: Sparkles, desc: 'Ask questions, debug errors, and get code explanations across 6 AI modes' },
  { id: 'page_practice', title: 'Practice Arena & DSA Challenges', category: 'Practice', url: '/practice', icon: Brain, desc: 'Solve coding challenges with authoritative hidden test cases' },
  { id: 'page_focus', title: 'Focus Zone (Pomodoro & Pink Noise)', category: 'Productivity', url: '/focus', icon: Timer, desc: 'Distraction-free study timer with synthesized ambient pink noise' },
  { id: 'page_progress', title: 'Mastery & Progress Analytics', category: 'Analytics', url: '/progress', icon: Award, desc: 'View demonstrated skill mastery, weekly activity, and badges' },
  { id: 'page_profile', title: 'Profile & Settings', category: 'Settings', url: '/profile', icon: Award, desc: 'Manage user account, preferences, theme, and API keys' },
  { id: 'page_admin', title: 'Admin & Content Management', category: 'Admin', url: '/admin', icon: Wrench, desc: 'Protected administrator console to manage curricula, challenges, and templates' }
];

export const GlobalSearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event if not currently controlled
          window.dispatchEvent(new CustomEvent('techverse_open_search'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allSearchItems = [];

  // 1. Add static tools and main pages
  allSearchItems.push(...STATIC_TOOLS_AND_PAGES);

  // 2. Add curriculum tracks & lessons
  Object.keys(CURRICULUM_DATA).forEach(trackKey => {
    const track = CURRICULUM_DATA[trackKey];
    const trackLessons = [
      ...(track.levels?.beginner || []),
      ...(track.levels?.intermediate || []),
      ...(track.levels?.advanced || [])
    ];

    allSearchItems.push({
      id: `track_${trackKey}`,
      title: `${track.name} Course Track`,
      category: 'Course',
      url: '/learn',
      icon: BookOpen,
      desc: `${track.description} (${trackLessons.length} lessons available)`
    });

    // Add lessons from each level
    trackLessons.forEach(les => {
      allSearchItems.push({
        id: `les_${les.id}`,
        title: `${les.title} (${track.name} - ${les.level})`,
        category: 'Lesson',
        url: '/learn',
        icon: BookOpen,
        desc: les.description || `Interactive ${les.level} lesson in ${track.name} curriculum`
      });
    });
  });

  // 3. Add 15 Projects
  COMPREHENSIVE_PROJECTS.forEach(proj => {
    allSearchItems.push({
      id: `proj_${proj.id}`,
      title: `${proj.title} (${proj.difficulty})`,
      category: 'Project',
      url: '/projects',
      icon: FolderGit2,
      desc: proj.tagline || proj.description
    });
  });

  // 4. Add Coding Challenges
  const challenges = [
    { title: 'Valid Parentheses', topic: 'Stacks & Queues', diff: 'Easy' },
    { title: 'Two Sum (O(n) Hash Map)', topic: 'Arrays & Hash Maps', diff: 'Easy' },
    { title: 'Maximum Subarray (Kadane)', topic: 'Dynamic Programming', diff: 'Medium' },
    { title: 'Reverse Words in a String', topic: 'Strings', diff: 'Medium' },
    { title: 'Invert Binary Tree', topic: 'Trees & Graphs', diff: 'Easy' }
  ];
  challenges.forEach((ch, i) => {
    allSearchItems.push({
      id: `ch_${i}`,
      title: `${ch.title} Challenge`,
      category: 'Challenge',
      url: '/practice',
      icon: Brain,
      desc: `${ch.topic} • ${ch.diff} Difficulty algorithmic problem`
    });
  });

  // Filter items
  const filtered = allSearchItems.filter(item => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const q = query.toLowerCase().trim();
    if (!q) return matchesFilter;
    const matchesQuery = item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  }).slice(0, 15); // Top 15 matches

  const handleSelectItem = (item) => {
    onClose();
    navigate(item.url);
  };

  if (!isOpen) return null;

  return (
    <div className="global-search-backdrop fade-in" onClick={onClose}>
      <div className="global-search-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-modal-header flex items-center gap-3 p-4 border-b border-white-10">
          <Search size={18} className="text-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search courses, lessons, tools, challenges, projects (Ctrl+K)..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            className="search-modal-input text-sm bg-transparent border-none outline-none text-white w-full font-sans"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-muted hover:text-white p-1">
              <X size={15} />
            </button>
          )}
          <span className="badge text-[10px] font-mono shrink-0">ESC to exit</span>
        </div>

        {/* Category Filter Pills */}
        <div className="search-filter-pills flex gap-2 p-3 border-b border-white-10 overflow-x-auto text-xs">
          {['All', 'Course', 'Lesson', 'Dev Tools', 'Challenge', 'Project', 'IDE', 'AI'].map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveFilter(cat); setSelectedIndex(0); }}
              className={`filter-pill text-xs px-2.5 py-0.5 ${activeFilter === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="search-results-list max-h-96 overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon || BookOpen;
              const isSelected = selectedIndex === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`search-result-row p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected ? 'bg-cyan-500-10 border border-cyan' : 'hover:bg-charcoal border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate pr-2">
                    <div className="p-2 rounded-lg bg-dark text-cyan shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-white truncate">{item.title}</span>
                        <span className="badge text-[10px] font-mono">{item.category}</span>
                      </div>
                      <p className="text-[11px] text-muted truncate mt-0.5">{item.desc}</p>
                    </div>
                  </div>

                  <ArrowRight size={14} className="text-cyan shrink-0 opacity-80" />
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted">
              <Command size={36} className="mx-auto mb-2 opacity-30 text-cyan" />
              <p className="text-sm font-bold text-white mb-1">No matching results found</p>
              <p className="text-xs">Try searching for "Python", "JSON", "Parentheses", "Calculator", or "Git"</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="search-modal-footer p-3 border-t border-white-10 flex justify-between items-center text-[11px] text-muted">
          <span>Techverse Universal Discovery Engine</span>
          <div className="flex gap-3">
            <span><kbd className="font-mono bg-dark px-1 rounded">↵</kbd> Select</span>
            <span><kbd className="font-mono bg-dark px-1 rounded">esc</kbd> Close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
