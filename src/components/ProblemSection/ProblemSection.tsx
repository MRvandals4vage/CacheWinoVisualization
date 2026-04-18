import React from 'react';
import Reveal from '../Common/Reveal';
import ProblemCard from './ProblemCard';
import MemoryAmpVis from './MemoryAmpVis';
import WorkingSetVis from './WorkingSetVis';

const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="section">
      <Reveal className="section-number">02 — The Problem</Reveal>
      <Reveal>
        <h2 className="section-title">So why doesn't it work<br /><em style={{ fontStyle: 'italic', color: 'var(--accent4)' }}>in practice?</em></h2>
      </Reveal>
      <Reveal>
        <p className="section-lead">
          The arithmetic wins are real. But edge CPUs are <em>not</em> compute-bound — they're memory-bound. And Winograd quietly makes the memory problem worse.
        </p>
      </Reveal>

      <div className="problem-cards">
        <Reveal delay={0}>
          <ProblemCard 
            icon="📦" 
            title="Data inflation" 
            description={<>Every input tile expands from m² to (m+2)² elements. For F(2,3), that's a <strong style={{ color: 'var(--accent4)' }}>4× intermediate blowup</strong> in working-set size.</>}
          />
        </Reveal>
        <Reveal delay={100}>
          <ProblemCard 
            icon="🗃️" 
            title="Cache pressure" 
            description={<>Inflated intermediate tensors spill out of L1/L2 onto DRAM. On a Jetson Nano with 2 MB L2, this happens <strong style={{ color: 'var(--accent4)' }}>constantly</strong>.</>}
          />
        </Reveal>
        <Reveal delay={200}>
          <ProblemCard 
            icon="⚡" 
            title="Bandwidth cost" 
            description={<>DRAM reads are <strong style={{ color: 'var(--accent4)' }}>100× slower</strong> than L1 cache. Every cache miss erases the arithmetic gain Winograd promised.</>}
          />
        </Reveal>
      </div>

      <Reveal>
        <MemoryAmpVis />
      </Reveal>

      <Reveal className="labeled-divider">
        <div className="labeled-divider-line"></div>
        <div className="labeled-divider-text">The real culprit: static scheduling</div>
        <div className="labeled-divider-line reverse"></div>
      </Reveal>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '48px' }}>
        <Reveal>
          <div className="problem-card" style={{ cursor: 'default' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', marginBottom: '16px', letterSpacing: '.1em', textTransform: 'uppercase' }}>Current approaches</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                "Tile size chosen at compile time, never updated",
                "No explicit model of working-set vs cache capacity",
                "A schedule tuned on one device fails on another",
                "AutoTVM requires hours of on-device search per operator",
                "No per-layer adaptation — one size fits all"
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                  <span className="cross">✗</span>
                  <span><strong>{i === 0 ? 'Tile size' : ''}</strong> {text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <WorkingSetVis />
        </Reveal>
      </div>

      <Reveal className="canvas-wrap" style={{ marginTop: '48px' }}>
        <div className="conv-vis-title">State of the art — what's missing</div>
        <table className="compare-table">
          <thead>
            <tr>
              <th>System</th>
              <th>Winograd</th>
              <th>Runtime adaptive</th>
              <th>Cache modelled</th>
              <th>No offline tuning</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'TVM AutoTVM', w: '~', ra: '✗', cm: '✗', ot: '✗', cls: 'partial' },
              { name: 'ARM Compute Library', w: '✓', ra: '✗', cm: '✗', ot: '✓', cls: 'check' },
              { name: 'Lavin & Gray (2016)', w: '✓', ra: '✗', cm: '✗', ot: '✓', cls: 'check' },
              { name: 'Tiramisu', w: '✗', ra: '✗', cm: '~', ot: '✗', cls: 'partial' }
            ].map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td><span className={row.w === '✓' ? 'check' : row.w === '✗' ? 'cross' : 'partial'}>{row.w}</span></td>
                <td><span className={row.ra === '✓' ? 'check' : 'cross'}>{row.ra}</span></td>
                <td><span className={row.cm === '✓' ? 'check' : row.cm === '✗' ? 'cross' : 'partial'}>{row.cm}</span></td>
                <td><span className={row.ot === '✓' ? 'check' : 'cross'}>{row.ot}</span></td>
              </tr>
            ))}
            <tr className="highlight-row">
              <td><strong>CacheWinograd (ours)</strong></td>
              <td><span className="check">✓</span></td>
              <td><span className="check">✓</span></td>
              <td><span className="check">✓</span></td>
              <td><span className="check">✓</span></td>
            </tr>
          </tbody>
        </table>
      </Reveal>
    </section>
  );
};

export default ProblemSection;
