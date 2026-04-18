import React, { useState, useEffect } from 'react';

const UnifiedMatrixFlow: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Phases of the data flow
  const phases = [
    { title: 'Input Tile X', subtitle: 'Raw spatial domain', color: 'var(--accent)', data: [1,2,3,4] },
    { title: 'Transformed X̂', subtitle: 'Winograd domain shift', color: 'var(--accent5)', data: [1,1,1,1] },
    { title: 'Product Ŷ', subtitle: 'Pointwise Weight Mix', color: 'var(--accent3)', data: [2,2,2,2] },
    { title: 'Output Tile Y', subtitle: 'Inverse spatial domain', color: 'var(--accent)', data: [4,4] },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; 

    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % phases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [phases.length, isMobile]);

  const handleNext = () => setStep((s) => (s + 1) % phases.length);
  const handlePrev = () => setStep((s) => (s - 1 + phases.length) % phases.length);

  return (
    <div className="canvas-wrap" style={{ 
      minHeight: isMobile ? '600px' : '1000px', 
      display: 'flex', 
      flexDirection: 'column', 
      perspective: isMobile ? 'none' : '2000px', 
      padding: isMobile ? '10px' : '60px', 
      overflow: 'hidden' 
    }}>
      <div className="conv-vis-title" style={{ marginBottom: isMobile ? '20px' : '80px', fontSize: isMobile ? '16px' : '22px', textAlign: 'center', fontWeight: 600, letterSpacing: '0.1em' }}>
        Layer-by-Layer Data Transformation
      </div>

      <div className="flow-container" style={{ 
        flex: 1, 
        display: 'flex', 
        position: 'relative', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: isMobile ? '10px 0' : '150px 0' 
      }}>
        
        <div className="cache-residency-zone" style={{ 
          position: 'absolute', 
          width: '100%', 
          height: isMobile ? '520px' : '660px', 
          border: '1px solid var(--border2)', 
          background: 'rgba(5, 5, 10, 0.9)',
          backdropFilter: 'blur(30px)',
          borderRadius: isMobile ? '24px' : '64px',
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '24px'
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '10px' : '13px', color: 'var(--accent2)', letterSpacing: '0.4em', opacity: 0.6, fontWeight: 'bold' }}>
            HW RESIDENCY BOUNDARY
          </div>
        </div>

        <div className="matrix-stack" style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '28px' : '100px', 
          zIndex: 1, 
          transform: isMobile ? 'none' : 'rotateX(8deg) rotateY(-2deg)', 
          transformStyle: 'preserve-3d',
          paddingBottom: isMobile ? '0' : '40px'
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
                opacity: isActive ? 1 : (isMobile ? 0.2 : 0.04), 
                transform: isActive ? 'translateZ(40px) scale(1.05)' : 'translateZ(0) scale(0.9)',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: isMobile ? '-18px' : '-100px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: isMobile ? '160px' : '140px', 
                  textAlign: 'center',
                  transition: 'all 0.4s',
                  color: isActive ? 'var(--accent)' : 'var(--text3)'
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: isMobile ? '9px' : '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>{p.title}</div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${size}, 20px)`, 
                  gap: '3px',
                  background: '#000',
                  padding: '8px',
                  borderRadius: '10px',
                  border: `1.5px solid ${isActive ? p.color : 'rgba(255,255,255,0.05)'}`,
                  boxShadow: isActive ? `0 0 50px ${p.color}33` : 'none',
                  position: 'relative',
                  transition: 'all 0.4s'
                }}>
                  {Array.from({ length: size * size }).map((_, j) => (
                    <div key={j} style={{ 
                      width: '20px', 
                      height: '20px', 
                      background: isActive ? p.color : '#080808',
                      opacity: isActive ? (0.6 + (Math.sin(j + step * 2) * 0.4)) : 0.05,
                      borderRadius: '2px',
                      transition: 'all 0.5s'
                    }}></div>
                  ))}
                </div>

                {i < phases.length - 1 && (
                  <div style={{ 
                    position: 'absolute', 
                    right: isMobile ? 'auto' : '-70px',
                    bottom: isMobile ? '-28px' : 'auto', 
                    top: isMobile ? 'auto' : '15px', 
                    fontSize: '20px', 
                    color: isActive ? (phases[i+1]?.color || 'var(--accent)') : 'var(--text3)',
                    transform: isMobile ? 'rotate(90deg)' : 'none',
                    animation: isActive && !isMobile ? 'pulse-arrow 1s infinite' : 'none',
                    opacity: isActive ? 0.6 : 0.05
                  }}>
                    ↓
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {isMobile && (
          <div style={{ 
            position: 'absolute', 
            bottom: '0px', 
            display: 'flex', 
            gap: '15px', 
            zIndex: 10 
          }}>
            <button onClick={handlePrev} className="hero-cta" style={{ padding: '8px 16px', fontSize: '11px', background: 'var(--surface2)', border: '1px solid var(--border2)' }}>PREV</button>
            <button onClick={handleNext} className="hero-cta" style={{ padding: '8px 16px', fontSize: '11px', background: 'var(--accent)', border: 'none' }}>NEXT PHASE</button>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="opt-overlay" style={{ 
          alignSelf: 'center',
          marginTop: '40px',
          display: 'flex', 
          gap: '24px', 
          zIndex: 2,
          padding: '12px 36px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '40px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        }}>
          <div className="badge badge-blue">1. CACHE PROBED</div>
          <div className="badge badge-amber">2. TILE SELECTED</div>
          <div className="badge badge-green">3. FULLY FUSED</div>
        </div>
      )}

      <div className="flow-explainer" style={{ 
        marginTop: isMobile ? '40px' : '60px',
        padding: isMobile ? '20px' : '30px', 
        background: 'rgba(255,255,255,0.02)', 
        borderLeft: `4px solid ${phases[step].color}`, 
        borderRadius: '12px',
        transition: 'all 0.3s'
      }}>
        <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 600, marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
          Phase {step + 1}: {phases[step].title}
        </div>
        <p style={{ fontSize: isMobile ? '13px' : '15px', color: 'var(--text2)', lineHeight: 1.7 }}>
          {step === 0 && "Current tile (m=4) is extracted from memory. Optimization ensures this fits L2 cache."}
          {step === 1 && "Spatial data is shifted into the Winograd domain. It is held resident in active cache lines."}
          {step === 2 && "Pre-transformed filter weights are mixed. No DRAM round-trips are required."}
          {step === 3 && "The final 2×2 output is extracted at cache speed before a final write-back."}
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
