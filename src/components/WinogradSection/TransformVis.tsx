import React from 'react';
import MatrixGrid from '../Common/MatrixGrid';

const TransformVis: React.FC = () => {
  const dummy4x4 = [4,7,2,8,1,5,9,3,6,2,4,7,3,8,1,5];
  const weight3x3 = [1,-1,1,2,0,-2,1,-1,1];

  return (
    <div className="canvas-wrap">
      <div className="conv-vis-title">Winograd F(2,3) — transform input and weights into a new domain</div>
      <div className="conv-layout" style={{ flexWrap: 'wrap', gap: '40px' }}>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="input" />
          <div className="conv-label">Input tile X (4×4)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--accent2)' }}>B<sup style={{ fontSize: '12px' }}>⊤</sup></div>
            <div className="conv-label">Transform</div>
          </div>
          <div style={{ fontSize: '24px', color: 'var(--text3)', margin: '0 12px' }}>→</div>
        </div>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="transform" />
          <div className="conv-label">X̂ = B<sup>⊤</sup>XB (4×4)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--accent3)' }}>G</div>
            <div className="conv-label">Weight<br />transform</div>
          </div>
          <div style={{ fontSize: '24px', color: 'var(--text3)', margin: '0 12px' }}>→</div>
        </div>
        <div>
          <MatrixGrid cols={3} data={weight3x3} cellType="weight" />
          <div className="conv-label">Ŵ = GWG<sup>⊤</sup> (4×4)</div>
        </div>
      </div>
      <div className="tooltip-box">
        The transforms B, G, A are <span style={{ color: 'var(--accent2)' }}>fixed matrices</span> — computed once and reused. The F(2,3) scheme maps a 4×4 input tile and 3×3 kernel into the Winograd domain with only additions (no multiplications in the transform itself).
      </div>
    </div>
  );
};

export default TransformVis;
