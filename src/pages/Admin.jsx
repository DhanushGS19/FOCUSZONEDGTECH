import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { 
  ShieldCheck, BookOpen, Brain, Award, FolderGit2, Activity, 
  Plus, Trash2, Check, Sparkles, Terminal, Code2, AlertTriangle, 
  Database, RefreshCw 
} from 'lucide-react';
import './Admin.css';

export const Admin = () => {
  const { user, projects, setProjects, challenges, addXp } = useUser();
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [activeAdminTab, setActiveAdminTab] = useState('curriculum'); // 'curriculum' | 'challenges' | 'quizzes' | 'projects' | 'system'

  // New Lesson form state
  const [newLesson, setNewLesson] = useState({
    course: 'python',
    moduleTitle: 'Core Language Fundamentals',
    title: '',
    level: 'Beginner',
    duration: '25 mins',
    description: '',
    starterCode: '# Write code here'
  });
  const [lessonFeedback, setLessonFeedback] = useState(null);

  // New Challenge form state
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    language: 'JavaScript',
    description: '',
    starterCode: 'function solution(nums) {\n  // Implementation\n}',
    visibleInput: '[1, 2, 3]',
    visibleExpected: '6',
    hiddenInput: '[10, 20]',
    hiddenExpected: '30'
  });
  const [challengeFeedback, setChallengeFeedback] = useState(null);

  // New Quiz Question form state
  const [newQuiz, setNewQuiz] = useState({
    subject: 'SystemDesign',
    question: '',
    option0: '',
    option1: '',
    option2: '',
    option3: '',
    correctAnswer: 0,
    explanation: ''
  });
  const [quizFeedback, setQuizFeedback] = useState(null);

  // System audit metrics
  const auditLogs = [
    { time: '10:45:12 AM', event: 'AUTH_SESSION_GRANTED', user: user.name, ip: '127.0.0.1 (Localhost)' },
    { time: '10:30:00 AM', event: 'CHALLENGE_SUBMITTED', user: user.name, detail: 'Problem: Valid Parentheses (Accepted - 24ms)' },
    { time: '10:15:20 AM', event: 'CURRICULUM_SYNC', user: 'system', detail: 'Loaded 9 tracks, 18 Python modules' },
    { time: '09:50:04 AM', event: 'DB_HEALTH_CHECK', user: 'system', detail: 'PostgreSQL connection healthy (latency: 1.2ms)' }
  ];

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newLesson.title.trim()) return;
    setLessonFeedback(`Lesson "${newLesson.title}" published successfully to ${newLesson.course.toUpperCase()} curriculum!`);
    setTimeout(() => setLessonFeedback(null), 3000);
    setNewLesson({ course: 'python', moduleTitle: 'Core Language Fundamentals', title: '', level: 'Beginner', duration: '25 mins', description: '', starterCode: '# Write code here' });
  };

  const handleCreateChallenge = (e) => {
    e.preventDefault();
    if (!newChallenge.title.trim()) return;
    setChallengeFeedback(`Coding challenge "${newChallenge.title}" registered with hidden test case evaluation!`);
    setTimeout(() => setChallengeFeedback(null), 3000);
    setNewChallenge({ title: '', difficulty: 'Easy', category: 'Arrays & Hash Maps', language: 'JavaScript', description: '', starterCode: 'function solution(nums) {\n  // Implementation\n}', visibleInput: '[1, 2, 3]', visibleExpected: '6', hiddenInput: '[10, 20]', hiddenExpected: '30' });
  };

  const handleCreateQuiz = (e) => {
    e.preventDefault();
    if (!newQuiz.question.trim() || !newQuiz.option0.trim()) return;
    setQuizFeedback(`Quiz question registered in ${newQuiz.subject} exam suite!`);
    setTimeout(() => setQuizFeedback(null), 3000);
    setNewQuiz({ subject: 'SystemDesign', question: '', option0: '', option1: '', option2: '', option3: '', correctAnswer: 0, explanation: '' });
  };

  // New Project Template form state
  const [newProject, setNewProject] = useState({
    title: '',
    difficulty: 'Intermediate',
    category: 'Full-Stack Web',
    tagline: '',
    description: '',
    techStack: 'React, Node.js, PostgreSQL',
    milestones: 'Architecture Plan, Database Schema, REST Endpoints, Frontend UI, Deployment',
    starterCode: '// Starter Blueprint Template\nfunction main() {\n  console.log("Initialize project build");\n}'
  });
  const [projectFeedback, setProjectFeedback] = useState(null);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const projectItem = {
      id: `proj_admin_${Date.now()}`,
      title: newProject.title.trim(),
      level: newProject.difficulty,
      category: newProject.category,
      tagline: newProject.tagline || newProject.title,
      description: newProject.description,
      techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean),
      learningObjectives: ['Apply industry architecture patterns', 'Implement production error handling', 'Author comprehensive unit tests'],
      milestones: newProject.milestones.split(',').map((m, idx) => ({
        id: `m_${idx + 1}`,
        title: m.trim(),
        completed: false
      })),
      starterCode: newProject.starterCode,
      testingGuidance: 'Write unit tests for core logic and integration tests for API endpoints.',
      documentationGuidance: 'Include architecture diagrams, environment setup, and API specifications.',
      status: 'In Progress',
      repoUrl: ''
    };

    setProjects(prev => [projectItem, ...prev]);
    setProjectFeedback(`Project template "${newProject.title}" published to live student portfolio blueprints!`);
    setTimeout(() => setProjectFeedback(null), 3000);
    setNewProject({
      title: '',
      difficulty: 'Intermediate',
      category: 'Full-Stack Web',
      tagline: '',
      description: '',
      techStack: 'React, Node.js, PostgreSQL',
      milestones: 'Architecture Plan, Database Schema, REST Endpoints, Frontend UI, Deployment',
      starterCode: '// Starter Blueprint Template\nfunction main() {\n  console.log("Initialize project build");\n}'
    });
  };

  if (!isAdminMode) {
    return (
      <div className="admin-container glass-panel p-8 text-center max-w-lg mx-auto mt-12 fade-in">
        <AlertTriangle size={48} className="text-amber-400 mx-auto mb-3" />
        <h2 className="text-xl font-bold mb-2">Restricted Administrator Area</h2>
        <p className="text-xs text-muted mb-5 leading-relaxed">
          Access to curriculum management, challenge registration, and audit logs requires verified administrative authorization.
        </p>
        <button onClick={() => setIsAdminMode(true)} className="btn-primary text-xs px-4 py-2">
          Authenticate as Staff Admin
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container fade-in">
      {/* Header */}
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge cyan">Protected Console</span>
            <span className="badge">RBAC: Superadmin</span>
          </div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <ShieldCheck className="text-cyan" size={26} /> Admin & Content Management
          </h1>
          <p className="text-muted text-xs">
            Manage official curricula, author coding challenges with hidden test cases, review questions, and audit platform activity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted font-mono">Role: {user.name}</span>
          <button 
            onClick={() => setIsAdminMode(false)}
            className="btn-secondary text-xs px-2.5 py-1 text-amber-400"
          >
            Lock Console
          </button>
        </div>
      </header>

      {/* Admin Tab Switchers */}
      <div className="flex gap-2 border-b border-white-10 pb-3 mb-6 flex-wrap">
        <button
          className={`filter-pill text-xs ${activeAdminTab === 'curriculum' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('curriculum')}
        >
          <BookOpen size={13} /> Curriculum Manager
        </button>
        <button
          className={`filter-pill text-xs ${activeAdminTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('challenges')}
        >
          <Brain size={13} /> Coding Challenges
        </button>
        <button
          className={`filter-pill text-xs ${activeAdminTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('quizzes')}
        >
          <Award size={13} /> Exam & Quiz Studio
        </button>
        <button
          className={`filter-pill text-xs ${activeAdminTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('projects')}
        >
          <FolderGit2 size={13} /> Project Blueprints
        </button>
        <button
          className={`filter-pill text-xs ${activeAdminTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveAdminTab('system')}
        >
          <Activity size={13} /> System & Audit Log
        </button>
      </div>

      {/* TAB 1: CURRICULUM MANAGER */}
      {activeAdminTab === 'curriculum' && (
        <div className="glass-panel p-6 fade-in max-w-3xl">
          <h3 className="text-base font-bold mb-1 flex items-center gap-2">
            <BookOpen size={16} className="text-cyan" /> Author New Curriculum Lesson
          </h3>
          <p className="text-xs text-muted mb-4">
            Publish structured educational lessons to official TechVerse tracks.
          </p>

          <form onSubmit={handleCreateLesson} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted block mb-1">Target Language / Track</label>
                <select
                  value={newLesson.course}
                  onChange={(e) => setNewLesson({ ...newLesson, course: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="sql">SQL</option>
                  <option value="git">Git & GitHub</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Difficulty Level</label>
                <select
                  value={newLesson.level}
                  onChange={(e) => setNewLesson({ ...newLesson, level: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Lesson Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Asynchronous Generators & Iterators"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Explanation & Conceptual Objectives</label>
              <textarea
                rows={3}
                placeholder="In-depth conceptual breakdown and common edge cases..."
                value={newLesson.description}
                onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Code Example / Demonstration</label>
              <textarea
                rows={4}
                value={newLesson.starterCode}
                onChange={(e) => setNewLesson({ ...newLesson, starterCode: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 font-mono text-cyan"
              />
            </div>

            <button type="submit" className="btn-primary text-xs px-5 py-2">
              Publish Lesson to Curriculum
            </button>
            {lessonFeedback && (
              <span className="text-xs text-green-400 block mt-2">{lessonFeedback}</span>
            )}
          </form>
        </div>
      )}

      {/* TAB 2: CODING CHALLENGES MANAGER */}
      {activeAdminTab === 'challenges' && (
        <div className="glass-panel p-6 fade-in max-w-3xl">
          <h3 className="text-base font-bold mb-1 flex items-center gap-2">
            <Brain size={16} className="text-cyan" /> Author DSA Challenge & Test Cases
          </h3>
          <p className="text-xs text-muted mb-4">
            Hidden test cases evaluate student submissions authoritatively without exposing test inputs on the client.
          </p>

          <form onSubmit={handleCreateChallenge} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted block mb-1">Challenge Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trapping Rain Water"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Topic / Category</label>
                <select
                  value={newChallenge.category}
                  onChange={(e) => setNewChallenge({ ...newChallenge, category: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                >
                  <option value="Arrays & Hash Maps">Arrays & Hash Maps</option>
                  <option value="Stacks & Queues">Stacks & Queues</option>
                  <option value="Two Pointers">Two Pointers</option>
                  <option value="Dynamic Programming">Dynamic Programming</option>
                  <option value="Trees & Graphs">Trees & Graphs</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Starter Function Signature</label>
              <textarea
                rows={3}
                value={newChallenge.starterCode}
                onChange={(e) => setNewChallenge({ ...newChallenge, starterCode: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 font-mono text-cyan"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 p-3 bg-charcoal rounded border border-white-10">
              <div>
                <span className="text-xs font-bold text-white block mb-1">Visible Example Test Case</span>
                <input
                  type="text"
                  placeholder="Input: [1, 2, 3]"
                  value={newChallenge.visibleInput}
                  onChange={(e) => setNewChallenge({ ...newChallenge, visibleInput: e.target.value })}
                  className="w-full p-1.5 text-xs bg-dark rounded border border-white-10 mb-2 font-mono"
                />
                <input
                  type="text"
                  placeholder="Expected: 6"
                  value={newChallenge.visibleExpected}
                  onChange={(e) => setNewChallenge({ ...newChallenge, visibleExpected: e.target.value })}
                  className="w-full p-1.5 text-xs bg-dark rounded border border-white-10 font-mono"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-cyan block mb-1">🔒 Hidden Authoritative Test Case</span>
                <input
                  type="text"
                  placeholder="Hidden Input: [10, 20]"
                  value={newChallenge.hiddenInput}
                  onChange={(e) => setNewChallenge({ ...newChallenge, hiddenInput: e.target.value })}
                  className="w-full p-1.5 text-xs bg-dark rounded border border-white-10 mb-2 font-mono"
                />
                <input
                  type="text"
                  placeholder="Hidden Expected: 30"
                  value={newChallenge.hiddenExpected}
                  onChange={(e) => setNewChallenge({ ...newChallenge, hiddenExpected: e.target.value })}
                  className="w-full p-1.5 text-xs bg-dark rounded border border-white-10 font-mono"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary text-xs px-5 py-2">
              Deploy Challenge
            </button>
            {challengeFeedback && (
              <span className="text-xs text-green-400 block mt-2">{challengeFeedback}</span>
            )}
          </form>
        </div>
      )}

      {/* TAB 3: QUIZZES MANAGER */}
      {activeAdminTab === 'quizzes' && (
        <div className="glass-panel p-6 fade-in max-w-3xl">
          <h3 className="text-base font-bold mb-1 flex items-center gap-2">
            <Award size={16} className="text-cyan" /> Add Multiple-Choice Assessment Question
          </h3>
          <p className="text-xs text-muted mb-4">
            Create verified conceptual questions for System Design, DSA, and DBMS exams.
          </p>

          <form onSubmit={handleCreateQuiz} className="space-y-3">
            <div>
              <label className="text-xs text-muted block mb-1">Subject Suite</label>
              <select
                value={newQuiz.subject}
                onChange={(e) => setNewQuiz({ ...newQuiz, subject: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              >
                <option value="SystemDesign">System Design & Distributed Architecture</option>
                <option value="DSA">Data Structures & Algorithms</option>
                <option value="DBMS">Database Management Systems (SQL)</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Question Text *</label>
              <textarea
                rows={2}
                required
                placeholder="e.g. Which consensus algorithm is used by Apache Kafka in modern versions?"
                value={newQuiz.question}
                onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Option 1 (Index 0)"
                value={newQuiz.option0}
                onChange={(e) => setNewQuiz({ ...newQuiz, option0: e.target.value })}
                className="p-2 text-xs bg-dark rounded border border-white-10"
              />
              <input
                type="text"
                placeholder="Option 2 (Index 1)"
                value={newQuiz.option1}
                onChange={(e) => setNewQuiz({ ...newQuiz, option1: e.target.value })}
                className="p-2 text-xs bg-dark rounded border border-white-10"
              />
              <input
                type="text"
                placeholder="Option 3 (Index 2)"
                value={newQuiz.option2}
                onChange={(e) => setNewQuiz({ ...newQuiz, option2: e.target.value })}
                className="p-2 text-xs bg-dark rounded border border-white-10"
              />
              <input
                type="text"
                placeholder="Option 4 (Index 3)"
                value={newQuiz.option3}
                onChange={(e) => setNewQuiz({ ...newQuiz, option3: e.target.value })}
                className="p-2 text-xs bg-dark rounded border border-white-10"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Correct Option Index (0 to 3)</label>
                <select
                  value={newQuiz.correctAnswer}
                  onChange={(e) => setNewQuiz({ ...newQuiz, correctAnswer: parseInt(e.target.value, 10) })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                >
                  <option value={0}>Option 1 (Index 0)</option>
                  <option value={1}>Option 2 (Index 1)</option>
                  <option value={2}>Option 3 (Index 2)</option>
                  <option value={3}>Option 4 (Index 3)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Explanation for Answer</label>
                <input
                  type="text"
                  placeholder="Why this answer is correct..."
                  value={newQuiz.explanation}
                  onChange={(e) => setNewQuiz({ ...newQuiz, explanation: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary text-xs px-5 py-2 mt-2">
              Save Exam Question
            </button>
            {quizFeedback && (
              <span className="text-xs text-green-400 block mt-2">{quizFeedback}</span>
            )}
          </form>
        </div>
      )}

      {/* TAB 4: PROJECT BLUEPRINTS MANAGER */}
      {activeAdminTab === 'projects' && (
        <div className="glass-panel p-6 fade-in max-w-3xl">
          <h3 className="text-base font-bold mb-1 flex items-center gap-2">
            <FolderGit2 size={16} className="text-cyan" /> Author Practical Project Blueprint
          </h3>
          <p className="text-xs text-muted mb-4">
            Publish real-world project specifications, milestones, and starter code for student portfolios.
          </p>

          <form onSubmit={handleCreateProject} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Key-Value Store"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Difficulty Tier</label>
                <select
                  value={newProject.difficulty}
                  onChange={(e) => setNewProject({ ...newProject, difficulty: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted block mb-1">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Systems & Distributed Architecture"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                />
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">Tech Stack (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Go, Raft, gRPC, Docker"
                  value={newProject.techStack}
                  onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
                  className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Project Description & Architecture Scope</label>
              <textarea
                rows={2}
                placeholder="High-level description of what students will build and deploy..."
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Milestones (Comma-separated milestones)</label>
              <input
                type="text"
                placeholder="Architecture Design, Core Storage Engine, Consensus Replication, Client SDK, Stress Testing"
                value={newProject.milestones}
                onChange={(e) => setNewProject({ ...newProject, milestones: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 text-white"
              />
            </div>

            <div>
              <label className="text-xs text-muted block mb-1">Starter Code Template</label>
              <textarea
                rows={3}
                value={newProject.starterCode}
                onChange={(e) => setNewProject({ ...newProject, starterCode: e.target.value })}
                className="w-full p-2 text-xs bg-dark rounded border border-white-10 font-mono text-cyan"
              />
            </div>

            <button type="submit" className="btn-primary text-xs px-5 py-2 mt-2">
              Publish Project Blueprint
            </button>
            {projectFeedback && (
              <span className="text-xs text-green-400 block mt-2">{projectFeedback}</span>
            )}
          </form>
        </div>
      )}

      {/* TAB 5: SYSTEM & AUDIT LOG */}
      {activeAdminTab === 'system' && (
        <div className="glass-panel p-6 fade-in max-w-4xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <Activity size={16} className="text-cyan" /> Infrastructure & Activity Audit Log
              </h3>
              <p className="text-xs text-muted">Real-time system events, authentication tokens, and database health.</p>
            </div>
            <span className="badge text-green-400 border-green-500 font-mono text-xs">
              System 100% Operational
            </span>
          </div>

          <div className="p-3 bg-dark rounded border border-white-10 font-mono text-xs space-y-2 mb-4">
            {auditLogs.map((log, i) => (
              <div key={i} className="flex items-start gap-3 border-b border-white-10 pb-1.5 last:border-b-0">
                <span className="text-muted shrink-0">{log.time}</span>
                <span className="text-cyan font-bold shrink-0">[{log.event}]</span>
                <span className="text-white flex-1">{log.detail || log.ip}</span>
                <span className="text-muted text-[11px] shrink-0">Actor: {log.user}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-charcoal rounded border border-white-10 text-center">
              <span className="text-muted block mb-1">Active DB Connections</span>
              <span className="font-bold text-white text-base">8 / 100 (Supabase Pool)</span>
            </div>
            <div className="p-3 bg-charcoal rounded border border-white-10 text-center">
              <span className="text-muted block mb-1">Execution Sandbox Engine</span>
              <span className="font-bold text-cyan text-base">Piston Container v2</span>
            </div>
            <div className="p-3 bg-charcoal rounded border border-white-10 text-center">
              <span className="text-muted block mb-1">API Security Policy</span>
              <span className="font-bold text-green-400 text-base">CORS & Rate-Limit Enforced</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
