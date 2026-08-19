import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiMenu,
  FiMoon,
  FiSun,
  FiArrowUpRight,
  FiMessageSquare,
  FiX,
  FiSearch,
  FiSend
} from "react-icons/fi";
import { CATEGORIES, CHAPTERS } from "../data/chapters";

function Loader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + Math.random() * 28);
        if (n >= 100) {
          clearInterval(t);
          setTimeout(() => setHidden(true), 280);
          return 100;
        }
        return n;
      });
    }, 80);
    return () => clearInterval(t);
  }, []);

  if (hidden) return null;

  return (
    <div id="loader" className={hidden ? "hide" : ""}>
      <div className="loader-box">
        <div className="loader-logo-ring">
          <img className="loader-logo-img" src="/logo.png" alt="Sigma Value" />
        </div>
        <div className="loader-mark">SIGMAVALUE</div>
        <div className="loader-sub">Real Estate Intelligence Platform</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function TopNav({ go, onMenu, theme, onTheme }) {
  const first = (cat) => CHAPTERS.findIndex((c) => c.cat === cat);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="nav-container">
        {/* Brand */}
        <a
          href="#"
          className="brand-link"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
        >
          <img
            src={theme === "light" ? "/logo-light.png" : "/logo-dark.png"}
            alt="Sigma Value"
            className="brand-logo-img brand-logo-desktop"
          />
          <img
            src={theme === "light" ? "/mobile-logo-light.png" : "/mobile-logo-dark.png"}
            alt="Sigma Value"
            className="brand-logo-img brand-logo-mobile"
          />
        </a>

        {/* Desktop Nav Items */}
        <nav className="main-nav">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
          >
            Home
          </a>

          <div
            className="dropdown-wrapper"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              className="dropdown-trigger"
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              <span>Products</span>
              <FiChevronDown className={`chevron ${productsOpen ? "rotate" : ""}`} />
            </button>

            {productsOpen && (
              <div className="dropdown-panel">
                <div className="dropdown-item" onClick={() => { go(CHAPTERS.findIndex((c) => c.title.includes("MARKETLENS"))); setProductsOpen(false); }}>
                  <div className="item-title">MarketLens</div>
                  <div className="item-desc">Spatial micro-market intelligence</div>
                </div>
                <a href="https://sigmavalue.ai/simulator-page" target="_blank" rel="noreferrer" className="dropdown-item">
                  <div className="item-title">Simulator 361</div>
                  <div className="item-desc">Feasibility &amp; IRR simulation agent</div>
                </a>
                <a href="https://sigmavalue.ai/valuation-overview" target="_blank" rel="noreferrer" className="dropdown-item">
                  <div className="item-title">Automated Valuation (AVM)</div>
                  <div className="item-desc">Institutional precision pricing</div>
                </a>
                <a href="https://sigmavalue.ai/sigmatrack" target="_blank" rel="noreferrer" className="dropdown-item">
                  <div className="item-title">SIGMATRACK</div>
                  <div className="item-desc">Transaction intelligence &amp; comps</div>
                </a>
                <a href="https://sigmavalue.ai/propgpt-overview" target="_blank" rel="noreferrer" className="dropdown-item">
                  <div className="item-title">PropGPT v3</div>
                  <div className="item-desc">Conversational real estate insights</div>
                </a>
              </div>
            )}
          </div>

          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              go(first("Platform"));
            }}
          >
            Platform
          </a>

          <a
            href="https://sigmavalue.ai/investinrealestate/realestateinvestorpage/"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            Investors
          </a>

          <a
            href="https://sigmavalue.ai/pricing/"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            Pricing
          </a>

          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              go(CHAPTERS.length - 1);
            }}
          >
            Contact
          </a>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={onTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <a
            className="btn-signin"
            href="https://sigmavalue.ai/auth/signin"
            target="_blank"
            rel="noreferrer"
          >
            Sign In
          </a>

          <a
            className="btn-header-cta"
            href="https://sigmavalue.ai/contact/?page=contactform"
            target="_blank"
            rel="noreferrer"
          >
            <span>Request Demo</span>
            <FiArrowUpRight />
          </a>

          <button className="mobile-menu-btn" onClick={onMenu} aria-label="Open Navigation Menu">
            <FiMenu />
          </button>
        </div>
      </div>
    </header>
  );
}

function AnnouncementBadge({ show = true }) {
  if (!show) return null;
  return (
    <div className="announcement-banner">
      <a
        className="announcement-pill"
        href="https://os.sigmavalue.ai/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="badge-glow-dot" />
        <span className="badge-text">
          <strong>Introducing SigmaValue OS</strong> — Your AI-Native Real Estate Operating System
        </span>
        <span className="badge-cta">
          Explore <FiArrowUpRight />
        </span>
      </a>
    </div>
  );
}

function LiveSiteBadge() {
  return (
    <div className="live-site-badge">
      <span className="live-dot" />
      <span>Connected to sigmavalue.ai Ecosystem</span>
    </div>
  );
}

function Pager({ active, go }) {
  const ch = CHAPTERS[active];
  if (!ch) return null;

  return (
    <div id="pager" className={active > 0 ? "show" : ""}>
      <button
        onClick={() => go(Math.max(0, active - 1))}
        disabled={active <= 0}
        aria-label="Previous chapter"
        className="pager-btn"
      >
        <FiChevronLeft />
      </button>

      <div className="pager-info">
        <span className="pager-num">{ch.num || "01"} / {String(CHAPTERS.length).padStart(2, "0")}</span>
        <span className="pager-title">
          {ch.key === "hero" ? "Overview" : (ch.title ? ch.title.replace("\n", " ") : "")}
        </span>
      </div>

      <button
        onClick={() => go(Math.min(CHAPTERS.length - 1, active + 1))}
        disabled={active >= CHAPTERS.length - 1}
        aria-label="Next chapter"
        className="pager-btn"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}

function LeftCategoryNav({ active, go }) {
  const currentChapter = CHAPTERS[active] || {};

  return (
    <div id="leftNav" className={active > 0 ? "show" : ""}>
      <div className="nav-label">SECTIONS</div>
      <div className="category-list">
        {CATEGORIES.map((c) => {
          const targetIndex = CHAPTERS.findIndex((ch) => ch.cat === c);
          const isActive = currentChapter.cat === c;
          return (
            <button
              key={c}
              className={`cat-item ${isActive ? "active" : ""}`}
              onClick={() => targetIndex >= 0 && go(targetIndex)}
            >
              <span className="indicator-line" />
              <span className="cat-name">{c}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AskBar({ show }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I am SigmaValue Assistant. Ask me about Simulator 361, Automated Valuation (AVM), SIGMATRACK, or SigmaValue OS."
    }
  ]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userQ = query.trim();
    const qLower = userQ.toLowerCase();
    setQuery("");

    let reply = "Explore our platform modules using the top menu or left navigation rail, or jump straight to SigmaValue OS at os.sigmavalue.ai.";
    if (qLower.includes("simulator") || qLower.includes("irr") || qLower.includes("feasibility")) {
      reply = "Simulator 361 is our AI feasibility agent that forecasts IRRs, tests scenario unit mixes, and provides risk metrics in under 3 minutes.";
    } else if (qLower.includes("valuation") || qLower.includes("avm") || qLower.includes("price")) {
      reply = "SigmaValue AVM delivers institutional-grade automated valuations with 98.4% precision calibrated to local micro-market transaction comps.";
    } else if (qLower.includes("os") || qLower.includes("operating system")) {
      reply = "SigmaValue OS connects valuation, pipeline management, and risk scoring in one autonomous workspace at os.sigmavalue.ai.";
    } else if (qLower.includes("demo") || qLower.includes("contact")) {
      reply = "You can schedule a personalized demo via the 'Request Demo' button in the header or the Contact section.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userQ },
      { sender: "ai", text: reply }
    ]);
  };

  if (!show) return null;

  return (
    <div className="ai-assistant-wrapper">
      {!isOpen ? (
        <button className="ai-trigger-btn" onClick={() => setIsOpen(true)}>
          <div className="pulse-indicator" />
          <FiMessageSquare className="icon" />
          <span>Ask SigmaValue AI</span>
        </button>
      ) : (
        <div className="ai-chat-card">
          <div className="ai-chat-header">
            <div className="header-left">
              <div className="ai-status-dot" />
              <span>SigmaValue AI Assistant</span>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.sender}`}>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <div className="ai-chat-input-bar">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
            />
            <button onClick={handleSend} className="send-btn">
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingDemoButton() {
  return (
    <a
      className="floating-demo-pill"
      href="https://sigmavalue.ai/contact/?page=contactform"
      target="_blank"
      rel="noreferrer"
    >
      <span>Request a Demo</span>
      <FiArrowUpRight />
    </a>
  );
}

function ScrollCue({ show }) {
  return (
    <div id="cue" className={show ? "show" : ""}>
      <span>Scroll to explore</span>
      <div className="scroll-track">
        <div className="scroll-thumb" />
      </div>
    </div>
  );
}

export {
  AnnouncementBadge,
  AskBar,
  FloatingDemoButton,
  LeftCategoryNav,
  LiveSiteBadge,
  Loader,
  Pager,
  ScrollCue,
  TopNav
};
