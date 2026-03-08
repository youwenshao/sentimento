import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import AbstractBackground from './src/components/AbstractBackground';

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

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-white selection:text-black">
      {/* Background Layer */}
      <AbstractBackground isEnabled={animationsEnabled} />

      {/* Content Layer */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-12 max-w-[1600px] mx-auto">
        <Header />
        <Hero />
        <ProjectList />
        <Footer animationsEnabled={animationsEnabled} setAnimationsEnabled={setAnimationsEnabled} />
      </div>
      
      {/* Global Styles for fonts */}
      <style>{`
        .thin-border { border-bottom: 1px solid rgba(255, 255, 255, 0.15); }
        .custom-ease { transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1); }
      `}</style>
    </div>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-start mb-32 md:mb-48">
      <div>
        <h1 className="text-sm font-medium tracking-widest uppercase opacity-80">Sentimento</h1>
        <p className="text-xs text-white/40 mt-1">EST. 2026</p>
      </div>
      <nav className="flex gap-8 text-sm font-light tracking-wide opacity-80">
        <a href="#work" className="hover:opacity-100 transition-opacity">Work</a>
        <a href="#about" className="hover:opacity-100 transition-opacity">About</a>
        <a href="mailto:team@sentimento.dev" className="hover:opacity-100 transition-opacity">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="mb-40 md:mb-64">
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-7xl font-light leading-tight tracking-tight mb-8">
          Systems so efficient they <span className="opacity-50">disappear</span>.
        </h2>
        <div className="flex flex-col md:flex-row gap-8 md:items-end">
          <p className="text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed">
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
        <span className="text-xs uppercase tracking-widest opacity-40">Selected Works</span>
        <span className="text-xs uppercase tracking-widest opacity-40">01 — 06</span>
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
          <span className="text-xs font-mono text-white/30">{project.id}</span>
          <h3 className="text-2xl md:text-4xl font-light tracking-tight group-hover:opacity-70 transition-opacity duration-[800ms] custom-ease">
            {project.name}
          </h3>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <span className="hidden md:block text-xs uppercase tracking-wider text-white/40 group-hover:text-white/60 transition-colors duration-[800ms] custom-ease">
            {project.tag}
          </span>
          <div className="text-white/40 group-hover:text-white transition-colors duration-[800ms] custom-ease">
            {isActive ? <Minus size={16} /> : <Plus size={16} />}
          </div>
        </div>
      </div>
      
      <div className={`overflow-hidden transition-all duration-[800ms] custom-ease ${isActive ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-start-2 md:col-span-6">
            <p className="text-white/60 font-light leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer({ animationsEnabled, setAnimationsEnabled }) {
  return (
    <footer id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
      <div>
        <h4 className="text-sm font-medium uppercase tracking-widest mb-6 opacity-80">You Could Hire 200 People</h4>
        <p className="text-white/60 max-w-sm font-light leading-relaxed mb-6">
          But why hire 200 people to get the job done, when you can just buy what two people actually built?
        </p>
        <p className="text-xs text-white/30">
          © 2026 Sentimento Technologies Limited. Hong Kong.
        </p>
        
        {/* Preference Toggle */}
        <button 
          onClick={() => setAnimationsEnabled(!animationsEnabled)}
          className="mt-8 text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          <div className={`w-2 h-2 rounded-full ${animationsEnabled ? 'bg-green-500' : 'bg-red-500'} transition-colors duration-300`} />
          {animationsEnabled ? 'Animations On' : 'Animations Off'}
        </button>
      </div>
      <div className="flex flex-col items-start md:items-end justify-between">
        <a 
          href="mailto:team@sentimento.dev" 
          className="text-2xl md:text-3xl font-light hover:opacity-50 transition-opacity duration-300"
        >
          team@sentimento.dev
        </a>
      </div>
    </footer>
  );
}
