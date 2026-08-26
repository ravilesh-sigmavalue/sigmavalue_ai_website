import { Badge, Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight, FiX } from "react-icons/fi";
import {
  TbBrain,
  TbChartHistogram,
  TbCirclesRelation,
  TbRobot,
} from "react-icons/tb";
import { useState } from "react";

const enterpriseSolutions = [
  {
    title: "Agentic AI & Automation",
    text: "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.",
    icon: TbRobot,
    theme: "coral",
  },
  {
    title: "Enterprise Knowledge & Copilots",
    text: "Develop AI-powered knowledge systems, copilots and assistants that leverage organizational data and documents.",
    icon: TbBrain,
    theme: "teal",
  },
  {
    title: "AI Analytics & Decision Intelligence",
    text: "Deliver AI-powered analytics, forecasting and decision-support solutions for smarter business decisions.",
    icon: TbChartHistogram,
    theme: "teal",
  },
  {
    title: "Custom AI Solutions & Integration",
    text: "Develop and integrate tailored AI solutions with existing ERP, CRM, databases and enterprise systems.",
    icon: TbCirclesRelation,
    theme: "coral",
  },
];

export function EnterpriseAIModal({
  show,
  onHide,
  eyebrow = "ENTERPRISE AI",
  title = "Intelligence built around your enterprise.",
  subtitle = "For connected capabilities to streamline, automate and scale with your organization.",
  solutions = enterpriseSolutions,
  variant = "default",
  theme,
  onExplore,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const connected = variant === "connected";
  const visibleSolutions = solutions.slice(0, 4);

  // Detect current theme (light or dark)
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  const buildingImage = isLight ? "/Enterprizedlight.png" : "/Enterprizedark.png";

  const handleExplore = (solution, index) => {
    onExplore?.(solution, index);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="enterprise-ai-dialog d4-right-panel-dialog"
      contentClassName={`enterprise-ai-modal ${connected ? "enterprise-ai-modal-connected" : ""} ${isLight ? "light-mode" : "dark-mode"
        }`}
      backdropClassName="super-agent-backdrop d4-right-panel-backdrop"
    >
      {/* =========================
          HEADER
      ========================== */}
      <Modal.Header className="enterprise-ai-header">
        <div className="enterprise-header-left-badge">
          <span className="badge-text">{eyebrow}</span>
          <span className="badge-circuit-line">
            <i className="circuit-bar" />
            <i className="circuit-node" />
          </span>
        </div>

        <div className="enterprise-header-center">
          <Modal.Title className="enterprise-title-hero">
            Intelligence built around <span className="title-cyan-highlight">your enterprise.</span>
          </Modal.Title>
          <p className="enterprise-subtitle-hero">{subtitle}</p>
        </div>

        <Button
          variant="link"
          className="enterprise-ai-close"
          onClick={onHide}
          aria-label="Close Enterprise AI"
        >
          <FiX />
        </Button>
      </Modal.Header>

      {/* =========================
          CONNECTED VERSION
      ========================== */}
      {connected ? (
        <Modal.Body className="enterprise-ai-body enterprise-connected-body">
          <div className="enterprise-connected-layout">
            {/* Background Cyber Grid / PCB Canvas */}
            <div className="enterprise-cyber-grid" aria-hidden="true" />
            <div className="enterprise-cyber-vignette" aria-hidden="true" />

            {/* =========================
                CIRCUIT TRACE NETWORK SVG (Thunder Electric Lines: Building <-> Cards)
            ========================== */}
            <svg
              className="enterprise-network-svg"
              viewBox="0 0 1000 480"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Brand Gradients */}
                <linearGradient id="tealTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#43a09b" />
                  <stop offset="50%" stopColor="#5cb8b2" />
                  <stop offset="100%" stopColor="#a7f3ec" />
                </linearGradient>
                <linearGradient id="coralTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e87042" />
                  <stop offset="50%" stopColor="#f0865e" />
                  <stop offset="100%" stopColor="#ffc4ad" />
                </linearGradient>

                {/* Thunder Glow Filters */}
                <filter id="thunderGlowTeal" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="thunderGlowCoral" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ===================== PATH 1 (Top-Left: Building <-> Card 1, Coral) ===================== */}
              <path className="thunder-aura trace-coral" d="M 430 200 H 370 V 110 H 295" />
              <path
                id="thunder-track-1"
                className={`thunder-track trace-coral ${activeIndex === 0 ? "trace-active" : ""}`}
                d="M 430 200 H 370 V 110 H 295"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 430 200 H 370 V 110 H 295" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 295 110 H 370 V 200 H 430" />
              <circle className="circuit-node-dot building-node node-coral" cx="430" cy="200" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="295" cy="110" r="4.5" />

              {/* ===================== PATH 2 (Top-Right: Building <-> Card 2, Teal) ===================== */}
              <path className="thunder-aura trace-teal" d="M 570 200 H 630 V 110 H 705" />
              <path
                id="thunder-track-2"
                className={`thunder-track trace-teal ${activeIndex === 1 ? "trace-active" : ""}`}
                d="M 570 200 H 630 V 110 H 705"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 570 200 H 630 V 110 H 705" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 705 110 H 630 V 200 H 570" />
              <circle className="circuit-node-dot building-node node-teal" cx="570" cy="200" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="705" cy="110" r="4.5" />

              {/* ===================== PATH 3 (Bottom-Left: Building <-> Card 3, Teal) ===================== */}
              <path className="thunder-aura trace-teal" d="M 430 280 H 370 V 370 H 295" />
              <path
                id="thunder-track-3"
                className={`thunder-track trace-teal ${activeIndex === 2 ? "trace-active" : ""}`}
                d="M 430 280 H 370 V 370 H 295"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 430 280 H 370 V 370 H 295" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 295 370 H 370 V 280 H 430" />
              <circle className="circuit-node-dot building-node node-teal" cx="430" cy="280" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="295" cy="370" r="4.5" />

              {/* ===================== PATH 4 (Bottom-Right: Building <-> Card 4, Coral) ===================== */}
              <path className="thunder-aura trace-coral" d="M 570 280 H 630 V 370 H 705" />
              <path
                id="thunder-track-4"
                className={`thunder-track trace-coral ${activeIndex === 3 ? "trace-active" : ""}`}
                d="M 570 280 H 630 V 370 H 705"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 570 280 H 630 V 370 H 705" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 705 370 H 630 V 280 H 570" />
              <circle className="circuit-node-dot building-node node-coral" cx="570" cy="280" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="705" cy="370" r="4.5" />
            </svg>

            {/* =========================
                CENTER BUILDING HUB
            ========================== */}
            <div className="enterprise-building-hub">
              <div className="building-image-wrap">
                {/* Concentric Pedestal Glow & Rings at Base */}
                <div className="building-pedestal-glow" />
                <div className="building-pedestal-ring ring-outer" />
                <div className="building-pedestal-ring ring-mid" />
                <div className="building-pedestal-ring ring-inner" />

                {/* Building Image */}
                <img
                  className="enterprise-hub-building"
                  src={buildingImage}
                  alt="Enterprise AI Central Headquarters"
                />
              </div>
            </div>

            {/* =========================
                FOUR CONNECTED CARDS
            ========================== */}
            {visibleSolutions.map((solution, index) => {
              const {
                title,
                text,
                icon: Icon,
                theme: cardTheme = index === 0 || index === 3 ? "coral" : "teal",
              } = solution;

              return (
                <Card
                  key={solution.title}
                  className={`enterprise-solution-card enterprise-connected-card card-pos-${
                    index + 1
                  } theme-${cardTheme} ${activeIndex === index ? "solution-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  onClick={() => handleExplore(solution, index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleExplore(solution, index);
                    }
                  }}
                >
                  {/* Connection Node Indicator on Card Edge */}
                  <span className={`card-edge-node node-${cardTheme}`} />

                  <Card.Body>
                    <div className="enterprise-card-header-row">
                      <span className={`enterprise-hex-badge hex-${cardTheme}`}>
                        <span className="hex-inner">
                          <Icon />
                        </span>
                      </span>

                      <Card.Title className="enterprise-card-title">{title}</Card.Title>
                    </div>

                    <Card.Text className="enterprise-card-desc">{text}</Card.Text>

                    <div className="enterprise-card-action">
                      <span className="enterprise-card-arrow-btn">
                        <FiArrowRight />
                      </span>
                    </div>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Modal.Body>
      ) : (
        /* =========================
           DEFAULT VERSION
        ========================== */
        <Modal.Body className="enterprise-ai-body">
          <div className="enterprise-default-grid">
            {solutions.map(({ title, text, icon: Icon }, index) => (
              <Card className="enterprise-solution-card h-100" key={title}>
                <Card.Body>
                  <div className="enterprise-card-top">
                    <span>
                      <Icon />
                    </span>
                    <Badge>{String(index + 1).padStart(2, "0")}</Badge>
                  </div>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="link"
                    onClick={() => onExplore?.({ title, text, icon: Icon }, index)}
                  >
                    Explore capability
                    <FiArrowRight />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}

