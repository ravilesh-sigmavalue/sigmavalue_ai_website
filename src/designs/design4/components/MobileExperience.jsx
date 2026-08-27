import { useEffect, useMemo, useState } from "react";
import {
  FiArrowUpRight,
  FiBox,
  FiBriefcase,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiCpu,
  FiGrid,
  FiHome,
  FiLayers,
  FiMenu,
  FiMessageSquare,
  FiMoon,
  FiSend,
  FiSettings,
  FiShield,
  FiSun,
  FiTrendingUp,
  FiUser,
  FiX
} from "react-icons/fi";
import { CHAPTERS } from "../data/chapters";

const services = CHAPTERS.filter((chapter) => chapter.key === "ch");
const serviceIcons = [FiCpu, FiBriefcase, FiLayers, FiHome, FiBox, FiGrid];

function BrandHeader({ theme, onTheme, onMenu, onHome, menuOpen }) {
  return (
    <header className="d4m-header">
      <button className="d4m-icon-button" type="button" onClick={onMenu} aria-label={menuOpen ? "Close sections menu" : "Open sections menu"}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <button className="d4m-brand" type="button" onClick={onHome} aria-label="Go to SigmaValue home">
        <img src={theme === "light" ? "/mobile-logo-light.png" : "/mobile-logo-dark.png"} alt="SigmaValue" />
      </button>
      {/* Light theme toggle temporarily disabled.
      <button className="d4m-icon-button" type="button" onClick={onTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>
      */}
    </header>
  );
}

function BottomNav({ view, onNavigate }) {
  const items = [
    ["home", "Home", FiHome],
    ["menu", "Products", FiGrid],
    ["service", "Platform", FiCpu],
    ["contact", "Contact", FiMessageSquare]
  ];
  return (
    <nav className="d4m-bottom-nav" aria-label="Primary mobile navigation">
      {items.map(([key, label, Icon]) => (
        <button key={key} type="button" className={view === key ? "active" : ""} onClick={() => onNavigate(key)} aria-current={view === key ? "page" : undefined}>
          <Icon />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Hero({ onExplore }) {
  return (
    <main className="d4m-hero">
      <a className="d4m-announcement" href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer">
        <span className="d4m-dot" />
        <span><strong>Introducing SigmaValue OS</strong><small>Your AI-Native Real Estate OS</small></span>
        <span>Explore <FiArrowUpRight /></span>
      </a>
      <div className="d4m-hero-mark"><img src="/logo4.png" alt="" /></div>
      <div className="d4m-building" aria-hidden="true" />
      <section className="d4m-hero-card">
        <div className="d4m-eyebrow"><span className="d4m-dot" /> NEXT-GEN REAL ESTATE INTELLIGENCE</div>
        <h1>Autonomous Real Estate <span>Valuation &amp; Analytics</span></h1>
        <p>AI-driven feasibility agents, institutional-grade automated valuation models (AVM), and spatial market intelligence engineered for developers, investors, and lenders.</p>
        <div className="d4m-actions">
          <a className="d4m-primary" href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer">Launch SigmaValue OS <FiArrowUpRight /></a>
          <button className="d4m-secondary" type="button" onClick={onExplore}>Explore Services <FiArrowUpRight /></button>
        </div>
        <div className="d4m-metrics">
          <div><strong>98.4%</strong><span>Valuation<br />Precision</span></div>
          <div><strong>10M+</strong><span>Indexed<br />Records</span></div>
          <div><strong>&lt; 3 Min</strong><span>Feasibility<br />Run Time</span></div>
        </div>
        <div className="d4m-scroll-cue">Scroll to explore <FiChevronRight /></div>
      </section>
    </main>
  );
}

function ChapterPager({ index, onSelect }) {
  const service = services[index];
  return (
    <div className="d4m-pager" aria-label="Service chapter navigation">
      <button type="button" disabled={index === 0} onClick={() => onSelect(index - 1)} aria-label="Previous service"><FiChevronLeft /></button>
      <div><strong>{String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</strong><span>{service.cat}</span></div>
      <button type="button" disabled={index === services.length - 1} onClick={() => onSelect(index + 1)} aria-label="Next service"><FiChevronRight /></button>
    </div>
  );
}

function SectionsMenu({ selected, onSelect, onDemo }) {
  return (
    <main className="d4m-menu-screen">
      <div className="d4m-section-label">SECTIONS</div>
      <div className="d4m-section-list">
        {services.map((service, index) => {
          const Icon = serviceIcons[index % serviceIcons.length];
          return <button key={`${service.cat}-${index}`} type="button" className={index === selected ? "active" : ""} onClick={() => onSelect(index)}><Icon /><span>{service.cat}</span><FiArrowUpRight /></button>;
        })}
      </div>
      <button className="d4m-primary d4m-demo" type="button" onClick={onDemo}>Request a Demo <FiArrowUpRight /></button>
      <div className="d4m-profile">
        <span className="d4m-avatar"><FiUser /></span>
        <span><strong>John Doe</strong><small>john@example.com</small></span>
        <button type="button" aria-label="Profile settings"><FiSettings /></button>
      </div>
    </main>
  );
}

function AskPanel() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <div className={`d4m-ai ${open ? "open" : ""}`}>
      {open && <div className="d4m-ai-panel"><div><strong>SigmaValue AI</strong><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><FiX /></button></div><p>Ask about our AI platform, enterprise solutions, real estate services, or advisory capabilities.</p><label><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ask a question..." /><button type="button" aria-label="Send question"><FiSend /></button></label></div>}
      {!open && <button className="d4m-ai-trigger" type="button" onClick={() => setOpen(true)}><span className="d4m-dot" /> Ask SigmaValue AI <FiChevronRight /></button>}
    </div>
  );
}

function ServiceDetail({ index, onSelect }) {
  const service = services[index];
  return (
    <main className="d4m-detail-screen">
      <ChapterPager index={index} onSelect={onSelect} />
      <article className="d4m-service-card">
        <div className="d4m-pills"><span>{service.cat}</span><span>{service.loc}</span></div>
        <h1>{service.title}</h1>
        <p>{service.desc}</p>
        <div className="d4m-specs">{service.specs?.map(([label, value]) => <div key={label + value}><small>{label}</small><strong>{value}</strong></div>)}</div>
        <h2><FiLayers /> Key Capabilities</h2>
        <div className="d4m-capabilities">{service.bullets?.map((bullet) => <div key={bullet}><span><FiCheck /></span>{bullet}</div>)}</div>
        <a className="d4m-primary" href="https://sigmavalue.ai/contact/?page=contactform" target="_blank" rel="noreferrer">Explore Service <FiArrowUpRight /></a>
      </article>
      <AskPanel />
    </main>
  );
}

const MOBILE_PERSONAS = [
  { id: "developer", title: "Developer", desc: "IRR Models & Feasibility AI", icon: FiLayers, accent: "var(--brand-teal)" },
  { id: "bank", title: "Bank", desc: "Automated Valuation (AVM) & Risk", icon: FiShield, accent: "var(--brand-coral)" },
  { id: "consultants", title: "Consultants", desc: "Advisory & Spatial Comps", icon: FiCompass, accent: "#38bdf8" },
  { id: "investors", title: "Investors", desc: "Pipeline Alpha & Yield Modeling", icon: FiTrendingUp, accent: "#f59e0b" }
];

function Contact() {
  const [selected, setSelected] = useState("developer");

  return (
    <main className="d4m-contact-screen">
      <section>
        <div className="d4m-eyebrow"><span className="d4m-dot" /> DIRECT ENTERPRISE ENGAGEMENT</div>
        <h1>Who <span>you are?</span></h1>
        <p>Select your role to explore customized AI solutions and schedule a personalized demo.</p>

        <div className="d4m-persona-list" style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0" }}>
          {MOBILE_PERSONAS.map((p) => {
            const Icon = p.icon;
            const isSel = selected === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: isSel ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
                  border: isSel ? `1.5px solid ${p.accent}` : "1px solid var(--border-card)",
                  cursor: "pointer",
                  textAlign: "left"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: p.accent }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>{p.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.desc}</div>
                  </div>
                </div>
                {isSel && <FiCheck style={{ color: p.accent }} />}
              </div>
            );
          })}
        </div>

        <a
          className="d4m-primary"
          href={`https://sigmavalue.ai/contact/?page=design04-home&role=${selected}`}
          target="_blank"
          rel="noreferrer"
        >
          Request Demo as {MOBILE_PERSONAS.find((p) => p.id === selected)?.title} <FiArrowUpRight />
        </a>
      </section>
    </main>
  );
}

export function MobileExperience({ theme, onTheme }) {
  const [view, setView] = useState("home");
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeView = useMemo(() => view, [view]);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [view, selected]);

  const selectService = (index) => { setSelected(Math.max(0, Math.min(services.length - 1, index))); setView("service"); };
  const navigate = (target) => {
    if (target === "service") selectService(selected);
    else setView(target);
  };

  return (
    <div className="d4m-shell">
      <BrandHeader theme={theme} onTheme={onTheme} menuOpen={menuOpen} onHome={() => setView("home")} onMenu={() => setView((open) => !open)} />
      {activeView === "home" && <Hero onExplore={() => setView("menu")} />}
      {activeView === "menu" && <SectionsMenu selected={selected} onSelect={selectService} onDemo={() => setView("contact")} />}
      {activeView === "service" && <ServiceDetail index={selected} onSelect={selectService} />}
      {activeView === "contact" && <Contact />}
      <BottomNav view={activeView} onNavigate={navigate} />
    </div>
  );
}
