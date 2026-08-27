import { Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./cross-industry.css";

export function CrossIndustryModal({
  show,
  onHide,
  eyebrow = "03 / 07 · CROSS-INDUSTRY AGENTIC AI",
  title = "From AI opportunity to enterprise-scale impact.",
  subtitle = "End-to-end advisory, implementation and optimization across industries and business functions.",
  solutions = [],
  theme,
  onExplore,
}) {
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="cross-industry-dialog d4-right-panel-dialog"
      contentClassName={`cross-industry-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"}`}
      backdropClassName="cross-industry-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        onHide={onHide}
        ariaLabel="Close Cross-Industry Agentic AI"
      />

      <Modal.Body className="cross-industry-body d4-right-panel-body">
        <div className="cross-industry-grid">
          {solutions.slice(0, 4).map(({ title: cardTitle, text, icon: Icon }, index) => (
            <Card className="cross-industry-card" key={cardTitle}>
              <Card.Body>
                <span className="cross-industry-icon">
                  <Icon />
                </span>
                <Card.Title>{cardTitle}</Card.Title>
                <Card.Text>{text}</Card.Text>
                <Button
                  variant="link"
                  className="cross-industry-action"
                  onClick={() => onExplore?.({ title: cardTitle, text, icon: Icon }, index)}
                >
                  <span>Explore</span>
                  <FiArrowRight />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
