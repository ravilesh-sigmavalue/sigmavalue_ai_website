import { Button, Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";

export function RightPanelModalHeader({
  eyebrow,
  title,
  subtitle,
  onHide,
  ariaLabel = "Close modal",
}) {
  return (
    <Modal.Header className="d4-right-panel-header">
      <div className="d4-header-info">
        {eyebrow && <span className="d4-header-eyebrow">{eyebrow}</span>}
        {title && <Modal.Title className="d4-header-title">{title}</Modal.Title>}
        {subtitle && <p className="d4-header-subtitle">{subtitle}</p>}
      </div>
      <div className="d4-header-actions">
        <Button
          variant="link"
          className="d4-modal-close-btn"
          onClick={onHide}
          aria-label={ariaLabel}
        >
          <FiX />
        </Button>
      </div>
    </Modal.Header>
  );
}
