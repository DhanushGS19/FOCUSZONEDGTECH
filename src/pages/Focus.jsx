import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, AlertOctagon, MessageCircle, Search } from 'lucide-react';
import { useUser } from '../context/UserContext';
import AuraBot from '../components/AuraBot';
import SafeSearchWidget from '../components/SafeSearchWidget';
import './Focus.css';

const Focus = () => {
  const { addXp } = useUser();
  const [duration, setDuration] = useState(25); // 15, 25, 30, 45
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [activeWidget, setActiveWidget] = useState('none'); // 'none', 'chat', 'search'

  const containerRef = useRef(null);

  const timerOptions = [
    { label: '15m', value: 15 },
    { label: '25m', value: 25 },
    { label: '30m', value: 30 },
    { label: '45m', value: 45 },
  ];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      setActiveWidget('none');
      const xpEarned = duration * 2; 
      addXp(xpEarned);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
      alert(`Session complete! You earned ${xpEarned} XP.`);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, duration, addXp]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Opening a new tab from Safe Search technically triggers visibilitychange if the new tab gets focus
      // But for this prototype, we'll keep the strict warning
      if (isActive && document.hidden) {
        setWarningCount(prev => prev + 1);
        setShowWarning(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  const toggleTimer = async () => {
    if (!isActive) {
      setTimeLeft(duration * 60);
      setIsActive(true);
      setWarningCount(0);
      setShowWarning(false);
      try {
        if (containerRef.current && !document.fullscreenElement) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.warn("Fullscreen request failed", err);
      }
    } else {
      setIsActive(false);
      setActiveWidget('none');
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => console.log(err));
      }
    }
  };

  const selectDuration = (mins) => {
    if (!isActive) {
      setDuration(mins);
      setTimeLeft(mins * 60);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`focus-container ${isActive ? 'active-mode' : ''}`} ref={containerRef}>
      {showWarning && (
        <div className="distraction-warning">
          <AlertOctagon size={48} color="#ef4444" />
          <h2>Stay Focused!</h2>
          <p>You left the tab. Don't lose your streak!</p>
          <button className="primary" onClick={() => setShowWarning(false)}>I'm Back</button>
        </div>
      )}
      
      {!isActive && (
        <div className="focus-header">
          <h1>Deep Work Session</h1>
          <p className="text-muted">Pick a duration and enter the zone. Other apps will be hidden in fullscreen mode.</p>
        </div>
      )}
      
      {isActive && !showWarning && (
        <div className="focus-header" style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
            <AlertOctagon /> DND MODE ACTIVE
          </h2>
          <p className="text-muted">Stay on this screen. Focus!</p>
        </div>
      )}

      <div className="timer-display-wrapper" style={{ transition: 'all 0.5s', transform: activeWidget !== 'none' ? 'translateX(-150px) scale(0.8)' : 'none' }}>
        <div className={`pulse-ring ${isActive ? 'pulsing' : ''}`}></div>
        <div className="timer-display">
          {formatTime(timeLeft)}
        </div>
      </div>

      {!isActive && (
        <div className="duration-selector">
          {timerOptions.map(opt => (
            <button 
              key={opt.value}
              className={`duration-btn ${duration === opt.value ? 'selected' : ''}`}
              onClick={() => selectDuration(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className="controls mt-4">
        <button className={`control-btn ${isActive ? 'stop' : 'start'}`} onClick={toggleTimer} style={{ zIndex: 2 }}>
          {isActive ? <><Square size={20} /> End Session</> : <><Play size={20} /> Start Focus</>}
        </button>
      </div>
      
      {isActive && warningCount > 0 && (
        <div className="warnings-tracker">
          Distractions: {warningCount}
        </div>
      )}

      {/* Floating Widgets for Active Mode */}
      {isActive && (
        <div className="floating-tools-dock">
          <button 
            className={`tool-icon-btn ${activeWidget === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveWidget(prev => prev === 'chat' ? 'none' : 'chat')}
            title="Ask Aura"
          >
            <MessageCircle />
          </button>
          <button 
            className={`tool-icon-btn ${activeWidget === 'search' ? 'active' : ''}`}
            onClick={() => setActiveWidget(prev => prev === 'search' ? 'none' : 'search')}
            title="Safe Search"
          >
            <Search />
          </button>
        </div>
      )}

      {/* Side Panels */}
      <div className={`side-widget-panel ${activeWidget !== 'none' ? 'open' : ''}`}>
        {activeWidget === 'chat' && <AuraBot isWidget={true} />}
        {activeWidget === 'search' && <SafeSearchWidget />}
      </div>
    </div>
  );
};

export default Focus;
