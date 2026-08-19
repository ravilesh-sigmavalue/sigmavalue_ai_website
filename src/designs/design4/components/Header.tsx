import { useState } from "react";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
  FiMoon,
  FiSun
} from "react-icons/fi";
import { CHAPTERS } from "../data/chapters";

type HeaderProps = {
  go: (index: number) => void;
  onMenu: () => void;
  theme: "light" | "dark";
  onTheme: () => void;
};

export function Header({ go, onMenu, theme, onTheme }: HeaderProps) {
  const first = (category: string) => CHAPTERS.findIndex((chapter) => chapter.cat === category);
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <header className="site-header ">
      <div className="nav-container ">
        <a
          href="#"
          className="brand-link"
          onClick={(event) => {
            event.preventDefault();
            go(0);
          }}
        >
          <img src="/logo-dark-removebg-preview.png" alt="Sigma Value" className="brand-logo-img brand-logo-desktop" />
          <img src="/logo-dark-removebg-preview.png" alt="Sigma Value" className="brand-logo-img brand-logo-mobile" />
        </a>

        <nav className="main-nav">
          <a
            href="#"
            className="nav-link"
            onClick={(event) => {
              event.preventDefault();
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
            <button className="dropdown-trigger" type="button" onClick={() => setProductsOpen((open) => !open)}>
              <span>Products</span>
              <FiChevronDown className={`chevron ${productsOpen ? "rotate" : ""}`} />
            </button>

            {productsOpen && (
              <div className="dropdown-panel">
                <div
                  className="dropdown-item"
                  onClick={() => {
                    go(CHAPTERS.findIndex((chapter) => chapter.title.includes("MARKETLENS")));
                    setProductsOpen(false);
                  }}
                >
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
            onClick={(event) => {
              event.preventDefault();
              go(first("Platform"));
            }}
          >
            Platform
          </a>
          <a href="https://sigmavalue.ai/investinrealestate/realestateinvestorpage/" target="_blank" rel="noreferrer" className="nav-link">
            Investors
          </a>
          <a href="https://sigmavalue.ai/pricing/" target="_blank" rel="noreferrer" className="nav-link">
            Pricing
          </a>
          <a
            href="#"
            className="nav-link"
            onClick={(event) => {
              event.preventDefault();
              go(CHAPTERS.length - 1);
            }}
          >
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle-btn"
            onClick={onTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <a className="btn-signin" href="https://sigmavalue.ai/auth/signin" target="_blank" rel="noreferrer">
            Sign In
          </a>
          <a className="btn-header-cta" href="https://sigmavalue.ai/contact/?page=contactform" target="_blank" rel="noreferrer">
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
