import React from 'react';

interface BarData {
  label: string;
  val: number;
}

interface PlatformBarsProps {
  data: BarData[];
  color: string;
}

const PlatformBars: React.FC<PlatformBarsProps> = ({ data, color }) => {
  return (
    <>
      {data.map((d, idx) => {
        const pct = (Math.abs(d.val) / 50) * 100;
        return (
          <div key={idx} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '13px' }}>
              <span style={{ color: 'var(--text2)' }}>{d.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color }}>{d.val > 0 ? '+' : ''}{d.val}%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--surface2)', borderRadius: '4px', position: 'relative' }}>
              <div 
                style={{ 
                  height: '100%', 
                  width: `${Math.min(pct, 100)}%`, 
                  background: d.val > 0 ? color : 'var(--accent4)', 
                  borderRadius: '4px', 
                  opacity: 0.7 
                }} 
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PlatformBars;
