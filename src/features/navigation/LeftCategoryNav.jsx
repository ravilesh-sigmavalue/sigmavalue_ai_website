import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronDown,
  FiChevronRight,
  FiCpu,
  FiLayers,
} from "react-icons/fi";
import { CATEGORIES, CHAPTERS } from "../experience/data/chapters";
import { SECTION_NAVIGATION_DATA } from "./data/sectionNavigationData";

export function LeftCategoryNav({ active, go }) {
  const currentChapter = CHAPTERS[active] || {};
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState(null);

  return (
    <div id="leftNav" className={active > 0 ? "show" : ""}>
      <div className="nav-label">SECTIONS</div>
      <div className="category-list">
        {CATEGORIES.map((category) => {
          const targetIndex = CHAPTERS.findIndex((chapter) => chapter.cat === category);
          const isCurrent = currentChapter.cat === category;
          const sectionData = SECTION_NAVIGATION_DATA[category.trim()];
          const isExpanded = expandedCategory === category;

          return (
            <div key={category} className="cat-group-container">
              <button
                type="button"
                className={`cat-item ${isCurrent ? "active" : ""}`}
                onClick={() => {
                  if (targetIndex >= 0) go(targetIndex);
                  if (sectionData) {
                    setExpandedCategory(isExpanded ? null : category);
                    setExpandedGroup(null);
                  }
                }}
              >
                <span className="indicator-line" />
                <span className="cat-name">{category}</span>
                {sectionData && isCurrent && (
                  <span className="cat-expand-chevron">
                    {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                  </span>
                )}
              </button>

              {/* ── EXPANDABLE SECTION SUBMENU ── */}
              {sectionData && isCurrent && isExpanded && (
                <AnimatePresence>
                  <motion.div
                    className="agentic-nav-sublist"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="agentic-nav-header-badge">
                      <span>{sectionData.label}</span>
                    </div>

                    {sectionData.groups.map((group, idx) => {
                      const Icon = group.icon || FiLayers;
                      const isGroupExpanded = expandedGroup === `${category}-${idx}`;

                      return (
                        <div key={group.name} className="agentic-nav-system-node">
                          <button
                            type="button"
                            className={`agentic-nav-system-btn ${isGroupExpanded ? "expanded" : ""}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedGroup(isGroupExpanded ? null : `${category}-${idx}`);
                            }}
                          >
                            <span className="nav-system-num">{group.number}.</span>
                            <Icon className="nav-system-icon" />
                            <div className="nav-system-text">
                              <span className="nav-system-name">{group.name}</span>
                              <span className="nav-system-type">({group.type})</span>
                            </div>
                            <span className="nav-system-arrow">
                              {isGroupExpanded ? <FiChevronDown /> : <FiChevronRight />}
                            </span>
                          </button>

                          {/* Sub-items for this group */}
                          {isGroupExpanded && (
                            <motion.div
                              className="agentic-nav-agents-branch"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              transition={{ duration: 0.18 }}
                            >
                              {group.items.map((item) => (
                                <div key={item.name} className="nav-agent-leaf" title={item.desc}>
                                  <span className="nav-agent-bullet" />
                                  <span className="nav-agent-num">{item.num}.</span>
                                  <span className="nav-agent-name">{item.name}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
