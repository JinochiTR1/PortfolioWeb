import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
      
      {/* Centrální záře ukotvující spodek stránky */}
      <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 dark:bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Kontakt
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Máš nápad na projekt, dotaz k architektuře, nebo chceš prostě jen pozdravit? Napiš mi.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white/70 dark:bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Jméno</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400" 
                  placeholder="Tvé jméno" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400" 
                  placeholder="tvuj@email.cz" 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Zpráva</label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400 resize-none" 
                placeholder="O čem se budeme bavit?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-violet-600 text-white font-bold text-lg transition-all duration-300 hover:bg-violet-500 hover:-translate-y-1 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              Odeslat zprávu
            </button>
          </form>

          {/* Přímé kontaktní odkazy */}
          <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-center items-center gap-8 text-slate-600 dark:text-slate-400">
            <a href="mailto:tvoj@email.cz" className="flex items-center gap-2 font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              tvuj@email.cz
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};