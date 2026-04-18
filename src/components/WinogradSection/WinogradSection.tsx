import React, { useState } from 'react';
import Reveal from '../Common/Reveal';
import DirectConvVis from './DirectConvVis';
import TransformVis from './TransformVis';
import PointwiseVis from './PointwiseVis';
import InverseVis from './InverseVis';

const WinogradSection: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Direct Conv', component: <DirectConvVis /> },
    { label: 'The Transform', component: <TransformVis /> },
    { label: 'Pointwise Multiply', component: <PointwiseVis /> },
    { label: 'Inverse Transform', component: <InverseVis /> }
  ];

  return (
    <section id="winograd" className="section">
      <Reveal className="section-number">01 — The Algorithm</Reveal>
      <Reveal>
        <h2 className="section-title">What is Winograd convolution?</h2>
      </Reveal>
      <Reveal>
        <p className="section-lead">
          Standard convolution is arithmetic-heavy. Winograd's insight: factor the computation to reuse intermediate products, slashing multiply-accumulate operations by up to 2.25×.
        </p>
      </Reveal>

      <Reveal className="stepper">
        {steps.map((s, idx) => (
          <button 
            key={idx}
            className={`step-btn ${step === idx ? 'active' : ''}`} 
            onClick={() => setStep(idx)}
          >
            {s.label}
          </button>
        ))}
      </Reveal>

      <div className="step-container">
        {steps.map((s, idx) => (
          <div key={idx} className={`step-content ${step === idx ? 'active' : ''}`}>
            {s.component}
            <div className="formula-box">
              {idx === 0 && (
                <>
                  <span className="formula-dim">Direct MACs = </span><span className="formula-highlight">Cin × Cout × H' × W' × K²</span>
                  <br /><span className="formula-dim">For K=3: each output element costs </span><span className="formula-highlight">9 MACs</span>
                </>
              )}
              {idx === 1 && (
                <>
                  <span className="formula-dim">Input Transform: </span><span className="formula-highlight">X̂ = B⊤XB</span>
                  <br /><span className="formula-dim">Weight Transform: </span><span className="formula-highlight">Ŵ = GWG⊤</span>
                </>
              )}
              {idx === 2 && (
                <>
                  <span className="formula-dim">Arithmetic reduction </span><span className="formula-highlight">ρ(m) = m² × K² / (m + K - 1)²</span>
                  <br /><span className="formula-dim">F(2,3): ρ = </span><span className="formula-highlight">4 × 9 / 16 = 2.25×</span>
                  <span className="formula-dim"> fewer multiplications</span>
                </>
              )}
              {idx === 3 && (
                <>
                  <span className="formula-dim">Full equation: </span><span className="formula-highlight">Y = A⊤(B⊤XB ⊙ GWG⊤)A</span>
                  <br /><span className="formula-dim">Produces a </span><span className="formula-highlight">2×2 output tile</span><span className="formula-dim"> from a 4×4 input tile with 3×3 kernel</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WinogradSection;
