import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { AgentPlatformModal } from "./AgentPlatformModal";
import { EnterpriseAIModal } from "./EnterpriseAIModal";
import { CrossIndustryModal } from "./CrossIndustryModal";
import { RealEstateTechnologyModal } from "./RealEstateTechnologyModal";
import { DealStructuringCapitalAdvisoryModal } from "./DealStructuringCapitalAdvisoryModal";
import { StrategicTransactionModal } from "./StrategicTransactionModal";
import { ServicesAdvisoryModal } from "./ServicesAdvisoryModal";
import {
  FiCompass, FiDatabase, FiDollarSign, FiGitMerge,
  FiLayers, FiPieChart, FiRefreshCw, FiTrendingUp, FiZap,
} from "react-icons/fi";

/* ============================================================
   AGENT GROUPS (used by modal + chips)
   ============================================================ */
export const agentGroups = [
  {
    name: "SigmaValue", type: "Valuation Intelligence", agents: [
      ["Valuation Agent", "AI-powered property valuation using comparable transactions, market data and valuation models."],
      ["Valuation B2C", "Consumer-focused property valuation providing quick, accessible estimates of residential value."],
    ],
  },
  {
    name: "SigmaMarket Lens", type: "Market Intelligence", agents: [
      ["Market Research Agent", "Automated real estate market research covering demand, supply, pricing and market dynamics."],
      ["Transaction Intelligence Agent", "Analyzes transactions to identify comparable deals, pricing patterns and investment signals."],
      ["Live Data Intelligence Agent", "Captures and interprets live market data to provide up-to-date real estate intelligence."],
      ["Analytics Agent", "Converts data into actionable insights, dashboards and decision-support analytics."],
      ["Data Dashboard", "Brings market data, performance indicators and insights into one visual workspace."],
    ],
  },
  {
    name: "SigmaGeo", type: "Geo-Spatial Intelligence", agents: [
      ["Land/GIS Agent", "Identifies land parcels using GIS, location intelligence and spatial data analysis."],
      ["Elevation Agent", "Analyzes terrain, elevation and topography to assess site development characteristics."],
    ],
  },
  {
    name: "SigmaFeasibility", type: "Simulator", agents: [
      ["Feasibility Agent", "Evaluates development potential across regulations, product mix, revenue and project risks."],
      ["Legal Intelligence Agent", "Analyzes real estate laws, regulations and legal requirements for properties."],
      ["Document Intelligence Agent", "Extracts and summarizes information from property, legal and transaction documents."],
    ],
  },
  {
    name: "SigmaPhysical", type: "Physical AI", agents: [
      ["Physical AI Agent", "Uses computer vision to analyze properties, sites and construction progress."],
    ],
  },
  {
    name: "SigmaPortfolio", type: "Investment & Portfolio Intelligence", agents: [
      ["Portfolio Management Agent", "Monitors portfolios, asset performance, cash flows, risks and investment outcomes."],
      ["Value Creation Agent", "Identifies opportunities to improve asset performance and unlock real estate value."],
      ["Autonomous Relationship Agent", "Automates relationship management with investors, customers and stakeholders."],
    ],
  },
  {
    name: "SigmaREOS", type: "Real Estate Operations", agents: [
      ["Autonomous Real Estate ERP Agent", "Automates core real estate business processes and operational activities."],
      ["Property Management Agent", "Manages occupancy, tenants, maintenance and collections across properties."],
      ["Project Management Agent", "Plans and tracks real estate projects, tasks, timelines and resources."],
    ],
  },
  {
    name: "SigmaWorkspace", type: "AI Workspace & Automation", agents: [
      ["Generative Interface Agent", "Enables natural-language interaction to create insights, workflows and solutions."],
      ["Solution Engine", "Converts business requirements into AI-powered workflows, reports and solutions."],
      ["Connector Agent", "Connects SigmaValue with enterprise systems, data sources and external tools."],
      ["Collaborator Agent", "Enables teams to collaborate, share information and coordinate workflows."],
    ],
  },
];

/* ============================================================
   OTHER SOLUTION SETS (used by other modals)
   ============================================================ */
export const crossIndustrySolutions = [
  { title: "Agentic AI Strategy & Use Case Discovery", text: "Identify high-value opportunities, assess AI readiness, prioritize use cases and develop an enterprise agentic AI roadmap.", icon: FiCompass },
  { title: "Agent & Workflow Design", text: "Design customized AI agents, multi-agent systems and autonomous workflows aligned with specific business functions and processes.", icon: FiLayers },
  { title: "Agentic AI Implementation & Integration", text: "Build, deploy and integrate AI agents with existing enterprise applications, data sources, APIs and workflows.", icon: FiGitMerge },
  { title: "AI Transformation & Continuous Optimization", text: "Scale agentic AI across functions, monitor performance, establish governance and continuously optimize AI-driven operations.", icon: FiTrendingUp },
];

export const realEstateTechnologySolutions = [
  { title: "Real Estate Digital Transformation", text: "Digitize and automate real estate processes across acquisition, development, sales, leasing, property management and project management.", icon: FiRefreshCw },
  { title: "Real Estate Data, AI & Intelligence", text: "Implement AI, automation, GIS, data platforms, analytics and decision intelligence to improve operational efficiency and business decisions.", icon: FiDatabase },
  { title: "Technology Integration & Platform Modernization", text: "Modernize legacy systems and integrate ERP, CRM, GIS, PMS, financial systems and other enterprise applications into a connected digital ecosystem.", icon: FiZap },
];

export const dealStructuringSolutions = [
  { title: "Transaction & Deal Structuring", text: "Advise on transaction structures, joint ventures, partnerships, acquisitions, development arrangements and commercial terms to optimize risk and returns.", icon: FiGitMerge },
  { title: "Capital Raising & Financing Advisory", text: "Support equity and debt raising, structured finance, project finance and investor strategy, including identification and evaluation of suitable capital sources.", icon: FiDollarSign },
  { title: "Investment & Financial Strategy", text: "Develop investment strategies, financial models, return analysis and capital allocation strategies to optimize project economics and overall investment outcomes.", icon: FiPieChart },
];

export const strategicTransactionSolutions = [
  { title: "Transaction Strategy & Evaluation", text: "Assess acquisition, divestment, joint venture and partnership opportunities through commercial, financial and strategic evaluation.", icon: FiTrendingUp },
  { title: "Due Diligence & Transaction Structuring", text: "Support business, financial, market and operational due diligence, valuation, deal structuring and negotiation of transaction terms.", icon: FiDatabase },
  { title: "Transaction Execution & Closure", text: "Coordinate stakeholders and provide end-to-end support through negotiations, documentation, approvals, closing and post-transaction integration.", icon: FiGitMerge },
];

export const servicesAdvisorySolutions = [
  { title: "Valuation", text: "Independent, data-backed valuation of properties, land, projects and real estate portfolios using market evidence, comparable transactions and financial analysis.", icon: FiDollarSign },
  { title: "TEV", text: "Techno-Economic Viability assessment covering technical feasibility, market potential, project economics, risks and the overall commercial viability of a development.", icon: FiTrendingUp },
  { title: "Catchment Intelligence (MMA)", text: "Micro-market and catchment analysis covering demand, supply, demographics, pricing, competition, infrastructure and location-driven market opportunities.", icon: FiCompass },
  { title: "Feasibility", text: "Integrated development feasibility analysis across regulations, product mix, pricing, revenue, costs, returns, scenarios and project risks.", icon: FiPieChart },
];

/* ============================================================
   AGENT STATUS MAP  (link exists = active, null = dev)
   ============================================================ */
const agentStatus = {
  "Valuation Agent":                  "active",
  "Valuation B2C":                    "active",
  "Market Research Agent":            "active",
  "Transaction Intelligence Agent":   "active",
  "Live Data Intelligence Agent":     "active",
  "Analytics Agent":                  "dev",
  "Data Dashboard":                   "dev",
  "Land/GIS Agent":                   "active",
  "Elevation Agent":                  "active",
  "Feasibility Agent":                "active",
  "Legal Intelligence Agent":         "dev",
  "Document Intelligence Agent":      "active",
  "Physical AI Agent":                "dev",
  "Portfolio Management Agent":       "active",
  "Value Creation Agent":             "dev",
  "Autonomous Relationship Agent":    "dev",
  "Autonomous Real Estate ERP Agent": "dev",
  "Property Management Agent":        "dev",
  "Project Management Agent":         "dev",
  "Generative Interface Agent":       "dev",
  "Solution Engine":                  "dev",
  "Connector Agent":                  "active",
  "Collaborator Agent":               "active",
};

/* All agents flat list */
const allAgents = agentGroups.flatMap((g) =>
  g.agents.map(([name]) => ({
    name,
    system: g.name,
    status: agentStatus[name] || "dev",
  }))
);

/* ============================================================
   CHIP POSITIONS  (relative to card center, in px)
   Laid out to fan around the card like the reference image.
   ============================================================ */
const chipPositions = [
  // LEFT side fan
  { x: -195, y: -85 },
  { x: -155, y: -38 },
  { x: -200, y:  14 },
  { x: -148, y:  62 },
  { x: -195, y: 110 },
  // RIGHT side fan
  { x:  195, y: -80 },
  { x:  150, y: -32 },
  { x:  198, y:  18 },
  { x:  148, y:  68 },
  { x:  196, y: 116 },
  // BOTTOM row
  { x:  -70, y: 148 },
  { x:   20, y: 156 },
  { x:  110, y: 148 },
  // TOP row
  { x:  -55, y: -96 },
  { x:   55, y: -102 },
];

/* ============================================================
   AGENT CHIPS OVERLAY COMPONENT
   ============================================================ */
function AgentChips({ visible, cardPos }) {
  const chips = allAgents.slice(0, chipPositions.length);
  // If the card is on the right side of the screen, mirror the x positions
  const flipX = cardPos === "right";

  return (
    <div className="agent-chips-overlay" aria-hidden="true">
      {chips.map(({ name, status }, i) => {
        const raw = chipPositions[i];
        const x = flipX ? -raw.x : raw.x;
        const y = raw.y;
        return (
          <div
            key={name}
            className={`agent-chip agent-chip-${status}`}
            style={{
              left: "50%",
              top: "50%",
              transitionDelay: visible ? `${i * 55}ms` : "0ms",
              opacity: visible ? 1 : 0,
              transform: visible
                ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                : `translate(calc(-50% + ${x * 0.4}px), calc(-50% + ${y * 0.4}px)) scale(0.5)`,
            }}
          >
            <span className="chip-dot" />
            <div className="chip-body">
              <span className="chip-name">{name}</span>
              <span className={`chip-status chip-status-${status}`}>
                {status === "active" ? "● ACTIVE" : "◈ IN DEVELOPMENT"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   CONSTELLATION LAYOUT SLOTS
   ============================================================ */
const slots = [
  { side: "left",  top: 16 }, { side: "right", top: 16 },
  { side: "left",  top: 35 }, { side: "right", top: 35 },
  { side: "left",  top: 56 }, { side: "right", top: 56 },
  { side: "left",  top: 75 }, { side: "right", top: 75 },
];

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export function ServiceConstellation({ chapters, active, theme }) {
  const serviceCards = (chapters?.filter((card) => card.key === "ch") || []).map(
    (card, index) => ({
      ...card,
      pos: slots[index]?.side || (index % 2 === 0 ? "left" : "right"),
      top: `${slots[index]?.top ?? 16}%`,
    })
  );

  const getActiveCardIndex = () =>
    Math.max(0, Math.min(serviceCards.length - 1, (active ?? 1) - 1));

  const [activeCard, setActiveCard] = useState(getActiveCardIndex);
  const [agentModal,                setAgentModal]                = useState(false);
  const [enterpriseModal,           setEnterpriseModal]           = useState(false);
  const [crossIndustryModal,        setCrossIndustryModal]        = useState(false);
  const [realEstateTechnologyModal, setRealEstateTechnologyModal] = useState(false);
  const [dealStructuringModal,      setDealStructuringModal]      = useState(false);
  const [strategicTransactionModal, setStrategicTransactionModal] = useState(false);
  const [servicesAdvisoryModal,     setServicesAdvisoryModal]     = useState(false);

  useEffect(() => {
    setActiveCard(getActiveCardIndex());
  }, [active, serviceCards.length]);

  return (
    <div className="service-constellation" aria-label="SigmaValue Services Ecosystem">
      {serviceCards.map((card, index) => {
        const isResolved   = index < activeCard;
        const isActivating = index === activeCard;
        const isDormant    = index > activeCard;
        const stateClass   = isDormant
          ? "dormant"
          : isActivating
          ? "activating"
          : isResolved
          ? "resolved"
          : "";

        /* Show chips only for card 0 when it's active or resolved */
        const showChips = index === 0 && (isActivating || isResolved);

        return (
          <article
            key={card.title}
            className={`orbit-service-card ${card.pos} ${stateClass}`}
            style={{
              "--slot-top": card.top,
              "--start-rotation": card.pos === "left" ? "-84deg" : "84deg",
            }}
            onClick={() => setActiveCard(index)}
          >
            {/* Background image */}
            <div
              className="orbit-card-image"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(8,14,26,.15), rgba(8,14,26,.9)), url('/FINAL LOGO.jpeg')`,
              }}
            />

            {/* Card text content */}
            <div className="orbit-card-content">
              <span>
                {String(index + 1).padStart(2, "0")} / 08 · {card.cat}
              </span>
              <h2>{card.title.replace("\n", " ")}</h2>
              <p>{card.desc}</p>

              {index === 0 && (
                <button
                  type="button"
                  className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setAgentModal(true); }}
                >
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 1 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setEnterpriseModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 2 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setCrossIndustryModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 3 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setRealEstateTechnologyModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 4 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setDealStructuringModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 5 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setStrategicTransactionModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
              {index === 6 && (
                <button type="button" className="orbit-explore"
                  onClick={(e) => { e.stopPropagation(); setServicesAdvisoryModal(true); }}>
                  Explore More <FiArrowUpRight />
                </button>
              )}
            </div>

            {/* Agent chips — only on card 0 */}
            {index === 0 && (
              <AgentChips visible={showChips} cardPos={card.pos} />
            )}
          </article>
        );
      })}

      {/* Status ticker */}
      <div className="constellation-status">
        <span>{String(activeCard + 1).padStart(2, "00")}</span>
        <i />
        <b>07 SERVICES RESOLVING</b>
      </div>

      {/* Modals */}
      <AgentPlatformModal
        show={agentModal}
        onHide={() => setAgentModal(false)}
        groups={agentGroups}
        theme={theme}
      />
      <EnterpriseAIModal
        show={enterpriseModal}
        onHide={() => setEnterpriseModal(false)}
        variant="connected"
        theme={theme}
      />
      <CrossIndustryModal
        show={crossIndustryModal}
        onHide={() => setCrossIndustryModal(false)}
        solutions={crossIndustrySolutions}
        theme={theme}
      />
      <RealEstateTechnologyModal
        show={realEstateTechnologyModal}
        onHide={() => setRealEstateTechnologyModal(false)}
        theme={theme}
      />
      <DealStructuringCapitalAdvisoryModal
        show={dealStructuringModal}
        onHide={() => setDealStructuringModal(false)}
        theme={theme}
      />
      <StrategicTransactionModal
        show={strategicTransactionModal}
        onHide={() => setStrategicTransactionModal(false)}
        theme={theme}
      />
      <ServicesAdvisoryModal
        show={servicesAdvisoryModal}
        onHide={() => setServicesAdvisoryModal(false)}
        theme={theme}
      />
    </div>
  );
}
