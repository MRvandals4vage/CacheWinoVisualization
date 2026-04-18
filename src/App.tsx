import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WinogradSection from './components/WinogradSection/WinogradSection'
import ProblemSection from './components/ProblemSection/ProblemSection'
import SolutionSection from './components/SolutionSection/SolutionSection'
import ResultsSection from './components/ResultsSection/ResultsSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <hr className="divider" />
        <WinogradSection />
        <hr className="divider" />
        <ProblemSection />
        <hr className="divider" />
        <SolutionSection />
        <hr className="divider" />
        <ResultsSection />
        <hr className="divider" />
      </main>
      <Footer />
    </div>
  )
}

export default App
