import React from 'react';
import { useUser } from '../context/UserContext';
import { LineChart, Clock, Target, Zap, BookOpen } from 'lucide-react';
import './Progress.css';

const Progress = () => {
  const { user, goals } = useUser();
  const completedGoals = goals.filter(g => g.progress === 100).length;
  
  return (
    <div className="progress-container fade-in">
      <header className="mb-6">
        <h1>Progress Analytics</h1>
        <p className="text-muted">Track your learning journey</p>
      </header>

      <div className="stats-grid mb-8">
        <div className="glass-panel stat-box text-center">
          <Clock className="text-primary mx-auto mb-2" size={28} />
          <div className="text-3xl font-bold mb-1">14h 30m</div>
          <div className="text-sm text-muted">Focus Time (This Week)</div>
        </div>
        <div className="glass-panel stat-box text-center">
          <Target className="text-accent mx-auto mb-2" size={28} />
          <div className="text-3xl font-bold mb-1">{completedGoals}</div>
          <div className="text-sm text-muted">Goals Completed</div>
        </div>
        <div className="glass-panel stat-box text-center">
          <Zap className="text-warning mx-auto mb-2" size={28} />
          <div className="text-3xl font-bold mb-1">{user.streak}</div>
          <div className="text-sm text-muted">Current Streak</div>
        </div>
        <div className="glass-panel stat-box text-center">
          <BookOpen className="text-primary mx-auto mb-2" size={28} />
          <div className="text-3xl font-bold mb-1">85%</div>
          <div className="text-sm text-muted">Quiz Avg</div>
        </div>
      </div>

      <div className="progress-insights mb-8 glass-panel">
        <h3 className="mb-4">AI Insights</h3>
        <p className="insight-text flex items-center gap-2">
          <span className="insight-dot good"></span>
          Your strongest study time appears to be between 7 PM and 9 PM.
        </p>
        <p className="insight-text flex items-center gap-2">
          <span className="insight-dot warning"></span>
          You are spending 40% less time on Java compared to DBMS.
        </p>
      </div>

      <h2 className="mb-4">Subject Mastery</h2>
      <div className="subject-mastery-list">
        <div className="glass-panel subject-mastery-card mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-bold">DBMS</span>
            <span className="text-accent">80%</span>
          </div>
          <div className="progress-bar-bg mb-2"><div className="progress-bar-fill" style={{width: '80%'}}></div></div>
          <div className="text-xs text-muted">Strong in: ER Model, SQL. Weak in: Normalization.</div>
        </div>
        
        <div className="glass-panel subject-mastery-card mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Java</span>
            <span className="text-primary">60%</span>
          </div>
          <div className="progress-bar-bg mb-2"><div className="progress-bar-fill" style={{width: '60%'}}></div></div>
          <div className="text-xs text-muted">Strong in: Basics. Weak in: Multithreading.</div>
        </div>

        <div className="glass-panel subject-mastery-card mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-bold">AI/ML</span>
            <span className="text-danger">40%</span>
          </div>
          <div className="progress-bar-bg mb-2"><div className="progress-bar-fill bg-danger-gradient" style={{width: '40%'}}></div></div>
          <div className="text-xs text-muted">Needs more focus time this week.</div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
