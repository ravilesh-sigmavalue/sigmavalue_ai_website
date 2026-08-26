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
  FiX,
} from "react-icons/fi";

import "../ServicesAdvisoryModal.css";
import serviceAdvisoryIllustration from "../assets/service-advisory-illustration.png";

/* =========================================================
   SERVICE DATA
   ========================================================= */

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


/* =========================================================
   VALUE DATA
   ========================================================= */

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


/* =========================================================
   HERO VISUAL
   ========================================================= */

function SmartCityVisual() {
  return (
    <div className="sa-hero-visual" aria-hidden="true">

      <div className="sa-hero-glow" />

      <img
        src={serviceAdvisoryIllustration}
        alt=""
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


/* =========================================================
   SERVICE ILLUSTRATION
   ========================================================= */

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


/* =========================================================
   SERVICE ITEM
   ========================================================= */

function ServiceItem({ service }) {
  const ServiceElement = service.href ? "a" : "button";

  return (
    <ServiceElement
      {...(service.href
        ? { href: service.href }
        : { type: "button" })}
      className={`sa-service sa-${service.tone}`}
    >

      {/* Number */}

      <div className="sa-service-number">
        {service.number}
      </div>


      {/* Illustration */}

      <ServiceVisual service={service} />


      {/* Content */}

      <div className="sa-service-content">

        <div className="sa-service-title-row">

          <h3>
            {service.title}
          </h3>

          <span className="sa-service-arrow">
            <FiArrowRight />
          </span>

        </div>

        <p>
          {service.description}
        </p>

        <span className="sa-explore">
          Explore capability
          <FiArrowRight />
        </span>

      </div>

    </ServiceElement>
  );
}


/* =========================================================
   MAIN MODAL
   ========================================================= */

export function ServicesAdvisoryModal({
  show,
  onHide,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName="sa-dialog"
      contentClassName="sa-modal"
      backdropClassName="sa-backdrop"
    >

      <section
        className="sa-section"
        aria-labelledby="sa-title"
      >

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          className="sa-close"
          onClick={onHide}
          aria-label="Close Service Advisory"
        >
          <FiX />
        </button>


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="sa-header">

          <div className="sa-heading">

            <div className="sa-eyebrow">
              SERVICES ADVISORY
            </div>

            <h2 id="sa-title">
              Decision-ready real estate
              <span> advisory.</span>
            </h2>

            <p>
              Specialist intelligence and analytics for valuation,
              viability, markets and development decisions.
            </p>

            <i className="sa-heading-line" />

          </div>


          {/* HERO IMAGE */}

          <SmartCityVisual />

        </header>


        {/* =================================================
            SERVICE FLOW
        ================================================= */}

        <div className="sa-service-area">

          {/* central connecting line */}

          <div className="sa-flow-line" />

          {/* center node */}

          <div className="sa-core">

            <div className="sa-core-ring" />

            <div className="sa-core-icon">
              <FiBarChart2 />
            </div>

            <strong>
              OUR CORE
            </strong>

            <span>
              SERVICES
            </span>

          </div>


          {/* services */}

          <div className="sa-services">

            {services.map((service) => (
              <ServiceItem
                key={service.number}
                service={service}
              />
            ))}

          </div>

        </div>


        {/* =================================================
            VALUE STRIP
        ================================================= */}

        <footer className="sa-values">

          {values.map((value) => {

            const Icon = value.icon;

            return (
              <div
                className={`sa-value sa-value-${value.tone}`}
                key={value.title}
              >

                <div className="sa-value-icon">
                  <Icon />
                </div>

                <div className="sa-value-content">

                  <strong>
                    {value.title}
                  </strong>

                  <small>
                    {value.text}
                  </small>

                </div>

              </div>
            );

          })}

        </footer>

      </section>

    </Modal>
  );
}

export default ServicesAdvisoryModal;
