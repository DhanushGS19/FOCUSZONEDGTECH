import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { 
  Terminal, Brain, ArrowRight, BookOpen, ChevronRight, Sparkles, 
  Compass, BarChart2, CheckCircle2, Activity, ArrowUpRight, Play, Award
} from 'lucide-react';
import './Home.css';

const ACTIVE_LEARNING_TRACKS = [
  {
    id: 'python',
    name: 'Python Systems & Scripting',
    category: 'Programming Languages',
    icon: '🐍',
    currentModule: 'Object-Oriented Programming & File I/O',
    progress: 68,
    level: 'Core Track',
    lessonsRemaining: 4,
    link: '/learn'
  },
  {
    id: 'javascript',
    name: 'Modern Full-Stack Web Development',
    category: 'Web Development',
    icon: '⚡',
    currentModule: 'React State Management & Async REST APIs',
    progress: 74,
    level: 'Full-Stack',
    lessonsRemaining: 3,
    link: '/learn?filter=web'
  },
  {
    id: 'cpp',
    name: 'C & C++ Systems Architecture',
    category: 'Systems',
    icon: '🚀',
    currentModule: 'Pointer Arithmetic & Memory Management',
    progress: 52,
    level: 'Advanced',
    lessonsRemaining: 6,
    link: '/learn'
  },
  {
    id: 'java',
    name: 'Enterprise Java Engineering',
    category: 'Backend',
    icon: '☕',
    currentModule: 'Collections Framework & Multi-threading',
    progress: 42,
    level: 'Intermediate',
    lessonsRemaining: 8,
    link: '/learn'
  }
];

const RECOMMENDED_SPECIALIZATIONS = [
  {
    id: 'rust-dsa',
    title: 'Data Structures & Algorithms in C++',
    tag: 'DSA Arena',
    description: 'Master binary search trees, graph traversals, and dynamic programming with verified O(n) assertions.',
    difficulty: 'Intermediate',
    duration: '12 hrs',
    link: '/practice?cat=dsa'
  },
  {
    id: 'git-workflows',
    title: 'Git & GitHub Production Workflows',
    tag: 'DevOps',
    description: 'Interactive branching simulations, rebasing, merge conflict resolution, and pull request audits.',
    difficulty: 'Essential',
    duration: '4 hrs',
    link: '/dev-tools?tab=git'
  },
  {
    id: 'sql-deep-dive',
    title: 'Relational Database Design & SQL',
    tag: 'Databases',
    description: 'Complex inner/outer joins, indexing strategies, query execution plans, and normalization forms.',
    difficulty: 'Intermediate',
    duration: '6 hrs',
    link: '/learn'
  }
];

const Home = () => {
  const { 
    user, 
    enrolledCourses, 
    completedLessons, 
    solvedProblems,
    weeklyActivity 
  } = useUser();

  const navigate = useNavigate();

  // Clean Workspace View Switcher (Manages clutter: displays only what the user wants to see!)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('tracks'); // 'tracks' | 'scratchpad' | 'specializations'

  // Mini live scratchpad state
  const [scratchLang, setScratchLang] = useState('python');
  const [scratchOutput, setScratchOutput] = useState('');
  const [scratchRunning, setScratchRunning] = useState(false);

  const activePathsCount = enrolledCourses?.length || 4;
  const lessonsCompletedCount = completedLessons?.length || 18;
  const codingChallengesCount = solvedProblems?.length || 8;
  const totalFocusHours = user?.totalFocusMinutes ? (user.totalFocusMinutes / 60).toFixed(1) : '14.5';
  const currentStreak = user?.streak || 7;
  const maxWeeklyMinutes = Math.max(...(weeklyActivity?.map(w => w.minutes) || [60]), 60);

  // Quick execution of the home scratchpad demo
  const handleQuickRun = () => {
    setScratchRunning(true);
    setScratchOutput('');
    setTimeout(() => {
      setScratchRunning(false);
      if (scratchLang === 'python') {
        setScratchOutput('✓ Python 3.10 Execution: [1, 4, 9, 16, 25]\n✓ All algorithms validated with 0 errors (18ms)');
      } else if (scratchLang === 'javascript') {
        setScratchOutput('✓ Node 18 Runtime: Two Sum indices [0, 1] verified\n✓ Complexity: O(n) Time, O(n) Space');
      } else {
        setScratchOutput('✓ G++ 10.2: Binary Search completed in 0.04ms\n✓ Exit code: 0 (Success)');
      }
    }, 450);
  };

  const recentTimeline = [
    {
      id: 'act-1',
      title: 'Solved "Two Sum" with Hash Map optimization in JavaScript',
      type: 'DSA Challenge',
      time: '2 hours ago',
      icon: CheckCircle2,
      iconColor: 'text-emerald'
    },
    {
      id: 'act-2',
      title: 'Completed Lesson: "Object-Oriented Python Inheritance"',
      type: 'Coursework',
      time: 'Yesterday',
      icon: BookOpen,
      iconColor: 'text-primary-accent'
    },
    {
      id: 'act-3',
      title: 'Compiled & executed C++ pointer algorithms in Code Studio',
      type: 'Lab Session',
      time: '2 days ago',
      icon: Terminal,
      iconColor: 'text-info'
    }
  ];

  return (
    <div className="home-dashboard techverse-grid-bg fade-in">
      {/* 1. STREAMLINED EXECUTIVE COMMAND STRIP */}
      <section className="executive-command-strip surface-card p-4 flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="telemetry-avatar w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-primary text-sm shadow">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-base font-bold text-white">Welcome back, {user?.name || 'Alex Rivera'}</h2>
              <span className="badge emerald text-2xs font-mono">⚡ {currentStreak}-Day Streak</span>
            </div>
            <p className="text-2xs text-muted">Ready for your next engineering milestone</p>
          </div>
        </div>

        {/* 4 Clean High-Frequency Shortcuts */}
        <div className="flex items-center gap-2 flex-wrap">
          <button 
            type="button" 
            className="filter-pill text-xs flex items-center gap-1.5"
            onClick={() => navigate('/code-lab')}
          >
            <Terminal size={13} className="text-primary-accent" />
            <span>Code Studio</span>
          </button>
          <button 
            type="button" 
            className="filter-pill text-xs flex items-center gap-1.5"
            onClick={() => navigate('/learn')}
          >
            <Compass size={13} className="text-emerald" />
            <span>Curricula</span>
          </button>
          <button 
            type="button" 
            className="filter-pill text-xs flex items-center gap-1.5"
            onClick={() => navigate('/practice')}
          >
            <Brain size={13} className="text-warning" />
            <span>DSA Arena</span>
          </button>
          <button 
            type="button" 
            className="filter-pill text-xs flex items-center gap-1.5"
            onClick={() => navigate('/certificates')}
          >
            <Award size={13} className="text-emerald" />
            <span>Certificates</span>
          </button>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN UNCLUTTERED WORKSPACE LAYOUT */}
      <div className="home-main-split">
        {/* LEFT COLUMN: Clean Primary Workspace with Tab Controls */}
        <div className="home-primary-column">
          {/* Workspace Tab Switcher Header */}
          <div className="workspace-tab-dock flex justify-between items-center pb-2 border-b border-border flex-wrap gap-2">
            <div className="flex gap-2">
              <button
                type="button"
                className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeWorkspaceTab === 'tracks' ? 'active' : ''}`}
                onClick={() => setActiveWorkspaceTab('tracks')}
              >
                <BookOpen size={13} />
                <span>Active Tracks ({ACTIVE_LEARNING_TRACKS.length})</span>
              </button>
              <button
                type="button"
                className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeWorkspaceTab === 'scratchpad' ? 'active' : ''}`}
                onClick={() => setActiveWorkspaceTab('scratchpad')}
              >
                <Terminal size={13} />
                <span>Live Scratchpad</span>
              </button>
              <button
                type="button"
                className={`filter-pill text-xs font-bold flex items-center gap-1.5 ${activeWorkspaceTab === 'specializations' ? 'active' : ''}`}
                onClick={() => setActiveWorkspaceTab('specializations')}
              >
                <Sparkles size={13} />
                <span>Specializations ({RECOMMENDED_SPECIALIZATIONS.length})</span>
              </button>
            </div>

            <button
              type="button"
              className="text-btn text-2xs text-muted hover:text-white"
              onClick={() => navigate('/learn')}
            >
              All 11 Languages →
            </button>
          </div>

          {/* TAB 1: ACTIVE LEARNING TRACKS */}
          {activeWorkspaceTab === 'tracks' && (
            <div className="active-tracks-grid fade-in">
              {ACTIVE_LEARNING_TRACKS.map((track) => (
                <div key={track.id} className="track-card">
                  <div className="track-card-header">
                    <div className="track-icon-badge">{track.icon}</div>
                    <div className="track-header-text">
                      <span className="track-category">{track.category}</span>
                      <h3 className="track-name">{track.name}</h3>
                    </div>
                    <span className="track-percent font-mono">{track.progress}%</span>
                  </div>

                  <div className="track-current-module">
                    <span className="module-label">CURRENT MODULE</span>
                    <p className="module-title" title={track.currentModule}>{track.currentModule}</p>
                  </div>

                  <div className="track-progress-wrap">
                    <div className="track-progress-bar">
                      <div className="track-progress-fill" style={{ width: `${track.progress}%` }} />
                    </div>
                    <div className="track-card-footer">
                      <span className="track-meta text-2xs text-muted">
                        {track.lessonsRemaining} lessons to milestone
                      </span>
                      <button 
                        type="button" 
                        className="btn-primary btn-sm flex items-center gap-1"
                        onClick={() => navigate(track.link)}
                      >
                        <span>Continue</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: LIVE CODE STUDIO SCRATCHPAD */}
          {activeWorkspaceTab === 'scratchpad' && (
            <section className="dashboard-scratchpad-panel fade-in">
              <div className="scratchpad-header">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-primary-subtle text-primary-accent">
                    <Terminal size={17} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      Code Studio Sandbox
                      <span className="badge-emerald font-mono text-[10px]">Piston Isolated</span>
                    </h3>
                    <p className="text-2xs text-muted">Execute code snippets directly inside the dashboard</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select 
                    className="scratchpad-select font-mono text-xs"
                    value={scratchLang}
                    onChange={(e) => { setScratchLang(e.target.value); setScratchOutput(''); }}
                  >
                    <option value="python">🐍 Python 3.10</option>
                    <option value="javascript">⚡ JavaScript (Node)</option>
                    <option value="cpp">🚀 C++ (G++)</option>
                  </select>
                  <button
                    type="button"
                    className="btn-primary btn-sm flex items-center gap-1.5"
                    onClick={handleQuickRun}
                    disabled={scratchRunning}
                  >
                    <Play size={13} fill="currentColor" />
                    <span>{scratchRunning ? 'Running...' : 'Execute'}</span>
                  </button>
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => navigate('/code-lab')}
                    title="Open full IDE"
                  >
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>

              <div className="scratchpad-editor-row">
                <div className="scratchpad-code-preview">
                  {scratchLang === 'python' && (
                    <pre className="font-mono text-xs text-slate-300">
                      <code>{`# Python 3.10 Quick Run
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print("Squares:", squares)`}</code>
                    </pre>
                  )}
                  {scratchLang === 'javascript' && (
                    <pre className="font-mono text-xs text-slate-300">
                      <code>{`// Node 18 Quick Run
const nums = [2, 7, 11, 15], target = 9;
const map = new Map();
for (let i = 0; i < nums.length; i++) {
  if (map.has(target - nums[i])) console.log("Target found!");
  map.set(nums[i], i);
}`}</code>
                    </pre>
                  )}
                  {scratchLang === 'cpp' && (
                    <pre className="font-mono text-xs text-slate-300">
                      <code>{`// C++ G++ 10.2 Quick Run
#include <iostream>
int main() {
    std::cout << "Engine ready!\\n";
    return 0;
}`}</code>
                    </pre>
                  )}
                </div>

                <div className="scratchpad-output-preview">
                  <span className="output-preview-lbl font-mono">OUTPUT TERMINAL:</span>
                  <pre className="font-mono text-2xs text-emerald mt-1">
                    {scratchRunning ? 'Compiling in container sandbox...' : (scratchOutput || 'Ready for execution. Click "Execute" above.')}
                  </pre>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: CURATED SPECIALIZATIONS */}
          {activeWorkspaceTab === 'specializations' && (
            <div className="recommended-grid fade-in">
              {RECOMMENDED_SPECIALIZATIONS.map((rec) => (
                <div key={rec.id} className="recommended-card">
                  <div className="rec-badge-row">
                    <span className="rec-tag font-mono">{rec.tag}</span>
                    <span className="rec-meta font-mono">{rec.difficulty} • {rec.duration}</span>
                  </div>
                  <h4 className="rec-title">{rec.title}</h4>
                  <p className="rec-desc">{rec.description}</p>
                  <div className="rec-footer">
                    <button 
                      type="button" 
                      className="btn-secondary btn-sm flex items-center gap-1.5"
                      onClick={() => navigate(rec.link)}
                    >
                      <span>Explore Track</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Streamlined Telemetry & Credentials Rail */}
        <div className="home-telemetry-column">
          {/* Developer Profile Card */}
          <div className="telemetry-profile-card">
            <div className="flex items-center gap-3">
              <div className="telemetry-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="telemetry-user-info">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">{user?.name || 'Alex Rivera'}</h4>
                  <span className="badge-pro text-[10px]">PRO</span>
                </div>
                <span className="text-2xs text-muted font-mono">{user?.course || 'Computer Science Engineering'}</span>
              </div>
            </div>

            <div className="telemetry-stats-pill-grid mt-3">
              <div className="stat-pill">
                <span className="pill-lbl">XP RANK</span>
                <span className="pill-val font-mono text-primary-accent">{user?.xp || 2450} XP</span>
              </div>
              <div className="stat-pill">
                <span className="pill-lbl">STREAK</span>
                <span className="pill-val font-mono text-warning">⚡ {currentStreak} Days</span>
              </div>
              <div className="stat-pill">
                <span className="pill-lbl">HOURS</span>
                <span className="pill-val font-mono text-emerald">{totalFocusHours}h</span>
              </div>
            </div>
          </div>

          {/* Verified Certificates Quick Card */}
          <div 
            className="surface-card p-3.5 border-emerald-500-20 flex justify-between items-center cursor-pointer hover:border-emerald transition-all" 
            onClick={() => navigate('/certificates')}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-emerald-subtle text-emerald">
                <Award size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">3 Verified Certificates Earned</span>
                <span className="text-3xs font-mono text-muted">Accredited by TechVerse Academy</span>
              </div>
            </div>
            <ChevronRight size={15} className="text-muted" />
          </div>

          {/* 2x2 Compact KPI Executive Grid (Replaced tall messy stacked rows) */}
          <div className="kpi-2x2-grid grid grid-cols-2 gap-2.5">
            <div className="kpi-mini-card surface-card p-3">
              <span className="text-3xs font-mono uppercase tracking-wider text-muted block mb-1">Enrolled</span>
              <div className="flex justify-between items-end">
                <span className="font-mono text-base font-bold text-white">{activePathsCount}</span>
                <span className="text-3xs font-mono text-primary-accent">Tracks</span>
              </div>
            </div>
            <div className="kpi-mini-card surface-card p-3">
              <span className="text-3xs font-mono uppercase tracking-wider text-muted block mb-1">Completed</span>
              <div className="flex justify-between items-end">
                <span className="font-mono text-base font-bold text-white">{lessonsCompletedCount}</span>
                <span className="text-3xs font-mono text-emerald">Modules</span>
              </div>
            </div>
            <div className="kpi-mini-card surface-card p-3">
              <span className="text-3xs font-mono uppercase tracking-wider text-muted block mb-1">DSA Solved</span>
              <div className="flex justify-between items-end">
                <span className="font-mono text-base font-bold text-white">{codingChallengesCount}</span>
                <span className="text-3xs font-mono text-warning">Problems</span>
              </div>
            </div>
            <div className="kpi-mini-card surface-card p-3">
              <span className="text-3xs font-mono uppercase tracking-wider text-muted block mb-1">Deep Work</span>
              <div className="flex justify-between items-end">
                <span className="font-mono text-base font-bold text-white">{totalFocusHours}h</span>
                <span className="text-3xs font-mono text-info">Logged</span>
              </div>
            </div>
          </div>

          {/* Weekly Learning Activity Chart */}
          <div className="content-panel">
            <div className="panel-header">
              <div>
                <h3 className="panel-title flex items-center gap-2">
                  <BarChart2 size={16} className="text-primary-accent" />
                  Weekly Learning Activity
                </h3>
                <p className="panel-subtitle">Minutes of deep practice logged</p>
              </div>
              <span className="badge-technical font-mono text-emerald">7-DAY</span>
            </div>

            <div className="weekly-bar-chart">
              {weeklyActivity && weeklyActivity.map((day) => {
                const heightPct = Math.min(100, Math.round((day.minutes / maxWeeklyMinutes) * 100));
                return (
                  <div key={day.day} className="chart-column">
                    <span className="chart-val font-mono">{day.minutes}m</span>
                    <div className="chart-slot">
                      <div 
                        className="chart-fill" 
                        style={{ height: `${heightPct}%` }}
                        title={`${day.date}: ${day.minutes} minutes (${day.sessions} sessions)`}
                      />
                    </div>
                    <span className="chart-day font-mono">{day.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity Timeline Feed */}
          <div className="content-panel">
            <div className="panel-header">
              <div>
                <h3 className="panel-title flex items-center gap-2">
                  <Activity size={16} className="text-emerald" />
                  Recent Activity
                </h3>
              </div>
              <button 
                type="button" 
                className="btn-ghost text-2xs text-muted"
                onClick={() => navigate('/progress')}
              >
                All →
              </button>
            </div>

            <div className="activity-timeline">
              {recentTimeline.map((item) => (
                <div key={item.id} className="timeline-entry">
                  <div className={`timeline-icon-node ${item.iconColor}`}>
                    <item.icon size={14} />
                  </div>
                  <div className="timeline-body">
                    <span className="timeline-title text-xs">{item.title}</span>
                    <div className="timeline-meta-row">
                      <span className="timeline-tag font-mono text-3xs">{item.type}</span>
                      <span className="timeline-time text-3xs">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
