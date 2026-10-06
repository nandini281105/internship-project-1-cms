import React from 'react';
import { X, Clock, Calendar, Tag } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const BlogModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {blog.coverImage && (
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl mb-6 bg-slate-950">
            <img
              src={resolveImageUrl(blog.coverImage)}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
          <span className="px-3 py-1 rounded-full bg-sky-950/70 text-sky-400 font-semibold border border-sky-800/60">
            {blog.category || 'Article'}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {blog.readTime || '5 min read'}
          </span>
          {blog.createdAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 leading-tight">
          {blog.title}
        </h1>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="font-medium text-slate-200 text-lg leading-relaxed border-l-4 border-sky-500 pl-4 my-4">
            {blog.excerpt}
          </p>
          <div className="whitespace-pre-line text-slate-300">{blog.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
