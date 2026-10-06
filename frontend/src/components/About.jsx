import React from 'react';
import { Award, CheckCircle2, Users, MapPin, Mail, Phone, Calendar } from 'lucide-react';

const About = ({ about }) => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">About Me</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Crafting code with precision, performance & purpose
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bio & Info */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-slate-100 leading-snug">
              {about?.title || 'Full Stack Software Engineer'}
            </h3>

            <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
              {about?.bio ||
                'I am a full stack engineer dedicated to crafting seamless web experiences, resilient database schemas, and microservice APIs.'}
            </p>

            {/* Quick Details Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm text-slate-300">
              {about?.location && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>{about.location}</span>
                </div>
              )}
              {about?.email && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <a href={`mailto:${about.email}`} className="hover:text-white truncate">
                    {about.email}
                  </a>
                </div>
              )}
              {about?.phone && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{about.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <Calendar className="w-5 h-5 text-purple-400 shrink-0" />
                <span>Available for New Projects</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Stats Highlights */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 hover:border-sky-500/40 transition-all flex items-center gap-5 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">
                  {about?.yearsExperience || 4}+
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
                  Years Experience
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 hover:border-indigo-500/40 transition-all flex items-center gap-5 shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">
                  {about?.completedProjects || 25}+
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
                  Completed Projects
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800/80 hover:border-purple-500/40 transition-all flex items-center gap-5 shadow-lg sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-white">
                  {about?.happyClients || 18}+
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">
                  Satisfied Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
