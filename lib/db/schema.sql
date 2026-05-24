-- ============================================================
-- USERS
-- Students: username only (no password)
-- Teachers: pin_hash for PIN-based access
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username        TEXT UNIQUE,                     -- students use this to log in
  full_name       TEXT NOT NULL,
  role            TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  pin_hash        TEXT,                            -- teachers only
  avatar_url      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CLASSES
-- ============================================================

CREATE TABLE IF NOT EXISTS classes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  year        INT NOT NULL,
  teacher_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_code  TEXT UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS class_enrollments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id  UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (class_id, student_id)
);

-- ============================================================
-- COURSE CONTENT
-- ============================================================

CREATE TABLE IF NOT EXISTS units (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  subtitle    TEXT,
  semester    INT NOT NULL CHECK (semester IN (1, 2)),
  order_index INT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'coming_soon', 'locked')),
  color       TEXT NOT NULL DEFAULT '#6366f1',
  icon        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topics (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id          UUID NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  description      TEXT,
  order_index      INT NOT NULL,
  color            TEXT NOT NULL DEFAULT '#6366f1',
  icon             TEXT,
  estimated_hours  NUMERIC(4,1) NOT NULL DEFAULT 1,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lessons (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id            UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  type                TEXT NOT NULL CHECK (type IN ('article', 'video', 'quiz', 'exercise')),
  content             JSONB,
  order_index         INT NOT NULL,
  estimated_minutes   INT NOT NULL DEFAULT 10,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PROGRESS
-- ============================================================

CREATE TABLE IF NOT EXISTS lesson_progress (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id          UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id           UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  status              TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  started_at          TIMESTAMPTZ,
  completed_at        TIMESTAMPTZ,
  time_spent_minutes  INT NOT NULL DEFAULT 0,
  UNIQUE (student_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS topic_progress (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id        UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  topic_id          UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
  mastery_level     TEXT NOT NULL DEFAULT 'not_started' CHECK (mastery_level IN ('not_started', 'developing', 'achieved', 'mastered')),
  lessons_completed INT NOT NULL DEFAULT 0,
  lessons_total     INT NOT NULL DEFAULT 0,
  last_accessed_at  TIMESTAMPTZ,
  UNIQUE (student_id, topic_id)
);

-- ============================================================
-- QUIZ ATTEMPTS
-- ============================================================

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id      UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  answers        JSONB NOT NULL,
  score          NUMERIC(5,2),
  max_score      NUMERIC(5,2),
  passed         BOOLEAN,
  attempt_number INT NOT NULL DEFAULT 1,
  completed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ASSIGNMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS assignments (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  type        TEXT NOT NULL CHECK (type IN ('project', 'test', 'practical', 'portfolio')),
  due_date    TIMESTAMPTZ,
  max_marks   INT NOT NULL DEFAULT 100,
  weighting   NUMERIC(5,2),
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_submissions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id  UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content        JSONB,
  file_urls      TEXT[],
  marks_awarded  NUMERIC(5,2),
  feedback       TEXT,
  status         TEXT NOT NULL DEFAULT 'not_submitted' CHECK (status IN ('not_submitted', 'submitted', 'marked', 'returned')),
  submitted_at   TIMESTAMPTZ,
  marked_at      TIMESTAMPTZ,
  marked_by      UUID REFERENCES users(id),
  UNIQUE (assignment_id, student_id)
);

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS announcements (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
