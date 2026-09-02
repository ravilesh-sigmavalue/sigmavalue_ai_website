import { Button, Modal } from "react-bootstrap";
import {
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCpu,
  FiSettings,
} from "react-icons/fi";

import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./EnterpriseAIModal.css";

const defaultCapabilities = [
  {
    number: "01",
    title: "Agentic AI & Automation",
    description:
      "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.",
    icon: FiCpu,
    tone: "teal",
  },
  {
    number: "02",
    title: "Enterprise Knowledge & Copilots",
    description:
      "Develop AI-powered knowledge systems, copilots and assistants that leverage organizational data and documents.",
    icon: FiBookOpen,
    tone: "orange",
  },
  {
    number: "03",
    title: "AI Analytics & Decision Intelligence",
    description:
      "Deliver AI-powered analytics, forecasting and decision-support solutions for smarter business decisions.",
    icon: FiBarChart2,
    tone: "orange",
  },
  {
    number: "04",
    title: "Tailored Solutions & Integration",
    description:
      "Integrate bespoke AI solutions with existing ERP, databases, CRM and other core enterprise systems.",
    icon: FiSettings,
    tone: "teal",
  },
];

function normalizeTone(value, index) {
  if (value === "teal" || value === "orange") {
    return value;
  }

  return index === 0 || index === 3
    ? "teal"
    : "orange";
}

export function EnterpriseAIModal({
  show,
  onHide,

  eyebrow = "ENTERPRISE AI PLATFORM · 02 / 07",

  title = "Intelligence built around your enterprise.",

  subtitle =
  "Connected capabilities to streamline, automate and scale operations.",

  solutions = defaultCapabilities,

  theme,

  onExplore,
}) {
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light");

  const sourceSolutions =
    Array.isArray(solutions) && solutions.length > 0
      ? solutions
      : defaultCapabilities;

  const visibleSolutions = sourceSolutions.slice(0, 4);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      keyboard
      restoreFocus
      dialogClassName="enterprise-hex-dialog d4-right-panel-dialog"
      contentClassName={`enterprise-hex-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"
        }`}
      backdropClassName="enterprise-hex-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        onHide={onHide}
        ariaLabel="Close Enterprise AI"
      />

      <Modal.Body className="enterprise-hex-body d4-right-panel-body">
        <div
          className="enterprise-hex-layout"
          aria-label="Enterprise AI capabilities"
        >
          {visibleSolutions.map((item, index) => {
            const Icon = item.icon;

            const number =
              item.number ||
              String(index + 1).padStart(2, "0");

            const itemTitle =
              item.title ||
              `Enterprise AI capability ${index + 1}`;

            const description =
              item.description ||
              item.text ||
              "";

            const tone = normalizeTone(
              item.tone || item.theme,
              index
            );

            return (
              <article
                key={`${number}-${itemTitle}-${index}`}
                className={`enterprise-hex-tile tile-${index + 1
                  } tone-${tone}`}
              >
                <div
                  className="enterprise-hex-glow"
                  aria-hidden="true"
                />

                <div className="enterprise-hex-shape">
                  <div className="enterprise-hex-inner">
                    <div className="enterprise-hex-number">
                      {number}
                    </div>

                    <div className="enterprise-hex-content">
                      <div className="enterprise-hex-title-row">
                        <span
                          className="enterprise-hex-icon"
                          aria-hidden="true"
                        >
                          {Icon && <Icon />}
                        </span>

                        <h3>{itemTitle}</h3>
                      </div>

                      {description && (
                        <p>{description}</p>
                      )}

                      <Button
                        type="button"
                        variant="link"
                        className="enterprise-hex-link"
                        aria-label={`Explore ${itemTitle}`}
                        onClick={() =>
                          onExplore?.(
                            {
                              ...item,
                              title: itemTitle,
                              description,
                              tone,
                            },
                            index
                          )
                        }
                      >
                        <span>Explore</span>
                        <FiArrowRight aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
}
