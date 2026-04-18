import React from 'react';
import MatrixGrid from '../Common/MatrixGrid';

const PointwiseVis: React.FC = () => {
  const dummy4x4 = [4,7,2,8,1,5,9,3,6,2,4,7,3,8,1,5];

  return (
    <div className="canvas-wrap">
      <div className="conv-vis-title">The magic — element-wise multiply replaces convolution</div>
      <div className="conv-layout" style={{ flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start', marginTop: '16px' }}>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="transform" />
          <div className="conv-label">X̂ (transformed input)</div>
        </div>
        <div className="conv-op" style={{ alignSelf: 'center' }}>⊙</div>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="weight" />
          <div className="conv-label">Ŵ (transformed weight)</div>
        </div>
        <div className="conv-op" style={{ alignSelf: 'center' }}>=</div>
        <div>
          <MatrixGrid cols={4} data={dummy4x4} cellType="active" />
          <div className="conv-label">Element-wise product</div>
        </div>
      </div>
      <div className="tooltip-box">
        In the Winograd domain, convolution becomes <span style={{ color: 'var(--accent)' }}>element-wise multiplication</span>. For F(2,3), this is only <span style={{ color: 'var(--accent)' }}>16 multiplications</span> vs 36 in direct conv — a <strong style={{ color: 'var(--accent)' }}>2.25× reduction</strong> in the most expensive operation.
      </div>
    </div>
  );
};

export default PointwiseVis;
