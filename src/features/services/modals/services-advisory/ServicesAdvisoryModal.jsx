import { Modal } from "react-bootstrap";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiDollarSign,
  FiMapPin,
  FiMonitor,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./services-advisory.css";
import serviceAdvisoryIllustration from "../../../../assets/service-advisory-illustration.png";

const services = [
  {
    number: "01",
    tone: "teal",
    title: "Valuation",
    description:
      "Independent, data-backed valuation of properties, land, projects and real estate portfolios using market evidence and financial analysis.",
    icon: FiDollarSign,
    href: "https://sigmavalue.ai/valuation-overview",
  },
  {
    number: "02",
    tone: "teal",
    title: "TEV",
    description:
      "Techno-Economic Viability assessment covering technical feasibility, market potential, project economics, risks and the overall commercial viability.",
    icon: FiMonitor,
    href: "https://sigmavalue.ai/blogs/category/TEV/",
  },
  {
    number: "03",
    tone: "orange",
    title: "Catchment Intelligence (MMA)",
    description:
      "Micro-market and catchment analytics covering demand, supply, demographics, pricing, competition, infrastructure and location-driven opportunities.",
    icon: FiMapPin,
    href: "https://sigmavalue.ai/mma-overview/",
  },
  {
    number: "04",
    tone: "purple",
    title: "Feasibility",
    description:
      "Integrated development feasibility analysis across regulations, product mix, pricing, revenue, costs, returns, scenarios and project risks.",
    icon: FiBarChart2,
    href: "https://os.sigmavalue.ai/feasibility",
  },
];

const values = [
  {
    icon: FiActivity,
    title: "Data-led insights",
    text: "Actionable intelligence that reduces uncertainty.",
    tone: "teal",
  },
  {
    icon: FiTrendingUp,
    title: "Evidence-based decisions",
    text: "Clear analysis to guide confident investment choices.",
    tone: "orange",
  },
  {
    icon: FiArrowRight,
    title: "End-to-end advisory",
    text: "From evaluation to execution—we're with you all the way.",
    tone: "purple",
  },
  {
    icon: FiShield,
    title: "Trusted expertise",
    text: "Experience you can rely on. Results you can measure.",
    tone: "teal",
  },
];

function SmartCityVisual() {
  return (
    <div className="sa-hero-visual" aria-hidden="true">
      <div className="sa-hero-glow" />
      <img
        src={serviceAdvisoryIllustration}
        alt="Service Advisory Smart City"
        className="sa-smart-city-image"
      />
      <span className="sa-hero-dot hero-dot-1" />
      <span className="sa-hero-dot hero-dot-2" />
      <span className="sa-hero-dot hero-dot-3" />
      <span className="sa-hero-dot hero-dot-4" />
      <div className="sa-hero-orbit orbit-1" />
      <div className="sa-hero-orbit orbit-2" />
    </div>
  );
}

function ServiceVisual({ service }) {
  const Icon = service.icon;
  return (
    <div className={`sa-service-visual sa-visual-${service.tone}`}>
      <div className="sa-visual-glow" />
      <div className="sa-visual-circle">
        <Icon />
      </div>
      <div className="sa-visual-ring ring-1" />
      <div className="sa-visual-ring ring-2" />
      <span className="sa-mini-dot mini-1" />
      <span className="sa-mini-dot mini-2" />
      <span className="sa-mini-dot mini-3" />
    </div>
  );
}

function ServiceItem({ service }) {
  const ServiceElement = service.href ? "a" : "button";

  return (
    <ServiceElement
      {...(service.href ? { href: service.href, target: "_blank", rel: "noreferrer" } : { type: "button" })}
      className={`sa-service sa-${service.tone}`}
    >
      <div className="sa-service-number">{service.number}</div>
      <ServiceVisual service={service} />
      <div className="sa-service-content">
        <div className="sa-service-title-row">
          <h3>{service.title}</h3>
          <span className="sa-service-arrow">
            <FiArrowRight />
          </span>
        </div>
        <p>{service.description}</p>
        <span className="sa-explore">
          Explore capability
          <FiArrowRight />
        </span>
      </div>
    </ServiceElement>
  );
}

export function ServicesAdvisoryModal({ show, onHide, theme }) {
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      dialogClassName="sa-dialog d4-right-panel-dialog"
      contentClassName={`sa-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"}`}
      backdropClassName="sa-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow="07 / 07 · SERVICES ADVISORY"
        title="Decision-ready real estate advisory."
        subtitle="Specialist intelligence and analytics for valuation, viability, markets and development decisions."
        onHide={onHide}
        ariaLabel="Close Service Advisory"
      />

      <Modal.Body className="d4-right-panel-body">
        <section className="sa-section" aria-labelledby="sa-title">
          <div className="sa-top-visual">
            <SmartCityVisual />
          </div>

          <div className="sa-service-area">
            <div className="sa-flow-line" />
            <div className="sa-core">
              <div className="sa-core-ring" />
              <div className="sa-core-icon">
                <FiBarChart2 />
              </div>
              <strong>OUR CORE</strong>
              <span>SERVICES</span>
            </div>

            <div className="sa-services">
              {services.map((service) => (
                <ServiceItem key={service.title} service={service} />
              ))}
            </div>
          </div>

          <footer className="sa-values">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div className={`sa-value sa-value-${value.tone}`} key={value.title}>
                  <div className="sa-value-icon">
                    <Icon />
                  </div>
                  <div className="sa-value-content">
                    <strong>{value.title}</strong>
                    <small>{value.text}</small>
                  </div>
                </div>
              );
            })}
          </footer>
        </section>
      </Modal.Body>
    </Modal>
  );
}

export default ServicesAdvisoryModal;
