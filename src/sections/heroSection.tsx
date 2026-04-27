import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Fialová Esence / Ambientní pozadí */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Hlavní levý kouř */}
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-violet-400/20 dark:bg-violet-600/20 rounded-full blur-[120px]" />
        {/* Pravý akcent (více do fuchsiové) */}
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-fuchsia-400/20 dark:bg-fuchsia-600/20 rounded-full blur-[100px]" />
        {/* Spodní záře (hlubší indigová) */}
        <div className="absolute bottom-[-10%] left-[40%] w-150 h-150 bg-indigo-400/20 dark:bg-indigo-700/20 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {/* Subtilní tag nad nadpisem */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-8 border border-violet-200 dark:border-violet-800/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          System is running on Hetzner VPS
        </div>

        {/* Hlavní nadpis */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6">
          Welcome to my Portfolio <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 drop-shadow-sm">
            Explore the universe of my projects and skills
          </span>
        </h1>

        {/* Popis */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          I create applications, games, and tools with a focus on clean architecture. 
          Explore my projects, from Docker containers to React frontends.
        </p>

        {/* Call to action tlačítka */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#projects"
            className="px-8 py-4 rounded-xl bg-violet-600 text-white font-bold text-lg transition-all duration-300 hover:bg-violet-500 hover:-translate-y-1 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
          >
            Explore Projects
          </a>
          <a
            href="#about"
            className="px-8 py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1"
          >
            Learn More About Me
          </a>
        </div>
      </div>
    </section>
  );
};