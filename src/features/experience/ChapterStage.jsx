import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiCompass, FiExternalLink, FiMapPin, FiSearch, FiX } from "react-icons/fi";
import { accentRgba, buildPhotoSvg } from "../../shared/utils/art";
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
  agentGroups, crossIndustrySolutions, dealStructuringSolutions,
  realEstateTechnologySolutions, servicesAdvisorySolutions, strategicTransactionSolutions,
} from "../services/ServiceConstellation";

const exploreModalContent = {
  2: { eyebrow: "CROSS-INDUSTRY AGENTIC AI", title: "From AI opportunity to enterprise-scale impact.", subtitle: "End-to-end advisory, implementation and optimization across industries and business functions.", solutions: crossIndustrySolutions },
  3: { eyebrow: "REAL ESTATE TECHNOLOGY & DIGITAL TRANSFORMATION SERVICES", title: "Transform every stage of real estate operations.", subtitle: "Connected technology, intelligent data and modern platforms for the complete real estate lifecycle.", solutions: realEstateTechnologySolutions },
  4: { eyebrow: "DEAL STRUCTURING & CAPITAL ADVISORY", title: "Structure stronger deals and smarter capital.", subtitle: "Integrated transaction, financing and investment advisory designed to optimize risk, returns and project economics.", solutions: dealStructuringSolutions },
  5: { eyebrow: "STRATEGIC TRANSACTION", title: "Navigate every transaction with clarity.", subtitle: "End-to-end strategic, diligence and execution support for complex real estate transactions.", solutions: strategicTransactionSolutions },
  6: { eyebrow: "SERVICES ADVISORY", title: "Decision-ready real estate advisory.", subtitle: "Specialist intelligence and analysis for valuation, viability, markets and development decisions.", solutions: servicesAdvisorySolutions },
};

function Utility({ chapter }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  if (chapter.num === "01") {
    return (
      <>
        {/* <div className="utility-bento">
        <div className="utility-header">
          <FiCompass className="utility-icon" />
          <span>Live SigmaValue Ecosystem</span>
        </div>
        <div className="quick-routes-grid">
          <a href="https://sigmavalue.ai/simulator-page" target="_blank" rel="noreferrer" className="route-chip">
            <span>Simulator 361</span>
            <FiExternalLink />
          </a>
          <a href="https://sigmavalue.ai/valuation-overview" target="_blank" rel="noreferrer" className="route-chip">
            <span>Valuation AVM</span>
            <FiExternalLink />
          </a>
          <a href="https://sigmavalue.ai/sigmatrack" target="_blank" rel="noreferrer" className="route-chip">
            <span>SIGMATRACK</span>
            <FiExternalLink />
          </a>
          <a href="https://sigmavalue.ai/real-estate-consultancy/" target="_blank" rel="noreferrer" className="route-chip">
            <span>Consultancy</span>
            <FiExternalLink />
          </a>
          <a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer" className="route-chip featured">
            <span>SigmaValue OS</span>
            <FiExternalLink />
          </a>
        </div>
      </div> */}
      </>
    );
  }

  if (chapter.num !== "09") return null;

  const open = () => {
    if (!city.trim()) {
      setError(true);
      return;
    }
    location.href = `https://sigmavalue.ai/MapView/?city=${encodeURIComponent(city.trim())}`;
  };

  return (
    <div className="utility-bento">
      <div className="utility-header">
        <FiSearch className="utility-icon" />
        <span>Live Market Intelligence Map</span>
      </div>
      <div className="city-search-box">
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && open()}
          placeholder="Search city (e.g. Pune, Mumbai, Bangalore)..."
        />
        <button type="button" onClick={open}>
          <span>Open Map</span>
          <FiArrowUpRight />
        </button>
      </div>
      {error && <div className="utility-error show">Please enter a city name to search</div>}
    </div>
  );
}

function LegacyHeroStage({ onExplore }) {
  return (
    <motion.div
      className="hero-stage-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-badge">
        <span className="pulse-dot" />
        <span>NEXT-GEN REAL ESTATE INTELLIGENCE</span>
      </div>
      <h1 className="hero-title">
        Autonomous Real Estate <span className="gradient-text">Valuation &amp; Analytics</span>
      </h1>
      <p className="hero-description">
        AI-driven feasibility agents, institutional-grade automated valuation models (AVM), and spatial market intelligence engineered for developers, investors, and lenders.
      </p>

      <div className="hero-actions">
        <a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer" className="btn-primary">
          <span>Launch SigmaValue OS</span>
          <FiArrowUpRight />
        </a>
        <a href="https://sigmavalue.ai/simulator-page" target="_blank" rel="noreferrer" className="btn-secondary">
          <span>Explore Simulator 361</span>
        </a>
      </div>

      <div className="hero-stats-grid">
        <div className="stat-card">
          <div className="stat-value">98.4%</div>
          <div className="stat-label">Valuation Precision</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">10M+</div>
          <div className="stat-label">Indexed Records</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">&lt; 3 Min</div>
          <div className="stat-label">Feasibility Run Time</div>
        </div>
      </div>
    </motion.div>
  );
}

function ChapterStage({ chapters, active, theme }) {
  const ch = chapters[active];
  const carousel = useRef(null);
  const [exploreCard, setExploreCard] = useState(null);

  useEffect(() => {
    let raf = 0, raw = scrollY / innerHeight, smooth = raw;
    const update = () => { raw = scrollY / innerHeight; };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      smooth += (raw - smooth) * 0.065;
      if (carousel.current) {
        const isMobile = innerWidth < 768;
        if (isMobile) {
          carousel.current.style.transform = "none";
          carousel.current.querySelectorAll(".bcard").forEach((card, cardPosition) => {
            const index = cardPosition + 1;
            const distance = Math.abs(index - smooth);
            const focus = Math.max(0, 1 - Math.min(distance, 1));
            card.style.transform = "none";
            card.style.opacity = focus > 0.45 ? "1" : "0";
            card.style.pointerEvents = focus > 0.45 ? "auto" : "none";
            card.style.zIndex = focus > 0.45 ? "20" : "0";
            if (focus > 0.45) {
              card.classList.add("front");
            } else {
              card.classList.remove("front");
            }
          });
        } else {
          const mobile = innerWidth < 960;
          const drop = mobile ? 60 : 120;
          const angle = smooth * 0.72;
          carousel.current.style.transform = `translate(-50%,-50%) rotateY(${-angle * 180 / Math.PI}deg) translateY(${Math.max(0, smooth - 1) * drop}px)`;
          carousel.current.querySelectorAll(".bcard").forEach((card, cardPosition) => {
            const index = cardPosition + 1;
            const distance = Math.abs(index - smooth);
            const focus = Math.max(0, 1 - Math.min(distance, 1));
            card.style.opacity = String(0.06 + focus * 0.90);
            card.style.filter = `brightness(${0.4 + focus * 0.6}) saturate(${0.5 + focus * 0.5})`;
            card.style.zIndex = String(Math.round(focus * 10));
            card.style.pointerEvents = focus > 0.6 ? "auto" : "none";
            if (focus > 0.6) {
              card.classList.add("front");
            } else {
              card.classList.remove("front");
            }
          });
        }
      }
    };
    addEventListener("scroll", update, { passive: true });
    tick();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", update);
    };
  }, []);

  return (
    <div id="content">
      {/* 3D Visual Cards Carousel (Positioned on the Right Canvas Area) */}
      <div id="carousel3d" ref={carousel} className={ch.key === "ch" ? "show" : ""}>
        {chapters.map((card, idx) =>
          card.key === "ch" && (
            <div
              key={idx}
              className={`bcard ${idx === active ? "front" : ""}`}
              style={{
                transform: `translate(-50%,-50%) rotateY(${idx * 0.72 * 180 / Math.PI}deg) translateZ(${innerWidth < 960 ? 240 : 460}px) translateY(${-(idx - 1) * (innerWidth < 960 ? 70 : 130)}px)`
              }}
            >
              <div className="bphoto" style={{ backgroundImage: `url('${buildPhotoSvg(card)}')` }} />
              <div className="btint" style={{ background: `linear-gradient(160deg,${accentRgba(card.accent, 0.35)},transparent 60%)` }} />
              <div className="bsheen" />

              {/* Rich Data Layer — Appears when card rotates to front */}
              <div className="bcard-overlay">
                <div className="bcard-header">
                  <div className="bcard-badge-row">
                    <span className="chapter-pill">{card.num}</span>
                    {/* <span className="category-pill">{card.cat || "Overview"}</span>
                    {card.loc && (
                      <span className="location-pill">
                        <FiMapPin className="pill-icon" />
                        {card.loc}
                      </span>
                    )} */}
                  </div>
                  <h3 className="bcard-title">{card.title}</h3>
                </div>

                {card.desc && <p className="bcard-desc">{card.desc}</p>}


                {card.action && (
                  <div className="bcard-action-row">
                    <button type="button" className="btn-primary bcard-action-btn" onClick={() => setExploreCard(idx - 1)}>
                      <span>Explore More</span><FiArrowUpRight />
                    </button>
                  </div>
                )}

                {/* Utility Slot */}
                <Utility chapter={card} />
              </div>
            </div>
          )
        )}
      </div>

      {/* Hero Stage Overlay */}
      <AnimatePresence mode="wait">
        {ch.key === "hero" && (
          <HeroStage key="hero" />
        )}
      </AnimatePresence>
      <AgentPlatformModal show={exploreCard === 0} onHide={() => setExploreCard(null)} groups={agentGroups} theme={theme} />
      <EnterpriseAIModal show={exploreCard === 1} onHide={() => setExploreCard(null)} variant="connected" theme={theme} />
      <CrossIndustryModal show={exploreCard === 2} onHide={() => setExploreCard(null)} solutions={crossIndustrySolutions} theme={theme} />
      <RealEstateTechnologyModal show={exploreCard === 3} onHide={() => setExploreCard(null)} theme={theme} />
      <DealStructuringCapitalAdvisoryModal show={exploreCard === 4} onHide={() => setExploreCard(null)} theme={theme} />
      <StrategicTransactionModal show={exploreCard === 5} onHide={() => setExploreCard(null)} theme={theme} />
      <ServicesAdvisoryModal show={exploreCard === 6} onHide={() => setExploreCard(null)} theme={theme} />
    </div>
  );
}

function LegacyContactChapter({ show, title, onClose }) {
  const [selectedPersona, setSelectedPersona] = useState(null);

  const handleSelect = (personaId) => {
    setSelectedPersona(personaId);
  };

  if (!show) return null;

  // If any persona is selected, show the Persona Detail Panel fullscreen
  if (selectedPersona) {
    return (
      <motion.div
        id="contact"
        className="contact-panel who-you-are-panel"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35 }}
      >
        <div className="who-you-are-card who-you-are-card--wide">
          <div className="who-you-are-matrix-bg" />
          <PersonaDetailPanel
            personaId={selectedPersona}
            onBack={() => setSelectedPersona(null)}
            onSelectPersona={setSelectedPersona}
          />
        </div>
      </motion.div>
    );
  }

  // Default — show persona selection grid
  return (
    <motion.div
      id="contact"
      className="contact-panel who-you-are-panel"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      <div className="who-you-are-card">
        <button type="button" className="who-you-are-close" onClick={onClose} aria-label="Close Who you are panel">
          <FiX />
        </button>
        {/* Background Dot Matrix Texture */}
        <div className="who-you-are-matrix-bg" />

        {/* Top Eyebrow Badge */}
        <div className="who-you-are-header">
          <div className="hero-badge">
            <span className="pulse-dot" />
            <span>DIRECT ENTERPRISE ENGAGEMENT</span>
          </div>
          <h2 className="who-you-are-title">Who you are?</h2>
          <p className="who-you-are-subtitle">
            Select your industry role to explore customized AI solutions and schedule a personalized demo.
          </p>
        </div>

        <WhoYouAreCard selectedPersona={selectedPersona} onSelect={handleSelect} />

        {/* ── KEY BENEFITS & WHAT WE OFFER ── */}
        <PersonaKeyBenefitsAndOfferings />

        <div className="contact-note">
          <span>Official inquiry handled directly through SigmaValue secure enterprise routing.</span>
        </div>

        <div className="contact-links">
          <a href="https://sigmavalue.ai/" target="_blank" rel="noreferrer">Main Website</a>
          <span className="sep">•</span>
          <a href="https://sigmavalue.ai/real-estate-consultancy/" target="_blank" rel="noreferrer">Consultancy</a>
          <span className="sep">•</span>
          <a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer">SigmaValue OS</a>
        </div>

        <div className="foot">© 2025 Creasophere Tech Private Limited. All rights reserved.</div>
      </div>
    </motion.div>
  );
}

export { ChapterStage };
