import { createClient } from './client';
import { User, Course, Chapter, SubTopic, Question, QuizAttempt } from '@/lib/types';

const supabase = createClient();

// User Queries
export const getUserById = async (userId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data: data as User | null, error };
};

export const updateUserProgress = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};

// Course Queries
export const getAllCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });
  return { data: data as Course[] | null, error };
};

export const getCourseById = async (courseId: string) => {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();
  return { data: data as Course | null, error };
};

// Chapter Queries
export const getChaptersByCourse = async (courseId: string) => {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('course_id', courseId)
    .order('order', { ascending: true });
  return { data: data as Chapter[] | null, error };
};

export const getChapterById = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('chapters')
    .select('*')
    .eq('id', chapterId)
    .single();
  return { data: data as Chapter | null, error };
};

// SubTopic Queries
export const getSubTopicsByChapter = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('subtopics')
    .select('*')
    .eq('chapter_id', chapterId)
    .order('order', { ascending: true });
  return { data: data as SubTopic[] | null, error };
};

// Question Queries
export const getQuestionsByChapter = async (chapterId: string) => {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .eq('chapter_id', chapterId);
  return { data: data as Question[] | null, error };
};

// Quiz Attempt Queries
export const submitQuizAttempt = async (attempt: Omit<QuizAttempt, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert([attempt])
    .select()
    .single();
  return { data: data as QuizAttempt | null, error };
};

export const getQuizAttemptsByUser = async (userId: string, chapterId?: string) => {
  let query = supabase
    .from('quiz_attempts')
    .select('*')
    .eq('user_id', userId);

  if (chapterId) {
    query = query.eq('chapter_id', chapterId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  return { data: data as QuizAttempt[] | null, error };
};

// Progress Queries
export const getUserProgress = async (userId: string, courseId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId);
  return { data, error };
};

export const updateChapterProgress = async (userId: string, chapterId: string, isCompleted: boolean) => {
  const { data: existing } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('chapter_id', chapterId)
    .single();

  if (existing) {
    const { data, error } = await supabase
      .from('user_progress')
      .update({ is_completed: isCompleted })
      .eq('id', existing.id)
      .select();
    return { data, error };
  } else {
    const { data, error } = await supabase
      .from('user_progress')
      .insert([{
        user_id: userId,
        chapter_id: chapterId,
        is_completed: isCompleted,
      }])
      .select();
    return { data, error };
  }
};
