'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CourseNavigation } from './course-navigation';
import { LessonPanel } from './lesson-panel';
import { useState } from 'react';

interface Chapter {
  id: string;
  title: string;
  isCompleted: boolean;
  isLocked: boolean;
  progress: number;
  estimatedTime: number;
}

export const SplitPaneWorkspace = () => {
  const [selectedChapterId, setSelectedChapterId] = useState('chapter-1');

  const mockChapters: Chapter[] = [
    { id: 'chapter-1', title: 'Getting Started', isCompleted: true, isLocked: false, progress: 100, estimatedTime: 15 },
    { id: 'chapter-2', title: 'Core Concepts', isCompleted: true, isLocked: false, progress: 100, estimatedTime: 20 },
    { id: 'chapter-3', title: 'Advanced Topics', isCompleted: false, isLocked: false, progress: 60, estimatedTime: 25 },
    { id: 'chapter-4', title: 'Best Practices', isCompleted: false, isLocked: false, progress: 0, estimatedTime: 30 },
    { id: 'chapter-5', title: 'Real-World Projects', isCompleted: false, isLocked: true, progress: 0, estimatedTime: 40 },
  ];

  const mockLesson = {
    id: 'lesson-1',
    title: 'Advanced Topics in Programming',
    content: `
## Introduction
Advanced programming concepts build upon the fundamentals you've learned. This lesson covers:

- Design Patterns
- Performance Optimization
- Testing Strategies
- Code Architecture

## Design Patterns
Design patterns are reusable solutions to common programming problems. They provide templates for writing maintainable code.

### Types of Patterns
1. **Creational Patterns** - Deal with object creation mechanisms
2. **Structural Patterns** - Deal with object composition and relationships
3. **Behavioral Patterns** - Deal with object collaboration

\`\`\`javascript
// Singleton Pattern Example
class Database {
  static instance = null;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}
\`\`\`

## Performance Optimization
Optimizing code performance is crucial for scalable applications.

### Key Optimization Techniques
- Memoization
- Lazy Loading
- Code Splitting
- Caching Strategies
    `,
    estimatedTime: 25,
  };

  const mockQuestions = [
    {
      id: 'q1',
      question: 'What is the main purpose of the Singleton design pattern?',
      options: [
        'To create multiple instances of a class',
        'To ensure a class has only one instance with global access',
        'To create instances without constructors',
        'To inherit from multiple classes',
      ],
      correctAnswer: 1,
      explanation: 'The Singleton pattern restricts the instantiation of a class to a single object, providing a global point of access to that instance.',
    },
    {
      id: 'q2',
      question: 'Which optimization technique involves storing computed results?',
      options: [
        'Lazy Loading',
        'Code Splitting',
        'Memoization',
        'Tree Shaking',
      ],
      correctAnswer: 2,
      explanation: 'Memoization is a technique where you store the results of expensive function calls and return the cached result when the same inputs occur again.',
    },
    {
      id: 'q3',
      question: 'What are Behavioral Patterns primarily concerned with?',
      options: [
        'Object creation',
        'Object composition',
        'Object collaboration and communication',
        'Object inheritance',
      ],
      correctAnswer: 2,
      explanation: 'Behavioral patterns focus on the responsibilities of objects and how they communicate with each other.',
    },
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex gap-4 bg-gray-900">
      {/* Left Panel - Navigation */}
      <div className="w-full md:w-96 border-r border-gray-700/50 bg-gray-950/50 overflow-hidden">
        <CourseNavigation
          courseTitle="Web Development Fundamentals"
          chapters={mockChapters}
          onChapterSelect={setSelectedChapterId}
          selectedChapterId={selectedChapterId}
        />
      </div>

      {/* Right Panel - Lesson */}
      <div className="flex-1 overflow-hidden">
        <LessonPanel
          lesson={mockLesson}
          quizQuestions={mockQuestions}
          onQuizComplete={(score, feedback) => {
            console.log('Quiz completed with score:', score, feedback);
          }}
        />
      </div>
    </div>
  );
};
