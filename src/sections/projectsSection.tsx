import React from 'react';
import { projectsList } from '../data/projectsList';
import { ProjectCard } from '../components/projectCard';

/**
 * ProjectsSection component.
 * Iterates through the centralized projects data and renders a grid of ProjectCards.
 * Includes an ambient background glow effect for the "essence" vibe.
 */
export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background Ambient Glow (Fialový kouř).
        Centered absolutely, highly blurred, and non-interactive (pointer-events-none).
      */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Moje Projekty
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Přehled aplikací, her a nástrojů, které aktuálně běží na mém Hetzner serveru.
          </p>
        </div>

        {/* Responsive CSS Grid for the cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};