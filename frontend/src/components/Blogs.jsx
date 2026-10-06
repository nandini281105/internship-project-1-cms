import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const Blogs = ({ blogs, onSelectBlog }) => {
  return (
    <section id="blogs" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Thoughts & Writings</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Latest Articles & Deep Dives
          </p>
          <p className="mt-3 text-slate-400">
            Insights on system design, frontend architecture, and developer productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((blog, idx) => (
            <article
              key={blog.id || idx}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden hover:border-slate-700 hover:bg-slate-900/90 transition-all flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                {/* Cover Image */}
                {blog.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={resolveImageUrl(blog.coverImage)}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm text-sky-400 text-xs font-semibold border border-slate-800">
                      {blog.category || 'Article'}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime || '5 min read'}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onSelectBlog(blog)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 group-hover:translate-x-1 transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
