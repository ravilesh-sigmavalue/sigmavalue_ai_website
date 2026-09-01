import { Button, Card, Modal } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./cross-industry.css";

/* =========================================================
   WATERFALL CARD
========================================================= */

function WaterfallCard({
  item,
  index,
  onExplore,
}) {
  const {
    title: cardTitle,
    text,
    icon: Icon,
  } = item;

  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`
        cross-industry-waterfall-step
        waterfall-step-${index + 1}
      `}
    >
      <Card className="cross-industry-card">
        <Card.Body>

          {/* =============================================
              CARD TOP
          ============================================== */}

          <div className="cross-industry-card-top">
            <span className="cross-industry-step-number">
              {number}
            </span>

            <span className="cross-industry-icon">
              <Icon />
            </span>
          </div>


          {/* =============================================
              CARD TITLE
          ============================================== */}

          <Card.Title>
            {cardTitle}
          </Card.Title>


          {/* =============================================
              DESCRIPTION
          ============================================== */}

          <Card.Text>
            {text}
          </Card.Text>


          {/* =============================================
              ACTION
          ============================================== */}

          <Button
            variant="link"
            className="cross-industry-action"
            onClick={() =>
              onExplore?.(
                {
                  title: cardTitle,
                  text,
                  icon: Icon,
                },
                index
              )
            }
          >
            <span>Explore</span>

            <FiArrowRight />
          </Button>

        </Card.Body>
      </Card>
    </div>
  );
}


/* =========================================================
   MAIN MODAL
========================================================= */

export function CrossIndustryModal({
  show,
  onHide,

  eyebrow =
  "03 / 07 · CROSS-INDUSTRY AGENTIC AI",

  title =
  "From AI opportunity to enterprise-scale impact.",

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

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
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

      {/* ===================================================
          HEADER
      ==================================================== */}

      <RightPanelModalHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        onHide={onHide}
        ariaLabel="Close Cross-Industry Agentic AI"
      />


      {/* ===================================================
          BODY
      ==================================================== */}

      <Modal.Body
        className="
          cross-industry-body
          d4-right-panel-body
        "
      >

        <div className="cross-industry-waterfall">

          {solutions
            .slice(0, 4)
            .map((item, index) => (
              <WaterfallCard
                key={item.title}
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