import React from 'react';
import Reveal from '../Common/Reveal';
import ResultCard from './ResultCard';
import RegimeVis from './RegimeVis';
import PlatformBars from './PlatformBars';
import WSAccuracyVis from './WSAccuracyVis';

const ResultsSection: React.FC = () => {
  return (
    <section id="results" className="section">
      <Reveal className="section-number">04 — Results</Reveal>
      <Reveal>
        <h2 className="section-title">Numbers that matter</h2>
      </Reveal>
      <Reveal>
        <p className="section-lead">
          Evaluated on Jetson Nano and Raspberry Pi 4 across seven microbenchmark configurations and four CNN models. All measurements n=1000, p&lt;0.01.
        </p>
      </Reveal>

      <div className="result-grid">
        <Reveal delay={0}>
          <ResultCard 
            val="43" 
            unit="%" 
            color="accent" 
            label={<>Single-thread latency reduction<br /><span style={{ color: 'var(--text3)' }}>Jetson Nano, 64×64 config</span></>} 
          />
        </Reveal>
        <Reveal delay={100}>
          <ResultCard 
            val="33" 
            unit="%" 
            color="accent2" 
            label={<>Multi-core latency reduction<br /><span style={{ color: 'var(--text3)' }}>Jetson Nano, 4-thread</span></>} 
          />
        </Reveal>
        <Reveal delay={200}>
          <ResultCard 
            val="5.5" 
            unit="%" 
            color="accent3" 
            label={<>End-to-end energy savings<br /><span style={{ color: 'var(--text3)' }}>VGG16 on Jetson Nano</span></>} 
          />
        </Reveal>
        <Reveal delay={300}>
          <ResultCard 
            val="<0.6" 
            unit="%" 
            color="accent5" 
            label={<>Scheduling overhead<br /><span style={{ color: 'var(--text3)' }}>All models, all configs</span></>} 
          />
        </Reveal>
      </div>

      {/* Three regimes */}
      <Reveal className="canvas-wrap">
        <div className="conv-vis-title" style={{ marginBottom: '24px' }}>Three execution regimes — how configuration determines performance</div>
        <RegimeVis />
      </Reveal>

      {/* Cross platform */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '32px' }}>
        <Reveal className="reveal-full">
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent5)', borderRadius: '50%' }}></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', letterSpacing: '.05em' }}>JETSON NANO · Cortex-A57 · 2 MB L2</div>
            </div>
            <PlatformBars 
              color="var(--accent5)" 
              data={[
                { label: '32×64', val: 20.22 },
                { label: '64×32', val: 6.44 },
                { label: '64×64', val: 43.12 },
              ]} 
            />
          </div>
        </Reveal>
        <Reveal className="reveal-full">
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--accent3)', borderRadius: '50%' }}></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', letterSpacing: '.05em' }}>RASPBERRY PI 4 · Cortex-A72 · 1 MB L2</div>
            </div>
            <PlatformBars 
              color="var(--accent3)" 
              data={[
                { label: '32×64', val: 12.45 },
                { label: '64×32', val: -4.12 },
                { label: '64×64', val: 28.67 },
              ]} 
            />
          </div>
        </Reveal>
      </div>

      {/* WSext validation */}
      <Reveal className="canvas-wrap" style={{ marginTop: '32px' }}>
        <div className="conv-vis-title" style={{ marginBottom: '20px' }}>Working-set model accuracy — WSbase vs WSext vs measured</div>
        <WSAccuracyVis />
        <div className="tooltip-box" style={{ marginTop: '16px' }}>
          For the 128×128 configuration, the baseline model <span style={{ color: 'var(--accent4)' }}>underestimates</span> actual working set by 33.8% — causing cache thrash despite appearing to fit. 
          The extended model including NEON spill buffers reduces error to <span style={{ color: 'var(--accent)' }}>2.1%</span>.
        </div>
      </Reveal>
    </section>
  );
};

export default ResultsSection;
