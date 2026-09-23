import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Trophy, BookOpen, Star } from 'lucide-react';
import './Home.css';
import { useUser } from '../context/UserContext';

const Home = () => {
  const navigate = useNavigate();
  const { xp, level, currentLevelXp, xpForNextLevel } = useUser();

  const subjects = [
    { name: 'Mathematics', color: '#3b82f6', icon: '📐' },
    { name: 'Science', color: '#10b981', icon: '🔬' },
    { name: 'History', color: '#f59e0b', icon: '🏛️' },
    { name: 'Coding', color: '#8b5cf6', icon: '💻' }
  ];

  return (
    <div className="home-container">
      <header className="home-header">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back to the Zone.</h1>
          <p className="text-muted">You are currently Level {level}. Keep the streak alive!</p>
        </div>
        <button className="primary" onClick={() => navigate('/focus')}>
          <Play size={18} style={{ marginRight: '8px', display: 'inline', verticalAlign: 'middle' }} />
          Start Focus Session
        </button>
      </header>

      <section className="dashboard-grid">
        <div className="glass-panel quick-stats">
          <h3 className="mb-4 flex items-center gap-2"><Star style={{ color: 'var(--accent)' }} /> Your Progress</h3>
          <div className="stat-row">
            <span className="stat-label">Total XP</span>
            <span className="stat-value">{xp}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Current Level</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="progress-bar-bg mt-4">
            <div className="progress-bar-fill" style={{ width: `${(currentLevelXp / 100) * 100}%` }}></div>
          </div>
          <p className="text-xs text-muted mt-2" style={{ fontSize: '0.75rem' }}>{100 - currentLevelXp} XP to Level {level + 1}</p>
        </div>

        <div className="glass-panel weekend-event">
          <div className="event-badge">LIVE NOW</div>
          <h3 className="text-2xl font-bold mb-2">Weekend MCQ Battle</h3>
          <p className="mb-4">Compete with others in the Science mega-quiz and win up to 500 XP!</p>
          <button onClick={() => navigate('/tests')}>
            Join Competition <Trophy size={16} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }}/>
          </button>
        </div>
      </section>

      <section className="subjects-section">
        <h2 className="mb-4 flex items-center gap-2" style={{ marginTop: '2rem' }}><BookOpen /> Core Subjects</h2>
        <div className="subjects-grid">
          {subjects.map(sub => (
            <div key={sub.name} className="subject-card" style={{ '--sub-color': sub.color }}>
              <div className="subject-icon">{sub.icon}</div>
              <h3>{sub.name}</h3>
              <p>Explore lessons & quizzes</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
