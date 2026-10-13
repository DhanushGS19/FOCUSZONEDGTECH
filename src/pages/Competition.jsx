import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Trophy, Medal, Target, Flame, Users, Gift, CheckCircle2 } from 'lucide-react';
import './Competition.css';

const Competition = () => {
  const { user, leaderboard, challenges, completeChallenge } = useUser();
  const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'challenges'

  return (
    <div className="competition-container fade-in">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1>Competition</h1>
          <p className="text-muted">Learn together, compete together</p>
        </div>
        <div className="xp-badge">
          <span className="font-bold">{user.xp}</span> XP
        </div>
      </header>

      <div className="tabs mb-6 flex gap-4">
        <button 
          className={`tab-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Trophy size={18} /> Leaderboard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <Target size={18} /> Challenges
        </button>
      </div>

      {activeTab === 'leaderboard' && (
        <div className="leaderboard-section">
          <div className="filters mb-4">
            <button className="filter-pill active">This Week</button>
            <button className="filter-pill">This Month</button>
            <button className="filter-pill">My Class</button>
            <button className="filter-pill">My Friends</button>
          </div>

          <div className="glass-panel p-0 overflow-hidden">
            <div className="leaderboard-header">
              <div className="col-rank">Rank</div>
              <div className="col-user">Student</div>
              <div className="col-xp">XP</div>
              <div className="col-badge">Badge</div>
            </div>
            <div className="leaderboard-list">
              {leaderboard.map((u, i) => (
                <div key={u.userId} className={`leaderboard-row ${u.userId === user.id ? 'highlight-row' : ''}`}>
                  <div className="col-rank">
                    {i === 0 && <Medal className="text-warning" size={24} />}
                    {i === 1 && <Medal className="text-gray-400" size={24} />}
                    {i === 2 && <Medal className="text-amber-700" size={24} />}
                    {i > 2 && <span className="rank-num">#{u.rank}</span>}
                  </div>
                  <div className="col-user flex items-center gap-3">
                    <div className="avatar-sm">{u.name.charAt(0)}</div>
                    <span className="font-bold">{u.name}</span>
                  </div>
                  <div className="col-xp font-bold text-primary">{u.xp}</div>
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
                <span className="badge-ai mb-2 inline-block">Your AI Challenge</span>
                <h3 className="text-xl">You have been studying DBMS this week.</h3>
              </div>
              <div className="xp-reward">+250 XP</div>
            </div>
            
            <div className="challenge-tasks">
              <div className="challenge-task completed"><CheckCircle2 size={18} /> 2 focus sessions</div>
              <div className="challenge-task"><div className="circle-empty"></div> 1 quiz</div>
              <div className="challenge-task"><div className="circle-empty"></div> 1 learning module</div>
            </div>
            
            <button className="primary mt-4 w-full">Continue Challenge</button>
          </div>

          <h3 className="mb-4">Available Challenges</h3>
          <div className="challenges-grid">
            {challenges.map(c => (
              <div key={c.id} className="challenge-card glass-panel">
                <div className="flex justify-between items-start mb-2">
                  <h4>{c.title}</h4>
                  <span className="text-xs text-danger font-bold">{c.deadline}</span>
                </div>
                <ul className="mb-4 text-sm text-muted">
                  {c.requirements.map((r, i) => (
                    <li key={i}>• {r}</li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-accent font-bold">+{c.xpReward} XP</span>
                  <button className="text-btn primary-text text-sm" onClick={() => completeChallenge(c.id)}>Claim Mock</button>
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
