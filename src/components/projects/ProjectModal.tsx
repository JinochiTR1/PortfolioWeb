import React, { useEffect, useMemo } from 'react';
import { universeData, type ProjectPlanet } from '../../data/projectsList';

interface ProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ projectId, onClose }) => {
  // Vyhledání projektu na základě předaného ID
  const project: ProjectPlanet | null = useMemo(() => {
    if (!projectId) return null;
    for (const galaxy of universeData) {
      const found = galaxy.planets.find(p => p.id === projectId);
      if (found) return found;
    }
    return null;
  }, [projectId]);

  // Zavření modalu pomocí klávesy Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (projectId) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectId, onClose]);

  // Pokud není nic vybráno nebo projekt neexistuje, nic nerenderujeme
  if (!project) return null;

  return (
    // Ztmavené pozadí přes celou obrazovku, kliknutí sem modal zavře
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl transition-all duration-500"
      onClick={onClose}
    >
      {/* Hlavní okno Modalu, kliknutí dovnitř ho nesmí zavřít */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#020617]/90 border border-violet-500/30 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)] animate-tooltip-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Jemná kyberpunková linka nahoře */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-violet-600 to-fuchsia-500" />
        
        {/* Tlačítko pro zavření */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-violet-600/50 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          aria-label="Zavřít detail projektu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Obsah modalu */}
        <div className="p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400 mb-2 pr-10">
            {project.title}
          </h2>
          <p className="text-lg text-slate-300 font-medium mb-8 border-l-2 border-violet-500 pl-4 py-1 bg-slate-900/30 rounded-r-lg">
            {project.shortDescription}
          </p>

          <div className="space-y-8">
            {/* Detailní popis */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Detail projektu</h3>
              <p className="text-slate-300 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Technologie */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Technologie</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span 
                    key={tech} 
                    className="text-sm font-bold bg-violet-900/40 text-violet-200 px-3 py-1.5 rounded-lg border border-violet-700/50 shadow-inner"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Interaktivní odkazy */}
            {(project.link || project.github) && (
              <div className="pt-6 border-t border-slate-800/50 flex flex-wrap gap-4">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-fuchsia-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Živá ukázka
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-sm uppercase tracking-widest hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-300 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Zdrojový kód
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};