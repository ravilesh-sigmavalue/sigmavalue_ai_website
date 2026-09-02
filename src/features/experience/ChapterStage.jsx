import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiCompass,
  FiExternalLink,
  FiMapPin,
  FiSearch,
  FiX,
} from "react-icons/fi";

import {
  accentRgba,
  buildPhotoSvg,
} from "../../shared/utils/art";

import { PersonaDetailPanel } from "../personas/PersonaDetailPanel";
import { PersonaKeyBenefitsAndOfferings } from "../personas/PersonaKeyBenefitsAndOfferings";
import { WhoYouAreCard } from "../personas/WhoYouAreCard";

import { AgentPlatformModal } from "../services/modals/agent-platform/AgentPlatformModal";
import { EnterpriseAIModal } from "../services/modals/enterprise-ai/EnterpriseAIModal";
import { CrossIndustryModal } from "../services/modals/cross-industry/CrossIndustryModal";
import { RealEstateTechnologyModal } from "../services/modals/real-estate-technology/RealEstateTechnologyModal";
import { DealStructuringCapitalAdvisoryModal } from "../services/modals/deal-structuring/DealStructuringCapitalAdvisoryModal";
import { StrategicTransactionModal } from "../services/modals/strategic-transaction/StrategicTransactionModal";
import { ServicesAdvisoryModal } from "../services/modals/services-advisory/ServicesAdvisoryModal";

import { HeroStage } from "./HeroStage";

import {
  agentGroups,
  crossIndustrySolutions,
  dealStructuringSolutions,
  realEstateTechnologySolutions,
  servicesAdvisorySolutions,
  strategicTransactionSolutions,
} from "../services/ServiceConstellation";


/* =========================================================
   RESPONSIVE BREAKPOINTS

   <= 620px
   MobileExperience handles rendering, so this component
   normally does not render.

   621px - 900px
   Tablet focused-card layout.

   901px - 1200px
   Compact 3D carousel.

   1201px+
   Full 3D carousel.
========================================================= */

const TABLET_BREAKPOINT = 900;
const COMPACT_DESKTOP_BREAKPOINT = 1200;


/* =========================================================
   VIEWPORT WIDTH HOOK
========================================================= */

function useViewportWidth() {
  const [width, setWidth] = useState(() => {
    if (typeof window === "undefined") {
      return 1440;
    }

    return window.innerWidth;
  });


  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }


    let resizeRaf = 0;


    const updateWidth = () => {
      window.cancelAnimationFrame(resizeRaf);

      resizeRaf = window.requestAnimationFrame(() => {
        setWidth(window.innerWidth);
      });
    };


    window.addEventListener(
      "resize",
      updateWidth,
      {
        passive: true,
      }
    );


    return () => {
      window.cancelAnimationFrame(resizeRaf);

      window.removeEventListener(
        "resize",
        updateWidth
      );
    };
  }, []);


  return width;
}


/* =========================================================
   EXPLORE CONTENT
========================================================= */

const exploreModalContent = {
  2: {
    eyebrow: "CROSS-INDUSTRY AGENTIC AI",

    title:
      "From AI opportunity to enterprise-scale impact.",

    subtitle:
      "End-to-end advisory, implementation and optimization across industries and business functions.",

    solutions:
      crossIndustrySolutions,
  },

  3: {
    eyebrow:
      "REAL ESTATE TECHNOLOGY & DIGITAL TRANSFORMATION SERVICES",

    title:
      "Transform every stage of real estate operations.",

    subtitle:
      "Connected technology, intelligent data and modern platforms for the complete real estate lifecycle.",

    solutions:
      realEstateTechnologySolutions,
  },

  4: {
    eyebrow:
      "DEAL STRUCTURING & CAPITAL ADVISORY",

    title:
      "Structure stronger deals and smarter capital.",

    subtitle:
      "Integrated transaction, financing and investment advisory designed to optimize risk, returns and project economics.",

    solutions:
      dealStructuringSolutions,
  },

  5: {
    eyebrow:
      "STRATEGIC TRANSACTION",

    title:
      "Navigate every transaction with clarity.",

    subtitle:
      "End-to-end strategic, diligence and execution support for complex real estate transactions.",

    solutions:
      strategicTransactionSolutions,
  },

  6: {
    eyebrow:
      "SERVICES ADVISORY",

    title:
      "Decision-ready real estate advisory.",

    subtitle:
      "Specialist intelligence and analysis for valuation, viability, markets and development decisions.",

    solutions:
      servicesAdvisorySolutions,
  },
};


/* =========================================================
   UTILITY
========================================================= */

function Utility({ chapter }) {
  const [city, setCity] =
    useState("");

  const [error, setError] =
    useState(false);


  if (chapter.num === "01") {
    return (
      <>
        {/*
        <div className="utility-bento">

          <div className="utility-header">
            <FiCompass className="utility-icon" />
            <span>Live SigmaValue Ecosystem</span>
          </div>

          <div className="quick-routes-grid">

            <a
              href="https://sigmavalue.ai/simulator-page"
              target="_blank"
              rel="noreferrer"
              className="route-chip"
            >
              <span>Simulator 361</span>
              <FiExternalLink />
            </a>

            <a
              href="https://sigmavalue.ai/valuation-overview"
              target="_blank"
              rel="noreferrer"
              className="route-chip"
            >
              <span>Valuation AVM</span>
              <FiExternalLink />
            </a>

            <a
              href="https://sigmavalue.ai/sigmatrack"
              target="_blank"
              rel="noreferrer"
              className="route-chip"
            >
              <span>SIGMATRACK</span>
              <FiExternalLink />
            </a>

            <a
              href="https://sigmavalue.ai/real-estate-consultancy/"
              target="_blank"
              rel="noreferrer"
              className="route-chip"
            >
              <span>Consultancy</span>
              <FiExternalLink />
            </a>

            <a
              href="https://os.sigmavalue.ai/"
              target="_blank"
              rel="noreferrer"
              className="route-chip featured"
            >
              <span>SigmaValue OS</span>
              <FiExternalLink />
            </a>

          </div>

        </div>
        */}
      </>
    );
  }


  if (chapter.num !== "09") {
    return null;
  }


  const open = () => {
    const cleanedCity =
      city.trim();


    if (!cleanedCity) {
      setError(true);
      return;
    }


    window.location.href =
      `https://sigmavalue.ai/MapView/?city=${encodeURIComponent(
        cleanedCity
      )}`;
  };


  return (
    <div className="utility-bento">

      <div className="utility-header">

        <FiSearch
          className="utility-icon"
        />

        <span>
          Live Market Intelligence Map
        </span>

      </div>


      <div className="city-search-box">

        <input
          value={city}

          aria-label="Search city"

          onChange={(event) => {
            setCity(
              event.target.value
            );

            setError(false);
          }}

          onKeyDown={(event) => {
            if (
              event.key === "Enter"
            ) {
              open();
            }
          }}

          placeholder="Search city (e.g. Pune, Mumbai, Bangalore)..."
        />


        <button
          type="button"
          onClick={open}
        >

          <span>
            Open Map
          </span>

          <FiArrowUpRight />

        </button>

      </div>


      {error && (

        <div className="utility-error show">
          Please enter a city name to search
        </div>

      )}

    </div>
  );
}


/* =========================================================
   LEGACY HERO STAGE
========================================================= */

function LegacyHeroStage({
  onExplore,
}) {
  return (
    <motion.div
      className="hero-stage-card"

      initial={{
        opacity: 0,
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      exit={{
        opacity: 0,
        y: -20,
      }}

      transition={{
        duration: 0.5,
      }}
    >

      <div className="hero-badge">

        <span className="pulse-dot" />

        <span>
          NEXT-GEN REAL ESTATE INTELLIGENCE
        </span>

      </div>


      <h1 className="hero-title">

        Autonomous Real Estate{" "}

        <span className="gradient-text">
          Valuation &amp; Analytics
        </span>

      </h1>


      <p className="hero-description">

        AI-driven feasibility agents,
        institutional-grade automated valuation
        models (AVM), and spatial market
        intelligence engineered for developers,
        investors, and lenders.

      </p>


      <div className="hero-actions">

        <a
          href="https://os.sigmavalue.ai/"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
        >

          <span>
            Launch SigmaValue OS
          </span>

          <FiArrowUpRight />

        </a>


        <a
          href="https://sigmavalue.ai/simulator-page"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
        >

          <span>
            Explore Simulator 361
          </span>

        </a>

      </div>


      <div className="hero-stats-grid">

        <div className="stat-card">

          <div className="stat-value">
            98.4%
          </div>

          <div className="stat-label">
            Valuation Precision
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-value">
            10M+
          </div>

          <div className="stat-label">
            Indexed Records
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-value">
            &lt; 3 Min
          </div>

          <div className="stat-label">
            Feasibility Run Time
          </div>

        </div>

      </div>

    </motion.div>
  );
}


/* =========================================================
   CHAPTER STAGE
========================================================= */

function ChapterStage({
  chapters,
  active,
  theme,
}) {

  const ch =
    chapters[active];


  const carousel =
    useRef(null);


  const [
    exploreCard,
    setExploreCard,
  ] = useState(null);


  /* =======================================================
     RESPONSIVE VIEWPORT STATE
  ======================================================= */

  const viewportWidth =
    useViewportWidth();


  const isTablet =
    viewportWidth <=
    TABLET_BREAKPOINT;


  const isCompactDesktop =
    viewportWidth <=
    COMPACT_DESKTOP_BREAKPOINT;


  /*
    Desktop:
      460px depth

    Laptop:
      300px depth

    Tablet:
      no 3D depth
  */

  const carouselDepth =
    isTablet
      ? 0
      : isCompactDesktop
        ? 300
        : 460;


  const carouselVerticalStep =
    isTablet
      ? 0
      : isCompactDesktop
        ? 85
        : 130;


  /* =======================================================
     CAROUSEL SCROLL ANIMATION
  ======================================================= */

  useEffect(() => {

    const carouselElement =
      carousel.current;


    if (!carouselElement) {
      return undefined;
    }


    let animationFrame = 0;


    const getScrollProgress = () => {

      const viewportHeight =
        Math.max(
          window.innerHeight,
          1
        );


      return (
        window.scrollY /
        viewportHeight
      );
    };


    let raw =
      getScrollProgress();


    let smooth =
      raw;


    const updateScroll = () => {
      raw =
        getScrollProgress();
    };


    const tick = () => {

      animationFrame =
        window.requestAnimationFrame(
          tick
        );


      smooth +=
        (raw - smooth) *
        0.065;


      const cards =
        carouselElement.querySelectorAll(
          ".bcard"
        );


      /* ===================================================
         TABLET MODE
         621px - 900px

         No rotating 3D carousel.

         Keep only the current/focused card visible.
      =================================================== */

      if (isTablet) {

        carouselElement.style.transform =
          "translate(-50%, -50%)";


        cards.forEach(
          (
            card,
            cardPosition
          ) => {

            const index =
              cardPosition + 1;


            const distance =
              Math.abs(
                index - smooth
              );


            const focus =
              Math.max(
                0,
                1 -
                Math.min(
                  distance,
                  1
                )
              );


            const isFocused =
              focus > 0.45;


            card.style.transform =
              "translate(-50%, -50%)";


            card.style.opacity =
              isFocused
                ? "1"
                : "0";


            card.style.filter =
              "none";


            card.style.pointerEvents =
              isFocused
                ? "auto"
                : "none";


            card.style.zIndex =
              isFocused
                ? "20"
                : "0";


            if (isFocused) {

              card.classList.add(
                "front"
              );

            } else {

              card.classList.remove(
                "front"
              );
            }
          }
        );


        return;
      }


      /* ===================================================
         LAPTOP + DESKTOP 3D MODE
         901px+
      =================================================== */

      const drop =
        isCompactDesktop
          ? 70
          : 120;


      const angle =
        smooth * 0.72;


      carouselElement.style.transform =
        `
          translate(-50%, -50%)
          rotateY(${(-angle * 180) /
        Math.PI
        }deg)
          translateY(${Math.max(
          0,
          smooth - 1
        ) * drop
        }px)
        `;


      cards.forEach(
        (
          card,
          cardPosition
        ) => {

          const index =
            cardPosition + 1;


          const distance =
            Math.abs(
              index - smooth
            );


          const focus =
            Math.max(
              0,
              1 -
              Math.min(
                distance,
                1
              )
            );


          card.style.opacity =
            String(
              0.06 +
              focus * 0.9
            );


          card.style.filter =
            `
              brightness(${0.4 +
            focus * 0.6
            })
              saturate(${0.5 +
            focus * 0.5
            })
            `;


          card.style.zIndex =
            String(
              Math.round(
                focus * 10
              )
            );


          card.style.pointerEvents =
            focus > 0.6
              ? "auto"
              : "none";


          if (focus > 0.6) {

            card.classList.add(
              "front"
            );

          } else {

            card.classList.remove(
              "front"
            );
          }
        }
      );
    };


    window.addEventListener(
      "scroll",
      updateScroll,
      {
        passive: true,
      }
    );


    tick();


    return () => {

      window.cancelAnimationFrame(
        animationFrame
      );


      window.removeEventListener(
        "scroll",
        updateScroll
      );
    };

  }, [
    isTablet,
    isCompactDesktop,
  ]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div id="content">


      {/* ===================================================
          3D / TABLET SERVICE CARDS
      =================================================== */}

      <div
        id="carousel3d"

        ref={carousel}

        className={
          ch?.key === "ch"
            ? "show"
            : ""
        }
      >

        {chapters.map(
          (
            card,
            idx
          ) => {

            if (
              card.key !== "ch"
            ) {
              return null;
            }


            const initialTransform =
              isTablet

                ? "translate(-50%, -50%)"

                : `
                    translate(-50%, -50%)

                    rotateY(${(
                  idx *
                  0.72 *
                  180
                ) /
                Math.PI
                }deg)

                    translateZ(
                      ${carouselDepth}px
                    )

                    translateY(
                      ${-(idx - 1) *
                carouselVerticalStep
                }px
                    )
                  `;


            return (

              <div
                key={
                  card.id ||
                  card.num ||
                  card.title ||
                  idx
                }

                className={`bcard ${idx === active
                    ? "front"
                    : ""
                  }`}

                style={{
                  transform:
                    initialTransform,
                }}
              >

                {/* =========================================
                    BACKGROUND PHOTO
                ========================================= */}

                <div
                  className="bphoto"

                  style={{
                    backgroundImage:
                      `url('${buildPhotoSvg(
                        card
                      )}')`,
                  }}
                />


                {/* =========================================
                    ACCENT TINT
                ========================================= */}

                <div
                  className="btint"

                  style={{
                    background:
                      `linear-gradient(
                        160deg,
                        ${accentRgba(
                        card.accent,
                        0.35
                      )},
                        transparent 60%
                      )`,
                  }}
                />


                <div className="bsheen" />


                {/* =========================================
                    CARD CONTENT
                ========================================= */}

                <div className="bcard-overlay">


                  {/* =======================================
                      CARD HEADER
                  ======================================= */}

                  <div className="bcard-header">

                    <div className="bcard-badge-row">

                      <span className="chapter-pill">
                        {card.num}
                      </span>


                      {/*
                      <span className="category-pill">
                        {card.cat || "Overview"}
                      </span>


                      {card.loc && (

                        <span className="location-pill">

                          <FiMapPin className="pill-icon" />

                          {card.loc}

                        </span>

                      )}
                      */}

                    </div>


                    <h3 className="bcard-title">
                      {card.title}
                    </h3>

                  </div>


                  {/* =======================================
                      DESCRIPTION
                  ======================================= */}

                  {card.desc && (

                    <p className="bcard-desc">
                      {card.desc}
                    </p>

                  )}


                  {/* =======================================
                      AGENTIC AI PLATFORM IMAGE
                  ======================================= */}

                  {idx === 1 && (

                    <div
                      className="bcard-visual"
                      aria-hidden="true"
                    >

                      <img
                        src="/images/agentic-ai-platform.png"
                        alt=""
                        loading="lazy"
                        className="bcard-visual-image"
                      />

                    </div>

                  )}


                  {/* =======================================
                      ENTERPRISE AI IMAGE
                  ======================================= */}

                  {idx === 2 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--enterprise
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/enterprise-ai-modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--enterprise
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      CROSS INDUSTRY IMAGE
                  ======================================= */}

                  {idx === 3 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--cross-industry
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/crossindustry-modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--cross-industry
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      REAL ESTATE TECHNOLOGY IMAGE
                  ======================================= */}

                  {idx === 4 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--real-estate
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/realestate_modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--real-estate
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      DEAL STRUCTURING IMAGE
                  ======================================= */}

                  {idx === 5 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--deal-structuring
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/deal-structuring-modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--deal-structuring
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      STRATEGIC TRANSACTION IMAGE
                  ======================================= */}

                  {idx === 6 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--strategictransaction-modal
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/strategictransaction-modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--strategictransaction-modal
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      SERVICES ADVISORY IMAGE
                  ======================================= */}

                  {idx === 7 && (

                    <div
                      className="
                        bcard-visual
                        bcard-visual--services-modal
                      "
                      aria-hidden="true"
                    >

                      <img
                        src="/images/services-modal.png"
                        alt=""
                        loading="lazy"
                        className="
                          bcard-visual-image
                          bcard-visual-image--services-modal
                        "
                      />

                    </div>

                  )}


                  {/* =======================================
                      EXPLORE BUTTON
                  ======================================= */}

                  {card.action && (

                    <div className="bcard-action-row">

                      <button
                        type="button"

                        className="
                          btn-primary
                          bcard-action-btn
                        "

                        onClick={() => {
                          setExploreCard(
                            idx - 1
                          );
                        }}
                      >

                        <span>
                          Explore More
                        </span>

                        <FiArrowUpRight />

                      </button>

                    </div>

                  )}


                  {/* =======================================
                      UTILITY
                  ======================================= */}

                  <Utility
                    chapter={card}
                  />

                </div>

              </div>
            );
          }
        )}

      </div>


      {/* ===================================================
          HERO
      =================================================== */}

      <AnimatePresence mode="wait">

        {ch?.key === "hero" && (

          <HeroStage
            key="hero"
          />

        )}

      </AnimatePresence>


      {/* ===================================================
          AGENT PLATFORM MODAL
      =================================================== */}

      <AgentPlatformModal
        show={
          exploreCard === 0
        }

        onHide={() => {
          setExploreCard(null);
        }}

        groups={agentGroups}

        theme={theme}
      />


      {/* ===================================================
          ENTERPRISE AI MODAL
      =================================================== */}

      <EnterpriseAIModal
        show={
          exploreCard === 1
        }

        onHide={() => {
          setExploreCard(null);
        }}

        variant="connected"

        theme={theme}
      />


      {/* ===================================================
          CROSS INDUSTRY MODAL
      =================================================== */}

      <CrossIndustryModal
        show={
          exploreCard === 2
        }

        onHide={() => {
          setExploreCard(null);
        }}

        solutions={
          crossIndustrySolutions
        }

        theme={theme}
      />


      {/* ===================================================
          REAL ESTATE TECHNOLOGY MODAL
      =================================================== */}

      <RealEstateTechnologyModal
        show={
          exploreCard === 3
        }

        onHide={() => {
          setExploreCard(null);
        }}

        theme={theme}
      />


      {/* ===================================================
          DEAL STRUCTURING MODAL
      =================================================== */}

      <DealStructuringCapitalAdvisoryModal
        show={
          exploreCard === 4
        }

        onHide={() => {
          setExploreCard(null);
        }}

        theme={theme}
      />


      {/* ===================================================
          STRATEGIC TRANSACTION MODAL
      =================================================== */}

      <StrategicTransactionModal
        show={
          exploreCard === 5
        }

        onHide={() => {
          setExploreCard(null);
        }}

        theme={theme}
      />


      {/* ===================================================
          SERVICES ADVISORY MODAL
      =================================================== */}

      <ServicesAdvisoryModal
        show={
          exploreCard === 6
        }

        onHide={() => {
          setExploreCard(null);
        }}

        theme={theme}
      />

    </div>
  );
}


/* =========================================================
   LEGACY CONTACT CHAPTER
========================================================= */

function LegacyContactChapter({
  show,
  title,
  onClose,
}) {

  const [
    selectedPersona,
    setSelectedPersona,
  ] = useState(null);


  const handleSelect = (
    personaId
  ) => {
    setSelectedPersona(
      personaId
    );
  };


  if (!show) {
    return null;
  }


  /* =======================================================
     PERSONA DETAIL
  ======================================================= */

  if (selectedPersona) {

    return (
      <motion.div
        id="contact"

        className="
          contact-panel
          who-you-are-panel
        "

        initial={{
          opacity: 0,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        exit={{
          opacity: 0,
          scale: 0.96,
        }}

        transition={{
          duration: 0.35,
        }}
      >

        <div
          className="
            who-you-are-card
            who-you-are-card--wide
          "
        >

          <div className="who-you-are-matrix-bg" />


          <PersonaDetailPanel
            personaId={
              selectedPersona
            }

            onBack={() => {
              setSelectedPersona(
                null
              );
            }}

            onSelectPersona={
              setSelectedPersona
            }
          />

        </div>

      </motion.div>
    );
  }


  /* =======================================================
     PERSONA SELECTION
  ======================================================= */

  return (
    <motion.div
      id="contact"

      className="
        contact-panel
        who-you-are-panel
      "

      initial={{
        opacity: 0,
        scale: 0.96,
      }}

      animate={{
        opacity: 1,
        scale: 1,
      }}

      exit={{
        opacity: 0,
        scale: 0.96,
      }}

      transition={{
        duration: 0.4,
      }}
    >

      <div className="who-you-are-card">


        {/* =================================================
            CLOSE
        ================================================= */}

        <button
          type="button"

          className="who-you-are-close"

          onClick={onClose}

          aria-label="Close Who you are panel"
        >

          <FiX />

        </button>


        {/* =================================================
            MATRIX BACKGROUND
        ================================================= */}

        <div className="who-you-are-matrix-bg" />


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="who-you-are-header">

          <div className="hero-badge">

            <span className="pulse-dot" />

            <span>
              DIRECT ENTERPRISE ENGAGEMENT
            </span>

          </div>


          <h2 className="who-you-are-title">
            Who you are?
          </h2>


          <p className="who-you-are-subtitle">

            Select your industry role to explore
            customized AI solutions and schedule a
            personalized demo.

          </p>

        </div>


        {/* =================================================
            PERSONAS
        ================================================= */}

        <WhoYouAreCard
          selectedPersona={
            selectedPersona
          }

          onSelect={
            handleSelect
          }
        />


        {/* =================================================
            BENEFITS & OFFERINGS
        ================================================= */}

        <PersonaKeyBenefitsAndOfferings />


        {/* =================================================
            NOTE
        ================================================= */}

        <div className="contact-note">

          <span>
            Official inquiry handled directly through
            SigmaValue secure enterprise routing.
          </span>

        </div>


        {/* =================================================
            LINKS
        ================================================= */}

        <div className="contact-links">

          <a
            href="https://sigmavalue.ai/"
            target="_blank"
            rel="noreferrer"
          >
            Main Website
          </a>


          <span className="sep">
            •
          </span>


          <a
            href="https://sigmavalue.ai/real-estate-consultancy/"
            target="_blank"
            rel="noreferrer"
          >
            Consultancy
          </a>


          <span className="sep">
            •
          </span>


          <a
            href="https://os.sigmavalue.ai/"
            target="_blank"
            rel="noreferrer"
          >
            SigmaValue OS
          </a>

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="foot">
          © 2025 Creasophere Tech Private Limited.
          All rights reserved.
        </div>

      </div>

    </motion.div>
  );
}


export {
  ChapterStage,
};