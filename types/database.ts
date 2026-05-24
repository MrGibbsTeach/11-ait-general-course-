// ============================================================
// CONSTRAINT TYPES
// ============================================================

export type UserRole = 'student' | 'teacher' | 'admin'
export type UnitStatus = 'available' | 'coming_soon' | 'locked'
export type LessonType = 'article' | 'video' | 'quiz' | 'exercise'
export type ProgressStatus = 'not_started' | 'in_progress' | 'completed'
export type MasteryLevel = 'not_started' | 'developing' | 'achieved' | 'mastered'
export type AssignmentType = 'project' | 'test' | 'practical' | 'portfolio'
export type SubmissionStatus = 'not_submitted' | 'submitted' | 'marked' | 'returned'

// ============================================================
// TABLE ROW TYPES
// ============================================================

export interface UserRow {
  id: string
  username: string | null
  full_name: string
  role: UserRole
  pin_hash: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface ClassRow {
  id: string
  name: string
  year: number
  teacher_id: string
  created_at: string
}

export interface ClassEnrollmentRow {
  id: string
  class_id: string
  student_id: string
  enrolled_at: string
}

export interface UnitRow {
  id: string
  title: string
  subtitle: string | null
  semester: 1 | 2
  order_index: number
  status: UnitStatus
  color: string
  icon: string | null
  created_at: string
}

export interface TopicRow {
  id: string
  unit_id: string
  title: string
  description: string | null
  order_index: number
  color: string
  icon: string | null
  estimated_hours: number
  created_at: string
}

export interface LessonRow {
  id: string
  topic_id: string
  title: string
  type: LessonType
  content: Record<string, unknown> | null
  order_index: number
  estimated_minutes: number
  created_at: string
}

export interface LessonProgressRow {
  id: string
  student_id: string
  lesson_id: string
  status: ProgressStatus
  started_at: string | null
  completed_at: string | null
  time_spent_minutes: number
}

export interface TopicProgressRow {
  id: string
  student_id: string
  topic_id: string
  mastery_level: MasteryLevel
  lessons_completed: number
  lessons_total: number
  last_accessed_at: string | null
}

export interface AssignmentRow {
  id: string
  class_id: string
  title: string
  description: string | null
  type: AssignmentType
  due_date: string | null
  max_marks: number
  weighting: number | null
  created_by: string
  created_at: string
}

export interface AssignmentSubmissionRow {
  id: string
  assignment_id: string
  student_id: string
  content: Record<string, unknown> | null
  file_urls: string[] | null
  marks_awarded: number | null
  feedback: string | null
  status: SubmissionStatus
  submitted_at: string | null
  marked_at: string | null
  marked_by: string | null
}

export interface QuizAttemptRow {
  id: string
  student_id: string
  lesson_id: string
  answers: Record<string, unknown>
  score: number | null
  max_score: number | null
  passed: boolean | null
  attempt_number: number
  completed_at: string
}

export interface AnnouncementRow {
  id: string
  class_id: string
  title: string
  body: string
  created_by: string
  created_at: string
}

// ============================================================
// INSERT TYPES (omit auto-generated fields)
// ============================================================

export type UserInsert = Omit<UserRow, 'id' | 'created_at' | 'updated_at'>
export type ClassInsert = Omit<ClassRow, 'id' | 'created_at'>
export type ClassEnrollmentInsert = Omit<ClassEnrollmentRow, 'id' | 'enrolled_at'>
export type UnitInsert = Omit<UnitRow, 'id' | 'created_at'>
export type TopicInsert = Omit<TopicRow, 'id' | 'created_at'>
export type LessonInsert = Omit<LessonRow, 'id' | 'created_at'>
export type LessonProgressInsert = Omit<LessonProgressRow, 'id'>
export type TopicProgressInsert = Omit<TopicProgressRow, 'id'>
export type AssignmentInsert = Omit<AssignmentRow, 'id' | 'created_at'>
export type AssignmentSubmissionInsert = Omit<AssignmentSubmissionRow, 'id'>
export type QuizAttemptInsert = Omit<QuizAttemptRow, 'id'>
export type AnnouncementInsert = Omit<AnnouncementRow, 'id' | 'created_at'>
