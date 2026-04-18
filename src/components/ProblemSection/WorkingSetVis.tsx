import React from 'react';

const WorkingSetVis: React.FC = () => {
  const l2 = 2 * 1024 * 1024;
  const budget = l2 * 0.7;
  const wsbase = 140416;
  const wsmeas = 187904;
  const wsext = 143360;

  const items = [
    { label: 'WSbase (naive model)', val: wsbase, color: 'var(--accent4)', pct: (wsbase / wsmeas) * 100 },
    { label: 'WSmeas (actual)', val: wsmeas, color: 'var(--accent3)', pct: 100 },
    { label: 'WSext (our model)', val: wsext, color: 'var(--accent)', pct: (wsext / wsmeas) * 100 },
    { label: 'Cache budget γ×CL2', val: budget, color: 'var(--accent5)', pct: (budget / wsmeas) * 100 },
  ];

  return (
    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
      <div className="conv-vis-title">Working-set vs L2 cache for (128×128) config</div>
      <div style={{ margin: '16px 0' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
              <span style={{ color: 'var(--text2)' }}>{item.label}</span>
              <span style={{ color: item.color, fontFamily: 'var(--font-mono)' }}>{(item.val / 1024).toFixed(0)} KB</span>
            </div>
            <div style={{ height: '10px', background: 'var(--surface2)', borderRadius: '5px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${Math.min(item.pct, 100)}%`, 
                  background: item.color, 
                  borderRadius: '5px', 
                  opacity: 0.7, 
                  transition: 'width .8s' 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text2)' }}>
        Naive working-set model underestimates footprint by <span style={{ color: 'var(--accent4)' }}>33.8%</span> — misses NEON spill buffers entirely, leading to cache thrash.
      </div>
    </div>
  );
};

export default WorkingSetVis;
