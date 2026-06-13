'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Flame, Zap, Trophy, BookOpen, TrendingUp, Target } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const weeklyData = [
  { day: 'Mon', hours: 2 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 2.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 3.5 },
  { day: 'Sat', hours: 5 },
  { day: 'Sun', hours: 2 },
];

const skillsData = [
  { skill: 'JavaScript', value: 85 },
  { skill: 'React', value: 78 },
  { skill: 'TypeScript', value: 72 },
  { skill: 'Python', value: 65 },
  { skill: 'Data Science', value: 58 },
  { skill: 'Design', value: 70 },
];

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  color: 'indigo' | 'cyan' | 'orange' | 'purple';
}

const StatCard = ({ label, value, icon, trend, color }: StatCardProps) => {
  const colorClasses = {
    indigo: 'from-indigo-600/20 to-indigo-600/10 border-indigo-500/20 text-indigo-400',
    cyan: 'from-cyan-600/20 to-cyan-600/10 border-cyan-500/20 text-cyan-400',
    orange: 'from-orange-600/20 to-orange-600/10 border-orange-500/20 text-orange-400',
    purple: 'from-purple-600/20 to-purple-600/10 border-purple-500/20 text-purple-400',
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className={`border-l-2 bg-gradient-to-br ${colorClasses[color]}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{label}</p>
              <p className="text-3xl font-bold text-white">{value}</p>
              {trend && (
                <p className="text-xs text-green-400 mt-1">↑ {trend}% this week</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const Dashboard = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome Back! 🚀
          </h1>
          <p className="text-gray-400">
            You're on a 7-day learning streak. Keep it up!
          </p>
        </div>
      </motion.div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Learning Progress"
          value="68%"
          icon={<TrendingUp className="w-6 h-6" />}
          trend={12}
          color="indigo"
        />
        <StatCard
          label="Current Streak"
          value="7 days"
          icon={<Flame className="w-6 h-6" />}
          trend={1}
          color="orange"
        />
        <StatCard
          label="XP Points"
          value="3,250"
          icon={<Zap className="w-6 h-6" />}
          trend={15}
          color="cyan"
        />
        <StatCard
          label="Courses Completed"
          value="5"
          icon={<Trophy className="w-6 h-6" />}
          trend={2}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Learning Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Weekly Learning Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111827',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="hours" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Radar */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                Skills Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" tick={{ fill: '#D1D5DB' }} />
                  <PolarRadiusAxis stroke="#9CA3AF" />
                  <Radar
                    name="Skill Level"
                    dataKey="value"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weak and Strong Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <motion.div variants={itemVariants}>
          <Card className="border-red-500/20 bg-gradient-to-br from-red-600/10 to-red-600/5">
            <CardHeader>
              <CardTitle className="text-red-400">Areas to Improve</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Advanced Python Concepts</span>
                <Badge variant="destructive">60%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Machine Learning Basics</span>
                <Badge variant="destructive">45%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Data Structures</span>
                <Badge variant="destructive">55%</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strong Areas */}
        <motion.div variants={itemVariants}>
          <Card className="border-green-500/20 bg-gradient-to-br from-green-600/10 to-green-600/5">
            <CardHeader>
              <CardTitle className="text-green-400">Your Strengths</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">JavaScript Fundamentals</span>
                <Badge variant="secondary">92%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">React Components</span>
                <Badge variant="secondary">88%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Web Design Principles</span>
                <Badge variant="secondary">85%</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              AI Recommendations for You
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
                <p className="text-sm font-semibold text-indigo-400 mb-1">📚 Recommended Next Course</p>
                <p className="text-gray-300">"Advanced Python for Data Science" - Based on your progress in Python fundamentals</p>
              </div>
              <div className="p-4 rounded-lg bg-cyan-600/10 border border-cyan-500/20">
                <p className="text-sm font-semibold text-cyan-400 mb-1">⚡ Quick Challenge</p>
                <p className="text-gray-300">Complete 5 Data Structure quizzes to unlock the "Problem Solver" badge</p>
              </div>
              <div className="p-4 rounded-lg bg-purple-600/10 border border-purple-500/20">
                <p className="text-sm font-semibold text-purple-400 mb-1">🎯 Learning Path</p>
                <p className="text-gray-300">Focus on Machine Learning basics after mastering advanced Python concepts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
