import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { 
  User, Settings, Edit3, Check, X, Plus, BookOpen, Flame, Trophy, 
  GitBranch, Key, Sun, Moon, Database, Sliders, CheckCircle2, 
  Code2, ExternalLink, Target, Sparkles, Award, Trash2, 
  AlertTriangle, Copy, Layers, Clock
} from 'lucide-react';
import './Profile.css';

const PRESET_AVATARS = [
  { id: 'violet', label: 'Electric Violet', gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
  { id: 'cyan', label: 'Cyber Cyan', gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)' },
  { id: 'emerald', label: 'Matrix Emerald', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 'amber', label: 'Solar Amber', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' }
];

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Systems Architect'];

const SUGGESTED_TECH = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 
  'PostgreSQL', 'Docker', 'Git', 'Next.js', 'Redis', 'GraphQL', 'TailwindCSS'
];

const ACHIEVEMENTS_LIST = [
  { id: 'a1', title: '7-Day Streak', icon: '🔥', desc: 'Maintained a 7-day continuous study sprint', unlocked: true },
  { id: 'a2', title: 'Goal Crusher', icon: '🎯', desc: 'Completed 5 multi-step learning roadmap goals', unlocked: true },
  { id: 'a3', title: 'Code Studio Pioneer', icon: '💻', desc: 'Saved 3 or more working code snippets', unlocked: true },
  { id: 'a4', title: 'Level 2 Scholar', icon: '⚡', desc: 'Surpassed 1,000 platform XP points', unlocked: true },
  { id: 'a5', title: 'Algorithm Ace', icon: '🧠', desc: 'Authoritatively solved an Easy or Medium DSA problem', unlocked: true },
  { id: 'a6', title: 'Full-Stack Builder', icon: '🚀', desc: 'Completed a real-world portfolio blueprint', unlocked: false },
  { id: 'a7', title: 'Deep Work Champion', icon: '⏱️', desc: 'Completed over 10 hours of focused study time', unlocked: true },
  { id: 'a8', title: 'API Craftsman', icon: '📡', desc: 'Tested and inspected endpoints in Dev Tools', unlocked: true }
];

const Profile = () => {
  const navigate = useNavigate();
  const { 
    user, updateUserProfile, theme, toggleTheme, customApiKey, updateCustomApiKey,
    goals, projects, enrolledCourses, completedLessons, recentSnippets, solvedProblems,
    requestDataDeletion
  } = useUser();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'portfolio', 'settings'
  const [isEditing, setIsEditing] = useState(false);
  const [copiedSnippetId, setCopiedSnippetId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name || 'Alex Rivera',
    githubUsername: user.githubUsername || 'alexrivera-dev',
    bio: user.bio || 'Computer Science junior passionate about Full-Stack, Distributed Systems, and AI.',
    university: user.university || 'Tech University',
    course: user.course || 'Computer Science & Engineering',
    year: user.year || '3rd Year',
    skillLevel: user.skillLevel || 'Intermediate',
    avatar: user.avatar || 'violet',
    learningGoals: user.learningGoals || [
      'Master Distributed Systems & Caching',
      'Solve 50 LeetCode Medium/Hard Problems',
      'Build Full-Stack AI RAG Platform'
    ],
    selectedTechnologies: user.selectedTechnologies || [
      'JavaScript', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'
    ],
    primaryStack: user.primaryStack || 'React / Node.js / Python',
    email: user.email || 'alex@student.edu'
  });

  const [newGoalInput, setNewGoalInput] = useState('');
  const [newTechInput, setNewTechInput] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState(customApiKey || '');
  const [keySaved, setKeySaved] = useState(false);

  const activeAvatarStyle = PRESET_AVATARS.find(a => a.id === formData.avatar) || PRESET_AVATARS[0];

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleToggleTech = (tech) => {
    const current = formData.selectedTechnologies || [];
    let updated;
    if (current.includes(tech)) {
      updated = current.filter(t => t !== tech);
    } else {
      updated = [...current, tech];
    }
    setFormData(prev => ({ ...prev, selectedTechnologies: updated }));
    updateUserProfile({ selectedTechnologies: updated });
  };

  const handleAddCustomTech = (e) => {
    e.preventDefault();
    const clean = newTechInput.trim();
    if (clean && !formData.selectedTechnologies.includes(clean)) {
      const updated = [...formData.selectedTechnologies, clean];
      setFormData(prev => ({ ...prev, selectedTechnologies: updated }));
      updateUserProfile({ selectedTechnologies: updated });
      setNewTechInput('');
    }
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    const clean = newGoalInput.trim();
    if (clean && !formData.learningGoals.includes(clean)) {
      const updated = [...formData.learningGoals, clean];
      setFormData(prev => ({ ...prev, learningGoals: updated }));
      updateUserProfile({ learningGoals: updated });
      setNewGoalInput('');
    }
  };

  const handleRemoveGoal = (goalToRemove) => {
    const updated = formData.learningGoals.filter(g => g !== goalToRemove);
    setFormData(prev => ({ ...prev, learningGoals: updated }));
    updateUserProfile({ learningGoals: updated });
  };

  const handleCopySnippet = (snippet) => {
    navigator.clipboard.writeText(snippet.code);
    setCopiedSnippetId(snippet.id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    updateCustomApiKey(apiKeyInput.trim());
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2500);
  };

  const handleConfirmDataDeletion = async () => {
    await requestDataDeletion();
    setShowDeleteModal(false);
    setDeletionSuccess(true);
    setTimeout(() => {
      setDeletionSuccess(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="profile-container fade-in">
      {/* Top Header */}
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-tag">Account & Identity</span>
            <span className="text-cyan text-xs font-mono">ID: {user.id || 'u1'}</span>
          </div>
          <h1>Developer Profile & Settings</h1>
          <p className="text-muted">Manage your public portfolio, verified skill levels, learning roadmaps, and workspace preferences</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className={`filter-pill ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={16} /> Identity & Roadmaps
          </button>
          <button
            type="button"
            className={`filter-pill ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <Layers size={16} /> Portfolio & Snippets
          </button>
          <button
            type="button"
            className={`filter-pill ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} /> Preferences & Privacy
          </button>
        </div>
      </header>

      {/* Deletion Toast */}
      {deletionSuccess && (
        <div className="alert-banner mb-6" style={{ background: 'rgba(16, 185, 129, 0.15)', borderColor: 'var(--accent)' }}>
          <CheckCircle2 size={18} className="text-accent" />
          <span>All user records and cached storage have been purged successfully. Reloading workspace...</span>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 1: PROFILE & IDENTITY */}
      {/* =================================================================== */}
      {activeTab === 'profile' && (
        <div className="profile-grid">
          {/* Left Column: Avatar & Summary Card */}
          <div className="profile-sidebar">
            <div className="glass-panel text-center mb-6">
              <div 
                className="profile-avatar-lg mx-auto mb-4 relative"
                style={{ background: activeAvatarStyle.gradient }}
              >
                {formData.name ? formData.name.charAt(0) : 'U'}
              </div>

              {isEditing && (
                <div className="avatar-picker mb-4">
                  <label className="text-xs text-muted block mb-2">Select Avatar Aura:</label>
                  <div className="flex justify-center gap-2">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        className={`avatar-swatch ${formData.avatar === av.id ? 'active' : ''}`}
                        style={{ background: av.gradient }}
                        title={av.label}
                        onClick={() => setFormData({ ...formData, avatar: av.id })}
                      />
                    ))}
                  </div>
                </div>
              )}

              <h2 className="text-xl mb-1">{formData.name}</h2>
              <a 
                href={`https://github.com/${formData.githubUsername}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-cyan text-xs font-semibold mb-2 inline-flex items-center gap-1 hover:underline"
              >
                <GitBranch size={13} /> @{formData.githubUsername}
              </a>
              <p className="text-muted text-xs mb-3">{formData.course} • {formData.year}</p>

              <div className="level-badge inline-block mx-auto mb-4">
                {formData.skillLevel} Developer • Lvl {Math.floor(user.xp / 1000) + 1}
              </div>

              {/* Learning Stats Bar */}
              <div className="grid grid-cols-2 gap-2 text-left pt-3 border-t border-white-10 text-xs">
                <div className="p-2 rounded bg-black-20">
                  <span className="text-muted block">Platform XP</span>
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Trophy size={13} /> {user.xp} XP
                  </span>
                </div>
                <div className="p-2 rounded bg-black-20">
                  <span className="text-muted block">Study Streak</span>
                  <span className="font-bold text-accent flex items-center gap-1">
                    <Flame size={13} /> {user.streak} Days
                  </span>
                </div>
                <div className="p-2 rounded bg-black-20">
                  <span className="text-muted block">Focus Deep Work</span>
                  <span className="font-bold text-cyan flex items-center gap-1">
                    <Clock size={13} /> {user.totalFocusMinutes || 0}m
                  </span>
                </div>
                <div className="p-2 rounded bg-black-20">
                  <span className="text-muted block">Problems Solved</span>
                  <span className="font-bold text-warning flex items-center gap-1">
                    <Code2 size={13} /> {solvedProblems.length} DSA
                  </span>
                </div>
              </div>
            </div>

            {/* Achievements & Badges */}
            <div className="glass-panel">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Award size={16} className="text-primary" /> Achievements
                </h3>
                <span className="text-xs text-muted">
                  {ACHIEVEMENTS_LIST.filter(a => a.unlocked).length}/{ACHIEVEMENTS_LIST.length}
                </span>
              </div>
              
              <div className="flex flex-col gap-2">
                {ACHIEVEMENTS_LIST.map((ach) => (
                  <div 
                    key={ach.id} 
                    className={`achievement-mini-row ${ach.unlocked ? 'unlocked' : 'locked'}`}
                  >
                    <span className="text-lg">{ach.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate">{ach.title}</div>
                      <div className="text-2xs text-muted truncate">{ach.desc}</div>
                    </div>
                    {ach.unlocked && <Check size={14} className="text-accent flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Edit & Details */}
          <div className="profile-main">
            {/* Developer Identity Details */}
            <div className="glass-panel mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg">Developer Identity & Credentials</h2>
                  <p className="text-xs text-muted">Your public academic and engineering credentials</p>
                </div>
                <button 
                  type="button"
                  className="icon-btn" 
                  onClick={() => setIsEditing(!isEditing)}
                  title={isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  aria-label="Edit Profile"
                >
                  {isEditing ? <X size={16} /> : <Edit3 size={16} />}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} className="profile-edit-form flex flex-col gap-4">
                  <div className="info-grid">
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">GitHub Username</label>
                      <input
                        type="text"
                        value={formData.githubUsername}
                        onChange={(e) => setFormData({ ...formData, githubUsername: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">Skill Level</label>
                      <select
                        value={formData.skillLevel}
                        onChange={(e) => setFormData({ ...formData, skillLevel: e.target.value })}
                        className="profile-select"
                      >
                        {SKILL_LEVELS.map(lvl => (
                          <option key={lvl} value={lvl}>{lvl}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">Primary Tech Stack</label>
                      <input
                        type="text"
                        value={formData.primaryStack}
                        onChange={(e) => setFormData({ ...formData, primaryStack: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">University / Institute</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="text-xs text-muted block mb-1">Course / Major</label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                      <label className="text-xs text-muted block mb-1">Bio / Tagline</label>
                      <input
                        type="text"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button type="submit" className="primary flex items-center gap-2">
                      <Check size={16} /> Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="info-grid">
                  <div className="info-group">
                    <label>Full Display Name</label>
                    <div className="info-value">{formData.name}</div>
                  </div>
                  <div className="info-group">
                    <label>GitHub Developer</label>
                    <div className="info-value flex items-center gap-1 text-cyan font-mono">
                      <GitBranch size={14} /> @{formData.githubUsername}
                    </div>
                  </div>
                  <div className="info-group">
                    <label>Skill Level</label>
                    <div className="info-value text-accent font-semibold">{formData.skillLevel}</div>
                  </div>
                  <div className="info-group">
                    <label>Primary Tech Stack</label>
                    <div className="info-value">{formData.primaryStack}</div>
                  </div>
                  <div className="info-group">
                    <label>University / Institute</label>
                    <div className="info-value">{formData.university}</div>
                  </div>
                  <div className="info-group">
                    <label>Course / Major</label>
                    <div className="info-value">{formData.course} • {formData.year}</div>
                  </div>
                  <div className="info-group" style={{ gridColumn: 'span 2' }}>
                    <label>Bio & Career Direction</label>
                    <div className="info-value text-muted text-sm">{formData.bio}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Learning Goals Roadmap */}
            <div className="glass-panel mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold flex items-center gap-2">
                    <Target size={18} className="text-primary" /> Active Learning Goals
                  </h3>
                  <p className="text-xs text-muted">Key engineering competencies and milestones you are targeting</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {(formData.learningGoals || []).map((goal, idx) => (
                  <div key={idx} className="learning-goal-item flex justify-between items-center p-3 rounded bg-black-20">
                    <div className="flex items-center gap-3">
                      <span className="goal-num">{idx + 1}</span>
                      <span className="text-sm font-medium">{goal}</span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveGoal(goal)}
                      className="icon-btn text-muted hover-danger"
                      title="Remove Goal"
                      aria-label="Remove Goal"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddGoal} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Master Redis Caching Strategies & LRU Eviction"
                  value={newGoalInput}
                  onChange={(e) => setNewGoalInput(e.target.value)}
                  className="devtools-textarea"
                  style={{ flex: 1, padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                />
                <button type="submit" className="primary text-xs flex items-center gap-1">
                  <Plus size={14} /> Add Goal
                </button>
              </form>
            </div>

            {/* Selected Technologies Matrix */}
            <div className="glass-panel mb-6">
              <h3 className="text-base font-bold mb-1 flex items-center gap-2">
                <Code2 size={18} className="text-cyan" /> Selected Technologies & Stack
              </h3>
              <p className="text-xs text-muted mb-4">
                Technologies you are actively studying or have incorporated in your builds
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {SUGGESTED_TECH.map((tech) => {
                  const isSelected = (formData.selectedTechnologies || []).includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => handleToggleTech(tech)}
                      className={`tech-pill-btn ${isSelected ? 'active' : ''}`}
                    >
                      {isSelected ? <Check size={12} /> : <Plus size={12} />}
                      {tech}
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleAddCustomTech} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add custom technology (e.g. Kafka, Rust, Terraform)"
                  value={newTechInput}
                  onChange={(e) => setNewTechInput(e.target.value)}
                  className="devtools-textarea"
                  style={{ flex: 1, padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                />
                <button type="submit" className="outline-btn text-xs flex items-center gap-1">
                  <Plus size={14} /> Add
                </button>
              </form>
            </div>

            {/* Enrolled Tracks Quick View */}
            <div className="glass-panel">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <BookOpen size={18} className="text-accent" /> Active Curricula Tracks
                </h3>
                <button 
                  type="button" 
                  className="text-xs text-cyan hover:underline flex items-center gap-1"
                  onClick={() => navigate('/learn')}
                >
                  Browse Curricula <ExternalLink size={12} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {enrolledCourses.map((courseId) => {
                  const course = CURRICULUM_DATA[courseId];
                  if (!course) return null;
                  
                  // Calculate completion
                  const totalLessons = [
                    ...(course.levels.beginner || []),
                    ...(course.levels.intermediate || []),
                    ...(course.levels.advanced || [])
                  ];
                  const doneCount = totalLessons.filter(l => completedLessons.includes(l.id)).length;
                  const pct = totalLessons.length > 0 ? Math.round((doneCount / totalLessons.length) * 100) : 0;

                  return (
                    <div key={courseId} className="p-3 rounded bg-black-20 border border-white-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{course.icon}</span>
                        <div>
                          <h4 className="text-xs font-bold">{course.name}</h4>
                          <span className="text-2xs text-muted">{doneCount}/{totalLessons.length} lessons</span>
                        </div>
                      </div>
                      <div className="w-full bg-white-10 h-1.5 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-accent rounded-full transition-all" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                      <div className="flex justify-between items-center text-2xs">
                        <span className="text-muted">{pct}% complete</span>
                        <button 
                          type="button" 
                          className="text-primary hover:underline font-bold"
                          onClick={() => navigate('/learn')}
                        >
                          Resume
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: PORTFOLIO & SAVED CODE SNIPPETS */}
      {/* =================================================================== */}
      {activeTab === 'portfolio' && (
        <div className="flex flex-col gap-6">
          {/* Projects Portfolio */}
          <div className="glass-panel">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-lg flex items-center gap-2">
                  <Layers size={18} className="text-primary" /> Engineering Project Portfolio
                </h2>
                <p className="text-xs text-muted">Full-stack software builds, system blueprints, and submitted repositories</p>
              </div>
              <button 
                type="button" 
                className="primary text-xs flex items-center gap-1"
                onClick={() => navigate('/projects')}
              >
                <Plus size={14} /> New Project Blueprint
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => {
                const completedCount = (proj.milestones || []).filter(m => m.completed).length;
                const totalCount = (proj.milestones || []).length;
                const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

                return (
                  <div key={proj.id} className="p-4 rounded-xl glass-card flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`badge-pill ${proj.level === 'Beginner' ? 'easy' : proj.level === 'Intermediate' ? 'medium' : 'hard'}`}>
                          {proj.level}
                        </span>
                        <span className={`status-tag ${proj.status === 'Completed' ? 'done' : 'in-progress'}`}>
                          {proj.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold mb-1">{proj.title}</h3>
                      <p className="text-xs text-muted mb-3 line-clamp-2">{proj.description}</p>
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs text-muted mb-1">
                        <span>Milestones: {completedCount}/{totalCount}</span>
                        <span className="font-semibold text-primary">{pct}%</span>
                      </div>
                      <div className="w-full bg-white-10 h-1.5 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-white-5">
                        {proj.repoUrl ? (
                          <a 
                            href={proj.repoUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-xs text-cyan font-mono flex items-center gap-1 hover:underline"
                          >
                            <GitBranch size={13} /> {proj.repoUrl.replace('https://github.com/', '')}
                          </a>
                        ) : (
                          <span className="text-2xs text-muted">No repository linked</span>
                        )}
                        <button 
                          type="button" 
                          className="outline-btn text-2xs"
                          onClick={() => navigate('/projects')}
                        >
                          View Blueprint
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Code Snippets Showcase */}
          <div className="glass-panel">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-lg flex items-center gap-2">
                  <Code2 size={18} className="text-cyan" /> Saved Code Snippets
                </h2>
                <p className="text-xs text-muted">Snippets, algorithms, and modules authored in Code Lab</p>
              </div>
              <button 
                type="button" 
                className="outline-btn text-xs flex items-center gap-1"
                onClick={() => navigate('/code-lab')}
              >
                <Plus size={14} /> Open Code Lab
              </button>
            </div>

            {recentSnippets.length === 0 ? (
              <div className="empty-state p-8 text-center text-muted">
                <Code2 size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No saved snippets found yet. Write and save algorithms in Code Lab.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentSnippets.map((snip) => (
                  <div key={snip.id} className="p-4 rounded-xl glass-card flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-white">{snip.title}</span>
                        <span className="badge-tag">{snip.language}</span>
                      </div>
                      <pre className="code-preview p-3 rounded bg-black-40 font-mono text-2xs overflow-x-auto text-muted mb-3" style={{ maxHeight: '110px' }}>
                        {snip.code}
                      </pre>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white-5 text-2xs">
                      <span className="text-muted">Updated: {snip.updatedAt}</span>
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          className="icon-btn text-muted hover-white"
                          onClick={() => handleCopySnippet(snip)}
                          title="Copy Code"
                          aria-label="Copy Code"
                        >
                          {copiedSnippetId === snip.id ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                        </button>
                        <button 
                          type="button"
                          className="text-primary font-bold hover:underline"
                          onClick={() => navigate('/code-lab')}
                        >
                          Run in Lab →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: SETTINGS, KEYS & GDPR PRIVACY CONTROLS */}
      {/* =================================================================== */}
      {activeTab === 'settings' && (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
          {/* Theme Settings */}
          <div className="glass-panel">
            <h2 className="text-lg mb-2 flex items-center gap-2">
              <Sliders size={18} className="text-primary" /> Appearance & Theme
            </h2>
            <p className="text-xs text-muted mb-4">
              Toggle between Deep Charcoal / Midnight Navy dark mode and Clean Slate light mode.
            </p>

            <div className="flex items-center justify-between p-4 glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon size={22} className="text-primary" /> : <Sun size={22} className="text-warning" />}
                <div>
                  <h4 className="text-sm font-bold">{theme === 'dark' ? 'Midnight Navy Dark' : 'Clean Slate Light'}</h4>
                  <p className="text-xs text-muted">Current workspace active theme</p>
                </div>
              </div>
              <button type="button" className="primary text-xs" onClick={toggleTheme}>
                Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </div>

          {/* Custom Gemini API Key */}
          <div className="glass-panel">
            <h2 className="text-lg mb-2 flex items-center gap-2">
              <Key size={18} className="text-cyan" /> Custom Gemini API Key
            </h2>
            <p className="text-xs text-muted mb-4">
              Bring your own Gemini API key for higher rate limits on Flow AI code reviews and quiz generation. Key is stored strictly in your browser's local storage.
            </p>

            <form onSubmit={handleSaveApiKey} className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                className="devtools-textarea"
                style={{ flex: 1, padding: '0.65rem 1rem' }}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
              />
              <button type="submit" className="primary text-xs flex items-center gap-1">
                <Check size={14} /> Save Key
              </button>
            </form>

            {keySaved && (
              <p className="text-xs text-accent mt-2 flex items-center gap-1">
                <CheckCircle2 size={14} /> API Key updated successfully in local storage.
              </p>
            )}
          </div>

          {/* Data Export & Backup */}
          <div className="glass-panel">
            <h2 className="text-lg mb-2 flex items-center gap-2">
              <Database size={18} className="text-accent" /> Data Export & Backup
            </h2>
            <p className="text-xs text-muted mb-4">
              Export your complete progress, earned badges, custom code snippets, and goals as a JSON backup.
            </p>
            <button 
              type="button"
              className="outline-btn text-xs flex items-center gap-2"
              onClick={() => {
                const data = {
                  user,
                  enrolledCourses,
                  completedLessons,
                  projects,
                  recentSnippets,
                  goals,
                  solvedProblems,
                  exportedAt: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `techverse-${user.githubUsername || 'developer'}-backup.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Database size={14} /> Export Complete Developer Backup (JSON)
            </button>
          </div>

          {/* GDPR / Privacy Right to Erasure */}
          <div className="glass-panel" style={{ border: '1px solid rgba(244, 63, 94, 0.35)', background: 'rgba(244, 63, 94, 0.04)' }}>
            <h2 className="text-lg text-danger mb-2 flex items-center gap-2">
              <Trash2 size={18} /> Right to Erasure & Account Data Deletion
            </h2>
            <p className="text-xs text-muted mb-4">
              In accordance with data privacy regulations (GDPR / CCPA), you can request immediate and irreversible deletion of all your user-specific data, including challenge submissions, code snippets, study logs, and progress.
            </p>
            
            <button 
              type="button"
              className="outline-btn text-xs flex items-center gap-2 text-danger hover-danger"
              style={{ borderColor: 'rgba(244, 63, 94, 0.4)' }}
              onClick={() => setShowDeleteModal(true)}
            >
              <AlertTriangle size={14} /> Request Full Data Deletion
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Data Deletion */}
      {showDeleteModal && (
        <div className="modal-backdrop fade-in">
          <div className="glass-modal max-w-md p-6">
            <div className="flex items-center gap-3 text-danger mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold">Confirm Account Data Erasure</h3>
            </div>
            
            <p className="text-xs text-muted mb-4">
              Are you sure you want to permanently delete your Techverse account data? 
              This will purge your challenge history, code snippets, study progress, and reset your workspace to factory defaults.
            </p>

            <div className="p-3 rounded bg-black-40 text-2xs font-mono text-muted mb-6">
              POST /api/user/delete-data<br/>
              Authorization: Bearer token_active<br/>
              Action: PURGE_ALL_USER_RECORDS
            </div>

            <div className="flex justify-end gap-3">
              <button 
                type="button"
                className="outline-btn text-xs"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button"
                className="bg-danger text-white text-xs"
                style={{ padding: '0.5rem 1rem', background: 'var(--danger)', borderRadius: '8px' }}
                onClick={handleConfirmDataDeletion}
              >
                Yes, Purge My Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
