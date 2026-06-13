'use client';

import { motion } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertCircle, BookOpen, MessageSquare } from 'lucide-react';
import Markdown from 'markdown-to-jsx';

interface LessonContent {
  id: string;
  title: string;
  content: string;
  estimatedTime: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface AIFeedbackData {
  strengths: string[];
  gaps: string[];
  recommendations: string[];
  score: number;
}

interface LessonPanelProps {
  lesson: LessonContent;
  quizQuestions: QuizQuestion[];
  onQuizComplete?: (score: number, feedback: AIFeedbackData) => void;
  aiFeedback?: AIFeedbackData;
  remedialContent?: LessonContent;
}

export const LessonPanel = ({
  lesson,
  quizQuestions,
  onQuizComplete,
  aiFeedback,
  remedialContent,
}: LessonPanelProps) => {
  const [currentTab, setCurrentTab] = useState('lesson');
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quizQuestions.length).fill(-1));
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const calculateScore = () => {
    const correct = selectedAnswers.filter(
      (ans, idx) => ans === quizQuestions[idx].correctAnswer
    ).length;
    return Math.round((correct / quizQuestions.length) * 100);
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    setQuizSubmitted(true);
    // Simulate AI feedback
    const feedback: AIFeedbackData = {
      strengths: ['Good understanding of core concepts', 'Strong problem-solving skills'],
      gaps: ['Need more practice with edge cases', 'Review error handling'],
      recommendations: ['Complete the remedial lesson on edge cases', 'Practice 5 more problems'],
      score,
    };
    onQuizComplete?.(score, feedback);
  };

  const isPassed = quizSubmitted && calculateScore() >= 80;

  return (
    <div className="flex flex-col h-full">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b border-gray-700/50 bg-transparent p-0">
          <TabsTrigger value="lesson" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500">
            <BookOpen className="w-4 h-4 mr-2" />
            Lesson
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500">
            <MessageSquare className="w-4 h-4 mr-2" />
            Quiz
          </TabsTrigger>
          {aiFeedback && (
            <TabsTrigger value="feedback" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          )}
        </TabsList>

        {/* Lesson Tab */}
        <TabsContent value="lesson" className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Estimated time: {lesson.estimatedTime} minutes
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <Markdown
                options={{
                  overrides: {
                    h2: { props: { className: 'text-2xl font-bold text-white mt-6 mb-3' } },
                    h3: { props: { className: 'text-xl font-bold text-white mt-4 mb-2' } },
                    p: { props: { className: 'text-gray-300 mb-4 leading-relaxed' } },
                    code: { props: { className: 'bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm' } },
                    pre: { props: { className: 'bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4' } },
                    ul: { props: { className: 'list-disc list-inside text-gray-300 space-y-2 mb-4' } },
                    li: { props: { className: 'ml-2' } },
                  },
                }}
              >
                {lesson.content}
              </Markdown>
            </div>
          </motion.div>
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Chapter Quiz</h2>
              <p className="text-gray-400">Answer all questions correctly to pass (80% required)</p>
            </div>

            {quizQuestions.map((question, qIdx) => (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Question {qIdx + 1}: {question.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {question.options.map((option, oIdx) => (
                    <motion.button
                      key={oIdx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(qIdx, oIdx)}
                      disabled={quizSubmitted}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers[qIdx] === oIdx
                          ? 'border-indigo-500 bg-indigo-600/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-900/50'
                      } ${
                        quizSubmitted && oIdx === question.correctAnswer
                          ? 'border-green-500 bg-green-600/20'
                          : ''
                      } ${
                        quizSubmitted && selectedAnswers[qIdx] === oIdx && oIdx !== question.correctAnswer
                          ? 'border-red-500 bg-red-600/20'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[qIdx] === oIdx ? 'border-indigo-500 bg-indigo-600' : 'border-gray-500'
                        }`}>
                          {selectedAnswers[qIdx] === oIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-white">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                  {quizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 p-3 rounded-lg bg-blue-600/20 border border-blue-500/30"
                    >
                      <p className="text-sm text-blue-400">
                        <span className="font-semibold">Explanation:</span> {question.explanation}
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            ))}

            {!quizSubmitted ? (
              <Button
                onClick={handleSubmitQuiz}
                size="lg"
                className="w-full"
                disabled={selectedAnswers.some((ans) => ans === -1)}
              >
                Submit Quiz
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-lg border-2 ${
                  isPassed
                    ? 'bg-green-600/20 border-green-500'
                    : 'bg-red-600/20 border-red-500'
                }`}
              >
                <div className="flex items-start gap-3">
                  {isPassed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div>
                    <p className={`font-bold text-lg ${
                      isPassed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {isPassed ? '✨ Quiz Passed!' : '⚠️ Quiz Failed'}
                    </p>
                    <p className="text-gray-300 mt-1">
                      Your Score: <span className="font-bold text-white">{calculateScore()}%</span>
                    </p>
                    {!isPassed && (
                      <p className="text-gray-400 text-sm mt-2">You need 80% to pass. Don't worry, review the lesson and try again!</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </TabsContent>

        {/* Feedback Tab */}
        {aiFeedback && (
          <TabsContent value="feedback" className="flex-1 overflow-y-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">AI-Powered Feedback</h2>
                <p className="text-gray-400">Personalized insights from your AI coach</p>
              </div>

              {/* Score Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">Quiz Score</span>
                        <span className="font-bold text-white">{aiFeedback.score}%</span>
                      </div>
                      <Progress value={aiFeedback.score} />
                    </div>
                    {aiFeedback.score >= 80 ? (
                      <Badge variant="secondary">✓ Passed - Chapter Unlocked</Badge>
                    ) : (
                      <Badge variant="destructive">⚠ Needs Improvement - Review Remedial Lesson</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card className="border-green-500/20 bg-gradient-to-br from-green-600/10 to-green-600/5">
                <CardHeader>
                  <CardTitle className="text-green-400">Your Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiFeedback.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Gaps */}
              <Card className="border-red-500/20 bg-gradient-to-br from-red-600/10 to-red-600/5">
                <CardHeader>
                  <CardTitle className="text-red-400">Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiFeedback.gaps.map((gap, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 to-indigo-600/5">
                <CardHeader>
                  <CardTitle className="text-indigo-400">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {aiFeedback.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <span className="text-indigo-400 font-bold flex-shrink-0 mt-0.5">{idx + 1}.</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {!isPassed && remedialContent && (
                <Button size="lg" className="w-full">
                  Start Remedial Lesson
                </Button>
              )}
            </motion.div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
