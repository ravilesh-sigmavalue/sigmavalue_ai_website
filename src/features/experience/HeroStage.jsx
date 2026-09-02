import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export function HeroStage() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-stage-card hero-stage-card--home"
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 20 }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -20 }
      }
      transition={{
        duration: reduceMotion ? 0.15 : 0.5,
      }}
    >
      <div className="hero-badge">
        <span
          className="pulse-dot"
          aria-hidden="true"
        />

        <span>
          NEXT-GEN REAL ESTATE INTELLIGENCE
        </span>
      </div>

      <h1 className="hero-title">
        Autonomous Real Estate{" "}
        <span className="gradient-text">
          Valuation &amp; Analytics
        </span>
      </h1>

      <p className="hero-description">
        AI-driven feasibility agents,
        institutional-grade automated valuation models
        (AVM), and spatial market intelligence engineered
        for developers, investors, and lenders.
      </p>

      <div className="hero-actions">
        <a
          href="https://os.sigmavalue.ai/"
          target="_blank"
          rel="noreferrer"
          className="btn-primary hero-primary-action"
        >
          <span>
            Launch SigmaValue OS
          </span>

          <FiArrowUpRight
            aria-hidden="true"
          />
        </a>

        <a
          href="https://sigmavalue.ai/simulator-page"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary hero-secondary-action"
        >
          <span>
            Explore Simulator 361
          </span>
        </a>
      </div>

      <div
        className="hero-stats-grid"
        aria-label="SigmaValue platform statistics"
      >
        <div className="stat-card">
          <div className="stat-value">
            98.4%
          </div>

          <div className="stat-label">
            Valuation Precision
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            10M+
          </div>

          <div className="stat-label">
            Indexed Records
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            &lt; 3 Min
          </div>

          <div className="stat-label">
            Feasibility Run Time
          </div>
        </div>
      </div>
    </motion.div>
  );
}