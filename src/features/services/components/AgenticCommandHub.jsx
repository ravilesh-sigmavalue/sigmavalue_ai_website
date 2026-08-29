import { useCallback, useEffect, useRef, useState } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiBox,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiGrid,
  FiHome,
  FiPieChart,
  FiPlay,
  FiPlayCircle,
  FiSearch,
  FiShare2,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

const HUB_NODES = [
  {
    index: 0,
    number: "01",
    name: "SigmaValue",
    type: "Valuation Intelligence",
    icon: FiTrendingUp,
    theme: "dual",
    baseAngle: 270, // 12 o'clock
  },
  {
    index: 1,
    number: "02",
    name: "SigmaMarket Lens",
    type: "Market Intelligence",
    icon: FiSearch,
    theme: "teal",
    baseAngle: 315, // 1:30
  },
  {
    index: 2,
    number: "03",
    name: "SigmaGeo",
    type: "Geo-Spatial Intelligence",
    icon: FiGlobe,
    theme: "teal",
    baseAngle: 0, // 3 o'clock
  },
  {
    index: 3,
    number: "04",
    name: "SigmaFeasibility",
    type: "Simulator",
    icon: FiShare2,
    theme: "teal",
    baseAngle: 45, // 4:30
  },
  {
    index: 4,
    number: "05",
    name: "SigmaPhysical",
    type: "Physical AI",
    icon: FiBox,
    theme: "dual",
    baseAngle: 90, // 6 o'clock
  },
  {
    index: 5,
    number: "06",
    name: "SigmaPortfolio",
    type: "Investment & Portfolio Intelligence",
    icon: FiPieChart,
    theme: "coral",
    baseAngle: 135, // 7:30
  },
  {
    index: 6,
    number: "07",
    name: "SigmaREOS",
    type: "Real Estate Operations",
    icon: FiHome,
    theme: "coral",
    baseAngle: 180, // 9 o'clock
  },
  {
    index: 7,
    number: "08",
    name: "SigmaWorkspace",
    type: "AI Workspace & Automation",
    icon: FiGrid,
    theme: "coral",
    baseAngle: 225, // 10:30
  },
];

export function AgenticCommandHub({
  groups,
  activeIndex = 0,
  onSelectGroup,
  agentMedia = {},
  agentLinks = {},
  onPlayVideo,
}) {
  const [selectedIdx, setSelectedIdx] = useState(activeIndex);
  const [rotationOffset, setRotationOffset] = useState(0);
  const lastWheelTime = useRef(0);

  useEffect(() => {
    setSelectedIdx(activeIndex);
  }, [activeIndex]);

  // ── MOUSE WHEEL CIRCULAR ROTATION ──
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const now = Date.now();
    if (now - lastWheelTime.current < 220) return;
    lastWheelTime.current = now;

    if (e.deltaY > 0) {
      // Scroll Down -> Clockwise rotation (45 deg step)
      setRotationOffset((prev) => prev + 45);
      setSelectedIdx((prev) => {
        const next = (prev + 1) % groups.length;
        if (onSelectGroup) onSelectGroup(next);
        return next;
      });
    } else if (e.deltaY < 0) {
      // Scroll Up -> Counter-Clockwise rotation (-45 deg step)
      setRotationOffset((prev) => prev - 45);
      setSelectedIdx((prev) => {
        const next = (prev - 1 + groups.length) % groups.length;
        if (onSelectGroup) onSelectGroup(next);
        return next;
      });
    }
  };

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    if (onSelectGroup) onSelectGroup(idx);
  };

  const handleNext = useCallback(() => {
    setRotationOffset((prev) => prev + 45);
    setSelectedIdx((prev) => {
      const next = (prev + 1) % groups.length;
      if (onSelectGroup) onSelectGroup(next);
      return next;
    });
  }, [groups.length, onSelectGroup]);

  const handlePrev = useCallback(() => {
    setRotationOffset((prev) => prev - 45);
    setSelectedIdx((prev) => {
      const next = (prev - 1 + groups.length) % groups.length;
      if (onSelectGroup) onSelectGroup(next);
      return next;
    });
  }, [groups.length, onSelectGroup]);

  const currentGroup = groups[selectedIdx] || groups[0];

  // ── CALCULATE DYNAMIC ORBITAL POSITIONS (ELLIPTICAL CIRCULAR MOTION) ──
  const computedNodes = HUB_NODES.map((node) => {
    const angleDeg = node.baseAngle + rotationOffset;
    const rad = (angleDeg * Math.PI) / 180;
    // Radius in percentage coordinates for CSS positioning
    const radiusX = 35.5; // horizontal radius %
    const radiusY = 39.5; // vertical radius %
    const posX = 50 + radiusX * Math.cos(rad);
    const posY = 50 + radiusY * Math.sin(rad);

    // SVG coordinates for spoke lines (Canvas viewbox: 1000 x 620, center 500, 310)
    const svgInnerR = 100;
    const svgOuterR = 250;
    const svgInnerX = 500 + svgInnerR * Math.cos(rad);
    const svgInnerY = 310 + (svgInnerR * 0.95) * Math.sin(rad);
    const svgOuterX = 500 + svgOuterR * Math.cos(rad);
    const svgOuterY = 310 + (svgOuterR * 0.95) * Math.sin(rad);

    return {
      ...node,
      angleDeg,
      posX,
      posY,
      svgInnerX,
      svgInnerY,
      svgOuterX,
      svgOuterY,
    };
  });

  return (
    <div
      className="agentic-command-hub-stage"
      onWheel={handleWheel}
      tabIndex={0}
      aria-label="Scroll mouse to rotate agents in circular motion"
    >
      {/* ── RADIAL CONSTELLATION CANVAS ── */}
      <div className="hub-radial-canvas">
        {/* SVG Circuit Lines & Radar Tracks */}
        <svg
          className="hub-radar-svg"
          viewBox="0 0 1000 620"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hubGradTeal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#43a09b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="hubGradCoral" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e87042" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f36b2e" stopOpacity="0.4" />
            </linearGradient>
            <filter id="hubGlowTeal" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="hubGlowCoral" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Concentric Orbital Radar Rings */}
          <circle cx="500" cy="310" r="90" className="radar-ring inner" />
          <circle cx="500" cy="310" r="145" className="radar-ring middle" />
          <circle cx="500" cy="310" r="215" className="radar-ring outer" />
          <circle cx="500" cy="310" r="275" className="radar-ring outer-faint" />

          {/* Hexagonal / Radial Orbital Guides */}
          <polygon
            points="500,170 621,240 621,380 500,450 379,380 379,240"
            className="radar-hex-orbit"
          />
          <polygon
            points="500,105 677,207 677,413 500,515 323,413 323,207"
            className="radar-hex-orbit-outer"
          />

          {/* Dynamic Animated Spokes that rotate in real-time */}
          {computedNodes.map((node) => {
            const isActive = selectedIdx === node.index;
            const isCoral = node.theme === "coral" || (node.theme === "dual" && node.index === 0);
            const spokeClass = isActive
              ? isCoral
                ? "active-coral"
                : "active-teal"
              : isCoral
              ? "spoke-coral"
              : "spoke-teal";

            return (
              <g key={node.number}>
                <line
                  x1={node.svgInnerX}
                  y1={node.svgInnerY}
                  x2={node.svgOuterX}
                  y2={node.svgOuterY}
                  className={`hub-spoke-line ${spokeClass}`}
                />
                <circle
                  cx={node.svgOuterX}
                  cy={node.svgOuterY}
                  r={isActive ? "5.5" : "4"}
                  className={`spoke-dot ${isCoral ? "coral" : "teal"}`}
                />
              </g>
            );
          })}
        </svg>

        {/* ── CENTRAL COMMAND HUB EMBLEM ── */}
        <div className="hub-center-core">
          <div className="core-glow-aura" />
          <div className="core-logo-wrap">
            <img
              src="/branding/logo.png"
              alt="SigmaValue SV"
              className="core-sv-logo"
            />
          </div>
          <h3 className="core-hub-title">AGENTIC AI COMMAND HUB</h3>
          <div className="core-accent-bar" />
          <p className="core-hub-motto">
            <span>Orchestrating intelligence.</span>
            <span>Driving real estate value.</span>
          </p>
          <div className="core-scroll-hint">
            <span>SCROLL TO ROTATE</span>
          </div>
        </div>

        {/* ── 8 REVOLVING RADIAL CAPSULE NODES ── */}
        {computedNodes.map((node) => {
          const Icon = node.icon || FiZap;
          const isActive = selectedIdx === node.index;
          const themeClass =
            node.theme === "coral"
              ? "node-coral"
              : node.theme === "dual"
              ? "node-dual"
              : "node-teal";

          return (
            <button
              key={node.number}
              type="button"
              className={`hub-capsule-node node-pos-${node.number} ${themeClass} ${
                isActive ? "active-node" : ""
              }`}
              style={{
                left: `${node.posX.toFixed(2)}%`,
                top: `${node.posY.toFixed(2)}%`,
              }}
              onClick={() => handleSelect(node.index)}
              title={`${node.number} ${node.name}`}
            >
              <div className="capsule-icon-wrap">
                <Icon />
              </div>
              <div className="capsule-text-wrap">
                <div className="capsule-header-line">
                  <span className="capsule-badge">{node.number}</span>
                  <span className="capsule-title">{node.name}</span>
                </div>
                <span className="capsule-subtitle">{node.type}</span>
              </div>
              {isActive && <div className="capsule-active-ping" />}
            </button>
          );
        })}
      </div>

      {/* ── ACTIVE SYSTEM DETAILS FOOTER DRAWER ── */}
      {currentGroup && (
        <div className="hub-active-system-drawer">
          <div className="drawer-header-row">
            <div className="drawer-title-group">
              <div className="drawer-system-badge">
                {String(selectedIdx + 1).padStart(2, "0")} / 08
              </div>
              <div className="drawer-titles">
                <h4 className="drawer-name">{currentGroup.name}</h4>
                <span className="drawer-type">({currentGroup.type})</span>
              </div>
            </div>

            {/* Quick Cycle Controls */}
            <div className="drawer-controls">
              <span className="scroll-shortcut-indicator">Scroll wheel to revolve ↻</span>
              <button
                type="button"
                className="hub-nav-arrow prev"
                onClick={handlePrev}
                aria-label="Previous system"
              >
                <FiChevronLeft />
              </button>
              <button
                type="button"
                className="hub-nav-arrow next"
                onClick={handleNext}
                aria-label="Next system"
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          {/* Sub-agents Cards Grid */}
          <div className="drawer-subagents-grid">
            {currentGroup.agents &&
              currentGroup.agents.map(([agentName, agentDesc, agentNum]) => {
                const media = agentMedia[agentName];
                const href = agentLinks[agentName];
                const hasLink = Boolean(href);

                if (media) {
                  return (
                    <div
                      key={agentName}
                      className="hub-subagent-card video-card"
                      onClick={() => onPlayVideo && onPlayVideo(media)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="subagent-top-row">
                        <span className="subagent-num-tag">{agentNum || "•"}</span>
                        <FiPlayCircle className="media-play-icon" />
                        <span className="subagent-title">{agentName}</span>
                        <div className="hub-play-badge">
                          <span>PLAY VIDEO</span>
                          <FiPlay />
                        </div>
                      </div>
                      <p className="subagent-copy">{agentDesc}</p>
                    </div>
                  );
                }

                if (hasLink) {
                  return (
                    <a
                      key={agentName}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="hub-subagent-card link-card"
                    >
                      <div className="subagent-top-row">
                        <span className="subagent-num-tag">{agentNum || "•"}</span>
                        <FiActivity className="link-icon" />
                        <span className="subagent-title">{agentName}</span>
                        <div className="hub-visit-badge">
                          <span>VISIT OS</span>
                          <FiArrowUpRight />
                        </div>
                      </div>
                      <p className="subagent-copy">{agentDesc}</p>
                    </a>
                  );
                }

                return (
                  <div key={agentName} className="hub-subagent-card standard-card">
                    <div className="subagent-top-row">
                      <span className="subagent-num-tag">{agentNum || "•"}</span>
                      <span className="subagent-title">{agentName}</span>
                      <span className="hub-ready-badge">ACTIVE AI</span>
                    </div>
                    <p className="subagent-copy">{agentDesc}</p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
