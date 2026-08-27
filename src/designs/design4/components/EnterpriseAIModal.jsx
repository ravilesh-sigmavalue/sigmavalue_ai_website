import { Badge, Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import {
  TbBrain,
  TbChartHistogram,
  TbCirclesRelation,
  TbRobot,
} from "react-icons/tb";
import { useState } from "react";
import { RightPanelModalHeader } from "./RightPanelModalHeader";

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

              {/* Path 1: Top-Left Card <-> Building */}
              <path className="thunder-aura trace-coral" d="M 425 195 H 360 V 115 H 290" />
              <path
                id="thunder-track-1"
                className={`thunder-track trace-coral ${activeIndex === 0 ? "trace-active" : ""}`}
                d="M 425 195 H 360 V 115 H 290"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 425 195 H 360 V 115 H 290" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 290 115 H 360 V 195 H 425" />
              <circle className="circuit-node-dot building-node node-coral" cx="425" cy="195" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="290" cy="115" r="4.5" />

              {/* Path 2: Top-Right Card <-> Building */}
              <path className="thunder-aura trace-teal" d="M 575 195 H 640 V 115 H 710" />
              <path
                id="thunder-track-2"
                className={`thunder-track trace-teal ${activeIndex === 1 ? "trace-active" : ""}`}
                d="M 575 195 H 640 V 115 H 710"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 575 195 H 640 V 115 H 710" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 710 115 H 640 V 195 H 575" />
              <circle className="circuit-node-dot building-node node-teal" cx="575" cy="195" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="710" cy="115" r="4.5" />

              {/* Path 3: Bottom-Left Card <-> Building */}
              <path className="thunder-aura trace-teal" d="M 425 285 H 360 V 365 H 290" />
              <path
                id="thunder-track-3"
                className={`thunder-track trace-teal ${activeIndex === 2 ? "trace-active" : ""}`}
                d="M 425 285 H 360 V 365 H 290"
              />
              <path className="thunder-bolt bolt-teal bolt-forward" d="M 425 285 H 360 V 365 H 290" />
              <path className="thunder-bolt bolt-teal bolt-return" d="M 290 365 H 360 V 285 H 425" />
              <circle className="circuit-node-dot building-node node-teal" cx="425" cy="285" r="5" />
              <circle className="circuit-node-dot card-node node-teal" cx="290" cy="365" r="4.5" />

              {/* Path 4: Bottom-Right Card <-> Building */}
              <path className="thunder-aura trace-coral" d="M 575 285 H 640 V 365 H 710" />
              <path
                id="thunder-track-4"
                className={`thunder-track trace-coral ${activeIndex === 3 ? "trace-active" : ""}`}
                d="M 575 285 H 640 V 365 H 710"
              />
              <path className="thunder-bolt bolt-coral bolt-forward" d="M 575 285 H 640 V 365 H 710" />
              <path className="thunder-bolt bolt-coral bolt-return" d="M 710 365 H 640 V 285 H 575" />
              <circle className="circuit-node-dot building-node node-coral" cx="575" cy="285" r="5" />
              <circle className="circuit-node-dot card-node node-coral" cx="710" cy="365" r="4.5" />
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
