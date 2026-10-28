import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const DEMO_USER = {
  id: 'u1',
  name: 'Alex Rivera',
  githubUsername: 'alexrivera-dev',
  bio: 'Computer Science junior passionate about Full-Stack, Distributed Systems, and AI.',
  university: 'Tech University',
  course: 'Computer Science & Engineering',
  year: '3rd Year',
  skillLevel: 'Intermediate',
  avatar: 'violet',
  learningGoals: [
    'Master Distributed Systems & Caching',
    'Solve 50 LeetCode Medium/Hard Problems',
    'Build Full-Stack AI RAG Platform',
    'Contribute to Open-Source Repositories'
  ],
  selectedTechnologies: ['JavaScript', 'Python', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'],
  primaryStack: 'React / Node.js / Python',
  subjects: ['Data Structures & Algorithms', 'Web Development', 'System Design', 'AI/ML Engineering', 'Database Systems'],
  xp: 1450,
  streak: 7,
  totalFocusMinutes: 870,
  todayFocusMinutes: 50,
  badges: ['🔥 7-Day Streak', '🎯 Goal Crusher', '💻 Code Lab Pioneer', '⚡ Level 2 Scholar']
};

const DEMO_GOALS = [
  {
    id: 'g1',
    title: 'Master System Design & Distributed Caching',
    subject: 'System Design',
    progress: 60,
    deadline: '14 days',
    tasks: [
      { id: 't1', title: 'Implement Redis LRU Cache Simulator in Code Lab', completed: true },
      { id: 't2', title: 'Study Consistent Hashing & Sharding Strategies', completed: true },
      { id: 't3', title: 'Design Rate Limiting Token Bucket Algorithm', completed: false },
      { id: 't4', title: 'Complete Practice Challenge on Dynamic Programming', completed: false }
    ]
  },
  {
    id: 'g2',
    title: 'Build Full-Stack AI Document Assistant',
    subject: 'AI/ML Engineering',
    progress: 35,
    deadline: '21 days',
    tasks: [
      { id: 't5', title: 'Design Component Architecture & Wireframes', completed: true },
      { id: 't6', title: 'Integrate Gemini API with Streaming Responses', completed: false },
      { id: 't7', title: 'Implement Local Vector Search & Embeddings', completed: false }
    ]
  }
];

import { COMPREHENSIVE_PROJECTS } from '../data/projectData';

const DEMO_PROJECTS = COMPREHENSIVE_PROJECTS;

const DEMO_LEADERBOARD = [
  { userId: 'u2', name: 'Aisha Chen', xp: 1840, badge: '🏆', rank: 1, streak: 14, stack: 'Python & PyTorch' },
  { userId: 'u3', name: 'Rahul Sharma', xp: 1680, badge: '⚡', rank: 2, streak: 12, stack: 'Go & Kubernetes' },
  { userId: 'u1', name: 'Alex Rivera (You)', xp: 1450, badge: '🔥', rank: 3, streak: 7, stack: 'Full-Stack TypeScript' },
  { userId: 'u4', name: 'Ananya Verma', xp: 1350, badge: '🧠', rank: 4, streak: 9, stack: 'React & Rust' },
  { userId: 'u5', name: 'Arjun Patel', xp: 1110, badge: '📚', rank: 5, streak: 5, stack: 'Java & Spring Boot' },
];

const DEMO_MATERIALS = [
  { id: 'm1', title: 'System Design Interview Handbook', category: 'Architecture', rating: 4.9, price: 'Free', author: 'Principal Architects', subject: 'System Design' },
  { id: 'm2', title: 'Modern React & TypeScript Patterns (2026)', category: 'Frontend', rating: 4.8, price: 'Free', author: 'TechVerse Guild', subject: 'Web Development' },
  { id: 'm3', title: 'Data Structures & Algorithms Cheat Sheet', category: 'DSA', rating: 4.9, price: 'Free', author: 'Competitive Coding Club', subject: 'DSA' },
  { id: 'm4', title: 'PostgreSQL Query Optimization & Indexing Guide', category: 'Databases', rating: 4.7, price: 'Free', author: 'DBA Network', subject: 'Database Systems' },
];

const DEMO_CLASSES = [
  { id: 'c1', title: 'Full-Stack Next.js & Cloud Architecture', instructor: 'Tech Prep Lab', rating: 4.9, students: 3400, duration: '28 hours', level: 'Intermediate to Pro', price: 'Free Access', progress: 0, enrolled: true },
  { id: 'c2', title: 'Competitive Programming & DSA Masterclass', instructor: 'Prof. Andrews', rating: 4.8, students: 2150, duration: '35 hours', level: 'Beginner to Advanced', price: 'Free Access', progress: 0, enrolled: false },
  { id: 'c3', title: 'Generative AI & LLM App Development', instructor: 'AI Research Institute', rating: 4.9, students: 1890, duration: '18 hours', level: 'Intermediate', price: 'Free Access', progress: 0, enrolled: false },
];

const DEMO_CHALLENGES = [
  { id: 'ch1', title: '7-Day Code & Focus Sprint', requirements: ['3 Code Lab sessions', '5 DSA problems solved', '4 hours focus time'], xpReward: 500, deadline: '2 days left' },
  { id: 'ch2', title: 'Algorithm Optimization Sprint', requirements: ['Solve Two Sum & Binary Search', 'Achieve O(n) runtime'], xpReward: 350, deadline: '4 days left' },
  { id: 'ch3', title: 'Developer Tools Mastery', requirements: ['Test 2 APIs with Dev Tools', 'Format JSON & Validate Regex'], xpReward: 200, deadline: '5 days left' },
];

const DEFAULT_ENROLLED_COURSES = ['python', 'javascript', 'sql'];

const DEFAULT_COMPLETED_LESSONS = ['py_01', 'js_01'];

const DEFAULT_DAILY_GOAL = {
  xpTarget: 100,
  tasks: [
    { id: 'dg1', title: 'Complete 1 curriculum lesson (+30 XP)', completed: true, xp: 30 },
    { id: 'dg2', title: 'Solve the Daily Coding Challenge (+50 XP)', completed: false, xp: 50 },
    { id: 'dg3', title: '25-minute Focus Zone deep work session (+25 XP)', completed: true, xp: 25 },
    { id: 'dg4', title: 'Inspect code or test an API in Dev Tools (+20 XP)', completed: false, xp: 20 }
  ]
};

const DEFAULT_DAILY_CHALLENGE = {
  id: 'dc_two_sum',
  title: 'Two Sum - Hash Map Optimization',
  category: 'Algorithms & Data Structures',
  difficulty: 'Easy',
  xpReward: 50,
  completed: false,
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(n) runtime using a hash map.',
  starterCode: `// TechVerse Daily Coding Challenge: Two Sum
// Problem: Return indices of two numbers that add up to target in O(n) runtime.

function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Test Run:
const result = twoSum([2, 7, 11, 15], 9);
console.log("Indices:", result); // Expected: [0, 1]
`
};

const DEFAULT_WEEKLY_ACTIVITY = [
  { day: 'Mon', minutes: 45, date: 'Oct 22', sessions: 2 },
  { day: 'Tue', minutes: 60, date: 'Oct 23', sessions: 3 },
  { day: 'Wed', minutes: 30, date: 'Oct 24', sessions: 1 },
  { day: 'Thu', minutes: 75, date: 'Oct 25', sessions: 3 },
  { day: 'Fri', minutes: 50, date: 'Oct 26', sessions: 2 },
  { day: 'Sat', minutes: 90, date: 'Oct 27', sessions: 4 },
  { day: 'Sun', minutes: 50, date: 'Oct 28', sessions: 2 }
];

const DEFAULT_QUIZ_PERFORMANCE = {
  totalQuizzes: 4,
  averageScore: 88,
  bestSubject: 'SQL & Database Systems',
  recentDrills: [
    { id: 'qd1', title: 'System Design & Distributed Systems', score: 2, total: 2, percentage: 100, date: 'Today' },
    { id: 'qd2', title: 'DSA & Dynamic Programming', score: 3, total: 3, percentage: 100, date: 'Yesterday' },
    { id: 'qd3', title: 'DBMS & Normalization Drills', score: 2, total: 3, percentage: 67, date: '2 days ago' }
  ]
};

const DEFAULT_RECENT_SNIPPETS = [
  {
    id: 'snip_1',
    title: 'Two Sum Algorithm (DSA)',
    language: 'JavaScript',
    updatedAt: 'Today',
    code: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`
  },
  {
    id: 'snip_2',
    title: 'Binary Search Implementation',
    language: 'JavaScript',
    updatedAt: 'Yesterday',
    code: `function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] === target) return mid;\n    if (arr[mid] < target) low = mid + 1; else high = mid - 1;\n  }\n  return -1;\n}`
  },
  {
    id: 'snip_3',
    title: 'Interactive Glassmorphism Studio',
    language: 'HTML / CSS',
    updatedAt: '3 days ago',
    code: `<div class="glass-card">\n  <h2>TechVerse Glass Studio</h2>\n  <p>Real-time backdrop blur & translucent gradients</p>\n</div>`
  }
];

const DEFAULT_LAST_ACTIVE_LESSON = {
  courseId: 'python',
  lessonId: 'py_01',
  lessonTitle: 'Introduction to Python',
  level: 'Beginner',
  duration: '20 mins'
};

const DEFAULT_CHALLENGE_SUBMISSIONS = [
  {
    id: 'sub_1',
    problemId: 'p1',
    problemTitle: 'Valid Parentheses',
    language: 'JavaScript',
    status: 'Accepted',
    passedCount: 3,
    totalCount: 3,
    runtime: '28ms',
    timestamp: 'Yesterday'
  }
];

const DEFAULT_SOLVED_PROBLEMS = ['p1'];

const DEFAULT_FOCUS_SESSIONS = [
  {
    id: 'fs_1',
    durationMinutes: 25,
    associatedType: 'Lesson',
    associatedTitle: 'Variables and Data Types in Python',
    completed: true,
    timestamp: 'Today, 10:30 AM'
  },
  {
    id: 'fs_2',
    durationMinutes: 30,
    associatedType: 'Coding Challenge',
    associatedTitle: 'Valid Parentheses',
    completed: true,
    timestamp: 'Yesterday, 4:15 PM'
  }
];

const DEFAULT_TOPICS_REVISION = [
  { topic: 'Recursion & Call Stacks', reason: 'Failed edge cases on tree traversal', lastEncountered: '2 days ago' }
];

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(`focusflow_${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const UserProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('focusflow_theme') || 'dark';
  });
  const [user, setUser] = useState(() => loadFromStorage('user', DEMO_USER));
  const [goals, setGoals] = useState(() => loadFromStorage('goals', DEMO_GOALS));
  const [projects, setProjects] = useState(() => loadFromStorage('projects', DEMO_PROJECTS));
  const [leaderboard, setLeaderboard] = useState(() => loadFromStorage('leaderboard', DEMO_LEADERBOARD));
  const [materials, setMaterials] = useState(() => loadFromStorage('materials', DEMO_MATERIALS));
  const [classes, setClasses] = useState(() => loadFromStorage('classes', DEMO_CLASSES));
  const [challenges, setChallenges] = useState(() => loadFromStorage('challenges', DEMO_CHALLENGES));
  const [enrolledCourses, setEnrolledCourses] = useState(() => loadFromStorage('enrolled_courses', DEFAULT_ENROLLED_COURSES));
  const [completedLessons, setCompletedLessons] = useState(() => loadFromStorage('completed_lessons', DEFAULT_COMPLETED_LESSONS));
  const [dailyGoal, setDailyGoal] = useState(() => loadFromStorage('daily_goal', DEFAULT_DAILY_GOAL));
  const [dailyChallenge, setDailyChallenge] = useState(() => loadFromStorage('daily_challenge', DEFAULT_DAILY_CHALLENGE));
  const [weeklyActivity, setWeeklyActivity] = useState(() => loadFromStorage('weekly_activity', DEFAULT_WEEKLY_ACTIVITY));
  const [quizPerformance, setQuizPerformance] = useState(() => loadFromStorage('quiz_perf', DEFAULT_QUIZ_PERFORMANCE));
  const [recentSnippets, setRecentSnippets] = useState(() => loadFromStorage('recent_snippets', DEFAULT_RECENT_SNIPPETS));
  const [lastActiveLesson, setLastActiveLesson] = useState(() => loadFromStorage('last_active_lesson', DEFAULT_LAST_ACTIVE_LESSON));
  const [isOnboardingDismissed, setIsOnboardingDismissed] = useState(() => {
    return localStorage.getItem('focusflow_onboarding_dismissed') === 'true';
  });

  // Coding Practice & Assessment Submissions State
  const [challengeSubmissions, setChallengeSubmissions] = useState(() => loadFromStorage('challenge_submissions', DEFAULT_CHALLENGE_SUBMISSIONS));
  const [solvedProblems, setSolvedProblems] = useState(() => loadFromStorage('solved_problems', DEFAULT_SOLVED_PROBLEMS));

  // Focus Sessions Log
  const [focusSessions, setFocusSessions] = useState(() => loadFromStorage('focus_sessions', DEFAULT_FOCUS_SESSIONS));

  // Personalized Learning: Weak Topics & Revision
  const [topicsNeedingRevision, setTopicsNeedingRevision] = useState(() => loadFromStorage('topics_revision', DEFAULT_TOPICS_REVISION));

  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem('focusflow_gemini_api_key') || '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('focusflow_auth') === 'true';
  });

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('focusflow_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('focusflow_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('focusflow_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('focusflow_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('focusflow_leaderboard', JSON.stringify(leaderboard));
  }, [leaderboard]);

  useEffect(() => {
    localStorage.setItem('focusflow_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('focusflow_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('focusflow_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('focusflow_enrolled_courses', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  useEffect(() => {
    localStorage.setItem('focusflow_completed_lessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('focusflow_daily_goal', JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('focusflow_daily_challenge', JSON.stringify(dailyChallenge));
  }, [dailyChallenge]);

  useEffect(() => {
    localStorage.setItem('focusflow_weekly_activity', JSON.stringify(weeklyActivity));
  }, [weeklyActivity]);

  useEffect(() => {
    localStorage.setItem('focusflow_quiz_perf', JSON.stringify(quizPerformance));
  }, [quizPerformance]);

  useEffect(() => {
    localStorage.setItem('focusflow_recent_snippets', JSON.stringify(recentSnippets));
  }, [recentSnippets]);

  useEffect(() => {
    localStorage.setItem('focusflow_last_active_lesson', JSON.stringify(lastActiveLesson));
  }, [lastActiveLesson]);

  useEffect(() => {
    localStorage.setItem('focusflow_challenge_submissions', JSON.stringify(challengeSubmissions));
  }, [challengeSubmissions]);

  useEffect(() => {
    localStorage.setItem('focusflow_solved_problems', JSON.stringify(solvedProblems));
  }, [solvedProblems]);

  useEffect(() => {
    localStorage.setItem('focusflow_focus_sessions', JSON.stringify(focusSessions));
  }, [focusSessions]);

  useEffect(() => {
    localStorage.setItem('focusflow_topics_revision', JSON.stringify(topicsNeedingRevision));
  }, [topicsNeedingRevision]);
  
  const addXp = (amount) => {
    setUser(prev => {
      const newXp = prev.xp + amount;
      const newBadges = [...prev.badges];
      if (newXp >= 2000 && !newBadges.includes('⚡ Level 3 Architect')) {
        newBadges.push('⚡ Level 3 Architect');
      }
      return { ...prev, xp: newXp, badges: newBadges };
    });

    setLeaderboard(prev => {
      const updated = prev.map(u => u.userId === user.id ? { ...u, xp: u.xp + amount } : u);
      return updated.sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));
    });
  };

  const completeTask = (goalId, taskId) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        return { ...goal, tasks: updatedTasks, progress: newProgress };
      }
      return goal;
    }));
    addXp(30);
  };

  const addTaskToGoal = (goalId, taskTitle, timeEstimate = '30 mins') => {
    if (!taskTitle?.trim()) return;
    const newTask = {
      id: `t_${Date.now()}`,
      title: taskTitle.trim(),
      timeEstimate,
      completed: false
    };

    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = [...goal.tasks, newTask];
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const newProgress = Math.round((completedCount / updatedTasks.length) * 100);
        return { ...goal, tasks: updatedTasks, progress: newProgress };
      }
      return goal;
    }));
  };

  const deleteTaskFromGoal = (goalId, taskId) => {
    setGoals(prevGoals => prevGoals.map(goal => {
      if (goal.id === goalId) {
        const updatedTasks = goal.tasks.filter(t => t.id !== taskId);
        const completedCount = updatedTasks.filter(t => t.completed).length;
        const newProgress = updatedTasks.length > 0 ? Math.round((completedCount / updatedTasks.length) * 100) : 0;
        return { ...goal, tasks: updatedTasks, progress: newProgress };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId) => {
    setGoals(prevGoals => prevGoals.filter(g => g.id !== goalId));
  };

  const updateProjectStep = (projectId, stepId) => {
    setProjects(prev => prev.map(proj => {
      if (proj.id === projectId) {
        const list = proj.milestones || proj.steps || [];
        const updatedList = list.map(s => s.id === stepId ? { ...s, completed: !s.completed } : s);
        const allCompleted = updatedList.every(s => s.completed);
        const someCompleted = updatedList.some(s => s.completed);
        const newStatus = allCompleted ? 'Completed' : (someCompleted ? 'In Progress' : 'Not Started');
        return { 
          ...proj, 
          milestones: updatedList, 
          steps: updatedList, 
          status: newStatus,
          progress: Math.round((updatedList.filter(s => s.completed).length / updatedList.length) * 100)
        };
      }
      return proj;
    }));
    addXp(35);
  };

  const updateProjectMilestone = (projectId, milestoneId) => {
    updateProjectStep(projectId, milestoneId);
  };

  const linkProjectRepo = (projectId, githubUrl, liveUrl) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          githubUrl: githubUrl || p.githubUrl,
          liveUrl: liveUrl || p.liveUrl,
          status: 'Completed'
        };
      }
      return p;
    }));
    addXp(75);
  };

  const recordChallengeSubmission = ({ problemId, problemTitle, language, status, passedCount, totalCount, runtime, topic }) => {
    const newSub = {
      id: `sub_${Date.now()}`,
      problemId,
      problemTitle,
      language: language || 'JavaScript',
      status: status || 'Accepted',
      passedCount: passedCount !== undefined ? passedCount : totalCount,
      totalCount: totalCount || 3,
      runtime: runtime || '24ms',
      timestamp: 'Just now'
    };
    setChallengeSubmissions(prev => [newSub, ...prev.slice(0, 25)]);

    if (status === 'Accepted') {
      if (!solvedProblems.includes(problemId)) {
        setSolvedProblems(prev => [...prev, problemId]);
        addXp(60);
      }
      if (topic) {
        setTopicsNeedingRevision(prev => prev.filter(t => t.topic !== topic));
      }
    } else {
      if (topic) {
        setTopicsNeedingRevision(prev => {
          if (prev.some(t => t.topic === topic)) return prev;
          return [{ topic, reason: `Failed test cases in ${problemTitle}`, lastEncountered: 'Just now' }, ...prev];
        });
      }
    }
  };

  const recordFocusSession = ({ durationMinutes, associatedType, associatedTitle, completed }) => {
    const session = {
      id: `fs_${Date.now()}`,
      durationMinutes,
      associatedType: associatedType || 'General Study',
      associatedTitle: associatedTitle || 'Deep Work Session',
      completed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    setFocusSessions(prev => [session, ...prev.slice(0, 20)]);

    if (completed) {
      completeFocusSession(durationMinutes);
    }
  };

  const clearTopicRevision = (topic) => {
    setTopicsNeedingRevision(prev => prev.filter(t => t.topic !== topic));
  };
  
  const completeFocusSession = (minutes = 25) => {
    const earnedXp = Math.max(25, Math.round(minutes * 2));
    addXp(earnedXp);
    setUser(prev => ({
      ...prev,
      totalFocusMinutes: (prev.totalFocusMinutes || 0) + minutes,
      todayFocusMinutes: (prev.todayFocusMinutes || 0) + minutes
    }));

    // Update today's entry in weekly activity
    setWeeklyActivity(prev => {
      const copy = [...prev];
      const lastIdx = copy.length - 1;
      if (lastIdx >= 0) {
        copy[lastIdx] = {
          ...copy[lastIdx],
          minutes: (copy[lastIdx].minutes || 0) + minutes,
          sessions: (copy[lastIdx].sessions || 0) + 1
        };
      }
      return copy;
    });

    // Check off daily focus goal task if present
    setDailyGoal(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === 'dg3' ? { ...t, completed: true } : t)
    }));
  };
  
  const completeChallenge = (challengeId) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      addXp(challenge.xpReward);
      setChallenges(prev => prev.filter(c => c.id !== challengeId));
    }
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
    if (updatedFields.name) {
      setLeaderboard(prev => prev.map(u => u.userId === user.id ? { ...u, name: `${updatedFields.name} (You)` } : u));
    }
  };

  const enrollClass = (classId) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, enrolled: true, students: c.students + 1 } : c));
    addXp(50);
  };

  const updateCustomApiKey = (key) => {
    setCustomApiKey(key);
    localStorage.setItem('focusflow_gemini_api_key', key);
  };

  // Curriculum & Learning Hub Actions
  const completeLesson = (lessonId, xpReward = 30, lessonMeta = null) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      addXp(xpReward);

      // Auto-check daily lesson task
      setDailyGoal(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === 'dg1' ? { ...t, completed: true } : t)
      }));

      // Add to weekly activity
      setWeeklyActivity(prev => {
        const copy = [...prev];
        const lastIdx = copy.length - 1;
        if (lastIdx >= 0) {
          copy[lastIdx] = {
            ...copy[lastIdx],
            minutes: (copy[lastIdx].minutes || 0) + 15
          };
        }
        return copy;
      });
    }

    if (lessonMeta) {
      setLastActiveLesson(lessonMeta);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return completedLessons.includes(lessonId);
  };

  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses(prev => [...prev, courseId]);
      addXp(25);
    }
  };

  const unenrollCourse = (courseId) => {
    setEnrolledCourses(prev => prev.filter(id => id !== courseId));
  };

  const toggleDailyTask = (taskId) => {
    setDailyGoal(prev => {
      let earned = 0;
      const updated = prev.tasks.map(t => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          if (nextState) earned = t.xp || 25;
          return { ...t, completed: nextState };
        }
        return t;
      });
      if (earned > 0) addXp(earned);
      return { ...prev, tasks: updated };
    });
  };

  const solveDailyChallenge = () => {
    if (!dailyChallenge.completed) {
      setDailyChallenge(prev => ({ ...prev, completed: true }));
      addXp(dailyChallenge.xpReward);
      setDailyGoal(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === 'dg2' ? { ...t, completed: true } : t)
      }));
    }
  };

  const recordQuizResult = (title, score, total) => {
    const percentage = Math.round((score / total) * 100);
    const newDrill = {
      id: `qd_${Date.now()}`,
      title,
      score,
      total,
      percentage,
      date: 'Just now'
    };

    setQuizPerformance(prev => {
      const drills = [newDrill, ...prev.recentDrills.slice(0, 5)];
      const totalQ = prev.totalQuizzes + 1;
      const avg = Math.round(
        drills.reduce((acc, d) => acc + d.percentage, 0) / drills.length
      );
      return {
        ...prev,
        totalQuizzes: totalQ,
        averageScore: avg,
        recentDrills: drills
      };
    });
  };

  const saveSnippet = (title, code, language = 'JavaScript') => {
    const newSnippet = {
      id: `snip_${Date.now()}`,
      title: title || 'Custom Snippet',
      language,
      code,
      updatedAt: 'Just now'
    };
    setRecentSnippets(prev => [newSnippet, ...prev.slice(0, 7)]);
  };

  const dismissOnboarding = () => {
    setIsOnboardingDismissed(true);
    localStorage.setItem('focusflow_onboarding_dismissed', 'true');
  };

  const resetOnboarding = () => {
    setIsOnboardingDismissed(false);
    localStorage.removeItem('focusflow_onboarding_dismissed');
  };
  
  const login = () => {
    localStorage.setItem('focusflow_auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('focusflow_auth');
    setIsAuthenticated(false);
  };

  const requestDataDeletion = async () => {
    try {
      await fetch('/api/user/delete-data', {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer tv_token_session'
        }
      });
    } catch {
      // Backend request fallback
    }

    const clearedUser = {
      ...DEMO_USER,
      name: 'New Developer',
      githubUsername: 'dev',
      bio: 'New Techverse Explorer',
      xp: 0,
      streak: 1,
      totalFocusMinutes: 0,
      todayFocusMinutes: 0,
      badges: ['🌱 Fresh Horizon']
    };

    localStorage.removeItem('focusflow_user');
    localStorage.removeItem('focusflow_goals');
    localStorage.removeItem('focusflow_projects');
    localStorage.removeItem('focusflow_recent_snippets');
    localStorage.removeItem('focusflow_challenge_submissions');
    localStorage.removeItem('focusflow_solved_problems');
    localStorage.removeItem('focusflow_focus_sessions');
    localStorage.removeItem('focusflow_completed_lessons');
    localStorage.removeItem('focusflow_enrolled_courses');
    localStorage.removeItem('focusflow_quiz_perf');
    localStorage.removeItem('focusflow_weekly_activity');
    localStorage.removeItem('focusflow_topics_revision');

    setUser(clearedUser);
    setCompletedLessons([]);
    setSolvedProblems([]);
    setChallengeSubmissions([]);
    setFocusSessions([]);
    setRecentSnippets([]);
    setEnrolledCourses(['python']);
    return true;
  };

  const level = Math.floor(user.xp / 1000) + 1;
  const currentLevelXp = user.xp % 1000;
  const xpForNextLevel = 1000;

  // Demonstrated Mastery distinguishes actual verified completions from time spent
  const demonstratedMastery = {
    algorithms: Math.min(100, (solvedProblems.length * 20) + (quizPerformance.averageScore ? Math.round(quizPerformance.averageScore * 0.4) : 0)),
    coreConcepts: Math.min(100, completedLessons.length * 8 + (quizPerformance.totalQuizzes * 6)),
    fullStackProjects: Math.min(100, projects.filter(p => p.status === 'Completed').length * 20 + 25)
  };

  return (
    <UserContext.Provider value={{ 
      theme,
      toggleTheme,
      user, 
      goals, 
      projects,
      updateProjectStep,
      updateProjectMilestone,
      linkProjectRepo,
      leaderboard, 
      materials, 
      classes, 
      challenges,
      customApiKey,
      updateCustomApiKey,
      isAuthenticated,
      level, 
      currentLevelXp, 
      xpForNextLevel,
      addXp, 
      completeTask,
      addTaskToGoal,
      deleteTaskFromGoal,
      deleteGoal,
      completeFocusSession,
      completeChallenge,
      updateUserProfile,
      enrollClass,
      setMaterials,
      setClasses,
      setProjects,
      login,
      logout,
      setGoals,
      // New personalized dashboard & learning hub states
      enrolledCourses,
      enrollCourse,
      unenrollCourse,
      completedLessons,
      completeLesson,
      isLessonCompleted,
      dailyGoal,
      toggleDailyTask,
      dailyChallenge,
      solveDailyChallenge,
      weeklyActivity,
      quizPerformance,
      recordQuizResult,
      recentSnippets,
      saveSnippet,
      lastActiveLesson,
      setLastActiveLesson,
      isOnboardingDismissed,
      dismissOnboarding,
      resetOnboarding,
      // Assessment & Coding practice states
      challengeSubmissions,
      solvedProblems,
      recordChallengeSubmission,
      // Focus sessions log
      focusSessions,
      recordFocusSession,
      // Personalized revision & mastery
      topicsNeedingRevision,
      clearTopicRevision,
      demonstratedMastery,
      requestDataDeletion
    }}>
      {children}
    </UserContext.Provider>
  );
};
