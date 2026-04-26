import React from 'react';
import { skillsList } from '../data/skillsList';

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
      
      {/* Subtilní fialová záře na pravé straně pro kontinuitu designu */}
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-violet-400/5 dark:bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Technologický Stack
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Nástroje a technologie, na kterých stavím své projekty a infrastrukturu.
          </p>
        </div>

        {/* CSS Grid pro kategorie */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsList.map((category) => (
            <div
              key={category.title}
              className="p-8 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] dark:hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center border-b border-slate-100 dark:border-slate-800 pb-4">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-lg text-sm font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-violet-100 hover:text-violet-700 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};