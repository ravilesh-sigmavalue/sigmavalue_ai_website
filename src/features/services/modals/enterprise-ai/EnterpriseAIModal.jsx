import { Badge, Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import {
  TbBrain,
  TbChartHistogram,
  TbCirclesRelation,
  TbRobot,
} from "react-icons/tb";
import { useState } from "react";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";

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
  eyebrow = "02 / 07 · ENTERPRISE AI",
  title = "Intelligence built around your enterprise.",
  subtitle = "Connected capabilities to streamline, automate and scale operations.",
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

  const buildingImage = isLight ? "/illustrations/enterprise-ai-light.png" : "/illustrations/enterprise-ai-dark.png";

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
      contentClassName={`enterprise-ai-modal d4-right-panel-modal ${
        connected ? "enterprise-ai-modal-connected" : ""
      } ${isLight ? "light-mode" : "dark-mode"}`}
      backdropClassName="super-agent-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        onHide={onHide}
        ariaLabel="Close Enterprise AI"
      />

      {connected ? (
        <Modal.Body className="enterprise-ai-body enterprise-connected-body d4-right-panel-body">
          <div className="enterprise-connected-layout">
            <div className="enterprise-cyber-grid" aria-hidden="true" />
            <div className="enterprise-cyber-vignette" aria-hidden="true" />

            <svg
              className="enterprise-network-svg"
              viewBox="0 0 1000 480"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
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

              {/* Path 1: Card 01 (Top-Left) -> Building */}
              <path className="thunder-aura trace-coral" d="M 340 115 H 675 V 160 H 760" />
              <path
                id="thunder-track-1"
                className={`thunder-track trace-coral ${activeIndex === 0 ? "trace-active" : ""}`}
                d="M 340 115 H 675 V 160 H 760"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 340 115 H 675 V 160 H 760" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 760 160 H 675 V 115 H 340" />
              <circle className="circuit-node-dot building-node node-coral" cx="760" cy="160" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="340" cy="115" r="4.5" />

              {/* Path 2: Card 02 (Top-Right) -> Building */}
              <path className="thunder-aura trace-teal" d="M 675 115 H 720 V 200 H 760" />
              <path
                id="thunder-track-2"
                className={`thunder-track trace-teal ${activeIndex === 1 ? "trace-active" : ""}`}
                d="M 675 115 H 720 V 200 H 760"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 675 115 H 720 V 200 H 760" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 760 200 H 720 V 115 H 675" />
              <circle className="circuit-node-dot building-node node-teal" cx="760" cy="200" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="675" cy="115" r="4.5" />

              {/* Path 3: Card 03 (Bottom-Left) -> Building */}
              <path className="thunder-aura trace-teal" d="M 340 365 H 675 V 320 H 760" />
              <path
                id="thunder-track-3"
                className={`thunder-track trace-teal ${activeIndex === 2 ? "trace-active" : ""}`}
                d="M 340 365 H 675 V 320 H 760"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 340 365 H 675 V 320 H 760" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 760 320 H 675 V 365 H 340" />
              <circle className="circuit-node-dot building-node node-teal" cx="760" cy="320" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="340" cy="365" r="4.5" />

              {/* Path 4: Card 04 (Bottom-Right) -> Building */}
              <path className="thunder-aura trace-coral" d="M 675 365 H 720 V 280 H 760" />
              <path
                id="thunder-track-4"
                className={`thunder-track trace-coral ${activeIndex === 3 ? "trace-active" : ""}`}
                d="M 675 365 H 720 V 280 H 760"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 675 365 H 720 V 280 H 760" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 760 280 H 720 V 365 H 675" />
              <circle className="circuit-node-dot building-node node-coral" cx="760" cy="280" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="675" cy="365" r="4.5" />
            </svg>

            {/* Center Building Hub */}
            <div className="enterprise-building-hub">
              <div className="building-image-wrap">
                <div className="building-pedestal-glow" />
                <div className="building-pedestal-ring ring-outer" />
                <div className="building-pedestal-ring ring-mid" />
                <div className="building-pedestal-ring ring-inner" />

                <img
                  className="enterprise-hub-building"
                  src={buildingImage}
                  alt="Enterprise AI Central Headquarters"
                />
              </div>
            </div>

            {/* 4 Connected Solution Cards */}
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
                  <span className={`card-edge-node node-${cardTheme}`} />

                  <Card.Body>
                    <div className="enterprise-card-header-row">
                      <span className={`enterprise-hex-badge hex-${cardTheme}`}>
                        <span className="hex-inner">
                          <Icon />
                        </span>
                      </span>

                      <div className="enterprise-card-title-group">
                        <span className={`enterprise-card-num num-${cardTheme}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Card.Title className="enterprise-card-title">{title}</Card.Title>
                      </div>
                    </div>

                    <Card.Text className="enterprise-card-desc">{text}</Card.Text>

                    <div className="enterprise-card-action">
                      <span className="enterprise-card-action-text">Explore</span>
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
        <Modal.Body className="enterprise-ai-body d4-right-panel-body">
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
