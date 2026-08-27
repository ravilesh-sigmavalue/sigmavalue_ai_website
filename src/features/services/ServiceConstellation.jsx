import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { AgentPlatformModal } from "./modals/agent-platform/AgentPlatformModal";
import { EnterpriseAIModal } from "./modals/enterprise-ai/EnterpriseAIModal";
import { CrossIndustryModal } from "./modals/cross-industry/CrossIndustryModal";
import { RealEstateTechnologyModal } from "./modals/real-estate-technology/RealEstateTechnologyModal";
import { DealStructuringCapitalAdvisoryModal } from "./modals/deal-structuring/DealStructuringCapitalAdvisoryModal";
import { StrategicTransactionModal } from "./modals/strategic-transaction/StrategicTransactionModal";
import { ServicesAdvisoryModal } from "./modals/services-advisory/ServicesAdvisoryModal";
import { agentGroups } from "./data/agentGroups";
import {
  crossIndustrySolutions, dealStructuringSolutions, realEstateTechnologySolutions,
  servicesAdvisorySolutions, strategicTransactionSolutions,
} from "./data/serviceSolutions";

export { agentGroups } from "./data/agentGroups";
export {
  crossIndustrySolutions, dealStructuringSolutions, realEstateTechnologySolutions,
  servicesAdvisorySolutions, strategicTransactionSolutions,
} from "./data/serviceSolutions";

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
                backgroundImage: `linear-gradient(135deg, rgba(8,14,26,.15), rgba(8,14,26,.9)), url('/branding/sigmavalue-wordmark.jpeg')`,
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
