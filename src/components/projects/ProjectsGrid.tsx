import React from 'react';
import { universeData } from '../../data/projectsList';

interface ProjectsGridProps {
  onProjectClick: (projectId: string) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onProjectClick }) => {
  return (
    // Přidán horní padding (pt-32), aby obsah nelezl pod fixní navigaci
    // Kontejner má max-šířku pro perfektní čitelnost na ultra-wide monitorech
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 space-y-24">
      
      {/* Hlavní nadpis 2D sekce */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400 tracking-tight drop-shadow-lg mb-4">
          Sektor Projektů
        </h2>
        <p className="text-lg text-slate-400">
          Procházejte mé projekty rozdělené do technologických celků.
        </p>
      </div>

      {/* Průchod všemi "Galaxiemi" (Kategoriemi) */}
      {universeData.map((galaxy) => (
        <div key={galaxy.id} className="space-y-8 animate-fade-in-up">
          
          {/* Hlavička kategorie (s barvou odpovídající jádru galaxie ve 3D) */}
          <div className="flex flex-col md:flex-row md:items-end gap-4 border-b border-slate-800 pb-4">
            <h3 
              className="text-2xl sm:text-3xl font-bold tracking-wider uppercase"
              style={{ color: galaxy.coreColor }}
            >
              {galaxy.name}
            </h3>
            <p className="text-slate-500 text-sm font-medium mb-1">
              {galaxy.description}
            </p>
          </div>

          {/* Grid projektů pro danou kategorii */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galaxy.planets.map((planet) => (
              <div 
                key={planet.id}
                onClick={() => onProjectClick(planet.id)}
                className="group relative flex flex-col bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer"
              >
                {/* Dynamická barevná linka odkazující na barvu planety ve 3D */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300 opacity-70 group-hover:opacity-100"
                  style={{ backgroundColor: planet.baseColor, boxShadow: `0 0 10px ${planet.baseColor}` }}
                />

                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h4 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
                    {planet.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {planet.shortDescription}
                  </p>

                  {/* Technologie / Tagy */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {planet.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[10px] uppercase font-bold bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700 tracking-wider group-hover:border-slate-600 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {planet.technologies.length > 4 && (
                      <span className="text-[10px] uppercase font-bold bg-slate-800/30 text-slate-500 px-2.5 py-1 rounded-md border border-slate-800">
                        +{planet.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Falešné tlačítko pro jasnější výzvu k akci (Call to Action) */}
                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 group-hover:text-violet-400 transition-colors">
                    Zjistit více
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {/* Jednoduchá CSS animace pro postupné zjevení sekcí ze spodu */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};