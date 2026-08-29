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
  FiZap,
} from "react-icons/fi";
import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import { VideoPlayerModal } from "../../../../shared/components/video-player/VideoPlayerModal";
import { AgenticCommandHub } from "../../components/AgenticCommandHub";

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
    const timer = window.setInterval(nextGroup, 5000);
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
    ? "/illustrations/super-agent-building-light.png"
    : "/illustrations/super-agent-building-dark.png";

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        size="xl"
        dialogClassName="super-agent-dialog d4-right-panel-dialog"
        contentClassName={`super-agent-modal d4-right-panel-modal ${isLight ? "light-mode" : "dark-mode"}`}
        backdropClassName="super-agent-backdrop d4-right-panel-backdrop"
      >
        <RightPanelModalHeader
          eyebrow="01 / 07 · AGENTIC AI PLATFORM"
          title="Eight intelligence systems. One connected platform."
          subtitle="Autonomous AI agents orbiting a central real estate intelligence node."
          onHide={onHide}
          ariaLabel="Close Agentic AI Platform"
        />

        <Modal.Body className="super-agent-body d4-right-panel-body command-hub-modal-body">
          <AgenticCommandHub
            groups={groups}
            activeIndex={groupIndex}
            onSelectGroup={(idx) => setGroupIndex(idx)}
            agentMedia={agentMedia}
            agentLinks={agentLinks}
            onPlayVideo={(media) => setActiveVideo(media)}
          />
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
