import React from 'react';

interface ResultCardProps {
  val: string | number;
  unit: string;
  label: React.ReactNode;
  color: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ val, unit, label, color }) => {
  return (
    <div className="result-card">
      <div className="result-val" style={{ color: `var(--${color})` }}>
        {val}<span className="result-unit">{unit}</span>
      </div>
      <div className="result-label">{label}</div>
    </div>
  );
};

export default ResultCard;
