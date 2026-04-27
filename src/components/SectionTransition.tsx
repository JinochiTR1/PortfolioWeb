import React from 'react';

// Dáme na výběr ze 3 variant, ať není každá mezera stejná
interface SectionTransitionProps {
  variant?: 'violet' | 'fuchsia' | 'indigo';
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({ variant = 'violet' }) => {
  // Mapování organických barev a asymetrických pozic pro různé "příchutě" mlhovin
  const styles = {
    violet: {
      core: 'bg-violet-600/30 dark:bg-violet-500/20',
      halo: 'bg-indigo-500/20 dark:bg-indigo-400/10',
      position: 'left-[-10%]',
    },
    fuchsia: {
      core: 'bg-fuchsia-600/30 dark:bg-fuchsia-500/20',
      halo: 'bg-violet-500/20 dark:bg-violet-400/10',
      position: 'right-[-10%]',
    },
    indigo: {
      core: 'bg-indigo-600/30 dark:bg-indigo-500/20',
      halo: 'bg-fuchsia-500/20 dark:bg-fuchsia-400/10',
      position: 'left-[20%]',
    }
  }[variant];

  return (
    // Extrémně důležité: negativní margin (-my-16 až -my-24) způsobí, 
    // že se sekce nad a pod tímto komponentem vizuálně prolnou přes sebe.
    <div className="relative w-full h-32 sm:h-48 -my-16 sm:-my-24 pointer-events-none z-10 flex items-center justify-center overflow-visible">
      
      {/* Temný stínový pás pro plynulé navázání - simuluje hustotu a hloubku vesmíru */}
      <div className="absolute w-full h-30 bg-linear-to-b from-transparent via-slate-950/60 to-transparent blur-[20px]" />
      
      {/* Jádro mlhoviny - pulzující barevná esence */}
      <div className={`absolute w-[120vw] max-w-375 h-25 ${styles.core} blur-[80px] sm:blur-[120px] mix-blend-screen rounded-[100%] ${styles.position} animate-[pulse_8s_ease-in-out_infinite]`} />
      
      {/* Vnější aura (Halo) - doplňková barva, která pulzuje v reverzním rytmu */}
      <div className={`absolute w-[80vw] max-w-250 h-37.5 ${styles.halo} blur-[100px] mix-blend-screen rounded-full animate-[pulse_12s_ease-in-out_infinite_reverse]`} />
      
    </div>
  );
};