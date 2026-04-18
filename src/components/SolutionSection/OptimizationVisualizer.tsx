import React, { useState, useEffect } from 'react';

const OptimizationVisualizer: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setPhase((prev) => (prev + 1) % 3);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="canvas-wrap" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <div className="conv-vis-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Optimization Workflow Visualizer</span>
        <button 
          className="vis-btn" 
          onClick={() => setIsPlaying(!isPlaying)}
          style={{ background: isPlaying ? 'rgba(248,113,113,0.1)' : 'rgba(110,231,183,0.1)', color: isPlaying ? 'var(--accent4)' : 'var(--accent)' }}
        >
          {isPlaying ? 'Stop' : 'Play Animation'}
        </button>
      </div>

      <div className="vis-controls" style={{ marginTop: '20px' }}>
        {['Probing', 'Selection', 'Fusion'].map((name, i) => (
          <button 
            key={i} 
            className={`vis-btn ${phase === i ? 'active' : ''}`}
            onClick={() => { setPhase(i); setIsPlaying(false); }}
          >
            Phase {i + 1}: {name}
          </button>
        ))}
      </div>

      <div className="visualizer-stage" style={{ flex: 1, position: 'relative', marginTop: '20px', overflow: 'hidden', border: '1px solid var(--border)', borderRadius: '12px', background: 'var(--bg2)' }}>
        
        {/* PHASE 1: CACHE PROBING ANIMATION */}
        {phase === 0 && (
          <div className="probing-vis" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
            <div className="cpu-core" style={{ width: '80px', height: '80px', background: 'var(--surface)', border: '2px solid var(--accent5)', borderRadius: '8px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent5)' }}>CPU</div>
              <div className="pulse" style={{ position: 'absolute', inset: '-4px', border: '2px solid var(--accent5)', borderRadius: '10px', animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
            </div>
            
            <div className="probing-line" style={{ flex: 0.5, height: '2px', background: 'var(--border2)', position: 'relative' }}>
              <div className="probing-signal" style={{ position: 'absolute', height: '100%', width: '20px', background: 'var(--accent5)', boxShadow: '0 0 10px var(--accent5)', animation: 'probing 2s linear infinite' }}></div>
            </div>

            <div className="cache-levels" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cache-level" style={{ width: '120px', padding: '8px', background: 'var(--surface)', border: '1px solid var(--accent5)', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)' }}>L1 CACHE</div>
                <div className="reveal-text" style={{ fontSize: '12px', color: 'var(--accent5)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>32 KB</div>
              </div>
              <div className="cache-level" style={{ width: '120px', padding: '8px', background: 'var(--surface)', border: '1px solid var(--accent5)', borderRadius: '4px', textAlign: 'center' }}>
                <div style={{ fontSize: '9px', color: 'var(--text3)' }}>L2 CACHE</div>
                <div className="reveal-text" style={{ fontSize: '12px', color: 'var(--accent5)', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>2 MB</div>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 2: TILE SELECTION ANIMATION */}
        {phase === 1 && (
          <div className="selection-vis" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <div className="matrix-bg" style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 20px)', gap: '2px' }}>
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} style={{ width: '20px', height: '20px', background: 'var(--bg3)', border: '1px solid var(--border)' }}></div>
                ))}
              </div>
              
              <div className="selection-overlay" style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <div className="testing-tile" style={{ 
                  animation: 'test-tiles 4s infinite alternate ease-in-out',
                  border: '2px solid var(--accent3)',
                  background: 'rgba(245, 158, 11, 0.1)',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                }}></div>
              </div>
            </div>
            
            <div className="budget-bar-container" style={{ width: '200px', height: '12px', background: 'var(--surface2)', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
              <div className="budget-bar-fill" style={{ 
                height: '100%', 
                background: 'var(--accent3)', 
                animation: 'fill-budget 4s infinite alternate ease-in-out' 
              }}></div>
              <div className="budget-limit" style={{ position: 'absolute', top: 0, right: '30%', bottom: 0, width: '2px', background: 'var(--accent4)', opacity: 0.5 }}></div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text3)', fontFamily: 'var(--font-mono)' }}>MAXIMIZING EFFICIENCY VS CACHE SIZE</div>
          </div>
        )}

        { phase === 2 && (
          <div className="fusion-vis" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="dram-boundary" style={{ width: '380px', height: '200px', border: '1px dashed var(--text3)', position: 'relative', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', top: '-24px', left: '12px', fontSize: '10px', color: 'var(--text3)' }}>OFF-CHIP DRAM (SLOW)</div>
              
              <div className="cache-inside" style={{ width: '240px', height: '140px', background: 'var(--surface)', border: '2px solid var(--accent)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '8px', left: '12px', fontSize: '10px', color: 'var(--accent)', fontWeight: 'bold' }}>ON-CHIP CACHE (FAST)</div>
                
                <div className="fusion-loop" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 20px' }}>
                  <div className="f-box" style={{ width: '40px', height: '40px', border: '1px solid var(--accent5)', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent5)' }}>TRANS</div>
                  <div className="f-arrow" style={{ fontSize: '14px', color: 'var(--text3)' }}>→</div>
                  <div className="f-box" style={{ width: '40px', height: '40px', border: '1px solid var(--accent)', borderRadius: '4px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>INV</div>
                  
                  <div className="data-packet" style={{ position: 'absolute', width: '12px', height: '12px', background: 'var(--accent)', borderRadius: '2px', boxShadow: '0 0 10px var(--accent)', animation: 'fused-loop 3s infinite linear' }}></div>
                </div>
              </div>

              {/* Outside packets represent DRAM hits in non-fused (optional for visual context) */}
              <div className="dram-hit" style={{ position: 'absolute', bottom: '20px', right: '40px', opacity: 0.2, textDecoration: 'line-through', fontSize: '10px', color: 'var(--accent4)' }}>DRAM WRITE</div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes probing {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes test-tiles {
          0% { width: 40px; height: 40px; }
          33% { width: 80px; height: 80px; }
          66% { width: 120px; height: 120px; border-color: var(--accent4); background: rgba(248,113,113,0.1); }
          100% { width: 80px; height: 80px; border-color: var(--accent); background: rgba(110,231,183,0.1); }
        }
        @keyframes fill-budget {
          0% { width: 25%; }
          33% { width: 50%; }
          66% { width: 95%; background: var(--accent4); }
          100% { width: 70%; background: var(--accent); }
        }
        @keyframes fused-loop {
          0% { transform: translate(-80px, 0); opacity: 0; }
          10% { opacity: 1; }
          40% { transform: translate(-30px, 0); }
          60% { transform: translate(30px, 0); }
          90% { transform: translate(80px, 0); opacity: 1; }
          100% { transform: translate(110px, 0); opacity: 0; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.4); opacity: 0; }
        }
      `}} />

      <div className="tooltip-box" style={{ marginTop: 'auto' }}>
        {phase === 0 && "Cache Probing reads the exact memory hierarchy directly from the hardware at runtime, eliminating the need for offline device profiling."}
        {phase === 1 && "Tile Selection dynamically calculates the memory footprint for each candidate tile size and locks in the largest size that fits comfortably within the L2 cache budget."}
        {phase === 2 && "Fused Execution merges the Winograd transforms with the element-wise multiplication, keeping data packets resident in high-speed cache and avoiding costly DRAM write-backs."}
      </div>
    </div>
  );
};

export default OptimizationVisualizer;
