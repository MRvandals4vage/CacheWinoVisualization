import React from 'react';

const RegimeVis: React.FC = () => {
  const configs = [
    { label: '16×32', gain: -48.72, regime: 'overhead' },
    { label: '32×16', gain: -34.87, regime: 'overhead' },
    { label: '32×32', gain: -26.79, regime: 'overhead' },
    { label: '32×64', gain: 20.22, regime: 'efficient' },
    { label: '64×32', gain: 6.44, regime: 'efficient' },
    { label: '64×64', gain: 43.12, regime: 'efficient' },
    { label: '128×128', gain: -6.52, regime: 'membound' },
  ];
  const maxAbs = Math.max(...configs.map(c => Math.abs(c.gain)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {configs.map((c, idx) => {
        const isPos = c.gain > 0;
        const color = c.regime === 'overhead' ? 'var(--accent4)' : c.regime === 'efficient' ? 'var(--accent)' : 'var(--accent3)';
        const pct = (Math.abs(c.gain) / maxAbs) * 90;

        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', width: '64px', textAlign: 'right' }}>{c.label}</div>
            <div style={{ flex: 1, height: '32px', background: 'var(--surface)', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
              <div 
                style={{ 
                  position: 'absolute', 
                  [isPos ? 'left' : 'right']: '50%', 
                  height: '100%', 
                  width: `${pct}%`, 
                  background: `${color}33`, 
                  border: `1px solid ${color}55`, 
                  borderRadius: isPos ? '0 6px 6px 0' : '6px 0 0 6px' 
                }} 
              />
              <div 
                style={{ 
                  position: 'absolute', 
                  [isPos ? 'left' : 'right']: 'calc(50% + 4px)', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '11px', 
                  color: color 
                }}
              >
                {isPos ? '+' : ''}{c.gain}%
              </div>
            </div>
            <div className={`badge ${c.regime === 'overhead' ? 'badge-red' : c.regime === 'efficient' ? 'badge-green' : 'badge-amber'}`} style={{ minWidth: '100px', justifyContent: 'center', fontSize: '10px' }}>
              {c.regime === 'overhead' ? 'overhead' : c.regime === 'efficient' ? 'efficient' : 'mem-bound'}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RegimeVis;
