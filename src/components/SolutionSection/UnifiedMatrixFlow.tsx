import React, { useState, useEffect } from 'react';

const UnifiedMatrixFlow: React.FC = () => {
  const [step, setStep] = useState(0);

  // Phases of the data flow
  const phases = [
    { title: 'Input Tile X', subtitle: 'Raw spatial domain', color: 'var(--accent3)', data: [1,2,3,4] },
    { title: 'Transformed X̂', subtitle: 'Winograd domain shift', color: 'var(--accent2)', data: [1,1,1,1] },
    { title: 'Product Ŷ', subtitle: 'Pointwise Weight Mix', color: 'var(--accent2)', data: [2,2,2,2] },
    { title: 'Output Tile Y', subtitle: 'Inverse spatial domain', color: 'var(--accent)', data: [4,4] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % phases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [phases.length]);

  return (
    <div className="canvas-wrap" style={{ minHeight: '1000px', display: 'flex', flexDirection: 'column', perspective: '2000px', padding: '60px', overflow: 'hidden' }}>
      <div className="conv-vis-title" style={{ marginBottom: '80px', fontSize: '22px', textAlign: 'center', fontWeight: 600, letterSpacing: '0.1em' }}>
        Layer-by-Layer Data Transformation & Optimization
      </div>

      <div className="flow-container" style={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center', padding: '150px 0' }}>
        
        {/* THE "CACHE RESIDENT" ZONE - Intense Minimalist Container */}
        <div className="cache-residency-zone" style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '660px', 
          border: '1px solid var(--border2)', 
          background: 'rgba(5, 5, 10, 0.9)',
          backdropFilter: 'blur(30px)',
          borderRadius: '64px',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '40px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent2)', letterSpacing: '0.5em', opacity: 0.6, fontWeight: 'bold' }}>
            HW RESIDENCY BOUNDARY (SYSTEM CACHE)
          </div>
        </div>

        {/* MATRIX STACK - High Contrast Transformation */}
        <div className="matrix-stack" style={{ 
          display: 'flex', 
          gap: '100px', 
          zIndex: 1, 
          transform: 'rotateX(8deg) rotateY(-2deg)', 
          transformStyle: 'preserve-3d',
          paddingBottom: '40px'
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
                opacity: isActive ? 1 : 0.04, // Deep contrast for inactive states
                transform: isActive ? 'translateZ(80px) scale(1.15)' : 'translateZ(0) scale(1)',
                position: 'relative'
              }}>
                {/* LABEL ABOVE */}
                <div style={{ 
                  position: 'absolute', 
                  top: '-100px', 
                  width: '140px', 
                  textAlign: 'center',
                  transition: 'all 0.4s',
                  transform: isActive ? 'translateY(-15px)' : 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text3)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>{p.title}</div>
                  <div style={{ fontSize: '10px', opacity: 0.8, marginTop: '5px' }}>{p.subtitle}</div>
                </div>

                {/* THE MATRIX - Multi-color and Patterned for Clarity */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${size}, 22px)`, 
                  gap: '4px',
                  background: '#000',
                  padding: '12px',
                  borderRadius: '12px',
                  border: `2px solid ${isActive ? p.color : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isActive ? `0 0 60px ${p.color}33` : 'none',
                  position: 'relative',
                  transition: 'all 0.4s'
                }}>
                  {Array.from({ length: size * size }).map((_, j) => (
                    <div key={j} style={{ 
                      width: '22px', 
                      height: '22px', 
                      // Use phase-specific color with randomized "data" intensity
                      background: isActive ? p.color : '#080808',
                      opacity: isActive ? (0.6 + (Math.sin(j + step) * 0.4)) : 0.05,
                      borderRadius: '2px',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}></div>
                  ))}
                </div>

                {/* FLOW ARROW - Subtle red highlight */}
                {i < phases.length - 1 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: '-70px', 
                    top: '12px', 
                    fontSize: '24px', 
                    color: isActive ? 'var(--accent)' : 'var(--text3)',
                    animation: isActive ? 'pulse-arrow 1s infinite' : 'none',
                    fontWeight: '300',
                    opacity: isActive ? 0.8 : 0.1
                  }}>
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* OPTIMIZATION OVERLAYS - Clearly inside the box */}
        <div className="opt-overlay" style={{ 
          position: 'absolute', 
          bottom: '80px', 
          display: 'flex', 
          gap: '24px', 
          zIndex: 2,
          padding: '12px 36px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '40px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          <div className="badge badge-blue" style={{ fontSize: '12px', padding: '10px 20px', opacity: step >= 0 ? 1 : 0.15, transition: 'all .5s' }}>1. CACHE PROBED</div>
          <div className="badge badge-amber" style={{ fontSize: '12px', padding: '10px 20px', opacity: step >= 1 ? 1 : 0.15, transition: 'all .5s' }}>2. TILE SELECTED</div>
          <div className="badge badge-green" style={{ fontSize: '12px', padding: '10px 20px', opacity: step >= 3 ? 1 : 0.15, transition: 'all .5s' }}>3. FULLY FUSED</div>
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
