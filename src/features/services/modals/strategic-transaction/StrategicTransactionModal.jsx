import { Modal } from "react-bootstrap";
import {
  FiActivity,
  FiArrowRight,
  FiCheckSquare,
  FiDatabase,
  FiGitBranch,
  FiPieChart,
  FiShield,
  FiTrendingUp,
} from "react-icons/fi";

import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./strategic-transaction.css";

const stages = [
  {
    number: "01",
    tone: "teal",
    title: "Transaction Strategy & Evaluation",
    description:
      "Assess acquisition, divestment, joint venture and partnership opportunities through commercial, financial and strategic evaluation.",
    art: "growth",
    icon: FiTrendingUp,
  },
  {
    number: "02",
    tone: "orange",
    title: "Due Diligence & Transaction Structuring",
    description:
      "Support business, financial, market and operational due diligence, valuation, deal structuring and negotiation of transaction terms.",
    art: "blocks",
    icon: FiDatabase,
  },
  {
    number: "03",
    tone: "purple",
    title: "Transaction Execution & Closure",
    description:
      "Coordinate stakeholders and provide end-to-end support through negotiations, documentation, approvals, closing and post-transaction integration.",
    art: "closure",
    icon: FiGitBranch,
  },
];

const outcomes = [
  {
    icon: FiActivity,
    title: "Real-time Intelligence",
    text: "Live insights to guide decisions",
    tone: "teal",
  },
  {
    icon: FiDatabase,
    title: "Data-driven Decisions",
    text: "Analytics that reduce uncertainty",
    tone: "orange",
  },
  {
    icon: FiShield,
    title: "End-to-end Execution",
    text: "From strategy to successful close",
    tone: "purple",
  },
];

function TransactionNetwork() {
  return (
    <div
      className="stm-transaction-network"
      aria-hidden="true"
    >
      <span className="stm-network-ring ring-a" />
      <span className="stm-network-ring ring-b" />
      <span className="stm-network-ring ring-c" />

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

      <div className="stm-deal-core">
        <span className="core-pulse" />
        <strong>DEAL</strong>
        <small>INTELLIGENCE</small>
      </div>

      <div className="stm-network-node node-strategy">
        <span>STRATEGY</span>
      </div>

      <div className="stm-network-node node-dd">
        <span>DILIGENCE</span>
      </div>

      <div className="stm-network-node node-fin">
        <span>FINANCE</span>
      </div>

      <i className="stm-data-particle particle-a" />
      <i className="stm-data-particle particle-b" />
      <i className="stm-data-particle particle-c" />

      <span className="stm-network-label label-top">
        MARKET INTELLIGENCE
      </span>

      <span className="stm-network-label label-bottom">
        TRANSACTION FLOW
      </span>
    </div>
  );
}

function StageArt({ type }) {
  if (type === "blocks") {
    return (
      <div
        className="stm-art stm-blocks"
        aria-hidden="true"
      >
        <i />
        <i />
        <i />
        <i />
        <i />

        <span>
          <FiPieChart />
        </span>

        <b className="stm-art-spark spark-a" />
        <b className="stm-art-spark spark-b" />
      </div>
    );
  }

  if (type === "closure") {
    return (
      <div
        className="stm-art stm-closure"
        aria-hidden="true"
      >
        <span>
          <FiCheckSquare />
        </span>

        <i />

        <b>
          <FiShield />
        </b>

        <em>✓</em>
      </div>
    );
  }

  return (
    <div
      className="stm-art stm-growth"
      aria-hidden="true"
    >
      <div className="stm-chart-grid" />

      <i />
      <i />
      <i />
      <i />

      <span>
        <FiTrendingUp />
      </span>

      <b className="stm-growth-node node-a" />
      <b className="stm-growth-node node-b" />
      <b className="stm-growth-node node-c" />
    </div>
  );
}

function StageRow({
  stage,
  index,
  onExplore,
}) {
  const Icon = stage.icon;

  return (
    <article
      className={`stm-stage stm-${stage.tone}`}
    >
      <div className="stm-index-label">
        <span aria-hidden="true" />
        STAGE {stage.number}
      </div>

      <StageArt type={stage.art} />

      <div className="stm-stage-copy">
        <h3>{stage.title}</h3>

        <i
          className="stm-title-line"
          aria-hidden="true"
        />

        <p>{stage.description}</p>

        <button
          type="button"
          className="stm-explore"
          aria-label={`Explore ${stage.title}`}
          onClick={() =>
            onExplore?.(
              stage,
              index
            )
          }
        >
          <span>Explore capability</span>
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>

      <div
        className="stm-stage-icon"
        aria-hidden="true"
      >
        <Icon />
      </div>
    </article>
  );
}

export function StrategicTransactionModal({
  show,
  onHide,
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
      keyboard
      restoreFocus
      dialogClassName="stm-dialog d4-right-panel-dialog"
      contentClassName={`stm-modal d4-right-panel-modal ${
        isLight ? "light-mode" : "dark-mode"
      }`}
      backdropClassName="stm-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow="06 / 07 · STRATEGIC TRANSACTION ADVISORY"
        title="Navigate every transaction with clarity."
        subtitle="End-to-end strategic, diligence and execution support for complex real estate transactions."
        onHide={onHide}
        ariaLabel="Close Strategic Transaction"
      />

      <Modal.Body className="stm-body d4-right-panel-body">
        <section
          className="stm-section"
          aria-label="Strategic Transaction Advisory capabilities"
        >
          <div className="stm-top-network">
            <TransactionNetwork />
          </div>

          <div className="stm-stage-list">
            {stages.map((stage, index) => (
              <StageRow
                key={stage.title}
                stage={stage}
                index={index}
                onExplore={onExplore}
              />
            ))}
          </div>

          <footer
            className="stm-outcomes"
            aria-label="Strategic transaction outcomes"
          >
            {outcomes.map(
              ({
                icon: Icon,
                title,
                text,
                tone,
              }) => (
                <div
                  className={`stm-outcome stm-${tone}`}
                  key={title}
                >
                  <Icon aria-hidden="true" />

                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </div>
              )
            )}
          </footer>
        </section>
      </Modal.Body>
    </Modal>
  );
}
