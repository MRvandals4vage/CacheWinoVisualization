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
        
        const color = !fits ? 'rgba(255, 0, 0, 0.05)' : isOpt ? 'var(--accent)' : 'var(--accent3)';
        const textColor = !fits ? 'var(--accent)' : isOpt ? 'var(--text)' : 'var(--text2)';
        const barBg = !fits ? 'rgba(100, 100, 100, 0.1)' : isOpt ? 'var(--accent)' : 'var(--surface2)';

        return (
          <div key={m} className="tile-row-vis">
            <div className="tile-label-vis">m = {m}</div>
            <div className="tile-bar-track">
              <div 
                className={`tile-bar-fill ${isOpt ? 'selected' : ''}`}
                style={{ 
                  width: `${Math.min(pct, 100)}%`,
                  background: barBg,
                  color: isOpt ? 'white' : textColor,
                  border: isOpt ? 'none' : `1px solid ${color}`
                }}
              >
                {(ws / 1024).toFixed(0)} KB {isOpt ? ' ← SELECTED' : ''}
              </div>
            </div>
            <span 
              className="tile-tag" 
              style={{ 
                background: isOpt ? 'var(--accent)' : 'var(--bg3)',
                color: isOpt ? 'white' : textColor,
                border: `1px solid ${color}`
              }}
            >
              {!fits ? 'OUT OF BUDGET' : isOpt ? `R=${r.toFixed(2)}` : `R=${r.toFixed(2)}`}
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
