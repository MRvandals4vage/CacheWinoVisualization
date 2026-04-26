import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-logo">
        <div style={{ minWidth: '10px', height: '10px', background: 'var(--accent)', borderRadius: '50%' }}></div>
        <span>CACHE<span style={{ color: 'var(--accent3)', fontWeight: 300 }}>WINOGRAD</span></span>
      </div>
      <ul className="nav-links">
        <li><a href="#winograd"><div className="nav-dot"></div><span>ALGORITHM</span></a></li>
        <li><a href="#problem"><div className="nav-dot"></div><span>DIAGNOSTICS</span></a></li>
        <li><a href="#solution"><div className="nav-dot"></div><span>OPTIMIZATION</span></a></li>
        <li><a href="#results"><div className="nav-dot"></div><span>METRICS</span></a></li>
        <li><a href="#dip-playground"><div className="nav-dot"></div><span>DIP LAB</span></a></li>
      </ul>
      <div className="nav-pill">REV 2026.04</div>
    </nav>
  );
};

export default Navbar;
