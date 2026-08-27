import { Modal } from "react-bootstrap";
import "../EnterpriseAIModal.css";

/* =========================================================
   ENTERPRISE AI CAPABILITIES
========================================================= */

const enterpriseCards = [
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
    id: "agentic",
    position: "card-agentic",
    theme: "coral",
    icon: "bot",
    title: "Agentic AI & Automation",
    description:
      "Build AI agents and intelligent workflows to automate complex enterprise processes and operations.",
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
   ICONS
========================================================= */

function EnterpriseIcon({ type }) {
  if (type === "analytics") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 27h22" />

        <rect
          x="7"
          y="17"
          width="4"
          height="8"
          rx="1"
        />

        <rect
          x="14"
          y="11"
          width="4"
          height="14"
          rx="1"
        />

        <rect
          x="21"
          y="6"
          width="4"
          height="19"
          rx="1"
        />

        <path d="m7 12 6-4 5 2 7-6" />
      </svg>
    );
  }

  if (type === "bot") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4v4" />

        <circle
          cx="16"
          cy="4"
          r="1.5"
        />

        <rect
          x="7"
          y="9"
          width="18"
          height="15"
          rx="4"
        />

        <path d="M11 24v3M21 24v3M4 14h3M25 14h3" />

        <circle
          cx="12"
          cy="15"
          r="1.3"
        />

        <circle
          cx="20"
          cy="15"
          r="1.3"
        />

        <path d="M12 20h8" />
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
      className={`
        enterprise-network-card
        card
        ${item.position}
        theme-${item.theme}
      `}
    >
      {/* FLOATING ICON */}
      <div
        className={`
          enterprise-icon-orb
          enterprise-icon-${item.theme}
        `}
        aria-hidden="true"
      >
        <EnterpriseIcon type={item.icon} />
      </div>

      {/* CARD CONTENT */}
      <div className="card-body d-flex flex-column">
        <h3 className="enterprise-card-title">
          {item.title}
        </h3>

        <div
          className="enterprise-card-accent"
          aria-hidden="true"
        />

        <p className="enterprise-card-description">
          {item.description}
        </p>

        <button
          type="button"
          className="
            enterprise-card-arrow
            btn
            p-0
            mt-auto
          "
          aria-label={`Explore ${item.title}`}
        >
          {"\u2192"}
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   CONNECTOR NETWORK
========================================================= */

function NetworkLines() {
  return (
    <svg
      className="enterprise-network-lines"
      viewBox="0 0 1000 520"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* =============================================
          ANALYTICS — TEAL — LEFT
      ============================================== */}

      <path
        className="enterprise-wire wire-teal"
        d="
          M430 220
          H335
          Q310 220 310 240
          H250
        "
      />

      <path
        className="
          enterprise-wire-flow
          wire-teal
        "
        d="
          M430 220
          H335
          Q310 220 310 240
          H250
        "
      />

      {/* =============================================
          AGENTIC — CORAL — RIGHT
      ============================================== */}

      <path
        className="enterprise-wire wire-coral"
        d="
          M570 220
          H665
          Q690 220 690 240
          H750
        "
      />

      <path
        className="
          enterprise-wire-flow
          wire-coral
        "
        d="
          M570 220
          H665
          Q690 220 690 240
          H750
        "
      />

      {/* =============================================
          KNOWLEDGE — CORAL — BOTTOM LEFT
      ============================================== */}

      <path
        className="enterprise-wire wire-coral"
        d="
          M485 292
          V355
          Q485 375 465 375
          H390
          V410
        "
      />

      <path
        className="
          enterprise-wire-flow
          wire-coral
        "
        d="
          M485 292
          V355
          Q485 375 465 375
          H390
          V410
        "
      />

      {/* =============================================
          CUSTOM — TEAL — BOTTOM RIGHT
      ============================================== */}

      <path
        className="enterprise-wire wire-teal"
        d="
          M515 292
          V355
          Q515 375 535 375
          H610
          V410
        "
      />

      <path
        className="
          enterprise-wire-flow
          wire-teal
        "
        d="
          M515 292
          V355
          Q515 375 535 375
          H610
          V410
        "
      />

      {/* =============================================
          NODES
      ============================================== */}

      {/* LEFT */}
      <circle
        className="wire-node node-teal"
        cx="430"
        cy="220"
        r="4"
      />

      <circle
        className="wire-node node-teal"
        cx="250"
        cy="240"
        r="4"
      />

      {/* RIGHT */}
      <circle
        className="wire-node node-coral"
        cx="570"
        cy="220"
        r="4"
      />

      <circle
        className="wire-node node-coral"
        cx="750"
        cy="240"
        r="4"
      />

      {/* BOTTOM LEFT */}
      <circle
        className="wire-node node-coral"
        cx="485"
        cy="292"
        r="4"
      />

      <circle
        className="wire-node node-coral"
        cx="390"
        cy="410"
        r="4"
      />

      {/* BOTTOM RIGHT */}
      <circle
        className="wire-node node-teal"
        cx="515"
        cy="292"
        r="4"
      />

      <circle
        className="wire-node node-teal"
        cx="610"
        cy="410"
        r="4"
      />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export function EnterpriseAIModal({
  show,
  onHide,
}) {
  const analytics = enterpriseCards.find(
    (item) => item.id === "analytics"
  );

  const agentic = enterpriseCards.find(
    (item) => item.id === "agentic"
  );

  const knowledge = enterpriseCards.find(
    (item) => item.id === "knowledge"
  );

  const custom = enterpriseCards.find(
    (item) => item.id === "custom"
  );

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="
        enterprise-ai-dialog
        d4-right-panel-dialog
      "
      contentClassName="enterprise-ai-modal"
      backdropClassName="
        enterprise-ai-backdrop
        d4-right-panel-backdrop
      "
    >
      {/* ===================================================
          CLOSE BUTTON
      ==================================================== */}

      <button
        type="button"
        className="enterprise-close btn"
        onClick={onHide}
        aria-label="Close Enterprise AI"
      >
        {"\u00d7"}
      </button>

      <Modal.Body className="p-0">
        <section
          className="enterprise-stage"
          aria-labelledby="enterprise-ai-title"
        >
          {/* =================================================
              INTRO
          ================================================= */}

          <header className="enterprise-intro">
            <div className="enterprise-eyebrow">
              ENTERPRISE AI
            </div>

            <h2 id="enterprise-ai-title">
              Intelligence built around{" "}
              <span>your enterprise.</span>
            </h2>

            <div
              className="enterprise-title-line"
              aria-hidden="true"
            />

            <p className="enterprise-intro-copy">
              For connected capabilities to streamline,
              automate and scale with your organization.
            </p>
          </header>

          {/* =================================================
              CONNECTING NETWORK
          ================================================= */}

          <NetworkLines />

          {/* =================================================
              CENTER BUILDING
          ================================================= */}

          <div className="enterprise-building-hub">
            <div className="enterprise-building-aura" />

            {/* <div
              className="
                enterprise-orbit
                enterprise-orbit-one
              "
            />

            <div
              className="
                enterprise-orbit
                enterprise-orbit-two
              "
            />

            <div
              className="
                enterprise-orbit
                enterprise-orbit-three
              "
            /> */}

            {/* DARK BUILDING */}

            <img
              src="/Enterprisedark.png"
              alt="Enterprise AI connected building"
              className="
                enterprise-building-image
                building-dark
              "
            />

            {/* LIGHT BUILDING */}

            <img
              src="/Enterpriselight.png"
              alt="Enterprise AI connected building"
              className="
                enterprise-building-image
                building-light
              "
            />
          </div>

          {/* =================================================
              LEFT
          ================================================= */}

          <EnterpriseCard item={analytics} />

          {/* =================================================
              RIGHT
          ================================================= */}

          <EnterpriseCard item={agentic} />

          {/* =================================================
              BOTTOM TWO
          ================================================= */}

          <div className="enterprise-bottom-cards">
            <EnterpriseCard item={knowledge} />

            <EnterpriseCard item={custom} />
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
