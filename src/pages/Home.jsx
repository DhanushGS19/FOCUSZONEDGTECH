import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle2, Flame, Trophy, Sparkles } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { user, goals, leaderboard, materials, classes } = useUser();
  const navigate = useNavigate();

  const activeGoal = goals[0]; // For demo, just pick the first goal
  const completedTasks = activeGoal?.tasks.filter(t => t.completed).length || 0;
  const totalTasks = activeGoal?.tasks.length || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const userRank = leaderboard.find(u => u.userId === user.id)?.rank;

  return (
    <div className="home-dashboard fade-in">
      <header className="dashboard-header mb-4">
        <h1>Good morning, {user.name.split(' ')[0]} 👋</h1>
        <p className="text-muted">Ready to crush your goals today?</p>
      </header>

      <div className="dashboard-grid">
        {/* Today's Focus */}
        <section className="glass-panel col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl flex items-center gap-2">
              <Sparkles className="text-primary" /> Today's Focus
            </h2>
            <span className="deadline-badge">Due in {activeGoal?.deadline}</span>
          </div>
          
          <div className="focus-card-content">
            <div className="focus-details">
              <h3>{activeGoal?.title}</h3>
              <div className="progress-container mt-4 mb-4">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              <button className="primary flex items-center gap-2" onClick={() => navigate('/focus')}>
                <Play size={18} fill="currentColor" /> Start Focus Session
              </button>
            </div>
            
            <div className="study-plan-mini">
              <h4>Study Plan Tasks</h4>
              <ul className="task-list mt-4">
                {activeGoal?.tasks.slice(0,4).map(task => (
                  <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <CheckCircle2 size={18} className={task.completed ? 'text-accent' : 'text-muted'} />
                    <span>{task.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Stats & Competition */}
        <div className="flex-col gap-4">
          <section className="glass-panel stats-card flex justify-between items-center">
            <div>
              <h3 className="text-muted text-sm font-bold uppercase tracking-wider mb-1">Current Streak</h3>
              <div className="flex items-center gap-2 text-3xl font-bold">
                <Flame className="text-accent" size={32} /> {user.streak} Days
              </div>
            </div>
            <div className="text-right">
              <h3 className="text-muted text-sm font-bold uppercase tracking-wider mb-1">Total XP</h3>
              <div className="text-3xl font-bold text-primary">{user.xp}</div>
            </div>
          </section>

          <section className="glass-panel competition-card text-center relative overflow-hidden">
            <div className="bg-glow"></div>
            <Trophy className="text-accent mb-2 mx-auto" size={40} />
            <h3 className="mb-2">You are #{userRank} this week</h3>
            <p className="text-sm text-muted mb-4">Keep learning to climb the leaderboard!</p>
            <button className="w-full" onClick={() => navigate('/competition')}>View Leaderboard</button>
          </section>
        </div>

        {/* Recommended Learning */}
        <section className="glass-panel col-span-3">
          <h2 className="mb-4">Recommended for {activeGoal?.subject}</h2>
          <div className="recommendations-grid">
            {materials.filter(m => m.subject === activeGoal?.subject).slice(0, 2).map(m => (
              <div key={m.id} className="rec-card" onClick={() => navigate('/learn')}>
                <div className="rec-icon">📚</div>
                <div className="rec-info">
                  <h4>{m.title}</h4>
                  <p className="text-xs text-muted">{m.category}</p>
                </div>
              </div>
            ))}
            {classes.filter(c => c.title.includes(activeGoal?.subject)).slice(0, 1).map(c => (
              <div key={c.id} className="rec-card class-card" onClick={() => navigate('/learn')}>
                <div className="rec-icon">🎓</div>
                <div className="rec-info">
                  <h4>{c.title}</h4>
                  <p className="text-xs text-muted">Masterclass</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
