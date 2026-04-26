import { HeroSection } from './sections/heroSection';
import { ProjectsSection } from './sections/projectsSection';
import { NavigationBar } from './components/navigationBar';
import { SkillsSection } from './sections/skillsSection';
import { AboutMeSection } from './sections/aboutMeSection';
import { ContactSection } from './sections/contactSection';
import { FooterSection } from './sections/footerSection';

function App() {
  return (
    // Hlavní obal aplikace s plynulým přechodem barev pro dark mode
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 font-sans selection:bg-violet-500/30">
      
      <NavigationBar />

      <main>
        <NavigationBar />
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <FooterSection />
      </main>

      {/* Zde později přidáme zbytek sekcí jako AboutMe, Skills a Footer 
      */}
      
    </div>
  );
}

export default App;