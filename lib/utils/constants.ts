export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  LEARN: '/learn',
  PROFILE: '/profile',
  ADMIN: '/admin',
  SETTINGS: '/settings',
};

export const PASSING_SCORE = 80;
export const MIN_QUESTIONS_PER_QUIZ = 3;
export const MAX_QUESTIONS_PER_QUIZ = 5;
export const DEFAULT_XP_PER_LESSON = 50;
export const XP_PER_QUIZ_PASS = 100;
export const STREAK_RESET_DAYS = 1;

export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export const COURSE_CATEGORIES = [
  'Programming',
  'Web Development',
  'Data Science',
  'Machine Learning',
  'Design',
  'Business',
  'Languages',
  'Mathematics',
] as const;

export const ACHIEVEMENT_CATEGORIES = {
  LEARNING: 'learning',
  STREAK: 'streak',
  PERFORMANCE: 'performance',
  COMPLETION: 'completion',
  MILESTONE: 'milestone',
} as const;

export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;
