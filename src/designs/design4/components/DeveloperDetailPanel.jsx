import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiBarChart2,
  FiCheckCircle,
  FiCpu,
  FiLayers,
  FiMap,
  FiPieChart,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiZap,
} from "react-icons/fi";

/* ────────────────────────────────────────────────────────────
   Tab definitions  (equivalent to IT / Operations / Marketing…)
   Each tab maps to a specific Developer use-case
   ──────────────────────────────────────────────────────────── */
const DEVELOPER_TABS = [
  {
    id: "feasibility",
    label: "Feasibility",
    icon: FiTarget,
    accentColor: "#43a09b",
    heading: "Feasibility Automation",
    sub: "Run full project feasibility analyses in under 3 minutes — IRR, NPV, break-even, sensitivity, and land residual — without spreadsheet gymnastics.",
    cta: "Run Feasibility Now",
    ctaHref: "https://sigmavalue.ai/simulator-page",
    // SVG illustration placeholder — a schematic building wireframe
    illustration: "feasibility",
    benefits: [
      { icon: FiZap, label: "< 3 Min", value: "Feasibility Run Time" },
      { icon: FiBarChart2, label: "IRR & NPV", value: "Multi-scenario Projections" },
      { icon: FiLayers, label: "Unit Mix AI", value: "Optimized Layout Advisor" },
      { icon: FiTrendingUp, label: "Land Residual", value: "Automated Calculation" },
    ],
    offerings: [
      "Automated IRR, NPV & payback projections",
      "Scenario stress-testing & sensitivity analysis",
      "AI-optimized unit mix recommendations",
      "Land residual & acquisition pricing models",
      "GIS-linked absorption rate forecasts",
    ],
  },
  {
    id: "site",
    label: "Site Analysis",
    icon: FiMap,
    accentColor: "#38bdf8",
    heading: "Smart Site Intelligence",
    sub: "Instantly evaluate any land parcel with AI-powered micro-market scoring, zoning overlays, infrastructure proximity, and competitive project mapping.",
    cta: "Analyse a Site",
    ctaHref: "https://sigmavalue.ai/contact/?page=dev-site-analysis",
    illustration: "site",
    benefits: [
      { icon: FiMap, label: "GIS Layers", value: "Zoning & Infrastructure" },
      { icon: FiCpu, label: "AI Scoring", value: "Micro-Market Index" },
      { icon: FiTarget, label: "Comp Radar", value: "Competing Projects" },
      { icon: FiBarChart2, label: "Demand Heat", value: "Absorption Heatmaps" },
    ],
    offerings: [
      "Automated zoning & land-use classification",
      "Surrounding competitor project mapping",
      "Infrastructure & amenity proximity scoring",
      "Demand heatmap & micro-market absorption index",
      "Environmental & regulatory risk flags",
    ],
  },
  {
    id: "market",
    label: "Market Intel",
    icon: FiTrendingUp,
    accentColor: "#f59e0b",
    heading: "Real-Time Market Intelligence",
    sub: "Track pricing trends, transaction velocity, supply pipelines, and buyer sentiment across hyper-local geographies — updated daily from verified data sources.",
    cta: "Explore Market Intel",
    ctaHref: "https://sigmavalue.ai/contact/?page=dev-market-intel",
    illustration: "market",
    benefits: [
      { icon: FiTrendingUp, label: "Daily Updates", value: "Verified Transaction Comps" },
      { icon: FiBarChart2, label: "Supply Pipeline", value: "Upcoming Project Tracking" },
      { icon: FiPieChart, label: "Pricing Trends", value: "Per-SF & Per-Unit Analysis" },
      { icon: FiCpu, label: "Sentiment AI", value: "Buyer Demand Signals" },
    ],
    offerings: [
      "Daily transaction comp feeds by micro-market",
      "New supply pipeline monitoring & alerts",
      "Per-SF, per-unit & velocity trend dashboards",
      "Buyer segment & demand-driver analysis",
      "Competitive positioning benchmarks",
    ],
  },
  {
    id: "financial",
    label: "Financial Modeling",
    icon: FiPieChart,
    accentColor: "#e87042",
    heading: "Institutional Financial Models",
    sub: "Build lender-ready financial models with automated equity waterfall, debt structuring, cost benchmarking, and construction drawdown scheduling.",
    cta: "Build a Model",
    ctaHref: "https://sigmavalue.ai/contact/?page=dev-financial-model",
    illustration: "financial",
    benefits: [
      { icon: FiPieChart, label: "Equity Waterfall", value: "Automated Structuring" },
      { icon: FiBarChart2, label: "Debt Service", value: "DSCR & LTV Calculations" },
      { icon: FiLayers, label: "Cost Benchmarks", value: "Construction Cost DB" },
      { icon: FiTrendingUp, label: "Drawdown", value: "Construction Schedule AI" },
    ],
    offerings: [
      "Equity waterfall & preferred return modelling",
      "DSCR, LTV & debt service coverage dashboards",
      "Construction cost benchmarking by typology",
      "Automated drawdown scheduling & cash flow",
      "Lender-ready executive summary export",
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio Tracking",
    icon: FiLayers,
    accentColor: "#a78bfa",
    heading: "Multi-Project Portfolio Dashboard",
    sub: "Monitor all active projects on one live dashboard — track milestones, cost overruns, valuation changes, and return performance across your entire portfolio.",
    cta: "See Portfolio Demo",
    ctaHref: "https://sigmavalue.ai/contact/?page=dev-portfolio",
    illustration: "portfolio",
    benefits: [
      { icon: FiLayers, label: "Live Dashboard", value: "All Projects in One View" },
      { icon: FiBarChart2, label: "Cost Tracking", value: "Budget vs. Actual Alerts" },
      { icon: FiTrendingUp, label: "Valuation", value: "AVM Mark-to-Market" },
      { icon: FiPieChart, label: "Returns", value: "Portfolio IRR & MOIC" },
    ],
    offerings: [
      "Real-time milestone & completion tracking",
      "Budget vs. actual cost overrun alerts",
      "Automated mark-to-market AVM valuations",
      "Portfolio IRR, MOIC & equity multiple reports",
      "Multi-project cash flow consolidation",
    ],
  },
  {
    id: "regulatory",
    label: "Regulatory",
    icon: FiCpu,
    accentColor: "#34d399",
    heading: "Regulatory & Approvals Intelligence",
    sub: "Decode zoning bylaws, FSI regulations, approval timelines, and compliance checklists — automatically mapped to your specific project site.",
    cta: "Check Compliance",
    ctaHref: "https://sigmavalue.ai/contact/?page=dev-regulatory",
    illustration: "regulatory",
    benefits: [
      { icon: FiCpu, label: "Zoning AI", value: "Auto FSI & FAR Parser" },
      { icon: FiCheckCircle, label: "Checklists", value: "Approval Step-by-Step" },
      { icon: FiTarget, label: "Timeline AI", value: "Approval Duration Estimate" },
      { icon: FiMap, label: "Overlays", value: "Heritage, Flood & Eco Zones" },
    ],
    offerings: [
      "Automated FSI, FAR & setback calculation",
      "Site-specific approval process checklists",
      "Regulatory overlay maps (heritage, eco, flood)",
      "AI-estimated approval timeline by zone",
      "Change-of-land-use feasibility assessment",
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Inline SVG illustrations (keeps zero external deps)
   ──────────────────────────────────────────────────────────── */
function Illustration({ type, accentColor }) {
  const ILLUSTRATIONS = {
    feasibility: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Background grid */}
        {[...Array(8)].map((_, i) => (
          <line key={`hg-${i}`} x1="0" y1={i * 40 + 10} x2="480" y2={i * 40 + 10} stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        ))}
        {[...Array(12)].map((_, i) => (
          <line key={`vg-${i}`} x1={i * 40 + 10} y1="0" x2={i * 40 + 10} y2="300" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
        ))}
        {/* Building silhouette */}
        <rect x="60" y="80" width="100" height="200" rx="4" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="75" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="100" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="125" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="75" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="100" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="125" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="75" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="100" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="125" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
        <rect x="95" y="220" width="30" height="60" rx="2" fill={accentColor} fillOpacity="0.6" />
        {/* IRR graph */}
        <polyline points="230,240 270,180 310,200 350,140 390,100 420,120" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="420" cy="120" r="6" fill={accentColor} />
        <text x="425" y="116" fill={accentColor} fontSize="10" fontFamily="monospace">IRR 22%</text>
        {/* Axis */}
        <line x1="230" y1="260" x2="430" y2="260" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        <line x1="230" y1="80" x2="230" y2="260" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
        {/* Data labels */}
        <rect x="240" y="200" width="70" height="28" rx="6" fill={accentColor} fillOpacity="0.15" />
        <text x="275" y="218" textAnchor="middle" fill={accentColor} fontSize="11" fontWeight="600">NPV ₹24Cr</text>
      </svg>
    ),
    site: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Map grid */}
        {[...Array(6)].map((_, i) => (
          <line key={`hm-${i}`} x1="40" y1={i * 45 + 30} x2="440" y2={i * 45 + 30} stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`vm-${i}`} x1={i * 45 + 40} y1="30" x2={i * 45 + 40} y2="270" stroke="#38bdf8" strokeOpacity="0.08" strokeWidth="1" />
        ))}
        {/* Land parcel */}
        <polygon points="160,80 310,70 330,180 270,210 140,200" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
        {/* Pin */}
        <circle cx="235" cy="140" r="18" fill="#38bdf8" fillOpacity="0.25" />
        <circle cx="235" cy="140" r="9" fill="#38bdf8" />
        {/* Score badge */}
        <rect x="260" y="100" width="90" height="48" rx="8" fill="rgba(0,0,0,0.55)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.5" />
        <text x="305" y="120" textAnchor="middle" fill="#38bdf8" fontSize="9" letterSpacing="1" opacity="0.7">SITE SCORE</text>
        <text x="305" y="138" textAnchor="middle" fill="#38bdf8" fontSize="18" fontWeight="800">8.4/10</text>
        {/* Roads */}
        <line x1="40" y1="200" x2="440" y2="200" stroke="white" strokeOpacity="0.07" strokeWidth="8" />
        <line x1="310" y1="30" x2="310" y2="270" stroke="white" strokeOpacity="0.07" strokeWidth="8" />
      </svg>
    ),
    market: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Bar chart */}
        {[60, 90, 70, 120, 100, 145, 110, 160].map((h, i) => (
          <rect key={i} x={50 + i * 48} y={260 - h} width="32" height={h} rx="4" fill="#f59e0b" fillOpacity={0.2 + i * 0.08} />
        ))}
        {/* Trend line */}
        <polyline points="66,200 114,170 162,190 210,140 258,160 306,115 354,130 402,100" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />
        {/* Annotation */}
        <circle cx="402" cy="100" r="7" fill="#f59e0b" />
        <rect x="316" y="68" width="100" height="26" rx="6" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeOpacity="0.5" strokeWidth="1" />
        <text x="366" y="85" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="600">+18% YoY</text>
        {/* Axis labels */}
        <line x1="40" y1="260" x2="440" y2="260" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
        {["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"].map((q, i) => (
          <text key={q + i} x={66 + i * 48} y="276" textAnchor="middle" fill="currentColor" fillOpacity="0.3" fontSize="9">{q}</text>
        ))}
      </svg>
    ),
    financial: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Waterfall chart */}
        {[
          { x: 50, y: 80, h: 140, label: "Revenue", color: "#e87042" },
          { x: 120, y: 160, h: 60, label: "Land", color: "#ef4444" },
          { x: 190, y: 200, h: 20, label: "Const.", color: "#ef4444" },
          { x: 260, y: 180, h: 40, label: "Finance", color: "#ef4444" },
          { x: 330, y: 120, h: 100, label: "GP", color: "#43a09b" },
          { x: 400, y: 140, h: 80, label: "IRR", color: "#e87042" },
        ].map(({ x, y, h, label, color }) => (
          <g key={x}>
            <rect x={x} y={y} width="50" height={h} rx="4" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
            <text x={x + 25} y={260 + 14} textAnchor="middle" fill="currentColor" fillOpacity="0.4" fontSize="9">{label}</text>
          </g>
        ))}
        {/* IRR badge */}
        <rect x="300" y="40" width="130" height="60" rx="10" fill="rgba(232,112,66,0.12)" stroke="#e87042" strokeWidth="1" />
        <text x="365" y="66" textAnchor="middle" fill="#e87042" fontSize="10" opacity="0.8">Project IRR</text>
        <text x="365" y="88" textAnchor="middle" fill="#e87042" fontSize="22" fontWeight="800">21.4%</text>
        <line x1="40" y1="260" x2="460" y2="260" stroke="currentColor" strokeOpacity="0.1" />
      </svg>
    ),
    portfolio: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Three project cards */}
        {[
          { x: 30, label: "Skyview Res.", status: "On Track", pct: 72, color: "#43a09b" },
          { x: 190, label: "Meridian Comm.", status: "Delayed", pct: 41, color: "#f59e0b" },
          { x: 350, label: "Harbor Gate", status: "Completed", pct: 100, color: "#a78bfa" },
        ].map(({ x, label, status, pct, color }) => (
          <g key={x}>
            <rect x={x} y="40" width="140" height="210" rx="12" fill="rgba(255,255,255,0.035)" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
            <text x={x + 70} y="68" textAnchor="middle" fill="white" fillOpacity="0.75" fontSize="11" fontWeight="600">{label}</text>
            <text x={x + 70} y="86" textAnchor="middle" fill={color} fontSize="9">{status}</text>
            {/* Progress ring approximated as arc description rect */}
            <rect x={x + 30} y="100" width="80" height="12" rx="6" fill="rgba(255,255,255,0.05)" />
            <rect x={x + 30} y="100" width={80 * pct / 100} height="12" rx="6" fill={color} />
            <text x={x + 70} y="132" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="9">{pct}% complete</text>
            <text x={x + 70} y="180" textAnchor="middle" fill={color} fontSize="18" fontWeight="800">IRR {pct === 100 ? "19.2%" : pct > 60 ? "18.7%" : "16.1%"}</text>
          </g>
        ))}
      </svg>
    ),
    regulatory: (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* Checklist */}
        {[
          { label: "Zoning Classification", done: true },
          { label: "FSI / FAR Calculation", done: true },
          { label: "Environmental Clearance", done: true },
          { label: "Building Plan Approval", done: false },
          { label: "Occupation Certificate", done: false },
        ].map(({ label, done }, i) => (
          <g key={i}>
            <rect x="100" y={40 + i * 48} width="280" height="36" rx="8"
              fill={done ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)"}
              stroke={done ? "#34d399" : "rgba(255,255,255,0.08)"} strokeWidth="1" />
            <circle cx="128" cy={58 + i * 48} r="10"
              fill={done ? "#34d399" : "rgba(255,255,255,0.05)"}
              stroke={done ? "#34d399" : "rgba(255,255,255,0.15)"} strokeWidth="1.5" />
            {done && <text x="128" y="62" textAnchor="middle" fill="white" fontSize="10" fontWeight="700" dy={i * 48}>✓</text>}
            <text x="148" y={62 + i * 48} fill="white" fillOpacity={done ? 0.85 : 0.35} fontSize="12">{label}</text>
          </g>
        ))}
        {/* Badge */}
        <rect x="300" y="180" width="120" height="50" rx="10" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1" />
        <text x="360" y="200" textAnchor="middle" fill="#34d399" fontSize="9" opacity="0.8">Est. Approval</text>
        <text x="360" y="220" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="800">8-11 Months</text>
      </svg>
    ),
  };

  return ILLUSTRATIONS[type] || ILLUSTRATIONS.feasibility;
}

/* ────────────────────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────────────────────── */
export function DeveloperDetailPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState(DEVELOPER_TABS[0].id);
  const tab = DEVELOPER_TABS.find((t) => t.id === activeTab);

  return (
    <div className="dev-detail-panel">
      <button type="button" className="dev-detail-close" onClick={onBack} aria-label="Close Developer details">
        <FiX />
      </button>
      {/* ── HEADER ── */}
      <div className="dev-detail-topbar">
        <button type="button" className="btn-back-persona" onClick={onBack}>
          <FiArrowLeft />
          <span>Who you are?</span>
        </button>
        <div className="dev-detail-persona-label">
          <FiLayers style={{ color: "#43a09b" }} />
          <span>Developer — Builders &amp; Master Planners</span>
        </div>
      </div>

      {/* ── TAB RAIL ── */}
      <div className="dev-tabs-rail">
        {DEVELOPER_TABS.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              className={`dev-tab-btn ${isActive ? "active" : ""}`}
              style={{ "--tab-accent": t.accentColor }}
              onClick={() => setActiveTab(t.id)}
            >
              <Icon className="dev-tab-icon" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── CONTENT AREA ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="dev-tab-content"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {/* LEFT — Illustration */}
          <div className="dev-visual-column">
            <div
              className="dev-illustration-box"
              style={{ borderColor: `${tab.accentColor}30` }}
            >
              <div className="dev-illustration-inner">
                <Illustration type={tab.id} accentColor={tab.accentColor} />
              </div>
              {/* Floating accent glow */}
              <div
                className="dev-illustration-glow"
                style={{ background: `radial-gradient(circle at 50% 50%, ${tab.accentColor}22 0%, transparent 70%)` }}
              />
            </div>

            <div className="dev-image-actions" aria-label="Developer quick actions">
              <div className="dev-image-action dev-image-action--orange">
                <span className="dev-image-action-icon">G</span>
                <span>Add new workspace user</span>
              </div>
              <div className="dev-image-action-dots" aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className="dev-image-action dev-image-action--teal">
                <span className="dev-image-action-icon">↔</span>
                <span>Create a contract</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Description */}
          <div className="dev-tab-desc">
            <div className="dev-tab-eyebrow" style={{ color: tab.accentColor }}>
              <tab.icon />
              <span>SigmaValue for Developers</span>
            </div>
            <h3 className="dev-tab-heading">{tab.heading}</h3>
            <p className="dev-tab-sub">{tab.sub}</p>
            <a
              href={tab.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="dev-tab-cta"
              style={{ background: `linear-gradient(135deg, ${tab.accentColor} 0%, #070a12 160%)`, boxShadow: `0 4px 20px ${tab.accentColor}40` }}
            >
              <span>{tab.cta}</span>
              <FiArrowUpRight />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── BENEFITS / OFFERINGS ── */}
    </div>
  );
}
