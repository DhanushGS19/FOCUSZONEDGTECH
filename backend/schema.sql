-- ====================================================================
-- TECHVERSE ENTERPRISE DATABASE ARCHITECTURE (PostgreSQL / Supabase)
-- Unified Data Schema with Row-Level Security (RLS) & Performance Indexes
-- ====================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 2. USER AUTHENTICATION & PROFILES
-- ====================================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'instructor', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    university VARCHAR(150),
    course VARCHAR(150),
    year VARCHAR(50),
    primary_stack VARCHAR(150),
    xp INTEGER DEFAULT 0 CHECK (xp >= 0),
    streak INTEGER DEFAULT 0 CHECK (streak >= 0),
    total_focus_minutes INTEGER DEFAULT 0 CHECK (total_focus_minutes >= 0),
    today_focus_minutes INTEGER DEFAULT 0 CHECK (today_focus_minutes >= 0),
    theme_preference VARCHAR(20) DEFAULT 'dark' CHECK (theme_preference IN ('dark', 'light')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 3. COURSES, MODULES, AND LESSONS
-- ====================================================================

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    tagline TEXT,
    description TEXT,
    icon VARCHAR(50),
    level VARCHAR(50) DEFAULT 'Beginner',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    level VARCHAR(50) DEFAULT 'Beginner',
    duration VARCHAR(50) DEFAULT '20 mins',
    objectives JSONB DEFAULT '[]'::jsonb,
    content_markdown TEXT NOT NULL,
    code_example TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(50) NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT TRUE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- ====================================================================
-- 4. CODING CHALLENGES & SUBMISSIONS
-- ====================================================================

CREATE TABLE IF NOT EXISTS coding_challenges (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    category VARCHAR(100) NOT NULL,
    language VARCHAR(50) DEFAULT 'JavaScript',
    description TEXT NOT NULL,
    starter_code TEXT NOT NULL,
    visible_test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    hidden_test_cases JSONB NOT NULL DEFAULT '[]'::jsonb,
    xp_reward INTEGER DEFAULT 60,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS challenge_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id VARCHAR(50) NOT NULL REFERENCES coding_challenges(id) ON DELETE CASCADE,
    language VARCHAR(50) NOT NULL,
    code_body TEXT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('Accepted', 'Failed', 'Compile Error', 'Timeout')),
    passed_count INTEGER NOT NULL,
    total_count INTEGER NOT NULL,
    runtime_ms INTEGER DEFAULT 0,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Solved challenge tracking to prevent duplicate XP rewards
CREATE TABLE IF NOT EXISTS user_solved_challenges (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id VARCHAR(50) NOT NULL REFERENCES coding_challenges(id) ON DELETE CASCADE,
    solved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY(user_id, challenge_id)
);

-- ====================================================================
-- 5. CODE SNIPPETS & REPOSITORIES
-- ====================================================================

CREATE TABLE IF NOT EXISTS saved_snippets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    language VARCHAR(50) NOT NULL,
    code_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 6. PROJECTS & USER PORTFOLIO
-- ====================================================================

CREATE TABLE IF NOT EXISTS project_blueprints (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    difficulty VARCHAR(50) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    category VARCHAR(100) NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    learning_objectives JSONB DEFAULT '[]'::jsonb,
    milestones JSONB DEFAULT '[]'::jsonb,
    starter_code TEXT,
    testing_guidance TEXT,
    documentation_guidance TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    tagline TEXT,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    github_url TEXT,
    live_url TEXT,
    description TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 7. FOCUS SESSIONS LOG
-- ====================================================================

CREATE TABLE IF NOT EXISTS focus_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
    associated_type VARCHAR(50) DEFAULT 'General',
    associated_title VARCHAR(200),
    completed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 8. QUIZZES & ADAPTIVE REVISION MISTAKES
-- ====================================================================

CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_mistakes_revision (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic VARCHAR(150) NOT NULL,
    reason TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    last_encountered TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 9. ACHIEVEMENTS, AI CONVERSATIONS & USER PREFERENCES
-- ====================================================================

CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_key VARCHAR(100) NOT NULL,
    title VARCHAR(150) NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_key)
);

CREATE TABLE IF NOT EXISTS ai_conversation_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'model', 'system')),
    content TEXT NOT NULL,
    context_type VARCHAR(50) DEFAULT 'general', -- 'code_lab', 'debugging', 'curriculum', 'quiz'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    theme VARCHAR(20) DEFAULT 'dark' CHECK (theme IN ('dark', 'light')),
    editor_font_size INTEGER DEFAULT 14,
    editor_word_wrap BOOLEAN DEFAULT TRUE,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    sound_effects_enabled BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================================================
-- 10. PERFORMANCE INDEXES
-- ====================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_xp ON profiles(xp DESC);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_submissions_user ON challenge_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user ON focus_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_snippets_user ON saved_snippets(user_id);
CREATE INDEX IF NOT EXISTS idx_user_portfolio_user ON user_portfolio(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ai_conversation_history(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);

-- ====================================================================
-- 11. ROW-LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_solved_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_mistakes_revision ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversation_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Public read access for curriculum and challenges
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read lessons" ON lessons FOR SELECT USING (true);

ALTER TABLE coding_challenges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read coding_challenges" ON coding_challenges FOR SELECT USING (true);

-- User-isolated data access policies
CREATE POLICY "Users access own profile" ON profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own progress" ON lesson_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own snippets" ON saved_snippets
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own submissions" ON challenge_submissions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own focus logs" ON focus_sessions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own portfolio" ON user_portfolio
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own achievements" ON user_achievements
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own ai chat" ON ai_conversation_history
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own preferences" ON user_preferences
    FOR ALL USING (auth.uid() = user_id);
