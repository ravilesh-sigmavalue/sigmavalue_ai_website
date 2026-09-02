import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

import {
  FiArrowUpRight,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
  FiX,
} from "react-icons/fi";

import { CHAPTERS } from "../experience/data/chapters";

const ABOUT_ITEMS = [
  ["team", "Our Team"],
  ["mission", "Mission and Vision"],
  ["awards", "Awards and Recognition"],
  ["partners", "Our Partners"],
];

function SiteDrawer({
  open,
  setOpen,
  go,
  theme,
  onRequestDemo,
  onAboutUs,
  onTechnologyTransformation,
  onIntelligenceDecisionMaking,
  onStrategicAdvisory,
}) {
  const [openSection, setOpenSection] = useState("offer");

  useEffect(() => {
    if (open) {
      setOpenSection("offer");
    }
  }, [open]);

  const first = (cat) =>
    CHAPTERS.findIndex(
      (chapter) => chapter.cat === cat
    );

  const marketLensIndex =
    CHAPTERS.findIndex((chapter) =>
      chapter.title
        ?.toUpperCase()
        .includes("MARKETLENS")
    );

  const platformIndex = first("Platform");
  const contactIndex = CHAPTERS.length - 1;

  const closeDrawer = () => {
    setOpen?.(false);
  };

  const handleNav = (target) => {
    closeDrawer();

    if (
      typeof target === "number" &&
      target >= 0
    ) {
      requestAnimationFrame(() => {
        go?.(target);
      });
    }
  };

  const handleAction = (action) => {
    closeDrawer();

    requestAnimationFrame(() => {
      action?.();
    });
  };

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section
        ? null
        : section
    );
  };

  return (
    <Offcanvas
      id="siteDrawer"
      placement="end"
      show={open}
      onHide={closeDrawer}
      backdrop
      keyboard
      scroll={false}
      className={open ? "open" : ""}
      aria-labelledby="siteDrawerLabel"
    >
      <div className="drawer-head">
        <a
          href="#"
          className="drawer-brand"
          aria-label="SigmaValue home"
          onClick={(event) => {
            event.preventDefault();
            handleNav(0);
          }}
        >
          <img
            src={
              theme === "light"
                ? "/branding/logo-mobile-light.png"
                : "/branding/logo-mobile-dark.png"
            }
            alt="SigmaValue"
            className="drawer-logo-img"
          />
        </a>

        <button
          type="button"
          className="drawer-close"
          onClick={closeDrawer}
          aria-label="Close navigation menu"
        >
          <FiX aria-hidden="true" />
        </button>
      </div>

      <div className="drawer-body">
        <nav
          className="drawer-nav-list"
          aria-label="Tablet navigation"
        >
          <button
            type="button"
            className="drawer-nav-item"
            onClick={() => handleNav(0)}
          >
            <span>Home</span>
            <FiChevronRight
              className="item-arrow"
              aria-hidden="true"
            />
          </button>

          <div className="drawer-accordion">
            <button
              type="button"
              className="drawer-nav-item accordion-trigger"
              onClick={() => toggleSection("offer")}
              aria-expanded={openSection === "offer"}
              aria-controls="drawer-offer-menu"
            >
              <span>What we offer</span>

              <FiChevronDown
                aria-hidden="true"
                className={`accordion-chevron ${openSection === "offer"
                    ? "open"
                    : ""
                  }`}
              />
            </button>

            {openSection === "offer" && (
              <div
                id="drawer-offer-menu"
                className="drawer-submenu"
              >
                <button
                  type="button"
                  className="drawer-subitem"
                  onClick={() =>
                    handleNav(
                      platformIndex >= 0
                        ? platformIndex
                        : 1
                    )
                  }
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Agentic AI
                    </span>

                    <span className="subitem-desc">
                      Autonomous real estate intelligence agents
                    </span>
                  </div>

                  <FiChevronRight
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  className="drawer-subitem"
                  onClick={() =>
                    handleNav(
                      marketLensIndex >= 0
                        ? marketLensIndex
                        : 0
                    )
                  }
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      MarketLens
                    </span>

                    <span className="subitem-desc">
                      Spatial micro-market intelligence
                    </span>
                  </div>

                  <FiChevronRight
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </button>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/simulator-page"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeDrawer}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Simulator 361
                    </span>

                    <span className="subitem-desc">
                      Feasibility &amp; IRR simulation agent
                    </span>
                  </div>

                  <FiExternalLink
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/valuation-overview"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeDrawer}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Automated Valuation (AVM)
                    </span>

                    <span className="subitem-desc">
                      Institutional precision pricing
                    </span>
                  </div>

                  <FiExternalLink
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/sigmatrack"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeDrawer}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      SIGMATRACK
                    </span>

                    <span className="subitem-desc">
                      Transaction intelligence &amp; comps
                    </span>
                  </div>

                  <FiExternalLink
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </a>

                <a
                  className="drawer-subitem"
                  href="https://sigmavalue.ai/propgpt-overview"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeDrawer}
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      PropGPT v3
                    </span>

                    <span className="subitem-desc">
                      Conversational real estate insights
                    </span>
                  </div>

                  <FiExternalLink
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </a>
              </div>
            )}
          </div>

          <div className="drawer-accordion">
            <button
              type="button"
              className="drawer-nav-item accordion-trigger"
              onClick={() =>
                toggleSection("solutions")
              }
              aria-expanded={
                openSection === "solutions"
              }
              aria-controls="drawer-solutions-menu"
            >
              <span>Solutions</span>

              <FiChevronDown
                aria-hidden="true"
                className={`accordion-chevron ${openSection === "solutions"
                    ? "open"
                    : ""
                  }`}
              />
            </button>

            {openSection === "solutions" && (
              <div
                id="drawer-solutions-menu"
                className="drawer-submenu"
              >
                <button
                  type="button"
                  className="drawer-subitem"
                  onClick={() =>
                    handleAction(
                      onTechnologyTransformation
                    )
                  }
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Technology &amp; Transformation
                    </span>

                    <span className="subitem-desc">
                      AI platforms, automation and enterprise integration
                    </span>
                  </div>

                  <FiChevronRight
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  className="drawer-subitem"
                  onClick={() =>
                    handleAction(
                      onIntelligenceDecisionMaking
                    )
                  }
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Intelligence &amp; Decision-Making
                    </span>

                    <span className="subitem-desc">
                      Market, location, feasibility and investment intelligence
                    </span>
                  </div>

                  <FiChevronRight
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  className="drawer-subitem"
                  onClick={() =>
                    handleAction(
                      onStrategicAdvisory
                    )
                  }
                >
                  <div className="subitem-text">
                    <span className="subitem-title">
                      Strategic Advisory
                    </span>

                    <span className="subitem-desc">
                      Transaction, capital and strategic advisory
                    </span>
                  </div>

                  <FiChevronRight
                    className="subitem-icon"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>

          <div className="drawer-accordion">
            <button
              type="button"
              className="drawer-nav-item accordion-trigger"
              onClick={() => toggleSection("about")}
              aria-expanded={openSection === "about"}
              aria-controls="drawer-about-menu"
            >
              <span>About Us</span>

              <FiChevronDown
                aria-hidden="true"
                className={`accordion-chevron ${openSection === "about"
                    ? "open"
                    : ""
                  }`}
              />
            </button>

            {openSection === "about" && (
              <div
                id="drawer-about-menu"
                className="drawer-submenu"
              >
                {ABOUT_ITEMS.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className="drawer-subitem"
                    onClick={() => {
                      closeDrawer();

                      requestAnimationFrame(() => {
                        onAboutUs?.(id);
                      });
                    }}
                  >
                    <div className="subitem-text">
                      <span className="subitem-title">
                        {label}
                      </span>
                    </div>

                    <FiChevronRight
                      className="subitem-icon"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            className="drawer-nav-item"
            href="https://sigmavalue.ai/blogs/"
            target="_blank"
            rel="noreferrer"
            onClick={closeDrawer}
          >
            <span>Blog</span>

            <FiExternalLink
              className="item-arrow"
              aria-hidden="true"
            />
          </a>

          <Link
            className="drawer-nav-item"
            to="/pricing"
            onClick={closeDrawer}
          >
            <span>Pricing</span>

            <FiChevronRight
              className="item-arrow"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="drawer-nav-item"
            onClick={() =>
              handleNav(
                contactIndex >= 0
                  ? contactIndex
                  : 0
              )
            }
          >
            <span>Contact Us</span>

            <FiChevronRight
              className="item-arrow"
              aria-hidden="true"
            />
          </button>
        </nav>
      </div>

      <div className="drawer-foot">
        <a
          className="drawer-secondary"
          href="https://sigmavalue.ai/auth/signin"
          target="_blank"
          rel="noreferrer"
          onClick={closeDrawer}
        >
          Sign In
        </a>

        <button
          type="button"
          className="drawer-primary"
          onClick={() =>
            handleAction(onRequestDemo)
          }
        >
          <span>Request Demo</span>
          <FiArrowUpRight aria-hidden="true" />
        </button>
      </div>
    </Offcanvas>
  );
}

export { SiteDrawer };
