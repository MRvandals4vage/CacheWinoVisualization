import React from 'react';

const WSAccuracyVis: React.FC = () => {
  const data = [
    { config: '16×32', base: 18560, meas: 18980, ext: 18880 },
    { config: '32×32', base: 35968, meas: 36224, ext: 37120 },
    { config: '64×64', base: 70784, meas: 72192, ext: 74880 },
    { config: '128×128', base: 140416, meas: 187904, ext: 143360 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
      {data.map((d, idx) => {
        const maxVal = Math.max(d.base, d.meas, d.ext);
        const errBase = (((d.meas - d.base) / d.meas) * 100).toFixed(1);
        const errExt = ((Math.abs(d.ext - d.meas) / d.meas) * 100).toFixed(1);

        return (
          <div key={idx} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '12px' }}>{d.config}</div>
            {[
              { label: 'WSbase', val: d.base, color: 'var(--accent4)' },
              { label: 'WSmeas', val: d.meas, color: 'var(--accent3)' },
              { label: 'WSext', val: d.ext, color: 'var(--accent)' },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                  <span style={{ color: 'var(--text3)' }}>{item.label}</span>
                  <span style={{ color: item.color, fontFamily: 'var(--font-mono)' }}>{(item.val / 1024).toFixed(0)}K</span>
                </div>
                <div style={{ height: '6px', background: 'var(--surface2)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(item.val / maxVal) * 100}%`, background: item.color, opacity: .7, borderRadius: '3px' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: '10px', paddingAt: '10px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <div style={{ fontSize: '10px', color: 'var(--accent4)', fontFamily: 'var(--font-mono)' }}>base err: {errBase}%</div>
              <div style={{ fontSize: '10px', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>ext err: {errExt}%</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WSAccuracyVis;
