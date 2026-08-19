import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiCheckCircle, FiCompass, FiExternalLink, FiLayers, FiMapPin, FiSearch } from "react-icons/fi";
import { accentRgba, buildPhotoSvg } from "../../../utils/art";

function Utility({ chapter }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  if (chapter.num === "02") {
    return (
      <div className="utility-bento">
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
      </div>
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

function HeroStage({ onExplore }) {
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

function ChapterStage({ chapters, active }) {
  const ch = chapters[active];
  const carousel = useRef(null);

  useEffect(() => {
    let raf = 0, raw = scrollY / innerHeight, smooth = raw;
    const update = () => { raw = scrollY / innerHeight; };
    const tick = () => {
      raf = requestAnimationFrame(tick);
      smooth += (raw - smooth) * 0.065;
      if (carousel.current) {
        const mobile = innerWidth < 960;
        const drop = mobile ? 60 : 120;
        const angle = smooth * 0.72;
        carousel.current.style.transform = `translate(-50%,-50%) rotateY(${-angle * 180 / Math.PI}deg) translateY(${Math.max(0, smooth - 1) * drop}px)`;
        carousel.current.querySelectorAll(".bcard").forEach((card, cardPosition) => {
          const index = cardPosition + 1;
          const distance = Math.abs(index - smooth);
          const focus = Math.max(0, 1 - Math.min(distance, 1));
          card.style.opacity = String(0.18 + focus * 0.82);
          card.style.filter = `brightness(${0.4 + focus * 0.6}) saturate(${0.5 + focus * 0.5})`;
          card.style.zIndex = String(Math.round(focus * 10));
          if (focus > 0.6) {
            card.classList.add("front");
          } else {
            card.classList.remove("front");
          }
        });
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
                    <span className="category-pill">{card.cat || "Overview"}</span>
                    {card.loc && (
                      <span className="location-pill">
                        <FiMapPin className="pill-icon" />
                        {card.loc}
                      </span>
                    )}
                  </div>
                  <h3 className="bcard-title">{card.title}</h3>
                </div>

                {card.desc && <p className="bcard-desc">{card.desc}</p>}

                {card.specs && card.specs.length > 0 && (
                  <div className="bcard-specs-grid">
                    {card.specs.map(([label, val]) => (
                      <div key={label + val} className="bcard-spec-item">
                        <span className="bcard-spec-label">{label}</span>
                        <span className="bcard-spec-val">{val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {card.bullets && card.bullets.length > 0 && (
                  <div className="bcard-highlights">
                    <div className="bcard-highlights-title">
                      <FiLayers className="title-icon" />
                      <span>Key Capabilities</span>
                    </div>
                    <div className="bcard-highlights-list">
                      {card.bullets.slice(0, 4).map((b, i) => (
                        <div key={i} className="bcard-highlight-item">
                          <FiCheckCircle className="check-icon" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {card.action && (
                  <div className="bcard-action-row">
                    {card.href && card.href !== "#" ? (
                      <a
                        className="btn-primary bcard-action-btn"
                        href={card.href}
                        target={card.href.includes("os.sigmavalue.ai") ? "_blank" : undefined}
                        rel="noreferrer"
                      >
                        <span>{card.action}</span>
                        <FiArrowUpRight />
                      </a>
                    ) : (
                      <div className="badge-interactive bcard-action-badge">
                        <span>{card.action}</span>
                      </div>
                    )}
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
    </div>
  );
}

function ContactChapter({ show, title }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    const qs = new URLSearchParams({
      page: "design03-home",
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
    location.href = `https://sigmavalue.ai/contact/?${qs}`;
  };

  if (!show) return null;

  return (
    <motion.div
      id="contact"
      className="contact-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      <div className="contact-card">
        <div className="hero-badge">
          <span className="pulse-dot" />
          <span>DIRECT ENTERPRISE ENGAGEMENT</span>
        </div>
        <h2 className="contact-title">{title || "Schedule an Enterprise Demo"}</h2>
        <p className="contact-subtitle">
          Connect with our real estate AI specialists to evaluate feasibility models, custom valuation APIs, or portfolio tracking.
        </p>

        <form onSubmit={submit} className="contact-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              name="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Michael Vance"
            />
          </div>
          <div className="form-group">
            <label>Work Email</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. michael@enterprise.com"
            />
          </div>
          <div className="form-group">
            <label>Project / Requirement Overview</label>
            <textarea
              name="message"
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your portfolio size, evaluation goals, or integration needs..."
            />
          </div>
          <button type="submit" className="btn-primary full-width">
            <span>Continue to Request a Demo</span>
            <FiArrowUpRight />
          </button>
        </form>

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

export { ChapterStage, ContactChapter };
