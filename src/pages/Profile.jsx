import React from 'react';
import { useUser } from '../context/UserContext';
import { Award, Timer, Target } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const { xp, level, currentLevelXp } = useUser();

  const milestones = [
    { name: "First Focus", desc: "Complete 1 focus session", done: true },
    { name: "Quiz Master", desc: "Score 100% on a test", done: xp > 100 },
    { name: "Marathon", desc: "Focus for 45 minutes", done: false },
    { name: "Centurion", desc: "Reach Level 5", done: level >= 5 },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header glass-panel">
        <div className="avatar">
          <div className="avatar-3d"></div>
        </div>
        <div className="profile-info">
          <h1>Student Warrior</h1>
          <p className="text-muted text-xl mb-4">Level {level} Scholar</p>
          
          <div className="progress-bar-bg" style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
            <div className="progress-bar-fill" style={{ width: `${(currentLevelXp / 100) * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>
          </div>
          <p className="text-sm mt-2">{currentLevelXp} / 100 XP to Level {level + 1}</p>
        </div>
      </div>

      <div className="stats-grid mt-4 mb-8">
        <div className="glass-panel text-center">
          <Target className="mb-2 text-accent" size={32} style={{ margin: '0 auto' }} />
          <h3 className="text-3xl font-bold">{xp}</h3>
          <p className="text-muted">Total XP</p>
        </div>
        <div className="glass-panel text-center">
          <Timer className="mb-2 text-primary" size={32} style={{ margin: '0 auto' }} />
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-muted">Sessions</p>
        </div>
        <div className="glass-panel text-center">
          <Award className="mb-2 text-danger" size={32} style={{ margin: '0 auto' }} />
          <h3 className="text-3xl font-bold">{level}</h3>
          <p className="text-muted">Current Level</p>
        </div>
      </div>

      <h2 className="mb-4">Achievements</h2>
      <div className="achievements-list">
        {milestones.map(m => (
          <div key={m.name} className={`achievement-card ${m.done ? 'unlocked' : 'locked'}`}>
            <div className="achieve-icon">
              <Award size={24} />
            </div>
            <div>
              <h3>{m.name}</h3>
              <p className="text-muted text-sm">{m.desc}</p>
            </div>
            <div className="status-badge ml-auto">
              {m.done ? 'Unlocked' : 'Locked'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
