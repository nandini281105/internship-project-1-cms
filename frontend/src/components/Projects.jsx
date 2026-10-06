import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const Projects = ({ projects, onSelectProject }) => {
  const [filter, setFilter] = useState('All');

  // Collect unique tags
  const allTags = ['All'];
  projects?.forEach((p) => {
    if (p.tags) {
      p.tags.split(',').forEach((tag) => {
        const trimmed = tag.trim();
        if (trimmed && !allTags.includes(trimmed) && allTags.length < 7) {
          allTags.push(trimmed);
        }
      });
    }
  });

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects?.filter((p) => p.tags?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Showcase</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Projects & Case Studies
          </p>
          <p className="mt-3 text-slate-400">
            Real-world applications engineered for speed, clean UX, and high maintainability.
          </p>
        </div>

        {/* Filter Badges */}
        {allTags.length > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === t
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects?.map((project, idx) => (
            <div
              key={project.id || idx}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden hover:border-sky-500/40 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-lg shadow-black/30 hover:-translate-y-1.5"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  {project.imageUrl ? (
                    <img
                      src={resolveImageUrl(project.imageUrl)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600">
                      No Image Available
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {project.featured && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/90 backdrop-blur-sm text-white text-[11px] font-bold shadow-md">
                      <Sparkles className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.split(',').map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-sky-400 text-[11px] font-medium border border-slate-700/60"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-800/60 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read Overview</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-white border border-sky-500/30 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
