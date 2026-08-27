import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import {
  FiChevronDown,
  FiChevronRight,
  FiArrowUpRight,
  FiExternalLink,
  FiX
} from "react-icons/fi";
import { CHAPTERS } from "../data/chapters";

function SiteDrawer({ open, setOpen, go, theme }) {
  const [productsOpen, setProductsOpen] = useState(true);
  const first = (cat) => CHAPTERS.findIndex((c) => c.cat === cat);

  const handleNav = (target) => {
    setOpen(false);
    if (typeof target === "number" && target >= 0) {
      go(target);
    }
  };

  const marketLensIndex = CHAPTERS.findIndex((c) => c.title.includes("MARKETLENS"));
  const platformIndex = first("Platform");
  const contactIndex = CHAPTERS.length - 1;

  return (
    <Offcanvas
      id="siteDrawer"
      placement="end"
      show={open}
      onHide={() => setOpen(false)}
      backdrop
      keyboard
      scroll={false}
      className={open ? "open" : ""}
    >
      <div className="drawer-head">
        <a
          href="#"
          className="drawer-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNav(0);
          }}
        >
          <img
            src={theme === "light" ? "/mobile-logo-light.png" : "/mobile-logo-dark.png"}
            alt="Sigma Value"
            className="drawer-logo-img"
          />
        </a>
        <button
          className="drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FiX />
        </button>
      </div>

      <div className="drawer-body">
        <nav className="drawer-nav-list">
          {/* Home */}
          <button
            className="drawer-nav-item"
            onClick={() => handleNav(0)}
          >
            <span>Home</span>
            <FiChevronRight className="item-arrow" />
          </button>

          {/* Products (Expandable Accordion) */}
          <div className="drawer-accordion">
            <button
              className="drawer-nav-item accordion-trigger"
              onClick={() => setProductsOpen(!productsOpen)}
              type="button"
            >
              <span>Products</span>
              <FiChevronDown className={`accordion-chevron ${productsOpen ? "open" : ""}`} />
            </button>

            {productsOpen && (
              <div className="drawer-submenu">
                <button
                  className="drawer-subitem"
                  onClick={() => handleNav(marketLensIndex >= 0 ? marketLensIndex : 0)}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">MarketLens</span>
                    <span className="subitem-desc">Spatial micro-market intelligence</span>
                  </div>
                  <FiChevronRight className="subitem-icon" />
                </button>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/simulator-page"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">Simulator 361</span>
                    <span className="subitem-desc">Feasibility &amp; IRR simulation agent</span>
                  </div>
                  <FiExternalLink className="subitem-icon" />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/valuation-overview"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">Automated Valuation (AVM)</span>
                    <span className="subitem-desc">Institutional precision pricing</span>
                  </div>
                  <FiExternalLink className="subitem-icon" />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/sigmatrack"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">SIGMATRACK</span>
                    <span className="subitem-desc">Transaction intelligence &amp; comps</span>
                  </div>
                  <FiExternalLink className="subitem-icon" />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/propgpt-overview"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">PropGPT v3</span>
                    <span className="subitem-desc">Conversational real estate insights</span>
                  </div>
                  <FiExternalLink className="subitem-icon" />
                </a>
              </div>
            )}
          </div>

          {/* Platform */}
          <button
            className="drawer-nav-item"
            onClick={() => handleNav(platformIndex >= 0 ? platformIndex : 1)}
          >
            <span>Platform</span>
            <FiChevronRight className="item-arrow" />
          </button>

          {/* Investors */}
          <a
            className="drawer-nav-item"
            href="https://sigmavalue.ai/investinrealestate/realestateinvestorpage/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <span>Investors</span>
            <FiExternalLink className="item-arrow" />
          </a>

          {/* Pricing */}
          <a
            className="drawer-nav-item"
            href="https://sigmavalue.ai/pricing/"
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
          >
            <span>Pricing</span>
            <FiExternalLink className="item-arrow" />
          </a>

          {/* Contact */}
          <button
            className="drawer-nav-item"
            onClick={() => handleNav(contactIndex >= 0 ? contactIndex : 0)}
          >
            <span>Contact</span>
            <FiChevronRight className="item-arrow" />
          </button>
        </nav>
      </div>

      <div className="drawer-foot">
        <a
          className="drawer-secondary"
          href="https://sigmavalue.ai/auth/signin"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Sign In
        </a>
        <button
          className="drawer-primary"
          type="button"
          onClick={() => handleNav(contactIndex >= 0 ? contactIndex : 0)}
        >
          <span>Request Demo</span>
          <FiArrowUpRight />
        </button>
      </div>
    </Offcanvas>
  );
}

export { SiteDrawer };
