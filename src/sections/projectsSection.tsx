import React, { useState, useEffect } from 'react';
// Importy zohledňující striktní velikost písmen na Linux serverech
import { Projects3D } from '../components/projects/Projects3D';
import { ProjectsGrid } from '../components/projects/ProjectsGrid';
import { ProjectModal } from '../components/projects/ProjectModal';
import { universeData } from '../data/projectsList';

export const ProjectsSection: React.FC = () => {
  // Stav pro vybraný projekt (pro Modal), sdílený pro oba režimy
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  
  // Stav pro navigaci ve 3D vesmíru
  const [selectedGalaxyId, setSelectedGalaxyId] = useState<string | null>(null);
  const selectedGalaxy = universeData.find(g => g.id === selectedGalaxyId) || null;

  // Stav pro režim zobrazení (načtení z localStorage, výchozí '3d')
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioViewMode');
      if (saved === '3d' || saved === 'grid') return saved;
    }
    return '3d';
  });

  // Uložení změny režimu do localStorage
  useEffect(() => {
    localStorage.setItem('portfolioViewMode', viewMode);
  }, [viewMode]);

  return (
    // Dynamická změna tříd: 3D potřebuje fixní výšku a overflow-hidden, Grid potřebuje přirozený scroll
    <section 
      id="projects" 
      className={`relative w-full bg-[#020617] transition-all duration-500 ${
        viewMode === '3d' ? 'h-[100vh] min-h-[800px] overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* Poletující "Pill" přepínač režimů */}
      {/* OPRAVA: Použito flex justify-center na plné šířce pro absolutně přesné centrování */}
      <div className="absolute top-24 w-full flex justify-center z-50 pointer-events-none">
        <div className="animate-fade-in-down pointer-events-auto flex items-center bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-full p-1 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
              viewMode === '3d' 
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            3D Vesmír
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-5 py-2 rounded-full text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
              viewMode === 'grid' 
                ? 'bg-violet-600 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Seznam
          </button>
        </div>
      </div>

      {/* Vykreslení 3D režimu */}
      {viewMode === '3d' && (
        <>
          {/* Overlay UI pro 3D režim (Nadpis, Návrat do Voidu) */}
          <div className="absolute top-36 left-6 sm:left-12 z-10 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight drop-shadow-lg mb-2">
              Sektor Projektů
            </h2>
            <p className="text-lg text-slate-400 max-w-xl border-l-2 border-violet-500 pl-4 py-1 bg-slate-900/30 backdrop-blur-sm rounded-r-lg">
              {selectedGalaxy 
                ? `Aktuální lokace: ${selectedGalaxy.name}. Prozkoumej jednotlivé projekty v této soustavě.` 
                : "Nacházíš se v hlavním Voidu. Procházej vesmír pomocí myši a klikni do libovolné mlhoviny pro vstup."}
            </p>
            <div className="mt-8 h-12">
              {selectedGalaxy && (
                <button 
                  onClick={() => setSelectedGalaxyId(null)}
                  className="pointer-events-auto px-6 py-3 rounded-xl bg-slate-800/80 text-white font-bold text-sm uppercase tracking-widest border border-slate-600 hover:bg-violet-600 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 backdrop-blur-md flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Návrat do Voidu
                </button>
              )}
            </div>
          </div>

          {/* Nápověda ovládání dole */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 backdrop-blur-sm rounded-full border border-slate-800 text-slate-400 text-xs font-mono tracking-wider shadow-xl">
              <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 border border-slate-700">👆</span> Tažení = Rotace
              <span className="flex items-center justify-center w-5 h-5 rounded bg-slate-800 border border-slate-700 ml-2">🖱️</span> Kolečko = Zoom
            </div>
          </div>

          {/* Samotná 3D komponenta napojená na stavy */}
          <Projects3D 
            selectedGalaxyId={selectedGalaxyId}
            onSelectGalaxy={setSelectedGalaxyId}
            onProjectClick={(id) => setSelectedProjectId(id)}
          />
        </>
      )}

      {/* Vykreslení Grid režimu */}
      {viewMode === 'grid' && (
        // OPRAVA: Přidán dodatečný padding-top, aby grid nezasahoval do Pill přepínače
        <div className="pt-16">
          <ProjectsGrid onProjectClick={(id) => setSelectedProjectId(id)} />
        </div>
      )}

      {/* Sdílený Modal pro detail projektu - nezávislý na tom, co je na pozadí */}
      <ProjectModal 
        projectId={selectedProjectId} 
        onClose={() => setSelectedProjectId(null)} 
      />

      {/* Oživující animace pro Pill přepínač */}
      {/* OPRAVA: Odstraněno translateX, aby nekolidovalo s novým Flex centrováním */}
      <style>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};