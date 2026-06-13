// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  xp_points: number;
  current_streak: number;
  total_hours_learned: number;
  created_at: string;
  updated_at: string;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cover_image_url?: string;
  instructor_name: string;
  total_chapters: number;
  created_at: string;
  updated_at: string;
}

// Chapter Types
export interface Chapter {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order: number;
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

// SubTopic Types
export interface SubTopic {
  id: string;
  chapter_id: string;
  title: string;
  content: string; // Markdown
  order: number;
  estimated_time_minutes: number;
  created_at: string;
  updated_at: string;
}

// Question Types
export interface Question {
  id: string;
  chapter_id: string;
  question_text: string;
  options: string[];
  correct_answer_index: number;
  explanation?: string;
  created_at: string;
  updated_at: string;
}

// Quiz Attempt Types
export interface QuizAttempt {
  id: string;
  user_id: string;
  chapter_id: string;
  score: number; // 0-100
  answers: number[]; // Selected option indices
  strengths_summary?: string;
  gaps_summary?: string;
  remedial_target_id?: string;
  ai_feedback?: string;
  created_at: string;
  updated_at: string;
}

// Progress Types
export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  chapter_id: string;
  is_completed: boolean;
  last_accessed: string;
  time_spent_minutes: number;
  created_at: string;
  updated_at: string;
}

// Achievement Types
export interface Achievement {
  id: string;
  user_id: string;
  title: string;
  description: string;
  icon_url?: string;
  category: string;
  unlocked_at: string;
}

// AI Feedback Types
export interface AIFeedback {
  strengths_summary: string;
  gaps_summary: string;
  remedial_target_id: string;
  recommendations: string[];
  confidence_score: number;
}

// Dashboard Stats
export interface DashboardStats {
  total_progress_percentage: number;
  courses_enrolled: number;
  courses_completed: number;
  current_streak: number;
  total_xp: number;
  weak_areas: string[];
  strong_areas: string[];
  weekly_learning_hours: number[];
  recent_activity: ActivityLog[];
}

// Activity Log
export interface ActivityLog {
  id: string;
  user_id: string;
  action_type: 'lesson_started' | 'quiz_completed' | 'chapter_completed' | 'course_completed';
  entity_id: string;
  entity_type: 'chapter' | 'course' | 'quiz';
  created_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'achievement' | 'reminder' | 'feedback' | 'recommendation';
  read: boolean;
  created_at: string;
}
