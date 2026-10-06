import React from 'react';
import { X, ExternalLink, Github, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl mb-6 bg-slate-950">
            <img
              src={resolveImageUrl(project.imageUrl)}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.split(',').map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-sky-950/70 text-sky-400 text-xs font-semibold border border-sky-800/60"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
          {project.title}
        </h2>

        {/* Long Description / Details */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 mb-8">
          <p>{project.longDescription || project.description}</p>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-800">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold text-sm shadow-md shadow-sky-500/20 transition-all"
            >
              <span>Visit Live Application</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source Repository</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
