export interface ProjectPlanet {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  link?: string;
  github?: string;
  
  // 3D Engine Properties
  size: number; // Determines the radius of the planet sphere
  textureType: 'gasGiant' | 'terrestrial' | 'cyber' | 'crystalline'; 
  baseColor: string; // Hex color for the planet's material/glow
  orbitRadius: number; // Distance from the galaxy center
  orbitSpeed: number; // Speed of rotation around the center
}

export interface TechGalaxy {
  id: string;
  name: string;
  description: string;
  
  // 3D Engine Properties
  position: [number, number, number]; // [x, y, z] coordinates in the Macro Void
  coreColor: string;
  particleColor: string;
  
  planets: ProjectPlanet[];
}

export const universeData: TechGalaxy[] = [
  {
    id: "galaxy-react",
    name: "React & Frontend Nebula",
    description: "Soustava moderních webových aplikací a uživatelských rozhraní.",
    position: [-35, 10, -20],
    coreColor: "#8b5cf6", // violet-500
    particleColor: "#a78bfa", // violet-400
    planets: [
      {
        id: "planet-portfolio",
        title: "Digital Essence",
        shortDescription: "Osobní 3D portfolio.",
        fullDescription: "Pohlcující 3D zážitek postavený na React Three Fiber, prezentující projekty jako vesmírnou soustavu. Důraz na Clean Architecture a pokročilé shadery.",
        technologies: ["React", "TypeScript", "Three.js", "TailwindCSS", "Vite"],
        link: "https://voidsuvereign.info",
        size: 1.8,
        textureType: 'cyber',
        baseColor: "#c084fc", // fuchsia-400
        orbitRadius: 4,
        orbitSpeed: 0.005,
      },
      {
        id: "planet-domainsearch",
        title: "DomainSearch",
        shortDescription: "Aplikace pro vyhledávání a správu domén.",
        fullDescription: "Webový nástroj pro rychlou analýzu dostupnosti domén s integrací na backendové API. Optimalizováno pro rychlost a plynulé UX.",
        technologies: ["React", "Node.js", "API"],
        link: "https://search.voidsuvereign.online",
        size: 1.2,
        textureType: 'terrestrial',
        baseColor: "#38bdf8", // sky-400
        orbitRadius: 7,
        orbitSpeed: 0.003,
      }
    ]
  },
  {
    id: "galaxy-gaming",
    name: "Gaming & Simulation Cluster",
    description: "Soustava herních projektů, enginů a komplexních simulací.",
    position: [35, -15, -25],
    coreColor: "#d946ef", // fuchsia-500
    particleColor: "#e879f9", // fuchsia-400
    planets: [
      {
        id: "planet-voidsuvereign",
        title: "Void Suvereign",
        shortDescription: "Temná vesmírná strategie.",
        fullDescription: "Komplexní herní projekt zaměřený na prozkoumávání vesmíru, správu surovin a taktické souboje v reálném čase. Vyžaduje hlubokou optimalizaci logiky a renderování.",
        technologies: ["Game Engine", "C#", "HLSL"], // Uprav dle reálného stacku
        link: "https://voidsuvereign.cz",
        size: 2.5,
        textureType: 'gasGiant',
        baseColor: "#6366f1", // indigo-500
        orbitRadius: 5,
        orbitSpeed: 0.002,
      },
      {
        id: "planet-gameoflife",
        title: "Conway's Game of Life",
        shortDescription: "Matematická simulace celulárního automatu.",
        fullDescription: "Implementace klasického celulárního automatu. Projekt slouží jako demonstrace algoritmické efektivity a manipulace s maticemi v reálném čase.",
        technologies: ["TypeScript", "Algorithms", "Canvas API"],
        link: "https://game.voidsuvereign.online",
        size: 0.9,
        textureType: 'crystalline',
        baseColor: "#14b8a6", // teal-500
        orbitRadius: 9,
        orbitSpeed: 0.007,
      }
    ]
  },
  {
    id: "galaxy-infrastructure",
    name: "DevOps & Data Core",
    description: "Jádro serverové infrastruktury, automatizace a databází.",
    position: [0, 25, -60],
    coreColor: "#0ea5e9", // sky-500
    particleColor: "#38bdf8", // sky-400
    planets: [
      {
        id: "planet-infrastructure",
        title: "Hetzner Docker Swarm",
        shortDescription: "Kompletní serverová architektura.",
        fullDescription: "Infrastruktura nasazená na Hetzner VPS pomocí Docker kontejnerů. Obsahuje MongoDB, vlastní N8N workflow, analytiku Umami a Caddy proxy pro automatický HTTPS routing.",
        technologies: ["Docker", "Caddy", "MongoDB", "N8N", "Ubuntu Server"],
        size: 2.0,
        textureType: 'cyber',
        baseColor: "#f43f5e", // rose-500
        orbitRadius: 0, // Je to centrální uzel, neobíhá
        orbitSpeed: 0,
      }
    ]
  }
];