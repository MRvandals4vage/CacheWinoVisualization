import React from 'react';

const TileRaceVis: React.FC = () => {
  const budget = 1.4 * 1024 * 1024;
  const cin = 64, cout = 64, beta = 4, g = 4;
  const tiles = [2, 4, 6];

  return (
    <div className="tile-race">
      <div className="conv-vis-title">Tile candidates for Cin=64, Cout=64 on Jetson Nano (γCL2 = 1.4 MB)</div>
      {tiles.map((m) => {
        const base = beta * (m + 2) * (m + 2) * cin * (1 + g) + beta * m * m * cout;
        const aux = 2 * beta * (m + 2) * (m + 2);
        const ws = base + aux;
        const r = (cout * m * m) / ((m + 2) * (m + 2));
        const fits = ws <= budget;
        const pct = Math.min((ws / budget) * 100, 120);
        const isOpt = m === 6 && fits;
        
        const color = !fits ? 'rgba(248,113,113,0.3)' : isOpt ? 'rgba(110,231,183,0.3)' : 'rgba(129,140,248,0.3)';
        const textColor = !fits ? 'var(--accent4)' : isOpt ? 'var(--accent)' : 'var(--accent2)';

        return (
          <div key={m} className="tile-row-vis">
            <div className="tile-label-vis">m = {m}</div>
            <div className="tile-bar-track">
              <div 
                className={`tile-bar-fill ${isOpt ? 'selected' : ''}`}
                style={{ 
                  width: `${Math.min(pct, 100)}%`,
                  background: color,
                  color: textColor
                }}
              >
                {(ws / 1024).toFixed(0)} KB {isOpt ? ' ★ selected' : ''}
              </div>
            </div>
            <span 
              className="tile-tag" 
              style={{ 
                background: !fits ? 'rgba(248,113,113,0.1)' : isOpt ? 'rgba(110,231,183,0.1)' : 'rgba(129,140,248,0.1)',
                color: textColor
              }}
            >
              {!fits ? 'exceeds budget' : isOpt ? `R=${r.toFixed(2)} ← optimal` : `R=${r.toFixed(2)} fits`}
            </span>
          </div>
        );
      })}
      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent5)' }}>
        <div style={{ width: '40px', height: '1px', background: 'var(--accent5)' }}></div> Cache budget: 1.4 MB (γ=0.7 × 2 MB L2)
      </div>
    </div>
  );
};

export default TileRaceVis;
