import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-logo">cache<span style={{ color: 'var(--text2)' }}>winograd</span></div>
      <ul className="nav-links">
        <li><a href="#winograd">Winograd</a></li>
        <li><a href="#problem">The Problem</a></li>
        <li><a href="#solution">Our Solution</a></li>
        <li><a href="#results">Results</a></li>
      </ul>
      <div className="nav-pill">Research Explainer</div>
    </nav>
  );
};

export default Navbar;
