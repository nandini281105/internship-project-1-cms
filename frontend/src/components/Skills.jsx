import React, { useState } from 'react';

const Skills = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps/Tools'];

  const filteredSkills =
    selectedCategory === 'All'
      ? skills
      : skills?.filter((s) => s.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Technical Arsenal</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills, Tools & Technologies
          </p>
          <p className="mt-3 text-slate-400">
            A comprehensive overview of my core engineering proficiencies.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills?.map((skill, index) => (
            <div
              key={skill.id || index}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all hover:bg-slate-900/90 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-slate-200 text-sm">{skill.name}</span>
                <span className="text-xs font-mono text-sky-400 font-bold">{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.proficiency}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{skill.category || 'Engineering'}</span>
                <span>Proficient</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
