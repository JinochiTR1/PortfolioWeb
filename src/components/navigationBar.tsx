import React, { useState } from 'react';
import { ThemeToggle } from './themeToggle';

export const NavigationBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // Přidán jednoduchý stav pro manuální schování

  // Definice odkazů pro snadnou údržbu (DRY)
  // Další sekce odkomentujeme, jakmile je vytvoříme
  const navLinks = [
    { name: 'Úvod', href: '#hero' },
    { name: 'O mně', href: '#about' },
    { name: 'Dovednosti', href: '#skills' },
    { name: 'Projekty', href: '#projects' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    // Zvýšeno rozostření (backdrop-blur-xl), extrémně průhledné pozadí a jemná neonová linka zespodu
    <nav 
      style={{ 
        transform: isNavbarVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-[#020617]/40 backdrop-blur-xl border-b border-white/20 dark:border-violet-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Značka */}
          <div className="flex-shrink-0">
            <a href="#hero" className="text-xl font-bold text-slate-900 dark:text-white group flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 group-hover:opacity-80 transition-opacity">
                Jinochi
              </span>
              <span className="ml-1 tracking-wider">Hub</span>
            </a>
          </div>

          {/* Desktopové Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  // Přidán neonový drop-shadow při najetí myší pro kyberpunkový feeling
                  className="text-sm font-medium text-slate-700 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300 hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Přepínač témat (oddělený jemnou linkou) */}
            <div className="pl-6 border-l border-slate-300/50 dark:border-slate-700/50">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobilní Menu - ovládací prvky */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800/50 focus:outline-none transition-colors"
              aria-label="Otevřít menu"
            >
              {isMobileMenuOpen ? (
                // Ikona křížku
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Ikona hamburgeru
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tlačítko (špička) pro manuální schování/vysunutí navbaru */}
      <button
        onClick={() => {
          setIsNavbarVisible(!isNavbarVisible);
          if (isNavbarVisible) setIsMobileMenuOpen(false); // Pokud panel schovávám, rovnou zavřu i mobilní menu
        }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-8 px-6 bg-white/20 dark:bg-[#020617]/60 backdrop-blur-xl border-b border-l border-r border-white/20 dark:border-violet-500/20 rounded-b-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] pointer-events-auto"
        aria-label="Přepnout navigaci"
      >
        <svg 
          className={`w-5 h-5 transition-transform duration-300 ${isNavbarVisible ? '' : 'rotate-180'}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Mobilní Rozbalovací Menu - Upraveno do skleněného designu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-white/20 dark:border-violet-500/20 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Zavře menu po kliknutí
                className="block px-3 py-3 rounded-xl text-base font-medium text-slate-800 hover:text-violet-700 hover:bg-violet-500/10 dark:text-slate-200 dark:hover:text-violet-300 dark:hover:bg-violet-500/20 transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};