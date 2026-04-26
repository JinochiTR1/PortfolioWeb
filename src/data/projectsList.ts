import type { Project } from '../types/project';

export const projectsList: Project[] = [
  {
    id: 'void-suvereign',
    title: 'Void Suvereign',
    description: 'Main game project running on the Hetzner VPS.',
    technologies: ['Docker', 'CaddyProxy'], // TODO: Update with real stack (e.g., React, Node, etc.)
    url: 'https://voidsuvereign.cz',
    status: 'active',
  },
  {
    id: 'domain-search',
    title: 'DomainSearch',
    description: 'Domain searching utility and management tool.',
    technologies: ['Docker', 'CaddyProxy'],
    url: 'https://search.voidsuvereign.online',
    status: 'active',
  },
  {
    id: 'game-of-life',
    title: 'Game of Life',
    description: 'Implementation of Conway\'s Game of Life algorithm.',
    technologies: ['Docker', 'CaddyProxy'],
    url: 'https://game.voidsuvereign.online',
    status: 'active',
  },
  {
    id: 'my-game',
    title: 'MyGame',
    description: 'An upcoming game project currently in development.',
    technologies: ['Docker'],
    url: '#', // Placeholder URL for development
    status: 'development',
  }
];