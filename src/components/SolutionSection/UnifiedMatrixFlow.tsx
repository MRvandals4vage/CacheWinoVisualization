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
    <div className="canvas-wrap" style={{ minHeight: '800px', display: 'flex', flexDirection: 'column', perspective: '1500px', padding: '40px' }}>
      <div className="conv-vis-title" style={{ marginBottom: '40px', fontSize: '20px' }}>
        Layer-by-Layer Data Transformation & Optimization
      </div>

      <div className="flow-container" style={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', padding: '60px 0', margin: '20px 0' }}>
        
        {/* THE "CACHE RESIDENT" ZONE - Much bigger now */}
        <div className="cache-residency-zone" style={{ 
          position: 'absolute', 
          width: '95%', 
          height: '450px', 
          border: '1px solid rgba(110, 231, 183, 0.12)', 
          background: 'rgba(10, 10, 15, 0.5)',
          backdropFilter: 'blur(8px)',
          borderRadius: '32px',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '24px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.3em', opacity: 0.5, fontWeight: 'bold' }}>
            ON-CHIP CACHE RESIDENCY BOUNDARY
          </div>
        </div>

        {/* MATRIX STACK - Massive gap to prevent overlap */}
        <div className="matrix-stack" style={{ 
          display: 'flex', 
          gap: '180px', 
          zIndex: 1, 
          transform: 'rotateX(15deg) rotateY(-5deg)', 
          transformStyle: 'preserve-3d',
          paddingBottom: '20px'
        }}>
          
          {phases.map((p, i) => {
            const isActive = step === i;
            const size = p.title.includes('2×2') ? 2 : 4;
            
            return (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                opacity: isActive ? 1 : 0.2,
                transform: isActive ? 'translateZ(80px) scale(1.15)' : 'translateZ(0) scale(1)',
                position: 'relative'
              }}>
                {/* LABEL ABOVE - Higher up to avoid matrix */}
                <div style={{ 
                  position: 'absolute', 
                  top: '-100px', 
                  width: '160px', 
                  textAlign: 'center',
                  transition: 'all 0.4s',
                  transform: isActive ? 'translateY(-10px)' : 'none',
                  color: isActive ? p.color : 'var(--text3)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.title}</div>
                  <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', fontStyle: 'italic' }}>{p.subtitle}</div>
                </div>

                {/* THE MATRIX */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${size}, 22px)`, 
                  gap: '4px',
                  background: 'var(--bg3)',
                  padding: '10px',
                  borderRadius: '10px',
                  border: `2px solid ${isActive ? p.color : 'var(--border)'}`,
                  boxShadow: isActive ? `0 0 50px ${p.color}33` : 'none',
                  position: 'relative'
                }}>
                  {Array.from({ length: size * size }).map((_, j) => (
                    <div key={j} style={{ 
                      width: '22px', 
                      height: '22px', 
                      background: isActive ? p.color : 'var(--surface2)',
                      opacity: isActive ? (0.4 + Math.random() * 0.6) : 0.1,
                      borderRadius: '3px'
                    }}></div>
                  ))}
                </div>

                {/* FLOW ARROW - Centered between gaps */}
                {i < phases.length - 1 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '-110px', 
                    top: '15px', 
                    fontSize: '24px', 
                    color: isActive ? phases[i+1].color : 'var(--border2)',
                    animation: isActive ? 'pulse-arrow 1s infinite' : 'none',
                    fontWeight: 'bold',
                    opacity: 0.5
                  }}>
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* OPTIMIZATION OVERLAYS - Moved even further down */}
        <div className="opt-overlay" style={{ 
          position: 'absolute', 
          bottom: '-30px', 
          display: 'flex', 
          gap: '24px', 
          zIndex: 2,
        }}>
          <div className="badge badge-blue" style={{ padding: '10px 20px', fontSize: '12px', opacity: step >= 0 ? 1 : 0.2, transition: 'all .5s', transform: step >= 0 ? 'scale(1.05)' : 'scale(1)' }}>1. CACHE PROBED</div>
          <div className="badge badge-amber" style={{ padding: '10px 20px', fontSize: '12px', opacity: step >= 1 ? 1 : 0.2, transition: 'all .5s', transform: step >= 1 ? 'scale(1.05)' : 'scale(1)' }}>2. TILE SELECTED</div>
          <div className="badge badge-green" style={{ padding: '10px 20px', fontSize: '12px', opacity: step >= 3 ? 1 : 0.2, transition: 'all .5s', transform: step >= 3 ? 'scale(1.05)' : 'scale(1)' }}>3. FULLY FUSED</div>
        </div>

      </div>

      <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '12px', fontStyle: 'italic', margin: '40px 0 20px', opacity: 0.7 }}>
        The fusion optimization eliminates DRAM traffic by chaining all four layers within the Residency Boundary.
      </div>

      {/* EXPLAINER TEXT */}
      <div className="flow-explainer" style={{ 
        padding: '30px', 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${phases[step].color}`, 
        borderRadius: '12px',
        transition: 'all 0.3s',
        minHeight: '120px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Transformation Phase {step + 1}: {phases[step].title}
        </div>
        <p style={{ fontSize: '15px', color: 'var(--text2)', lineHeight: 1.7 }}>
          {step === 0 && "Current tile (m=4) is extracted from memory. Phase 2 optimization ensures this size perfectly fits the L2 cache, eliminating capacity misses."}
          {step === 1 && "Spatial data is shifted into the Winograd domain. Instead of spilling this inflated 4×4 data back to DRAM, it is held resident in active cache lines."}
          {step === 2 && "Pre-transformed filter weights are mixed with input tiles. Since the working-set was pre-calculated to fit, no DRAM round-trips are required."}
          {step === 3 && "The final 2×2 output result is extracted. The entire process happened 'at cache speed' before a single final write-back to main memory."}
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
