import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";
import { PERSONAS } from "./data/contactPersonas";
import { PERSONA_DETAILS } from "./data/personaDetailsData";
import { PersonaIllustration } from "./PersonaIllustration";

export function PersonaDetailPanel({
  personaId = "developer",
  onBack,
  onSelectPersona,
}) {
  const currentPersonaId = personaId && PERSONA_DETAILS[personaId] ? personaId : "developer";
  const personaData = PERSONA_DETAILS[currentPersonaId];

  // Active tab state
  const [activeTabId, setActiveTabId] = useState(personaData.tabs[0]?.id);

  // When persona changes, reset to the first tab of that persona
  useEffect(() => {
    if (personaData.tabs.length > 0) {
      setActiveTabId(personaData.tabs[0].id);
    }
  }, [currentPersonaId, personaData]);

  const activeTab = personaData.tabs.find((t) => t.id === activeTabId) || personaData.tabs[0];
  const PersonaIcon = personaData.icon;

  return (
    <div className="dev-detail-panel" style={{ "--persona-accent": personaData.accentColor }}>
      {/* ── TOP RIGHT CLOSE BUTTON ── */}
      <button
        type="button"
        className="dev-detail-close"
        onClick={onBack}
        aria-label="Close Persona details"
      >
        <FiX />
      </button>

      {/* ── HEADER & PERSONA ROLE SELECTOR ── */}
      <div className="dev-detail-topbar">
        <div className="dev-detail-topbar-left">
          <button type="button" className="btn-back-persona" onClick={onBack}>
            <FiArrowLeft />
            <span>Who you are?</span>
          </button>
          <div
            className="dev-detail-persona-label"
            style={{
              borderColor: `${personaData.accentColor}50`,
              background: `linear-gradient(135deg, ${personaData.accentColor}18, rgba(8,18,28,0.9))`,
            }}
          >
            <PersonaIcon style={{ color: personaData.accentColor }} />
            <span>{personaData.title} — {personaData.badge}</span>
          </div>
        </div>

        {/* Quick Role Switcher */}
        <div className="persona-quick-switcher" role="tablist" aria-label="Switch persona">
          {PERSONAS.map((p) => {
            const PIcon = p.icon;
            const isCurrent = p.id === currentPersonaId;
            return (
              <button
                key={p.id}
                type="button"
                className={`persona-quick-btn ${isCurrent ? "active" : ""}`}
                style={{ "--switcher-accent": p.accentColor }}
                onClick={() => {
                  if (onSelectPersona) onSelectPersona(p.id);
                }}
                title={p.title}
              >
                <PIcon className="persona-quick-icon" />
                <span className="persona-quick-title">{p.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB RAIL ── */}
      <div className="dev-tabs-rail" role="tablist">
        {personaData.tabs.map((t) => {
          const Icon = t.icon;
          const isActive = t.id === activeTab.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`dev-tab-btn ${isActive ? "active" : ""}`}
              style={{ "--tab-accent": t.accentColor || personaData.accentColor }}
              onClick={() => setActiveTabId(t.id)}
            >
              <Icon className="dev-tab-icon" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 2-COLUMN MAIN CONTENT AREA ── */}
      <div className="dev-tab-content">
        {/* LEFT COLUMN — Illustration & Quick Actions */}
        <div className="dev-visual-column">
          <div
            className="dev-illustration-box"
            style={{ borderColor: `${activeTab.accentColor}40` }}
          >
            <div className="dev-illustration-inner">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${currentPersonaId}-${activeTab.id}`}
                  className="dev-illustration-slide"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.22 }}
                >
                  <PersonaIllustration
                    personaId={currentPersonaId}
                    tabId={activeTab.id}
                    accentColor={activeTab.accentColor}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Ambient Radial Glow */}
            <div
              className="dev-illustration-glow"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${activeTab.accentColor}25 0%, transparent 70%)`,
              }}
            />
          </div>

          {/* Quick Action Badges */}
          {personaData.quickActions && personaData.quickActions.length > 0 && (
            <div className="dev-image-actions" aria-label={`${personaData.title} quick actions`}>
              <div className={`dev-image-action dev-image-action--${personaData.quickActions[0]?.variant || "orange"}`}>
                <span className="dev-image-action-icon">{personaData.quickActions[0]?.icon}</span>
                <span>{personaData.quickActions[0]?.label}</span>
              </div>
              <div className="dev-image-action-dots" aria-hidden="true">
                <i style={{ background: personaData.accentColor }} />
                <i style={{ background: activeTab.accentColor }} />
                <i style={{ background: "#34d399" }} />
              </div>
              {personaData.quickActions[1] && (
                <div className={`dev-image-action dev-image-action--${personaData.quickActions[1]?.variant || "teal"}`}>
                  <span className="dev-image-action-icon">{personaData.quickActions[1]?.icon}</span>
                  <span>{personaData.quickActions[1]?.label}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — Tab Overview & CTA */}
        <div className="dev-tab-desc">
          <div className="dev-tab-eyebrow" style={{ color: activeTab.accentColor }}>
            <activeTab.icon />
            <span>SigmaValue for {personaData.title}s</span>
          </div>
          <h3 className="dev-tab-heading">{activeTab.heading}</h3>
          <p className="dev-tab-sub">{activeTab.sub}</p>
          <a
            href={activeTab.ctaHref}
            target="_blank"
            rel="noreferrer"
            className="dev-tab-cta"
            style={{
              background: `linear-gradient(135deg, ${activeTab.accentColor} 0%, #070a12 160%)`,
              boxShadow: `0 4px 20px ${activeTab.accentColor}40`,
            }}
          >
            <span>{activeTab.cta}</span>
            <FiArrowUpRight />
          </a>
        </div>
      </div>

      {/* ── BENEFITS METRICS STRIP ── */}
      {activeTab.benefits && activeTab.benefits.length > 0 && (
        <div className="dev-benefits-section">
          <div className="dev-metrics-strip">
            {activeTab.benefits.map((b, idx) => {
              const BIcon = b.icon;
              return (
                <div
                  key={idx}
                  className="dev-metric-tile"
                  style={{
                    "--tile-accent": activeTab.accentColor,
                    borderColor: `${activeTab.accentColor}25`,
                  }}
                >
                  <div className="dev-metric-icon-wrap" style={{ color: activeTab.accentColor }}>
                    <BIcon />
                  </div>
                  <div className="dev-metric-text">
                    <span className="dev-metric-label" style={{ color: activeTab.accentColor }}>{b.label}</span>
                    <span className="dev-metric-value">{b.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── OFFERINGS / CAPABILITIES CHIPS ── */}
      {activeTab.offerings && activeTab.offerings.length > 0 && (
        <div className="dev-offerings-list">
          <span className="dev-offerings-title">Key AI Capabilities</span>
          <div className="dev-offerings-chips">
            {activeTab.offerings.map((offering, idx) => (
              <div
                key={idx}
                className="dev-offering-chip"
                style={{ borderColor: `${activeTab.accentColor}30` }}
              >
                <FiCheckCircle style={{ color: activeTab.accentColor, flexShrink: 0 }} />
                <span>{offering}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
