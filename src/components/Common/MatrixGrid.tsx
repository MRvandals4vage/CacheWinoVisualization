import React from 'react';
import MatrixCell from './MatrixCell';

interface MatrixGridProps {
  cols: number;
  data: (string | number)[];
  cellType: 'active' | 'input' | 'transform' | 'output' | 'weight' | 'empty' | 'highlight' | ((index: number) => 'active' | 'input' | 'transform' | 'output' | 'weight' | 'empty' | 'highlight');
  className?: string;
}

const MatrixGrid: React.FC<MatrixGridProps> = ({ cols, data, cellType, className = '' }) => {
  return (
    <div 
      className={`conv-grid ${className}`} 
      style={{ gridTemplateColumns: `repeat(${cols}, 36px)` }}
    >
      {data.map((val, idx) => (
        <MatrixCell 
          key={idx} 
          type={typeof cellType === 'function' ? cellType(idx) : cellType} 
          value={val} 
        />
      ))}
    </div>
  );
};

export default MatrixGrid;
