import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-label">Visual Deep Dive</div>
        <h1 className="hero-title">Cache<em>Winograd</em></h1>
        <p className="hero-subtitle">
          Why arithmetic efficiency alone fails on edge CPUs — and how runtime-adaptive cache scheduling closes the gap.
        </p>
        <a href="#winograd" className="hero-cta">
          Start exploring
          <span className="arrow">↓</span>
        </a>
      </div>
      <div className="hero-scroll-hint">scroll to explore</div>
    </section>
  );
};

export default Hero;
