import React from 'react';

const LoopOrderVis: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px', alignItems: 'start' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '8px' }}>LOOP ORDER</div>
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px', fontFamily: 'var(--font-mono)', fontSize: '12px', lineHeight: 2 }}>
          <span style={{ color: 'var(--accent5)' }}>for</span> tile t <span style={{ color: 'var(--accent5)' }}>in</span> T:<br />
          &nbsp;&nbsp;<span style={{ color: 'var(--accent3)' }}>X̂t</span> = B⊤XtB<br />
          &nbsp;&nbsp;{/* <span style={{ color: 'var(--text3)' }}># X̂t now in L2</span><br /> */}
          &nbsp;&nbsp;<span style={{ color: 'var(--accent5)' }}>for</span> c <span style={{ color: 'var(--accent5)' }}>in</span> Cout:<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Ŷt,c = <span style={{ color: 'var(--accent3)' }}>X̂t</span> ⊙ Ŵc<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Yt,c = A⊤Ŷt,cA
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '8px' }}>X̂t RESIDENCY — amortised across all Cout channels</div>
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {Array.from({ length: 16 }, (_, i) => (
              <div 
                key={i} 
                style={{ 
                  width: '28px', height: '28px', borderRadius: '4px', 
                  background: `rgba(110,231,183,${0.1 + i * 0.05})`, 
                  border: '1px solid rgba(110,231,183,0.3)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--accent)' 
                }}
              >
                c{i}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
            X̂t loaded <span style={{ color: 'var(--accent)' }}>once</span> into L2, then reused across all 16 output channels. 
            Cost amortised by factor of <span style={{ color: 'var(--accent)' }}>Cout = 64</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoopOrderVis;
