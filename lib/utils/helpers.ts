import { QuizAttempt } from '@/lib/types';

export const calculateQuizScore = (answers: number[], correctAnswers: number[]): number => {
  if (answers.length === 0) return 0;
  const correct = answers.filter((ans, idx) => ans === correctAnswers[idx]).length;
  return Math.round((correct / answers.length) * 100);
};

export const isQuizPassed = (score: number, passingScore: number = 80): boolean => {
  return score >= passingScore;
};

export const getStreakStatus = (currentStreak: number): { level: string; color: string } => {
  if (currentStreak >= 30) return { level: 'On Fire! 🔥', color: 'text-red-500' };
  if (currentStreak >= 14) return { level: 'Hot Streak 🟠', color: 'text-orange-500' };
  if (currentStreak >= 7) return { level: 'Building Momentum 💪', color: 'text-yellow-500' };
  if (currentStreak >= 3) return { level: 'Good Start ✨', color: 'text-blue-500' };
  return { level: 'Start Today 🚀', color: 'text-gray-400' };
};

export const calculateProgressPercentage = (completedChapters: number, totalChapters: number): number => {
  if (totalChapters === 0) return 0;
  return Math.round((completedChapters / totalChapters) * 100);
};

export const formatTimeSpent = (minutes: number): string => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const getNextChapter = (currentOrder: number, totalChapters: number): number => {
  return Math.min(currentOrder + 1, totalChapters);
};

export const generateXPReward = (score: number, questionCount: number): number => {
  const baseXP = questionCount * 10;
  const scoreBonus = Math.round((score / 100) * 50);
  return baseXP + scoreBonus;
};

export const updateStreakCount = (lastActivityDate: string): number => {
  const lastDate = new Date(lastActivityDate);
  const today = new Date();
  const diffTime = today.getTime() - lastDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 1; // Same day
  if (diffDays === 1) return 1; // Continued streak
  return 0; // Streak broken
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-500/20 text-green-400';
    case 'intermediate':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'advanced':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const getAchievementIcon = (category: string): string => {
  const icons: { [key: string]: string } = {
    learning: '📚',
    streak: '🔥',
    performance: '🏆',
    completion: '✅',
    milestone: '🎯',
  };
  return icons[category] || '⭐';
};
