import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter, Mail, Sparkles } from 'lucide-react';
import { resolveImageUrl } from '../lib/api/portfolioApi';

const Hero = ({ about }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-sky-400 text-xs font-semibold mb-6 shadow-inner backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available for Freelance & Full-time Roles</span>
        </div>

        {/* Profile Avatar */}
        {about?.avatarUrl && (
          <div className="relative mx-auto w-32 h-32 sm:w-36 sm:h-36 mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 p-1 shadow-xl shadow-sky-500/20">
              <img
                src={resolveImageUrl(about.avatarUrl)}
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-full bg-slate-800"
              />
            </div>
          </div>
        )}

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Architecting Robust{' '}
          <span className="gradient-text">Full Stack</span> Digital Experiences
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
          {about?.subtitle ||
            'Specializing in high-performance web applications, scalable APIs & modern frontend architectures.'}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all text-sm sm:text-base"
          >
            <span>View Featured Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={about?.resumeUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold backdrop-blur-sm hover:-translate-y-0.5 transition-all text-sm sm:text-base"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Resume / CV</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex items-center justify-center gap-5 text-slate-400">
          {about?.githubUrl && (
            <a
              href={about.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:text-white hover:border-slate-700 transition-all hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {about?.linkedinUrl && (
            <a
              href={about.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:text-sky-400 hover:border-slate-700 transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {about?.twitterUrl && (
            <a
              href={about.twitterUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:text-sky-400 hover:border-slate-700 transition-all hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          )}
          {about?.email && (
            <a
              href={`mailto:${about.email}`}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:text-sky-400 hover:border-slate-700 transition-all hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
