import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export function HeroStage() {
  return (
    <motion.div className="hero-stage-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
      <div className="hero-badge"><span className="pulse-dot" /><span>NEXT-GEN REAL ESTATE INTELLIGENCE</span></div>
      <h1 className="hero-title">Autonomous Real Estate <span className="gradient-text">Valuation &amp; Analytics</span></h1>
      <p className="hero-description">AI-driven feasibility agents, institutional-grade automated valuation models (AVM), and spatial market intelligence engineered for developers, investors, and lenders.</p>
      <div className="hero-actions">
        <a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer" className="btn-primary"><span>Launch SigmaValue OS</span><FiArrowUpRight /></a>
        <a href="https://sigmavalue.ai/simulator-page" target="_blank" rel="noreferrer" className="btn-secondary"><span>Explore Simulator 361</span></a>
      </div>
      <div className="hero-stats-grid">
        <div className="stat-card"><div className="stat-value">98.4%</div><div className="stat-label">Valuation Precision</div></div>
        <div className="stat-card"><div className="stat-value">10M+</div><div className="stat-label">Indexed Records</div></div>
        <div className="stat-card"><div className="stat-value">&lt; 3 Min</div><div className="stat-label">Feasibility Run Time</div></div>
      </div>
    </motion.div>
  );
}
