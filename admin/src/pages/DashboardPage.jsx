import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Zap,
  FileText,
  Inbox,
  MessageSquareQuote,
  Layers,
  ArrowRight,
  Clock,
  PlusCircle,
  Eye,
} from 'lucide-react';
import { getStatsApi } from '../lib/api/adminApi';

const DashboardPage = ({ setActiveTab }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await getStatsApi();
      setStats(res.data);
    } catch (err) {
      console.error('Failed to load stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const counts = stats?.counts || {
    projects: 0,
    skills: 0,
    blogs: 0,
    messages: 0,
    unreadMessages: 0,
    testimonials: 0,
    services: 0,
  };

  const statCards = [
    {
      title: 'Total Projects',
      count: counts.projects,
      icon: FolderGit2,
      color: 'from-blue-500/20 to-sky-500/20 text-sky-400',
      tab: 'projects',
    },
    {
      title: 'Skills & Tools',
      count: counts.skills,
      icon: Zap,
      color: 'from-amber-500/20 to-yellow-500/20 text-amber-400',
      tab: 'skills',
    },
    {
      title: 'Published Blogs',
      count: counts.blogs,
      icon: FileText,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400',
      tab: 'blogs',
    },
    {
      title: 'Inquiries / Messages',
      count: counts.messages,
      badge: counts.unreadMessages > 0 ? `${counts.unreadMessages} New` : null,
      icon: Inbox,
      color: 'from-rose-500/20 to-pink-500/20 text-rose-400',
      tab: 'messages',
    },
    {
      title: 'Services Offered',
      count: counts.services,
      icon: Layers,
      color: 'from-purple-500/20 to-indigo-500/20 text-purple-400',
      tab: 'services',
    },
    {
      title: 'Testimonials',
      count: counts.testimonials,
      icon: MessageSquareQuote,
      color: 'from-teal-500/20 to-emerald-500/20 text-teal-400',
      tab: 'testimonials',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/50 via-slate-900 to-slate-900 border border-indigo-800/40 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <span className="text-xs uppercase tracking-widest font-bold text-indigo-400">
            Content Management Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Welcome to your Portfolio CMS
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            All your portfolio content is powered directly by your custom Express REST APIs and PostgreSQL database. Update content below to see instant changes on your live site.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Manage Projects</span>
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Blog Article</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(card.tab)}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div className="text-3xl font-extrabold text-white">{card.count}</div>
                {card.badge && (
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-indigo-400 transition-colors">
                <span>View & manage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Messages */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Recent Inquiries</h3>
            <p className="text-xs text-slate-400">Incoming messages from the portfolio contact form</p>
          </div>
          <button
            onClick={() => setActiveTab('messages')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            View all ({counts.messages})
          </button>
        </div>

        {stats?.recentMessages?.length > 0 ? (
          <div className="divide-y divide-slate-800/80">
            {stats.recentMessages.map((msg) => (
              <div key={msg.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white truncate">{msg.name}</span>
                    <span className="text-xs text-slate-500 truncate">&lt;{msg.email}&gt;</span>
                    {!msg.read && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{msg.subject || msg.message}</p>
                </div>

                <div className="text-xs text-slate-500 whitespace-nowrap flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(msg.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-sm text-slate-500">
            No contact inquiries yet. Submitted messages will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
