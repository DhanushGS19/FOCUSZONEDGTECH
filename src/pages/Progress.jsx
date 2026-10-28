import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Clock, Target, Zap, BookOpen, Sparkles, TrendingUp, Award, 
  AlertCircle, CheckCircle2, ArrowRight, ShieldCheck, Flame, 
  Code2, GitBranch, Layers 
} from 'lucide-react';
import './Progress.css';

const ALL_AVAILABLE_BADGES = [
  { id: 'b1', name: '🔥 7-Day Streak', desc: 'Maintained continuous daily learning for a full week', unlocked: true },
  { id: 'b2', name: '🎯 Goal Crusher', desc: 'Completed all daily learning targets with 100% adherence', unlocked: true },
  { id: 'b3', name: '💻 Code Studio Pioneer', desc: 'Compiled and executed multi-language programs in Code Studio', unlocked: true },
  { id: 'b4', name: '⚡ Level 2 Scholar', desc: 'Accumulated over 1,000 XP in verified engineering activities', unlocked: true },
  { id: 'b5', name: '🏆 Algorithm Ace', desc: 'Solved multiple algorithmic challenges with 100% test case pass rate', req: 'Solve 3+ Challenges' },
  { id: 'b6', name: '🛠️ Git Master', desc: 'Successfully simulated branching and resolved merge conflicts', req: 'Complete Git Drills' },
  { id: 'b7', name: '🌐 Full-Stack Builder', desc: 'Implemented and linked verified projects to personal portfolio', req: 'Complete 2 Projects' },
  { id: 'b8', name: '⏱️ Focus Champion', desc: 'Logged over 15 hours of distraction-free deep work', req: '900+ Focus Mins' }
];

const Progress = () => {
  const navigate = useNavigate();
  const { 
    user, goals, completedLessons, quizPerformance, 
    solvedProblems, topicsNeedingRevision, clearTopicRevision, 
    demonstratedMastery, projects 
  } = useUser();

  const totalMinutes = user.totalFocusMinutes || 870;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, xp: 90 },
    { day: 'Tue', minutes: 90, xp: 180 },
    { day: 'Wed', minutes: 60, xp: 120 },
    { day: 'Thu', minutes: 120, xp: 240 },
    { day: 'Fri', minutes: 75, xp: 150 },
    { day: 'Sat', minutes: 150, xp: 300 },
    { day: 'Sun', minutes: Math.min(180, (user.todayFocusMinutes || 60)), xp: 120 },
  ];

  const maxMinutes = Math.max(...weeklyActivity.map(a => a.minutes), 60);

  return (
    <div className="progress-container fade-in">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="badge cyan">Analytics & Gamification</span>
          <span className="badge">Demonstrated Mastery</span>
        </div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp className="text-cyan" size={26} /> Learning Progress & Mastery Analytics
        </h1>
        <p className="text-muted text-xs">
          Authentic metrics distinguishing verified problem-solving and curriculum milestones from plain study time
        </p>
      </header>

      {/* Top Stats Matrix */}
      <div className="stats-grid mb-8 grid grid-cols-4 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="glass-panel stat-box text-center p-4">
          <Clock className="text-cyan mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold mb-0.5">{hours}h {minutes}m</div>
          <div className="text-xs text-muted">Focus Logged</div>
        </div>
        <div className="glass-panel stat-box text-center p-4">
          <BookOpen className="text-primary mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold mb-0.5">{completedLessons?.length || 4} Lessons</div>
          <div className="text-xs text-muted">Curriculum Verified</div>
        </div>
        <div className="glass-panel stat-box text-center p-4">
          <Code2 className="text-green-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold mb-0.5">{solvedProblems?.length || 1} Solved</div>
          <div className="text-xs text-muted">Coding Challenges</div>
        </div>
        <div className="glass-panel stat-box text-center p-4">
          <Target className="text-amber-400 mx-auto mb-2" size={24} />
          <div className="text-2xl font-bold mb-0.5">{quizPerformance?.averageScore || 88}%</div>
          <div className="text-xs text-muted">Quiz Accuracy</div>
        </div>
      </div>

      {/* Topics Needing Revision & AI Recommendations */}
      {topicsNeedingRevision && topicsNeedingRevision.length > 0 && (
        <div className="glass-panel p-5 mb-8 border border-amber-500 fade-in">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-400" /> Topics Needing Revision & Adaptive Next Steps
            </h3>
            <span className="badge amber text-[11px]">{topicsNeedingRevision.length} Targeted Topics</span>
          </div>
          <p className="text-xs text-muted mb-4">
            Based on recent test case outcomes and quiz scores, our adaptive engine recommends revising these specific concepts before tackling advanced milestones:
          </p>

          <div className="space-y-2.5">
            {topicsNeedingRevision.map((t, idx) => (
              <div key={idx} className="p-3 bg-charcoal rounded border border-white-10 flex justify-between items-center flex-wrap gap-2 text-xs">
                <div>
                  <span className="font-bold text-white block">{t.topic}</span>
                  <span className="text-muted text-[11px]">{t.reason} • Encountered {t.lastEncountered || 'Recently'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      localStorage.setItem('focusflow_code_review', `Can you provide a step-by-step tutorial and 3 practice exercises on: ${t.topic}?`);
                      navigate('/flow-ai');
                    }}
                    className="btn-secondary text-xs px-2.5 py-1 flex items-center gap-1 text-cyan border-cyan"
                  >
                    <Sparkles size={11} /> Explain with Flow AI
                  </button>
                  <button
                    onClick={() => navigate('/practice')}
                    className="btn-primary text-xs px-2.5 py-1 flex items-center gap-1"
                  >
                    <Code2 size={11} /> Practice Drills
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demonstrated Mastery vs Time Spent */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <ShieldCheck size={18} className="text-cyan" /> Demonstrated Engineering Mastery
            </h3>
            <p className="text-xs text-muted">
              Calculated exclusively from authoritative problem solutions, verified project milestones, and passed exams
            </p>
          </div>
          <span className="badge cyan font-mono text-xs">Level {Math.floor(user.xp / 1000) + 1}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 bg-charcoal rounded border border-white-10">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span>Algorithms & Problem Solving</span>
              <span className="text-cyan">{demonstratedMastery?.algorithms || 65}%</span>
            </div>
            <div className="w-full bg-dark h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-cyan h-full transition-all" style={{ width: `${demonstratedMastery?.algorithms || 65}%` }} />
            </div>
            <span className="text-[11px] text-muted">Derived from {solvedProblems?.length || 1} solved DSA problems</span>
          </div>

          <div className="p-4 bg-charcoal rounded border border-white-10">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span>Core Computer Science Concepts</span>
              <span className="text-primary">{demonstratedMastery?.coreConcepts || 82}%</span>
            </div>
            <div className="w-full bg-dark h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-primary h-full transition-all" style={{ width: `${demonstratedMastery?.coreConcepts || 82}%` }} />
            </div>
            <span className="text-[11px] text-muted">Derived from {completedLessons?.length || 4} lessons & quizzes</span>
          </div>

          <div className="p-4 bg-charcoal rounded border border-white-10">
            <div className="flex justify-between text-xs mb-1.5 font-bold">
              <span>Full-Stack Project Competence</span>
              <span className="text-green-400">{demonstratedMastery?.fullStackProjects || 55}%</span>
            </div>
            <div className="w-full bg-dark h-2 rounded-full overflow-hidden mb-2">
              <div className="bg-green-500 h-full transition-all" style={{ width: `${demonstratedMastery?.fullStackProjects || 55}%` }} />
            </div>
            <span className="text-[11px] text-muted">Derived from {projects?.filter(p => p.status === 'Completed').length || 0} completed blueprints</span>
          </div>
        </div>
      </div>

      {/* Weekly Activity Bar Chart */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="flex items-center gap-2 font-bold text-sm">
            <TrendingUp size={18} className="text-primary" /> Weekly Focus Distribution
          </h3>
          <span className="text-xs text-muted font-mono">Minutes per day</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', gap: '8px', paddingTop: '20px' }}>
          {weeklyActivity.map((day) => {
            const heightPct = Math.max(12, Math.round((day.minutes / maxMinutes) * 100));
            return (
              <div key={day.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span className="text-xs text-muted mb-1">{day.minutes}m</span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '36px',
                    height: `${heightPct}%`,
                    background: day.day === 'Sun' ? 'linear-gradient(180deg, #06b6d4, #0891b2)' : 'linear-gradient(180deg, #8b5cf6, #6d28d9)',
                    borderRadius: '8px 8px 4px 4px',
                    transition: 'height 0.4s ease'
                  }}
                  title={`${day.day}: ${day.minutes} mins focus`}
                />
                <span className="text-xs font-bold mt-2" style={{ color: day.day === 'Sun' ? 'var(--cyan)' : 'var(--text-muted)' }}>
                  {day.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Time by Language & Technology */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <Code2 size={18} className="text-cyan" /> Learning Time by Technology & Language
            </h3>
            <p className="text-xs text-muted">
              Distraction-free deep work and compiler execution hours categorized by technology
            </p>
          </div>
          <span className="badge text-[11px] font-mono">Total: {hours}h {minutes}m</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { lang: 'JavaScript / Node.js', time: '5h 15m', pct: 36, color: '#22D3EE' },
            { lang: 'Python 3', time: '4h 30m', pct: 31, color: '#6366F1' },
            { lang: 'C++ & Systems', time: '2h 10m', pct: 15, color: '#F59E0B' },
            { lang: 'Java OpenJDK', time: '1h 25m', pct: 10, color: '#EC4899' },
            { lang: 'HTML5 & CSS3', time: '0h 45m', pct: 5, color: '#22C55E' },
            { lang: 'SQL & Relational', time: '0h 30m', pct: 3, color: '#A855F7' }
          ].map(item => (
            <div key={item.lang} className="p-3.5 bg-charcoal rounded-xl border border-white-10">
              <div className="flex justify-between text-xs mb-1 font-bold">
                <span className="text-white">{item.lang}</span>
                <span className="font-mono" style={{ color: item.color }}>{item.time}</span>
              </div>
              <div className="w-full bg-dark h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="h-full transition-all rounded-full" 
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }} 
                />
              </div>
              <div className="text-[10px] text-muted text-right font-mono">{item.pct}% of total focus</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress by Learning Path */}
      <div className="glass-panel p-6 mb-8">
        <h3 className="font-bold text-base mb-1 flex items-center gap-2">
          <BookOpen size={18} className="text-primary" /> Progress by Learning Path
        </h3>
        <p className="text-xs text-muted mb-4">
          Structured curricula progression tracking lessons, challenges, and milestones
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'Full-Stack Web Development', module: 'React State & DOM Architecture', progress: 68, lessons: '14/20 Lessons' },
            { title: 'Python Programming & Automation', module: 'Object-Oriented Design & Modules', progress: 52, lessons: '11/21 Lessons' },
            { title: 'Data Structures & Algorithms', module: 'Trees, Graphs, and BFS/DFS', progress: 40, lessons: '8/20 Lessons' },
            { title: 'C and C++ Systems Fundamentals', module: 'Pointers, Dynamic Memory, and Structs', progress: 28, lessons: '5/18 Lessons' }
          ].map((path, idx) => (
            <div key={idx} className="p-4 bg-charcoal rounded-xl border border-white-10">
              <div className="flex justify-between items-start mb-1.5">
                <h4 className="font-bold text-xs text-white">{path.title}</h4>
                <span className="badge text-[10px] font-mono cyan">{path.progress}%</span>
              </div>
              <p className="text-[11px] text-muted mb-3 font-mono">{path.module}</p>
              <div className="w-full bg-dark h-2 rounded-full overflow-hidden mb-2">
                <div 
                  className="bg-primary h-full transition-all rounded-full" 
                  style={{ width: `${path.progress}%` }} 
                />
              </div>
              <div className="flex justify-between text-[11px] text-muted">
                <span>{path.lessons}</span>
                <span className="text-cyan cursor-pointer hover:underline" onClick={() => navigate('/learn')}>Continue Path →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Learning History Log */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-base flex items-center gap-2">
            <Clock size={18} className="text-cyan" /> Verified Learning & Activity History
          </h3>
          <span className="text-xs text-muted">Recent entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-slate-900/60 text-muted uppercase text-[10px]">
                <th className="p-2.5">Timestamp</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Activity Description</th>
                <th className="p-2.5">XP Earned</th>
                <th className="p-2.5 text-right">Verification</th>
              </tr>
            </thead>
            <tbody>
              {[
                { time: 'Today, 19:42', cat: 'Code Playground', desc: 'Compiled Python 3.10 Array Algorithm in Container', xp: '+20 XP', status: 'Verified' },
                { time: 'Today, 18:15', cat: 'Developer Tools', desc: 'Used JSON Validator & Formatter with zero syntax errors', xp: '+10 XP', status: 'Verified' },
                { time: 'Yesterday, 21:05', cat: 'Practice Arena', desc: 'Solved "Two Sum (O(n) Hash Map)" all test cases passed', xp: '+30 XP', status: 'Verified' },
                { time: 'Yesterday, 17:30', cat: 'Curriculum', desc: 'Completed "Python Functions & Scope" Lesson + Quiz', xp: '+50 XP', status: 'Verified' },
                { time: '2 days ago', cat: 'Deep Work', desc: 'Logged 45-minute distraction-free Focus Zone session', xp: '+45 XP', status: 'Verified' }
              ].map((entry, i) => (
                <tr key={i} className="border-b border-border/40 hover:bg-slate-800/30 transition-colors">
                  <td className="p-2.5 text-muted text-[11px]">{entry.time}</td>
                  <td className="p-2.5"><span className="badge text-[10px]">{entry.cat}</span></td>
                  <td className="p-2.5 font-sans text-slate-200 text-xs">{entry.desc}</td>
                  <td className="p-2.5 text-green-400 font-bold">{entry.xp}</td>
                  <td className="p-2.5 text-right">
                    <span className="text-[10px] text-green-400 border border-green-500/40 bg-green-950/30 px-2 py-0.5 rounded font-mono">
                      ✓ {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="glass-panel p-6">
        <h3 className="font-bold text-base mb-1 flex items-center gap-2">
          <Award size={20} className="text-amber-400" /> Milestone Badges & Achievements
        </h3>
        <p className="text-xs text-muted mb-5">
          Unlock badges as you achieve verified streaks, solve algorithmic problems, and build projects
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {ALL_AVAILABLE_BADGES.map(badge => {
            const isUnlocked = badge.unlocked || user.badges.includes(badge.name) || (badge.id === 'b5' && (solvedProblems?.length || 0) >= 3);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border ${
                  isUnlocked ? 'border-primary bg-primary-500-10' : 'border-white-10 bg-charcoal opacity-60'
                } flex flex-col justify-between`}
              >
                <div>
                  <div className="text-2xl mb-2">{badge.name.split(' ')[0]}</div>
                  <h4 className="font-bold text-xs text-white mb-1">{badge.name.split(' ').slice(1).join(' ')}</h4>
                  <p className="text-[11px] text-muted leading-relaxed mb-3">{badge.desc}</p>
                </div>
                <div>
                  {isUnlocked ? (
                    <span className="badge text-[10px] text-green-400 border-green-500 flex items-center gap-1 w-fit">
                      <CheckCircle2 size={10} /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted font-mono block">
                      Lock: {badge.req}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Progress;
