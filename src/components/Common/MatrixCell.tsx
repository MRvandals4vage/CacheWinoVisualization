import React from 'react';

interface MatrixCellProps {
  type: 'active' | 'input' | 'transform' | 'output' | 'weight' | 'empty' | 'highlight';
  value?: string | number;
}

const MatrixCell: React.FC<MatrixCellProps> = ({ type, value }) => {
  return (
    <div className={`matrix-cell cell-${type}`}>
      {value}
    </div>
  );
};

export default MatrixCell;
