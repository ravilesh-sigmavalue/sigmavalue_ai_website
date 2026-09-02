import { Modal } from "react-bootstrap";
import {
  FiArrowRight,
  FiBarChart2,
  FiPieChart,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import "./deal-structuring.css";

const capabilities = [
  {
    number: "01",
    tone: "cyan",
    title: "Transaction & Deal Structuring",
    description:
      "Advise on transaction structures, joint ventures, partnerships, acquisitions, development arrangements and commercial terms to optimize risk and returns.",
    icon: "blocks",
    metrics: [
      [FiShield, "Risk Optimized", "98%"],
      [FiTrendingUp, "Value Creation", "2.4x"],
      [FiTarget, "Execution Speed", "40%"],
    ],
  },
  {
    number: "02",
    tone: "orange",
    title: "Capital Raising & Financing Advisory",
    description:
      "Support equity and debt raising, structured finance, project finance and investor strategy, including identification and evaluation of suitable capital sources.",
    icon: "capital",
    metrics: [
      [FiUsers, "Investor Access", "120+"],
      [FiBarChart2, "Capital Raised", "$2.8B"],
      [FiTarget, "Success Rate", "85%"],
    ],
  },
  {
    number: "03",
    tone: "cyan",
    title: "Investment & Financial Strategy",
    description:
      "Develop investment strategies, financial models, return analysis and capital allocation strategies to optimize project economics and overall investment outcomes.",
    icon: "strategy",
    metrics: [
      [FiTrendingUp, "IRR Improvement", "25%+"],
      [FiTarget, "Model Accuracy", "96%"],
      [FiPieChart, "Outcome Impact", "High"],
    ],
  },
];

function WorldMap() {
  const nodes = [
    [78, 95],
    [119, 55],
    [160, 126],
    [325, 116],
    [411, 97],
    [461, 137],
    [502, 76],
    [548, 89],
  ];

  return (
    <svg
      className="dsca-world"
      viewBox="0 0 620 220"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="dsca-dots"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.25" />
        </pattern>
      </defs>

      <path d="M36 75 63 45l48-13 31 18 21-8 24 19-16 25-29 3-21 28-36-8-20-24zm171-31 50-20 62 7 31-13 76 12 28 27-20 19-45-8-29 17-37-7-22 19-32-22-38-3-24-18zm130 70 43-17 35 12 9 30-31 31-43-7-25-24zm116-34 36-12 55 15 29 26-22 16-39-12-34 8-22-19z" />

      <g className="dsca-routes">
        <path d="M78 95Q205 10 325 116T548 89" />
        <path d="M119 55Q280 195 502 76" />
        <path d="M160 126Q311 37 461 137" />
      </g>

      {nodes.map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}-${index}`}
          cx={cx}
          cy={cy}
          r="3"
          className="dsca-node"
        />
      ))}
    </svg>
  );
}

function CapabilityArt({ type }) {
  if (type === "capital") {
    return (
      <div
        className="dsca-art dsca-capital-art"
        aria-hidden="true"
      >
        <span className="dsca-dollar">$</span>
        <i />
        <i />
        <i />
      </div>
    );
  }

  if (type === "strategy") {
    return (
      <div
        className="dsca-art dsca-strategy-art"
        aria-hidden="true"
      >
        <span className="dsca-pie" />
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  }

  return (
    <div
      className="dsca-art dsca-block-art"
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />

      <span>
        <FiTrendingUp />
      </span>
    </div>
  );
}

function PulsePanel() {
  const bars = [
    18, 30, 12, 38, 25, 47, 16,
    36, 28, 52, 31, 43, 25, 58,
  ];

  return (
    <div className="dsca-pulse">
      <div className="dsca-pulse-head">
        <div>
          <span>LIVE INTELLIGENCE</span>
          <strong>Global Capital Pulse</strong>
        </div>

        <FiTrendingUp aria-hidden="true" />
      </div>

      <div className="dsca-pulse-stats">
        <span>
          Active Deals
          <b>1,245</b>
        </span>

        <span>
          Capital Deployed
          <b>$ 8.64B</b>
        </span>

        <span>
          Success Rate
          <b>85%</b>
        </span>
      </div>

      <div
        className="dsca-bars"
        aria-hidden="true"
      >
        {bars.map((height, index) => (
          <i
            key={`${height}-${index}`}
            style={{ height }}
            className={
              index > 10
                ? "hot"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({
  item,
  index,
  onExplore,
}) {
  return (
    <article
      className={`dsca-card dsca-${item.tone}`}
    >
      <div className="dsca-number">
        {item.number || String(index + 1).padStart(2, "0")}
      </div>

      <div className="dsca-card-main">
        <CapabilityArt type={item.icon} />

        <div className="dsca-card-copy">
          <h3>{item.title}</h3>

          <span
            className="dsca-rule"
            aria-hidden="true"
          />

          <p>{item.description}</p>
        </div>
      </div>

      <div
        className="dsca-metrics"
        aria-label={`${item.title} metrics`}
      >
        {item.metrics.map(([Icon, label, value]) => (
          <div
            className="dsca-metric"
            key={label}
          >
            <span className="dsca-metric-label">
              <Icon aria-hidden="true" />
              {label}
            </span>

            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="dsca-explore"
        aria-label={`Explore ${item.title}`}
        onClick={() =>
          onExplore?.(
            item,
            index
          )
        }
      >
        <span>Explore capability</span>
        <FiArrowRight aria-hidden="true" />
      </button>
    </article>
  );
}

export function DealStructuringCapitalAdvisoryModal({
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
      dialogClassName="dsca-dialog d4-right-panel-dialog"
      contentClassName={`dsca-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"
        }`}
      backdropClassName="dsca-backdrop d4-right-panel-backdrop"
    >
      <RightPanelModalHeader
        eyebrow="05 / 07 · DEAL STRUCTURING & CAPITAL ADVISORY"
        title="Structure stronger deals and smarter capital."
        subtitle="Integrated transaction, financing and investment advisory to optimize risk and returns."
        onHide={onHide}
        ariaLabel="Close Deal Structuring & Capital Advisory"
      />

      <Modal.Body className="dsca-body d4-right-panel-body">
        <section
          className="dsca-section"
          aria-label="Deal Structuring and Capital Advisory capabilities"
        >
          <div className="dsca-top">
            <WorldMap />
            <PulsePanel />
          </div>

          <div className="dsca-grid">
            {capabilities.map((item, index) => (
              <CapabilityCard
                key={item.title}
                item={item}
                index={index}
                onExplore={onExplore}
              />
            ))}
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
}
