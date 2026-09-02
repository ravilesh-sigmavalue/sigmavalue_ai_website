import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FiArrowUpRight,
  FiBox,
  FiBriefcase,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiCpu,
  FiGrid,
  FiHome,
  FiLayers,
  FiMenu,
  FiMessageSquare,
  FiSend,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUser,
  FiX,
} from "react-icons/fi";

import { CHAPTERS } from "../experience/data/chapters";
import { agentGroups } from "../services/data/agentGroups";
import { crossIndustrySolutions } from "../services/data/serviceSolutions";

import { AgentPlatformModal } from "../services/modals/agent-platform/AgentPlatformModal";
import { EnterpriseAIModal } from "../services/modals/enterprise-ai/EnterpriseAIModal";
import { CrossIndustryModal } from "../services/modals/cross-industry/CrossIndustryModal";
import { RealEstateTechnologyModal } from "../services/modals/real-estate-technology/RealEstateTechnologyModal";
import { DealStructuringCapitalAdvisoryModal } from "../services/modals/deal-structuring/DealStructuringCapitalAdvisoryModal";
import { StrategicTransactionModal } from "../services/modals/strategic-transaction/StrategicTransactionModal";
import { ServicesAdvisoryModal } from "../services/modals/services-advisory/ServicesAdvisoryModal";

import "./mobile-menu.css";

const services = CHAPTERS.filter(
  (chapter) => chapter.key === "ch"
);

const serviceIcons = [
  FiCpu,
  FiBriefcase,
  FiLayers,
  FiHome,
  FiBox,
  FiGrid,
];

const MOBILE_PERSONAS = [
  {
    id: "developer",
    title: "Developer",
    desc: "IRR Models & Feasibility AI",
    icon: FiLayers,
    accent: "var(--brand-teal)",
  },
  {
    id: "bank",
    title: "Bank",
    desc: "Automated Valuation (AVM) & Risk",
    icon: FiShield,
    accent: "var(--brand-coral)",
  },
  {
    id: "consultants",
    title: "Consultants",
    desc: "Advisory & Spatial Comps",
    icon: FiCompass,
    accent: "#38bdf8",
  },
  {
    id: "investors",
    title: "Investors",
    desc: "Pipeline Alpha & Yield Modeling",
    icon: FiTrendingUp,
    accent: "#f59e0b",
  },
];

function BrandHeader({
  theme,
  onMenu,
  onHome,
  menuOpen,
}) {
  return (
    <header className="d4m-header">
      <button
        className="d4m-icon-button"
        type="button"
        onClick={onMenu}
        aria-label={
          menuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={menuOpen}
        aria-controls="d4m-site-menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <button
        className="d4m-brand"
        type="button"
        onClick={onHome}
        aria-label="Go to SigmaValue home"
      >
        <img
          src={
            theme === "light"
              ? "/branding/logo-mobile-light.png"
              : "/branding/logo-mobile-dark.png"
          }
          alt="SigmaValue"
        />
      </button>

      <span
        className="d4m-header-spacer"
        aria-hidden="true"
      />
    </header>
  );
}

function BottomNav({
  view,
  menuOpen,
  onNavigate,
}) {
  const items = [
    ["home", "Home", FiHome],
    ["menu", "Products", FiGrid],
    ["service", "Platform", FiCpu],
    ["contact", "Contact", FiMessageSquare],
  ];

  return (
    <nav
      className="d4m-bottom-nav"
      aria-label="Primary mobile navigation"
    >
      {items.map(
        ([key, label, Icon]) => {
          const active =
            key === "menu"
              ? menuOpen
              : !menuOpen &&
                view === key;

          return (
            <button
              key={key}
              type="button"
              className={
                active ? "active" : ""
              }
              onClick={() =>
                onNavigate(key)
              }
              aria-current={
                active
                  ? "page"
                  : undefined
              }
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          );
        }
      )}
    </nav>
  );
}

function Hero({ onExplore }) {
  return (
    <main className="d4m-hero">
      <a
        className="d4m-announcement"
        href="https://os.sigmavalue.ai/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="d4m-dot" />

        <span>
          <strong>
            Introducing SigmaValue OS
          </strong>

          <small>
            Your AI-Native Real Estate OS
          </small>
        </span>

        <span>
          Explore
          <FiArrowUpRight />
        </span>
      </a>

      <div className="d4m-hero-mark">
        <img
          src="/branding/logo-alt.png"
          alt=""
        />
      </div>

      <div
        className="d4m-building"
        aria-hidden="true"
      />

      <section className="d4m-hero-card">
        <div className="d4m-eyebrow">
          <span className="d4m-dot" />
          NEXT-GEN REAL ESTATE INTELLIGENCE
        </div>

        <h1>
          Autonomous Real Estate{" "}
          <span>
            Valuation &amp; Analytics
          </span>
        </h1>

        <p>
          AI-driven feasibility agents,
          institutional-grade automated
          valuation models (AVM), and spatial
          market intelligence engineered for
          developers, investors, and lenders.
        </p>

        <div className="d4m-actions">
          <a
            className="d4m-primary"
            href="https://os.sigmavalue.ai/"
            target="_blank"
            rel="noreferrer"
          >
            Launch SigmaValue OS
            <FiArrowUpRight />
          </a>

          <button
            className="d4m-secondary"
            type="button"
            onClick={onExplore}
          >
            Explore Services
            <FiArrowUpRight />
          </button>
        </div>

        <div className="d4m-metrics">
          <div>
            <strong>98.4%</strong>
            <span>
              Valuation
              <br />
              Precision
            </span>
          </div>

          <div>
            <strong>10M+</strong>
            <span>
              Indexed
              <br />
              Records
            </span>
          </div>

          <div>
            <strong>&lt; 3 Min</strong>
            <span>
              Feasibility
              <br />
              Run Time
            </span>
          </div>
        </div>

        <div className="d4m-scroll-cue">
          Scroll to explore
          <FiChevronRight />
        </div>
      </section>
    </main>
  );
}

function MobileSiteMenu({
  selected,
  onClose,
  onHome,
  onSelectService,
  onContact,
  onDemo,
}) {
  const [openSection, setOpenSection] =
    useState(null);

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section
        ? null
        : section
    );
  };

  return (
    <div
      id="d4m-site-menu"
      className="d4m-site-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="SigmaValue navigation"
    >
      <div className="d4m-site-menu-panel">
        <div className="d4m-site-menu-top">
          <div>
            <span>MENU</span>
            <strong>
              Explore SigmaValue
            </strong>
          </div>

          <button
            type="button"
            className="d4m-site-menu-close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <FiX />
          </button>
        </div>

        <nav
          className="d4m-site-menu-nav"
          aria-label="SigmaValue mobile menu"
        >
          <button
            type="button"
            className="d4m-site-menu-row"
            onClick={onHome}
          >
            <span>Home</span>
            <FiArrowUpRight />
          </button>

          <div className="d4m-site-menu-group">
            <button
              type="button"
              className={`d4m-site-menu-row ${
                openSection === "offer"
                  ? "open"
                  : ""
              }`}
              onClick={() =>
                toggleSection("offer")
              }
              aria-expanded={
                openSection === "offer"
              }
            >
              <span>What we offer</span>
              <FiChevronDown />
            </button>

            {openSection === "offer" && (
              <div className="d4m-site-submenu">
                {services.map(
                  (service, index) => {
                    const Icon =
                      serviceIcons[
                        index %
                          serviceIcons.length
                      ];

                    return (
                      <button
                        key={`${service.cat}-${index}`}
                        type="button"
                        className={
                          index === selected
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          onSelectService(
                            index
                          )
                        }
                      >
                        <Icon />

                        <span>
                          <strong>
                            {service.cat}
                          </strong>

                          <small>
                            {service.title}
                          </small>
                        </span>

                        <FiChevronRight />
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>

          <div className="d4m-site-menu-group">
            <button
              type="button"
              className={`d4m-site-menu-row ${
                openSection === "solutions"
                  ? "open"
                  : ""
              }`}
              onClick={() =>
                toggleSection("solutions")
              }
              aria-expanded={
                openSection === "solutions"
              }
            >
              <span>Solutions</span>
              <FiChevronDown />
            </button>

            {openSection ===
              "solutions" && (
              <div className="d4m-site-submenu d4m-site-submenu-simple">
                <span>
                  Technology & Transformation
                </span>

                <span>
                  Intelligence & Decision-Making
                </span>

                <span>
                  Strategic Advisory
                </span>
              </div>
            )}
          </div>

          <div className="d4m-site-menu-group">
            <button
              type="button"
              className={`d4m-site-menu-row ${
                openSection === "about"
                  ? "open"
                  : ""
              }`}
              onClick={() =>
                toggleSection("about")
              }
              aria-expanded={
                openSection === "about"
              }
            >
              <span>About Us</span>
              <FiChevronDown />
            </button>

            {openSection === "about" && (
              <div className="d4m-site-submenu d4m-site-submenu-simple">
                <span>Our Team</span>
                <span>
                  Mission and Vision
                </span>
                <span>
                  Awards and Recognition
                </span>
                <span>Our Partners</span>
              </div>
            )}
          </div>

          <a
            className="d4m-site-menu-row"
            href="https://sigmavalue.ai/blogs/"
            target="_blank"
            rel="noreferrer"
          >
            <span>Blog</span>
            <FiArrowUpRight />
          </a>

          <a
            className="d4m-site-menu-row"
            href="/pricing"
          >
            <span>Pricing</span>
            <FiChevronRight />
          </a>

          <button
            type="button"
            className="d4m-site-menu-row"
            onClick={onContact}
          >
            <span>Contact Us</span>
            <FiChevronRight />
          </button>
        </nav>

        <button
          type="button"
          className="d4m-site-menu-demo"
          onClick={onDemo}
        >
          <span>Request Demo</span>
          <FiArrowUpRight />
        </button>
      </div>
    </div>
  );
}

function ChapterPager({
  index,
  onSelect,
}) {
  const service = services[index];

  return (
    <div
      className="d4m-pager"
      aria-label="Service chapter navigation"
    >
      <button
        type="button"
        disabled={index === 0}
        onClick={() =>
          onSelect(index - 1)
        }
        aria-label="Previous service"
      >
        <FiChevronLeft />
      </button>

      <div>
        <strong>
          {String(index + 1).padStart(
            2,
            "0"
          )}{" "}
          /{" "}
          {String(
            services.length
          ).padStart(2, "0")}
        </strong>

        <span>{service.cat}</span>
      </div>

      <button
        type="button"
        disabled={
          index ===
          services.length - 1
        }
        onClick={() =>
          onSelect(index + 1)
        }
        aria-label="Next service"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

function AskPanel() {
  const [open, setOpen] =
    useState(false);

  const [query, setQuery] =
    useState("");

  return (
    <div
      className={`d4m-ai ${
        open ? "open" : ""
      }`}
    >
      {open && (
        <div className="d4m-ai-panel">
          <div>
            <strong>
              SigmaValue AI
            </strong>

            <button
              type="button"
              onClick={() =>
                setOpen(false)
              }
              aria-label="Close assistant"
            >
              <FiX />
            </button>
          </div>

          <p>
            Ask about our AI platform,
            enterprise solutions, real estate
            services, or advisory capabilities.
          </p>

          <label>
            <input
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Ask a question..."
            />

            <button
              type="button"
              aria-label="Send question"
            >
              <FiSend />
            </button>
          </label>
        </div>
      )}

      {!open && (
        <button
          className="d4m-ai-trigger"
          type="button"
          onClick={() =>
            setOpen(true)
          }
        >
          <span className="d4m-dot" />
          Ask SigmaValue AI
          <FiChevronRight />
        </button>
      )}
    </div>
  );
}

function ServiceDetail({
  index,
  onSelect,
  onExplore,
}) {
  const service = services[index];

  return (
    <main className="d4m-detail-screen">
      <ChapterPager
        index={index}
        onSelect={onSelect}
      />

      <article className="d4m-service-card">
        <div className="d4m-pills">
          <span>{service.cat}</span>
          <span>{service.loc}</span>
        </div>

        <h1>{service.title}</h1>

        <p>{service.desc}</p>

        <div className="d4m-specs">
          {service.specs?.map(
            ([label, value]) => (
              <div key={label + value}>
                <small>{label}</small>
                <strong>
                  {value}
                </strong>
              </div>
            )
          )}
        </div>

        <h2>
          <FiLayers />
          Key Capabilities
        </h2>

        <div className="d4m-capabilities">
          {service.bullets?.map(
            (bullet) => (
              <div key={bullet}>
                <span>
                  <FiCheck />
                </span>
                {bullet}
              </div>
            )
          )}
        </div>

        <button
          className="d4m-primary"
          type="button"
          onClick={onExplore}
        >
          Explore Service
          <FiArrowUpRight />
        </button>
      </article>

      <AskPanel />
    </main>
  );
}

function Contact() {
  const [selected, setSelected] =
    useState("developer");

  return (
    <main className="d4m-contact-screen">
      <section>
        <div className="d4m-eyebrow">
          <span className="d4m-dot" />
          DIRECT ENTERPRISE ENGAGEMENT
        </div>

        <h1>
          Who <span>you are?</span>
        </h1>

        <p>
          Select your role to explore
          customized AI solutions and schedule
          a personalized demo.
        </p>

        <div
          className="d4m-persona-list"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "16px 0",
          }}
        >
          {MOBILE_PERSONAS.map((p) => {
            const Icon = p.icon;
            const isSel =
              selected === p.id;

            return (
              <div
                key={p.id}
                onClick={() =>
                  setSelected(p.id)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  padding: "12px 14px",
                  borderRadius: "12px",
                  background: isSel
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.03)",
                  border: isSel
                    ? `1.5px solid ${p.accent}`
                    : "1px solid var(--border-card)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background:
                        "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      color: p.accent,
                    }}
                  >
                    <Icon size={18} />
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color:
                          "var(--text-primary)",
                      }}
                    >
                      {p.title}
                    </div>

                    <div
                      style={{
                        fontSize: "11px",
                        color:
                          "var(--text-muted)",
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                </div>

                {isSel && (
                  <FiCheck
                    style={{
                      color: p.accent,
                    }}
                  />
                )}
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
          Request Demo as{" "}
          {
            MOBILE_PERSONAS.find(
              (p) =>
                p.id === selected
            )?.title
          }
          <FiArrowUpRight />
        </a>
      </section>
    </main>
  );
}

export function MobileExperience({
  theme,
  onTheme,
}) {
  const [view, setView] =
    useState("home");

  const [selected, setSelected] =
    useState(0);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    activeModal,
    setActiveModal,
  ] = useState(null);

  const activeView = useMemo(
    () => view,
    [view]
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [
    view,
    selected,
  ]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const goHome = () => {
    setMenuOpen(false);
    setView("home");
  };

  const selectService = (index) => {
    const nextIndex = Math.max(
      0,
      Math.min(
        services.length - 1,
        index
      )
    );

    setSelected(nextIndex);
    setView("service");
    setMenuOpen(false);
  };

  const openContact = () => {
    setMenuOpen(false);
    setView("contact");
  };

  const navigate = (target) => {
    if (target === "menu") {
      setMenuOpen(true);
      return;
    }

    setMenuOpen(false);

    if (target === "service") {
      selectService(selected);
      return;
    }

    setView(target);
  };

  return (
    <div className="d4m-shell">
      <BrandHeader
        theme={theme}
        onTheme={onTheme}
        menuOpen={menuOpen}
        onHome={goHome}
        onMenu={() =>
          setMenuOpen(
            (current) =>
              !current
          )
        }
      />

      {activeView === "home" && (
        <Hero
          onExplore={() =>
            setMenuOpen(true)
          }
        />
      )}

      {activeView === "service" && (
        <ServiceDetail
          index={selected}
          onSelect={selectService}
          onExplore={() =>
            setActiveModal(selected)
          }
        />
      )}

      {activeView === "contact" && (
        <Contact />
      )}

      {menuOpen && (
        <MobileSiteMenu
          selected={selected}
          onClose={closeMenu}
          onHome={goHome}
          onSelectService={
            selectService
          }
          onContact={openContact}
          onDemo={openContact}
        />
      )}

      <BottomNav
        view={activeView}
        menuOpen={menuOpen}
        onNavigate={navigate}
      />

      <AgentPlatformModal
        show={activeModal === 0}
        onHide={() =>
          setActiveModal(null)
        }
        groups={agentGroups}
        theme={theme}
      />

      <EnterpriseAIModal
        show={activeModal === 1}
        onHide={() =>
          setActiveModal(null)
        }
        variant="connected"
        theme={theme}
      />

      <CrossIndustryModal
        show={activeModal === 2}
        onHide={() =>
          setActiveModal(null)
        }
        solutions={
          crossIndustrySolutions
        }
        theme={theme}
      />

      <RealEstateTechnologyModal
        show={activeModal === 3}
        onHide={() =>
          setActiveModal(null)
        }
        theme={theme}
      />

      <DealStructuringCapitalAdvisoryModal
        show={activeModal === 4}
        onHide={() =>
          setActiveModal(null)
        }
        theme={theme}
      />

      <StrategicTransactionModal
        show={activeModal === 5}
        onHide={() =>
          setActiveModal(null)
        }
        theme={theme}
      />

      <ServicesAdvisoryModal
        show={activeModal === 6}
        onHide={() =>
          setActiveModal(null)
        }
        theme={theme}
      />
    </div>
  );
}
