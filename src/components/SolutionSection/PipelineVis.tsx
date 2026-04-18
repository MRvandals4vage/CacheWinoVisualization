import React from 'react';

interface StageProps {
  num: string;
  title: string;
  desc: string;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
}

const Stage: React.FC<StageProps> = ({ num, title, desc, colorClass, isActive, onClick }) => (
  <div className={`pipe-stage ${colorClass} ${isActive ? 'active-stage' : ''}`} onClick={onClick}>
    <div className="pipe-num">{num}</div>
    <div className="pipe-title" style={{ color: `var(--${colorClass === 'stage1' ? 'accent5' : colorClass === 'stage2' ? 'accent3' : 'accent'})` }}>{title}</div>
    <div className="pipe-desc">{desc}</div>
  </div>
);

interface PipelineVisProps {
  activeStage: number;
  onStageChange: (idx: number) => void;
}

const PipelineVis: React.FC<PipelineVisProps> = ({ activeStage, onStageChange }) => {
  const stages = [
    { num: 'PHASE 01', title: 'Cache Probing', desc: 'Read L1/L2 sizes from sysfs at init. Zero offline work.', color: 'stage1' },
    { num: 'PHASE 02', title: 'Tile Selection', desc: 'Per layer: solve constrained optimisation in O(1) time.', color: 'stage2' },
    { num: 'PHASE 03', title: 'Fused Execution', desc: 'Channel-outer fusion eliminates intermediate tensor writes.', color: 'stage3' }
  ];

  return (
    <div className="pipeline">
      {stages.map((s, idx) => (
        <Stage 
          key={idx} 
          {...s} 
          colorClass={s.color} 
          isActive={activeStage === idx} 
          onClick={() => onStageChange(idx)} 
        />
      ))}
    </div>
  );
};

export default PipelineVis;
