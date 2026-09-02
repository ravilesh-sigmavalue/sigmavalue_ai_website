import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

import "./AgenticCommandHub.css";

const HUB_NODES = [
  {
    index: 0,
    number: "01",
    name: "SigmaValue",
    type: "Valuation Intelligence",
    icon: FiTrendingUp,
    theme: "dual",
    baseAngle: 270,
  },
  {
    index: 1,
    number: "02",
    name: "SigmaMarket Lens",
    type: "Market Intelligence",
    icon: FiSearch,
    theme: "teal",
    baseAngle: 315,
  },
  {
    index: 2,
    number: "03",
    name: "SigmaGeo",
    type: "Geo-Spatial Intelligence",
    icon: FiGlobe,
    theme: "teal",
    baseAngle: 0,
  },
  {
    index: 3,
    number: "04",
    name: "SigmaFeasibility",
    type: "Simulator",
    icon: FiShare2,
    theme: "teal",
    baseAngle: 45,
  },
  {
    index: 4,
    number: "05",
    name: "SigmaPhysical",
    type: "Physical AI",
    icon: FiBox,
    theme: "dual",
    baseAngle: 90,
  },
  {
    index: 5,
    number: "06",
    name: "SigmaPortfolio",
    type: "Investment & Portfolio Intelligence",
    icon: FiPieChart,
    theme: "coral",
    baseAngle: 135,
  },
  {
    index: 6,
    number: "07",
    name: "SigmaREOS",
    type: "Real Estate Operations",
    icon: FiHome,
    theme: "coral",
    baseAngle: 180,
  },
  {
    index: 7,
    number: "08",
    name: "SigmaWorkspace",
    type: "AI Workspace & Automation",
    icon: FiGrid,
    theme: "coral",
    baseAngle: 225,
  },
];

const ROTATION_STEP = 45;
const WHEEL_COOLDOWN_MS = 260;

function normalizeIndex(index, count) {
  if (!count) return 0;

  const numericIndex = Number.isFinite(index)
    ? index
    : 0;

  return ((numericIndex % count) + count) % count;
}

function circularDelta(from, to, count) {
  if (count <= 1) return 0;

  let delta = (to - from + count) % count;

  if (delta > count / 2) {
    delta -= count;
  }

  return delta;
}

function useCompactHub() {
  const getInitial = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia(
      "(max-width: 900px)"
    ).matches;
  };

  const [compact, setCompact] =
    useState(getInitial);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const media = window.matchMedia(
      "(max-width: 900px)"
    );

    const sync = () => {
      setCompact(media.matches);
    };

    sync();

    media.addEventListener(
      "change",
      sync
    );

    return () => {
      media.removeEventListener(
        "change",
        sync
      );
    };
  }, []);

  return compact;
}

function SystemButton({
  node,
  isActive,
  compact,
  onSelect,
}) {
  const Icon = node.icon || FiZap;

  const themeClass =
    node.theme === "coral"
      ? "node-coral"
      : node.theme === "dual"
        ? "node-dual"
        : "node-teal";

  const style = compact
    ? undefined
    : {
      "--node-x":
        `${node.posX.toFixed(2)}%`,
      "--node-y":
        `${node.posY.toFixed(2)}%`,
    };

  return (
    <button
      type="button"
      className={`hub-capsule-node ${themeClass} ${isActive ? "active-node" : ""
        } ${compact
          ? "hub-capsule-node--compact"
          : ""
        }`}
      style={style}
      onClick={() =>
        onSelect(node.index)
      }
      aria-pressed={isActive}
      aria-label={`${node.number} ${node.name}, ${node.type}`}
    >
      <div
        className="capsule-icon-wrap"
        aria-hidden="true"
      >
        <Icon />
      </div>

      <div className="capsule-text-wrap">
        <div className="capsule-header-line">
          <span className="capsule-badge">
            {node.number}
          </span>

          <span className="capsule-title">
            {node.name}
          </span>
        </div>

        <span className="capsule-subtitle">
          {node.type}
        </span>
      </div>

      {isActive && (
        <div
          className="capsule-active-ping"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export function AgenticCommandHub({
  groups = [],
  activeIndex = 0,
  onSelectGroup,
  agentMedia = {},
  agentLinks = {},
  onPlayVideo,
}) {
  const compactHub = useCompactHub();

  const safeGroups = Array.isArray(groups)
    ? groups
    : [];

  const systemCount = Math.min(
    safeGroups.length,
    HUB_NODES.length
  );

  const availableNodes =
    HUB_NODES.slice(0, systemCount);

  const [selectedIdx, setSelectedIdx] =
    useState(() =>
      normalizeIndex(
        activeIndex,
        systemCount
      )
    );

  const [
    rotationOffset,
    setRotationOffset,
  ] = useState(0);

  const lastWheelTime =
    useRef(0);

  useEffect(() => {
    if (systemCount === 0) {
      setSelectedIdx(0);
      setRotationOffset(0);
      return;
    }

    const normalized = normalizeIndex(
      activeIndex,
      systemCount
    );

    if (normalized === selectedIdx) {
      return;
    }

    if (!compactHub) {
      const delta = circularDelta(
        selectedIdx,
        normalized,
        systemCount
      );

      setRotationOffset(
        (current) =>
          current +
          delta * ROTATION_STEP
      );
    }

    setSelectedIdx(normalized);
  }, [
    activeIndex,
    compactHub,
    selectedIdx,
    systemCount,
  ]);

  const selectSystem = useCallback(
    (index) => {
      if (
        systemCount === 0 ||
        !Number.isInteger(index)
      ) {
        return;
      }

      const normalized = normalizeIndex(
        index,
        systemCount
      );

      if (
        normalized !== selectedIdx &&
        !compactHub
      ) {
        const delta = circularDelta(
          selectedIdx,
          normalized,
          systemCount
        );

        setRotationOffset(
          (current) =>
            current +
            delta * ROTATION_STEP
        );
      }

      setSelectedIdx(normalized);
      onSelectGroup?.(normalized);
    },
    [
      compactHub,
      onSelectGroup,
      selectedIdx,
      systemCount,
    ]
  );

  const handleNext = useCallback(() => {
    if (systemCount <= 1) {
      return;
    }

    selectSystem(
      normalizeIndex(
        selectedIdx + 1,
        systemCount
      )
    );
  }, [
    selectSystem,
    selectedIdx,
    systemCount,
  ]);

  const handlePrev = useCallback(() => {
    if (systemCount <= 1) {
      return;
    }

    selectSystem(
      normalizeIndex(
        selectedIdx - 1,
        systemCount
      )
    );
  }, [
    selectSystem,
    selectedIdx,
    systemCount,
  ]);

  const handleWheel = useCallback(
    (event) => {
      if (
        compactHub ||
        systemCount <= 1
      ) {
        return;
      }

      if (
        Math.abs(event.deltaY) < 8
      ) {
        return;
      }

      const now = Date.now();

      if (
        now -
        lastWheelTime.current <
        WHEEL_COOLDOWN_MS
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      lastWheelTime.current = now;

      if (event.deltaY > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    },
    [
      compactHub,
      handleNext,
      handlePrev,
      systemCount,
    ]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        event.preventDefault();
        handleNext();
      }

      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        event.preventDefault();
        handlePrev();
      }
    },
    [
      handleNext,
      handlePrev,
    ]
  );

  const currentGroup =
    systemCount > 0
      ? safeGroups[selectedIdx]
      : null;

  const computedNodes = useMemo(
    () =>
      availableNodes.map((node) => {
        const angleDeg =
          node.baseAngle +
          rotationOffset;

        const rad =
          (angleDeg * Math.PI) /
          180;

        const radiusX = 35.5;
        const radiusY = 39.5;

        const posX =
          50 +
          radiusX *
          Math.cos(rad);

        const posY =
          50 +
          radiusY *
          Math.sin(rad);

        const svgInnerR = 100;
        const svgOuterR = 250;

        const svgInnerX =
          500 +
          svgInnerR *
          Math.cos(rad);

        const svgInnerY =
          310 +
          svgInnerR *
          0.95 *
          Math.sin(rad);

        const svgOuterX =
          500 +
          svgOuterR *
          Math.cos(rad);

        const svgOuterY =
          310 +
          svgOuterR *
          0.95 *
          Math.sin(rad);

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
      }),
    [
      availableNodes,
      rotationOffset,
    ]
  );

  if (systemCount === 0) {
    return (
      <div
        className="agentic-command-hub-stage hub-empty-stage"
        role="status"
      >
        <strong>
          No intelligence systems available.
        </strong>

        <span>
          Add system groups to render
          the Agentic AI Command Hub.
        </span>
      </div>
    );
  }

  return (
    <div
      className={`agentic-command-hub-stage ${compactHub
          ? "hub-layout-compact"
          : "hub-layout-radial"
        }`}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={
        compactHub
          ? "Agentic AI command hub. Select an intelligence system."
          : "Agentic AI command hub. Use the arrow keys or mouse wheel to change intelligence systems."
      }
    >
      {compactHub ? (
        <div
          className="hub-compact-systems"
          aria-label="Intelligence systems"
        >
          {availableNodes.map(
            (node) => (
              <SystemButton
                key={node.number}
                node={node}
                isActive={
                  selectedIdx ===
                  node.index
                }
                compact
                onSelect={
                  selectSystem
                }
              />
            )
          )}
        </div>
      ) : (
        <div className="hub-radial-canvas">
          <svg
            className="hub-radar-svg"
            viewBox="0 0 1000 620"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="hubGradTeal"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#43a09b"
                  stopOpacity="0.9"
                />

                <stop
                  offset="100%"
                  stopColor="#38bdf8"
                  stopOpacity="0.4"
                />
              </linearGradient>

              <linearGradient
                id="hubGradCoral"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#e87042"
                  stopOpacity="0.9"
                />

                <stop
                  offset="100%"
                  stopColor="#f36b2e"
                  stopOpacity="0.4"
                />
              </linearGradient>

              <filter
                id="hubGlowTeal"
                x="-25%"
                y="-25%"
                width="150%"
                height="150%"
              >
                <feGaussianBlur
                  stdDeviation="4.5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="hubGlowCoral"
                x="-25%"
                y="-25%"
                width="150%"
                height="150%"
              >
                <feGaussianBlur
                  stdDeviation="4.5"
                  result="blur"
                />

                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx="500"
              cy="310"
              r="90"
              className="radar-ring inner"
            />

            <circle
              cx="500"
              cy="310"
              r="145"
              className="radar-ring middle"
            />

            <circle
              cx="500"
              cy="310"
              r="215"
              className="radar-ring outer"
            />

            <circle
              cx="500"
              cy="310"
              r="275"
              className="radar-ring outer-faint"
            />

            <polygon
              points="500,170 621,240 621,380 500,450 379,380 379,240"
              className="radar-hex-orbit"
            />

            <polygon
              points="500,105 677,207 677,413 500,515 323,413 323,207"
              className="radar-hex-orbit-outer"
            />

            {computedNodes.map(
              (node) => {
                const isActive =
                  selectedIdx ===
                  node.index;

                const isCoral =
                  node.theme ===
                  "coral" ||
                  (
                    node.theme ===
                    "dual" &&
                    node.index === 0
                  );

                const spokeClass =
                  isActive
                    ? isCoral
                      ? "active-coral"
                      : "active-teal"
                    : isCoral
                      ? "spoke-coral"
                      : "spoke-teal";

                return (
                  <g key={node.number}>
                    <line
                      x1={
                        node.svgInnerX
                      }
                      y1={
                        node.svgInnerY
                      }
                      x2={
                        node.svgOuterX
                      }
                      y2={
                        node.svgOuterY
                      }
                      className={`hub-spoke-line ${spokeClass}`}
                    />

                    <circle
                      cx={
                        node.svgOuterX
                      }
                      cy={
                        node.svgOuterY
                      }
                      r={
                        isActive
                          ? "5.5"
                          : "4"
                      }
                      className={`spoke-dot ${isCoral
                          ? "coral"
                          : "teal"
                        }`}
                    />
                  </g>
                );
              }
            )}
          </svg>

          <div
            className="hub-center-core"
            aria-hidden="true"
          >
            <div className="core-glow-aura" />

            <div className="core-logo-wrap">
              <img
                src="/branding/logo.png"
                alt=""
                className="core-sv-logo"
              />
            </div>

            <h3 className="core-hub-title">
              AGENTIC AI COMMAND HUB
            </h3>

            <div className="core-accent-bar" />

            <p className="core-hub-motto">
              <span>
                Orchestrating intelligence.
              </span>

              <span>
                Driving real estate value.
              </span>
            </p>

            <div className="core-scroll-hint">
              <span>
                SCROLL TO ROTATE
              </span>
            </div>
          </div>

          {computedNodes.map(
            (node) => (
              <SystemButton
                key={node.number}
                node={node}
                isActive={
                  selectedIdx ===
                  node.index
                }
                compact={false}
                onSelect={
                  selectSystem
                }
              />
            )
          )}
        </div>
      )}

      {currentGroup && (
        <section
          className="hub-active-system-drawer"
          aria-live="polite"
        >
          <div className="drawer-header-row">
            <div className="drawer-title-group">
              <div className="drawer-system-badge">
                {String(
                  selectedIdx + 1
                ).padStart(2, "0")}
                {" / "}
                {String(
                  systemCount
                ).padStart(2, "0")}
              </div>

              <div className="drawer-titles">
                <h4 className="drawer-name">
                  {currentGroup.name}
                </h4>

                {currentGroup.type && (
                  <span className="drawer-type">
                    ({currentGroup.type})
                  </span>
                )}
              </div>
            </div>

            <div className="drawer-controls">
              {!compactHub && (
                <span className="scroll-shortcut-indicator">
                  Scroll wheel to revolve
                </span>
              )}

              <button
                type="button"
                className="hub-nav-arrow prev"
                onClick={handlePrev}
                aria-label="Previous intelligence system"
                disabled={
                  systemCount <= 1
                }
              >
                <FiChevronLeft />
              </button>

              <button
                type="button"
                className="hub-nav-arrow next"
                onClick={handleNext}
                aria-label="Next intelligence system"
                disabled={
                  systemCount <= 1
                }
              >
                <FiChevronRight />
              </button>
            </div>
          </div>

          <div className="drawer-subagents-grid">
            {Array.isArray(
              currentGroup.agents
            ) &&
              currentGroup.agents.map(
                ([
                  agentName,
                  agentDesc,
                  agentNum,
                ]) => {
                  const media =
                    agentMedia[
                    agentName
                    ];

                  const href =
                    agentLinks[
                    agentName
                    ];

                  if (media) {
                    return (
                      <button
                        key={
                          agentName
                        }
                        type="button"
                        className="hub-subagent-card video-card"
                        onClick={() =>
                          onPlayVideo?.(
                            media
                          )
                        }
                        aria-label={`Play video for ${agentName}`}
                      >
                        <div className="subagent-top-row">
                          <span className="subagent-num-tag">
                            {agentNum ||
                              "•"}
                          </span>

                          <FiPlayCircle
                            className="media-play-icon"
                            aria-hidden="true"
                          />

                          <span className="subagent-title">
                            {agentName}
                          </span>

                          <span className="hub-play-badge">
                            <span>
                              PLAY VIDEO
                            </span>

                            <FiPlay
                              aria-hidden="true"
                            />
                          </span>
                        </div>

                        <p className="subagent-copy">
                          {agentDesc}
                        </p>
                      </button>
                    );
                  }

                  if (href) {
                    return (
                      <a
                        key={
                          agentName
                        }
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="hub-subagent-card link-card"
                        aria-label={`Open ${agentName} in SigmaValue OS`}
                      >
                        <div className="subagent-top-row">
                          <span className="subagent-num-tag">
                            {agentNum ||
                              "•"}
                          </span>

                          <FiActivity
                            className="link-icon"
                            aria-hidden="true"
                          />

                          <span className="subagent-title">
                            {agentName}
                          </span>

                          <span className="hub-visit-badge">
                            <span>
                              VISIT OS
                            </span>

                            <FiArrowUpRight
                              aria-hidden="true"
                            />
                          </span>
                        </div>

                        <p className="subagent-copy">
                          {agentDesc}
                        </p>
                      </a>
                    );
                  }

                  return (
                    <div
                      key={
                        agentName
                      }
                      className="hub-subagent-card standard-card"
                    >
                      <div className="subagent-top-row">
                        <span className="subagent-num-tag">
                          {agentNum ||
                            "•"}
                        </span>

                        <span className="subagent-title">
                          {agentName}
                        </span>

                        <span className="hub-ready-badge">
                          ACTIVE AI
                        </span>
                      </div>

                      <p className="subagent-copy">
                        {agentDesc}
                      </p>
                    </div>
                  );
                }
              )}
          </div>
        </section>
      )}
    </div>
  );
}
