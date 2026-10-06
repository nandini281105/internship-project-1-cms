import React from 'react';
import { Code, Database, Layout, Smartphone, Cloud, Shield, Cpu, Layers } from 'lucide-react';

const iconMap = {
  Code: Code,
  Database: Database,
  Layout: Layout,
  Smartphone: Smartphone,
  Cloud: Cloud,
  Shield: Shield,
  Cpu: Cpu,
  Layers: Layers,
};

const Services = ({ services }) => {
  return (
    <section id="services" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest font-bold text-sky-400 mb-2">Offerings</h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Specialized Services & Solutions
          </p>
          <p className="mt-3 text-slate-400">
            Delivering full-cycle engineering from database schemas to polished frontend interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((svc, idx) => {
            const IconComponent = iconMap[svc.icon] || Code;
            return (
              <div
                key={svc.id || idx}
                className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-lg shadow-black/20"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-6 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>
                {svc.price && (
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Investment:</span>
                    <span className="font-semibold text-sky-400 bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-800/60">
                      {svc.price}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
