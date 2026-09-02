import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiMenu,
} from "react-icons/fi";

import { CHAPTERS } from "../experience/data/chapters";


/* =========================================================
   WHAT WE OFFER
========================================================= */

const OFFER_GROUPS = [
  {
    id: "products",
    label: "Products",

    items: [
      {
        title: "Agentic AI",
        description:
          "Autonomous real estate intelligence agents",
      },

      {
        title: "Market Lens",
        description:
          "Spatial micro-market intelligence",
      },
    ],
  },

  {
    id: "services",
    label: "Services",

    items: [
      {
        title: "Valuation",
        description:
          "Institutional precision pricing (AVM)",
        href:
          "https://sigmavalue.ai/valuation-overview",
      },

      {
        title: "TEV",
        description:
          "Total economic value assessment",
      },

      {
        title: "Catchment Intelligence (MMA)",
        description:
          "Micro-market area analysis",
      },

      {
        title: "Feasibility",
        description:
          "Feasibility & IRR simulation agent",
        href:
          "https://sigmavalue.ai/simulator-page",
      },
    ],
  },
];


/* =========================================================
   SOLUTIONS
========================================================= */

const SOLUTION_GROUPS = [
  {
    id: "tech",

    label:
      "Technology & Transformation",

    action:
      "technology-transformation",

    items: [
      {
        title:
          "Digital Transformation through AI Platforms",
      },

      {
        title:
          "Agentic AI & Workflow Automation",
      },

      {
        title:
          "Custom AI Solutions & Enterprise Integration",
      },
    ],
  },

  {
    id: "intelligence",

    label:
      "Intelligence & Decision-Making",

    action:
      "intelligence-decision-making",

    items: [
      {
        title:
          "Market & Data Intelligence",
      },

      {
        title:
          "Geo-Spatial & Location Intelligence",
      },

      {
        title:
          "Project Feasibility & Development Intelligence",
      },

      {
        title:
          "Investment & Portfolio Intelligence",
      },
    ],
  },

  {
    id: "advisory",

    label:
      "Strategic Advisory",

    action:
      "strategic-advisory",

    items: [
      {
        title:
          "Transaction, Capital & Strategic Advisory",
      },
    ],
  },
];


/* =========================================================
   ABOUT US
========================================================= */

const ABOUT_ITEMS = [
  ["team", "Our Team"],
  ["mission", "Mission and Vision"],
  ["awards", "Awards and Recognition"],
  ["partners", "Our Partners"],
];


/* =========================================================
   DROPDOWN GROUP
========================================================= */

function DropdownGroup({
  group,
  active,
  onToggle,
  onAction,
}) {

  const handleClick = () => {

    if (group.action) {
      onAction?.(group.action);
      return;
    }

    onToggle?.();
  };


  return (
    <>
      <button
        type="button"
        className={`offer-category-header ${active ? "active" : ""
          }`}
        onClick={handleClick}
        aria-expanded={
          group.action
            ? undefined
            : active
        }
      >

        <span className="offer-cat-label">
          {group.label}
        </span>


        {!group.action && (
          <FiChevronDown
            aria-hidden="true"
            className={`chevron ${active ? "rotate" : ""
              }`}
          />
        )}


        {group.action && (
          <FiArrowUpRight
            aria-hidden="true"
            className="chevron"
          />
        )}

      </button>


      {active && !group.action && (

        <div className="offer-sub-items">

          {group.items.map((item) => {

            const content = (
              <>
                <div className="item-title">
                  {item.title}
                </div>

                {item.description && (
                  <div className="item-desc">
                    {item.description}
                  </div>
                )}
              </>
            );


            if (item.href) {

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="dropdown-item offer-sub-item"
                >
                  {content}
                </a>
              );
            }


            return (
              <div
                key={item.title}
                className="dropdown-item offer-sub-item"
              >
                {content}
              </div>
            );
          })}

        </div>
      )}
    </>
  );
}


/* =========================================================
   HEADER
========================================================= */

export function Header({
  go,

  onMenu,

  onRequestDemo,

  onAboutUs,

  onTechnologyTransformation,

  onIntelligenceDecisionMaking,

  onStrategicAdvisory,
}) {

  const headerRef =
    useRef(null);


  const [openMenu, setOpenMenu] =
    useState(null);


  const [activeOffer, setActiveOffer] =
    useState(null);


  const [activeSolution, setActiveSolution] =
    useState(null);


  /* =======================================================
     CLOSE ALL DROPDOWNS
  ======================================================= */

  const closeAll = () => {

    setOpenMenu(null);

    setActiveOffer(null);

    setActiveSolution(null);
  };


  /* =======================================================
     OUTSIDE CLICK + ESCAPE
  ======================================================= */

  useEffect(() => {

    const closeOnOutsideClick = (
      event
    ) => {

      if (
        !headerRef.current?.contains(
          event.target
        )
      ) {
        closeAll();
      }
    };


    const closeOnEscape = (
      event
    ) => {

      if (
        event.key === "Escape"
      ) {
        closeAll();
      }
    };


    document.addEventListener(
      "pointerdown",
      closeOnOutsideClick
    );


    document.addEventListener(
      "keydown",
      closeOnEscape
    );


    return () => {

      document.removeEventListener(
        "pointerdown",
        closeOnOutsideClick
      );


      document.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };

  }, []);


  /* =======================================================
     BASIC ACTIONS
  ======================================================= */

  const handleHome = (
    event
  ) => {

    event.preventDefault();

    closeAll();

    go?.(0);
  };


  const handleContact = (
    event
  ) => {

    event.preventDefault();

    closeAll();

    go?.(
      CHAPTERS.length - 1
    );
  };


  const handleMobileMenu = () => {

    closeAll();

    onMenu?.();
  };


  const handleRequestDemo = () => {

    closeAll();

    onRequestDemo?.();
  };


  /* =======================================================
     SOLUTION ACTION
  ======================================================= */

  const handleSolutionAction = (
    action
  ) => {

    closeAll();


    switch (action) {

      case "technology-transformation":

        onTechnologyTransformation?.();

        break;


      case "intelligence-decision-making":

        onIntelligenceDecisionMaking?.();

        break;


      case "strategic-advisory":

        onStrategicAdvisory?.();

        break;


      default:

        break;
    }
  };


  /* =======================================================
     DROPDOWN CREATOR
  ======================================================= */

  const dropdown = (
    id,
    label,
    groups
  ) => {

    const isOpen =
      openMenu === id;


    const menuId =
      `header-${id}-menu`;


    return (

      <div className="dropdown-wrapper">

        <button
          className="dropdown-trigger"
          type="button"
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => {

            setOpenMenu(
              isOpen
                ? null
                : id
            );
          }}
        >

          <span>
            {label}
          </span>


          <FiChevronDown
            aria-hidden="true"
            className={`chevron ${isOpen ? "rotate" : ""
              }`}
          />

        </button>


        {isOpen && (

          <div
            id={menuId}
            role="menu"
            className={`
              dropdown-panel
              offer-panel
              ${id === "solutions"
                ? "solutions-panel"
                : ""
              }
            `}
          >

            {groups.map(
              (
                group,
                index
              ) => (

                <div key={group.id}>

                  {index > 0 && (
                    <div className="offer-divider" />
                  )}


                  <DropdownGroup

                    group={group}

                    active={
                      (
                        id === "offer"
                          ? activeOffer
                          : activeSolution
                      ) === group.id
                    }

                    onToggle={() => {

                      if (
                        id === "offer"
                      ) {

                        setActiveOffer(
                          activeOffer ===
                            group.id

                            ? null

                            : group.id
                        );

                      } else {

                        setActiveSolution(
                          activeSolution ===
                            group.id

                            ? null

                            : group.id
                        );
                      }
                    }}

                    onAction={
                      handleSolutionAction
                    }

                  />

                </div>
              )
            )}

          </div>
        )}

      </div>
    );
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <header
      className="site-header"
      ref={headerRef}
    >

      <div className="nav-container">


        {/* =================================================
            BRAND
        ================================================= */}

        <a
          href="#"
          className="brand-link"
          aria-label="SigmaValue home"
          onClick={handleHome}
        >

          <img
            src="/branding/logo-dark-transparent.png"
            alt="SigmaValue"
            className="
              brand-logo-img
              brand-logo-desktop
            "
          />


          <img
            src="/branding/logo-dark-transparent.png"
            alt=""
            aria-hidden="true"
            className="
              brand-logo-img
              brand-logo-mobile
            "
          />

        </a>



        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav
          className="main-nav"
          aria-label="Primary navigation"
        >

          <a
            href="#"
            className="nav-link"
            onClick={handleHome}
          >
            Home
          </a>


          {dropdown(
            "offer",
            "What we offer",
            OFFER_GROUPS
          )}


          {dropdown(
            "solutions",
            "Solutions",
            SOLUTION_GROUPS
          )}



          {/* ===============================================
              ABOUT
          =============================================== */}

          <div className="dropdown-wrapper">

            <button
              className="dropdown-trigger"
              type="button"
              aria-haspopup="menu"
              aria-expanded={
                openMenu === "about"
              }
              aria-controls="header-about-menu"
              onClick={() => {

                setOpenMenu(
                  openMenu === "about"
                    ? null
                    : "about"
                );
              }}
            >

              <span>
                About Us
              </span>


              <FiChevronDown
                aria-hidden="true"
                className={`chevron ${openMenu === "about"
                    ? "rotate"
                    : ""
                  }`}
              />

            </button>


            {openMenu === "about" && (

              <div
                id="header-about-menu"
                role="menu"
                className="
                  dropdown-panel
                  offer-panel
                "
              >

                {ABOUT_ITEMS.map(
                  ([id, label]) => (

                    <button
                      key={id}
                      type="button"
                      className="
                        dropdown-item
                        offer-sub-item
                      "
                      onClick={() => {

                        closeAll();

                        onAboutUs?.(id);
                      }}
                    >

                      <span className="item-title">
                        {label}
                      </span>

                    </button>
                  )
                )}

              </div>
            )}

          </div>



          {/* ===============================================
              BLOG
          =============================================== */}

          <a
            href="https://sigmavalue.ai/blogs/"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            onClick={closeAll}
          >
            Blog
          </a>



          {/* ===============================================
              PRICING
          =============================================== */}

          <Link
            to="/pricing"
            className="nav-link"
            onClick={closeAll}
          >
            Pricing
          </Link>



          {/* ===============================================
              CONTACT
          =============================================== */}

          <a
            href="#"
            className="nav-link"
            onClick={handleContact}
          >
            Contact Us
          </a>

        </nav>



        {/* =================================================
            RIGHT ACTIONS
        ================================================= */}

        <div className="nav-actions">

          <button
            className="btn-header-cta"
            type="button"
            onClick={handleRequestDemo}
          >

            <span>
              Request Demo
            </span>

            <FiArrowUpRight
              aria-hidden="true"
            />

          </button>


          <button
            className="mobile-menu-btn"
            type="button"
            onClick={
              handleMobileMenu
            }
            aria-label="Open navigation menu"
          >

            <FiMenu
              aria-hidden="true"
            />

          </button>

        </div>

      </div>

    </header>
  );
}