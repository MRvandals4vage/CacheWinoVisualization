import React, { useState } from 'react';
import Reveal from '../Common/Reveal';
import PipelineVis from './PipelineVis';
import OptimizationVisualizer from './OptimizationVisualizer';
import TileRaceVis from './TileRaceVis';
import LoopOrderVis from './LoopOrderVis';
import ComparisonPipelines from './ComparisonPipelines';

const SolutionSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="solution" className="section">
      <Reveal className="section-number">03 — The Solution</Reveal>
      <Reveal>
        <h2 className="section-title">CacheWinograd:<br /><em>three interlocked fixes</em></h2>
      </Reveal>
      <Reveal>
        <p className="section-lead">
          The framework treats Winograd tile selection as a cache-constrained scheduling problem — solved at runtime, per layer, in nanoseconds.
        </p>
      </Reveal>

      <Reveal>
        <PipelineVis activeStage={activeStage} onStageChange={setActiveStage} />
      </Reveal>

      <Reveal>
        <OptimizationVisualizer />
      </Reveal>

      {/* Phase detail panels */}
      {activeStage === 0 && (
        <Reveal style={{ marginBottom: '32px' }}>
          <div className="canvas-wrap">
            <div className="conv-vis-title">Phase 1 — Runtime cache probing (once at initialisation)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '20px 0' }}>
              <div style={{ background: 'var(--bg3)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent5)', marginBottom: '8px' }}>READ SYSFS</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text2)' }}>/sys/devices/system/<br />cpu/cpu0/cache/<br />index<span style={{ color: 'var(--accent5)' }}>1</span>/size</div>
                <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: 'var(--accent5)' }}>CL1 = 32 KB</div>
              </div>
              <div style={{ background: 'var(--bg3)', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent5)', marginBottom: '8px' }}>READ SYSFS</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text2)' }}>/sys/devices/system/<br />cpu/cpu0/cache/<br />index<span style={{ color: 'var(--accent5)' }}>2</span>/size</div>
                <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: 'var(--accent5)' }}>CL2 = 2 MB</div>
              </div>
              <div style={{ background: 'var(--bg3)', border: '1px solid rgba(110,231,183,0.2)', borderRadius: '10px', padding: '20px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', marginBottom: '8px' }}>SCHEDULING BUDGET</div>
                <div style={{ fontSize: '13px', color: 'var(--text2)' }}>γ = 0.7<br /><span style={{ color: 'var(--text3)' }}>safety headroom</span></div>
                <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: 'var(--accent)' }}>C<sub>cache</sub> = 1.4 MB</div>
              </div>
            </div>
            <div className="tooltip-box">
              Total cost: <span style={{ color: 'var(--accent5)' }}>~20 µs</span> (two sysfs reads). Amortised over the entire inference session — this is one-time overhead that makes all subsequent per-layer decisions accurate without any offline profiling.
            </div>
          </div>
        </Reveal>
      )}

      {activeStage === 1 && (
        <Reveal style={{ marginBottom: '32px' }}>
          <div className="canvas-wrap">
            <div className="conv-vis-title">Phase 2 — Adaptive tile selection (per layer, ~5 ns)</div>
            
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '16px' }}>
                For each candidate tile size, compute extended working-set including NEON spill buffers:
              </div>
              <div className="formula-box" style={{ margin: '0 0 16px' }}>
                <span className="formula-highlight">WSext(m) = β(m+2)²Cin(1+g) + βm²Cout + 2β(m+2)²</span>
                <br /><span className="formula-dim">where β=4 (FP32), g=4 (128-bit NEON)</span>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text2)', marginBottom: '16px' }}>
                Select the tile that maximises reuse efficiency <em>subject to fitting in cache:</em>
              </div>
              <div className="formula-box" style={{ margin: 0 }}>
                <span className="formula-dim">m* = argmax</span>
                <span className="formula-highlight"> Cout·m² / (m+2)² </span>
                <br /><span className="formula-dim">subject to WSext(m) ≤ γ·Ccache</span>
              </div>
            </div>

            <TileRaceVis />

            {/* Fallback guard */}
            <div style={{ marginTop: '20px', background: 'var(--bg3)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent4)', marginBottom: '12px', letterSpacing: '.1em' }}>TWO-CONDITION FALLBACK GUARD</div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div className="badge badge-red" style={{ marginBottom: '8px' }}>Condition 1</div>
                  <div style={{ fontSize: '14px', color: 'var(--text2)' }}>R(m*) &lt; R<sub>min</sub> (0.35)<br /><span style={{ fontSize: '12px', color: 'var(--text3)' }}>Reuse efficiency too low — transform overhead not amortised</span></div>
                </div>
                <div style={{ fontSize: '20px', color: 'var(--text3)', alignSelf: 'center' }}>OR</div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div className="badge badge-red" style={{ marginBottom: '8px' }}>Condition 2</div>
                  <div style={{ fontSize: '14px', color: 'var(--text2)' }}>Cin × Cout &lt; 2048<br /><span style={{ fontSize: '12px', color: 'var(--text3)' }}>Insufficient channel depth — direct conv wins</span></div>
                </div>
                <div style={{ fontSize: '20px', color: 'var(--text3)', alignSelf: 'center' }}>→</div>
                <div style={{ alignSelf: 'center' }}>
                  <div className="badge badge-amber">Fallback to direct conv</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      )}

      {activeStage === 2 && (
        <Reveal style={{ marginBottom: '32px' }}>
          <div className="canvas-wrap">
            <div className="conv-vis-title">Phase 3 — Fused channel-outer execution</div>
            
            <ComparisonPipelines />

            <div className="formula-box">
              <span className="formula-dim">DRAM traffic eliminated per inference: </span>
              <span className="formula-highlight">ΔFuse = 2·Cin·(m+2)²·β·⌈H'/m⌉·⌈W'/m⌉</span>
              <br /><span className="formula-dim">For Cin=64, H'=W'=56, m=4: ≈ </span><span className="formula-highlight">3.44 MB eliminated per inference pass</span>
            </div>

            <div style={{ marginTop: '20px' }}>
              <div className="conv-vis-title">Channel-outer loop order — X̂t stays resident in L2</div>
              <div style={{ marginTop: '16px' }}>
                <LoopOrderVis />
              </div>
            </div>
          </div>
        </Reveal>
      )}
    </section>
  );
};

export default SolutionSection;
