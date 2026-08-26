import { Modal } from "react-bootstrap";
import { FiArrowRight, FiBarChart2, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUsers, FiX } from "react-icons/fi";
import "../DealStructuringCapitalAdvisoryModal.css";

const capabilities = [
  {
    // number: "01",
    tone: "cyan",
    title: "Transaction & Deal Structuring",
    description: "Advise on transaction structures, joint ventures, partnerships, acquisitions, development arrangements and commercial terms to optimize risk and returns.",
    icon: "blocks",
    metrics: [
      [FiShield, "Risk Optimized", "98%"],
      [FiTrendingUp, "Value Creation", "2.4x"],
      [FiTarget, "Execution Speed", "40%"],
    ],
  },
  {
    // number: "02",
    tone: "orange",
    title: "Capital Raising & Financing Advisory",
    description: "Support equity and debt raising, structured finance, project finance and investor strategy, including identification and evaluation of suitable capital sources.",
    icon: "capital",
    metrics: [
      [FiUsers, "Investor Access", "120+"],
      [FiBarChart2, "Capital Raised", "$2.8B"],
      [FiTarget, "Success Rate", "85%"],
    ],
  },
  {
    // number: "03",
    tone: "blue",
    title: "Investment & Financial Strategy",
    description: "Develop investment strategies, financial models, return analysis and capital allocation strategies to optimize project economics and overall investment outcomes.",
    icon: "strategy",
    metrics: [
      [FiTrendingUp, "IRR Improvement", "25%+"],
      [FiTarget, "Model Accuracy", "96%"],
      [FiPieChart, "Outcome Impact", "High"],
    ],
  },
];

function WorldMap() {
  return (
    <svg className="dsca-world" viewBox="0 0 620 220" aria-hidden="true">
      <defs><pattern id="dsca-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.25" /></pattern></defs>
      <path d="M36 75 63 45l48-13 31 18 21-8 24 19-16 25-29 3-21 28-36-8-20-24zm171-31 50-20 62 7 31-13 76 12 28 27-20 19-45-8-29 17-37-7-22 19-32-22-38-3-24-18zm130 70 43-17 35 12 9 30-31 31-43-7-25-24zm116-34 36-12 55 15 29 26-22 16-39-12-34 8-22-19z" />
      <g className="dsca-routes"><path d="M78 95Q205 10 325 116T548 89" /><path d="M119 55Q280 195 502 76" /><path d="M160 126Q311 37 461 137" /></g>
      {[78, 119, 160, 325, 411, 461, 502, 548].map((x, i) => <circle key={x} cx={x} cy={[95, 55, 126, 116, 97, 137, 76, 89][i]} r="3" className="dsca-node" />)}
    </svg>
  );
}

function CapabilityArt({ type }) {
  if (type === "capital") return <div className="dsca-art dsca-capital-art"><span className="dsca-dollar">$</span><i /><i /><i /><b /></div>;
  if (type === "strategy") return <div className="dsca-art dsca-strategy-art"><span className="dsca-pie" /><i /><i /><i /><i /></div>;
  return <div className="dsca-art dsca-block-art"><i /><i /><i /><i /><span><FiTrendingUp /></span></div>;
}

function PulsePanel() {
  const bars = [18, 30, 12, 38, 25, 47, 16, 36, 28, 52, 31, 43, 25, 58];
  return (
    <div className="dsca-pulse">
<div className="dsca-pulse-head">

  <div>
    <span>LIVE INTELLIGENCE</span>
    
    <strong>Global Capital Pulse</strong>
  </div>

  <FiTrendingUp />

</div>      <div className="dsca-pulse-stats"><span>Active Deals<b>1,245</b></span><span>Capital Deployed<b>$ 8.64B</b></span><span>Success Rate<b>85%</b></span></div>
      <div className="dsca-bars">{bars.map((height, i) => <i key={i} style={{ height }} className={i > 10 ? "hot" : ""} />)}</div>
    </div>
  );
}

function CapabilityCard({ item }) {
  return (
    <article className={`dsca-card dsca-${item.tone}`}>

      {/* CARD HEADER */}
      <div className="dsca-card-header">

        {/* <span className="dsca-number">
          {item.number}
        </span> */}

        {/* <span className="dsca-card-status">
          ACTIVE
        </span> */}

      </div>


      {/* MAIN CONTENT */}
      <div className="dsca-card-main">

        <CapabilityArt type={item.icon} />

        <div className="dsca-card-copy">

          <h3>
            {item.title}
          </h3>

          <span className="dsca-rule" />

          <p>
            {item.description}
          </p>

        </div>

      </div>


      {/* KPI SECTION */}
      <div className="dsca-metrics">

        {item.metrics.map(
          ([Icon, label, value]) => (

            <div
              className="dsca-metric"
              key={label}
            >

              <span className="dsca-metric-label">
                <Icon />
                {label}
              </span>

              <strong>
                {value}
              </strong>

            </div>

          )
        )}

      </div>


      {/* EXPLORE */}
      <button
        type="button"
        className="dsca-explore"
      >

        <span>
          Explore capability
        </span>

        <FiArrowRight />

      </button>

    </article>
  );
}

export function DealStructuringCapitalAdvisoryModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered size="xl" dialogClassName="dsca-dialog d4-right-panel-dialog" contentClassName="dsca-modal" backdropClassName="dsca-backdrop d4-right-panel-backdrop">
      <section className="dsca-section" aria-labelledby="dsca-title">
        <button type="button" className="dsca-close" onClick={onHide} aria-label="Close"><FiX /></button>
        <div className="dsca-top">
          <div className="dsca-heading"><div>DEAL STRUCTURING &amp; CAPITAL ADVISORY</div><h2 id="dsca-title">Structure stronger deals and <span>smarter capital.</span></h2><p>Integrated transaction, financing and investment advisory<br />designed to optimize risk, returns and project economics.</p><i /></div>
          <WorldMap />
          <PulsePanel />
        </div>
        <div className="dsca-grid">{capabilities.map((item) => <CapabilityCard key={item.number} item={item} />)}</div>
      </section>
    </Modal>
  );
}
