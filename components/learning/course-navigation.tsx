'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, Lock, CheckCircle2, Clock } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  estimatedTime: number;
}

interface CourseNavigationProps {
  courseTitle: string;
  chapters: Chapter[];
  onChapterSelect: (chapterId: string) => void;
  selectedChapterId?: string;
}

export const CourseNavigation = ({
  courseTitle,
  chapters,
  onChapterSelect,
  selectedChapterId,
}: CourseNavigationProps) => {
  const completedChapters = chapters.filter((ch) => ch.isCompleted).length;
  const totalProgress = Math.round((completedChapters / chapters.length) * 100);

  return (
    <div className="h-full flex flex-col">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 border-b border-gray-700/50"
      >
        <h2 className="text-lg font-bold text-white mb-4">{courseTitle}</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Course Progress</span>
            <span>{totalProgress}%</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </motion.div>

      {/* Chapters List */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {chapters.map((chapter, index) => (
          <motion.button
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => !chapter.isLocked && onChapterSelect(chapter.id)}
            disabled={chapter.isLocked}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
              selectedChapterId === chapter.id
                ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-indigo-500/50'
                : 'hover:bg-gray-800/50 border border-gray-700/30'
            } ${
              chapter.isLocked ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {chapter.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : chapter.isLocked ? (
                  <Lock className="w-5 h-5 text-gray-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate text-sm">
                  {`Chapter ${index + 1}: ${chapter.title}`}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${chapter.progress}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                    />
                  </div>
                  <span className="text-xs text-gray-500">{chapter.progress}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {chapter.estimatedTime} min
                </p>
              </div>
              {!chapter.isLocked && (
                <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
