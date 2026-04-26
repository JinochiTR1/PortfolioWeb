import React from 'react';

export const AboutMeSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-white dark:bg-slate-900/50">
      
      {/* Subtilní fuchsiová záře na levé straně pro balanc */}
      <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-fuchsia-400/5 dark:bg-fuchsia-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Levý sloupec: Text a příběh */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-6">
              O mně
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                Jsem vývojář, který věří v <strong className="font-semibold text-slate-900 dark:text-slate-200">čistou architekturu</strong> a princip <strong className="font-semibold text-slate-900 dark:text-slate-200">Single Source of Truth</strong>. Moje práce nekončí jen u psaní kódu; baví mě navrhovat a spravovat celou infrastrukturu.
              </p>
              <p>
                Většinu svých projektů, od her jako Void Suvereign až po různé utility, hostuji na vlastním Hetzner VPS. Zastávám kontejnerizaci pomocí <strong className="font-semibold text-violet-600 dark:text-violet-400">Dockeru</strong> a plynulé nasazování přes CaddyProxy. Na frontendu nedám dopustit na moderní React s TypeScriptem a Tailwindem.
              </p>
              <p>
                Rád optimalizuji procesy, dbám na DRY (Don't Repeat Yourself) pravidla a snažím se, aby můj kód byl nejen funkční, ale i dobře čitelný a dlouhodobě udržitelný.
              </p>
            </div>

            {/* Zvýrazněný citát nebo moto */}
            <blockquote className="mt-8 border-l-4 border-violet-500 pl-6 italic text-slate-700 dark:text-slate-300">
              "Kód se čte mnohem častěji, než se píše. Proto je čistá architektura základem každého stabilního projektu."
            </blockquote>
          </div>

          {/* Pravý sloupec: Fotografie / Vizuál */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Dekorativní rámeček se září */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-violet-500 to-fuchsia-500 opacity-20 blur-lg transition-opacity duration-500 group-hover:opacity-40"></div>
            
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center shadow-xl shadow-violet-900/5">
              
              {/* TOTO JE PLACEHOLDER. Až budeš mít fotku, můžeš tento div nahradit tagem <img /> */}
              <div className="text-center p-8">
                <svg className="mx-auto h-24 w-24 text-slate-400 dark:text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  [ Prostor pro profilovku ]
                </p>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};