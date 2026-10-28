import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, 
  Clock, History, Shield, Lock, Unlock, AlertTriangle, 
  MessageSquare, Search, CheckCircle2, Flame, BrainCircuit, X, Sparkles, Check
} from 'lucide-react';
import AuraBot from '../components/AuraBot';
import SafeSearchWidget from '../components/SafeSearchWidget';
import './Focus.css';

const PRESETS = [
  { label: 'Sprint', minutes: 15 },
  { label: 'Pomodoro', minutes: 25 },
  { label: 'Deep Work', minutes: 30 },
  { label: 'Extended', minutes: 45 },
  { label: 'Ultra Focus', minutes: 60 }
];

const Focus = () => {
  const navigate = useNavigate();
  const { 
    recordFocusSession, focusSessions, projects, addXp 
  } = useUser();

  const [presetMinutes, setPresetMinutes] = useState(25);
  const [customMinutesInput, setCustomMinutesInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // ==========================================
  // DND TIME LOCK STATE & DISTRACTION TRACKING
  // ==========================================
  const [isDndMode, setIsDndMode] = useState(true); // Strict DND Time Lock
  const [distractionCount, setDistractionCount] = useState(0);
  const [showDistractionWarning, setShowDistractionWarning] = useState(false);
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState(null);
  
  // Emergency Unlock Holding State (3 seconds hold required to cancel during DND lock)
  const [unlockProgress, setUnlockProgress] = useState(0);
  const unlockTimerRef = useRef(null);

  // In-session Support Widgets ('none' | 'chat' | 'search')
  const [activeSideWidget, setActiveSideWidget] = useState('none');

  // Association Target: 'Track' | 'Challenge' | 'Project'
  const [assocType, setAssocType] = useState('Track');
  const [assocTitle, setAssocTitle] = useState('Python: Variables & Data Types');

  // Audio Context Ref for Synthesized Pink Noise & Chimes
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const endTimeRef = useRef(null);
  const focusContainerRef = useRef(null);

  // Synthesize Victory / Completion Chime or Warning Buzzer
  const playChime = useCallback((isSuccess = true) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (isSuccess) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25); // A5
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      } else {
        // Warning Buzzer for tab switch
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(180, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + (isSuccess ? 1.2 : 0.6));
    } catch {}
  }, []);

  // Complete Session Handler
  const handleCompleteSession = useCallback(() => {
    setIsActive(false);
    endTimeRef.current = null;
    
    // Calculate Earned XP (Base duration + perfect focus bonus if 0 distractions)
    const flawlessBonus = (isDndMode && distractionCount === 0) ? 15 : 0;
    const totalEarnedXp = Math.round(presetMinutes * 2) + flawlessBonus;

    // Record session history
    recordFocusSession({
      durationMinutes: presetMinutes,
      associatedType: assocType,
      associatedTitle: assocTitle,
      completed: true
    });

    if (flawlessBonus > 0 && addXp) {
      addXp(flawlessBonus);
    }

    setSessionCompletedNotice({
      minutes: presetMinutes,
      distractions: distractionCount,
      earnedXp: totalEarnedXp,
      flawless: distractionCount === 0
    });

    playChime(true);

    // Stop ambient noise if running
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch {}
      noiseNodeRef.current = null;
    }
  }, [assocType, assocTitle, distractionCount, isDndMode, playChime, presetMinutes, recordFocusSession, addXp]);

  // Accurate Timer Tick (using timestamp delta to avoid tab throttling)
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (!endTimeRef.current) {
          endTimeRef.current = Date.now() + timeLeft * 1000;
        }
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
          handleCompleteSession();
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleCompleteSession]);

  // ==========================================
  // DND TIME LOCK: TAB-SWITCH DISTRACTION GUARD
  // ==========================================
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (isActive && document.hidden) {
        setDistractionCount(prev => prev + 1);
        setShowDistractionWarning(true);
        playChime(false);
      } else if (document.visibilityState === 'visible' && isActive && endTimeRef.current) {
        const remaining = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
        setTimeLeft(remaining);
        if (remaining <= 0) {
          handleCompleteSession();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isActive, handleCompleteSession, playChime]);

  // ==========================================
  // DND TIME LOCK: EXIT / UNLOAD GUARD
  // ==========================================
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isActive && isDndMode) {
        e.preventDefault();
        e.returnValue = 'DND Time Lock is engaged! Leaving will forfeit your focus session and streak!';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isActive, isDndMode]);

  // Ambient sound synthesizer using Web Audio API buffer noise
  const toggleAmbientSound = () => {
    if (ambientAudio) {
      if (noiseNodeRef.current) {
        try { noiseNodeRef.current.stop(); } catch {}
        noiseNodeRef.current = null;
      }
      setAmbientAudio(false);
    } else {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioContext();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = buffer;
        whiteNoise.loop = true;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.04, ctx.currentTime);

        whiteNoise.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start(0);

        noiseNodeRef.current = whiteNoise;
        setAmbientAudio(true);
      } catch {
        setAmbientAudio(false);
      }
    }
  };

  const handleSelectPreset = (mins) => {
    if (isActive && isDndMode) return;
    setIsActive(false);
    endTimeRef.current = null;
    setPresetMinutes(mins);
    setTimeLeft(mins * 60);
    setSessionCompletedNotice(null);
  };

  const handleApplyCustomMinutes = (e) => {
    e.preventDefault();
    if (isActive && isDndMode) return;
    const parsed = parseInt(customMinutesInput, 10);
    if (!isNaN(parsed) && parsed > 0 && parsed <= 180) {
      handleSelectPreset(parsed);
      setCustomMinutesInput('');
    }
  };

  const toggleTimer = async () => {
    if (!isActive) {
      endTimeRef.current = Date.now() + timeLeft * 1000;
      setIsActive(true);
      setDistractionCount(0);
      setShowDistractionWarning(false);
      setSessionCompletedNotice(null);

      // Auto fullscreen if DND Lock mode is on
      if (isDndMode && !document.fullscreenElement) {
        try {
          if (focusContainerRef.current?.requestFullscreen) {
            await focusContainerRef.current.requestFullscreen();
            setIsFullscreen(true);
          }
        } catch {}
      }
    } else {
      if (!isDndMode) {
        endTimeRef.current = null;
        setIsActive(false);
      }
    }
  };

  // Normal Reset (Allowed only when NOT in DND mode or session inactive)
  const handleResetTimer = () => {
    if (isActive && isDndMode) return;
    if (isActive) {
      recordFocusSession({
        durationMinutes: presetMinutes,
        associatedType: assocType,
        associatedTitle: assocTitle,
        completed: false
      });
    }
    setIsActive(false);
    endTimeRef.current = null;
    setTimeLeft(presetMinutes * 60);
    setSessionCompletedNotice(null);
  };

  // ==========================================
  // EMERGENCY UNLOCK: 3-SECOND PRESS AND HOLD
  // ==========================================
  const startEmergencyUnlockHold = () => {
    if (!isActive || !isDndMode) return;
    let progress = 0;
    unlockTimerRef.current = setInterval(() => {
      progress += 5;
      setUnlockProgress(progress);
      if (progress >= 100) {
        clearInterval(unlockTimerRef.current);
        unlockTimerRef.current = null;
        setUnlockProgress(0);
        // Break Lock
        recordFocusSession({
          durationMinutes: presetMinutes,
          associatedType: assocType,
          associatedTitle: assocTitle,
          completed: false
        });
        setIsActive(false);
        endTimeRef.current = null;
        setTimeLeft(presetMinutes * 60);
        if (document.fullscreenElement) {
          try { document.exitFullscreen(); } catch {}
          setIsFullscreen(false);
        }
      }
    }, 150);
  };

  const cancelEmergencyUnlockHold = () => {
    if (unlockTimerRef.current) {
      clearInterval(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
    setUnlockProgress(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(
    100,
    Math.round(((presetMinutes * 60 - timeLeft) / (presetMinutes * 60)) * 100)
  );

  return (
    <div className={`focus-container fade-in ${isActive && isDndMode ? 'dnd-locked' : ''}`} ref={focusContainerRef}>
      
      {/* ======================================================== */}
      {/* 1. DISTRACTION WARNING MODAL (TAB-SWITCH DETECTOR) */}
      {/* ======================================================== */}
      {showDistractionWarning && (
        <div className="dnd-modal-overlay">
          <div className="dnd-modal-card surface-card p-6 max-w-md w-full text-center fade-in">
            <div className="w-16 h-16 rounded-full bg-danger-subtle border border-danger mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle size={32} className="text-danger" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">DND Time Lock Alert!</h2>
            <p className="text-sm text-secondary mb-4 leading-relaxed">
              You switched away from your active focus screen. Deep work requires unbroken immersion. Stay locked in to earn full streak XP!
            </p>
            <div className="p-3 rounded bg-black-30 border border-white-10 mb-5 flex justify-between items-center text-xs">
              <span className="text-muted">Total Tab-Switches Tracked:</span>
              <span className="font-mono font-bold text-warning">{distractionCount} violation{distractionCount > 1 ? 's' : ''}</span>
            </div>
            <button
              type="button"
              className="btn-primary w-full py-2.5 font-bold text-sm"
              onClick={() => {
                setShowDistractionWarning(false);
                if (isDndMode && !document.fullscreenElement) {
                  try { focusContainerRef.current?.requestFullscreen(); } catch {}
                }
              }}
            >
              Resume Focus Session
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. SESSION COMPLETED NOTICE */}
      {/* ======================================================== */}
      {sessionCompletedNotice && (
        <div className="surface-card p-5 border-emerald-500-30 bg-emerald-500-10 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald text-dark flex items-center justify-center font-bold">
              <Check size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Focus Session Complete!</h3>
              <p className="text-xs text-muted">
                Completed {sessionCompletedNotice.minutes}m deep work • {sessionCompletedNotice.distractions === 0 ? 'Flawless 0 distractions!' : `${sessionCompletedNotice.distractions} tab-switches`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge emerald text-xs font-mono font-bold">+{sessionCompletedNotice.earnedXp} XP Earned</span>
            <button
              type="button"
              className="btn-secondary text-xs py-1.5 px-3"
              onClick={() => setSessionCompletedNotice(null)}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. HERO & DND TIME LOCK CONTROL BANNER */}
      {/* ======================================================== */}
      <header className="focus-header-deck flex justify-between items-center flex-wrap gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="badge">Engineering Productivity</span>
            <span className={`badge ${isDndMode ? 'emerald' : 'cyan'}`}>
              {isDndMode ? '🔒 DND Time Lock Armed' : '⏱️ Standard Timer'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2.5">
            <Clock className="text-primary" size={28} /> Focus Studio & DND Time Lock
          </h1>
          <p className="text-muted text-xs md:text-sm">
            Strict distraction-blocking environment with synthesized ambient noise, tab-switch telemetry, and locked sessions.
          </p>
        </div>

        {/* DND Time Lock Switcher Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`dnd-toggle-btn ${isDndMode ? 'active' : ''}`}
            onClick={() => !isActive && setIsDndMode(!isDndMode)}
            disabled={isActive}
            title={isActive ? 'Cannot change mode during active session' : 'Toggle strict DND Time Lock'}
          >
            {isDndMode ? <Lock size={15} className="text-emerald" /> : <Unlock size={15} />}
            <span className="text-xs font-semibold">
              {isDndMode ? 'Strict DND Lock: ACTIVE' : 'Standard Focus Mode'}
            </span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 4. MAIN FOCUS DECK */}
      {/* ======================================================== */}
      <div className="focus-main-panel surface-card p-6 md:p-8 relative overflow-hidden">
        {isActive && <div className="focus-pulse-glow" />}

        {/* Active DND Lock Status Bar */}
        {isActive && isDndMode && (
          <div className="dnd-active-strip mb-6 p-3 rounded-lg bg-emerald-500-10 border border-emerald flex justify-between items-center flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald">
              <Lock size={16} /> DND TIME LOCK ENGAGED
            </div>
            <div className="flex items-center gap-4 text-2xs font-mono text-muted">
              <span>Exit Guard: Enabled</span>
              <span className={`font-bold ${distractionCount > 0 ? 'text-warning' : 'text-emerald'}`}>
                Distractions: {distractionCount}
              </span>
            </div>
          </div>
        )}

        {/* Preset & Custom Duration Toolbar */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap items-center">
            {PRESETS.map(preset => (
              <button
                key={preset.label}
                type="button"
                className={`filter-pill text-xs ${presetMinutes === preset.minutes ? 'active' : ''}`}
                onClick={() => handleSelectPreset(preset.minutes)}
                disabled={isActive && isDndMode}
              >
                {preset.label} ({preset.minutes}m)
              </button>
            ))}

            {/* Custom Minutes Input */}
            <form onSubmit={handleApplyCustomMinutes} className="flex items-center gap-1.5 ml-1">
              <input
                type="number"
                min="1"
                max="180"
                placeholder="Custom m"
                value={customMinutesInput}
                onChange={(e) => setCustomMinutesInput(e.target.value)}
                disabled={isActive && isDndMode}
                className="p-1.5 text-xs bg-dark rounded border border-border w-20 text-center font-mono text-white"
              />
              <button 
                type="submit" 
                className="btn-secondary text-xs px-2.5 py-1.5"
                disabled={isActive && isDndMode}
              >
                Set
              </button>
            </form>
          </div>

          {/* Sound & Fullscreen Utility Controls */}
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className={`icon-btn ${ambientAudio ? 'active-audio' : ''}`}
              onClick={toggleAmbientSound}
              title={ambientAudio ? 'Mute Focus Pink Noise' : 'Play Focus Pink Noise'}
              aria-label="Toggle ambient noise"
            >
              {ambientAudio ? <Volume2 size={16} className="text-emerald" /> : <VolumeX size={16} />}
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* Learning Focus Target Selector */}
        <div className="mb-8 p-3.5 bg-black-20 rounded-lg border border-border">
          <label className="text-2xs text-muted uppercase tracking-wider block mb-2 font-bold flex items-center gap-1.5">
            <Clock size={12} className="text-primary" /> Learning Focus Target
          </label>
          <div className="grid grid-cols-12 gap-2">
            <select
              value={assocType}
              onChange={(e) => {
                setAssocType(e.target.value);
                if (e.target.value === 'Track') setAssocTitle('Python: Variables & Data Types');
                if (e.target.value === 'Challenge') setAssocTitle('Valid Parentheses (DSA)');
                if (e.target.value === 'Project') setAssocTitle('Interactive Web Calculator');
              }}
              disabled={isActive && isDndMode}
              className="col-span-12 sm:col-span-4 p-2 bg-dark border border-border rounded text-xs text-white"
            >
              <option value="Track">Curriculum Track</option>
              <option value="Challenge">DSA Coding Challenge</option>
              <option value="Project">Engineering Project</option>
            </select>

            {assocType === 'Track' && (
              <select
                value={assocTitle}
                onChange={(e) => setAssocTitle(e.target.value)}
                disabled={isActive && isDndMode}
                className="col-span-12 sm:col-span-8 p-2 bg-dark border border-border rounded text-xs text-white"
              >
                <option value="Python: Variables & Data Types">Python: Variables & Data Types</option>
                <option value="JavaScript: Async & Promises">JavaScript: Async & Promises</option>
                <option value="SQL: Joins & Normalization">SQL: Joins & Normalization</option>
                <option value="C++: Pointers & Memory Management">C++: Pointers & Memory Management</option>
                <option value="Git: Branching & Merge Conflicts">Git: Branching & Merge Conflicts</option>
              </select>
            )}

            {assocType === 'Challenge' && (
              <select
                value={assocTitle}
                onChange={(e) => setAssocTitle(e.target.value)}
                disabled={isActive && isDndMode}
                className="col-span-12 sm:col-span-8 p-2 bg-dark border border-border rounded text-xs text-white"
              >
                <option value="Valid Parentheses (DSA)">Valid Parentheses (DSA)</option>
                <option value="Two Sum - O(n) Hash Map">Two Sum - O(n) Hash Map</option>
                <option value="Maximum Subarray - Kadane">Maximum Subarray - Kadane</option>
                <option value="Reverse Words in String">Reverse Words in String</option>
              </select>
            )}

            {assocType === 'Project' && (
              <select
                value={assocTitle}
                onChange={(e) => setAssocTitle(e.target.value)}
                disabled={isActive && isDndMode}
                className="col-span-12 sm:col-span-8 p-2 bg-dark border border-border rounded text-xs text-white"
              >
                {projects.slice(0, 6).map(p => (
                  <option key={p.id} value={p.title}>{p.title}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Central Timer Display */}
        <div className="timer-display-box text-center my-6">
          <div className="timer-digits text-5xl sm:text-7xl md:text-8xl font-extrabold text-white font-mono tracking-tight mb-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className="max-w-md mx-auto mb-2">
            <div className="progress-bar-bg h-2">
              <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
          <span className="text-2xs font-mono text-muted">{progressPercent}% of {presetMinutes}m elapsed</span>
        </div>

        {/* Primary Controls */}
        <div className="focus-controls-row flex justify-center items-center gap-4 mt-8 flex-wrap">
          {!isActive ? (
            <button
              type="button"
              className="btn-primary py-3 px-8 text-base font-bold flex items-center gap-2.5 shadow-lg"
              onClick={toggleTimer}
            >
              <Play size={20} /> {isDndMode ? 'Start Locked Focus' : 'Start Focus Session'}
            </button>
          ) : isDndMode ? (
            /* Emergency Unlock Hold Button (Psychological Lock) */
            <div className="emergency-unlock-wrapper flex flex-col items-center gap-2">
              <button
                type="button"
                className="emergency-unlock-btn"
                onMouseDown={startEmergencyUnlockHold}
                onMouseUp={cancelEmergencyUnlockHold}
                onMouseLeave={cancelEmergencyUnlockHold}
                onTouchStart={startEmergencyUnlockHold}
                onTouchEnd={cancelEmergencyUnlockHold}
              >
                <div 
                  className="unlock-fill-track" 
                  style={{ width: `${unlockProgress}%` }}
                />
                <span className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                  <Lock size={14} className="text-warning" />
                  {unlockProgress > 0 ? `Unlocking... ${unlockProgress}%` : 'Hold 3s to Break Lock'}
                </span>
              </button>
              <span className="text-2xs text-muted">Protected by DND Time Lock</span>
            </div>
          ) : (
            /* Standard Mode Pause & Reset */
            <>
              <button
                type="button"
                className="btn-primary py-2.5 px-6 text-sm font-bold flex items-center gap-2"
                onClick={toggleTimer}
              >
                <Pause size={18} /> Pause Timer
              </button>
              <button
                type="button"
                className="btn-secondary py-2.5 px-6 text-sm flex items-center gap-2"
                onClick={handleResetTimer}
              >
                <RotateCcw size={16} /> Reset
              </button>
            </>
          )}
        </div>

        {/* Floating Quick In-Session Support Tools */}
        {isActive && (
          <div className="in-session-floating-dock flex gap-2 justify-center mt-6 pt-4 border-t border-border">
            <button
              type="button"
              className={`filter-pill text-xs flex items-center gap-1.5 ${activeSideWidget === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveSideWidget(activeSideWidget === 'chat' ? 'none' : 'chat')}
            >
              <MessageSquare size={13} />
              <span>Ask AI Assistant</span>
            </button>
            <button
              type="button"
              className={`filter-pill text-xs flex items-center gap-1.5 ${activeSideWidget === 'search' ? 'active' : ''}`}
              onClick={() => setActiveSideWidget(activeSideWidget === 'search' ? 'none' : 'search')}
            >
              <Search size={13} />
              <span>Safe Web Search</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Side Drawer for Active Widgets */}
      {activeSideWidget !== 'none' && (
        <div className="side-widget-flyout surface-card p-4 fade-in">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-border">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {activeSideWidget === 'chat' ? 'Aura AI Assistant' : 'Educational Web Search'}
            </span>
            <button 
              type="button"
              className="text-muted hover:text-white"
              onClick={() => setActiveSideWidget('none')}
            >
              <X size={16} />
            </button>
          </div>
          {activeSideWidget === 'chat' && <AuraBot isWidget={true} />}
          {activeSideWidget === 'search' && <SafeSearchWidget />}
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TWO-COLUMN WORKSPACE DECK: NOTES & TELEMETRY */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
        {/* Left: Active Session Scratchpad */}
        <div className="surface-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles size={14} className="text-primary" /> Active Session Scratchpad
              </label>
              <span className="text-2xs text-muted font-mono">Auto-saved to workspace</span>
            </div>
            <textarea
              className="devtools-textarea font-mono text-xs w-full"
              rows={5}
              placeholder="Jot down algorithm ideas, test edge cases, bug hypotheses, or reminders during this focus session..."
              defaultValue={localStorage.getItem('focusflow_session_notes') || ''}
              onChange={(e) => localStorage.setItem('focusflow_session_notes', e.target.value)}
            />
          </div>
          <div className="mt-3 flex justify-between items-center text-2xs text-muted pt-2 border-t border-border">
            <span>Synchronized with Local IDE</span>
            <button 
              type="button" 
              className="text-btn text-primary text-2xs"
              onClick={() => navigate('/code-lab')}
            >
              Open in Code Studio →
            </button>
          </div>
        </div>

        {/* Right: Verified Focus Audit History */}
        <div className="surface-card p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <History size={14} className="text-emerald" /> Focus History & Distraction Log
            </h3>
            <span className="text-2xs text-muted font-mono">{focusSessions.length} sessions logged</span>
          </div>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
            {focusSessions.length > 0 ? (
              focusSessions.slice(0, 5).map(s => (
                <div key={s.id} className="p-2.5 bg-black-20 rounded border border-border flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white block truncate max-w-xs">{s.associatedTitle}</span>
                    <span className="text-muted text-2xs font-mono">{s.associatedType} • {s.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`badge text-2xs ${s.completed ? 'emerald' : 'amber'}`}>
                      {s.completed ? 'Completed' : 'Cancelled'}
                    </span>
                    <span className="font-mono text-white text-xs font-bold">{s.durationMinutes}m</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted text-xs">
                <Clock size={24} className="mx-auto mb-2 opacity-40 text-primary" />
                No focus sessions logged today yet. Start one above!
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Focus;
