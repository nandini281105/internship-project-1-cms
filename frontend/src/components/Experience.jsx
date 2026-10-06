import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Track Record</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Milestones
          </p>
          <p className="mt-3 text-slate-400">
            A journey through engineering challenges, architectural scaling, and shipped products.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
          {experiences?.map((exp, idx) => (
            <div key={exp.id || idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline marker */}
              <div className="absolute -left-3.5 top-1.5 w-7 h-7 rounded-full bg-slate-900 border-2 border-sky-500/80 group-hover:border-sky-400 group-hover:scale-110 transition-all flex items-center justify-center text-sky-400">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Card */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 group-hover:border-slate-700/80 group-hover:bg-slate-900/90 transition-all shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4 font-medium">
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    {exp.company}
                    {exp.companyUrl && (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-400 hover:text-sky-300 ml-1 inline-flex"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </span>
                  {exp.location && (
                    <span className="flex items-center gap-1 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  )}
                  {exp.current && (
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      Current Position
                    </span>
                  )}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
