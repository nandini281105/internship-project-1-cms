import React from 'react';
import { Star, Quote } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const Testimonials = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Social Proof</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client & Collaborator Reviews
          </p>
          <p className="mt-3 text-slate-400">
            What founders, managers, and partners have to say about working together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map((t, idx) => (
            <div
              key={t.id || idx}
              className="p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between shadow-lg shadow-black/20"
            >
              <div>
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-sky-500/20" />
                </div>

                <p className="text-slate-300 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
                {t.avatarUrl ? (
                  <img
                    src={resolveImageUrl(t.avatarUrl)}
                    alt={t.clientName}
                    className="w-12 h-12 rounded-full object-cover border border-slate-700"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 font-bold flex items-center justify-center">
                    {t.clientName?.charAt(0) || 'C'}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-white text-sm">{t.clientName}</h4>
                  <p className="text-xs text-slate-400">
                    {t.position} {t.company ? `@ ${t.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
