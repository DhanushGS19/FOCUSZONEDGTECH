# Techverse — AI-Powered Technology Learning & Development Platform

> **Tagline:** *Learn. Code. Build. Evolve.*

Techverse (formerly Focus Flow) is a unified, intelligent engineering platform that combines structured technology curricula, browser-based multi-language code execution, professional developer utilities, artificial intelligence tutoring, practical portfolio projects, and distraction-free deep work productivity tools.

---

## 🌟 Architecture & Technology Stack

- **Frontend Core:** React 19, React Router v7, Vite v8, Lucide React icons, Custom Vanilla CSS Design System.
- **Backend Core:** Node.js, Express 4.x, Google Generative AI (`@google/generative-ai`), CORS, Dotenv.
- **Database Architecture:** PostgreSQL / Supabase with Row-Level Security (RLS) policies and B-tree performance indexes ([`backend/schema.sql`](./backend/schema.sql)).
- **Execution Sandboxes:** Piston execution container API integration for C, C++, Java, Python, and Node.js; iframe isolated sandbox for HTML/CSS/JS with restrictive `sandbox="allow-scripts"` attributes.

---

## 🚀 Key Features Implemented

### 1. Unified Dashboard ([`src/pages/Home.jsx`](./src/pages/Home.jsx))
- Active learning track resumes with instant progress metrics.
- Daily coding challenge with integrated starter code and hash map optimizations.
- Adaptive revision alerts warning of weak areas identified in drills.
- Quick navigation into Code Lab, Flow AI, and Developer Tools.

### 2. Multi-Language Curricula ([`src/pages/Learn.jsx`](./src/pages/Learn.jsx))
- Comprehensive curriculum across 9 tracks: **Python, JavaScript, C++, Java, SQL, Git & GitHub, React, DSA, and Distributed Systems**.
- Structured tier levels (Beginner, Intermediate, Advanced) with interactive lesson progress tracking and local storage persistence.

### 3. Multi-Language Code Lab ([`src/pages/CodeLab.jsx`](./src/pages/CodeLab.jsx))
- Browser-based IDE supporting **Python, C, C++, Java, and JavaScript**.
- Execution via Piston container sandbox with stdout, stderr, compile errors, runtime metrics, snippet saving, and custom input STDIN.

### 4. Flow AI Tutoring Hub ([`src/pages/Chat.jsx`](./src/pages/Chat.jsx))
- 6 AI specialist modes: *General Tutor*, *Code Debugger*, *Code Optimizer*, *System Design Architect*, *Concept Explainer*, and *Interview Prep*.
- Gemini 2.5 Flash streaming chat integration with fallback conceptual explanations.

### 5. Coding Practice & Assessments ([`src/pages/Tests.jsx`](./src/pages/Tests.jsx))
- Multi-criteria filtering by Difficulty (Easy, Medium, Hard), Topic (Arrays, Stacks, DP, Trees, Strings), and Language.
- **Authoritative Grading:** Evaluates submissions against visible and **hidden test cases**.
- Anti-duplicate XP reward protection and submission audit history drawer.
- Tricky output-prediction challenges and interactive debugging drills.

### 6. Developer Tools Suite ([`src/pages/DevTools.jsx`](./src/pages/DevTools.jsx))
Expanded into 6 full-featured suites:
1. **Programming Utilities:** JSON Formatter & Minifier, Base64/URL Encoders, RegEx Tester, Text Diff Checker, Number Base Converter, Timestamp Studio, and Word Counter.
2. **Web Dev Studio:** Sandboxed HTML/CSS/JS preview, CSS Gradient Studio, WCAG AA Contrast Analyzer, Box-Shadow Studio, and Organic Border-Radius generator.
3. **CS Visualizers:** Sorting (Bubble/Selection) with step delays, Binary Search pointer tracking, Data Structures (Stack, Queue, Linked List), and 2D BFS Pathfinding.
4. **SQL Playground:** In-browser relational engine executing queries against preloaded relational tables with execution latency metrics.
5. **Git Studio:** Interactive commit graph visualizer DAG, branch switcher, Merge Conflict Studio with 3 resolution strategies, and drill guides.
6. **API Testing Studio:** Guided REST client supporting `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, header/param builders, JSON validation, and response inspection.

### 7. Project-Based Learning & Portfolio ([`src/pages/Projects.jsx`](./src/pages/Projects.jsx))
- 15 comprehensive projects across Beginner, Intermediate, and Advanced tiers.
- Interactive milestone checklists, starter code, architecture diagrams, and "Link to Portfolio" repository submission.

### 8. Focus Zone Productivity ([`src/pages/Focus.jsx`](./src/pages/Focus.jsx))
- Presets (15m, 25m, 30m, 45m) and custom duration timers.
- **Background Accuracy (Zero Tab Drift):** Uses timestamp delta (`Date.now() + timeLeft * 1000`) and `visibilitychange` to eliminate browser tab sleep drift.
- Synthesized Web Audio pink noise generator and completion chime.
- Session logs with associated topics and note-taking scratchpad.

### 9. Demonstrated Mastery & Analytics ([`src/pages/Progress.jsx`](./src/pages/Progress.jsx))
- Separates verified demonstrated competence from passive time spent across Algorithms, Core CS Concepts, and Full-Stack Projects.
- Topics needing revision engine and 8 unlockable milestone achievement badges.

### 10. User Accounts, Profile & Privacy ([`src/pages/Profile.jsx`](./src/pages/Profile.jsx))
- Multi-tab developer profile with Avatar Aura swatches, skill level selectors, active roadmap goals, and selected technology tags.
- Showcase for completed curricula, saved code snippets, and linked project portfolio.
- **GDPR Right to Erasure:** 2-step confirmation modal making authenticated `DELETE /api/user/delete-data` requests.

### 11. Admin & Content Management Console ([`src/pages/Admin.jsx`](./src/pages/Admin.jsx))
- Protected admin area with role enforcement checks.
- Curriculum authoring, DSA challenge creation with hidden test cases, quiz authoring, and system audit logs.

### 12. Universal Search Command Palette ([`src/components/GlobalSearchModal.jsx`](./src/components/GlobalSearchModal.jsx))
- Shortcut `Ctrl+K` / `⌘K` or topbar search button.
- Indexes courses, lessons, tools, challenges, and projects with real-time navigation.

---

## 🔒 Preserved Existing Focus Flow Functionality

- Preserved the original Focus Flow Pomodoro timer and study sessions.
- Preserved goal task tracking and breakdown tools.
- Preserved Aura Bot study companion.
- Preserved dark/light theme switching with modern high-contrast styling.
- Preserved local storage data persistence for offline capability.

---

## 🛠️ Setup & Running Locally

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Run production build validation
npm run build

# Run linter
npm run lint
```
Frontend runs by default on `http://localhost:5173`.

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Copy environment variables template
cp .env.example .env

# Start Express server
node server.js
```
Backend runs by default on `http://localhost:8080`.

---

## 🗄️ Database Setup (PostgreSQL / Supabase)

1. Open your PostgreSQL database client or the [Supabase SQL Editor](https://app.supabase.com).
2. Execute the migration script located at [`backend/schema.sql`](./backend/schema.sql).
3. The script automatically creates:
   - 13 normalized tables with foreign keys and cascade rules.
   - B-tree performance indexes on high-traffic columns.
   - Row-Level Security (RLS) policies isolating user records while keeping educational tracks readable.

---

## 🔑 Environment Variables

Create `backend/.env` containing:
```ini
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here
PORT=8080

# PostgreSQL / Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SUPABASE_URL=https://[PROJECT-REF].supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```
*(Note: If `GEMINI_API_KEY` is not provided, Techverse automatically operates in safe fallback mode with preloaded algorithmic tutoring guides, output prediction explanations, and test cases.)*

---

## 🧪 Automated Verification & Testing

- **Linting:** Verified with `oxlint` — **0 errors** across 36 files.
- **Production Build:** Verified with `npm run build` — compiled in **801ms** with **0 errors**.
- **Dev Server Status:** Verified via `Invoke-WebRequest` — returns **HTTP 200 OK**.
