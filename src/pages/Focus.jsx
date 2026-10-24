import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Play, Pause, CheckSquare, BrainCircuit, X } from 'lucide-react';
import './Focus.css';

const Focus = () => {
  const navigate = useNavigate();
  const { goals, completeTask, completeFocusSession } = useUser();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  
  // Get first incomplete task from first goal
  const activeGoal = goals[0];
  const activeTask = activeGoal?.tasks.find(t => !t.completed);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      handleCompleteSession();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const handleCompleteSession = () => {
    setIsActive(false);
    setSessionComplete(true);
    completeFocusSession(25);
  };

  const handleCompleteTask = () => {
    if (activeGoal && activeTask) {
      completeTask(activeGoal.id, activeTask.id);
    }
    handleCompleteSession();
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (sessionComplete) {
    return (
      <div className="focus-container fade-in">
        <div className="glass-panel text-center success-panel">
          <div className="confetti-icon">🎉</div>
          <h1 className="text-4xl mb-4">Focus Session Complete!</h1>
          <p className="text-xl text-primary mb-6">+50 XP Earned</p>
          <div className="stats-row flex justify-center gap-4 mb-8">
            <div className="stat-pill">25 minutes focused</div>
            <div className="stat-pill">1 task completed</div>
          </div>
          <button className="primary" onClick={() => {
            setSessionComplete(false);
            setTimeLeft(25 * 60);
          }}>Start New Session</button>
        </div>
      </div>
    );
  }

  return (
    <div className="focus-container fade-in">
      <div className="glass-panel focus-main-panel text-center relative overflow-hidden">
        {isActive && <div className="focus-pulse"></div>}
        
        <h2 className="text-muted mb-2 uppercase tracking-wider text-sm font-bold">FOCUS SESSION</h2>
        <h3 className="text-2xl mb-8">{activeGoal?.subject} — {activeTask?.title || 'Free Study'}</h3>
        
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
        
        <div className="progress-bar-bg timer-progress mb-8 max-w-md mx-auto">
          <div className="progress-bar-fill" style={{ width: `${((25*60 - timeLeft) / (25*60)) * 100}%` }}></div>
        </div>
        
        <div className="flex justify-center gap-4">
          <button className="timer-btn primary" onClick={toggleTimer}>
            {isActive ? <Pause size={24} /> : <Play size={24} />} 
            {isActive ? 'Pause' : 'Start Focus'}
          </button>
          
          <button className="timer-btn bg-danger text-white hover-danger" onClick={() => {
            setIsActive(false);
            setTimeLeft(25 * 60);
          }}>
            <X size={24} /> Reset
          </button>
        </div>
      </div>
      
      <div className="focus-actions flex justify-center gap-4 mt-6">
        <button className="action-btn stuck-btn" onClick={() => navigate('/chat')}>
          <BrainCircuit size={20} /> I'm Stuck (AI Help)
        </button>
        <button className="action-btn complete-btn" onClick={handleCompleteTask}>
          <CheckSquare size={20} /> Complete Task Early
        </button>
      </div>
    </div>
  );
};

export default Focus;
