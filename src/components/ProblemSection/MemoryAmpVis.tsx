import React from 'react';

const MemoryAmpVis: React.FC = () => {
  const data = [
    { m: 2, alpha: 4.0, label: 'F(2,3)\nm=2', color: '#f87171' },
    { m: 4, alpha: 2.25, label: 'F(4,3)\nm=4', color: '#f59e0b' },
    { m: 6, alpha: 1.78, label: 'F(6,3)\nm=6', color: '#fbbf24' },
    { m: 1, alpha: 1.0, label: 'Direct\nconv', color: '#6ee7b7' }
  ];
  const maxH = 160;

  return (
    <div className="canvas-wrap">
      <div className="conv-vis-title" style={{ marginBottom: '32px' }}>
        Memory amplification αmem(m) = (m+2)² / m² — intermediate data blowup per tile
      </div>
      <div className="amp-vis">
        {data.map((d, idx) => (
          <div key={idx} className="amp-bar-group">
            <div 
              className="amp-bar" 
              style={{ 
                height: `${(d.alpha / 4.0 * maxH)}px`,
                background: `linear-gradient(180deg, ${d.color}33, ${d.color}22)`,
                border: `1px solid ${d.color}44`
              }}
            >
              <div className="amp-bar-val" style={{ color: d.color }}>{d.alpha}×</div>
            </div>
            <div className="amp-bar-label" style={{ whiteSpace: 'pre-line' }}>{d.label}</div>
          </div>
        ))}
      </div>
      <div className="tooltip-box">
        The F(2,3) scheme inflates each tile's data by <strong style={{ color: 'var(--accent4)' }}>4×</strong>. Larger tile sizes (m=6) improve arithmetic efficiency but still inflate by 1.78×. 
        On devices with 1–2 MB L2 caches, this routinely causes working sets to exceed cache capacity entirely.
      </div>
    </div>
  );
};

export default MemoryAmpVis;
