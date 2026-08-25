import { Modal } from "react-bootstrap";
import {
  FiActivity, FiArrowRight, FiDatabase, FiGitBranch, FiShield,
  FiTrendingUp, FiX,
} from "react-icons/fi";
import "../StrategicTransactionModal.css";

const stages = [
  {
    number: "01",
    tone: "teal",
    title: "Transaction Strategy & Evaluation",
    description: "Assess acquisition, divestment, joint venture and partnership opportunities through commercial, financial and strategic evaluation.",
    image: "/strategicmodal_images/stage01.png",
    icon: FiTrendingUp,
  },
  {
    number: "02",
    tone: "orange",
    title: "Due Diligence & Transaction Structuring",
    description: "Support business, financial, market and operational due diligence, valuation, deal structuring and negotiation of transaction terms.",
    image: "/strategicmodal_images/stage02.png",
    icon: FiDatabase,
  },
  {
    number: "03",
    tone: "teal",
    title: "Transaction Execution & Closure",
    description: "Coordinate stakeholders and provide end-to-end support through negotiations, documentation, approvals, closing and post-transaction integration.",
    image: "/strategicmodal_images/stage03.png",
    icon: FiGitBranch,
  },
];

const outcomes = [
  { icon: FiActivity, title: "Real-time Intelligence", text: "Live insights to guide decisions", tone: "teal" },
  { icon: FiDatabase, title: "Data-driven Decisions", text: "Analytics that reduce uncertainty", tone: "orange" },
  { icon: FiShield, title: "End-to-end Execution", text: "From strategy to successful close", tone: "teal" },
];

function TransactionNetwork() {
  return (
    <div className="stm-transaction-network" aria-hidden="true">

      {/* Decorative intelligence rings */}
      <span className="stm-network-ring ring-a" />
      <span className="stm-network-ring ring-b" />
      <span className="stm-network-ring ring-c" />

      {/* Connection system */}
      <svg
        className="stm-network-svg"
        viewBox="0 0 340 125"
        preserveAspectRatio="none"
      >
        <path
          className="network-path path-a"
          d="M25 65 C70 25, 115 40, 170 62 S250 35, 320 45"
        />

        <path
          className="network-path path-b"
          d="M35 88 C90 65, 125 45, 170 62 S250 90, 310 72"
        />

        <path
          className="network-path path-c"
          d="M80 18 C115 42, 135 72, 170 62 S245 30, 285 25"
        />

        <path
          className="network-path path-d"
          d="M170 62 C210 65, 245 92, 305 90"
        />

        <path
          className="network-path path-main"
          d="M20 62 C75 62, 120 62, 170 62 S260 62, 325 62"
        />
      </svg>

      {/* Main intelligence hub */}
      <div className="stm-deal-core">
        <span className="core-pulse" />
        <strong>DEAL</strong>
        <small>INTELLIGENCE</small>
      </div>

      {/* Intelligence nodes */}
      <div className="stm-network-node node-strategy">
        <span>STRATEGY</span>
      </div>

      <div className="stm-network-node node-dd">
        <span>DILIGENCE</span>
      </div>

      <div className="stm-network-node node-fin">
        <span>FINANCE</span>
      </div>

      {/* Moving data particles */}
      <i className="stm-data-particle particle-a" />
      <i className="stm-data-particle particle-b" />
      <i className="stm-data-particle particle-c" />

      {/* Supporting labels */}
      <span className="stm-network-label label-top">
        MARKET INTELLIGENCE
      </span>

      <span className="stm-network-label label-bottom">
        TRANSACTION FLOW
      </span>

    </div>
  );
}

function StageArt({ image }) {
  return (
    <div className="stm-art stm-art-image" aria-hidden="true">
      <img src={image} alt="" loading="eager" decoding="async" />
    </div>
  );
}

function StageRow({ stage }) {
  const Icon = stage.icon;

  return (
    <article className={`stm-stage stm-${stage.tone}`}>

      <div className="stm-index-label">
        <span />
        STAGE {stage.number}
      </div>
      {/* Illustration */}
      <StageArt image={stage.image} />

      {/* Content */}
      <div className="stm-stage-copy">

        <h3>{stage.title}</h3>

        <i className="stm-title-line" />

        <p>{stage.description}</p>

        <button type="button" className="stm-explore">
          <span>Explore capability</span>
          <FiArrowRight />
        </button>

      </div>

      {/* Circular action icon */}
      <div className="stm-stage-icon">
        <Icon />
      </div>

    </article>
  );
}

export function StrategicTransactionModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered dialogClassName="stm-dialog" contentClassName="stm-modal" backdropClassName="stm-backdrop">
      <section className="stm-section" aria-labelledby="stm-title">
        <button type="button" className="stm-close" onClick={onHide} aria-label="Close Strategic Transaction"><FiX /></button>
        <header className="stm-header">
          <div className="stm-heading">
            <div>STRATEGIC TRANSACTION</div>
            <h2 id="stm-title">Navigate every transaction with <span>clarity.</span></h2>
            <p>End-to-end strategic, diligence and execution support<br />for complex real estate transactions.</p>
            <i />
          </div>
          <TransactionNetwork />
        </header>
        <div className="stm-stage-list">{stages.map((stage) => <StageRow key={stage.number} stage={stage} />)}</div>
        <footer className="stm-outcomes">
          {outcomes.map(({ icon: Icon, title, text, tone }) => (
            <div className={`stm-outcome stm-${tone}`} key={title}><Icon /><span><strong>{title}</strong><small>{text}</small></span></div>
          ))}
        </footer>
      </section>
    </Modal>
  );
}
