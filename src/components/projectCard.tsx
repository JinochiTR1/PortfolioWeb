import React from 'react';
import type { Project } from '../types/project';

/**
 * Props definition for the ProjectCard component.
 * Uses the exact Project interface from our Single Source of Truth.
 */
interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Utility function to determine status badge colors
  const getStatusStyles = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      case 'development':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50';
      case 'archived':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-400 border-slate-200 dark:border-slate-700/50';
      default:
        return '';
    }
  };

  return (
    <div className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] dark:hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden">
      
      {/* Subtle background glow effect. 
        It is invisible by default and fades in slightly on hover, creating the "essence" vibe. 
      */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
            {project.title}
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(project.status)}`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded-md bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex gap-3 mt-auto">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2 px-4 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors text-sm font-semibold shadow-md shadow-violet-200 dark:shadow-none"
        >
          {project.url === '#' ? 'In Progress' : 'Visit Project'}
        </a>
        
        {/* Optional GitHub Source Button */}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-4 rounded-lg bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 hover:bg-slate-200 transition-colors text-sm font-semibold"
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
};