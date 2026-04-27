import React, { useEffect, useState, useMemo } from 'react';

// Konstanty pro konfiguraci, ať je to čisté
const PARTICLE_COUNT = 150; // Zvýšeno pro hloubku a komplexnost
const COLOR_CLOUDS = [
  { id: 1, base: 'bg-violet-600/30', aura: 'bg-violet-500/20', blur: 'blur-[120px]', size: 'w-[80vw] h-[80vw]', drift: 'nebula-drift-slow' },
  { id: 2, base: 'bg-fuchsia-600/20', aura: 'bg-fuchsia-500/10', blur: 'blur-[100px]', size: 'w-[60vw] h-[60vw]', drift: 'nebula-drift-medium' },
  { id: 3, base: 'bg-indigo-500/15', aura: 'bg-indigo-400/10', blur: 'blur-[110px]', size: 'w-[50vw] h-[50vw]', drift: 'nebula-drift-slow' },
  { id: 4, base: 'bg-teal-400/10', aura: 'bg-teal-300/5', blur: 'blur-[90px]', size: 'w-[40vw] h-[40vw]', drift: 'nebula-drift-fast' } // Přidán čtvrtý akcent
];

export const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<{ id: number; size: number; startX: number; startY: number; duration: number; delay: number; opacity: number }[]>([]);

  // useMemo pro generování částic, aby se negenerovaly při každém renderu (optimalizace)
  const initialParticles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      size: Math.random() * 3.5 + 1.2, // Větší rozpětí pro hloubku a třpyt
      startX: Math.random() * 100, // Pozice na ose X (0-100% šířky okna)
      startY: Math.random() * 100, // Pozice na ose Y (0-100% výšky okna)
      duration: Math.random() * 25 + 20, // Delší, plynulejší pohyb
      delay: Math.random() * -45, // Záporný delay pro okamžitý start
      opacity: Math.random() * 0.6 + 0.2 // Náhodná počáteční opacity
    }));
  }, []);

  useEffect(() => {
    setParticles(initialParticles);
  }, [initialParticles]);

  return (
    // Fixed pozice zajistí, že pozadí zůstane na místě při scrollování
    // pointer-events-none je kritické, aby pozadí neblokovalo klikání na tlačítka
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      
      {/* ŽIVÁ NEBULA ESENCE - Pulzující a driftující mlhovinové mraky */}
      {/* Uvnitř každého driftujícího wrapperu je statická esence a pulzující aura */}
      {COLOR_CLOUDS.map(cloud => (
        <div key={cloud.id} className={`absolute ${cloud.drift} opacity-0`}>
          {/* Uvnitř každého driftujícího wrapperu je statická esence a pulzující aura */}
          <div className={`absolute ${cloud.size} ${cloud.base} ${cloud.blur} rounded-full`} />
          <div className={`absolute ${cloud.size} ${cloud.aura} ${cloud.blur} rounded-full blur-[80px] sm:blur-[110px] animate-[pulse_10s_ease-in-out_infinite_reverse]`} />
        </div>
      ))}

      {/* ORGANICKÉ, TŘPYTÍCÍ SE ČÁSTICE - Levitující a glimmering hvězdný prach */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/50 shadow-[0_0_8px_rgba(255,255,255,0.8)] dark:shadow-[0_0_8px_rgba(167,139,250,0.8)] glimmer-particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            opacity: p.opacity,
            // Navázání na komplexní animaci glimmer defined níže
            animation: `glimmer-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`
          }}
        />
      ))}

      {/* In-line CSS pro pokročilé a plynulé animace, které Tailwind neumí přímo */}
      <style>{`
        /* Drift mlhovinových mraků po krouživé trajektorii s měnícím se scale */
        @keyframes nebula-drift-slow {
          0% { transform: translate(-10%, -10%) scale(1); opacity: 0.2; }
          25% { transform: translate(5%, -5%) scale(1.1); opacity: 0.7; }
          50% { transform: translate(-5%, 5%) scale(1); opacity: 0.4; }
          75% { transform: translate(10%, 10%) scale(0.9); opacity: 0.6; }
          100% { transform: translate(-10%, -10%) scale(1); opacity: 0.2; }
        }
        @keyframes nebula-drift-medium {
          0% { transform: translate(15%, 15%) scale(1.2); opacity: 0.4; }
          25% { transform: translate(-10%, 10%) scale(1); opacity: 0.8; }
          50% { transform: translate(10%, -10%) scale(1.1); opacity: 0.5; }
          75% { transform: translate(-15%, -15%) scale(1.2); opacity: 0.7; }
          100% { transform: translate(15%, 15%) scale(1.2); opacity: 0.4; }
        }
        @keyframes nebula-drift-fast {
          0% { transform: translate(25%, -25%) scale(1); opacity: 0.1; }
          33% { transform: translate(-20%, 20%) scale(1.2); opacity: 0.6; }
          66% { transform: translate(20%, -20%) scale(1); opacity: 0.2; }
          100% { transform: translate(25%, -25%) scale(1); opacity: 0.1; }
        }

        /* Glimmer (thřpyt) a komplexní float částic prachu */
        @keyframes glimmer-particle {
          0% { 
            transform: translateY(0px) translateX(0px) scale(0.8); 
            opacity: 0.2; 
            box-shadow: 0 0 6px rgba(255,255,255,0.6);
          }
          20% { 
            transform: translateY(-40px) translateX(15px) scale(1.2); 
            opacity: 0.9; 
            box-shadow: 0 0 14px rgba(255,255,255,1);
          }
          40% { 
            transform: translateY(-80px) translateX(-15px) scale(1.1); 
            opacity: 0.5; 
            box-shadow: 0 0 10px rgba(255,255,255,0.7);
          }
          60% { 
            transform: translateY(-120px) translateX(25px) scale(1); 
            opacity: 0.8; 
            box-shadow: 0 0 16px rgba(255,255,255,1);
          }
          80% { 
            transform: translateY(-160px) translateX(-25px) scale(0.9); 
            opacity: 0.3; 
            box-shadow: 0 0 8px rgba(255,255,255,0.5);
          }
          100% { 
            transform: translateY(-200px) translateX(0px) scale(0.8); 
            opacity: 0.1; 
            box-shadow: 0 0 6px rgba(255,255,255,0.4);
          }
        }

        /* Třídy pro Tailwind a in-line animace */
        .nebula-drift-slow { animation: nebula-drift-slow 60s ease-in-out infinite; }
        .nebula-drift-medium { animation: nebula-drift-medium 40s ease-in-out infinite; }
        .nebula-drift-fast { animation: nebula-drift-fast 25s ease-in-out infinite; }
        .glimmer-particle { pointer-events: none; } /* Zajistit, že neblokuje interakci */
      `}</style>
    </div>
  );
};