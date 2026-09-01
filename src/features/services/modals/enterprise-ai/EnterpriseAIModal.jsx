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

  const visibleSolutions = solutions.slice(0, 4);

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
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
        <div className="enterprise-hex-layout">
          {visibleSolutions.map((item, index) => {
            const Icon = item.icon;

            const number =
              item.number || String(index + 1).padStart(2, "0");

            const description =
              item.description || item.text || "";

            const tone =
              item.tone ||
              item.theme ||
              (index === 0 || index === 3 ? "teal" : "orange");

            return (
              <article
                key={`${number}-${item.title}`}
                className={`enterprise-hex-tile tile-${index + 1
                  } tone-${tone}`}
              >
                <div className="enterprise-hex-glow" />

                <div className="enterprise-hex-shape">
                  <div className="enterprise-hex-inner">
                    <div className="enterprise-hex-number">
                      {number}
                    </div>

                    <div className="enterprise-hex-content">
                      <div className="enterprise-hex-title-row">
                        <span className="enterprise-hex-icon">
                          {Icon && <Icon />}
                        </span>

                        <h3>{item.title}</h3>
                      </div>

                      <p>{description}</p>

                      <Button
                        type="button"
                        variant="link"
                        className="enterprise-hex-link"
                        onClick={() =>
                          onExplore?.(
                            {
                              ...item,
                              description,
                              tone,
                            },
                            index
                          )
                        }
                      >
                        <span>Explore</span>
                        <FiArrowRight />
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