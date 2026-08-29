import {
  FiArrowRight,
  FiBriefcase,
  FiCheckCircle,
  FiDollarSign,
  FiLayers,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

import "./StrategicAdvisoryModal.css";

const ADVISORY_FLOW = [
  {
    // number: "01",
    title: "Transaction Evaluation",
    description:
      "Evaluate opportunities, transaction economics, strategic fit and potential investment outcomes.",
    icon: FiTarget,
  },
  {
    // number: "02",
    title: "Acquisitions & Joint Ventures",
    description:
      "Assess acquisition opportunities and structure strategic joint venture partnerships.",
    icon: FiUsers,
  },
  {
    // number: "03",
    title: "Due Diligence",
    description:
      "Analyze commercial, financial, market and transaction considerations before commitment.",
    icon: FiSearch,
  },
  {
    // number: "04",
    title: "Deal Structuring",
    description:
      "Design transaction structures aligned with business objectives, risks and expected returns.",
    icon: FiLayers,
  },
  {
    //  number: "05",
    title: "Capital & Financing",
    description:
      "Support capital raising, financing strategy and funding structures for transactions and projects.",
    icon: FiDollarSign,
  },
  {
    // number: "06",
    title: "Investment Strategy",
    description:
      "Develop investment strategies focused on risk-adjusted returns and long-term value creation.",
    icon: FiTrendingUp,
  },
];

export function StrategicAdvisoryModal({
  show,
  onRequestDemo,
}) {
  if (!show) return null;

  return (
    <div className="sa-overlay">
      <div className="sa-grid" />

      <div className="sa-glow sa-glow--left" />
      <div className="sa-glow sa-glow--right" />

      <div className="sa-scroll">

        <section className="sa-hero">
          <div className="sa-kicker">
            <span />
            STRATEGIC ADVISORY
          </div>

          <h1>
            Structure Better Deals.
            <span> Deploy Capital Smarter.</span>
          </h1>

          <p>
            Supporting clients with transaction evaluation, acquisitions,
            joint ventures, due diligence, deal structuring, capital raising,
            financing and investment strategy to optimize transaction
            outcomes and investment returns.
          </p>
        </section>

        <section className="sa-deal-room">

          <div className="sa-deal-room-heading">
            <span>TRANSACTION & CAPITAL ADVISORY</span>

            <h2>
              From opportunity assessment to capital deployment.
            </h2>
          </div>

          <div className="sa-flow">

            <div className="sa-flow-line" />

            <div className="sa-advisory-core">
              <div className="sa-core-ring" />

              <div className="sa-core-icon">
                <FiBriefcase />
              </div>

              <span>ADVISORY CORE</span>

              <strong>
                Transaction
                <br />
                & Capital
              </strong>

              <small>
                Strategy · Structure · Returns
              </small>
            </div>

            {ADVISORY_FLOW.map((item, index) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className={`sa-flow-item sa-flow-item--${index + 1}`}
                >
                  <div className="sa-flow-number">
                    {item.number}
                  </div>

                  <div className="sa-flow-icon">
                    <Icon />
                  </div>

                  <div className="sa-flow-copy">
                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>
                  </div>

                  <FiCheckCircle className="sa-flow-check" />
                </article>
              );
            })}

          </div>

        </section>

        <section className="sa-outcome">

          <div className="sa-outcome-copy">
            <span>
              OPTIMIZE TRANSACTION OUTCOMES
            </span>

            <h2>
              Align strategy, structure and capital around better returns.
            </h2>

            <p>
              Our advisory approach connects transaction analysis,
              deal structuring, financing and investment strategy into
              one integrated decision framework.
            </p>
          </div>

          <div className="sa-outcome-metrics">

            <div>
              <strong>Evaluate</strong>
              <span>Opportunity & Risk</span>
            </div>

            <i />

            <div>
              <strong>Structure</strong>
              <span>Deal & Capital</span>
            </div>

            <i />

            <div>
              <strong>Optimize</strong>
              <span>Returns & Outcomes</span>
            </div>

          </div>

          <button
            type="button"
            className="sa-cta"
            onClick={onRequestDemo}
          >
            Discuss a Transaction
            <FiArrowRight />
          </button>

        </section>

      </div>
    </div>
  );
}