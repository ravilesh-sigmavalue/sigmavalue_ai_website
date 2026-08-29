import {
    FiArrowRight,
    FiCpu,
    FiDatabase,
    FiGitBranch,
    FiGrid,
    FiLayers,
    FiLink2,
} from "react-icons/fi";

import "./TechnologyTransformationModal.css";

const TRANSFORMATION_ITEMS = [
    {
        number: "01",
        eyebrow: "DIGITAL ECOSYSTEM",
        title: "Digital Transformation through AI Platforms",
        description:
            "Transforming traditional business and real estate operations into connected, AI-enabled digital ecosystems by digitizing processes, modernizing legacy systems and creating intelligent platforms across the entire business lifecycle.",
        icon: FiLayers,
        image: "/illustrations/digital-transformation.png",
        tags: [
            "Digital Platforms",
            "Legacy Modernization",
            "Connected Operations",
        ],
    },
    {
        number: "02",
        eyebrow: "AUTONOMOUS OPERATIONS",
        title: "Agentic AI & Workflow Automation",
        description:
            "Designing intelligent AI agents and autonomous workflows that can analyze information, make decisions, execute multi-step tasks and automate complex business processes with minimal human intervention.",
        icon: FiCpu,
        image: "/illustrations/agentic-ai-workflow.png",
        tags: [
            "AI Agents",
            "Workflow Automation",
            "Decision Intelligence",
        ],
    },
    {
        number: "03",
        eyebrow: "CONNECTED ENTERPRISE",
        title: "Custom AI Solutions & Enterprise Integration",
        description:
            "Developing tailored AI solutions, copilots and intelligent applications and integrating them with existing ERP, CRM, databases, GIS platforms, enterprise systems and external data sources.",
        icon: FiLink2,
        image: "/illustrations/enterprise-integration.png",
        tags: [
            "Enterprise Integration",
            "AI Copilots",
            "Connected Data",
        ],
    },
];

export function TechnologyTransformationModal({
    show,
    onRequestDemo,
}) {
    if (!show) return null;

    return (
        <div className="tech-transform-overlay">
            <div className="tech-transform-grid" />

            <div className="tech-transform-glow tech-transform-glow--left" />
            <div className="tech-transform-glow tech-transform-glow--right" />

            <div className="tech-transform-scroll">
                <section className="tech-transform-hero">
                    <div className="tech-transform-kicker">
                        <span />
                        TECHNOLOGY & TRANSFORMATION
                    </div>

                    <h1>
                        From Traditional Operations to
                        <span> Intelligent Digital Ecosystems.</span>
                    </h1>

                    <p>
                        We combine AI platforms, autonomous agents and enterprise
                        integration to transform how organizations operate, analyze,
                        automate and make decisions.
                    </p>
                </section>

                <section className="tech-transform-journey">
                    <div className="tech-transform-journey-heading">
                        <span>THE TRANSFORMATION JOURNEY</span>

                        <h2>
                            Three capabilities. One connected transformation layer.
                        </h2>
                    </div>

                    <div className="tech-transform-spine" />

                    {TRANSFORMATION_ITEMS.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.number}
                                className={`tech-transform-step ${index % 2 === 1
                                        ? "tech-transform-step--reverse"
                                        : ""
                                    }`}
                            >
                                <div className="tech-transform-visual">
                                    <div className="tech-transform-image-frame">
                                        <div className="tech-transform-image-grid" />

                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />

                                        <div className="tech-transform-image-shade" />

                                        <div className="tech-transform-image-number">
                                            {item.number}
                                        </div>

                                        <div className="tech-transform-image-status">
                                            <span />
                                            INTELLIGENCE LAYER
                                        </div>
                                    </div>
                                </div>

                                <div className="tech-transform-step-node">
                                    <span>{item.number}</span>
                                </div>

                                <div className="tech-transform-copy">
                                    <div className="tech-transform-copy-top">
                                        <div className="tech-transform-step-icon">
                                            <Icon />
                                        </div>

                                        <span className="tech-transform-eyebrow">
                                            {item.eyebrow}
                                        </span>
                                    </div>

                                    <h2>{item.title}</h2>

                                    <p>{item.description}</p>

                                    <div className="tech-transform-tags">
                                        {item.tags.map((tag) => (
                                            <span key={tag}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </section>

                <section className="tech-transform-enterprise">
                    <div className="tech-transform-enterprise-glow" />

                    <span className="tech-transform-enterprise-label">
                        ONE CONNECTED TRANSFORMATION LAYER
                    </span>

                    <h2>
                        Connect intelligence across your entire enterprise.
                    </h2>

                    <p>
                        Bring AI, enterprise applications, data and workflows together
                        into one connected intelligence ecosystem.
                    </p>

                    <div className="tech-transform-system-network">
                        <span>ERP</span>
                        <i />

                        <span>CRM</span>
                        <i />

                        <span>GIS</span>
                        <i />

                        <span>DATABASES</span>
                        <i />

                        <span>APIs</span>
                        <i />

                        <span>AI</span>
                    </div>

                    <button
                        type="button"
                        className="tech-transform-cta"
                        onClick={onRequestDemo}
                    >
                        Discuss Your Transformation
                        <FiArrowRight />
                    </button>
                </section>
            </div>
        </div>
    );
}