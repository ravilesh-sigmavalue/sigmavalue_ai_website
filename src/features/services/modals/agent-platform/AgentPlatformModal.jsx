import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { Modal } from "react-bootstrap";

import { RightPanelModalHeader } from "../../../../shared/components/modal/RightPanelModalHeader";
import { VideoPlayerModal } from "../../../../shared/components/video-player/VideoPlayerModal";
import { AgenticCommandHub } from "../../components/AgenticCommandHub";

const AUTO_ROTATE_MS = 5000;

const agentMedia = {
  "Land/GIS Agent": {
    type: "video",
    videoSrc:
      "https://os-sigmavalue-media.s3.ap-south-1.amazonaws.com/agents-video/Land_Gis+Marketing+Video.mp4",
    title: "Land/GIS Agent",
    subtitle:
      "Identifies and analyzes land parcels using GIS, location intelligence, spatial data and surrounding infrastructure.",
    badge: "MEDIA PLAYER · LAND/GIS AGENT",
    externalLink:
      "https://os.sigmavalue.ai/visualization_agent",
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
    externalLink:
      "https://os.sigmavalue.ai/feasibility",
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
    externalLink:
      "https://os.sigmavalue.ai/valuation",
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
    externalLink:
      "https://sigmavalue.ai/valuation/",
    actionText: "PLAY VIDEO →",
  },
};

const agentLinks = {
  "Valuation Agent":
    "https://os.sigmavalue.ai/valuation",

  "Valuation B2C":
    "https://sigmavalue.ai/valuation/",

  "Market Research Agent":
    "https://os.sigmavalue.ai/market_research",

  "Transaction Intelligence Agent":
    "https://os.sigmavalue.ai/data_retrieval",

  "Live Data Intelligence Agent":
    "https://os.sigmavalue.ai/web_search",

  "Analytics Agent":
    null,

  "Data Dashboard":
    null,

  "Land/GIS Agent":
    "https://os.sigmavalue.ai/visualization_agent",

  "Elevation Agent":
    "https://os.sigmavalue.ai/elevation",

  "Feasibility Agent":
    "https://os.sigmavalue.ai/feasibility",

  "Legal Agent":
    null,

  "Document Intelligence Agent":
    "https://os.sigmavalue.ai/user_input",

  "Physical AI Agent":
    null,

  "Portfolio Management Agent":
    "https://os.sigmavalue.ai/portfolio-management",

  "Value Creation Agent":
    null,

  "Autonomous Relationship Agent":
    null,

  "Autonomous Real Estate ERP Agent":
    null,

  "Property Management Agent":
    null,

  "Project Management Agent":
    null,

  "Generative Interface":
    null,

  "Solution Engine":
    null,

  "Connector":
    "https://os.sigmavalue.ai/connector",

  "Team Collaboration":
    null,
};

export function AgentPlatformModal({
  show,
  onHide,
  groups = [],
  theme,
}) {
  const [groupIndex, setGroupIndex] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const [activeVideo, setActiveVideo] =
    useState(null);

  const safeGroups =
    Array.isArray(groups)
      ? groups
      : [];

  const groupCount =
    safeGroups.length;

  const isLight =
    theme === "light" ||
    (
      typeof document !== "undefined" &&
      document.documentElement.dataset.theme ===
      "light"
    );

  const pauseRotation = useCallback(() => {
    setPaused(true);
  }, []);

  const handleSelectGroup = useCallback(
    (index) => {
      if (
        !Number.isInteger(index) ||
        index < 0 ||
        index >= groupCount
      ) {
        return;
      }

      setGroupIndex(index);
      setPaused(true);
    },
    [groupCount]
  );

  const nextGroup = useCallback(() => {
    if (groupCount <= 1) {
      return;
    }

    setGroupIndex(
      (current) =>
        (current + 1) % groupCount
    );
  }, [groupCount]);

  const handlePlayVideo = useCallback(
    (media) => {
      if (!media) {
        return;
      }

      setPaused(true);
      setActiveVideo(media);
    },
    []
  );

  useEffect(() => {
    if (!show) {
      setGroupIndex(0);
      setPaused(false);
      setActiveVideo(null);
      return;
    }

    if (groupCount === 0) {
      setGroupIndex(0);
      return;
    }

    setGroupIndex((current) =>
      Math.min(current, groupCount - 1)
    );
  }, [show, groupCount]);

  useEffect(() => {
    if (
      !show ||
      paused ||
      groupCount <= 1
    ) {
      return undefined;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return undefined;
    }

    const timer =
      window.setInterval(
        nextGroup,
        AUTO_ROTATE_MS
      );

    return () => {
      window.clearInterval(timer);
    };
  }, [
    show,
    paused,
    groupCount,
    nextGroup,
  ]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        centered
        keyboard
        restoreFocus
        dialogClassName="
          super-agent-dialog
          d4-right-panel-dialog
        "
        contentClassName={`
          super-agent-modal
          d4-right-panel-modal
          ${isLight
            ? "light-mode"
            : "dark-mode"
          }
        `}
        backdropClassName="
          super-agent-backdrop
          d4-right-panel-backdrop
        "
      >
        <RightPanelModalHeader
          eyebrow="01 / 07 · AGENTIC AI PLATFORM"
          title="Eight intelligence systems. One connected platform."
          subtitle="Autonomous AI agents orbiting a central real estate intelligence node."
          onHide={onHide}
          ariaLabel="Close Agentic AI Platform"
        />

        <Modal.Body
          className="
            super-agent-body
            d4-right-panel-body
            command-hub-modal-body
          "
          onPointerDown={pauseRotation}
          onFocusCapture={pauseRotation}
          onWheelCapture={pauseRotation}
        >
          <div className="super-agent-hub-shell">
            {groupCount > 0 ? (
              <AgenticCommandHub
                groups={safeGroups}
                activeIndex={groupIndex}
                onSelectGroup={
                  handleSelectGroup
                }
                agentMedia={agentMedia}
                agentLinks={agentLinks}
                onPlayVideo={
                  handlePlayVideo
                }
              />
            ) : (
              <div
                className="super-agent-empty"
                role="status"
              >
                <strong>
                  Agent platform unavailable
                </strong>

                <span>
                  No intelligence systems were
                  provided to this view.
                </span>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <VideoPlayerModal
        show={Boolean(activeVideo)}
        onHide={() =>
          setActiveVideo(null)
        }
        videoSrc={
          activeVideo?.videoSrc
        }
        title={
          activeVideo?.title
        }
        subtitle={
          activeVideo?.subtitle
        }
        badge={
          activeVideo?.badge
        }
        externalLink={
          activeVideo?.externalLink
        }
        theme={theme}
      />
    </>
  );
}
