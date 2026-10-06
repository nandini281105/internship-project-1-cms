import React from 'react';
import {
  LayoutDashboard,
  User,
  Zap,
  FolderGit2,
  FileText,
  Briefcase,
  MessageSquareQuote,
  Layers,
  Inbox,
  Image,
  LogOut,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'about', name: 'About Profile', icon: User },
  { id: 'skills', name: 'Skills & Tech', icon: Zap },
  { id: 'projects', name: 'Projects', icon: FolderGit2 },
  { id: 'blogs', name: 'Blog Articles', icon: FileText },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'testimonials', name: 'Testimonials', icon: MessageSquareQuote },
  { id: 'services', name: 'Services', icon: Layers },
  { id: 'messages', name: 'Messages Inbox', icon: Inbox },
  { id: 'media', name: 'Media Library', icon: Image },
];

const Sidebar = ({ activeTab, setActiveTab, unreadMessages = 0 }) => {
  const { logout, user } = useAuth();

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
      <div>
        {/* Brand / Logo */}
        <div className="h-16 px-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-600/30">
              C
            </div>
            <div>
              <span className="font-bold text-white text-base tracking-tight">Custom CMS</span>
              <span className="block text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
                {item.id === 'messages' && unreadMessages > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {unreadMessages}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info & Actions */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <a
          href="http://localhost:5173"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
        </a>

        <div className="flex items-center justify-between pt-2">
          <div className="truncate pr-2">
            <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
            <p className="text-[11px] text-slate-500 truncate">{user?.email || 'admin@portfolio.com'}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
