import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Calendar, Clock, CheckCircle2, GripVertical, Settings2, Trash2, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './StudyPlan.css';

const StudyPlan = () => {
  const { goals, setGoals } = useUser();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', subject: '', deadline: '', time: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const activeGoal = goals[0];

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    try {
      // 1. Call Gemini Backend for AI Task Breakdown
      const apiUrl = import.meta.env.VITE_BACKEND_URL || '/api/breakdown-task';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: `${newGoal.title} - ${newGoal.subject} (Deadline: ${newGoal.deadline}, Time: ${newGoal.time})` })
      });

      if (!response.ok) {
        throw new Error('Failed to generate study plan from AI');
      }

      const data = await response.json();
      const generatedTasks = data.tasks || [];

      const newGoalObj = {
        title: newGoal.title,
        subject: newGoal.subject,
        deadline: newGoal.deadline,
        progress: 0,
        tasks: generatedTasks,
        createdAt: new Date().toISOString() // Fallback timestamp
      };

      // 2. Save to Firestore
      try {
        const docRef = await addDoc(collection(db, 'goals'), {
          ...newGoalObj,
          createdAt: serverTimestamp(),
          userId: 'u1' // Hardcoded for now until proper Auth is integrated
        });
        newGoalObj.id = docRef.id;
      } catch (dbError) {
        console.warn("Firestore error (are your keys set up?), falling back to local state.", dbError);
        newGoalObj.id = `g_${Date.now()}`; // Local ID fallback
      }

      // 3. Update Local State
      setGoals([newGoalObj, ...goals]);
      setShowGoalForm(false);
      setNewGoal({ title: '', subject: '', deadline: '', time: '' });

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="study-plan-container fade-in">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1>Study Plan</h1>
          <p className="text-muted">Plan your path to success with AI</p>
        </div>
        <button className="primary flex items-center gap-2" onClick={() => setShowGoalForm(true)}>
          <Plus size={20} /> Create New Goal
        </button>
      </header>

      {showGoalForm && (
        <div className="glass-panel mb-8 generate-plan-panel">
          <h2 className="mb-4 text-xl">Generate AI Study Plan</h2>
          <form onSubmit={handleCreateGoal} className="goal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Study Goal</label>
                <input type="text" placeholder="e.g. Prepare for DBMS exam" required value={newGoal.title} onChange={e => setNewGoal({...newGoal, title: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="e.g. DBMS" required value={newGoal.subject} onChange={e => setNewGoal({...newGoal, subject: e.target.value})} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Exam Date / Deadline</label>
                <input type="text" placeholder="e.g. 20 days" required value={newGoal.deadline} onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Available Time (per day)</label>
                <input type="text" placeholder="e.g. 2 hours/day" required value={newGoal.time} onChange={e => setNewGoal({...newGoal, time: e.target.value})} />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setShowGoalForm(false)} disabled={isGenerating}>Cancel</button>
              <button type="submit" className="primary flex items-center gap-2" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <SparklesIcon />}
                {isGenerating ? 'Generating...' : 'Generate Plan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {goals.map((goal, index) => (
        <div key={goal.id} className="glass-panel mb-6 goal-card">
          <div className="goal-header flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl mb-1">{goal.title}</h2>
              <div className="flex items-center gap-4 text-muted text-sm">
                <span className="flex items-center gap-1"><Calendar size={16} /> {goal.deadline}</span>
                <span className="flex items-center gap-1 text-primary">{goal.subject}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-muted mb-1">Completion</div>
                <div className="text-xl font-bold">{goal.progress}%</div>
              </div>
              <div className="progress-circle" style={{background: `conic-gradient(var(--accent) ${goal.progress}%, rgba(255,255,255,0.1) 0)`}}>
                <div className="inner-circle"></div>
              </div>
            </div>
          </div>

          <div className="task-timeline">
            {goal.tasks.map((task, i) => (
              <div key={task.id} className={`timeline-item ${task.completed ? 'completed' : ''}`}>
                <div className="drag-handle"><GripVertical size={16} /></div>
                <div className="status-icon">
                  <CheckCircle2 size={24} className={task.completed ? 'text-accent' : 'text-muted'} />
                </div>
                <div className="task-content">
                  <span className="day-label">Day {Math.floor(i/2) + 1}</span>
                  <h4>{task.title}</h4>
                </div>
                <div className="task-actions">
                  <button className="icon-btn"><Settings2 size={16} /></button>
                  <button className="icon-btn danger-hover"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 flex items-center justify-center gap-2 border-dashed">
            <Plus size={18} /> Add Custom Task
          </button>
        </div>
      ))}
    </div>
  );
};

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

export default StudyPlan;
