import React, { useState, useEffect } from 'react';

const UnifiedMatrixFlow: React.FC = () => {
  const [step, setStep] = useState(0);

  // Phases of the data flow
  const phases = [
    { title: 'Input Tile X', subtitle: 'Raw spatial domain (4×4)', color: 'var(--accent5)' },
    { title: 'Transformed X̂', subtitle: 'Winograd domain shift (4×4)', color: 'var(--accent2)' },
    { title: 'Product Ŷ', subtitle: 'Pointwise Weight Mix (4×4)', color: 'var(--accent3)' },
    { title: 'Output Tile Y', subtitle: 'Inverse spatial domain (2×2)', color: 'var(--accent)' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % phases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [phases.length]);

  return (
    <div className="canvas-wrap" style={{ minHeight: '520px', display: 'flex', flexDirection: 'column', perspective: '1000px' }}>
      <div className="conv-vis-title" style={{ marginBottom: '30px' }}>
        Layer-by-Layer Data Transformation & Optimization
      </div>

      <div className="flow-container" style={{ flex: 1, display: 'flex', position: 'relative', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* THE "CACHE RESIDENT" ZONE */}
        <div className="cache-residency-zone" style={{ 
          position: 'absolute', 
          width: '85%', 
          height: '240px', 
          border: '2px solid rgba(110, 231, 183, 0.2)', 
          background: 'rgba(110, 231, 183, 0.03)',
          borderRadius: '24px',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '12px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.2em' }}>
            ON-CHIP CACHE RESIDENCY BOUNDARY
          </div>
          <div style={{ position: 'absolute', bottom: '-40px', color: 'var(--text3)', fontSize: '11px', fontStyle: 'italic' }}>
            Fusion keeps all 4 layers inside this boundary, avoiding DRAM round-trips.
          </div>
        </div>

        {/* MATRIX STACK */}
        <div className="matrix-stack" style={{ display: 'flex', gap: '40px', zIndex: 1, transform: 'rotateX(20deg) rotateY(-10deg)', transformStyle: 'preserve-3d' }}>
          
          {phases.map((p, i) => {
            const isActive = step === i;
            const size = p.title.includes('2×2') ? 2 : 4;
            
            return (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: isActive ? 1 : 0.4,
                transform: isActive ? 'translateZ(50px) scale(1.1)' : 'translateZ(0) scale(1)',
              }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${size}, 24px)`, 
                  gap: '4px',
                  background: 'var(--surface2)',
                  padding: '8px',
                  borderRadius: '8px',
                  border: `2px solid ${isActive ? p.color : 'transparent'}`,
                  boxShadow: isActive ? `0 0 30px ${p.color}44` : 'none'
                }}>
                  {Array.from({ length: size * size }).map((_, j) => (
                    <div key={j} style={{ 
                      width: '24px', 
                      height: '24px', 
                      background: isActive ? p.color : 'var(--bg3)',
                      opacity: isActive ? (0.5 + Math.random() * 0.5) : 0.2,
                      borderRadius: '2px',
                      transition: 'all 0.4s'
                    }}></div>
                  ))}
                </div>
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <div style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    color: isActive ? p.color : 'var(--text3)' 
                  }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '9px', color: 'var(--text3)', maxWidth: '100px' }}>
                    {p.subtitle}
                  </div>
                </div>

                {/* FLOW ARROW */}
                {i < phases.length - 1 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '-30px', 
                    top: '40px', 
                    fontSize: '20px', 
                    color: isActive ? phases[i+1].color : 'var(--border2)',
                    animation: isActive ? 'pulse-arrow 1s infinite' : 'none'
                  }}>
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* OPTIMIZATION OVERLAYS */}
        <div className="opt-overlay" style={{ position: 'absolute', bottom: '60px', left: '40px', display: 'flex', gap: '20px' }}>
          <div className={`opt-tag ${step >= 0 ? 'active' : ''}`} style={{ 
            padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--accent5)', 
            background: 'rgba(56, 189, 248, 0.05)', fontSize: '11px', fontFamily: 'var(--font-mono)',
            color: 'var(--accent5)', transition: 'all 0.5s'
          }}>
            1. CACHE PROBED
          </div>
          <div className={`opt-tag ${step >= 1 ? 'active' : ''}`} style={{ 
            padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--accent3)', 
            background: 'rgba(245, 158, 11, 0.05)', fontSize: '11px', fontFamily: 'var(--font-mono)',
            color: 'var(--accent3)', opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.5s'
          }}>
            2. TILE SELECTED (m=4)
          </div>
          <div className={`opt-tag ${step >= 3 ? 'active' : ''}`} style={{ 
            padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--accent)', 
            background: 'rgba(110, 231, 183, 0.05)', fontSize: '11px', fontFamily: 'var(--font-mono)',
            color: 'var(--accent)', opacity: step >= 3 ? 1 : 0.2, transition: 'all 0.5s'
          }}>
            3. FULLY FUSED
          </div>
        </div>

      </div>

      {/* EXPLAINER TEXT */}
      <div className="flow-explainer" style={{ 
        marginTop: '40px', 
        padding: '20px', 
        background: 'var(--surface)', 
        borderLeft: `4px solid ${phases[step].color}`, 
        borderRadius: '0 12px 12px 0',
        transition: 'all 0.3s'
      }}>
        <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 600, marginBottom: '4px' }}>
          Phase {step + 1}: {phases[step].title}
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: 1.5 }}>
          {step === 0 && "Current tile m=4 is extracted. Optimization Phase 2 already ensured this tile width fits precisely within the CPU's L2 cache budget."}
          {step === 1 && "The spatial data is projected into the Winograd domain. Instead of writing this expanded 4×4 data back to DRAM (slow), it stays active in L1 cache."}
          {step === 2 && "Pre-transformed weights mixed with input. Because the tile was 'selected' based on probed hardware limits, no spill-over to DRAM occurs."}
          {step === 3 && "The final 2×2 result is extracted and finally written back. Only 1 write to memory vs 4 writes in the naive implementation."}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-arrow {
          0%, 100% { transform: translateX(0); opacity: 0.5; }
          50% { transform: translateX(10px); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default UnifiedMatrixFlow;
