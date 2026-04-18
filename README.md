# CacheWinograd Visualization

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

An interactive, high-fidelity visualization of **CacheWinograd**: a research-driven framework for optimizing Winograd convolutions on memory-constrained edge CPUs.

##  Overview

Winograd convolutions are mathematically efficient but often underperform on edge devices due to the "Arithmetic Trap"—where reduction in MAC operations is negated by increased data movement and cache thrashing.

This project visualizes how **CacheWinograd** solves this by:
1. **Runtime Cache Probing**: Detecting hardware constraints at initialization.
2. **Adaptive Tile Selection**: Calculating the optimal tile size `m` that maximizes reuse while fitting in the L2 cache.
3. **Fused Execution**: Combining transformation and inverse loops to eliminate DRAM round-trips.

##  Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Industrial Minimalist Theme)
- **Typography**: [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) for academic elegance.
- **Animations**: CSS Transforms & Transitions with high-contrast Red/Silver palettes.

##  Key Features

- **Interactive Stepper**: Walk through the 4 core stages of the Winograd algorithm.
- **Unified Matrix Flow**: A 3D-perspective animation showing real-time data transformation within the "HW Residency Boundary."
- **Performance Metrics**: Comparative data across platforms like **Jetson Nano** and **Raspberry Pi 4**.
- **Mobile Responsive**: Sleek transition from a sidebar navbar to a bottom navigation pill on mobile devices.

##  Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MRvandals4vage/CacheWinoVisualization.git
   cd CacheWinoVisualization
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📐 Architecture

The project is structured into modular sections representing the research flow:
- `/components/Hero`: Project introduction.
- `/components/WinogradSection`: Algorithmic deep-dive.
- `/components/ProblemSection`: Visualizing cache thrashing.
- `/components/SolutionSection`: The CacheWinograd pipeline + Matrix Flow.
- `/components/ResultsSection`: Quantitative benchmarks.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Developed by Ishaan Upponi** 
*Visualizing the next generation of edge AI optimization.*
