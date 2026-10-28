import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Trophy, Medal, Target, CheckCircle2, Flame, ArrowRight } from 'lucide-react';
import './Competition.css';

const Competition = () => {
  const navigate = useNavigate();
  const { user, leaderboard, challenges, completeChallenge } = useUser();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'challenges'
  const [timeframe, setTimeframe] = useState('week'); // 'week', 'month', 'class', 'friends'

  // Dynamic leaderboard adjustments based on filter
  const displayedLeaderboard = leaderboard.map(u => {
    let multiplier = 1;
    if (timeframe === 'month') multiplier = 3.8;
    if (timeframe === 'friends') multiplier = 0.85;
    return {
      ...u,
      displayXp: Math.round(u.xp * multiplier)
    };
  }).sort((a, b) => b.displayXp - a.displayXp);

  return (
    <div className="competition-container fade-in">
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1>Academic Arena & Competition</h1>
          <p className="text-muted">Compete with peers, tackle AI challenges, and climb the ranks</p>
        </div>
        <div className="xp-badge flex items-center gap-2">
          <Flame size={20} className="text-accent" />
          <span className="font-bold">{user.xp}</span> XP
        </div>
      </header>

      <div className="tabs mb-6 flex gap-4">
        <button 
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={18} /> Global & Peer Leaderboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <Target size={18} /> Active Challenges ({challenges.length})
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="leaderboard-section">
          <div className="filters mb-4 flex gap-2 flex-wrap">
            <button 
              className={`filter-pill ${timeframe === 'week' ? 'active' : ''}`}
              onClick={() => setTimeframe('week')}
            >
              This Week
            </button>
            <button 
              className={`filter-pill ${timeframe === 'month' ? 'active' : ''}`}
              onClick={() => setTimeframe('month')}
            >
              This Month
            </button>
            <button 
              className={`filter-pill ${timeframe === 'class' ? 'active' : ''}`}
              onClick={() => setTimeframe('class')}
            >
              My University ({user.university || 'Tech University'})
            </button>
            <button 
              className={`filter-pill ${timeframe === 'friends' ? 'active' : ''}`}
              onClick={() => setTimeframe('friends')}
            >
              Study Squad
            </button>
          </div>

          <div className="glass-panel p-0 overflow-hidden">
            <div className="leaderboard-header">
              <div className="col-rank">Rank</div>
              <div className="col-user">Student Scholar</div>
              <div className="col-xp">XP Earned</div>
              <div className="col-badge">Badge</div>
            </div>
            <div className="leaderboard-list">
              {displayedLeaderboard.map((u, i) => (
                <div key={u.userId} className={`leaderboard-row ${u.userId === user.id ? 'highlight-row' : ''}`}>
                  <div className="col-rank">
                    {i === 0 && <Medal className="text-warning" size={24} />}
                    {i === 1 && <Medal className="text-gray-400" size={24} />}
                    {i === 2 && <Medal className="text-amber-700" size={24} />}
                    {i > 2 && <span className="rank-num">#{i + 1}</span>}
                  </div>
                  <div className="col-user flex items-center gap-3">
                    <div className="avatar-sm">{u.name.charAt(0)}</div>
                    <div>
                      <span className="font-bold">{u.name}</span>
                      {u.userId === user.id && <span className="ml-2 text-xs text-primary font-bold">(You)</span>}
                    </div>
                  </div>
                  <div className="col-xp font-bold text-primary">{u.displayXp}</div>
                  <div className="col-badge text-2xl">{u.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'challenges' && (
        <div className="challenges-section">
          {/* AI Challenge Banner */}
          <div className="ai-challenge-card glass-panel mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="badge-ai mb-2 inline-block">Adaptive AI Challenge</span>
                <h3 className="text-xl">Weekly DBMS Mastery Sprint</h3>
                <p className="text-sm text-muted mt-1">Conquer 3 core focus milestones to earn bonus multiplier XP.</p>
              </div>
              <div className="xp-reward">+250 XP</div>
            </div>
            
            <div className="challenge-tasks">
              <div className="challenge-task completed"><CheckCircle2 size={18} className="text-accent" /> 2 focus sessions completed</div>
              <div className="challenge-task"><div className="circle-empty"></div> 1 knowledge quiz passed</div>
              <div className="challenge-task"><div className="circle-empty"></div> 1 study note session</div>
            </div>
            
            <div className="flex gap-4 mt-4">
              <button className="primary flex items-center gap-2" onClick={() => navigate('/focus')}>
                Start Challenge Focus <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate('/tests')}>
                Take Quiz
              </button>
            </div>
          </div>

          <h3 className="mb-4">Available Challenges</h3>
          <div className="challenges-grid">
            {challenges.map(c => (
              <div key={c.id} className="challenge-card glass-panel flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h4>{c.title}</h4>
                  <span className="text-xs text-danger font-bold">{c.deadline}</span>
                </div>
                <ul className="mb-4 text-sm text-muted">
                  {c.requirements.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-white-10">
                  <span className="text-accent font-bold">+{c.xpReward} XP</span>
                  <button className="primary text-sm px-3 py-1" onClick={() => completeChallenge(c.id)}>
                    Complete & Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Competition;
