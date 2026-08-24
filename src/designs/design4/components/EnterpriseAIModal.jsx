import { Badge, Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight, FiX } from "react-icons/fi";
import {
  TbBrain,
  TbChartHistogram,
  TbPuzzle,
  TbRobot,
} from "react-icons/tb";
import { useState } from "react";

const enterpriseSolutions = [
  {
    //id: "01",
    title: "Agentic AI & Automation",
    text: "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.",
    icon: TbRobot,
    theme: "coral",
  },
  {
    //id: "02",
    title: "Enterprise Knowledge & Copilots",
    text: "Develop AI-powered knowledge systems, copilots and assistants that leverage organizational data and documents.",
    icon: TbBrain,
    theme: "teal",
  },
  {
    //id: "03",
    title: "AI Analytics & Decision Intelligence",
    text: "Deliver AI-powered analytics, forecasting and decision-support solutions for smarter business decisions.",
    icon: TbChartHistogram,
    theme: "teal",
  },
  {
    //id: "04",
    title: "Custom AI Solutions & Integration",
    text: "Develop and integrate tailored AI applications with existing ERP, CRM, databases and enterprise systems.",
    icon: TbPuzzle,
    theme: "coral",
  },
];

export function EnterpriseAIModal({
  show,
  onHide,
  eyebrow = "ENTERPRISE AI",
  title = "Intelligence built around your enterprise.",
  subtitle = "Four connected capabilities for smarter, automated and data-driven organizations.",
  solutions = enterpriseSolutions,
  variant = "default",
  onExplore,
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const connected = variant === "connected";

  const visibleSolutions = solutions.slice(0, 4);

  const handleExplore = (solution, index) => {
    onExplore?.(solution, index);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="enterprise-ai-dialog"
      contentClassName={`enterprise-ai-modal ${connected ? "enterprise-ai-modal-connected" : ""}`}
      backdropClassName="super-agent-backdrop"
    >
      {/* =========================
          HEADER
      ========================== */}
      <Modal.Header className="enterprise-ai-header">
        <div>
          <span>{eyebrow}</span>

          <Modal.Title>
            {connected && title.includes("your enterprise")
              ? (
                <>
                  {title.split("your enterprise")[0]}
                  <em>your enterprise.</em>
                </>
              )
              : title}
          </Modal.Title>

          <p>{subtitle}</p>
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

            {/* =========================
                BACKGROUND GRID
            ========================== */}
            <div className="enterprise-grid" aria-hidden="true" />

            {/* =========================
                CONNECTION SVG
            ========================== */}
            <svg
              className="enterprise-network"
              viewBox="0 0 900 430"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* 01 → center */}
              <path
                className={`network-line network-coral ${activeIndex === 0 ? "network-active" : ""
                  }`}
                d="M 215 90 C 270 90 305 135 360 175 "
              />

              {/* 02 → center */}
              <path
                className={`network-line network-teal ${activeIndex === 1 ? "network-active" : ""
                  }`}
                d="M 685 90 C 630 90 595 135 540 175"
              />

              {/* 03 → center */}
              <path
                className={`network-line network-teal ${activeIndex === 2 ? "network-active" : ""
                  }`}
                d="M 215 340 C 270 340 305 295 360 255"
              />

              {/* 04 → center */}
              <path
                className={`network-line network-coral ${activeIndex === 3 ? "network-active" : ""
                  }`}
                d="M 685 340 C 630 340 595 295 540 255"
              />

              {/* Connection points */}
              <circle
                className="network-dot network-dot-coral"
                cx="215"
                cy="90"
                r="3"
              />

              <circle
                className="network-dot network-dot-teal"
                cx="685"
                cy="90"
                r="3"
              />

              <circle
                className="network-dot network-dot-teal"
                cx="215"
                cy="340"
                r="3"
              />

              <circle
                className="network-dot network-dot-coral"
                cx="685"
                cy="340"
                r="3"
              />
            </svg>

            {/* =========================
                CENTER AI HUB
            ========================== */}
            <div className="enterprise-ai-core">
              <span className="enterprise-ai-core-orbit enterprise-ai-core-orbit-one" />
              <span className="enterprise-ai-core-orbit enterprise-ai-core-orbit-two" />

              <span className="enterprise-ai-core-platform">
                <i className="enterprise-ai-core-cube-top" />
                <i className="enterprise-ai-core-cube-front" />
              </span>
            </div>

            {/* =========================
                FOUR DYNAMIC CARDS
            ========================== */}
            {visibleSolutions.map((solution, index) => {
              const {
                id,
                title,
                text,
                icon: Icon,
                theme = index === 0 || index === 3
                  ? "coral"
                  : "teal",
              } = solution;

              return (
                <Card
                  key={solution.id || solution.title}
                  className={`enterprise-solution-card enterprise-connected-card card-${index + 1} ${theme} ${activeIndex === index ? "solution-active" : ""
                    }`}
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
                  <Card.Body>

                    {/* Card top */}
                    <div className="enterprise-card-top">
                      <span className="enterprise-card-icon">
                        <Icon />
                      </span>

                    </div>

                    <div className="enterprise-card-heading">
                      <Card.Title>{title}</Card.Title>
                    </div>

                    {/* Description */}
                    <Card.Text>{text}</Card.Text>

                    <FiArrowRight className="enterprise-card-arrow" />
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
              <Card
                className="enterprise-solution-card h-100"
                key={title}
              >
                <Card.Body>
                  <div className="enterprise-card-top">
                    <span>
                      <Icon />
                    </span>

                    <Badge>
                      {String(index + 1).padStart(2, "0")}
                    </Badge>
                  </div>

                  <Card.Title>{title}</Card.Title>

                  <Card.Text>{text}</Card.Text>
                </Card.Body>

                <Card.Footer>
                  <Button
                    variant="link"
                    onClick={() => onExplore?.(
                      { title, text, icon: Icon },
                      index
                    )}
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
