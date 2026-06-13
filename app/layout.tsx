import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EduNova AI - Learn Smarter with AI',
  description: 'AI-powered adaptive learning platform for mastering any skill',
  keywords: ['learning', 'education', 'AI', 'courses', 'programming', 'data science'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edunova.ai',
    title: 'EduNova AI - Learn Smarter with AI',
    description: 'AI-powered adaptive learning platform for mastering any skill',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        {children}
      </body>
    </html>
  );
}
