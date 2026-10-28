import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  Search, BookOpen, Code2, Terminal, Play, Layers, Award, 
  CheckCircle2, ArrowRight, ArrowLeft, Check, Copy, HelpCircle, 
  ChevronRight, Bot, Star, Compass, Filter, BookMarked, AlertTriangle
} from 'lucide-react';
import './Learn.css';

export const LANGUAGES_LIST = [
  { 
    id: 'python', 
    name: 'Python', 
    icon: '🐍', 
    difficulty: 'Beginner', 
    category: 'Data and AI', 
    topics: ['Syntax & Types', 'OOP & Classes', 'APIs & Web', 'Data Analysis', 'Testing'],
    description: 'Versatile, high-level language essential for AI, machine learning, data engineering, scripting, and backend development.'
  },
  { 
    id: 'javascript', 
    name: 'JavaScript', 
    icon: '⚡', 
    difficulty: 'Beginner', 
    category: 'Web Development', 
    topics: ['ES6+ Syntax', 'Async/Await', 'DOM Manipulation', 'Closures & Scopes', 'Web APIs'],
    description: 'The foundation of the modern web, enabling interactive frontend experiences and scalable asynchronous server runtimes.'
  },
  { 
    id: 'typescript', 
    name: 'TypeScript', 
    icon: '🔷', 
    difficulty: 'Intermediate', 
    category: 'Web Development', 
    topics: ['Static Typing', 'Interfaces & Types', 'Generics', 'Utility Types', 'TSConfig'],
    description: 'Typed superset of JavaScript providing compile-time type safety, interfaces, and modern tooling for enterprise scale.'
  },
  { 
    id: 'java', 
    name: 'Java', 
    icon: '☕', 
    difficulty: 'Intermediate', 
    category: 'Software Development', 
    topics: ['OOP Principles', 'Collections Framework', 'JVM Architecture', 'Streams & Lambdas', 'Multithreading'],
    description: 'Enterprise-grade, object-oriented platform powering large-scale backend systems, distributed services, and Android applications.'
  },
  { 
    id: 'cpp', 
    name: 'C++', 
    icon: '🚀', 
    difficulty: 'Advanced', 
    category: 'Systems Programming', 
    topics: ['STL Containers', 'Pointers & Memory', 'Templates', 'RAII Principles', 'Smart Pointers'],
    description: 'High-performance compiled language delivering fine-grained hardware control, game engines, and low-latency infrastructure.'
  },
  { 
    id: 'c', 
    name: 'C', 
    icon: '⚙️', 
    difficulty: 'Intermediate', 
    category: 'Systems Programming', 
    topics: ['Manual Memory Management', 'Pointers & Arrays', 'Structs & Unions', 'System Calls', 'Bitwise Math'],
    description: 'Foundational systems language forming the core of operating systems, embedded hardware, compilers, and network stacks.'
  },
  { 
    id: 'html', 
    name: 'HTML', 
    icon: '🌐', 
    difficulty: 'Beginner', 
    category: 'Web Development', 
    topics: ['Semantic Structure', 'Forms & Validation', 'SEO Best Practices', 'ARIA Accessibility', 'Media Elements'],
    description: 'The semantic scaffolding of the World Wide Web, establishing accessible structure for all web pages and modern web apps.'
  },
  { 
    id: 'css', 
    name: 'CSS', 
    icon: '🎨', 
    difficulty: 'Beginner', 
    category: 'Web Development', 
    topics: ['Flexbox & Grid', 'Responsive Media Queries', 'CSS Custom Properties', 'Animations', 'Modern Layouts'],
    description: 'Declarative styling system for engineering responsive, beautiful, high-performance interfaces across all device form factors.'
  },
  { 
    id: 'sql', 
    name: 'SQL', 
    icon: '🗄️', 
    difficulty: 'Beginner', 
    category: 'Data and AI', 
    topics: ['Relational Joins', 'Subqueries & CTEs', 'Database Normalization', 'Indexes & B-Trees', 'Transactions'],
    description: 'Standard domain-specific language for querying, manipulating, and structuring relational database management systems.'
  },
  { 
    id: 'go', 
    name: 'Go (Golang)', 
    icon: '🐹', 
    difficulty: 'Intermediate', 
    category: 'Systems Programming', 
    topics: ['Goroutines & Channels', 'Structs & Interfaces', 'Pointers', 'Microservices', 'HTTP Handlers'],
    description: 'Concurrent, garbage-collected language designed by Google for cloud infrastructure, microservices, and high-throughput networking.'
  },
  { 
    id: 'rust', 
    name: 'Rust', 
    icon: '🦀', 
    difficulty: 'Advanced', 
    category: 'Systems Programming', 
    topics: ['Ownership & Borrowing', 'Lifetimes', 'Pattern Matching', 'Zero-Cost Abstractions', 'Cargo'],
    description: 'Systems language empowering developers to build reliable and efficient software with guaranteed memory safety without a GC.'
  }
];

const Learn = () => {
  const navigate = useNavigate();
  const { 
    completedLessons, 
    completeLesson, 
    isLessonCompleted,
    enrolledCourses,
    enrollCourse
  } = useUser();

  // Navigation mode: 'explorer' (Discovery cards) vs 'environment' (3-Panel Environment)
  const [viewMode, setViewMode] = useState('explorer');
  const [selectedLang, setSelectedLang] = useState('python');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  
  // 3-Panel Environment state
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [showExerciseAnswer, setShowExerciseAnswer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Retrieve track curriculum
  const currentCurriculum = CURRICULUM_DATA[selectedLang] || CURRICULUM_DATA.python;

  // Aggregate lessons for the active curriculum
  const allCurrentLessons = [
    ...(currentCurriculum.levels?.beginner || []),
    ...(currentCurriculum.levels?.intermediate || []),
    ...(currentCurriculum.levels?.advanced || []),
    ...(currentCurriculum.levels?.projects || [])
  ];

  // Set default active lesson when entering environment
  const activeLesson = allCurrentLessons.find(l => l.id === activeLessonId) || allCurrentLessons[0];

  const completedInTrack = allCurrentLessons.filter(l => isLessonCompleted(l.id)).length;
  const trackProgress = allCurrentLessons.length > 0 
    ? Math.round((completedInTrack / allCurrentLessons.length) * 100) 
    : 0;

  // Filter languages for Explorer view
  const filteredLanguages = LANGUAGES_LIST.filter(lang => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      categoryFilter === 'All' || 
      lang.category === categoryFilter;

    const matchesDifficulty = 
      difficultyFilter === 'All' || 
      lang.difficulty === difficultyFilter;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleOpenLanguage = (langId) => {
    setSelectedLang(langId);
    if (!enrolledCourses.includes(langId)) {
      enrollCourse(langId);
    }
    const track = CURRICULUM_DATA[langId];
    const firstLesson = track?.levels?.beginner?.[0]?.id || null;
    setActiveLessonId(firstLesson);
    setViewMode('environment');
    setShowExerciseAnswer(false);
  };

  const handleRunInCodeLab = (code) => {
    localStorage.setItem('focusflow_code_review', code);
    navigate('/code-lab');
  };

  const handleCopyCode = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleMarkComplete = (lesson) => {
    completeLesson(lesson.id, 30, {
      courseId: selectedLang,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      level: lesson.level,
      duration: lesson.duration
    });
  };

  // Lesson Prev / Next index
  const currentLessonIndex = allCurrentLessons.findIndex(l => l.id === activeLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allCurrentLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allCurrentLessons.length - 1 ? allCurrentLessons[currentLessonIndex + 1] : null;

  return (
    <div className="learn-container fade-in">
      {/* =================================================================== */}
      {/* VIEW 1: PROGRAMMING LANGUAGES EXPLORER */}
      {/* =================================================================== */}
      {viewMode === 'explorer' && (
        <div className="languages-explorer">
          {/* Header */}
          <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge">Curricula</span>
                <span className="badge cyan">11 Core Technologies</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">Programming Languages Explorer</h1>
              <p className="text-muted text-xs md:text-sm">
                Discover structured learning paths designed for aspiring developers and engineering students.
              </p>
            </div>

            {/* Search Bar */}
            <div className="search-bar-wrap flex items-center gap-2 p-2 bg-card border border-border rounded-md" style={{ minWidth: '280px' }}>
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search languages or topics (e.g. Goroutines, STL, OOP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-white w-full"
              />
            </div>
          </header>

          {/* Filter Pills */}
          <div className="flex justify-between items-center flex-wrap gap-3 mb-6 pb-3 border-b border-border">
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-2xs font-semibold text-muted uppercase tracking-wider flex items-center gap-1">
                <Filter size={12} /> Category:
              </span>
              {['All', 'Web Development', 'Systems Programming', 'Data and AI', 'Software Development'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill text-xs ${categoryFilter === cat ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              <span className="text-2xs font-semibold text-muted uppercase tracking-wider">Level:</span>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  className={`filter-pill text-xs ${difficultyFilter === lvl ? 'active' : ''}`}
                  onClick={() => setDifficultyFilter(lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Languages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLanguages.map(lang => {
              const track = CURRICULUM_DATA[lang.id];
              const lessons = [
                ...(track?.levels?.beginner || []),
                ...(track?.levels?.intermediate || []),
                ...(track?.levels?.advanced || [])
              ];
              const doneCount = lessons.filter(l => isLessonCompleted(l.id)).length;
              const pct = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0;

              return (
                <div key={lang.id} className="language-card surface-card flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2.5 rounded bg-black-20 border border-white-5">
                          {lang.icon}
                        </span>
                        <div>
                          <h3 className="text-base font-bold text-white">{lang.name}</h3>
                          <span className="text-2xs text-cyan font-mono">{lang.category}</span>
                        </div>
                      </div>
                      <span className={`badge ${lang.difficulty === 'Beginner' ? 'accent' : lang.difficulty === 'Intermediate' ? 'cyan' : 'warning'}`}>
                        {lang.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-muted mb-4 leading-relaxed">
                      {lang.description}
                    </p>

                    <div className="mb-4">
                      <span className="text-2xs text-muted block mb-1.5 uppercase font-semibold">Core Curriculum Topics:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lang.topics.map(topic => (
                          <span key={topic} className="text-2xs py-0.5 px-2 rounded bg-black-20 border border-white-5 text-muted">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    {pct > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-2xs text-muted mb-1">
                          <span>Progress ({doneCount}/{lessons.length} lessons)</span>
                          <span className="text-cyan font-mono font-bold">{pct}%</span>
                        </div>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}

                    <button
                      type="button"
                      className="btn-primary w-full text-xs py-2 flex items-center justify-center gap-2"
                      onClick={() => handleOpenLanguage(lang.id)}
                    >
                      <span>Explore Environment</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* VIEW 2: DEDICATED LANGUAGE LEARNING ENVIRONMENT (3-PANEL LAYOUT) */}
      {/* =================================================================== */}
      {viewMode === 'environment' && (
        <div className="learning-environment">
          {/* Top Control Bar */}
          <div className="environment-topbar flex justify-between items-center mb-4 pb-3 border-b border-border flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="outline-btn text-xs py-1 px-3 flex items-center gap-1.5"
                onClick={() => setViewMode('explorer')}
              >
                <ArrowLeft size={14} /> Back to Languages
              </button>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentCurriculum.icon}</span>
                <h2 className="text-lg font-bold text-white">{currentCurriculum.name} Environment</h2>
                <span className="badge cyan text-2xs">Active Track</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted">Track Progress:</span>
                <span className="font-mono font-bold text-cyan">{trackProgress}%</span>
              </div>
              <button
                type="button"
                className="outline-btn text-xs py-1 px-3 flex items-center gap-1"
                onClick={() => navigate('/code-lab')}
              >
                <Terminal size={14} /> Code Playground
              </button>
            </div>
          </div>

          {/* 3-Panel Repositioned Grid Layout */}
          <div className="environment-grid">
            {/* LEFT PANEL: Context, Shortcuts & Flow AI (Repositioned to Left) */}
            <aside className="context-sidebar flex flex-col gap-4">
              {/* Progress Summary Card */}
              <div className="surface-card p-4">
                <span className="text-xs font-bold text-white block mb-2">Curriculum Metrics</span>
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-muted">Completed:</span>
                  <span className="font-bold text-white">{completedInTrack}/{allCurrentLessons.length}</span>
                </div>
                <div className="progress-bar-bg mb-3">
                  <div className="progress-bar-fill" style={{ width: `${trackProgress}%` }} />
                </div>
                <span className="text-2xs text-cyan font-mono block text-right">{trackProgress}% Complete</span>
              </div>

              {/* Key Concept Chips */}
              {activeLesson?.keyConcepts && (
                <div className="surface-card p-4">
                  <span className="text-xs font-bold text-white block mb-2">Key Concepts</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeLesson.keyConcepts.map(c => (
                      <span key={c} className="text-2xs p-1 px-2 rounded bg-primary-subtle text-primary border border-primary-20">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Developer Shortcuts */}
              <div className="surface-card p-4">
                <span className="text-xs font-bold text-white block mb-2">Tools & AI Assistance</span>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="btn-secondary text-xs w-full py-1.5 flex items-center justify-start gap-2"
                    onClick={() => {
                      localStorage.setItem('focusflow_ai_query', `Explain ${activeLesson?.title || 'this concept'} with real-world examples.`);
                      navigate('/flow-ai');
                    }}
                  >
                    <Bot size={14} className="text-cyan" /> Ask AI Coding Assistant
                  </button>
                  <button
                    type="button"
                    className="btn-secondary text-xs w-full py-1.5 flex items-center justify-start gap-2"
                    onClick={() => navigate('/code-lab')}
                  >
                    <Terminal size={14} className="text-primary" /> Open Code Studio
                  </button>
                  <button
                    type="button"
                    className="btn-secondary text-xs w-full py-1.5 flex items-center justify-start gap-2"
                    onClick={() => navigate('/practice')}
                  >
                    <Brain size={14} className="text-accent" /> Practice DSA
                  </button>
                </div>
              </div>
            </aside>

            {/* MAIN PANEL: Interactive Lesson Content (Center) */}
            <main className="lesson-main-panel surface-card p-6">
              {activeLesson ? (
                <div>
                  {/* Lesson Meta Header */}
                  <div className="flex justify-between items-start mb-4 pb-3 border-b border-border flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="badge">{activeLesson.level}</span>
                        <span className="badge cyan font-mono">{activeLesson.duration}</span>
                      </div>
                      <h1 className="text-xl font-bold text-white">{activeLesson.title}</h1>
                    </div>

                    <button
                      type="button"
                      className={`text-xs py-1.5 px-3 flex items-center gap-1.5 ${isLessonCompleted(activeLesson.id) ? 'outline-btn text-accent' : 'primary'}`}
                      onClick={() => handleMarkComplete(activeLesson)}
                    >
                      <Check size={14} />
                      {isLessonCompleted(activeLesson.id) ? 'Completed (+30 XP)' : 'Mark Lesson Complete'}
                    </button>
                  </div>

                  {/* Learning Objectives */}
                  <div className="p-3.5 rounded bg-black-20 border border-white-5 mb-5">
                    <span className="text-xs font-bold text-cyan block mb-2">Learning Objectives:</span>
                    <ul className="text-xs text-muted space-y-1 list-disc list-inside">
                      {activeLesson.keyConcepts && activeLesson.keyConcepts.map((concept, i) => (
                        <li key={i}>{concept}</li>
                      ))}
                    </ul>
                  </div>

                  {/* In-depth Conceptual Explanation */}
                  <div className="lesson-body text-xs md:text-sm text-secondary leading-relaxed mb-6">
                    <p>{activeLesson.description}</p>
                  </div>

                  {/* Code Example / Demonstration */}
                  {activeLesson.codeExample && (
                    <div className="code-example-section mb-6">
                      <div className="flex justify-between items-center bg-black-40 px-3 py-2 rounded-t border-t border-x border-border">
                        <span className="text-2xs font-mono text-cyan">Code Demonstration</span>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-btn text-2xs p-1 flex items-center gap-1"
                            onClick={() => handleCopyCode(activeLesson.codeExample)}
                          >
                            {copiedCode ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                            {copiedCode ? 'Copied' : 'Copy'}
                          </button>
                          <button
                            type="button"
                            className="btn-primary text-2xs py-1 px-2.5 flex items-center gap-1"
                            onClick={() => handleRunInCodeLab(activeLesson.codeExample)}
                          >
                            <Play size={12} /> Run in Code Studio
                          </button>
                        </div>
                      </div>
                      <pre className="code-block rounded-t-none text-xs">
                        <code>{activeLesson.codeExample}</code>
                      </pre>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {activeLesson.commonMistakes && (
                    <div className="p-3.5 rounded bg-amber-500-10 border border-amber-500-20 mb-6 flex items-start gap-2.5">
                      <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-warning block mb-1">Common Pitfalls to Avoid:</span>
                        <p className="text-xs text-muted">{activeLesson.commonMistakes}</p>
                      </div>
                    </div>
                  )}

                  {/* Practice Exercise */}
                  {activeLesson.quickExercise && (
                    <div className="p-4 rounded bg-black-20 border border-border mb-6">
                      <span className="text-xs font-bold text-white block mb-2">Practice Check:</span>
                      <p className="text-xs text-muted mb-3">{activeLesson.quickExercise}</p>
                      <button
                        type="button"
                        className="btn-outline text-xs py-1 px-3"
                        onClick={() => setShowExerciseAnswer(!showExerciseAnswer)}
                      >
                        {showExerciseAnswer ? 'Hide Solution' : 'Reveal Answer & Explanation'}
                      </button>
                    </div>
                  )}

                  {/* Prev / Next Lesson Navigation Controls */}
                  <div className="flex justify-between items-center pt-4 border-t border-border mt-8">
                    {prevLesson ? (
                      <button
                        type="button"
                        className="btn-outline text-xs py-1.5 px-3 flex items-center gap-1.5"
                        onClick={() => { setActiveLessonId(prevLesson.id); setShowExerciseAnswer(false); }}
                      >
                        <ArrowLeft size={13} /> {prevLesson.title}
                      </button>
                    ) : <div />}

                    {nextLesson && (
                      <button
                        type="button"
                        className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5"
                        onClick={() => { setActiveLessonId(nextLesson.id); setShowExerciseAnswer(false); }}
                      >
                        {nextLesson.title} <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted">
                  <BookOpen size={36} className="mx-auto mb-2 opacity-40 text-primary" />
                  <p className="text-sm">Select a lesson from the syllabus sidebar to begin.</p>
                </div>
              )}
            </main>

            {/* RIGHT PANEL: Syllabus & Modules (Repositioned to Right) */}
            <aside className="curriculum-sidebar surface-card p-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <BookMarked size={14} className="text-primary" /> Syllabus & Modules
              </h3>

              <div className="modules-accordion flex flex-col gap-3">
                {/* Beginner Module */}
                {currentCurriculum.levels?.beginner && currentCurriculum.levels.beginner.length > 0 && (
                  <div className="module-group">
                    <div className="module-header text-2xs font-bold uppercase tracking-wider text-muted px-2 py-1 mb-1">
                      Module 1: Fundamentals ({currentCurriculum.levels.beginner.length})
                    </div>
                    <div className="lessons-list flex flex-col gap-1">
                      {currentCurriculum.levels.beginner.map(les => {
                        const isDone = isLessonCompleted(les.id);
                        const isSelected = activeLesson?.id === les.id;
                        return (
                          <button
                            key={les.id}
                            type="button"
                            className={`lesson-nav-btn ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                            onClick={() => { setActiveLessonId(les.id); setShowExerciseAnswer(false); }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2 size={13} className="text-accent shrink-0" />
                              ) : (
                                <div className="lesson-bullet shrink-0" />
                              )}
                              <span className="truncate text-xs">{les.title}</span>
                            </div>
                            <span className="text-2xs text-dim shrink-0">{les.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Intermediate Module */}
                {currentCurriculum.levels?.intermediate && currentCurriculum.levels.intermediate.length > 0 && (
                  <div className="module-group">
                    <div className="module-header text-2xs font-bold uppercase tracking-wider text-muted px-2 py-1 mb-1">
                      Module 2: Intermediate ({currentCurriculum.levels.intermediate.length})
                    </div>
                    <div className="lessons-list flex flex-col gap-1">
                      {currentCurriculum.levels.intermediate.map(les => {
                        const isDone = isLessonCompleted(les.id);
                        const isSelected = activeLesson?.id === les.id;
                        return (
                          <button
                            key={les.id}
                            type="button"
                            className={`lesson-nav-btn ${isSelected ? 'active' : ''} ${isDone ? 'completed' : ''}`}
                            onClick={() => { setActiveLessonId(les.id); setShowExerciseAnswer(false); }}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {isDone ? (
                                <CheckCircle2 size={13} className="text-accent shrink-0" />
                              ) : (
                                <div className="lesson-bullet shrink-0" />
                              )}
                              <span className="truncate text-xs">{les.title}</span>
                            </div>
                            <span className="text-2xs text-dim shrink-0">{les.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;
