import { Layout } from '@/components/layout/layout';
import { Dashboard } from '@/components/dashboard/dashboard';

export const metadata = {
  title: 'Dashboard | EduNova AI',
  description: 'Your AI-powered learning dashboard',
};

export default function DashboardPage() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
