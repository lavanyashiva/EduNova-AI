'use client';

import { Layout } from '@/components/layout/layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/transitions';
import { Trophy, Flame, Zap, Award, Target, TrendingUp, Download } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const skillsData = [
  { skill: 'JavaScript', value: 85 },
  { skill: 'React', value: 78 },
  { skill: 'TypeScript', value: 72 },
  { skill: 'Python', value: 65 },
  { skill: 'Data Science', value: 58 },
  { skill: 'Design', value: 70 },
];

const progressHistory = [
  { week: 'Week 1', xp: 250 },
  { week: 'Week 2', xp: 420 },
  { week: 'Week 3', xp: 380 },
  { week: 'Week 4', xp: 550 },
  { week: 'Week 5', xp: 620 },
  { week: 'Week 6', xp: 480 },
  { week: 'Week 7', xp: 700 },
];

const achievements = [
  { title: 'Quick Learner', description: 'Completed 5 lessons in one day', icon: '⚡', unlocked: true },
  { title: 'Streak Master', description: 'Maintained a 7-day learning streak', icon: '🔥', unlocked: true },
  { title: 'Quiz Champion', description: 'Scored 100% on 10 quizzes', icon: '🏆', unlocked: false },
  { title: 'Problem Solver', description: 'Completed 25 practice problems', icon: '🧩', unlocked: true },
  { title: 'Course Completer', description: 'Finished 5 courses', icon: '🎓', unlocked: false },
  { title: 'AI Master', description: 'Used AI feedback on 50+ quizzes', icon: '🤖', unlocked: true },
];

const certificates = [
  { title: 'JavaScript Fundamentals', issueDate: 'Jan 15, 2024', certificateId: 'JSF-2024-001' },
  { title: 'React Essentials', issueDate: 'Feb 20, 2024', certificateId: 'RE-2024-002' },
  { title: 'Web Design Basics', issueDate: 'Mar 10, 2024', certificateId: 'WDB-2024-003' },
  { title: 'Python Programming', issueDate: 'Apr 5, 2024', certificateId: 'PP-2024-004' },
  { title: 'Data Science Fundamentals', issueDate: 'May 22, 2024', certificateId: 'DSF-2024-005' },
];

export default function ProfilePage() {
  return (
    <Layout>
      <PageTransition>
        <div className="space-y-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center text-4xl">
                      🎓
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">Lavanya Shiva</h1>
                      <p className="text-gray-400 mb-3">AI Learning Platform | Level 12</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Power Learner</Badge>
                        <Badge variant="default">Streak Master</Badge>
                        <Badge>5 Courses Completed</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text mb-2">
                      3,250 XP
                    </div>
                    <p className="text-gray-400 text-sm mb-3">Next Level: 4,000 XP</p>
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Stats */}
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StaggerItem>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <p className="text-2xl font-bold text-white mb-1">5</p>
                  <p className="text-xs text-gray-400">Courses Completed</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card>
                <CardContent className="p-6 text-center">
                  <Flame className="w-6 h-6 mx-auto mb-2 text-orange-400" />
                  <p className="text-2xl font-bold text-white mb-1">7</p>
                  <p className="text-xs text-gray-400">Day Streak</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card>
                <CardContent className="p-6 text-center">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-cyan-400" />
                  <p className="text-2xl font-bold text-white mb-1">156</p>
                  <p className="text-xs text-gray-400">Hours Learned</p>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                  <p className="text-2xl font-bold text-white mb-1">92%</p>
                  <p className="text-xs text-gray-400">Avg Score</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>

          {/* Skills and Progress Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills Radar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
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
                      <PolarAngleAxis dataKey="skill" stroke="#9CA3AF" tick={{ fill: '#D1D5DB', fontSize: 12 }} />
                      <PolarRadiusAxis stroke="#9CA3AF" />
                      <Radar name="Skill Level" dataKey="value" stroke="#4F46E5" fill="#4F46E5" fillOpacity={0.5} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* XP Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    7-Week Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={progressHistory}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="week" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111827',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="xp"
                        stroke="#06B6D4"
                        strokeWidth={2}
                        dot={{ fill: '#06B6D4' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.05 }}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-600/20 to-yellow-600/5 border-yellow-500/30'
                          : 'bg-gray-900/50 border-gray-700/50 opacity-50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <p className="font-semibold text-white text-sm mb-1">{achievement.title}</p>
                      <p className="text-xs text-gray-400">{achievement.description}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {certificates.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 border border-indigo-500/20 hover:border-indigo-500/40 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-white">{cert.title}</p>
                        <p className="text-xs text-gray-400 mt-1">Issued: {cert.issueDate}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </PageTransition>
    </Layout>
  );
}
