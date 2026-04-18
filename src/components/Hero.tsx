import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-label">CORE RESEARCH · ARM CORTEX</div>
        <h1 className="hero-title" style={{ letterSpacing: '0.1em' }}>CACHE<span style={{ color: 'var(--accent)' }}>WINOGRAD</span></h1>
        <p className="hero-subtitle" style={{ maxWidth: '640px', fontWeight: 400, color: 'var(--text2)' }}>
          Why arithmetic efficiency alone fails on edge CPUs — and how <span style={{ color: 'var(--text)' }}>runtime-adaptive cache scheduling</span> closes the gap.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '40px' }}>
          <a href="#winograd" className="hero-cta" style={{ borderRadius: '4px', background: 'var(--accent)', border: 'none', color: '#fff', fontWeight: 600 }}>
            BEGIN ANALYSIS
          </a>
          <a href="#results" className="hero-cta" style={{ borderRadius: '4px', background: 'transparent', border: '1px solid var(--border2)' }}>
            VIEW METRICS
          </a>
        </div>
      </div>
      <div className="hero-scroll-hint" style={{ opacity: 0.5 }}>L0_INITIALIZATION_SUCCESSFUL</div>
    </section>
  );
};

export default Hero;
