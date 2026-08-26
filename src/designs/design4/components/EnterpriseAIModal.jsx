import { Modal } from "react-bootstrap";
import "../EnterpriseAIModal.css";

const enterpriseCards = [
  {
    id: "agentic",
    position: "card-agentic",
    theme: "coral",
    icon: "bot",
    title: "Agentic AI & Automation",
    description:
      "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.",
  },
  {
    id: "analytics",
    position: "card-analytics",
    theme: "teal",
    icon: "analytics",
    title: "AI Analytics & Decision Intelligence",
    description:
      "Deliver AI-powered analytics, forecasting and decision-support solutions for smarter business decisions.",
  },
  {
    id: "knowledge",
    position: "card-knowledge",
    theme: "coral",
    icon: "knowledge",
    title: "Enterprise Knowledge & Copilots",
    description:
      "Develop AI-powered knowledge systems, copilots and assistants that leverage organizational data and documents.",
  },
  {
    id: "custom",
    position: "card-custom",
    theme: "teal",
    icon: "custom",
    title: "Custom AI Solutions & Integration",
    description:
      "Design and integrate tailored AI solutions with existing ERP, CRM, platforms and enterprise systems.",
  },
];

/* =========================================================
   CARD ICONS
========================================================= */

function EnterpriseIcon({ type }) {
  if (type === "bot") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4v4" />
        <circle cx="16" cy="4" r="1.5" />
        <rect x="7" y="9" width="18" height="15" rx="4" />
        <path d="M11 24v3M21 24v3M4 14h3M25 14h3" />
        <circle cx="12" cy="15" r="1.3" />
        <circle cx="20" cy="15" r="1.3" />
        <path d="M12 20h8" />
      </svg>
    );
  }

  if (type === "analytics") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 27h22" />
        <rect x="7" y="17" width="4" height="8" rx="1" />
        <rect x="14" y="11" width="4" height="14" rx="1" />
        <rect x="21" y="6" width="4" height="19" rx="1" />
        <path d="m7 12 6-4 5 2 7-6" />
      </svg>
    );
  }

  if (type === "knowledge") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 7.5c5-2 8-.8 11 2.2v17c-3-3-6-4.2-11-2.2Z" />
        <path d="M27 7.5c-5-2-8-.8-11 2.2v17c3-3 6-4.2 11-2.2Z" />
        <path d="M9 12h4M9 16h4M19 12h4M19 16h4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M12 4h6v5a3 3 0 1 1 0 6v5h-5a3 3 0 1 0-6 0H3v-8h5a3 3 0 1 0 0-6h4Z" />
      <path d="M18 20v8h8v-5a3 3 0 1 0 0-6h-5" />
    </svg>
  );
}

/* =========================================================
   CAPABILITY CARD
========================================================= */

function EnterpriseCard({ item }) {
  return (
    <article
      className={`enterprise-network-card card ${item.position} theme-${item.theme}`}
    >
      <div
        className={`enterprise-icon-orb enterprise-icon-${item.theme}`}
        aria-hidden="true"
      >
        <EnterpriseIcon type={item.icon} />
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="enterprise-card-title mb-2">
          {item.title}
        </h3>

        <p className="enterprise-card-description mb-3">
          {item.description}
        </p>

        <button
          type="button"
          className="enterprise-card-arrow btn p-0 mt-auto"
          aria-label={`Explore ${item.title}`}
        >
          →
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   CONNECTION NETWORK
========================================================= */

function NetworkLines() {
  return (
    <svg
      className="enterprise-network-lines"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >

      {/* ================================================
          LEFT : BUILDING -> ANALYTICS
      ================================================= */}

      <path
        className="enterprise-wire wire-teal"
        d="M435 295 H315 Q290 295 290 315 H245"
      />

      <path
        className="enterprise-wire-flow wire-teal"
        d="M435 295 H315 Q290 295 290 315 H245"
      />


      {/* ================================================
          RIGHT : BUILDING -> AGENTIC AI
      ================================================= */}

      <path
        className="enterprise-wire wire-teal"
        d="M565 295 H670 Q690 295 690 315 H730"
      />

      <path
        className="enterprise-wire-flow wire-teal"
        d="M565 295 H670 Q690 295 690 315 H730"
      />


      {/* ================================================
          BOTTOM LEFT : BUILDING -> KNOWLEDGE
      ================================================= */}

      <path
        className="enterprise-wire wire-teal"
        d="M475 360 V405 Q475 425 455 425 H385 V450"
      />

      <path
        className="enterprise-wire-flow wire-teal"
        d="M475 360 V405 Q475 425 455 425 H385 V450"
      />


      {/* ================================================
          BOTTOM RIGHT : BUILDING -> CUSTOM AI
      ================================================= */}

      <path
        className="enterprise-wire wire-coral"
        d="M525 360 V405 Q525 425 545 425 H615 V450"
      />

      <path
        className="enterprise-wire-flow wire-coral"
        d="M525 360 V405 Q525 425 545 425 H615 V450"
      />


      {/* LEFT NODES */}
      <circle
        className="wire-node node-teal"
        cx="435"
        cy="295"
        r="4"
      />

      <circle
        className="wire-node node-teal"
        cx="245"
        cy="315"
        r="4"
      />


      {/* RIGHT NODES */}
      <circle
        className="wire-node node-teal"
        cx="565"
        cy="295"
        r="4"
      />

      <circle
        className="wire-node node-teal"
        cx="755"
        cy="315"
        r="4"
      />


      {/* BOTTOM LEFT */}
      <circle
        className="wire-node node-teal"
        cx="475"
        cy="360"
        r="4"
      />

      <circle
        className="wire-node node-teal"
        cx="385"
        cy="450"
        r="4"
      />


      {/* BOTTOM RIGHT */}
      <circle
        className="wire-node node-coral"
        cx="525"
        cy="360"
        r="4"
      />

      <circle
        className="wire-node node-coral"
        cx="615"
        cy="450"
        r="4"
      />

    </svg>
  );
}

/* =========================================================
   MAIN MODAL
========================================================= */

export function EnterpriseAIModal({ show, onHide }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="enterprise-ai-dialog d4-right-panel-dialog"
      contentClassName="enterprise-ai-modal"
      backdropClassName="enterprise-ai-backdrop d4-right-panel-backdrop"
    >
      <button
        type="button"
        className="enterprise-close btn"
        onClick={onHide}
        aria-label="Close Enterprise AI"
      >
        ×
      </button>

      <Modal.Body className="p-0">
        <section
          className="enterprise-stage"
          aria-labelledby="enterprise-ai-title"
        >
          {/* =====================================================
              INTRO
          ====================================================== */}

          <header className="enterprise-intro">
            <div className="enterprise-eyebrow mb-2">
              ENTERPRISE AI
            </div>

            <h2 id="enterprise-ai-title" className="mb-0">
              Intelligence built around <span>your enterprise.</span>
            </h2>

            <div className="enterprise-title-line" />

            <p className="enterprise-intro-copy mb-0">
              For connected capabilities to streamline, automate and scale with your organization.
            </p>
          </header>

          {/* =====================================================
              CONNECTIONS
          ====================================================== */}

          <NetworkLines />

          {/* =====================================================
              CENTER BUILDING
          ====================================================== */}

          <div className="enterprise-building-hub">
            <div className="enterprise-building-glow" />

            <div className="enterprise-orbit enterprise-orbit-one" />
            <div className="enterprise-orbit enterprise-orbit-two" />
            <div className="enterprise-orbit enterprise-orbit-three" />

            <img
              src="Enterprizedark.png"
              alt="Enterprise AI building"
              className="enterprise-building-image building-dark"
            />

            <img
              src="Enterprizedlight.png"
              alt="Enterprise AI building"
              className="enterprise-building-image building-light"
            />

            <span className="enterprise-hub-dot hub-dot-left" />
            <span className="enterprise-hub-dot hub-dot-right" />
          </div>

          {/* LEFT CARD */}
          <EnterpriseCard
            item={enterpriseCards.find((item) => item.id === "analytics")}
          />

          {/* RIGHT CARD */}
          <EnterpriseCard
            item={enterpriseCards.find((item) => item.id === "agentic")}
          />

          {/* BOTTOM TWO CARDS */}
          <div className="enterprise-bottom-cards">
            <EnterpriseCard
              item={enterpriseCards.find((item) => item.id === "knowledge")}
            />
            <EnterpriseCard
              item={enterpriseCards.find((item) => item.id === "custom")}
            />
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
