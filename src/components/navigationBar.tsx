import React, { useState } from 'react';
import { ThemeToggle } from './themeToggle';

export const NavigationBar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Definice odkazů pro snadnou údržbu (DRY)
  // Další sekce odkomentujeme, jakmile je vytvoříme
  const navLinks = [
    { name: 'Úvod', href: '#hero' },
    { name: 'Projekty', href: '#projects' },
    { name: 'O mně', href: '#about' },
    { name: 'Dovednosti', href: '#skills' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Značka */}
          <div className="flex-shrink-0">
            <a href="#hero" className="text-xl font-bold text-slate-900 dark:text-white group flex items-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 group-hover:opacity-80 transition-opacity">
                Jinochi
              </span>
              <span className="ml-1">Hub</span>
            </a>
          </div>

          {/* Desktopové Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            {/* Přepínač témat (oddělený jemnou linkou) */}
            <div className="pl-6 border-l border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobilní Menu - ovládací prvky */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
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

      {/* Mobilní Rozbalovací Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Zavře menu po kliknutí
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-violet-600 hover:bg-violet-50 dark:text-slate-300 dark:hover:text-violet-400 dark:hover:bg-slate-900/50 transition-colors"
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