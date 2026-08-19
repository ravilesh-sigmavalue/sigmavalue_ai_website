import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { AgentPlatformModal } from "./AgentPlatformModal";
import { EnterpriseAIModal } from "./EnterpriseAIModal";
import { FiCompass, FiDatabase, FiDollarSign, FiGitMerge, FiLayers, FiPieChart, FiRefreshCw, FiTrendingUp, FiZap } from "react-icons/fi";

export const agentGroups = [
  {
    name: "SigmaValue", type: "Valuation Intelligence", agents: [
      ["Valuation Agent", "AI-powered property valuation using comparable transactions, market data, property attributes and valuation models."],
      ["Valuation B2C", "Consumer-focused property valuation providing quick, accessible estimates of residential property value."]
    ]
  },
  {
    name: "SigmaMarket Lens", type: "Market Intelligence", agents: [
      ["Market Research Agent", "Conducts automated real estate market research covering demand, supply, pricing, trends and market dynamics."],
      ["Transaction Intelligence Agent", "Analyzes transaction data to identify comparable deals, pricing patterns, transaction trends and investment signals."],
      ["Live Data Intelligence Agent", "Continuously captures and interprets live market data and signals to provide up-to-date real estate intelligence."],
      ["Analytics Agent", "Converts real estate data into actionable insights, trends, dashboards and decision-support analytics."],
      ["Data Dashboard", "Brings critical market data, performance indicators and decision-ready insights together in one visual workspace."]
    ]
  },
  {
    name: "SigmaGeo", type: "Geo-Spatial Intelligence", agents: [
      ["Land/GIS Agent", "Identifies and analyzes land parcels using GIS, location intelligence, spatial data and surrounding infrastructure."],
      ["Elevation Agent", "Analyzes terrain, elevation, slope and topography to assess site characteristics and development implications."]
    ]
  },
  {
    name: "SigmaFeasibility", type: "Simulator", agents: [
      ["Feasibility Agent", "Evaluates development potential across regulations, FSI, product mix, revenue, financial feasibility, risks and project scenarios."],
      ["Legal Agent", "Analyzes real estate laws, regulations, approvals and legal requirements relevant to properties and development projects."],
      ["Document Intelligence Agent", "Extracts, interprets and summarizes critical information from property, project, legal and transaction documents."]
    ]
  },
  {
    name: "SigmaPhysical", type: "Physical AI", agents: [
      ["Physical AI Agent", "Uses computer vision and physical-world intelligence to analyze properties, sites, construction progress and real-world conditions."]
    ]
  },
  {
    name: "SigmaPortfolio", type: "Investment & Portfolio Intelligence", agents: [
      ["Portfolio Management Agent", "Monitors and analyzes real estate portfolios, asset performance, cash flows, risks and investment outcomes."],
      ["Value Creation Agent", "Identifies opportunities to improve asset performance, unlock value and optimize real estate investments."],
      ["Autonomous Relationship Agent", "Automates relationship management and engagement with investors, customers, tenants and other stakeholders."]
    ]
  },
  {
    name: "SigmaREOS", type: "Real Estate Operations", agents: [
      ["Autonomous Real Estate ERP Agent", "Automates core real estate business processes, workflows, data and operational activities across the organization."],
      ["Property Management Agent", "Manages property operations including occupancy, tenants, maintenance, collections and asset-level activities."],
      ["Project Management Agent", "Plans, tracks and coordinates real estate projects, tasks, timelines, resources, costs and execution."]
    ]
  },
  {
    name: "SigmaWorkspace", type: "AI Workspace & Automation", agents: [
      ["Generative Interface", "Enables users to interact with SigmaValue through natural-language prompts to create insights, workflows and solutions."],
      ["Solution Engine", "Converts business requirements into AI-powered workflows, applications, reports and actionable solutions."],
      ["Connector", "Connects SigmaValue with enterprise systems, data sources, applications and external tools."],
      ["Team Collaboration", "Enables teams to collaborate, share information, coordinate workflows and work together within the SigmaValue environment."]
    ]
  }
];

const crossIndustrySolutions = [
  { title: "Agentic AI Strategy & Use Case Discovery", text: "Identify high-value opportunities, assess AI readiness, prioritize use cases and develop an enterprise agentic AI roadmap.", icon: FiCompass },
  { title: "Agent & Workflow Design", text: "Design customized AI agents, multi-agent systems and autonomous workflows aligned with specific business functions and processes.", icon: FiLayers },
  { title: "Agentic AI Implementation & Integration", text: "Build, deploy and integrate AI agents with existing enterprise applications, data sources, APIs and workflows.", icon: FiGitMerge },
  { title: "AI Transformation & Continuous Optimization", text: "Scale agentic AI across functions, monitor performance, establish governance and continuously optimize AI-driven operations.", icon: FiTrendingUp },
];

const realEstateTechnologySolutions = [
  { title: "Real Estate Digital Transformation", text: "Digitize and automate real estate processes across acquisition, development, sales, leasing, property management and project management.", icon: FiRefreshCw },
  { title: "Real Estate Data, AI & Intelligence", text: "Implement AI, automation, GIS, data platforms, analytics and decision intelligence to improve operational efficiency and business decisions.", icon: FiDatabase },
  { title: "Technology Integration & Platform Modernization", text: "Modernize legacy systems and integrate ERP, CRM, GIS, PMS, financial systems and other enterprise applications into a connected digital ecosystem.", icon: FiZap },
];

const dealStructuringSolutions = [
  { title: "Transaction & Deal Structuring", text: "Advise on transaction structures, joint ventures, partnerships, acquisitions, development arrangements and commercial terms to optimize risk and returns.", icon: FiGitMerge },
  { title: "Capital Raising & Financing Advisory", text: "Support equity and debt raising, structured finance, project finance and investor strategy, including identification and evaluation of suitable capital sources.", icon: FiDollarSign },
  { title: "Investment & Financial Strategy", text: "Develop investment strategies, financial models, return analysis and capital allocation strategies to optimize project economics and overall investment outcomes.", icon: FiPieChart },
];

const strategicTransactionSolutions = [
  { title: "Transaction Strategy & Evaluation", text: "Assess acquisition, divestment, joint venture and partnership opportunities through commercial, financial and strategic evaluation.", icon: FiTrendingUp },
  { title: "Due Diligence & Transaction Structuring", text: "Support business, financial, market and operational due diligence, valuation, deal structuring and negotiation of transaction terms.", icon: FiDatabase },
  { title: "Transaction Execution & Closure", text: "Coordinate stakeholders and provide end-to-end support through negotiations, documentation, approvals, closing and post-transaction integration.", icon: FiGitMerge },
];

const servicesAdvisorySolutions = [
  { title: "Valuation", text: "Independent, data-backed valuation of properties, land, projects and real estate portfolios using market evidence, comparable transactions and financial analysis.", icon: FiDollarSign },
  { title: "TEV", text: "Techno-Economic Viability assessment covering technical feasibility, market potential, project economics, risks and the overall commercial viability of a development.", icon: FiTrendingUp },
  { title: "Catchment Intelligence (MMA)", text: "Micro-market and catchment analysis covering demand, supply, demographics, pricing, competition, infrastructure and location-driven market opportunities.", icon: FiCompass },
  { title: "Feasibility", text: "Integrated development feasibility analysis across regulations, product mix, pricing, revenue, costs, returns, scenarios and project risks.", icon: FiPieChart },
];

const slots = [
  { side: "left", top: 16 }, { side: "right", top: 16 },
  { side: "left", top: 35 }, { side: "right", top: 35 },
  { side: "left", top: 56 }, { side: "right", top: 56 },
  { side: "left", top: 75 }, { side: "right", top: 75 },
];

export function ServiceConstellation({ chapters, active, theme }) {
  const serviceCards = (chapters?.filter((card) => card.key === "ch") || []).map((card, index) => ({
    ...card,
    pos: slots[index]?.side || (index % 2 === 0 ? "left" : "right"),
    top: `${slots[index]?.top ?? 16}%`,
  }));

  const getActiveCardIndex = () => Math.max(
    0,
    Math.min(serviceCards.length - 1, (active ?? 1) - 1)
  );

  const [activeCard, setActiveCard] = useState(getActiveCardIndex);
  const [agentModal, setAgentModal] = useState(false);
  const [enterpriseModal, setEnterpriseModal] = useState(false);
  const [crossIndustryModal, setCrossIndustryModal] = useState(false);
  const [realEstateTechnologyModal, setRealEstateTechnologyModal] = useState(false);
  const [dealStructuringModal, setDealStructuringModal] = useState(false);
  const [strategicTransactionModal, setStrategicTransactionModal] = useState(false);
  const [servicesAdvisoryModal, setServicesAdvisoryModal] = useState(false);

  useEffect(() => {
    setActiveCard(getActiveCardIndex());
  }, [active, serviceCards.length]);

  return <div className="service-constellation" aria-label="SigmaValue Services Ecosystem">
    {serviceCards.map((card, index) => {
      const isResolved = index < activeCard;
      const isActivating = index === activeCard;
      const isDormant = index > activeCard;
      const stateClass = isDormant ? "dormant" : isActivating ? "activating" : isResolved ? "resolved" : "";
      return <article
        key={card.title}
        className={`orbit-service-card ${card.pos} ${stateClass}`}
        style={{ "--slot-top": card.top, "--start-rotation": card.pos === "left" ? "-84deg" : "84deg" }}
        onClick={() => setActiveCard(index)}
      >
        <div className="orbit-card-image" style={{ backgroundImage: `linear-gradient(135deg, rgba(8,14,26,.15), rgba(8,14,26,.9)), url('/FINAL LOGO.jpeg')` }} />
        <div className="orbit-card-content">
          <span>{String(index + 1).padStart(2, "0")} / 08 · {card.cat}</span>
          <h2>{card.title.replace("\n", " ")}</h2>
          <p>{card.desc}</p>
          {index === 0 && <button type="button" className="orbit-explore" onClick={() => setAgentModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 1 && <button type="button" className="orbit-explore" onClick={() => setEnterpriseModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 2 && <button type="button" className="orbit-explore" onClick={() => setCrossIndustryModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 3 && <button type="button" className="orbit-explore" onClick={() => setRealEstateTechnologyModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 5 && <button type="button" className="orbit-explore" onClick={() => setDealStructuringModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 6 && <button type="button" className="orbit-explore" onClick={() => setStrategicTransactionModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 7 && <button type="button" className="orbit-explore" onClick={() => setServicesAdvisoryModal(true)}>Explore More <FiArrowUpRight /></button>}
          {index === 4 && <a href="#contact">Explore More <FiArrowUpRight /></a>}
        </div>
      </article>;
    })}
    <div className="constellation-status"><span>{String(activeCard + 1).padStart(2, "0")}</span><i /><b>08 SERVICES RESOLVING</b></div>
    <AgentPlatformModal show={agentModal} onHide={() => setAgentModal(false)} groups={agentGroups} theme={theme} />
    <EnterpriseAIModal show={enterpriseModal} onHide={() => setEnterpriseModal(false)} />
    <EnterpriseAIModal show={crossIndustryModal} onHide={() => setCrossIndustryModal(false)} eyebrow="CROSS-INDUSTRY AGENTIC AI" title="From AI opportunity to enterprise-scale impact." subtitle="End-to-end advisory, implementation and optimization across industries and business functions." solutions={crossIndustrySolutions} />
    <EnterpriseAIModal show={realEstateTechnologyModal} onHide={() => setRealEstateTechnologyModal(false)} eyebrow="REAL ESTATE TECHNOLOGY" title="Transform every stage of real estate operations." subtitle="Connected technology, intelligent data and modern platforms for the complete real estate lifecycle." solutions={realEstateTechnologySolutions} />
    <EnterpriseAIModal show={dealStructuringModal} onHide={() => setDealStructuringModal(false)} eyebrow="DEAL STRUCTURING & CAPITAL ADVISORY" title="Structure stronger deals and smarter capital." subtitle="Integrated transaction, financing and investment advisory designed to optimize risk, returns and project economics." solutions={dealStructuringSolutions} />
    <EnterpriseAIModal show={strategicTransactionModal} onHide={() => setStrategicTransactionModal(false)} eyebrow="STRATEGIC TRANSACTION" title="Navigate every transaction with clarity." subtitle="End-to-end strategic, diligence and execution support for complex real estate transactions." solutions={strategicTransactionSolutions} />
    <EnterpriseAIModal show={servicesAdvisoryModal} onHide={() => setServicesAdvisoryModal(false)} eyebrow="SERVICES ADVISORY" title="Decision-ready real estate advisory." subtitle="Specialist intelligence and analysis for valuation, viability, markets and development decisions." solutions={servicesAdvisorySolutions} />
  </div>;
}
