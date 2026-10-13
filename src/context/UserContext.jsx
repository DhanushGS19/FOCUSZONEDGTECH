import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const DEMO_USER = {
  id: 'u1',
  name: 'Alex',
  university: 'Tech University',
  course: 'Computer Science',
  year: '3rd Year',
  subjects: ['DBMS', 'Java', 'AI/ML'],
  xp: 920,
  streak: 7,
  badges: ['🔥 7-Day Streak', '🎯 Goal Crusher']
};

const DEMO_GOALS = [
  {
    id: 'g1',
    title: 'Prepare for DBMS Exam',
    subject: 'DBMS',
    progress: 65,
    deadline: '20 days',
    tasks: [
      { id: 't1', title: 'Revise 1NF, 2NF and 3NF', completed: true },
      { id: 't2', title: 'Watch DBMS lesson', completed: false },
      { id: 't3', title: 'Complete 20 practice questions', completed: false },
      { id: 't4', title: 'Take quiz', completed: false }
    ]
  }
];

const DEMO_LEADERBOARD = [
  { userId: 'u2', name: 'Aisha', xp: 1240, badge: '🏆', rank: 1 },
  { userId: 'u3', name: 'Rahul', xp: 1180, badge: '⚡', rank: 2 },
  { userId: 'u4', name: 'Ananya', xp: 1050, badge: '🧠', rank: 3 },
  { userId: 'u1', name: 'Alex (You)', xp: 920, badge: '🔥', rank: 4 },
  { userId: 'u5', name: 'Arjun', xp: 810, badge: '📚', rank: 5 },
];

const DEMO_MATERIALS = [
  { id: 'm1', title: 'DBMS Complete Revision Notes', category: 'Notes', rating: 4.7, price: '₹149', author: 'Prof. Sharma', subject: 'DBMS' },
  { id: 'm2', title: 'SQL Question Bank (500+ Qs)', category: 'Question Bank', rating: 4.9, price: '₹199', author: 'Code Prep', subject: 'DBMS' },
  { id: 'm3', title: 'Normalization Cheat Sheet', category: 'Cheat Sheet', rating: 4.5, price: 'Free', author: 'Study Squad', subject: 'DBMS' },
  { id: 'm4', title: 'Java OOPS Concepts', category: 'Notes', rating: 4.6, price: '₹129', author: 'Dev Guide', subject: 'Java' },
];

const DEMO_CLASSES = [
  { id: 'c1', title: 'Complete DBMS Masterclass', instructor: 'Dr. Sharma', rating: 4.8, students: 1250, duration: '24 hours', level: 'Intermediate', price: '₹999', progress: 0 },
  { id: 'c2', title: 'Java for Placement', instructor: 'Tech Prep', rating: 4.9, students: 3400, duration: '40 hours', level: 'Beginner to Pro', price: '₹1499', progress: 0 },
  { id: 'c3', title: 'AI/ML Fundamentals', instructor: 'Prof. Andrew', rating: 4.7, students: 890, duration: '15 hours', level: 'Beginner', price: '₹799', progress: 0 },
];

const DEMO_CHALLENGES = [
  { id: 'ch1', title: '7-Day DBMS Challenge', requirements: ['5 study goals', '3 focus sessions', '2 quizzes'], xpReward: 500, deadline: '2 days left' },
  { id: 'ch2', title: 'Weekend Focus Sprint', requirements: ['4 hours of focus time'], xpReward: 300, deadline: '3 days left' },
];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(DEMO_USER);
  const [goals, setGoals] = useState(DEMO_GOALS);
  const [leaderboard, setLeaderboard] = useState(DEMO_LEADERBOARD);
  const [materials, setMaterials] = useState(DEMO_MATERIALS);
  const [classes, setClasses] = useState(DEMO_CLASSES);
  const [challenges, setChallenges] = useState(DEMO_CHALLENGES);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For login flow

  // Load from local storage on mount (optional, we can just keep it in memory for demo)
  
  const addXp = (amount) => {
    setUser(prev => ({ ...prev, xp: prev.xp + amount }));
    setLeaderboard(prev => {
      const updated = prev.map(u => u.userId === user.id ? { ...u, xp: u.xp + amount } : u);
      return updated.sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));
    });
  };

  const completeTask = (goalId, taskId) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(t => t.id === taskId ? { ...t, completed: true } : t);
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        return { ...goal, tasks: updatedTasks, progress: newProgress };
      }
      return goal;
    }));
    addXp(30);
  };
  
  const completeFocusSession = (duration) => {
    addXp(50);
  };
  
  const completeChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      addXp(challenge.xpReward);
      setChallenges(prev => prev.filter(c => c.id !== challengeId));
    }
  };
  
  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const level = Math.floor(user.xp / 1000) + 1;
  const currentLevelXp = user.xp % 1000;
  const xpForNextLevel = 1000;

  return (
    <UserContext.Provider value={{ 
      user, 
      goals, 
      leaderboard, 
      materials, 
      classes, 
      challenges,
      isAuthenticated,
      level, 
      currentLevelXp, 
      xpForNextLevel,
      addXp, 
      completeTask,
      completeFocusSession,
      completeChallenge,
      login,
      logout,
      setGoals
    }}>
      {children}
    </UserContext.Provider>
  );
};
