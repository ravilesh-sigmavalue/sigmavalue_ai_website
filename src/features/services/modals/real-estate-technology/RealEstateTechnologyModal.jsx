import { Modal } from "react-bootstrap";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./real-estate-technology.css";

const capabilities = [
  {
    title: "Real Estate Digital Transformation",
    description:
      "Digitize and automate real estate processes across acquisition, development, sales, leasing, property management and project management.",
    icon: "transform",
  },
  {
    title: "Real Estate Data, AI & Intelligence",
    description:
      "Implement AI, automation, GIS, data platforms, analytics and decision intelligence to improve operational efficiency and business decisions.",
    icon: "data",
  },
  {
    number: "03",
    title: "Technology Integration & Platform Modernization",
    description:
      "Modernize legacy systems and integrate ERP, CRM, GIS, PMS, financial systems and other enterprise applications into a connected digital ecosystem.",
    icon: "bolt",
  },
];

const benefits = [
  {
    icon: "city",
    title: "End-to-End",
    subtitle: "Solutions",
  },
  {
    icon: "chart",
    title: "Data-Driven",
    subtitle: "Intelligence",
  },
  {
    icon: "shield",
    title: "Secure &",
    subtitle: "Scalable",
  },
  {
    icon: "orbit",
    title: "Future-Ready",
    subtitle: "Technology",
  },
];

function CapabilityIcon({ type }) {
  if (type === "transform") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M25 12a9.5 9.5 0 0 0-17.7-2.5" />
        <path d="M7 20a9.5 9.5 0 0 0 17.7 2.5" />
        <path d="M6 6v5h5" />
        <path d="M26 26v-5h-5" />
      </svg>
    );
  }

  if (type === "data") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <ellipse cx="16" cy="8" rx="8" ry="4" />
        <path d="M8 8v8c0 2.2 3.6 4 8 4s8-1.8 8-4V8" />
        <path d="M8 16v8c0 2.2 3.6 4 8 4s8-1.8 8-4v-8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M18 3 7 18h8l-1 11 11-16h-8l1-10Z" />
    </svg>
  );
}

function BenefitIcon({ type }) {
  if (type === "city") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 28V12h7v16M11 28V6h8v22M19 28V10h9v18" />
        <path d="M7 16h2M7 20h2M14 10h2M14 14h2M14 18h2M22 14h3M22 18h3M22 22h3" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 26V16M12 26V11M19 26V7M26 26V4" />
        <path d="m5 12 7-5 7 3 7-6" />
      </svg>
    );
  }

  if (type === "shield") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3 27 7v8c0 7-4.5 11-11 14C9.5 26 5 22 5 15V7l11-4Z" />
        <path d="m11 16 3 3 7-8" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="7" />
      <circle cx="16" cy="16" r="12" strokeDasharray="2 4" />
      <path d="M16 4v4M28 16h-4M16 28v-4M4 16h4" />
    </svg>
  );
}

function CapabilityRow({ item }) {
  return (
    <article className="re-capability">
      <div className="re-capability-icon">
        <CapabilityIcon type={item.icon} />
      </div>
      <div className="re-capability-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <button type="button" className="re-explore-button">
          <span>Explore capability</span>
        </button>
      </div>
      <div className="re-row-arrow">→</div>
    </article>
  );
}

export function RealEstateTechnologyModal({ show, onHide, theme }) {
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="re-dialog d4-right-panel-dialog"
      contentClassName={`re-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"}`}
      backdropClassName="re-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow="04 / 07 · REAL ESTATE TECHNOLOGY"
        title="Transform every stage of real estate operations."
        subtitle="Connected technology, intelligent data and modern platforms for the real estate lifecycle."
        onHide={onHide}
        ariaLabel="Close Real Estate Technology"
      />

      <Modal.Body className="d4-right-panel-body">
        <section className="re-section" aria-labelledby="real-estate-title">
          <div className="re-shell">
            <div className="re-main-grid">
              <div className="re-visual-column">
                <div className="re-city-wrap">
                  <div className="re-orbit orbit-one" />
                  <div className="re-orbit orbit-two" />
                  <div className="re-city-pin pin-one">⌁</div>
                  <div className="re-city-pin pin-two">⌖</div>
                  <div className="re-city-pin pin-three">◌</div>

                  <img
                    src="/illustrations/real-estate-dark.png"
                    alt="Futuristic smart real estate city"
                    className="re-skyline-image re-skyline-dark"
                  />
                  <img
                    src="/illustrations/real-estate-light.png"
                    alt="Futuristic smart real estate city"
                    className="re-skyline-image re-skyline-light"
                  />
                </div>

                <div className="re-benefits">
                  {benefits.map((item) => (
                    <div className="re-benefit" key={item.title}>
                      <div className="re-benefit-icon">
                        <BenefitIcon type={item.icon} />
                      </div>
                      <div className="re-benefit-content">
                        <strong>{item.title}</strong>
                        <span>{item.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="re-flow">
                <div className="re-flow-line" aria-hidden="true" />
                {capabilities.map((item) => (
                  <CapabilityRow key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
