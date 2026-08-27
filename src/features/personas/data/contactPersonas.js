import { FiCompass, FiLayers, FiShield, FiTrendingUp } from "react-icons/fi";

export const PERSONAS = [
  {
    id: "developer",
    title: "Developer",
    badge: "Builders & Master Planners",
    desc: "Simulate feasibility, predict project IRRs, optimize unit mix, and analyze micro-market absorption trends in real-time.",
    tags: ["Simulator 361", "Feasibility AI", "Micro-Market GIS"],
    icon: FiLayers,
    accentColor: "#43a09b",
    demoRequirement: "Feasibility modeling, project IRR evaluation, and micro-market absorption intelligence."
  },
  {
    id: "bank",
    title: "Bank",
    badge: "Lenders & Underwriters",
    desc: "Institutional automated valuations (AVM), collateral risk assessment, portfolio health tracking, and verified loan comps.",
    tags: ["AVM Engine", "Risk Analytics", "Loan Underwriting"],
    icon: FiShield,
    accentColor: "#e87042",
    demoRequirement: "Automated Valuation Models (AVM), collateral scoring, and risk monitoring."
  },
  {
    id: "consultants",
    title: "Consultants",
    badge: "Advisors & Appraisers",
    desc: "Agentic AI advisory, spatial analytics, automated comp benchmark reports, and client-ready strategic transaction decks.",
    tags: ["PropGPT v3", "Spatial Intelligence", "Deal Structuring"],
    icon: FiCompass,
    accentColor: "#38bdf8",
    demoRequirement: "Agentic AI consulting, bespoke transaction advisory, and spatial analytics."
  },
  {
    id: "investors",
    title: "Investors",
    badge: "Funds & Asset Managers",
    desc: "Acquisition underwriting, pipeline discovery, yield sensitivity stress-testing, and multi-asset portfolio performance tracking.",
    tags: ["SIGMATRACK", "Yield Modeling", "Portfolio Alpha"],
    icon: FiTrendingUp,
    accentColor: "#f59e0b",
    demoRequirement: "Acquisitions pipeline underwriting, yield analysis, and portfolio tracking."
  }
];
