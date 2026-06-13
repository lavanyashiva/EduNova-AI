'use client';

import { Layout } from '@/components/layout/layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CardHover, StaggerContainer, StaggerItem } from '@/components/animations/transitions';
import { Search, Star, Users, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const mockCourses = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Master the basics of JavaScript programming',
    category: 'Programming',
    difficulty: 'beginner',
    rating: 4.8,
    students: 12500,
    duration: '20 hours',
    progress: 75,
    image: '🚀',
  },
  {
    id: '2',
    title: 'React Advanced Patterns',
    description: 'Learn advanced React patterns and best practices',
    category: 'Web Development',
    difficulty: 'advanced',
    rating: 4.9,
    students: 8300,
    duration: '30 hours',
    progress: 0,
    image: '⚛️',
  },
  {
    id: '3',
    title: 'Python for Data Science',
    description: 'Complete guide to data science with Python',
    category: 'Data Science',
    difficulty: 'intermediate',
    rating: 4.7,
    students: 15200,
    duration: '40 hours',
    progress: 0,
    image: '📊',
  },
  {
    id: '4',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning algorithms',
    category: 'Machine Learning',
    difficulty: 'intermediate',
    rating: 4.6,
    students: 9800,
    duration: '35 hours',
    progress: 0,
    image: '🤖',
  },
  {
    id: '5',
    title: 'TypeScript Mastery',
    description: 'Deep dive into TypeScript type system',
    category: 'Programming',
    difficulty: 'advanced',
    rating: 4.8,
    students: 6500,
    duration: '25 hours',
    progress: 0,
    image: '📘',
  },
  {
    id: '6',
    title: 'Web Design Principles',
    description: 'Learn modern web design and UX principles',
    category: 'Design',
    difficulty: 'beginner',
    rating: 4.5,
    students: 11200,
    duration: '15 hours',
    progress: 0,
    image: '🎨',
  },
];

const categories = ['All', 'Programming', 'Web Development', 'Data Science', 'Machine Learning', 'Design'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const CourseCard = ({ course, index }: { course: typeof mockCourses[0]; index: number }) => {
  const difficultyColor = {
    beginner: 'bg-green-500/20 text-green-400',
    intermediate: 'bg-yellow-500/20 text-yellow-400',
    advanced: 'bg-red-500/20 text-red-400',
  };

  return (
    <StaggerItem key={course.id}>
      <CardHover>
        <Card className="h-full flex flex-col cursor-pointer transition-all duration-300">
          <div className="w-full h-40 bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 flex items-center justify-center text-6xl">
            {course.image}
          </div>
          <CardHeader className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-lg flex-1">{course.title}</CardTitle>
              <Badge className={difficultyColor[course.difficulty as keyof typeof difficultyColor]}>
                {course.difficulty}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            {course.progress > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-400">Your Progress</span>
                  <span className="text-xs font-semibold text-white">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                  />
                </div>
              </div>
            )}

            <Button className="w-full" variant={course.progress > 0 ? 'secondary' : 'default'}>
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </Button>
          </CardContent>
        </Card>
      </CardHover>
    </StaggerItem>
  );
};

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || 
      course.difficulty === selectedDifficulty.toLowerCase();
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Course Catalog
          </h1>
          <p className="text-gray-400">
            Explore our AI-curated collection of courses tailored to your learning goals
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category and Difficulty Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Category</label>
              <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">Difficulty</label>
              <Select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {filteredCourses.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <CourseCard key={course.id} course={course} index={idx} />
              ))}
            </StaggerContainer>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No courses found</h3>
              <p className="text-gray-400">Try adjusting your search filters</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
