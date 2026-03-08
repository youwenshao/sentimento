import React, { useState, useEffect } from 'react';
import { Plus, Minus, Sun, Moon, Settings, Play, Pause, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import AbstractBackground from './src/components/AbstractBackground';
import { useTheme } from './src/hooks/useTheme';

gsap.registerPlugin(ScrollToPlugin);

// --- SentimentoPage.jsx ---
// This is the main layout component, designed with an ultra-minimalist philosophy.
// Key principles:
// 1. **Content First**: Typography (Inter) and whitespace define the hierarchy.
// 2. **Subtlety**: Accents are purely functional; no decorative graphics.
// 3. **Responsiveness**: Tailwind CSS ensures fluid layout across devices.
// 4. **Motion**: The background shader provides the visual "texture" while the UI
//    uses subtle opacity and transform transitions.

const PROJECTS = [
  {
    id: '01',
    name: 'Étude',
    tag: 'Research / ML',
    description: 'Pipeline converting scanned sheet music into accurate piano fingering using symbolic intermediate representations.'
  },
  {
    id: '02',
    name: 'Cumulonimbus',
    tag: 'Platform / AI',
    description: 'Intent-to-application platform enabling non-technical users to generate personalized web applications via natural language.'
  },
  {
    id: '03',
    name: 'Monolathe',
    tag: 'Pipeline / Video',
    description: 'Production-grade AI content automation leveraging local infrastructure for cost-effective, multi-tenant video production.'
  },
  {
    id: '04',
    name: 'CaseCrawl',
    tag: 'Data / Legal',
    description: 'Ethical web crawler with human-in-the-loop disambiguation and fuzzy citation matching for Westlaw Asia.'
  },
  {
    id: '05',
    name: 'Ochavo',
    tag: 'Finance / Crypto',
    description: 'Capital gains calculator (FIFO) and Modelo 721 generator for Spanish crypto investors.'
  },
  {
    id: '06',
    name: 'Mismo',
    tag: 'Dev / Hybrid',
    description: 'Hybrid human-AI software development platform automating the lifecycle from idea to deployment.'
  }
];

export default function SentimentoPage() {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [speed, setSpeed] = useState(0.5);
  const [complexity, setComplexity] = useState(0.5);
  const [showControls, setShowControls] = useState(false);

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''} min-h-screen transition-colors duration-500`}>
      <div className="relative min-h-screen font-sans 
        bg-primary 
        text-primary
        selection:bg-primary selection:text-white dark:selection:text-black
        transition-colors duration-500">
        
        {/* Background Layer */}
        <AbstractBackground 
          isEnabled={animationsEnabled} 
          speed={speed} 
          complexity={complexity} 
          theme={theme}
        />

        {/* Content Layer */}
        <div className="relative z-10 px-6 md:px-12 lg:px-24 py-12 max-w-[1600px] mx-auto">
          <Header />
          <Hero />
          <ProjectList />
          <Footer 
            animationsEnabled={animationsEnabled} 
            setAnimationsEnabled={setAnimationsEnabled}
            theme={theme}
            toggleTheme={toggleTheme}
            showControls={showControls}
            setShowControls={setShowControls}
          />
        </div>
        
        {/* Controls Overlay */}
        {showControls && (
          <div className="fixed bottom-24 right-6 md:right-12 z-50 p-6 
            bg-panel backdrop-blur-md 
            border border-panel rounded-lg shadow-xl w-72
            transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
            
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-widest font-medium opacity-80 text-primary">Animation Controls</h3>
              <button onClick={() => setShowControls(false)} className="opacity-50 hover:opacity-100 text-primary">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs opacity-60 text-secondary">
                  <span>Speed</span>
                  <span>{Math.round(speed * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="2" 
                  step="0.1" 
                  value={speed} 
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="custom-slider"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs opacity-60 text-secondary">
                  <span>Complexity</span>
                  <span>{Math.round(complexity * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={complexity} 
                  onChange={(e) => setComplexity(parseFloat(e.target.value))}
                  className="custom-slider"
                />
              </div>
            </div>
          </div>
        )}

        {/* Global Styles for fonts */}
        <style>{`
          .thin-border { border-bottom: 1px solid rgba(0, 0, 0, 0.1); }
          .dark .thin-border { border-bottom: 1px solid rgba(255, 255, 255, 0.15); }
          .custom-ease { transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); }
        `}</style>
      </div>
    </div>
  );
}

function Header() {
  const scrollToProjects = (e) => {
    e.preventDefault();
    gsap.to(window, { duration: 1.2, scrollTo: { y: "#work", offsetY: 50 }, ease: "power3.inOut" });
  };

  return (
    <header className="flex justify-between items-start mb-32 md:mb-48">
      <div>
        <SentimentoLogo className="w-12 h-12 text-primary opacity-90" />
      </div>
      <nav className="flex gap-8 text-sm font-light tracking-wide opacity-80 text-primary">
        <a href="#work" onClick={scrollToProjects} className="hover:opacity-100 transition-opacity">Projects</a>
        <a href="mailto:team@sentimento.dev" className="hover:opacity-100 transition-opacity">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mb-40 md:mb-64">
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-7xl font-light leading-tight tracking-tight mb-8 text-primary">
          Systems so efficient they <span className="opacity-50">disappear</span>.
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:items-end">
          <p className="text-lg md:text-xl text-secondary max-w-xl font-light leading-relaxed">
            AI systems designed by the same hands that deploy them.<br />
            We construct the invisible infrastructure of intelligence.<br />
            Post-scale infrastructure is here. The antidote to scale. 
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectList() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="work" className="mb-40">
      <div className="flex items-end justify-between mb-8 pb-4 thin-border">
        <span className="text-xs uppercase tracking-widest text-tertiary">Made by Sentimento, with love from Hong Kong</span>
        <span className="text-xs uppercase tracking-widest text-tertiary">01 — 06</span>
      </div>
      
      <div className="flex flex-col">
        {PROJECTS.map((project) => (
          <ProjectItem 
            key={project.id} 
            project={project} 
            isActive={activeId === project.id}
            onToggle={() => setActiveId(activeId === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({ project, isActive, onToggle }) {
  return (
    <div 
      className="group py-8 thin-border cursor-pointer transition-all duration-[800ms] custom-ease"
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-4 md:gap-12">
          <span className="text-xs font-mono text-tertiary">{project.id}</span>
          <h3 className="text-2xl md:text-4xl font-light tracking-tight text-primary group-hover:opacity-70 transition-opacity duration-[800ms] custom-ease">
            {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:block text-xs uppercase tracking-wider text-tertiary group-hover:text-secondary transition-colors duration-[800ms] custom-ease">
            {project.tag}
          </span>
          <div className="text-tertiary group-hover:text-primary transition-colors duration-[800ms] custom-ease">
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-[800ms] custom-ease ${isActive ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-start-2 md:col-span-6">
            <p className="text-secondary font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ animationsEnabled, setAnimationsEnabled, theme, toggleTheme, showControls, setShowControls }) {
  return (
    <footer id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-black/10 dark:border-white/10">
      <div>
        <h4 className="text-sm font-medium uppercase tracking-widest mb-6 opacity-80 text-primary">You Could Hire 200 People</h4>
        <p className="text-secondary max-w-sm font-light leading-relaxed mb-6">
          But why hire 200 people to get the job done, when you can just buy what two people actually built?
        </p>
        
        <div className="flex gap-6 mt-8">
          {/* Animation Toggle */}
          <button 
            onClick={() => setAnimationsEnabled(!animationsEnabled)}
            className="text-xs text-tertiary uppercase tracking-widest hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            {animationsEnabled ? <Pause size={14} /> : <Play size={14} />}
            {animationsEnabled ? 'Pause BG' : 'Play BG'}
          </button>

          {/* Controls Toggle */}
          <button 
            onClick={() => setShowControls(!showControls)}
            className="text-xs text-tertiary uppercase tracking-widest hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            <Settings size={14} />
            Config
          </button>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="text-xs text-tertiary uppercase tracking-widest hover:text-primary transition-colors duration-300 flex items-center gap-2"
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end justify-between">
        <a 
          href="mailto:team@sentimento.dev" 
          className="text-2xl md:text-3xl font-light hover:opacity-50 transition-opacity duration-300 text-primary"
        >
          team@sentimento.dev
        </a>
        <p className="text-xs text-tertiary mt-2 md:mt-4 text-right">
          © 2026 Sentimento Technologies Limited. Hong Kong.
        </p>
      </div>
    </footer>
  );
}

function SentimentoLogo(props) {
  return (
    <svg viewBox="0 0 600 600" {...props}>
      <g transform="translate(0,600) scale(0.1,-0.1)"
         fill="currentColor" stroke="currentColor" strokeWidth="250" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3714 4759 c-195 -26 -354 -218 -400 -483 -11 -60 -14 -118 -10 -168
        l5 -77 -36 -7 c-55 -10 -338 4 -423 21 -224 45 -412 146 -560 302 -81 84 -124
        144 -184 253 -26 47 -56 93 -67 103 -55 46 -159 -8 -145 -76 18 -89 156 -297
        281 -422 181 -181 395 -291 669 -342 67 -13 146 -18 296 -18 l205 0 41 -125
        c23 -69 95 -246 161 -395 221 -497 261 -642 250 -913 -5 -155 -31 -262 -94
        -389 -189 -385 -636 -585 -1080 -482 -288 66 -500 263 -570 529 -23 89 -23
        271 1 365 56 217 209 420 384 509 98 50 184 69 296 64 91 -3 109 -7 168 -36
        151 -74 238 -228 238 -422 0 -56 3 -70 23 -87 48 -45 114 -36 142 18 20 37 19
        167 0 244 -56 221 -203 380 -410 445 -90 28 -248 31 -350 5 -273 -67 -508
        -278 -622 -555 -51 -124 -68 -218 -67 -370 1 -201 44 -347 149 -506 289 -434
        949 -543 1460 -241 108 63 269 217 339 324 174 266 223 620 135 973 -41 165
        -78 261 -224 590 -104 233 -195 461 -195 489 0 4 19 13 43 20 133 40 304 162
        381 273 87 128 117 321 67 435 -52 117 -158 171 -297 152z m91 -185 c51 -20
        65 -159 25 -252 -33 -76 -127 -160 -242 -216 -102 -50 -108 -49 -108 20 0 58
        27 205 47 256 48 122 129 198 214 198 26 0 55 -3 64 -6z"/>
      </g>
      <circle cx="520" cy="520" r="25" fill="currentColor" />
    </svg>
  );
}
