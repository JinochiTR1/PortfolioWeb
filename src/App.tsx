import { HeroSection } from './sections/heroSection';
import { ProjectsSection } from './sections/projectsSection';
import { NavigationBar } from './components/navigationBar';
import { SkillsSection } from './sections/skillsSection';
import { AboutMeSection } from './sections/aboutMeSection';
import { ContactSection } from './sections/contactSection';
import { FooterSection } from './sections/footerSection';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SectionTransition } from './components/SectionTransition';

function App() {
  return (
    // Hlavní obal aplikace s plynulým přechodem barev pro dark mode
    // ZMĚNA 1: min-h-[100dvh] místo min-h-screen (řeší iOS Safari adresní lištu)
    // ZMĚNA 2: přidáno transform-gpu (využije grafický čip pro plynulejší scrollování)
    <div className="relative overflow-x-hidden min-h-dvh bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 font-sans selection:bg-violet-500/30 ">
      
      <NavigationBar />
      
      <main>
        <AnimatedBackground />
        <HeroSection />
        <SectionTransition variant="fuchsia" />
        <AboutMeSection />
        <SectionTransition variant="violet" />
        <SkillsSection />
        <SectionTransition variant="indigo" />
        <ProjectsSection />
        <SectionTransition variant="fuchsia" />
        <ContactSection />
        <FooterSection />
      </main>

      {/* Zde později přidáme zbytek sekcí jako AboutMe, Skills a Footer 
      */}
      
    </div>
  );
}

export default App;