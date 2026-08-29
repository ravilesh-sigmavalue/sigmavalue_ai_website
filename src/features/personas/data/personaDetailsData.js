import {
  FiActivity,
  FiBarChart2,
  FiCheckCircle,
  FiCompass,
  FiCpu,
  FiDollarSign,
  FiFileText,
  FiGlobe,
  FiLayers,
  FiLock,
  FiMap,
  FiPieChart,
  FiSearch,
  FiShield,
  FiSliders,
  FiTarget,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

export const PERSONA_DETAILS = {
  developer: {
    id: "developer",
    title: "Developer",
    badge: "Builders & Master Planners",
    accentColor: "#43a09b",
    icon: FiLayers,
    quickActions: [
      { id: "qa-dev-1", icon: "G", label: "Add new workspace user", variant: "orange" },
      { id: "qa-dev-2", icon: "↔", label: "Create a contract", variant: "teal" }
    ],
    tabs: [
      {
        id: "feasibility",
        label: "Feasibility",
        icon: FiTarget,
        accentColor: "#43a09b",
        heading: "Feasibility Automation",
        sub: "Run full project feasibility analyses in under 3 minutes — IRR, NPV, break-even, sensitivity, and land residual — without spreadsheet gymnastics.",
        cta: "Run Feasibility Now",
        ctaHref: "https://sigmavalue.ai/simulator-page",
        benefits: [
          { icon: FiZap, label: "< 3 Min", value: "Feasibility Run Time" },
          { icon: FiBarChart2, label: "IRR & NPV", value: "Multi-scenario Projections" },
          { icon: FiLayers, label: "Unit Mix AI", value: "Optimized Layout Advisor" },
          { icon: FiTrendingUp, label: "Land Residual", value: "Automated Calculation" }
        ],
        offerings: [
          "Automated IRR, NPV & payback projections",
          "Scenario stress-testing & sensitivity analysis",
          "AI-optimized unit mix recommendations",
          "Land residual & acquisition pricing models",
          "GIS-linked absorption rate forecasts"
        ]
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
        benefits: [
          { icon: FiMap, label: "GIS Layers", value: "Zoning & Infrastructure" },
          { icon: FiCpu, label: "AI Scoring", value: "Micro-Market Index" },
          { icon: FiTarget, label: "Comp Radar", value: "Competing Projects" },
          { icon: FiBarChart2, label: "Demand Heat", value: "Absorption Heatmaps" }
        ],
        offerings: [
          "Automated zoning & land-use classification",
          "Surrounding competitor project mapping",
          "Infrastructure & amenity proximity scoring",
          "Demand heatmap & micro-market absorption index",
          "Environmental & regulatory risk flags"
        ]
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
        benefits: [
          { icon: FiTrendingUp, label: "Daily Updates", value: "Verified Transaction Comps" },
          { icon: FiBarChart2, label: "Supply Pipeline", value: "Upcoming Project Tracking" },
          { icon: FiPieChart, label: "Pricing Trends", value: "Per-SF & Per-Unit Analysis" },
          { icon: FiCpu, label: "Sentiment AI", value: "Buyer Demand Signals" }
        ],
        offerings: [
          "Daily transaction comp feeds by micro-market",
          "New supply pipeline monitoring & alerts",
          "Per-SF, per-unit & velocity trend dashboards",
          "Buyer segment & demand-driver analysis",
          "Competitive positioning benchmarks"
        ]
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
        benefits: [
          { icon: FiPieChart, label: "Equity Waterfall", value: "Automated Structuring" },
          { icon: FiBarChart2, label: "Debt Service", value: "DSCR & LTV Calculations" },
          { icon: FiLayers, label: "Cost Benchmarks", value: "Construction Cost DB" },
          { icon: FiTrendingUp, label: "Drawdown", value: "Construction Schedule AI" }
        ],
        offerings: [
          "Equity waterfall & preferred return modelling",
          "DSCR, LTV & debt service coverage dashboards",
          "Construction cost benchmarking by typology",
          "Automated drawdown scheduling & cash flow",
          "Lender-ready executive summary export"
        ]
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
        benefits: [
          { icon: FiLayers, label: "Live Dashboard", value: "All Projects in One View" },
          { icon: FiBarChart2, label: "Cost Tracking", value: "Budget vs. Actual Alerts" },
          { icon: FiTrendingUp, label: "Valuation", value: "AVM Mark-to-Market" },
          { icon: FiPieChart, label: "Returns", value: "Portfolio IRR & MOIC" }
        ],
        offerings: [
          "Real-time milestone & completion tracking",
          "Budget vs. actual cost overrun alerts",
          "Automated mark-to-market AVM valuations",
          "Portfolio IRR, MOIC & equity multiple reports",
          "Multi-project cash flow consolidation"
        ]
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
        benefits: [
          { icon: FiCpu, label: "Zoning AI", value: "Auto FSI & FAR Parser" },
          { icon: FiCheckCircle, label: "Checklists", value: "Approval Step-by-Step" },
          { icon: FiTarget, label: "Timeline AI", value: "Approval Duration Estimate" },
          { icon: FiMap, label: "Overlays", value: "Heritage, Flood & Eco Zones" }
        ],
        offerings: [
          "Automated FSI, FAR & setback calculation",
          "Site-specific approval process checklists",
          "Regulatory overlay maps (heritage, eco, flood)",
          "AI-estimated approval timeline by zone",
          "Change-of-land-use feasibility assessment"
        ]
      }
    ]
  },

  bank: {
    id: "bank",
    title: "Bank",
    badge: "Lenders & Underwriters",
    accentColor: "#e87042",
    icon: FiShield,
    quickActions: [
      { id: "qa-bank-1", icon: "🛡️", label: "Run Collateral Valuation", variant: "orange" },
      { id: "qa-bank-2", icon: "📋", label: "Generate Credit Memo", variant: "teal" }
    ],
    tabs: [
      {
        id: "avm",
        label: "AVM Engine",
        icon: FiCpu,
        accentColor: "#e87042",
        heading: "Automated Valuation Model (AVM) Core",
        sub: "Institutional-grade valuation engine calculating fair collateral values, confidence intervals, and automated indexation for retail & commercial assets.",
        cta: "Run Institutional AVM",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-avm",
        benefits: [
          { icon: FiCpu, label: "99.4%", value: "Model Precision Score" },
          { icon: FiZap, label: "< 2 Sec", value: "Valuation Turnaround" },
          { icon: FiMap, label: "10M+", value: "Verified Geo-comps" },
          { icon: FiShield, label: "95% CI", value: "Confidence Interval Band" }
        ],
        offerings: [
          "Sub-registrar registry linked automated valuation",
          "Statistically backed 95% Confidence Interval band",
          "Micro-market volatility discount adjustments",
          "Instant collateral certificate generation",
          "Continuous quarterly mark-to-market re-indexing"
        ]
      },
      {
        id: "risk",
        label: "Collateral Risk",
        icon: FiShield,
        accentColor: "#ef4444",
        heading: "Collateral Risk & Stress Scoring",
        sub: "Multi-factor collateral risk scoring with micro-market default likelihood, price drawdown vulnerability, and title dispute exposure tracking.",
        cta: "Evaluate Collateral Risk",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-risk",
        benefits: [
          { icon: FiShield, label: "AAA to C", value: "Standardized Risk Rating" },
          { icon: FiSliders, label: "LTV Alert", value: "Downside Breach Trigger" },
          { icon: FiTrendingUp, label: "Stress Test", value: "-25% Price Shock Model" },
          { icon: FiActivity, label: "Liquidity", value: "Asset Liquidation Horizon" }
        ],
        offerings: [
          "Automated collateral risk grading & early warning flags",
          "LTV erosion alerts based on micro-market price changes",
          "Severe recessionary price stress-test simulation",
          "Asset liquidation time-horizon estimation",
          "Environmental hazard & geo-spatial risk screening"
        ]
      },
      {
        id: "portfolio_health",
        label: "Portfolio Health",
        icon: FiLayers,
        accentColor: "#f59e0b",
        heading: "Live Loan Portfolio Surveillance",
        sub: "Continuous real-time surveillance of mortgage books with automated mark-to-market valuations, concentration risk alerts, and early-warning delinquency indicators.",
        cta: "Monitor Loan Portfolio",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-portfolio",
        benefits: [
          { icon: FiLayers, label: "100%", value: "Book Mark-to-Market" },
          { icon: FiPieChart, label: "54.2%", value: "Weighted Average LTV" },
          { icon: FiMap, label: "Geo-Heat", value: "Concentration Radar" },
          { icon: FiActivity, label: "Early Alert", value: "Pre-delinquency Indicators" }
        ],
        offerings: [
          "Aggregated portfolio LTV & debt exposure dashboard",
          "Geographic & developer concentration risk monitoring",
          "Automated annual portfolio revaluation workflows",
          "Early-warning alerts on localized price softening",
          "Executive committee risk & governance exports"
        ]
      },
      {
        id: "underwriting",
        label: "Underwriting",
        icon: FiPieChart,
        accentColor: "#43a09b",
        heading: "Automated Credit & Underwriting Suite",
        sub: "Standardize credit committee memos with automated DSCR coverage calculations, borrower asset checks, and standardized underwriting templates.",
        cta: "Automate Underwriting",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-underwriting",
        benefits: [
          { icon: FiPieChart, label: "1.85x DSCR", value: "Automated Coverage Test" },
          { icon: FiFileText, label: "One-Click", value: "Credit Memo Generation" },
          { icon: FiCheckCircle, label: "Rules Engine", value: "Policy Guideline Checks" },
          { icon: FiDollarSign, label: "Cash Flow", value: "Sensitivity Stress Model" }
        ],
        offerings: [
          "Automated credit memo drafting with live charts",
          "Dynamic DSCR, ICR & debt yield stress calculations",
          "Borrower repayment capacity & leverage checks",
          "Standardized credit policy compliance validation",
          "Multi-tier approval workflow & audit trail"
        ]
      },
      {
        id: "comps",
        label: "Comps Verification",
        icon: FiTarget,
        accentColor: "#38bdf8",
        heading: "Verified Registry Transaction Comps",
        sub: "Direct integration with government land registries and verified sub-registrar transactions, eliminating manual survey errors and appraisal fraud.",
        cta: "Verify Loan Comps",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-comps",
        benefits: [
          { icon: FiTarget, label: "100%", value: "Government Registry Data" },
          { icon: FiLock, label: "Anti-Fraud", value: "Outlier & Anomaly Filter" },
          { icon: FiMap, label: "500m Radius", value: "Hyper-local Comp Radius" },
          { icon: FiTrendingUp, label: "True Value", value: "Time-adjusted Indexation" }
        ],
        offerings: [
          "Verified transaction records from government registries",
          "Automated detection of fraudulent appraisal spikes",
          "Time and floor-level price normalization",
          "Direct comparable comparison tables with photos & maps",
          "Instant comp audit sheet for loan files"
        ]
      },
      {
        id: "compliance",
        label: "Compliance & ECL",
        icon: FiCheckCircle,
        accentColor: "#34d399",
        heading: "Basel III & Central Bank Compliance",
        sub: "Export ready-to-file compliance reports, Expected Credit Loss (ECL) provisions, and RBI / Basel III risk-weighted asset classifications.",
        cta: "Audit & Compliance Setup",
        ctaHref: "https://sigmavalue.ai/contact/?page=bank-compliance",
        benefits: [
          { icon: FiCheckCircle, label: "ECL Model", value: "Automated Loss Provision" },
          { icon: FiShield, label: "Basel III", value: "RWA Risk-Weight Parser" },
          { icon: FiFileText, label: "Audit-Ready", value: "Immutable Ledger Logs" },
          { icon: FiCpu, label: "Policy AI", value: "Regulatory Change Alerts" }
        ],
        offerings: [
          "Stage 1, 2 & 3 Expected Credit Loss (ECL) calculation",
          "Risk-Weighted Asset (RWA) optimization engine",
          "Central bank statutory reporting export formats",
          "Full valuation lineage and model documentation",
          "End-to-end model governance & back-testing logs"
        ]
      }
    ]
  },

  consultants: {
    id: "consultants",
    title: "Consultants",
    badge: "Advisors & Appraisers",
    accentColor: "#38bdf8",
    icon: FiCompass,
    quickActions: [
      { id: "qa-con-1", icon: "✨", label: "Generate PropGPT Memo", variant: "orange" },
      { id: "qa-con-2", icon: "📊", label: "Export White-label Deck", variant: "teal" }
    ],
    tabs: [
      {
        id: "propgpt",
        label: "PropGPT Advisory",
        icon: FiCpu,
        accentColor: "#38bdf8",
        heading: "PropGPT Enterprise Agentic Advisory",
        sub: "Harness domain-trained real estate LLMs to generate 40-page valuation notes, advisory memos, and micro-market monographs in seconds.",
        cta: "Launch PropGPT Advisory",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-propgpt",
        benefits: [
          { icon: FiCpu, label: "Real Estate AI", value: "Domain-Trained Model" },
          { icon: FiFileText, label: "40+ Pages", value: "Instant Monograph Report" },
          { icon: FiSearch, label: "Citations", value: "100% Sourced Data Points" },
          { icon: FiZap, label: "10x Speed", value: "Advisory Research Velocity" }
        ],
        offerings: [
          "Conversational query on 50,000+ real estate data layers",
          "Instant drafting of strategic client advisory notes",
          "Automated macro to micro-market demographic summaries",
          "Source citation verification on every chart and metric",
          "Custom consultant prompt templates & playbooks"
        ]
      },
      {
        id: "spatial",
        label: "Spatial GIS",
        icon: FiMap,
        accentColor: "#43a09b",
        heading: "GIS & Spatial Urban Analytics",
        sub: "Overlay infrastructure corridors, transit catchments, demographic density shifts, and land suitability indices for client presentations.",
        cta: "Explore Spatial GIS",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-spatial",
        benefits: [
          { icon: FiMap, label: "Isochrones", value: "15-Min Transit Catchment" },
          { icon: FiLayers, label: "20+ Layers", value: "Zoning & Infrastructure GIS" },
          { icon: FiTarget, label: "Index Score", value: "Catchment Potential Index" },
          { icon: FiGlobe, label: "High-Res", value: "Vector Map Export" }
        ],
        offerings: [
          "Multi-modal transit catchment isochrone computation",
          "Demographic wealth & consumer density heatmaps",
          "Infrastructure pipeline & metro corridor influence analysis",
          "Land parcel suitability scoring for client RFP responses",
          "Interactive 3D client presentation viewports"
        ]
      },
      {
        id: "structuring",
        label: "Deal Structuring",
        icon: FiPieChart,
        accentColor: "#f59e0b",
        heading: "Bespoke Deal & Capital Structuring",
        sub: "Simulate Joint Development Agreements (JDA), revenue shares, mezzanine debt layers, and structured equity terms for high-value transactions.",
        cta: "Structure a Deal",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-deal-structuring",
        benefits: [
          { icon: FiPieChart, label: "JDA vs Buyout", value: "Scenario ROI Optimizer" },
          { icon: FiSliders, label: "Waterfall AI", value: "Multi-tier Profit Sharing" },
          { icon: FiTrendingUp, label: "IRR Delta", value: "Structure Yield Uplift" },
          { icon: FiDollarSign, label: "Tax Optimize", value: "Capital Gains Structuring" }
        ],
        offerings: [
          "Joint Development Agreement (JDA) revenue vs area share simulator",
          "Structured mezzanine & equity waterfall optimization",
          "Landowner vs developer return matrix comparisons",
          "Client-ready transaction term sheet generation",
          "Capital stack risk-adjusted IRR balancing"
        ]
      },
      {
        id: "benchmarking",
        label: "Comp Benchmarks",
        icon: FiTrendingUp,
        accentColor: "#e87042",
        heading: "Automated Comp Benchmark Reports",
        sub: "Generate white-labeled comparative market analyses (CMA) with regression-adjusted pricing, absorption velocities, and historical trend curves.",
        cta: "Generate Comp Report",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-benchmarks",
        benefits: [
          { icon: FiTrendingUp, label: "Regression", value: "Hedonic Price Model" },
          { icon: FiBarChart2, label: "Absorption", value: "Velocity Benchmarks" },
          { icon: FiFileText, label: "White-label", value: "Custom Brand Styling" },
          { icon: FiCheckCircle, label: "Verified", value: "Registry Authenticated" }
        ],
        offerings: [
          "Hedonic regression pricing adjustments for view, floor & amenities",
          "Quarterly micro-market absorption rate comps",
          "White-labeled PDF & PPTX report generation with client logo",
          "Competitive pricing quartile band visualizer",
          "Historical capital appreciation vs inflation indices"
        ]
      },
      {
        id: "decks",
        label: "Transaction Decks",
        icon: FiLayers,
        accentColor: "#a78bfa",
        heading: "Client-Ready Transaction Decks",
        sub: "Auto-assemble board-level pitch decks, information memorandums (IM), and transaction executive summaries with live data charts.",
        cta: "Build Transaction Deck",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-decks",
        benefits: [
          { icon: FiLayers, label: "Auto-Deck", value: "Live PPTX/PDF Export" },
          { icon: FiActivity, label: "Live Sync", value: "Data Auto-Updates" },
          { icon: FiTarget, label: "Teasers", value: "One-Page Deal Summaries" },
          { icon: FiShield, label: "NDA Gated", value: "Secure Data Room Link" }
        ],
        offerings: [
          "One-click Information Memorandum (IM) generation",
          "Institutional slide layouts with dynamic embedded charts",
          "Deal teaser generator for confidential outreach",
          "Real-time data synchronization with active models",
          "Interactive online stakeholder deal room"
        ]
      },
      {
        id: "advisory",
        label: "Market Advisory",
        icon: FiTarget,
        accentColor: "#34d399",
        heading: "Micro-Market Strategic Monographs",
        sub: "Deep-dive into micro-market supply overhang, unsold inventory duration, developer market share, and capital inflow trends.",
        cta: "Access Strategic Monograph",
        ctaHref: "https://sigmavalue.ai/contact/?page=consultant-monographs",
        benefits: [
          { icon: FiTarget, label: "Overhang AI", value: "Unsold Inventory Months" },
          { icon: FiBarChart2, label: "Market Share", value: "Developer Tier Rankings" },
          { icon: FiTrendingUp, label: "Forecast", value: "3-Year Price Trajectory" },
          { icon: FiCpu, label: "Alpha Signals", value: "Demand-Supply Imbalances" }
        ],
        offerings: [
          "Hyper-local inventory absorption duration calculations",
          "Developer market share & pricing power benchmarks",
          "Macro-economic driver correlation & demand forecasts",
          "Micro-market investment grade ranking matrix",
          "Quarterly market monograph automated updates"
        ]
      }
    ]
  },

  investors: {
    id: "investors",
    title: "Investors",
    badge: "Funds & Asset Managers",
    accentColor: "#f59e0b",
    icon: FiTrendingUp,
    quickActions: [
      { id: "qa-inv-1", icon: "α", label: "Calculate Portfolio Alpha", variant: "orange" },
      { id: "qa-inv-2", icon: "⚡", label: "Screen Deal Pipeline", variant: "teal" }
    ],
    tabs: [
      {
        id: "sigmatrack",
        label: "SIGMATRACK Alpha",
        icon: FiTarget,
        accentColor: "#f59e0b",
        heading: "SIGMATRACK Asset Surveillance",
        sub: "Track real-time asset performance, rental escalation velocity, tenant credit scores, and capital appreciation across multi-asset portfolios.",
        cta: "Deploy SIGMATRACK",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-sigmatrack",
        benefits: [
          { icon: FiTarget, label: "Live NOI", value: "Real-time Income Tracker" },
          { icon: FiTrendingUp, label: "8.9% Yield", value: "Net Operating Cap Rate" },
          { icon: FiShield, label: "Tenant Score", value: "Credit & Default Index" },
          { icon: FiActivity, label: "24/7 Intel", value: "Mark-to-Market Radar" }
        ],
        offerings: [
          "Continuous asset-level Net Operating Income (NOI) monitoring",
          "Tenant concentration & lease expiry schedule tracking",
          "Dynamic capitalization rate compression analysis",
          "Automated rental indexation & escalation alerts",
          "Cross-portfolio asset performance benchmark index"
        ]
      },
      {
        id: "acquisitions",
        label: "Acquisitions",
        icon: FiPieChart,
        accentColor: "#43a09b",
        heading: "Rapid Acquisition Screening & Underwriting",
        sub: "Screen 50+ deal opportunities weekly with automated LBO modeling, development exit valuations, and customized hurdle rate filters.",
        cta: "Screen Deal Pipeline",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-acquisitions",
        benefits: [
          { icon: FiZap, label: "< 5 Min", value: "Deal Triage Run Time" },
          { icon: FiPieChart, label: "2.6x MOIC", value: "Target Multiple Model" },
          { icon: FiTrendingUp, label: "22% Hurdle", value: "Benchmark Threshold" },
          { icon: FiCheckCircle, label: "Pipeline AI", value: "Automated Deal Scoring" }
        ],
        offerings: [
          "Automated LBO & development equity underwriting",
          "Pre-configured investment committee memo templates",
          "Custom hurdle rate & return hurdle stress filters",
          "Comparable transaction acquisition multiples DB",
          "Scenario sensitivity on exit cap rates & hold periods"
        ]
      },
      {
        id: "yield",
        label: "Yield Modeling",
        icon: FiTrendingUp,
        accentColor: "#38bdf8",
        heading: "Yield Sensitivity & Stress Testing",
        sub: "Stress-test cap rate expansions, interest rate spikes, construction slippages, and vacancy jumps to pinpoint downside risk buffers.",
        cta: "Model Yield Sensitivity",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-yield",
        benefits: [
          { icon: FiTrendingUp, label: "Cap Matrix", value: "3D Yield Shock Model" },
          { icon: FiSliders, label: "Rate Spike", value: "+300bps Debt Sensitivity" },
          { icon: FiShield, label: "Downside", value: "Capital Protection Floor" },
          { icon: FiActivity, label: "Monte Carlo", value: "10,000 Iteration Engine" }
        ],
        offerings: [
          "Multi-variable cap rate vs hold period return matrices",
          "Floating interest rate shock & debt service stress testing",
          "Breakeven occupancy & rental rate floor calculations",
          "Monte Carlo simulation of return distribution percentiles",
          "Downside capital preservation threshold alerts"
        ]
      },
      {
        id: "portfolio_alpha",
        label: "Portfolio Alpha",
        icon: FiLayers,
        accentColor: "#a78bfa",
        heading: "Multi-Fund Allocation & Performance",
        sub: "Consolidate debt, equity, and mezzanine holdings across funds into a unified LP-ready portal with real-time TVPI, DPI, and net IRR.",
        cta: "Consolidate Portfolio",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-portfolio",
        benefits: [
          { icon: FiLayers, label: "2.4x TVPI", value: "Fund I Realized Multiple" },
          { icon: FiDollarSign, label: "DPI Engine", value: "Cash Distribution Tracker" },
          { icon: FiTrendingUp, label: "Net IRR", value: "LP Hurdle Performance" },
          { icon: FiPieChart, label: "Asset Stack", value: "Multi-Fund Consolidation" }
        ],
        offerings: [
          "Consolidated multi-asset, multi-fund master dashboard",
          "Real-time TVPI, DPI, and net IRR calculations for LP reports",
          "Sector & geographic diversification allocation optimizer",
          "Co-investment & syndicate tracking modules",
          "Automated quarterly LP investor letter generator"
        ]
      },
      {
        id: "pipeline",
        label: "Deal Discovery",
        icon: FiCpu,
        accentColor: "#e87042",
        heading: "AI-Powered Off-Market Deal Sourcing",
        sub: "Identify distressed assets, motivated sellers, and off-market development parcels ahead of the broader market through predictive AI signals.",
        cta: "Discover Off-Market Deals",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-pipeline",
        benefits: [
          { icon: FiCpu, label: "AI Sourcing", value: "Distress Signal Detection" },
          { icon: FiTarget, label: "-18% Value", value: "Discount to Fair Value" },
          { icon: FiMap, label: "Off-Market", value: "Direct Owner GIS Links" },
          { icon: FiZap, label: "First-Look", value: "Pre-Listing Deal Alerts" }
        ],
        offerings: [
          "Predictive AI detection of distressed asset opportunities",
          "Developer leverage stress & debt refinancing watchlists",
          "Off-market land assembly & joint venture matchmaking",
          "Discount-to-replacement-cost ranking algorithms",
          "Direct owner contact routing & transaction pipeline"
        ]
      },
      {
        id: "esg",
        label: "ESG & Green Alpha",
        icon: FiCheckCircle,
        accentColor: "#34d399",
        heading: "ESG Benchmarking & Green Premium AI",
        sub: "Quantify green building premiums, energy efficiency certifications (LEED/GRIHA), and carbon offset economics across investment assets.",
        cta: "Assess ESG Performance",
        ctaHref: "https://sigmavalue.ai/contact/?page=investor-esg",
        benefits: [
          { icon: FiCheckCircle, label: "88/100", value: "Asset ESG Health Score" },
          { icon: FiTrendingUp, label: "+12% Rent", value: "Certified Green Premium" },
          { icon: FiZap, label: "-28% Energy", value: "Carbon Savings Potential" },
          { icon: FiShield, label: "SFDR/GRESB", value: "Sustainable Fund Filing" }
        ],
        offerings: [
          "Green building rental & valuation premium benchmarking",
          "LEED, GRIHA & IGBC certification impact models",
          "Carbon intensity tracking & energy efficiency ROI analyzer",
          "SFDR Article 8/9 & GRESB compliance export files",
          "Climate physical risk & flood hazard vulnerability ratings"
        ]
      }
    ]
  }
};
