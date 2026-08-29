import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBriefcase,
  FiCheckCircle,
  FiCompass,
  FiCpu,
  FiDatabase,
  FiDollarSign,
  FiEye,
  FiGitMerge,
  FiGrid,
  FiHome,
  FiLayers,
  FiLock,
  FiMap,
  FiMic,
  FiPieChart,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiSliders,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from "react-icons/fi";
import { agentGroups } from "../../services/data/agentGroups";

export const SECTION_NAVIGATION_DATA = {
  Agentic: {
    category: "Agentic",
    label: "8 INTELLIGENCE SYSTEMS",
    chapterIndex: 1,
    groups: agentGroups.map((g) => ({
      name: g.name,
      type: g.type,
      number: g.number,
      icon:
        g.name === "SigmaValue"
          ? FiHome
          : g.name === "SigmaMarket Lens"
          ? FiTrendingUp
          : g.name === "SigmaGeo"
          ? FiMap
          : g.name === "SigmaFeasibility"
          ? FiSliders
          : g.name === "SigmaPhysical"
          ? FiEye
          : g.name === "SigmaPortfolio"
          ? FiPieChart
          : g.name === "SigmaREOS"
          ? FiGrid
          : FiCpu,
      items: g.agents.map(([name, desc, num]) => ({
        name,
        desc,
        num,
      })),
    })),
  },

  Enterprise: {
    category: "Enterprise",
    label: "4 ENTERPRISE PILLARS",
    chapterIndex: 2,
    groups: [
      {
        name: "SigmaEnterprise Core",
        type: "Agentic AI & Automation",
        number: "1",
        icon: FiCpu,
        items: [
          { num: "1.a", name: "Autonomous Process Agents", desc: "Automates complex multi-step enterprise workflows and core operations." },
          { num: "1.b", name: "Multi-Agent Orchestration", desc: "Coordinates cross-department agent interactions and task distribution." },
        ],
      },
      {
        name: "SigmaKnowledge",
        type: "Enterprise Knowledge & Copilots",
        number: "2",
        icon: FiDatabase,
        items: [
          { num: "2.a", name: "Enterprise Copilots", desc: "Domain-trained assistants embedded in business workflows and document systems." },
          { num: "2.b", name: "Neural Knowledge Graph", desc: "Unified enterprise data index connecting documents, databases, and institutional knowledge." },
        ],
      },
      {
        name: "SigmaDecision",
        type: "AI Analytics & Decision Intelligence",
        number: "3",
        icon: FiTrendingUp,
        items: [
          { num: "3.a", name: "Predictive Analytics Engine", desc: "Forecasts market shifts, revenue trends, and operational capacity." },
          { num: "3.b", name: "Decision Support AI", desc: "Generates data-backed recommendations and risk impact scenarios." },
        ],
      },
      {
        name: "SigmaIntegration",
        type: "Custom AI Solutions & Integration",
        number: "4",
        icon: FiGitMerge,
        items: [
          { num: "4.a", name: "ERP & CRM Connectors", desc: "Bi-directional integration with SAP, Salesforce, Yardi, MRI, and custom ERPs." },
          { num: "4.b", name: "Enterprise API Pipeline", desc: "High-throughput API endpoints for secure model inference and data feeds." },
        ],
      },
    ],
  },

  Advisory: {
    category: "Advisory",
    label: "4 ADVISORY SERVICES",
    chapterIndex: 3,
    groups: [
      {
        name: "Strategy Discovery",
        type: "AI Strategy & Use Case Discovery",
        number: "1",
        icon: FiCompass,
        items: [
          { num: "1.a", name: "AI Readiness Assessment", desc: "Evaluates technology infrastructure, data maturity, and ROI opportunities." },
          { num: "1.b", name: "Use Case Prioritization", desc: "Ranks agentic AI use cases by financial impact and implementation velocity." },
        ],
      },
      {
        name: "Workflow Engineering",
        type: "Agent & Workflow Design",
        number: "2",
        icon: FiLayers,
        items: [
          { num: "2.a", name: "Multi-Agent Architectures", desc: "Custom blueprint design for autonomous agents and collaboration protocols." },
          { num: "2.b", name: "Autonomous Flow Engineering", desc: "Designs human-in-the-loop validation gates and automated task handoffs." },
        ],
      },
      {
        name: "Enterprise Deployment",
        type: "Implementation & Integration",
        number: "3",
        icon: FiGitMerge,
        items: [
          { num: "3.a", name: "Enterprise API Integration", desc: "Connects agent intelligence to production databases and operational tools." },
          { num: "3.b", name: "Production Deployment", desc: "Enterprise cloud, on-prem, and hybrid deployments with low-latency SLAs." },
        ],
      },
      {
        name: "Scale & Governance",
        type: "Continuous Optimization",
        number: "4",
        icon: FiTrendingUp,
        items: [
          { num: "4.a", name: "Enterprise Scaling", desc: "Expands AI capability across divisions with continuous performance tracking." },
          { num: "4.b", name: "Model Governance & Auditing", desc: "Ensures compliance, audit trails, and strict enterprise security controls." },
        ],
      },
    ],
  },

  PropTech: {
    category: "PropTech",
    label: "3 TRANSFORMATION SUITES",
    chapterIndex: 4,
    groups: [
      {
        name: "Digital Real Estate Ops",
        type: "Real Estate Digital Transformation",
        number: "1",
        icon: FiRefreshCw,
        items: [
          { num: "1.a", name: "Acquisition & Development Ops", desc: "Automates land screening, feasibility underwriting, and project tracking." },
          { num: "1.b", name: "Leasing & Sales Automation", desc: "AI-driven tenant matching, pricing recommendations, and contract cycles." },
        ],
      },
      {
        name: "Spatial & Data AI",
        type: "Real Estate Data & Intelligence",
        number: "2",
        icon: FiDatabase,
        items: [
          { num: "2.a", name: "Spatial GIS Intelligence", desc: "Location analytics, transit isochrones, and micro-market urban heatmaps." },
          { num: "2.b", name: "Automated Valuation AVM", desc: "Sub-registrar linked pricing models with confidence scoring." },
        ],
      },
      {
        name: "Platform Modernization",
        type: "Technology Integration",
        number: "3",
        icon: FiZap,
        items: [
          { num: "3.a", name: "Legacy ERP Modernization", desc: "Connects legacy property management software with real-time AI agents." },
          { num: "3.b", name: "Connected Cloud Ecosystem", desc: "Unified data pipeline for real-time asset tracking and reporting." },
        ],
      },
    ],
  },

  Capital: {
    category: "Capital",
    label: "3 CAPITAL DISCIPLINES",
    chapterIndex: 5,
    groups: [
      {
        name: "Deal Structuring",
        type: "Transaction & Deal Structuring",
        number: "1",
        icon: FiGitMerge,
        items: [
          { num: "1.a", name: "Joint Venture (JV) Structuring", desc: "Structures JDA, revenue shares, and partnership waterfall mechanics." },
          { num: "1.b", name: "Commercial Risk Optimization", desc: "Mitigates downside risks and optimizes capital stack flexibility." },
        ],
      },
      {
        name: "Capital Advisory",
        type: "Capital Raising & Financing",
        number: "2",
        icon: FiDollarSign,
        items: [
          { num: "2.a", name: "Debt & Structured Finance", desc: "Secures construction debt, mezzanine financing, and refinancing terms." },
          { num: "2.b", name: "Equity Investor Matching", desc: "Connects transactions with institutional funds, family offices, and LPs." },
        ],
      },
      {
        name: "Investment Strategy",
        type: "Investment & Financial Strategy",
        number: "3",
        icon: FiPieChart,
        items: [
          { num: "3.a", name: "Financial Modeling & Returns", desc: "Generates multi-scenario IRR, NPV, and equity multiple projections." },
          { num: "3.b", name: "Capital Allocation AI", desc: "Optimizes capital deployment across portfolio assets and risk bands." },
        ],
      },
    ],
  },

  Transactions: {
    category: "Transactions",
    label: "3 TRANSACTION PHASES",
    chapterIndex: 6,
    groups: [
      {
        name: "Strategy & Evaluation",
        type: "Transaction Strategy",
        number: "1",
        icon: FiTrendingUp,
        items: [
          { num: "1.a", name: "Opportunity Assessment", desc: "Evaluates acquisition targets, divestments, and strategic alliances." },
          { num: "1.b", name: "Commercial & M&A Strategy", desc: "Formulates valuation benchmarks and market entry roadmaps." },
        ],
      },
      {
        name: "Due Diligence",
        type: "Due Diligence & Structuring",
        number: "2",
        icon: FiDatabase,
        items: [
          { num: "2.a", name: "Financial & Market Diligence", desc: "Validates historical cash flows, registry comps, and micro-market trends." },
          { num: "2.b", name: "Term Sheet & Deal Terms", desc: "Drafts and negotiates protective deal terms, covenants, and escrow structures." },
        ],
      },
      {
        name: "Execution & Closure",
        type: "Transaction Execution",
        number: "3",
        icon: FiGitMerge,
        items: [
          { num: "3.a", name: "Stakeholder Management", desc: "Coordinates lenders, legal counsel, appraisers, and regulatory approvals." },
          { num: "3.b", name: "Closing & Post-Deal Integration", desc: "Ensures seamless fund disbursements, asset handover, and operational ramp-up." },
        ],
      },
    ],
  },

  Offerings: {
    category: "Offerings",
    label: "4 DECISION ADVISORIES",
    chapterIndex: 7,
    groups: [
      {
        name: "Valuation Services",
        type: "Independent Valuation",
        number: "1",
        icon: FiDollarSign,
        items: [
          { num: "1.a", name: "Institutional Asset Valuation", desc: "Data-backed appraisals using verified registry evidence and DCF modeling." },
          { num: "1.b", name: "Portfolio Mark-to-Market", desc: "Quarterly revaluation and collateral monitoring for institutional books." },
        ],
      },
      {
        name: "TEV Viability",
        type: "Techno-Economic Viability",
        number: "2",
        icon: FiTrendingUp,
        items: [
          { num: "2.a", name: "Commercial Viability Model", desc: "Analyzes project economics, demand absorption, and lender risk coverage." },
          { num: "2.b", name: "Technical Feasibility Audit", desc: "Evaluates structural plans, construction budgets, and milestone schedules." },
        ],
      },
      {
        name: "Catchment Intelligence",
        type: "Micro-Market Analysis (MMA)",
        number: "3",
        icon: FiCompass,
        items: [
          { num: "3.a", name: "Micro-Market Absorption", desc: "Tracks supply overhang, competitor sales velocity, and unsold inventory." },
          { num: "3.b", name: "Demographic & Pricing Heatmap", desc: "Pinpoints buyer affluence corridors and price appreciation trends." },
        ],
      },
      {
        name: "Feasibility Advisory",
        type: "Development Feasibility",
        number: "4",
        icon: FiPieChart,
        items: [
          { num: "4.a", name: "Integrated Zoning & FSI Mix", desc: "Optimizes unit typologies, FAR utilization, and land residual pricing." },
          { num: "4.b", name: "Multi-Scenario Sensitivity", desc: "Stress-tests construction inflation, sales delays, and interest rate shocks." },
        ],
      },
    ],
  },
};
