// Techverse Comprehensive Real-World Projects Library
// 15 Structured Projects across Beginner, Intermediate, and Advanced tiers

export const COMPREHENSIVE_PROJECTS = [
  // ==========================================
  // BEGINNER PROJECTS (1 - 5)
  // ==========================================
  {
    id: 'p_calc',
    title: 'Interactive Web Calculator',
    tagline: 'Modern arithmetic calculator with keyboard shortcuts and history log',
    difficulty: 'Beginner',
    category: 'Web Development',
    status: 'In Progress',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    description: 'Build a responsive, modern calculator capable of handling decimal arithmetic, operator precedence, keyboard event listening, and an interactive calculation history tape.',
    learningObjectives: [
      'Master DOM manipulation and event delegation',
      'Handle floating-point precision issues in JavaScript',
      'Support keyboard navigation and accessible keyboard shortcuts',
      'Persist calculation history in browser localStorage'
    ],
    requiredSkills: ['JavaScript ES6', 'DOM API', 'CSS Grid / Flexbox', 'Event Handling'],
    milestones: [
      { id: 'm1', title: 'Design sleek glassmorphic calculator UI with CSS Grid', completed: true },
      { id: 'm2', title: 'Implement basic arithmetic operations (+, -, *, /) and clear/delete', completed: true },
      { id: 'm3', title: 'Add keyboard event listeners (0-9, Enter, Backspace, Esc)', completed: false },
      { id: 'm4', title: 'Build toggleable calculation history drawer with localStorage sync', completed: false }
    ],
    starterCode: `// Calculator Core Engine Starter
class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand += number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+': computation = prev + current; break;
      case '-': computation = prev - current; break;
      case '*': computation = prev * current; break;
      case '/': computation = current === 0 ? 'Error: Div by 0' : prev / current; break;
      default: return;
    }
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }
}

console.log("Calculator engine initialized.");`,
    testingGuidance: 'Write unit tests verifying edge cases: division by zero, consecutive decimal clicks (e.g. 3.1.4 should be prevented), multiple operations without hitting equals, and negative numbers.',
    documentationGuidance: 'Create a README.md with screenshots, keyboard shortcut guide, browser compatibility table, and architectural breakdown of the expression parser.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_guess',
    title: 'Number Guessing Game (CLI & Web)',
    tagline: 'Interactive binary search guessing game with adaptive difficulty',
    difficulty: 'Beginner',
    category: 'Computer Science',
    status: 'Not Started',
    techStack: ['Python', 'JavaScript', 'Algorithms'],
    description: 'Create an engaging number guessing game where the player tries to find a secret number with feedback ("Too High", "Too Low"). Includes an AI mode that uses Binary Search to guess the user\'s number in O(log n) steps.',
    learningObjectives: [
      'Understand random number generation and seed concepts',
      'Implement binary search decision tree logic',
      'Track state: attempts, optimal score threshold, and best streaks',
      'Handle invalid inputs gracefully with validation loops'
    ],
    requiredSkills: ['Conditionals & Loops', 'Binary Search', 'Input Validation', 'State Management'],
    milestones: [
      { id: 'm1', title: 'Generate random target between 1 and 100 with configurable difficulty', completed: false },
      { id: 'm2', title: 'Validate numeric user input and provide High/Low directional feedback', completed: false },
      { id: 'm3', title: 'Calculate score based on log2(N) optimal attempt threshold', completed: false },
      { id: 'm4', title: 'Implement "AI Guesser" mode demonstrating Binary Search in action', completed: false }
    ],
    starterCode: `# Python Number Guessing Game Starter
import random
import math

def play_game(low=1, high=100):
    secret = random.randint(low, high)
    max_attempts = math.ceil(math.log2(high - low + 1))
    attempts = 0
    print(f"Guess the number between {low} and {high}! (Optimal: <= {max_attempts} tries)")
    
    while attempts < max_attempts + 3:
        try:
            guess = int(input(f"Attempt #{attempts + 1}: Enter guess: "))
            attempts += 1
            if guess == secret:
                print(f"🎉 Correct! You won in {attempts} attempts.")
                return True
            elif guess < secret:
                print("⬆️ Too Low! Aim higher.")
            else:
                print("⬇️ Too High! Aim lower.")
        except ValueError:
            print("❌ Invalid input! Please enter an integer.")
    print(f"Game Over! The number was {secret}.")
    return False

if __name__ == "__main__":
    play_game()`,
    testingGuidance: 'Simulate bounds: guesses below 1, above 100, string inputs, non-integer inputs, and verify the optimal binary search bounds formula.',
    documentationGuidance: 'Explain the mathematical proof behind why binary search finds any number in 1..100 within 7 tries (ceil(log2(100)) = 7).',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_todo',
    title: 'Developer Task & To-Do List',
    tagline: 'Clean task organizer with priority tags, filters, and local persistence',
    difficulty: 'Beginner',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Web Storage API'],
    description: 'Build a productivity to-do application with categorization (Work, Study, Personal), priority badges, due dates, search filtering, and JSON export/import.',
    learningObjectives: [
      'Master CRUD (Create, Read, Update, Delete) state logic in JavaScript',
      'Use Web Storage API (localStorage) for seamless client persistence',
      'Implement real-time search and multi-criteria filtering',
      'Design accessible and intuitive task check-off animations'
    ],
    requiredSkills: ['Array Methods (map, filter, reduce)', 'JSON serialization', 'DOM Events', 'CSS animations'],
    milestones: [
      { id: 'm1', title: 'Setup task state schema with ID, title, priority, category, completed', completed: false },
      { id: 'm2', title: 'Implement Add, Toggle Complete, and Delete task handlers', completed: false },
      { id: 'm3', title: 'Add category filter tabs (All, Active, Completed, High Priority)', completed: false },
      { id: 'm4', title: 'Implement localStorage sync and Export to JSON feature', completed: false }
    ],
    starterCode: `// Task Manager State Store
const TaskStore = {
  tasks: JSON.parse(localStorage.getItem('techverse_todos') || '[]'),
  
  save() {
    localStorage.setItem('techverse_todos', JSON.stringify(this.tasks));
  },
  
  add(title, priority = 'Medium', category = 'Study') {
    const newTask = {
      id: 'task_' + Date.now(),
      title,
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.unshift(newTask);
    this.save();
    return newTask;
  },
  
  toggle(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.save();
    }
  },
  
  delete(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }
};`,
    testingGuidance: 'Test adding empty strings (should reject), special characters/HTML tags (should sanitize against XSS), and rapid state toggles.',
    documentationGuidance: 'Document component hierarchy, data schema, localStorage schema, and keyboard interaction specs.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_port_beg',
    title: 'Personal Developer Portfolio',
    tagline: 'Modern, responsive developer showcase with dark mode and project gallery',
    difficulty: 'Beginner',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['HTML5', 'CSS Variables', 'JavaScript', 'Responsive Design'],
    description: 'Design and build your official developer portfolio website. Features an about section, tech stack badges, interactive project cards with live demo links, and a functional contact form.',
    learningObjectives: [
      'Implement mobile-first responsive web design with CSS Flexbox & Grid',
      'Use CSS Custom Properties (CSS variables) for light/dark theme switching',
      'Build semantic HTML5 with accessibility (a11y) landmarks',
      'Deploy live on GitHub Pages, Vercel, or Netlify'
    ],
    requiredSkills: ['Semantic HTML5', 'Responsive CSS Media Queries', 'CSS Grid', 'Theme Switching'],
    milestones: [
      { id: 'm1', title: 'Build hero section with bio, avatar, and social links', completed: false },
      { id: 'm2', title: 'Create skills grid with category icons and proficiency levels', completed: false },
      { id: 'm3', title: 'Build responsive project showcase grid with tags and external links', completed: false },
      { id: 'm4', title: 'Implement dark/light theme toggle with localStorage persistence', completed: false }
    ],
    starterCode: `<!-- Portfolio Semantic Structure -->
<header class="portfolio-header">
  <nav class="nav-container">
    <div class="logo">&lt;Developer /&gt;</div>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button id="themeToggle" aria-label="Toggle Theme">🌙</button>
  </nav>
</header>

<main>
  <section id="hero" class="hero-section">
    <h1>Hi, I'm <span class="highlight">Alex Rivera</span></h1>
    <p>Computer Science Student & Full-Stack Builder</p>
  </section>
</main>`,
    testingGuidance: 'Audit with Google Lighthouse for Accessibility, SEO, and Performance (target 95+ in all categories). Test on mobile (375px), tablet (768px), and 4K displays.',
    documentationGuidance: 'Write setup and custom deployment instructions explaining how to link a custom domain and update content.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_marks',
    title: 'Student Marks & GPA Calculator',
    tagline: 'Academic grade aggregator with GPA calculation and pass/fail analytics',
    difficulty: 'Beginner',
    category: 'Software Engineering',
    status: 'Not Started',
    techStack: ['Python', 'JavaScript', 'Data Validation'],
    description: 'Build an academic GPA and percentage calculator that accepts subject marks, credit hours, and grading scales (4.0, 10.0, or percentage), computing semester honors, GPA, and grade letters.',
    learningObjectives: [
      'Master weighted averages and GPA grading matrices',
      'Implement defensive programming with input type and boundary verification',
      'Format tabular academic transcripts dynamically',
      'Calculate statistical metrics (mean, median, highest/lowest subject)'
    ],
    requiredSkills: ['Mathematical Computations', 'Arrays & Objects', 'Form Validation', 'Dynamic Tables'],
    milestones: [
      { id: 'm1', title: 'Define grading scale configuration (A: 90+, B: 80+, etc.) and credit weights', completed: false },
      { id: 'm2', title: 'Create dynamic subject input row generator (Add/Remove Course)', completed: false },
      { id: 'm3', title: 'Calculate overall GPA, total credits earned, and percentage', completed: false },
      { id: 'm4', title: 'Generate printable / downloadable academic grade report', completed: false }
    ],
    starterCode: `// GPA Calculation Engine
const GRADING_SCALE = [
  { grade: 'A+', min: 95, gpa: 4.0 },
  { grade: 'A',  min: 90, gpa: 4.0 },
  { grade: 'B+', min: 85, gpa: 3.5 },
  { grade: 'B',  min: 80, gpa: 3.0 },
  { grade: 'C+', min: 75, gpa: 2.5 },
  { grade: 'C',  min: 70, gpa: 2.0 },
  { grade: 'F',  min: 0,  gpa: 0.0 }
];

function calculateSemesterGPA(courses) {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (let c of courses) {
    const scale = GRADING_SCALE.find(s => c.score >= s.min) || GRADING_SCALE[GRADING_SCALE.length - 1];
    totalGradePoints += scale.gpa * c.credits;
    totalCredits += c.credits;
  }

  return {
    gpa: totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : '0.00',
    totalCredits
  };
}`,
    testingGuidance: 'Verify edge cases: 0 credit courses, invalid marks (> 100 or < 0), non-numeric values, and empty course lists.',
    documentationGuidance: 'Include a table detailing standard grading point conversions and mathematical formulas for weighted cumulative GPA.',
    githubUrl: '',
    liveUrl: ''
  },

  // ==========================================
  // INTERMEDIATE PROJECTS (6 - 10)
  // ==========================================
  {
    id: 'p_sms',
    title: 'Student Management System',
    tagline: 'Relational student record portal with CRUD, attendance, and search',
    difficulty: 'Intermediate',
    category: 'Full-Stack',
    status: 'In Progress',
    techStack: ['React', 'Node.js', 'SQL / SQLite', 'REST API'],
    description: 'A full-featured student management portal for universities. Allows staff to enroll students, assign courses, record attendance, manage grades, and search by enrollment ID, branch, or GPA.',
    learningObjectives: [
      'Design relational schemas with foreign key constraints',
      'Implement full RESTful endpoints (GET, POST, PUT, DELETE)',
      'Handle client-side pagination, sorting, and debounced search',
      'Manage complex multi-entity state in React'
    ],
    requiredSkills: ['SQL & Schema Design', 'Express / Node.js', 'React State Management', 'REST APIs'],
    milestones: [
      { id: 'm1', title: 'Design SQL database tables for Students, Courses, and Enrollments', completed: true },
      { id: 'm2', title: 'Build Express REST API routes with input sanitization', completed: false },
      { id: 'm3', title: 'Create React data table with pagination, sorting, and search filter', completed: false },
      { id: 'm4', title: 'Build Modal dialogs for adding and editing student records', completed: false }
    ],
    starterCode: `// Express API Endpoint Example for Student Management
const express = require('express');
const router = express.Router();

let students = [
  { id: 'STU101', name: 'Maya Lin', email: 'maya@tech.edu', major: 'CS', gpa: 3.85, status: 'Active' },
  { id: 'STU102', name: 'Ethan James', email: 'ethan@tech.edu', major: 'ECE', gpa: 3.42, status: 'Active' }
];

router.get('/students', (req, res) => {
  const { search, major } = req.query;
  let results = [...students];
  if (major && major !== 'All') {
    results = results.filter(s => s.major === major);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
  }
  res.json({ success: true, count: results.length, data: results });
});

module.exports = router;`,
    testingGuidance: 'Write API integration tests checking duplicate student ID rejection, email regex format checks, and SQL injection prevention.',
    documentationGuidance: 'Document ER diagrams (Entity Relationship), API route contract with request/response payloads, and database seeding guide.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_expense',
    title: 'Expense Tracker & Budget Studio',
    tagline: 'Personal finance visualizer with spending breakdown and budget limits',
    difficulty: 'Intermediate',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['React', 'Chart.js / Recharts', 'LocalStorage', 'CSS'],
    description: 'Track daily expenses, incomes, and monthly budgets. Categorize expenditures (Housing, Food, Entertainment, Education) and visualize real-time cash flow with interactive bar and pie charts.',
    learningObjectives: [
      'Integrate interactive data visualization libraries (Charts/SVG)',
      'Calculate cumulative running totals and budget threshold alerts',
      'Format international currencies with Intl.NumberFormat',
      'Export financial records to CSV format'
    ],
    requiredSkills: ['Data Aggregation', 'Data Visualization', 'State Modeling', 'CSV Serialization'],
    milestones: [
      { id: 'm1', title: 'Build balance overview cards (Total Balance, Income, Expenses)', completed: false },
      { id: 'm2', title: 'Create transaction entry form with date, amount, type, and category', completed: false },
      { id: 'm3', title: 'Render interactive categorical breakdown chart', completed: false },
      { id: 'm4', title: 'Add budget limits with warning banners when expenses exceed 80%', completed: false }
    ],
    starterCode: `// Monthly Expense Aggregation Helper
function aggregateCategoryTotals(transactions) {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
}

function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}`,
    testingGuidance: 'Verify math accuracy across mixed credit/debit entries, rounding of cents, leap year date parsing, and CSV column escaping.',
    documentationGuidance: 'Provide user manual on setting category budgets and architecture notes on data sanitization.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_weather',
    title: 'Real-Time Weather Dashboard',
    tagline: 'Live meteorological dashboard with geolocation and 5-day forecast',
    difficulty: 'Intermediate',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['JavaScript', 'OpenWeatherMap API', 'HTML5 Geolocation', 'CSS'],
    description: 'A meteorological forecast application that pulls live weather conditions based on city search or browser geolocation. Displays humidity, wind speed, UV index, and an animated 5-day temperature curve.',
    learningObjectives: [
      'Handle asynchronous HTTP requests with fetch/async/await and error handling',
      'Use HTML5 Geolocation API with permissions fallback',
      'Process nested JSON payloads and handle missing API values',
      'Dynamically update theme/background according to current weather condition (Sunny, Rain, Storm)'
    ],
    requiredSkills: ['Async/Await & Promises', 'REST API Integration', 'Geolocation API', 'Dynamic Theming'],
    milestones: [
      { id: 'm1', title: 'Setup weather API client with secure endpoint query abstraction', completed: false },
      { id: 'm2', title: 'Build current weather card with temp, feels-like, wind, and humidity', completed: false },
      { id: 'm3', title: 'Render 5-day forecast cards with high/low temperatures', completed: false },
      { id: 'm4', title: 'Implement unit switcher (Celsius °C / Fahrenheit °F) with immediate re-render', completed: false }
    ],
    starterCode: `// Weather API Service Wrapper
async function fetchCityWeather(city, apiKey) {
  try {
    const res = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${encodeURIComponent(city)}&units=metric&appid=\${apiKey}\`);
    if (!res.ok) {
      if (res.status === 404) throw new Error('City not found. Please verify spelling.');
      throw new Error('Weather service unavailable.');
    }
    const data = await res.json();
    return {
      city: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
  } catch (err) {
    console.error('Weather Fetch Error:', err.message);
    throw err;
  }
}`,
    testingGuidance: 'Simulate API failures (401 invalid key, 404 not found, 500 server error, network offline) and check that user-friendly error banners are displayed.',
    documentationGuidance: 'Explain API rate limits, how to obtain and securely store API keys in .env files without committing secrets to GitHub.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_quiz',
    title: 'Interactive Quiz Application',
    tagline: 'Custom quiz platform with countdown timer, categories, and review mode',
    difficulty: 'Intermediate',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['React', 'CSS Glassmorphism', 'Web Audio API'],
    description: 'Build a competitive quiz platform featuring multi-choice and true/false questions, per-question countdown timers, streak multipliers, sound effects, and an end-of-game mistake review screen.',
    learningObjectives: [
      'Manage complex game lifecycle state (Lobby, Playing, Time Expired, Summary)',
      'Implement setInterval countdowns with clean component unmounting',
      'Calculate streak score bonuses and percentile metrics',
      'Allow users to review questions they got wrong with detailed explanations'
    ],
    requiredSkills: ['React Lifecycle & Hooks', 'Timer Management', 'Array Randomization / Shuffling', 'Audio Effects'],
    milestones: [
      { id: 'm1', title: 'Create question dataset loader with category and difficulty filters', completed: false },
      { id: 'm2', title: 'Build question card with 15-second countdown timer and score multipliers', completed: false },
      { id: 'm3', title: 'Implement audio feedback (chime for correct, buzz for incorrect)', completed: false },
      { id: 'm4', title: 'Build post-quiz review modal highlighting correct answers and explanations', completed: false }
    ],
    starterCode: `// Fisher-Yates Array Shuffler for Questions
function shuffleArray(array) {
  const arr = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Score Calculator with Streak Bonus
function computeQuizScore(answers) {
  let score = 0;
  let streak = 0;
  for (let a of answers) {
    if (a.isCorrect) {
      streak++;
      score += 100 * (1 + streak * 0.1);
    } else {
      streak = 0;
    }
  }
  return Math.round(score);
}`,
    testingGuidance: 'Test timer expiration: verify the question automatically advances when the clock hits zero. Verify score cannot become negative.',
    documentationGuidance: 'Write instructions for adding custom JSON question packs and configuring timer durations.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_library',
    title: 'Library Management System',
    tagline: 'Book cataloging and borrowing portal with due date and fine tracking',
    difficulty: 'Intermediate',
    category: 'Software Engineering',
    status: 'Not Started',
    techStack: ['Python / Node.js', 'SQL', 'REST API', 'HTML/CSS'],
    description: 'A comprehensive digital library system. Manages book cataloging (ISBN, Author, Copies), member borrowing privileges, due-date calculation, automated late fine assessment, and reservation queues.',
    learningObjectives: [
      'Model complex relational domain logic (Books, Copies, Loans, Members, Fines)',
      'Implement transaction boundaries (preventing loaning when copies = 0)',
      'Calculate date differences and overdue penalty business rules',
      'Implement search across title, author, and ISBN'
    ],
    requiredSkills: ['Database Transactions', 'Date Math', 'Business Logic Validation', 'CRUD Operations'],
    milestones: [
      { id: 'm1', title: 'Model database tables with inventory quantity and active loan status', completed: false },
      { id: 'm2', title: 'Implement Checkout Book transaction verifying copy availability', completed: false },
      { id: 'm3', title: 'Build Return Book endpoint calculating overdue fine ($1.00/day)', completed: false },
      { id: 'm4', title: 'Create catalog UI with instant availability status pills', completed: false }
    ],
    starterCode: `// Book Checkout Logic with Concurrency Guard
class LibraryService {
  constructor(database) {
    this.db = database;
  }

  async checkoutBook(memberId, bookId) {
    const book = await this.db.getBook(bookId);
    if (!book || book.availableCopies <= 0) {
      throw new Error('Book is currently unavailable.');
    }

    const memberLoans = await this.db.getActiveLoans(memberId);
    if (memberLoans.length >= 5) {
      throw new Error('Borrowing limit exceeded (Max 5 active loans).');
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 14-day checkout

    await this.db.decrementCopies(bookId);
    const loan = await this.db.createLoan({ memberId, bookId, dueDate, returned: false });
    return loan;
  }
}`,
    testingGuidance: 'Test race condition: 1 copy left with 2 simultaneous checkout requests. Verify second request receives "Unavailable" message.',
    documentationGuidance: 'Include database schema diagrams, loan state machine diagram (Available -> Borrowed -> Overdue -> Returned), and fine policies.',
    githubUrl: '',
    liveUrl: ''
  },

  // ==========================================
  // ADVANCED PROJECTS (11 - 15)
  // ==========================================
  {
    id: 'p_lms',
    title: 'Full-Stack Learning Platform',
    tagline: 'Interactive course platform with video playback, code editor, and progress',
    difficulty: 'Advanced',
    category: 'Full-Stack',
    status: 'In Progress',
    techStack: ['React', 'Node.js', 'PostgreSQL / Prisma', 'JWT Auth', 'Monaco Editor'],
    description: 'An enterprise-grade educational learning management system. Features authentication (JWT), structured curricula, interactive in-browser coding exercises, video progress synchronization, and student discussion boards.',
    learningObjectives: [
      'Architect full-stack authentication with access & refresh tokens',
      'Integrate Monaco / CodeMirror editor with code execution sandboxes',
      'Optimize relational queries using ORM (Prisma/TypeORM) and caching',
      'Implement role-based access control (Admin, Instructor, Student)'
    ],
    requiredSkills: ['Full-Stack Architecture', 'JWT Authentication', 'RBAC Security', 'PostgreSQL', 'Code Editor Integration'],
    milestones: [
      { id: 'm1', title: 'Implement JWT authentication with password hashing (bcrypt)', completed: true },
      { id: 'm2', title: 'Design modular Course -> Module -> Lesson -> Quiz database hierarchy', completed: true },
      { id: 'm3', title: 'Embed interactive Code Editor with language execution worker', completed: false },
      { id: 'm4', title: 'Build student analytics dashboard with course completion percentage', completed: false }
    ],
    starterCode: `// JWT Authentication Middleware Example
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required.' });

  jwt.verify(token, process.env.JWT_SECRET || 'techverse_secret', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is invalid or expired.' });
    req.user = user;
    next();
  });
}`,
    testingGuidance: 'Conduct security vulnerability scan: test expired tokens, unauthorized role access to instructor endpoints, and XSS in forum posts.',
    documentationGuidance: 'Create comprehensive system architecture blueprint, database migration guide, and production Docker deployment walkthrough.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_ai_assistant',
    title: 'AI Study Assistant & Document RAG',
    tagline: 'Intelligent study companion with PDF parsing, vector search, and Gemini AI',
    difficulty: 'Advanced',
    category: 'AI / LLM',
    status: 'Not Started',
    techStack: ['Gemini 2.5 API', 'Vector Embeddings', 'Node.js / Python', 'React'],
    description: 'Build an intelligent study assistant that allows students to upload lecture slides or textbooks, generates embeddings, performs semantic vector search (RAG), and answers complex conceptual questions with exact page citations.',
    learningObjectives: [
      'Master Retrieval-Augmented Generation (RAG) architecture',
      'Generate and store text vector embeddings with cosine similarity search',
      'Design context-efficient system prompts with token-window guards',
      'Implement real-time streaming responses via Server-Sent Events (SSE)'
    ],
    requiredSkills: ['LLM APIs (Gemini)', 'Embeddings & Vector Cosine Math', 'Document Chunking', 'Streaming Protocols'],
    milestones: [
      { id: 'm1', title: 'Build document text extractor and recursive chunking pipeline (500 tokens / chunk)', completed: false },
      { id: 'm2', title: 'Generate vector embeddings and implement cosine similarity search', completed: false },
      { id: 'm3', title: 'Assemble context prompt and query Gemini API with source citations', completed: false },
      { id: 'm4', title: 'Create interactive chat UI with streaming markdown & formula rendering', completed: false }
    ],
    starterCode: `// Vector Cosine Similarity Search Engine
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Find Top-K relevant chunks
function retrieveRelevantChunks(queryEmbedding, documentChunks, k = 3) {
  return documentChunks
    .map(chunk => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}`,
    testingGuidance: 'Benchmark retrieval accuracy: verify that asking questions regarding chapter 3 does not return irrevelant chunks from chapter 1.',
    documentationGuidance: 'Document RAG pipeline diagram, chunking strategy comparison (fixed vs sentence-aware), and latency benchmarks.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_finance',
    title: 'Personal Finance Dashboard & Net Worth',
    tagline: 'Multi-portfolio financial engine with forecasting, stocks, and cash flow',
    difficulty: 'Advanced',
    category: 'Full-Stack',
    status: 'Not Started',
    techStack: ['React', 'TypeScript', 'D3.js / Recharts', 'PostgreSQL', 'WebSockets'],
    description: 'An institutional-grade personal wealth and investment management console. Tracks real-time asset allocation (Equities, Crypto, Cash, Real Estate), projects compound interest curves, and models retirement scenarios.',
    learningObjectives: [
      'Model complex multi-currency financial balance sheets',
      'Implement compound interest and Monte Carlo simulation algorithms',
      'Optimize high-frequency data rendering with React memo and virtualized lists',
      'Design clean, high-density financial charts with D3 / SVG'
    ],
    requiredSkills: ['Financial Modeling Math', 'TypeScript Strict Mode', 'D3 / Chart Optimization', 'High-Density UI'],
    milestones: [
      { id: 'm1', title: 'Design asset & liability portfolio schema with historical snapshot tracking', completed: false },
      { id: 'm2', title: 'Build compound interest & retirement wealth projection simulator', completed: false },
      { id: 'm3', title: 'Create interactive asset allocation donut chart and cash flow waterfall', completed: false },
      { id: 'm4', title: 'Add scenario modeling (e.g. +5% savings rate vs -2% inflation)', completed: false }
    ],
    starterCode: `// Compound Interest Wealth Projection Engine
function calculateWealthProjection(initialPrincipal, monthlyContribution, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const totalMonths = years * 12;
  const projection = [];

  let currentBalance = initialPrincipal;
  let totalContributed = initialPrincipal;

  for (let month = 1; month <= totalMonths; month++) {
    currentBalance = (currentBalance + monthlyContribution) * (1 + monthlyRate);
    totalContributed += monthlyContribution;

    if (month % 12 === 0) {
      projection.push({
        year: month / 12,
        balance: Math.round(currentBalance),
        contributed: Math.round(totalContributed),
        interestEarned: Math.round(currentBalance - totalContributed)
      });
    }
  }

  return projection;
}`,
    testingGuidance: 'Cross-reference compound interest math with established financial standards (e.g., test 10k initial @ 7% for 30 years with 500/mo contribution).',
    documentationGuidance: 'Provide mathematical derivations for time-value-of-money equations and database transaction integrity rules.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_collab_task',
    title: 'Collaborative Task Manager (Real-Time)',
    tagline: 'Kanban board with live presence, drag-and-drop, and WebSocket updates',
    difficulty: 'Advanced',
    category: 'Full-Stack',
    status: 'Not Started',
    techStack: ['React', 'WebSockets / Socket.io', 'Node.js', 'Drag and Drop API'],
    description: 'A multi-user collaborative agile project board. Team members can drag and drop cards between backlog, in-progress, review, and done states, seeing real-time remote cursor indicators, avatar presence, and live updates.',
    learningObjectives: [
      'Manage concurrent bi-directional WebSocket event channels',
      'Implement smooth drag-and-drop state transitions with HTML5 Drag API',
      'Resolve race conditions and concurrent card modifications gracefully',
      'Implement user presence heartbeats and activity audit logging'
    ],
    requiredSkills: ['WebSocket Protocol', 'State Synchronization', 'HTML5 Drag & Drop', 'Event Broadcasting'],
    milestones: [
      { id: 'm1', title: 'Setup WebSocket server with room joining and client connection pools', completed: false },
      { id: 'm2', title: 'Implement drag-and-drop Kanban columns with reordering animations', completed: false },
      { id: 'm3', title: 'Broadcast card move and edit events to all active peers in room', completed: false },
      { id: 'm4', title: 'Build live presence avatars showing active editors per board', completed: false }
    ],
    starterCode: `// WebSocket Real-Time Event Sync Starter
const { Server } = require('socket.io');

function initializeCollaborationServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_board', (boardId) => {
      socket.join(boardId);
      socket.to(boardId).emit('user_joined', { userId: socket.id });
    });

    socket.on('card_moved', ({ boardId, cardId, sourceCol, destCol, newIndex }) => {
      // Broadcast update to all other room members
      socket.to(boardId).emit('remote_card_moved', {
        cardId, sourceCol, destCol, newIndex, movedBy: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}`,
    testingGuidance: 'Open two browser windows side by side and drag a card: verify that window 2 updates within 50ms without dropping state or desyncing.',
    documentationGuidance: 'Document socket event schemas (join_board, card_moved, cursor_update), disconnection reconnection policy, and offline rollback.',
    githubUrl: '',
    liveUrl: ''
  },
  {
    id: 'p_dev_portfolio',
    title: 'Developer Portfolio & Technical Blog Engine',
    tagline: 'Static site generator with markdown parsing, syntax highlighting, and RSS',
    difficulty: 'Advanced',
    category: 'Web Development',
    status: 'Not Started',
    techStack: ['Next.js / Vite', 'Markdown / MDX', 'Prism.js', 'SEO Meta Tags'],
    description: 'An advanced personal publishing platform. Features MDX article rendering, live code block previews, reading time estimators, dynamic OpenGraph image generation, RSS feed creation, and comment threads.',
    learningObjectives: [
      'Parse Markdown/MDX into structured AST (Abstract Syntax Tree)',
      'Implement syntax highlighting and copy-to-clipboard for code blocks',
      'Automate SEO meta tags, canonical URLs, and RSS feed XML generation',
      'Optimize Core Web Vitals (LCP < 1.2s, CLS = 0, FID < 50ms)'
    ],
    requiredSkills: ['AST & Markdown Compilation', 'SEO & OpenGraph Architecture', 'Performance Optimization', 'RSS Feeds'],
    milestones: [
      { id: 'm1', title: 'Build markdown content parser supporting YAML frontmatter metadata', completed: false },
      { id: 'm2', title: 'Implement syntax highlighted code blocks with language badges', completed: false },
      { id: 'm3', title: 'Generate automated RSS 2.0 XML feed and sitemap.xml', completed: false },
      { id: 'm4', title: 'Audit and achieve 100/100 Google Lighthouse score on all audits', completed: false }
    ],
    starterCode: `// Frontmatter and Reading Time Parser
function parseArticleMetadata(rawMarkdown) {
  const frontmatterRegex = /^---\r?\n([\\s\\S]*?)\r?\n---/;
  const match = rawMarkdown.match(frontmatterRegex);
  let metadata = {};
  let content = rawMarkdown;

  if (match) {
    const yamlLines = match[1].split('\\n');
    yamlLines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        metadata[key.trim()] = rest.join(':').trim();
      }
    });
    content = rawMarkdown.replace(frontmatterRegex, '').trim();
  }

  const wordCount = content.split(/\\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return { metadata, content, wordCount, readingTimeMinutes };
}`,
    testingGuidance: 'Test markdown parsing with nested code blocks, tables, math formulas (KaTeX), and check that sitemap.xml validly validates via W3C validator.',
    documentationGuidance: 'Explain MDX component injection architecture, RSS feed consumption instructions, and deployment workflow.',
    githubUrl: '',
    liveUrl: ''
  }
];
