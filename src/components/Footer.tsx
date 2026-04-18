import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div style={{ marginBottom: '12px', fontFamily: 'var(--font-display)', fontSize: '22px', color: 'var(--text2)' }}>CacheWinograd</div>
      <div>Cache-Aware Adaptive Tile Scheduling for Winograd on Edge CPUs</div>
      <div style={{ marginTop: '8px', color: 'var(--text3)' }}>Research explainer · Visual deep dive · EMSOFT 2026 submission</div>
    </footer>
  );
};

export default Footer;
