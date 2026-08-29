import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiChevronDown, FiMenu } from "react-icons/fi";
import { CHAPTERS } from "../experience/data/chapters";

const OFFER_GROUPS = [
  {
    id: "products",
    label: "Products",
    items: [
      { title: "Agentic AI", description: "Autonomous real estate intelligence agents" },
      { title: "Market Lens", description: "Spatial micro-market intelligence" },
    ],
  },
  {
    id: "services",
    label: "Services",
    items: [
      { title: "Valuation", description: "Institutional precision pricing (AVM)", href: "https://sigmavalue.ai/valuation-overview" },
      { title: "TEV", description: "Total economic value assessment" },
      { title: "Catchment Intelligence (MMA)", description: "Micro-market area analysis" },
      { title: "Feasibility", description: "Feasibility & IRR simulation agent", href: "https://sigmavalue.ai/simulator-page" },
    ],
  },
];

const SOLUTION_GROUPS = [
  {
    id: "tech",
    label: "Technology & Transformation",
    items: [
      "Digital Transformation through AI Platforms",
      "Agentic AI & Workflow Automation",
      "Custom AI Solutions & Enterprise Integration",
      "Intelligence & Decision-Making",
      "Market & Data Intelligence",
      "Geo-Spatial & Location Intelligence",
      "Project Feasibility & Development Intelligence",
      "Investment & Portfolio Intelligence",
    ].map((title) => ({ title })),
  },
  {
    id: "advisory",
    label: "Strategic Advisory",
    items: [{ title: "Transaction, Capital & Strategic Advisory" }],
  },
];

const ABOUT_ITEMS = [
  ["team", "Our Team"],
  ["mission", "Mission and Vision"],
  ["awards", "Awards and Recognition"],
  ["partners", "Our Partners"],
];

function DropdownGroup({ group, active, onToggle }) {
  return (
    <>
      <button type="button" className={`offer-category-header ${active ? "active" : ""}`} onClick={onToggle}>
        <span className="offer-cat-label">{group.label}</span>
        <FiChevronDown className={`chevron ${active ? "rotate" : ""}`} />
      </button>
      {active && (
        <div className="offer-sub-items">
          {group.items.map((item) => {
            const content = <><div className="item-title">{item.title}</div>{item.description && <div className="item-desc">{item.description}</div>}</>;
            return item.href ? (
              <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="dropdown-item offer-sub-item">{content}</a>
            ) : (
              <div key={item.title} className="dropdown-item offer-sub-item">{content}</div>
            );
          })}
        </div>
      )}
    </>
  );
}

export function Header({ go, onMenu, onRequestDemo, onAboutUs }) {
  const headerRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeOffer, setActiveOffer] = useState(null);
  const [activeSolution, setActiveSolution] = useState(null);
  const closeAll = () => { setOpenMenu(null); setActiveOffer(null); setActiveSolution(null); };

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) closeAll();
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeAll();
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const dropdown = (id, label, groups) => (
    <div className="dropdown-wrapper">
      <button className="dropdown-trigger" type="button" aria-expanded={openMenu === id} onClick={() => setOpenMenu(openMenu === id ? null : id)}>
        <span>{label}</span><FiChevronDown className={`chevron ${openMenu === id ? "rotate" : ""}`} />
      </button>
      {openMenu === id && (
        <div className={`dropdown-panel offer-panel ${id === "solutions" ? "solutions-panel" : ""}`}>
          {groups.map((group, index) => (
            <div key={group.id}>
              {index > 0 && <div className="offer-divider" />}
              <DropdownGroup
                group={group}
                active={(id === "offer" ? activeOffer : activeSolution) === group.id}
                onToggle={() => id === "offer"
                  ? setActiveOffer(activeOffer === group.id ? null : group.id)
                  : setActiveSolution(activeSolution === group.id ? null : group.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="site-header" ref={headerRef}>
      <div className="nav-container">
        <a href="#" className="brand-link" onClick={(event) => { event.preventDefault(); go(0); }}>
          <img src="/branding/logo-dark-transparent.png" alt="Sigma Value" className="brand-logo-img brand-logo-desktop" />
          <img src="/branding/logo-dark-transparent.png" alt="Sigma Value" className="brand-logo-img brand-logo-mobile" />
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#" className="nav-link" onClick={(event) => { event.preventDefault(); go(0); }}>Home</a>
          {dropdown("offer", "What we offer", OFFER_GROUPS)}
          {dropdown("solutions", "Solutions", SOLUTION_GROUPS)}
          <div className="dropdown-wrapper">
            <button className="dropdown-trigger" type="button" aria-expanded={openMenu === "about"} onClick={() => setOpenMenu(openMenu === "about" ? null : "about")}>
              <span>About Us</span><FiChevronDown className={`chevron ${openMenu === "about" ? "rotate" : ""}`} />
            </button>
            {openMenu === "about" && <div className="dropdown-panel offer-panel">{ABOUT_ITEMS.map(([id, label]) => <button key={id} type="button" className="dropdown-item offer-sub-item" onClick={() => { closeAll(); onAboutUs(id); }}><span className="item-title">{label}</span></button>)}</div>}
          </div>
          <a href="https://sigmavalue.ai/blogs/" target="_blank" rel="noreferrer" className="nav-link">Blog</a>
          <a href="https://sigmavalue.ai/pricing/" target="_blank" rel="noreferrer" className="nav-link">Pricing</a>
          <a href="#" className="nav-link" onClick={(event) => { event.preventDefault(); go(CHAPTERS.length - 1); }}>Contact Us</a>
        </nav>
        <div className="nav-actions">
          <button className="btn-header-cta" type="button" onClick={onRequestDemo}><span>Request Demo</span><FiArrowUpRight /></button>
          <button className="mobile-menu-btn" type="button" onClick={onMenu} aria-label="Open navigation menu"><FiMenu /></button>
        </div>
      </div>
    </header>
  );
}
