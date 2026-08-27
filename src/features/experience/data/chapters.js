const SERVICES = [
  {
    title: "AGENTIC AI\nPLATFORM",
    cat: "Agentic",
    loc: "Connected Intelligence",
    desc: "AI-native platform that connects intelligent agents, enterprise data, and workflows to automate complex business processes and decision-making.",
    icon: "facade",
    accent: [0.2667, 0.549, 0.4549],
    specs: [["AI-Native", "Platform"], ["Connected", "Agents"], ["Smart", "Workflows"]],
    bullets: ["Connect intelligent agents", "Unify enterprise data", "Automate complex workflows"]
  },
  {
    title: "ENTERPRISE AI",
    cat: " Enterprise",
    loc: "Customized AI Solutions",
    desc: "Customized AI solutions that help enterprises improve productivity, automate operations, enhance analytics, and drive smarter decisions.",
    icon: "ridge",
    accent: [0.2667, 0.549, 0.4549],
    specs: [["Higher", "Productivity"], ["Automated", "Operations"], ["Smarter", "Decisions"]],
    bullets: ["Purpose-built AI solutions", "Operational automation", "Advanced enterprise analytics"]
  },
  {
    title: "CROSS-INDUSTRY\nAGENTIC AI ADVISORY & IMPLEMENTATION SERVICES",
    cat: "Advisory",
    loc: "Advisory & Implementation Services",
    desc: "End-to-end advisory and implementation support to identify, design, deploy, and scale agentic AI solutions across business functions and industries.",
    icon: "interior",
    accent: [0.2471, 0.498, 0.7922],
    specs: [["Identify", "Use Cases"], ["Design", "Solutions"], ["Deploy", "At Scale"]],
    bullets: ["Opportunity identification", "Agentic solution design", "Enterprise-scale deployment"]
  },
  {
    title: "REAL ESTATE\nTECHNOLOGY & DIGITAL TRANSFORMATION SERVICES",
    cat: "PropTech",
    loc: "Digital Transformation Services",
    desc: "Technology-led transformation of real estate operations using AI, automation, GIS, data intelligence, and digital workflows.",
    icon: "house",
    accent: [0.2471, 0.7922, 0.5647],
    specs: [["AI", "Enabled"], ["GIS", "Intelligence"], ["Digital", "Workflows"]],
    bullets: ["AI and process automation", "GIS-powered operations", "Connected digital workflows"]
  },
  {
    title: "DEAL STRUCTURING &\nCAPITAL ADVISORY",
    cat: "Capital",
    loc: "Commercial & Financial Outcomes",
    desc: "Advisory on transaction structuring, capital raising, financing, partnerships, and investment strategies to optimize commercial and financial outcomes.",
    icon: "city",
    accent: [0.92, 0.44, 0.26],
    specs: [["Capital", "Raising"], ["Deal", "Structuring"], ["Investment", "Strategy"]],
    bullets: ["Transaction structuring", "Financing and partnerships", "Optimized investment strategies"]
  },
  {
    title: "STRATEGIC TRANSACTION ADVISORY",
    cat: "Transactions",
    loc: "Strategy & Evaluation",
    desc: "End-to-end advisory for acquisitions, divestments, joint ventures, partnerships, and other strategic transactions, from evaluation through execution.",
    icon: "bridge",
    accent: [0.2667, 0.549, 0.4549],
    specs: [["M&A", "Strategy"], ["Joint", "Ventures"], ["Growth", "Partners"]],
    bullets: ["Acquisition and divestment strategy", "Joint venture evaluation", "Strategic partnership planning"]
  },
  {
    title: "SERVICES",
    cat: "Offerings",
    loc: "Evaluation Through Execution",
    desc: "End-to-end advisory for acquisitions, divestments, joint ventures, partnerships, and other strategic transactions, from evaluation through execution.",
    icon: "facade",
    accent: [0.2471, 0.498, 0.7922],
    specs: [["Evaluate", "Opportunity"], ["Plan", "Transaction"], ["Execute", "Confidently"]],
    bullets: ["Opportunity evaluation", "Transaction planning", "Execution support"]
  }
];

const hero = { key: "hero", num: "01", cat: "", title: "SIGMAVALUE", loc: "", desc: "", icon: null, accent: [0.2667, 0.549, 0.4549], specs: null, bullets: [], action: "", href: "" };

const cards = SERVICES.map((service, index) => ({
  key: "ch",
  num: String(index + 1).padStart(2, "0"),
  ...service,
  action: "Explore service",
  href: "#contact"
}));

const contact = { key: "contact", num: "09", cat: "Contact", title: "LET'S BUILD\nWHAT'S NEXT", loc: "Talk to SigmaValue", desc: "Connect with our team to explore the right AI, technology, or advisory solution for your organization.", icon: null, accent: [0.92, 0.44, 0.26], specs: null, bullets: [], action: "", href: "" };

const CHAPTERS = [hero, ...cards, contact];
const CATEGORIES = [...new Set(cards.map((card) => card.cat))];

export { CATEGORIES, CHAPTERS };
