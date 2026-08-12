import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Flex from './components/Flex';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CaseStudyModal, Toast } from './components/Modals';

export default function App() {
  const [themeMode, setThemeModeState] = useState(() => {
    try {
      return localStorage.getItem('portfolio_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const [accent, setAccentState] = useState(() => {
    try {
      return localStorage.getItem('portfolio_accent') || 'blue';
    } catch {
      return 'blue';
    }
  });

  const [name] = useState('Ekele Benjamin Gabriel');
  const [activePage, setActivePage] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState({
    main: '#0066FF',
    glow: 'rgba(0, 102, 255, 0.35)',
    subtle: 'rgba(0, 102, 255, 0.1)'
  });

  const [caseStudyId, setCaseStudyId] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  // Per-page custom cyber transition color definitions
  const pageColors = {
    hero: { main: '#0066FF', glow: 'rgba(0, 102, 255, 0.35)', subtle: 'rgba(0, 102, 255, 0.1)' },
    about: { main: '#8B5CF6', glow: 'rgba(139, 92, 246, 0.35)', subtle: 'rgba(139, 92, 246, 0.1)' },
    projects: { main: '#00F0FF', glow: 'rgba(0, 240, 255, 0.35)', subtle: 'rgba(0, 240, 255, 0.1)' },
    experience: { main: '#10B981', glow: 'rgba(16, 185, 129, 0.35)', subtle: 'rgba(16, 185, 129, 0.1)' },
    skills: { main: '#F59E0B', glow: 'rgba(245, 158, 11, 0.35)', subtle: 'rgba(245, 158, 11, 0.1)' },
    testimonials: { main: '#EC4899', glow: 'rgba(236, 72, 153, 0.35)', subtle: 'rgba(236, 72, 153, 0.1)' },
    flex: { main: '#A855F7', glow: 'rgba(168, 85, 247, 0.35)', subtle: 'rgba(168, 85, 247, 0.1)' },
    contact: { main: '#3B82F6', glow: 'rgba(59, 130, 246, 0.35)', subtle: 'rgba(59, 130, 246, 0.1)' }
  };

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeModeState(nextMode);
    try {
      localStorage.setItem('portfolio_theme', nextMode);
    } catch {}
    document.documentElement.setAttribute('data-theme', nextMode);
    showToast(`Switched to ${nextMode.toUpperCase()} Mode`);
  };

  const setAccent = (newAccent) => {
    setAccentState(newAccent);
    try {
      localStorage.setItem('portfolio_accent', newAccent);
    } catch {}
    document.documentElement.setAttribute('data-accent', newAccent);
    showToast(`Accent theme changed to ${newAccent.toUpperCase()}`);
  };

  const handleNavigate = (pageId) => {
    if (pageId === activePage && !isTransitioning) return;

    // Pick target page's unique cyber color
    const targetColors = pageColors[pageId] || pageColors.hero;
    setTransitionTheme(targetColors);

    // Trigger high-tech scanline transition
    setIsTransitioning(true);

    setTimeout(() => {
      setActivePage(pageId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 180);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 380);
  };

  const handleDownloadUneditedResume = () => {
    const link = document.createElement('a');
    link.href = '/EKELE BENJAMIN GABRIEL RECENT CV.pdf';
    link.download = 'EKELE BENJAMIN GABRIEL RECENT CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloading EKELE BENJAMIN GABRIEL RECENT CV.pdf...');
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    document.documentElement.setAttribute('data-accent', accent);
    document.title = `${name} — Senior Product Designer & Frontend Architect`;
  }, [themeMode, accent, name]);

  return (
    <div className="app-root">
      {/* High-Tech Cyber Scanline Laser Transition Screen with Per-Page Unique Color */}
      <div
        className={`cyber-transition-screen ${isTransitioning ? 'active' : ''}`}
        style={{
          '--transition-color': transitionTheme.main,
          '--transition-color-glow': transitionTheme.glow,
          '--transition-color-subtle': transitionTheme.subtle
        }}
      >
        <div className="cyber-grid-flash" />
        <div className="cyber-scanline" />
      </div>

      <Navbar
        name={name}
        accent={accent}
        setAccent={setAccent}
        themeMode={themeMode}
        toggleThemeMode={toggleThemeMode}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Separate Page Views with Smooth Entry Animation */}
      <main className="main-content" style={{ minHeight: '80vh', paddingTop: '120px' }}>
        <div key={activePage} className="page-fade-enter">
          {activePage === 'hero' && (
            <Hero
              name={name}
              onNavigate={handleNavigate}
              onDownloadResume={handleDownloadUneditedResume}
            />
          )}

          {activePage === 'about' && <About />}

          {activePage === 'projects' && (
            <Projects onOpenCaseStudy={(id) => setCaseStudyId(id)} />
          )}

          {activePage === 'experience' && <Experience />}

          {activePage === 'skills' && <Skills />}

          {activePage === 'testimonials' && <Testimonials />}

          {activePage === 'flex' && <Flex />}

          {activePage === 'contact' && (
            <Contact
              name={name}
              onShowToast={showToast}
              onOpenResume={handleDownloadUneditedResume}
            />
          )}
        </div>
      </main>

      <Footer name={name} />

      {/* Modals & Toast */}
      <CaseStudyModal projectId={caseStudyId} onClose={() => setCaseStudyId(null)} />
      <Toast message={toastMsg} />
    </div>
  );
}
