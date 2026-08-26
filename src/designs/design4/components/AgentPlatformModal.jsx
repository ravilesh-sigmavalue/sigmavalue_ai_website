import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Modal } from "react-bootstrap";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiBriefcase,
  FiCpu,
  FiGrid,
  FiHome,
  FiMap,
  FiPieChart,
  FiPlay,
  FiPlayCircle,
  FiX,
  FiZap,
} from "react-icons/fi";
import { VideoPlayerModal } from "./VideoPlayerModal";

const groupIcons = [FiHome, FiBarChart2, FiMap, FiGrid, FiCpu, FiPieChart, FiBriefcase, FiZap];

// Video media configurations for agents with interactive video walkthroughs
const agentMedia = {
  "Land/GIS Agent": {
    type: "video",
    videoSrc:
      "https://os-sigmavalue-media.s3.ap-south-1.amazonaws.com/agents-video/Land_Gis+Marketing+Video.mp4",
    title: "Land/GIS Agent",
    subtitle:
      "Identifies and analyzes land parcels using GIS, location intelligence, spatial data and surrounding infrastructure.",
    badge: "MEDIA PLAYER · LAND/GIS AGENT",
    externalLink: "https://os.sigmavalue.ai/visualization_agent",
    actionText: "PLAY VIDEO →",
  },
  "Feasibility Agent": {
    type: "video",
    videoSrc:
      "https://os-sigmavalue-media.s3.ap-south-1.amazonaws.com/agents-video/Feasibility+Agent+Updated.mp4",
    title: "Feasibility Agent",
    subtitle:
      "Evaluates development potential across regulations, FSI, product mix, revenue, financial feasibility, risks and project scenarios.",
    badge: "MEDIA PLAYER · FEASIBILITY AGENT",
    externalLink: "https://os.sigmavalue.ai/feasibility",
    actionText: "PLAY VIDEO →",
  },
  "Valuation Agent": {
    type: "video",
    videoSrc:
      "https://os-sigmavalue-media.s3.ap-south-1.amazonaws.com/agents-video/ValuationAgent+Marketing+Video.mp4",
    title: "Valuation Agent",
    subtitle:
      "AI-powered property valuation using comparable transactions, market data, property attributes and valuation models.",
    badge: "MEDIA PLAYER · VALUATION AGENT",
    externalLink: "https://os.sigmavalue.ai/valuation",
    actionText: "PLAY VIDEO →",
  },
  "Valuation B2C": {
    type: "video",
    videoSrc:
      "https://sigmavalue-all-media.s3.ap-south-1.amazonaws.com/valuation+landing+page+assets/Valuation_vercel.mp4",
    title: "Valuation B2C",
    subtitle:
      "Consumer-focused property valuation providing quick, accessible estimates of residential property value.",
    badge: "MEDIA PLAYER · VALUATION B2C",
    externalLink: "https://sigmavalue.ai/valuation/",
    actionText: "PLAY VIDEO →",
  },
};

const agentLinks = {
  // SigmaValue — Valuation Intelligence
  "Valuation Agent": "https://os.sigmavalue.ai/valuation",
  "Valuation B2C": "https://sigmavalue.ai/valuation/",
  // SigmaMarket Lens — Market Intelligence
  "Market Research Agent": "https://os.sigmavalue.ai/market_research",
  "Transaction Intelligence Agent": "https://os.sigmavalue.ai/data_retrieval",
  "Live Data Intelligence Agent": "https://os.sigmavalue.ai/web_search",
  "Analytics Agent": null,
  "Data Dashboard": null,
  // SigmaGeo — Geo-Spatial Intelligence
  "Land/GIS Agent": "https://os.sigmavalue.ai/visualization_agent",
  "Elevation Agent": "https://os.sigmavalue.ai/elevation",
  // SigmaFeasibility — Simulator
  "Feasibility Agent": "https://os.sigmavalue.ai/feasibility",
  "Legal Agent": null,
  "Document Intelligence Agent": "https://os.sigmavalue.ai/user_input",
  // SigmaPhysical — Physical AI
  "Physical AI Agent": null,
  // SigmaPortfolio — Investment & Portfolio Intelligence
  "Portfolio Management Agent": "https://os.sigmavalue.ai/portfolio-management",
  "Value Creation Agent": null,
  "Autonomous Relationship Agent": null,
  // SigmaREOS — Real Estate Operations
  "Autonomous Real Estate ERP Agent": null,
  "Property Management Agent": null,
  "Project Management Agent": null,
  // SigmaWorkspace — AI Workspace & Automation
  "Generative Interface": null,
  "Solution Engine": null,
  "Connector": "https://os.sigmavalue.ai/connector",
  "Team Collaboration": null,
};

// Groups that render individual clickable agent cards
const linkedGroups = new Set([0, 1, 2, 3, 4, 5, 6, 7]);

export function AgentPlatformModal({ show, onHide, groups, theme }) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const lastWheelTime = useRef(0);

  // Detect current theme (light or dark)
  const isLight =
    theme === "light" ||
    (typeof document !== "undefined" && document.documentElement.dataset.theme === "light");

  const group = groups[groupIndex] || groups[0];
  const GroupIcon = groupIcons[groupIndex] || FiZap;

  const selectGroup = useCallback((index) => {
    setGroupIndex(index);
    setPaused(true);
  }, []);

  const nextGroup = useCallback(
    () => setGroupIndex((index) => (index + 1) % groups.length),
    [groups.length]
  );

  const previousGroup = useCallback(
    () => setGroupIndex((index) => (index - 1 + groups.length) % groups.length),
    [groups.length]
  );

  const rotateWithWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const now = Date.now();
    if (now - lastWheelTime.current < 400 || Math.abs(event.deltaY) < 8) return;
    lastWheelTime.current = now;
    setPaused(true);
    if (event.deltaY > 0) nextGroup();
    else previousGroup();
  };

  useEffect(() => {
    if (!show || paused) return undefined;
    const timer = window.setInterval(nextGroup, 4500);
    return () => window.clearInterval(timer);
  }, [show, paused, nextGroup]);

  useEffect(() => {
    if (!show) {
      setGroupIndex(0);
      setPaused(false);
      setActiveVideo(null);
    }
  }, [show]);

  const buildingImage = isLight
    ? "/super_agent_builing_light.png"
    : "/super_agent_builing_dark.png";

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="xl"
        dialogClassName="super-agent-dialog d4-right-panel-dialog"
        contentClassName={`super-agent-modal ${isLight ? "light-mode" : "dark-mode"}`}
        backdropClassName="super-agent-backdrop d4-right-panel-backdrop"
      >
        <Modal.Header className="super-agent-header">
          <div>
            <span>AGENTIC AI PLATFORM</span>
            <Modal.Title>Eight intelligence systems. One connected platform.</Modal.Title>
            <p>Each intelligence agent revolves in 3D orbit around the central SigmaValue building.</p>
          </div>
          <div className="super-agent-close">
            <Button variant="link" onClick={onHide} aria-label="Close">
              <FiX />
            </Button>
          </div>
        </Modal.Header>

        <Modal.Body className="super-agent-body">
          <section
            className="super-agent-stage"
            onWheel={rotateWithWheel}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            tabIndex="0"
            aria-label="Scroll to rotate the eight SigmaValue systems"
          >
            <div className="super-stage-heading">
              <Badge>{String(groupIndex + 1).padStart(2, "0")} / 08</Badge>
              <div>
                <h2>{group.name}</h2>
                <p>{group.type}</p>
              </div>
            </div>

            {/* 3D Planetary Orbit Stage */}
            <div className="super-orbit" style={{ "--agent-count": groups.length }}>
              {/* SVG Elliptical Planetary Orbit Rings */}
              <svg className="super-orbit-svg" viewBox="0 0 900 480" aria-hidden="true">
                <defs>
                  <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--brand-teal, #43a09b)" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="var(--brand-coral, #e87042)" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="var(--brand-seafoam, #5cb8b2)" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <ellipse cx="450" cy="240" rx="410" ry="155" className="orbit-track-outer" />
                <ellipse cx="450" cy="240" rx="350" ry="130" className="orbit-track-main" />
                <ellipse cx="450" cy="240" rx="270" ry="98" className="orbit-track-inner" />
              </svg>

              {/* Orbit Floor Grid / Base Pedestal */}
              <div className="super-orbit-floor">
                <i />
                <i />
                <i />
              </div>

              {/* Central 3D Building & Glow */}
              <div className="super-building-glow" />
              <div className="super-building-container">
                <img
                  className="super-building"
                  src={buildingImage}
                  alt="SigmaValue super agent 3D building"
                />
              </div>

              <div className="super-central-node">
                <FiZap /> Central intelligence node
              </div>

              {/* 8 Orbiting Agent Planets (3D Calculated Depth) */}
              {groups.map((item, index) => {
                // Calculate continuous angular position relative to active groupIndex
                const offsetIndex = index - groupIndex;
                const angleDeg = (360 / groups.length) * offsetIndex + 90;
                const angleRad = (angleDeg * Math.PI) / 180;

                // 3D Elliptical Orbit Coordinates:
                // X: -410px to +410px
                // Y: -145px to +145px (with depth tilt)
                // Z: -1 (back of building) to +1 (front of building)
                const cosVal = Math.cos(angleRad);
                const sinVal = Math.sin(angleRad);

                // Depth 0 (far back) to 1 (near front)
                const depth = (sinVal + 1) / 2;
                const isFront = sinVal >= -0.15;
                const zIndex = isFront ? Math.round(10 + depth * 10) : Math.round(2 + depth * 3);
                const scale = 0.74 + depth * 0.32;
                const opacity = 0.50 + depth * 0.50;

                const Icon = groupIcons[index] || FiZap;
                const isActive = index === groupIndex;

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`super-orbit-agent ${isActive ? "active" : ""} ${
                      isFront ? "in-front" : "in-back"
                    }`}
                    style={{
                      "--pos-x": `${(cosVal * 390).toFixed(1)}px`,
                      "--pos-y": `${(sinVal * 140).toFixed(1)}px`,
                      "--depth-scale": scale.toFixed(3),
                      "--depth-opacity": opacity.toFixed(3),
                      "--depth-z": zIndex,
                      zIndex: zIndex,
                    }}
                    onClick={() => selectGroup(index)}
                    aria-label={`Select ${item.name}`}
                  >
                    <span className="agent-icon-wrap">
                      <Icon />
                    </span>
                    <div className="agent-text-wrap">
                      <b>{item.name}</b>
                      <small>
                        {isActive
                          ? "● ACTIVE ORBIT"
                          : `● ${item.agents.length} AI AGENT${
                              item.agents.length > 1 ? "S" : ""
                            }`}
                      </small>
                    </div>
                  </button>
                );
              })}
            </div>

            <Button
              className="super-arrow previous"
              onClick={previousGroup}
              aria-label="Previous system"
            >
              <FiArrowLeft />
            </Button>
            <Button className="super-arrow next" onClick={nextGroup} aria-label="Next system">
              <FiArrowRight />
            </Button>

            {/* Active System Focus Card */}
            <Card className="super-active-card" key={groupIndex}>
              <Card.Header>
                <span className="super-active-icon">
                  <GroupIcon />
                </span>
                <div>
                  <Card.Title>{group.name}</Card.Title>
                  <small>{group.type} · SIGMAVALUE SYSTEM</small>
                </div>
                <Badge>
                  {groupIndex + 1} / {groups.length}
                </Badge>
              </Card.Header>
              <Card.Body>
                {linkedGroups.has(groupIndex) ? (
                  <div className="super-agent-details">
                    {group.agents.map(([name, description]) => {
                      const media = agentMedia[name];
                      const href = agentLinks[name];
                      const hasLink = Boolean(href);

                      if (media) {
                        return (
                          <div className="super-agent-detail" key={name}>
                            <a
                              href={media.externalLink || href || "#"}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveVideo(media);
                              }}
                              role="button"
                              className="super-agent-video-card"
                            >
                              <div className="super-agent-detail-header">
                                <span className="super-agent-detail-name">
                                  <FiPlayCircle
                                    style={{
                                      color: "var(--brand-coral)",
                                      fontSize: "14px",
                                      flexShrink: 0,
                                    }}
                                  />
                                  {name}
                                </span>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span className="super-agent-detail-visit">
                                    {media.actionText || "PLAY VIDEO →"}
                                  </span>
                                  <span
                                    className="super-agent-detail-arrow"
                                    style={{
                                      background: "rgba(232, 112, 66, 0.15)",
                                      borderColor: "rgba(232, 112, 66, 0.4)",
                                      color: "var(--brand-coral)",
                                    }}
                                  >
                                    <FiPlay style={{ fontSize: "11px", marginLeft: "1px" }} />
                                  </span>
                                </div>
                              </div>
                              <p>{description}</p>
                            </a>
                          </div>
                        );
                      }

                      return (
                        <div className="super-agent-detail" key={name}>
                          {hasLink ? (
                            <a href={href} target="_blank" rel="noreferrer">
                              <div className="super-agent-detail-header">
                                <span className="super-agent-detail-name">{name}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                  <span className="super-agent-detail-visit">VISIT →</span>
                                  <span className="super-agent-detail-arrow">
                                    <FiArrowUpRight />
                                  </span>
                                </div>
                              </div>
                              <p>{description}</p>
                            </a>
                          ) : (
                            <div className="super-agent-detail-disabled">
                              <div className="super-agent-detail-header">
                                <span className="super-agent-detail-name">{name}</span>
                                <span className="super-agent-detail-soon">COMING SOON</span>
                              </div>
                              <p>{description}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <Card.Text>{group.agents[0][1]}</Card.Text>
                    <div className="super-capabilities">
                      {group.agents.map(([name]) => (
                        <span key={name}>{name}</span>
                      ))}
                    </div>
                  </>
                )}
              </Card.Body>
              <Card.Footer>
                <span className="super-status">
                  <i /> {group.agents.length} CONNECTED AI AGENT
                  {group.agents.length > 1 ? "S" : ""}
                </span>
              </Card.Footer>
            </Card>
          </section>
        </Modal.Body>
      </Modal>

      {/* Media Player Modal for agent video demonstrations */}
      <VideoPlayerModal
        show={Boolean(activeVideo)}
        onHide={() => setActiveVideo(null)}
        videoSrc={activeVideo?.videoSrc}
        title={activeVideo?.title}
        subtitle={activeVideo?.subtitle}
        badge={activeVideo?.badge}
        externalLink={activeVideo?.externalLink}
        theme={theme}
      />
    </>
  );
}
