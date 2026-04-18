import React from 'react';
import MatrixGrid from '../Common/MatrixGrid';

const InverseVis: React.FC = () => {
  const dummy4x4 = [4,7,2,8,1,5,9,3,6,2,4,7,3,8,1,5];
  const output2x2 = [12,8,9,4];

  return (
    <div className="canvas-wrap">
      <div className="conv-vis-title">Inverse transform — map back to the output domain</div>
      <div className="conv-layout" style={{ flexWrap: 'wrap', gap: '40px' }}>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="active" />
          <div className="conv-label">Element-wise product</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '20px', color: 'var(--accent)' }}>A<sup style={{ fontSize: '12px' }}>⊤</sup></div>
            <div className="conv-label">Inverse</div>
          </div>
          <div style={{ fontSize: '24px', color: 'var(--text3)', margin: '0 12px' }}>→</div>
        </div>
        <div>
          <MatrixGrid cols={2} data={output2x2} cellType="output" />
          <div className="conv-label">Output tile Y (2×2)</div>
        </div>
      </div>
      <div className="tooltip-box">
        A<sup>⊤</sup>(X̂ ⊙ Ŵ)A maps back to the <span style={{ color: 'var(--accent)' }}>2×2 output tile</span>. 
        Total cost: transforms use only additions; <span style={{ color: 'var(--accent)' }}>only 16 multiplications</span> for 4 output values vs 36 for direct conv.
        <br /><br />
        <strong style={{ color: 'var(--text)' }}>Full pipeline:</strong> 
        <span style={{ color: 'var(--accent5)' }}>B⊤XB</span> → <span style={{ color: 'var(--accent3)' }}>GWG⊤</span> → <span style={{ color: 'var(--accent2)' }}>⊙</span> → <span style={{ color: 'var(--accent)' }}>A⊤(·)A</span>
      </div>
    </div>
  );
};

export default InverseVis;
