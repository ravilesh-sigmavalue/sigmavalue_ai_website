import { Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight, FiX } from "react-icons/fi";
import "../CrossIndustryModal.css";

// const PHASES = [
//   "DISCOVERY / 4–6 WEEKS",
//   "DESIGN / 6–8 WEEKS",
//   "BUILD / 10–16 WEEKS",
//   "SCALE / ONGOING",
// ];

export function CrossIndustryModal({
  show,
  onHide,
  eyebrow = "CROSS-INDUSTRY AGENTIC AI",
  title = "From AI opportunity to enterprise-scale impact.",
  subtitle = "End-to-end advisory, implementation and optimization across industries and business functions.",
  solutions = [],
  onExplore,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="cross-industry-dialog d4-right-panel-dialog"
      contentClassName="cross-industry-modal"
      backdropClassName="cross-industry-backdrop d4-right-panel-backdrop"
    >
      <Modal.Header className="cross-industry-header">
        <div>
          <span>{eyebrow}</span>
          <Modal.Title>{title}</Modal.Title>
          <p>{subtitle}</p>
        </div>

        <Button
          variant="link"
          className="cross-industry-close"
          onClick={onHide}
          aria-label="Close Cross-Industry Agentic AI"
        >
          <FiX />
        </Button>
      </Modal.Header>

      <Modal.Body className="cross-industry-body">
        <div className="cross-industry-grid">
          {solutions.slice(0, 4).map(({ title: cardTitle, text, icon: Icon }, index) => (
            <Card className="cross-industry-card" key={cardTitle}>
              <Card.Body>
                {/* <span className="cross-industry-phase">{PHASES[index]}</span> */}
                <span className="cross-industry-icon"><Icon /></span>
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
