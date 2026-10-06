import React from 'react';
import { Terminal, Github, Linkedin, Twitter, ArrowUp, Heart } from 'lucide-react';

const Footer = ({ about }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white font-bold">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Dev<span className="text-sky-400">Portfolio</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-500 text-center flex items-center gap-1">
            <span>© {new Date().getFullYear()} Custom Headless Portfolio & CMS. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>React, Express & PostgreSQL.</span>
          </div>

          {/* Socials & Top button */}
          <div className="flex items-center space-x-4">
            {about?.githubUrl && (
              <a
                href={about.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {about?.linkedinUrl && (
              <a
                href={about.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {about?.twitterUrl && (
              <a
                href={about.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
