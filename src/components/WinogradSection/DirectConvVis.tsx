import React from 'react';
import MatrixGrid from '../Common/MatrixGrid';

const DirectConvVis: React.FC = () => {
  const inputData = [3,1,4,1,5,9,2,6,5,3,5,8,9,7,9,3,2,3,8,4,6,2,6,4,3];
  const weightData = [1,0,-1,1,0,-1,1,0,-1];
  const outputData = [12,8,3,7,9,4,2,11,6,8,5,9,3,7,4,8];

  const getCellType = (i: number) => {
    const row = Math.floor(i / 5);
    const col = i % 5;
    return (row >= 1 && row <= 3 && col >= 1 && col <= 3) ? 'active' : 'input';
  };

  return (
    <div className="canvas-wrap">
      <div className="conv-vis-title">Direct convolution — sliding a 3×3 kernel over a 5×5 input</div>
      <div className="conv-layout">
        <div>
          <MatrixGrid cols={5} data={inputData} cellType={getCellType} className="g5" />
          <div className="conv-label">Input (5×5)</div>
        </div>
        <div className="conv-op">*</div>
        <div>
          <MatrixGrid cols={3} data={weightData} cellType="weight" className="g3" />
          <div className="conv-label">Kernel (3×3)<br />9 MACs/output</div>
        </div>
        <div className="conv-op">=</div>
        <div>
          <MatrixGrid cols={4} data={outputData} cellType="output" className="g4" />
          <div className="conv-label">Output (3×3)<br />9 × 9 = 81 MACs</div>
        </div>
      </div>
      <div className="tooltip-box">
        For every output pixel, the kernel slides across the input performing <span style={{ color: 'var(--accent)' }}>9 multiplications + 8 additions = 17 MACs</span>. 
        For a 3×3 kernel producing a 3×3 output tile: <strong style={{ color: 'var(--accent4)' }}>9 × 9 = 81 multiply-accumulate operations.</strong>
      </div>
    </div>
  );
};

export default DirectConvVis;
