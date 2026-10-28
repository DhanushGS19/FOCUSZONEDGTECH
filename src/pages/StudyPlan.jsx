import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Plus, Calendar, CheckCircle2, GripVertical, Trash2, Loader2, Sparkles, CheckSquare } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './StudyPlan.css';

const StudyPlan = () => {
  const { goals, setGoals, completeTask, addTaskToGoal, deleteTaskFromGoal, deleteGoal } = useUser();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: '', subject: '', deadline: '', time: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // State for adding a custom task to a specific goal
  const [addingTaskId, setAddingTaskId] = useState(null);
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [customTaskTime, setCustomTaskTime] = useState('30 mins');

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    try {
      // 1. Call Gemini Backend for AI Task Breakdown
      const apiUrl = import.meta.env.VITE_BACKEND_URL 
        ? `${import.meta.env.VITE_BACKEND_URL}/api/breakdown-task` 
        : '/api/breakdown-task';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: `${newGoal.title} - ${newGoal.subject} (Deadline: ${newGoal.deadline}, Time: ${newGoal.time})` })
      });

      let generatedTasks = [];
      if (response.ok) {
        const data = await response.json();
        generatedTasks = data.tasks || [];
      } else {
        // Fallback subtasks
        generatedTasks = [
          { id: `t1_${Date.now()}`, title: `Master fundamentals of ${newGoal.subject}`, timeEstimate: '30 mins', completed: false },
          { id: `t2_${Date.now()}`, title: `Review practice problems and lecture notes`, timeEstimate: '45 mins', completed: false },
          { id: `t3_${Date.now()}`, title: `Complete targeted quiz and past papers`, timeEstimate: '30 mins', completed: false },
          { id: `t4_${Date.now()}`, title: `Synthesize cheat sheet and key formulas`, timeEstimate: '20 mins', completed: false }
        ];
      }

      const newGoalObj = {
        id: `g_${Date.now()}`,
        title: newGoal.title,
        subject: newGoal.subject,
        deadline: newGoal.deadline,
        progress: 0,
        tasks: generatedTasks,
        createdAt: new Date().toISOString()
      };

      // 2. Save to Firestore if available
      try {
        const docRef = await addDoc(collection(db, 'goals'), {
          ...newGoalObj,
          createdAt: serverTimestamp(),
          userId: 'u1'
        });
        newGoalObj.id = docRef.id;
      } catch (dbError) {
        console.warn("Firestore save skipped/fallback used:", dbError);
      }

      // 3. Update State
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

  const handleAddCustomTaskSubmit = (goalId) => {
    if (!customTaskTitle.trim()) return;
    addTaskToGoal(goalId, customTaskTitle, customTaskTime);
    setCustomTaskTitle('');
    setAddingTaskId(null);
  };

  return (
    <div className="study-plan-container fade-in">
      <header className="mb-6 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1>Study Plan</h1>
          <p className="text-muted">Plan your academic goals and break them down into actionable milestones</p>
        </div>
        <button className="primary flex items-center gap-2" onClick={() => setShowGoalForm(true)}>
          <Plus size={20} /> Create New Goal
        </button>
      </header>

      {showGoalForm && (
        <div className="glass-panel mb-8 generate-plan-panel">
          <h2 className="mb-4 text-xl flex items-center gap-2">
            <Sparkles className="text-primary" size={22} /> Generate AI Study Plan
          </h2>
          <form onSubmit={handleCreateGoal} className="goal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Study Goal</label>
                <input 
                  type="text" 
                  placeholder="e.g. Master Normalization and Indexing" 
                  required 
                  value={newGoal.title} 
                  onChange={e => setNewGoal({...newGoal, title: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input 
                  type="text" 
                  placeholder="e.g. DBMS" 
                  required 
                  value={newGoal.subject} 
                  onChange={e => setNewGoal({...newGoal, subject: e.target.value})} 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Exam Date / Deadline</label>
                <input 
                  type="text" 
                  placeholder="e.g. 14 days" 
                  required 
                  value={newGoal.deadline} 
                  onChange={e => setNewGoal({...newGoal, deadline: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Available Time (per day)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2 hours/day" 
                  required 
                  value={newGoal.time} 
                  onChange={e => setNewGoal({...newGoal, time: e.target.value})} 
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setShowGoalForm(false)} disabled={isGenerating}>Cancel</button>
              <button type="submit" className="primary flex items-center gap-2" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                {isGenerating ? 'Generating Milestones...' : 'Generate AI Plan'}
              </button>
            </div>
          </form>
        </div>
      )}

      {goals.length === 0 ? (
        <div className="glass-panel text-center py-12">
          <CheckSquare className="text-muted mx-auto mb-3" size={48} />
          <h2 className="text-xl mb-2">No active study goals yet</h2>
          <p className="text-muted mb-6">Create your first goal to get an AI-generated structured roadmap!</p>
          <button className="primary" onClick={() => setShowGoalForm(true)}>Create a Goal</button>
        </div>
      ) : (
        goals.map((goal) => (
          <div key={goal.id} className="glass-panel mb-6 goal-card">
            <div className="goal-header flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl mb-1">{goal.title}</h2>
                <div className="flex items-center gap-4 text-muted text-sm">
                  <span className="flex items-center gap-1"><Calendar size={16} /> Due in {goal.deadline}</span>
                  <span className="badge">{goal.subject}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted mb-1">Completion</div>
                  <div className="text-xl font-bold">{goal.progress || 0}%</div>
                </div>
                <div 
                  className="progress-circle" 
                  style={{ background: `conic-gradient(var(--accent) ${goal.progress || 0}%, rgba(255,255,255,0.1) 0)` }}
                >
                  <div className="inner-circle"></div>
                </div>
                <button 
                  type="button"
                  className="icon-btn danger-hover"
                  onClick={() => deleteGoal(goal.id)}
                  title="Delete Goal"
                  aria-label="Delete Goal"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="task-timeline">
              {goal.tasks && goal.tasks.map((task, i) => (
                <div key={task.id} className={`timeline-item ${task.completed ? 'completed' : ''}`}>
                  <div className="drag-handle"><GripVertical size={16} /></div>
                  <button
                    type="button"
                    className="status-icon"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                    onClick={() => completeTask(goal.id, task.id)}
                    title={task.completed ? 'Task completed' : 'Click to complete task'}
                  >
                    <CheckCircle2 size={24} className={task.completed ? 'text-accent' : 'text-muted'} />
                  </button>
                  <div className="task-content">
                    <span className="day-label">Step {i + 1} {task.timeEstimate ? `• ${task.timeEstimate}` : ''}</span>
                    <h4 style={{ textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.7 : 1 }}>
                      {task.title}
                    </h4>
                  </div>
                  <div className="task-actions">
                    <button 
                      type="button"
                      className="icon-btn danger-hover"
                      onClick={() => deleteTaskFromGoal(goal.id, task.id)}
                      title="Delete subtask"
                      aria-label="Delete subtask"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Task Form */}
            {addingTaskId === goal.id ? (
              <div className="mt-4 p-4 glass-panel" style={{ background: 'rgba(0,0,0,0.2)' }}>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Enter custom task title..."
                    value={customTaskTitle}
                    onChange={(e) => setCustomTaskTitle(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#fff'
                    }}
                    autoFocus
                  />
                  <input
                    type="text"
                    placeholder="Time (e.g. 30 mins)"
                    value={customTaskTime}
                    onChange={(e) => setCustomTaskTime(e.target.value)}
                    style={{
                      width: '140px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '0.5rem 0.75rem',
                      color: '#fff'
                    }}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    className="text-btn" 
                    onClick={() => { setAddingTaskId(null); setCustomTaskTitle(''); }}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="primary" 
                    style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
                    onClick={() => handleAddCustomTaskSubmit(goal.id)}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            ) : (
              <button 
                type="button"
                className="w-full mt-4 flex items-center justify-center gap-2 border-dashed"
                onClick={() => { setAddingTaskId(goal.id); setCustomTaskTitle(''); }}
              >
                <Plus size={18} /> Add Custom Task
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default StudyPlan;
