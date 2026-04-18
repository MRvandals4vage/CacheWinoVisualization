import React from 'react';

interface StageData {
  label: string;
  sub: string;
  color: string;
  dram?: boolean;
}

const PipelineStage: React.FC<StageData> = ({ label, sub, color, dram }) => (
  <div 
    style={{ 
      padding: '10px 14px', borderRadius: '8px', marginBottom: '6px', 
      border: '1px solid', fontSize: '13px', 
      background: dram ? 'rgba(248,113,113,0.05)' : `${color}11`, 
      borderColor: dram ? 'rgba(248,113,113,0.2)' : `${color}33` 
    }}
  >
    <div style={{ fontWeight: 500, color: dram ? 'var(--accent4)' : color }}>{label}</div>
    <div style={{ fontSize: '11px', color: 'var(--text3)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{sub}</div>
  </div>
);

const ComparisonPipelines: React.FC = () => {
  const naiveStages: StageData[] = [
    { label: 'Input transform', sub: 'B⊤XB', color: 'var(--accent2)' },
    { label: 'Intermediate tensor', sub: 'Write to DRAM →', color: 'var(--accent)', dram: true },
    { label: 'Weight transform', sub: 'GWG⊤', color: 'var(--accent3)' },
    { label: 'Intermediate tensor', sub: 'Write to DRAM →', color: 'var(--accent)', dram: true },
    { label: 'Element-wise multiply', sub: 'X̂ ⊙ Ŵ', color: 'var(--accent2)' },
    { label: 'Intermediate tensor', sub: 'Write to DRAM →', color: 'var(--accent)', dram: true },
    { label: 'Inverse transform', sub: 'A⊤(·)A', color: 'var(--accent2)' },
  ];

  const fusedStages: StageData[] = [
    { label: 'Input transform', sub: 'B⊤XB → L2 resident', color: 'var(--accent5)' },
    { label: 'Weight transform', sub: 'GWG⊤ (precomputed)', color: 'var(--accent2)' },
    { label: 'Fused: multiply + inverse', sub: 'All output channels → Y', color: 'var(--accent)' },
  ];

  const renderPipe = (stages: StageData[]) => (
    <>
      {stages.map((s, i) => (
        <React.Fragment key={i}>
          <PipelineStage {...s} />
          {i < stages.length - 1 && (
            <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: '14px', marginBottom: '4px' }}>↓</div>
          )}
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
      <div>
        <div className="badge badge-red" style={{ marginBottom: '16px', fontWeight: 'bold' }}>NAIVE (DRAM-BOUND)</div>
        <div>{renderPipe(naiveStages)}</div>
      </div>
      <div>
        <div className="badge badge-blue" style={{ marginBottom: '16px', fontWeight: 'bold', border: '1px solid var(--accent)' }}>FUSED (CACHE-RESIDENT)</div>
        <div>{renderPipe(fusedStages)}</div>
      </div>
    </div>
  );
};

export default ComparisonPipelines;
