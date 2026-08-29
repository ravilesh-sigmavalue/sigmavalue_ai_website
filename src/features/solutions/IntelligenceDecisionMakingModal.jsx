import {
  FiActivity,
  FiBarChart2,
  FiCompass,
  FiDatabase,
  FiMapPin,
  FiPieChart,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";

import "./IntelligenceDecisionMakingModal.css";

const INTELLIGENCE_MODULES = [
  {
    // number: "04",
    position: "north",
    type: "market",
    eyebrow: "REAL-TIME MARKET SIGNALS",
    title: "Market & Data Intelligence",
    description:
      "Providing real-time market intelligence by combining market research, transaction data, live signals, analytics and dashboards to identify demand, supply, pricing trends, patterns and actionable business insights.",
    icon: FiBarChart2,
    tags: [
      "Market Research",
      "Transaction Data",
      "Live Signals",
      "Analytics",
    ],
  },
  {
    // number: "05",
    position: "west",
    type: "geo",
    eyebrow: "SPATIAL INTELLIGENCE",
    title: "Geo-Spatial & Location Intelligence",
    description:
      "Using GIS, spatial data and location intelligence to analyze land, properties, catchments, infrastructure, terrain and surrounding developments to support better site selection and location-based decisions.",
    icon: FiMapPin,
    tags: [
      "GIS",
      "Catchment",
      "Infrastructure",
      "Terrain",
    ],
  },
  {
    // number: "06",
    position: "east",
    type: "feasibility",
    eyebrow: "DEVELOPMENT INTELLIGENCE",
    title: "Project Feasibility & Development Intelligence",
    description:
      "Evaluating project potential through integrated valuation, techno-economic feasibility, catchment intelligence and development feasibility to assess regulations, development potential, market demand, product mix, pricing, revenues, financial returns and project risks.",
    icon: FiTarget,
    tags: [
      "Valuation",
      "Product Mix",
      "Returns",
      "Project Risk",
    ],
  },
  {
    // number: "07",
    position: "south",
    type: "portfolio",
    eyebrow: "INVESTMENT INTELLIGENCE",
    title: "Investment & Portfolio Intelligence",
    description:
      "Helping investors, developers and asset owners monitor portfolios, analyze asset performance, assess risks and returns, identify value-creation opportunities and make better investment and portfolio management decisions.",
    icon: FiPieChart,
    tags: [
      "Portfolio Monitoring",
      "Asset Performance",
      "Risk & Return",
      "Value Creation",
    ],
  },
];

function IntelligenceVisual({ type }) {
  if (type === "market") {
    return (
      <div className="idm-mini idm-mini--market">
        <div className="idm-market-bars">
          <i style={{ height: "32%" }} />
          <i style={{ height: "48%" }} />
          <i style={{ height: "42%" }} />
          <i style={{ height: "68%" }} />
          <i style={{ height: "78%" }} />
          <i style={{ height: "88%" }} />
        </div>

        <div className="idm-market-line">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="idm-mini-signal">
          <FiTrendingUp />
          LIVE
        </div>
      </div>
    );
  }

  if (type === "geo") {
    return (
      <div className="idm-mini idm-mini--geo">
        <div className="idm-map-grid" />

        <div className="idm-geo-ring idm-geo-ring--one" />
        <div className="idm-geo-ring idm-geo-ring--two" />

        <div className="idm-geo-pin">
          <FiMapPin />
        </div>

        <span className="idm-geo-point idm-geo-point--one" />
        <span className="idm-geo-point idm-geo-point--two" />
        <span className="idm-geo-point idm-geo-point--three" />
      </div>
    );
  }

  if (type === "feasibility") {
    return (
      <div className="idm-mini idm-mini--feasibility">
        <div className="idm-feasibility-ring">
          <div>
            <strong>IRR</strong>
            <span>OPTIMIZE</span>
          </div>
        </div>

        <div className="idm-feasibility-metrics">
          <span>
            <small>DEMAND</small>
            <b>82</b>
          </span>

          <span>
            <small>RETURN</small>
            <b>74</b>
          </span>

          <span>
            <small>RISK</small>
            <b>28</b>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="idm-mini idm-mini--portfolio">
      <div className="idm-portfolio-ring">
        <div />
      </div>

      <div className="idm-portfolio-bars">
        <i style={{ width: "78%" }} />
        <i style={{ width: "62%" }} />
        <i style={{ width: "88%" }} />
      </div>

      <div className="idm-mini-signal">
        <FiActivity />
        PORTFOLIO
      </div>
    </div>
  );
}

export function IntelligenceDecisionMakingModal({
  show,
  onRequestDemo,
}) {
  if (!show) return null;

  return (
    <div className="idm-overlay">
      <div className="idm-grid-bg" />
      <div className="idm-glow idm-glow--one" />
      <div className="idm-glow idm-glow--two" />

      <div className="idm-scroll">
        <section className="idm-hero">
          <div className="idm-kicker">
            <span />
            INTELLIGENCE & DECISION-MAKING
          </div>

          <h1>
            Turn Complex Data Into
            <span> Confident Decisions.</span>
          </h1>

          <p>
            A connected intelligence layer that combines market,
            location, feasibility and portfolio insights to support
            faster, smarter and more informed real estate decisions.
          </p>
        </section>

        <section className="idm-command-section">
          <div className="idm-command-label">
            INTELLIGENCE COMMAND CENTER
          </div>

          <div className="idm-orbit-stage">
            <div className="idm-orbit-ring idm-orbit-ring--outer" />
            <div className="idm-orbit-ring idm-orbit-ring--inner" />

            <span className="idm-beam idm-beam--north" />
            <span className="idm-beam idm-beam--east" />
            <span className="idm-beam idm-beam--south" />
            <span className="idm-beam idm-beam--west" />

            <div className="idm-decision-core">
              <div className="idm-core-pulse" />

              <div className="idm-core-icon">
                <FiCompass />
              </div>

              <span>CONNECTED</span>

              <strong>
                DECISION
                <br />
                INTELLIGENCE
              </strong>

              <small>
                Market · Spatial · Feasibility · Portfolio
              </small>
            </div>

            {INTELLIGENCE_MODULES.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={`idm-module idm-module--${item.position}`}
                >
                  <div className="idm-module-top">
                    <div className="idm-module-number">
                      {item.number}
                    </div>

                    <div className="idm-module-icon">
                      <Icon />
                    </div>

                    <span>
                      {item.eyebrow}
                    </span>
                  </div>

                  <h2>
                    {item.title}
                  </h2>

                  <p>
                    {item.description}
                  </p>

                  <IntelligenceVisual type={item.type} />

                  <div className="idm-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="idm-decision-strip">
          <div className="idm-decision-strip-icon">
            <FiDatabase />
          </div>

          <div>
            <span>
              ONE CONNECTED INTELLIGENCE LAYER
            </span>

            <h2>
              See the market. Understand the location.
              Test the project. Manage the investment.
            </h2>
          </div>

          <button
            type="button"
            onClick={onRequestDemo}
          >
            Explore Decision Intelligence
            <FiTrendingUp />
          </button>
        </section>
      </div>
    </div>
  );
}