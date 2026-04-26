/**
 * Interface representing a category of technical skills.
 * Keeping data centralized here ensures DRY principles across the portfolio.
 */
export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillsList: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    title: 'Infrastructure & DevOps',
    skills: ['Docker', 'CaddyProxy', 'Linux (VPS)', 'Bash']
  },
  {
    title: 'Backend & Tools',
    skills: ['Node.js', 'Git', 'GitHub', 'VS Code'] // TODO: Adjust based on your actual stack
  }
];