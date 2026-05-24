// ============================================================
// CONTENT BLOCK TYPES
// ============================================================

export interface HeadingBlock {
  type: 'heading'
  text: string
  level: 2 | 3
}

export interface ParagraphBlock {
  type: 'paragraph'
  text: string
}

export interface CalloutBlock {
  type: 'callout'
  variant: 'info' | 'tip' | 'warning' | 'important'
  text: string
}

export interface KeyTermBlock {
  type: 'key_term'
  term: string
  definition: string
}

export interface ListBlock {
  type: 'list'
  style: 'bullet' | 'numbered'
  items: string[]
}

export interface TableBlock {
  type: 'table'
  headers: string[]
  rows: string[][]
}

export interface DividerBlock {
  type: 'divider'
}

export interface MCQBlock {
  type: 'exercise_question'
  question_type: 'mcq'
  id: string
  text: string
  options: string[]
  correct_index: number
  explanation: string
}

export interface TrueFalseBlock {
  type: 'exercise_question'
  question_type: 'true_false'
  id: string
  text: string
  correct_answer: boolean
  explanation: string
}

export interface ShortAnswerBlock {
  type: 'exercise_question'
  question_type: 'short_answer'
  id: string
  text: string
  accepted_answers: string[]
  explanation: string
}

export interface MatchingBlock {
  type: 'exercise_question'
  question_type: 'matching'
  id: string
  text: string
  pairs: Array<{ term: string; definition: string }>
}

export type ExerciseQuestionBlock =
  | MCQBlock
  | TrueFalseBlock
  | ShortAnswerBlock
  | MatchingBlock

export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | CalloutBlock
  | KeyTermBlock
  | ListBlock
  | TableBlock
  | DividerBlock
  | ExerciseQuestionBlock

// ============================================================
// LESSON-LEVEL CONTENT SHAPES
// ============================================================

export interface ArticleLessonContent {
  blocks: ContentBlock[]
}

export interface QuizQuestion {
  id: string
  type: 'mcq' | 'true_false'
  text: string
  // MCQ fields
  options?: string[]
  correct_index?: number
  // True/false fields
  correct_answer?: boolean
  explanation: string
}

export interface QuizLessonContent {
  pass_score: number
  questions: QuizQuestion[]
}

export type LessonContent = ArticleLessonContent | QuizLessonContent

export function isQuizContent(c: LessonContent): c is QuizLessonContent {
  return 'questions' in c && 'pass_score' in c
}

export function isArticleContent(c: LessonContent): c is ArticleLessonContent {
  return 'blocks' in c
}
