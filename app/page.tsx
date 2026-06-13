'use client';

import { Layout } from '@/components/layout/layout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageTransition, StaggerContainer, StaggerItem } from '@/components/animations/transitions';
import { ArrowRight, Zap, BookOpen, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'AI-Powered Learning',
    description: 'Personalized learning paths powered by advanced AI algorithms',
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Comprehensive Courses',
    description: 'Courses in programming, data science, web development, and more',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Community Learning',
    description: 'Learn from a community of thousands of motivated learners',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Real-Time Feedback',
    description: 'Get instant AI feedback on your quiz performance',
  },
];

const stats = [
  { label: 'Active Learners', value: '50,000+' },
  { label: 'Courses Available', value: '500+' },
  { label: 'Average Rating', value: '4.8/5' },
  { label: 'Learning Hours', value: '1M+' },
];

export default function HomePage() {
  return (
    <Layout>
      <PageTransition>
        <div className="space-y-20 py-8">
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 blur-3xl -z-10" />

            <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    Learn Smarter with AI
                  </span>
                </h1>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  EduNova AI combines adaptive learning with AI-powered feedback to help you master any skill 10x faster. Your personalized learning journey starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto">
                      Explore Courses
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative h-96 hidden lg:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-cyan-600/30 rounded-2xl blur-xl" />
                <div className="relative bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 rounded-2xl border border-indigo-500/30 p-8 h-full flex items-center justify-center">
                  <div className="text-6xl">📚</div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text mb-2">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">Why Choose EduNova AI?</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experience the future of learning with our AI-powered platform
              </p>
            </motion.div>

            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => (
                <StaggerItem key={idx}>
                  <Card className="h-full hover:border-indigo-500/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 text-indigo-400">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden py-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 blur-3xl -z-10" />
            <Card>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Learning?</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                  Join thousands of learners who have transformed their careers with EduNova AI
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/courses">
                    <Button size="lg">
                      Start Learning Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </PageTransition>
    </Layout>
  );
}
