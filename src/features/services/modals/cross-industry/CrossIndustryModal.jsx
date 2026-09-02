import { Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";

import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./cross-industry.css";

function WaterfallCard({ item, index, onExplore }) {
  const Icon = item?.icon;

  const cardTitle =
    item?.title ||
    `Cross-industry capability ${index + 1}`;

  const text =
    item?.text ||
    item?.description ||
    "";

  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`
        cross-industry-waterfall-step
        waterfall-step-${index + 1}
      `}
    >
      <Card className="cross-industry-card">
        <Card.Body>
          <div className="cross-industry-card-top">
            <span className="cross-industry-step-number">
              {number}
            </span>

            <span
              className="cross-industry-icon"
              aria-hidden="true"
            >
              {Icon && <Icon />}
            </span>
          </div>

          <Card.Title>{cardTitle}</Card.Title>

          {text && <Card.Text>{text}</Card.Text>}

          <Button
            type="button"
            variant="link"
            className="cross-industry-action"
            aria-label={`Explore ${cardTitle}`}
            onClick={() =>
              onExplore?.(
                {
                  ...item,
                  title: cardTitle,
                  text,
                  icon: Icon,
                },
                index
              )
            }
          >
            <span>Explore</span>
            <FiArrowRight aria-hidden="true" />
          </Button>
        </Card.Body>
      </Card>
    </article>
  );
}

export function CrossIndustryModal({
  show,
  onHide,
  eyebrow = "03 / 07 · CROSS-INDUSTRY AGENTIC AI",
  title = "From AI opportunity to enterprise-scale impact.",
  subtitle =
  "End-to-end advisory, implementation and optimization across industries and business functions.",
  solutions = [],
  theme,
  onExplore,
}) {
  const isLight =
    theme === "light" ||
    (
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme === "light"
    );

  const visibleSolutions =
    Array.isArray(solutions)
      ? solutions.slice(0, 4)
      : [];

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      keyboard
      restoreFocus
      dialogClassName="
        cross-industry-dialog
        d4-right-panel-dialog
      "
      contentClassName={`
        cross-industry-modal
        d4-right-panel-modal
        ${isLight ? "light-mode" : "dark-mode"}
      `}
      backdropClassName="
        cross-industry-backdrop
        d4-right-panel-backdrop
      "
    >
      <RightPanelModalHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        onHide={onHide}
        ariaLabel="Close Cross-Industry Agentic AI"
      />

      <Modal.Body
        className="
          cross-industry-body
          d4-right-panel-body
        "
      >
        <div
          className="cross-industry-waterfall"
          aria-label="Cross-industry Agentic AI capabilities"
        >
          {visibleSolutions.map((item, index) => (
            <WaterfallCard
              key={`${item?.title || "capability"}-${index}`}
              item={item}
              index={index}
              onExplore={onExplore}
            />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
}
