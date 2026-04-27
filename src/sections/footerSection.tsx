import React from 'react';

export const FooterSection: React.FC = () => {
  // Automatický aktuální rok, ať to nemusíš nikdy přepisovat
  const currentYear = new Date().getFullYear();

  return (
    // Odstraněno tvrdé pozadí, přidán jemný horní rámeček pro oddělení
    <footer className="border-t border-slate-200/20 dark:border-slate-800/50 py-8 transition-colors duration-500 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Copyright */}
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          © {currentYear} Jinochi. Všechna práva vyhrazena.
        </p>

        {/* Status indicator (Tech Vibe) */}
        {/* Změněno plné pozadí na jemné průhledné s backdrop-blur efektem */}
        <div className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/10 dark:bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/20 dark:border-slate-700/50 shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          All systems operational
        </div>

      </div>
    </footer>
  );
};