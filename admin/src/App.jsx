import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogsPage from './pages/BlogsPage';
import ExperiencePage from './pages/ExperiencePage';
import TestimonialsPage from './pages/TestimonialsPage';
import ServicesPage from './pages/ServicesPage';
import MessagesPage from './pages/MessagesPage';
import MediaPage from './pages/MediaPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { getStatsApi } from './lib/api/adminApi';

const tabTitles = {
  dashboard: { title: 'Dashboard Overview', subtitle: 'Real-time metrics, recent submissions & system status' },
  about: { title: 'About Profile', subtitle: 'Headline, bio, contact details, and statistics counters' },
  skills: { title: 'Skills & Proficiencies', subtitle: 'Technical skill badges, categories, and proficiency meters' },
  projects: { title: 'Featured Projects', subtitle: 'Case studies, project descriptions, live links, and media' },
  blogs: { title: 'Articles & Writings', subtitle: 'Draft and publish technical articles and deep dives' },
  experience: { title: 'Experience Timeline', subtitle: 'Career journey, employment milestones, and roles' },
  testimonials: { title: 'Client Reviews', subtitle: 'Endorsements, star ratings, and stakeholder testimonials' },
  services: { title: 'Services & Solutions', subtitle: 'Offerings, scope, icons, and pricing packages' },
  messages: { title: 'Contact Inquiries', subtitle: 'Inquiries submitted through the portfolio contact form' },
  media: { title: 'Media Library', subtitle: 'Uploaded image assets, banners, and documents' },
};

function AdminPortal() {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchUnread = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await getStatsApi();
      setUnreadMessages(res.data?.counts?.unreadMessages || 0);
    } catch (err) {
      // silently handle
    }
  };

  useEffect(() => {
    fetchUnread();
  }, [isAuthenticated, activeTab, refreshKey]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Initializing CMS session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const { title, subtitle } = tabTitles[activeTab] || {
    title: 'Custom CMS Admin',
    subtitle: '',
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadMessages={unreadMessages}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          title={title}
          subtitle={subtitle}
          onRefresh={() => setRefreshKey((k) => k + 1)}
        />

        <main className="flex-1 overflow-y-auto bg-slate-950/50">
          {activeTab === 'dashboard' && <DashboardPage key={refreshKey} setActiveTab={setActiveTab} />}
          {activeTab === 'about' && <AboutPage key={refreshKey} />}
          {activeTab === 'skills' && <SkillsPage key={refreshKey} />}
          {activeTab === 'projects' && <ProjectsPage key={refreshKey} />}
          {activeTab === 'blogs' && <BlogsPage key={refreshKey} />}
          {activeTab === 'experience' && <ExperiencePage key={refreshKey} />}
          {activeTab === 'testimonials' && <TestimonialsPage key={refreshKey} />}
          {activeTab === 'services' && <ServicesPage key={refreshKey} />}
          {activeTab === 'messages' && <MessagesPage key={refreshKey} />}
          {activeTab === 'media' && <MediaPage key={refreshKey} />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AdminPortal />
    </AuthProvider>
  );
}
