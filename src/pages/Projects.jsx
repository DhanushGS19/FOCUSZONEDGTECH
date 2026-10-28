import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  FolderGit2, Check, ExternalLink, Code2, Plus, Sparkles, 
  Trash2, Globe, GitBranch, Layers, ArrowRight, CheckCircle2, 
  Search, Filter, BookOpen, Terminal, Copy 
} from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const navigate = useNavigate();
  const { 
    projects, updateProjectMilestone, 
    linkProjectRepo, addXp 
  } = useUser();

  const [activeTab, setActiveTab] = useState('blueprints'); // 'blueprints' | 'portfolio'
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected project for detailed modal
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);
  const [submitRepoUrl, setSubmitRepoUrl] = useState('');
  const [submitLiveUrl, setSubmitLiveUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Custom Portfolio Projects State
  const [myPortfolio, setMyPortfolio] = useState(() => {
    try {
      const saved = localStorage.getItem('techverse_user_portfolio');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'pf_1',
        title: 'Distributed Key-Value Cache Simulator',
        tagline: 'Mini Redis clone with LRU eviction and thread-safe operations',
        techStack: ['Node.js', 'TypeScript', 'Hash Maps'],
        githubUrl: 'https://github.com/alexrivera-dev/kv-cache',
        liveUrl: '',
        date: 'October 2026',
        description: 'Implemented an in-memory key-value cache supporting constant-time O(1) reads, writes, and an automated background TTL cleanup worker.'
      }
    ];
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    tagline: '',
    techStack: 'React, Node.js, TypeScript',
    githubUrl: '',
    liveUrl: '',
    description: ''
  });

  const categories = [
    'All',
    'Python Projects',
    'Java Projects',
    'Web Development',
    'C and C++ Projects',
    'AI and Data Projects',
    'Beginner Projects'
  ];

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchesDiff = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    
    let matchesCat = true;
    if (categoryFilter === 'Python Projects') {
      matchesCat = p.techStack && p.techStack.some(t => t.toLowerCase().includes('python'));
    } else if (categoryFilter === 'Java Projects') {
      matchesCat = p.techStack && p.techStack.some(t => t.toLowerCase().includes('java') && !t.toLowerCase().includes('javascript'));
    } else if (categoryFilter === 'Web Development') {
      matchesCat = p.category === 'Web Development' || p.category === 'Full-Stack' || (p.techStack && p.techStack.some(t => ['html5', 'html', 'css', 'css3', 'react', 'javascript'].includes(t.toLowerCase())));
    } else if (categoryFilter === 'C and C++ Projects') {
      matchesCat = p.techStack && p.techStack.some(t => t.toLowerCase().includes('c++') || t.toLowerCase() === 'c' || t.toLowerCase().includes('clang'));
    } else if (categoryFilter === 'AI and Data Projects') {
      matchesCat = p.category === 'AI / LLM' || (p.techStack && p.techStack.some(t => t.toLowerCase().includes('ai') || t.toLowerCase().includes('llm') || t.toLowerCase().includes('gemini') || t.toLowerCase().includes('data')));
    } else if (categoryFilter === 'Beginner Projects') {
      matchesCat = p.difficulty === 'Beginner';
    } else if (categoryFilter !== 'All') {
      matchesCat = p.category === categoryFilter;
    }

    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.techStack && p.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesDiff && matchesCat && matchesSearch;
  });

  const handleOpenCodeLabWithProject = (proj) => {
    const code = proj.starterCode || `// Starter Blueprint for: ${proj.title}\n// Tech Stack: ${proj.techStack?.join(', ')}\n\nconsole.log("Setting up ${proj.title}...");`;
    localStorage.setItem('focusflow_code_review', code);
    navigate('/code-lab');
  };

  const handleCopyCode = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSubmitCompletedWork = (e) => {
    e.preventDefault();
    if (!selectedBlueprint) return;

    linkProjectRepo(selectedBlueprint.id, submitRepoUrl, submitLiveUrl);

    // Also add to My Portfolio if not present
    const existing = myPortfolio.find(p => p.title === selectedBlueprint.title);
    if (!existing) {
      const newEntry = {
        id: `pf_${Date.now()}`,
        title: selectedBlueprint.title,
        tagline: selectedBlueprint.tagline,
        techStack: selectedBlueprint.techStack || ['Full-Stack'],
        githubUrl: submitRepoUrl.trim(),
        liveUrl: submitLiveUrl.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        description: selectedBlueprint.description
      };
      const updated = [newEntry, ...myPortfolio];
      setMyPortfolio(updated);
      localStorage.setItem('techverse_user_portfolio', JSON.stringify(updated));
    }

    alert(`🎉 Congratulations! "${selectedBlueprint.title}" marked as completed and added to your portfolio! (+75 XP)`);
    setSelectedBlueprint(null);
    setSubmitRepoUrl('');
    setSubmitLiveUrl('');
  };

  const handleCreatePortfolioProject = (e) => {
    e.preventDefault();
    if (!newProjectForm.title.trim()) return;

    const newEntry = {
      id: `pf_${Date.now()}`,
      title: newProjectForm.title.trim(),
      tagline: newProjectForm.tagline.trim() || 'Software Engineering Project',
      techStack: newProjectForm.techStack.split(',').map(s => s.trim()).filter(Boolean),
      githubUrl: newProjectForm.githubUrl.trim(),
      liveUrl: newProjectForm.liveUrl.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      description: newProjectForm.description.trim()
    };

    const updated = [newEntry, ...myPortfolio];
    setMyPortfolio(updated);
    localStorage.setItem('techverse_user_portfolio', JSON.stringify(updated));
    setShowAddModal(false);
    setNewProjectForm({ title: '', tagline: '', techStack: 'React, Node.js, TypeScript', githubUrl: '', liveUrl: '', description: '' });
    addXp(60);
  };

  const handleDeletePortfolioProject = (id) => {
    if (window.confirm("Remove this project from your portfolio?")) {
      const updated = myPortfolio.filter(p => p.id !== id);
      setMyPortfolio(updated);
      localStorage.setItem('techverse_user_portfolio', JSON.stringify(updated));
    }
  };

  return (
    <div className="projects-container fade-in">
      {/* Top Header */}
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge">Project Library</span>
            <span className="badge cyan">15 Structured Blueprints</span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <FolderGit2 className="text-primary" size={26} /> Project-Based Learning & Portfolio
          </h1>
          <p className="text-muted text-xs">
            Learn through real-world software engineering with milestone tracking, starter code, testing guidance, and portfolio publishing
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 bg-charcoal p-1 rounded-xl border border-white-10">
          <button
            className={`filter-pill text-xs ${activeTab === 'blueprints' ? 'active' : ''}`}
            onClick={() => setActiveTab('blueprints')}
          >
            <Layers size={13} /> Project Library ({projects.length})
          </button>
          <button
            className={`filter-pill text-xs ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Globe size={13} /> My Portfolio ({myPortfolio.length})
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* TAB 1: GUIDED REAL-WORLD PROJECT BLUEPRINTS                    */}
      {/* ============================================================== */}
      {activeTab === 'blueprints' && (
        <div className="blueprints-view fade-in">
          {/* Filters Bar */}
          <div className="glass-panel p-3 mb-6 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted font-bold flex items-center gap-1">
                <Filter size={12} /> Filters:
              </span>

              {/* Difficulty */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="p-1.5 bg-dark border border-white-10 rounded text-xs text-white"
              >
                <option value="All">All Tiers (15 Projects)</option>
                <option value="Beginner">Beginner (5 Projects)</option>
                <option value="Intermediate">Intermediate (5 Projects)</option>
                <option value="Advanced">Advanced (5 Projects)</option>
              </select>

              {/* Category */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-1.5 bg-dark border border-white-10 rounded text-xs text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="search-bar" style={{ minWidth: '240px' }}>
              <Search size={14} className="text-muted mr-1.5" />
              <input
                type="text"
                placeholder="Search projects by title, tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs"
              />
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(proj => {
              const milestonesList = proj.milestones || proj.steps || [];
              const completedCount = milestonesList.filter(s => s.completed).length;
              const progressPct = proj.progress !== undefined ? proj.progress : (milestonesList.length > 0 ? Math.round((completedCount / milestonesList.length) * 100) : 0);
              const isCompleted = proj.status === 'Completed' || (milestonesList.length > 0 && completedCount === milestonesList.length);

              return (
                <div 
                  key={proj.id} 
                  className="glass-panel p-5 flex flex-col justify-between border hover:border-primary transition-all cursor-pointer"
                  onClick={() => setSelectedBlueprint(proj)}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="badge text-[10px]">{proj.category}</span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] text-muted font-mono">
                          ⏱ {proj.estimatedEffort || (proj.difficulty === 'Beginner' ? '4-6 hrs' : proj.difficulty === 'Intermediate' ? '8-12 hrs' : '16-24 hrs')}
                        </span>
                        <span className={`badge text-[10px] ${
                          proj.difficulty === 'Beginner' ? 'cyan' :
                          proj.difficulty === 'Intermediate' ? 'amber' : 'red'
                        }`}>
                          {proj.difficulty}
                        </span>
                        <span className={`badge text-[10px] ${
                          isCompleted ? 'text-green-400 border-green-500' :
                          progressPct > 0 ? 'text-amber-400 border-amber-500' : 'text-slate-400'
                        }`}>
                          {isCompleted ? 'Completed' : progressPct > 0 ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-base mb-1 text-white hover:text-cyan transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-muted mb-3 line-clamp-2 leading-relaxed">
                      {proj.tagline || proj.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(proj.techStack || []).slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark border border-white-10 text-cyan">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Milestone Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-[11px] text-muted mb-1">
                        <span>Milestones: {completedCount}/{milestonesList.length}</span>
                        <span className="font-bold text-white">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-dark h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full transition-all" 
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-white-10 text-xs">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedBlueprint(proj); }}
                      className="text-cyan font-semibold flex items-center gap-1 hover:underline"
                    >
                      View Blueprint <ArrowRight size={12} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOpenCodeLabWithProject(proj); }}
                      className="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1"
                    >
                      <Code2 size={12} /> Starter Code
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project Blueprint Deep-Dive Modal Drawer */}
          {selectedBlueprint && (
            <div className="modal-backdrop fade-in" onClick={() => setSelectedBlueprint(null)}>
              <div 
                className="modal-content glass-panel p-6 max-w-3xl w-full max-h-[88vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge cyan">{selectedBlueprint.category}</span>
                      <span className="badge">{selectedBlueprint.difficulty} Level</span>
                      {selectedBlueprint.status === 'Completed' && (
                        <span className="badge text-green-400 border-green-500">Verified Completed</span>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-white">{selectedBlueprint.title}</h2>
                    <p className="text-xs text-muted">{selectedBlueprint.tagline}</p>
                  </div>
                  <button onClick={() => setSelectedBlueprint(null)} className="text-muted hover:text-white p-1 text-lg">✕</button>
                </div>

                {/* Description */}
                <div className="mb-4 text-xs text-muted leading-relaxed p-3 bg-charcoal rounded border border-white-10">
                  {selectedBlueprint.description}
                </div>

                {/* Learning Objectives */}
                {selectedBlueprint.learningObjectives && (
                  <div className="mb-4">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-cyan mb-2 flex items-center gap-1.5">
                      <BookOpen size={13} /> Learning Objectives
                    </h4>
                    <ul className="list-disc pl-5 text-xs text-muted space-y-1">
                      {selectedBlueprint.learningObjectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Milestones Checklist */}
                <div className="mb-5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-primary" /> Implementation Milestones
                  </h4>
                  <div className="space-y-2">
                    {(selectedBlueprint.milestones || selectedBlueprint.steps || []).map((m) => (
                      <div 
                        key={m.id}
                        onClick={() => updateProjectMilestone(selectedBlueprint.id, m.id)}
                        className={`p-2.5 rounded border ${
                          m.completed ? 'border-green-500 bg-green-500-10' : 'border-white-10 bg-charcoal'
                        } cursor-pointer flex items-center gap-3 text-xs transition-all`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          m.completed ? 'bg-green-500 border-green-500 text-white' : 'border-white-10'
                        }`}>
                          {m.completed && <Check size={11} />}
                        </div>
                        <span className={m.completed ? 'line-through text-muted' : 'text-white'}>
                          {m.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Starter Code */}
                {selectedBlueprint.starterCode && (
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-1.5">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-cyan flex items-center gap-1.5">
                        <Terminal size={13} /> Scaffolding & Starter Code
                      </h4>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleCopyCode(selectedBlueprint.starterCode)} 
                          className="btn-secondary text-xs px-2 py-0.5 flex items-center gap-1"
                        >
                          {copiedCode ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                          {copiedCode ? 'Copied' : 'Copy'}
                        </button>
                        <button 
                          onClick={() => handleOpenCodeLabWithProject(selectedBlueprint)} 
                          className="btn-primary text-xs px-2.5 py-0.5 flex items-center gap-1"
                        >
                          <Code2 size={11} /> Open in Code Lab
                        </button>
                      </div>
                    </div>
                    <pre className="p-3 bg-dark rounded border border-white-10 text-xs font-mono text-cyan max-h-48 overflow-y-auto">
                      <code>{selectedBlueprint.starterCode}</code>
                    </pre>
                  </div>
                )}

                {/* Testing & Documentation Guidance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div className="p-3 bg-charcoal rounded border border-white-10 text-xs">
                    <span className="font-bold text-white block mb-1">🧪 Testing Guidance</span>
                    <p className="text-muted leading-relaxed">{selectedBlueprint.testingGuidance || 'Write unit tests for edge cases and input validation.'}</p>
                  </div>
                  <div className="p-3 bg-charcoal rounded border border-white-10 text-xs">
                    <span className="font-bold text-white block mb-1">📄 Documentation Guidance</span>
                    <p className="text-muted leading-relaxed">{selectedBlueprint.documentationGuidance || 'Provide a clear README.md with setup instructions and architectural diagram.'}</p>
                  </div>
                </div>

                {/* Submit Completed Work to Portfolio */}
                <form onSubmit={handleSubmitCompletedWork} className="p-4 bg-charcoal rounded border border-cyan">
                  <span className="font-bold text-xs text-white block mb-1 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-cyan" /> Submit Completed Work & Link to Portfolio
                  </span>
                  <p className="text-xs text-muted mb-3">
                    Record your GitHub repository URL and live demo to verify authentic completion and publish to your portfolio.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <input
                      type="url"
                      placeholder="https://github.com/your-username/repo"
                      value={submitRepoUrl}
                      onChange={(e) => setSubmitRepoUrl(e.target.value)}
                      className="p-2 text-xs bg-dark rounded border border-white-10"
                    />
                    <input
                      type="url"
                      placeholder="https://your-project.vercel.app (Optional)"
                      value={submitLiveUrl}
                      onChange={(e) => setSubmitLiveUrl(e.target.value)}
                      className="p-2 text-xs bg-dark rounded border border-white-10"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-xs px-4 py-1.5">
                    Verify & Add to Portfolio (+75 XP)
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: MY PORTFOLIO SHOWCASE                                   */}
      {/* ============================================================== */}
      {activeTab === 'portfolio' && (
        <div className="portfolio-view fade-in">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-bold">Personal Developer Showcase</h2>
              <p className="text-xs text-muted">
                Published projects, GitHub source repositories, and live deployed applications
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary text-xs flex items-center gap-1.5 px-3 py-2"
            >
              <Plus size={14} /> Add Project to Portfolio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myPortfolio.map(item => (
              <div key={item.id} className="glass-panel p-5 flex flex-col justify-between border border-white-10 hover:border-cyan transition-all">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="badge cyan text-[10px]">Verified Completed</span>
                    <button
                      onClick={() => handleDeletePortfolioProject(item.id)}
                      className="text-muted hover:text-red-400 p-1"
                      title="Remove from portfolio"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <h3 className="font-bold text-base mb-1 text-white">{item.title}</h3>
                  <p className="text-xs text-cyan mb-2 font-mono">{item.tagline}</p>
                  <p className="text-xs text-muted mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.techStack?.map((t, idx) => (
                      <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark border border-white-10 text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white-10 text-xs">
                  <span className="text-muted font-mono">{item.date}</span>
                  <div className="flex gap-3">
                    {item.githubUrl && (
                      <a href={item.githubUrl} target="_blank" rel="noreferrer" className="text-cyan flex items-center gap-1 font-semibold hover:underline">
                        <GitBranch size={13} /> GitHub Repo
                      </a>
                    )}
                    {item.liveUrl && (
                      <a href={item.liveUrl} target="_blank" rel="noreferrer" className="text-primary flex items-center gap-1 font-semibold hover:underline">
                        <ExternalLink size={13} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Project Modal */}
          {showAddModal && (
            <div className="modal-backdrop fade-in" onClick={() => setShowAddModal(false)}>
              <div className="modal-content glass-panel p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Sparkles size={16} className="text-cyan" /> Add Project to Portfolio
                  </h3>
                  <button onClick={() => setShowAddModal(false)} className="text-muted hover:text-white">✕</button>
                </div>
                <form onSubmit={handleCreatePortfolioProject} className="space-y-3">
                  <div>
                    <label className="text-xs text-muted block mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Distributed Key-Value Store"
                      value={newProjectForm.title}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                      className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-1">Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. In-memory LRU cache with concurrency"
                      value={newProjectForm.tagline}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, tagline: e.target.value })}
                      className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-1">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, TypeScript"
                      value={newProjectForm.techStack}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, techStack: e.target.value })}
                      className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted block mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/..."
                        value={newProjectForm.githubUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, githubUrl: e.target.value })}
                        className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted block mb-1">Live Demo URL</label>
                      <input
                        type="url"
                        placeholder="https://my-app.vercel.app"
                        value={newProjectForm.liveUrl}
                        onChange={(e) => setNewProjectForm({ ...newProjectForm, liveUrl: e.target.value })}
                        className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted block mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Summary of architectural decisions and key features..."
                      value={newProjectForm.description}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                      className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                    />
                  </div>
                  <button type="submit" className="btn-primary text-xs w-full py-2 mt-2">
                    Publish to Portfolio (+60 XP)
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;
