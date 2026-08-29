import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiAward,
  FiHome,
  FiPlusCircle,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const KEY_BENEFITS = [
  {
    id: "benefit-1",
    title: "Benefit 1",
    desc: "Make smarter real estate decisions with precise valuations and actionable insights.",
    icon: FiTrendingUp,
    accent: "#e87042",
    glow: "rgba(232, 112, 66, 0.35)",
  },
  {
    id: "benefit-2",
    title: "Benefit 2",
    desc: "Save time and reduce risk with automated analysis and data-driven accuracy.",
    icon: FiTarget,
    accent: "#43a09b",
    glow: "rgba(67, 160, 155, 0.4)",
    highlight: true,
  },
  {
    id: "benefit-3",
    title: "Benefit 3",
    desc: "Stay ahead of the market with real-time intelligence and predictive analytics.",
    icon: FiShield,
    accent: "#e87042",
    glow: "rgba(232, 112, 66, 0.35)",
  },
];

const WHAT_WE_OFFER = [
  {
    id: "offer-dept",
    title: "Department wise Agents",
    desc: "Empower every department with specialized AI agents for focused outcomes.",
    icon: FiUsers,
    accent: "#43a09b",
    glow: "rgba(67, 160, 155, 0.35)",
    ctaHref: "https://sigmavalue.ai/contact/?page=department-agents",
  },
  {
    id: "offer-super",
    title: "Super Agent",
    desc: "One agent to oversee, orchestrate, and maximize performance across all tasks.",
    icon: FiAward,
    accent: "#e87042",
    glow: "rgba(232, 112, 66, 0.35)",
    ctaHref: "https://sigmavalue.ai/contact/?page=super-agent",
  },
  {
    id: "offer-create",
    title: "Create your own agent",
    desc: "Build custom agents tailored to your unique business needs in minutes.",
    icon: FiPlusCircle,
    accent: "#43a09b",
    glow: "rgba(67, 160, 155, 0.35)",
    ctaHref: "https://sigmavalue.ai/contact/?page=custom-agent-builder",
  },
  {
    id: "offer-rent",
    title: "Rent agent",
    desc: "Specialized agent to analyze rental markets and optimize rental strategies.",
    icon: FiHome,
    accent: "#e87042",
    glow: "rgba(232, 112, 66, 0.35)",
    ctaHref: "https://sigmavalue.ai/contact/?page=rent-agent",
  },
];

export function PersonaKeyBenefitsAndOfferings({ onRequestDemo }) {
  return (
    <div className="persona-extra-sections">
      {/* ══════════════════════════════════════════════════════════════
          1. KEY BENEFITS SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className="persona-benefits-block" aria-labelledby="persona-key-benefits-title">
        <div className="persona-section-header">
          <span className="persona-header-line" />
          <span className="persona-header-dot" />
          <h3 id="persona-key-benefits-title" className="persona-header-title">KEY BENEFITS</h3>
          <span className="persona-header-dot" />
          <span className="persona-header-line" />
        </div>

        <div className="persona-benefits-grid">
          {KEY_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                className={`persona-benefit-card ${benefit.highlight ? "highlighted" : ""}`}
                style={{
                  "--benefit-accent": benefit.accent,
                  "--benefit-glow": benefit.glow,
                }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div className="persona-benefit-icon-box">
                  <Icon className="persona-benefit-icon" />
                </div>
                <h5 className="persona-benefit-title">{benefit.title}</h5>
                <p className="persona-benefit-desc">{benefit.desc}</p>
                <div className="persona-benefit-pill-bar" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. WHAT WE OFFER SECTION
          ══════════════════════════════════════════════════════════════ */}
      <div className="persona-offerings-block">
        <div className="persona-section-header">
          <span className="persona-header-line" />
          <span className="persona-header-dot" />
          <h4 className="persona-header-title">WHAT WE OFFER</h4>
          <span className="persona-header-dot" />
          <span className="persona-header-line" />
        </div>

        <div className="persona-offer-grid">
          {WHAT_WE_OFFER.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.id}
                href={item.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="persona-offer-card"
                style={{
                  "--offer-accent": item.accent,
                  "--offer-glow": item.glow,
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
              >
                <div className="persona-offer-icon-box">
                  <Icon className="persona-offer-icon" />
                </div>
                <h5 className="persona-offer-title">{item.title}</h5>
                <p className="persona-offer-desc">{item.desc}</p>
                <div className="persona-offer-action-btn" aria-label={`Explore ${item.title}`}>
                  <FiArrowRight />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. BOTTOM ENGAGEMENT BAR
          ══════════════════════════════════════════════════════════════ */}
      <div className="persona-bottom-engagement-bar">
        <a
          href="https://sigmavalue.ai/contact/?page=persona-demo-cta"
          target="_blank"
          rel="noreferrer"
          className="persona-demo-btn"
          onClick={onRequestDemo}
        >
          <span>Request a Demo</span>
          <FiArrowUpRight />
        </a>

        <a
          href="https://os.sigmavalue.ai/"
          target="_blank"
          rel="noreferrer"
          className="persona-ask-ai-pill"
        >
          <span className="ask-ai-dot" />
          <span>Ask SigmaValue AI</span>
        </a>
      </div>
    </div>
  );
}
