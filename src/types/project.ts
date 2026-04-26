/**
 * Represents a single project deployed on the Hetzner VPS or elsewhere.
 * This interface ensures strict typing for the Single Source of Truth data array.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url: string;
  githubUrl?: string; // Optional: In case the repository is private
  status: 'active' | 'development' | 'archived';
  // Note: We can add imageUrl later if you decide to include screenshots
}