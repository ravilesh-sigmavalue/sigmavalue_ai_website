import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiAward, FiCompass, FiGrid, FiHeart, FiLinkedin, FiStar, FiTarget, FiUsers, FiZap } from "react-icons/fi";
import "./about-us-page.css";

const TABS = [
  { id: "team", label: "Our Team", icon: FiUsers },
  { id: "mission", label: "Mission & Vision", icon: FiTarget },
  { id: "awards", label: "Awards & Recognition", icon: FiAward },
  { id: "partners", label: "Our Partners", icon: FiGrid },
];

const TEAM = [
  { name: "Yashdeep Jadon", image: "/about_us/yashdeepsir.jpeg", education: "IIT Bombay Alumnus · IBBI Registered Valuer", role: "Founder & CEO", bullets: ["12+ years across real estate valuation, investment analysis and data-driven decision-making.", "Combines real estate expertise with AI, analytics and statistical modelling to build SigmaValue’s Agentic AI platform.", "Led valuation and advisory engagements for 372+ clients including banks, NBFCs, developers and other institutional clients."], accent: "teal" },
  { name: "CA Pushpak Bogati", image: "/about_us/pushkarsir.jpeg", education: "Chartered Accountant · Author of RERA — Pillars of Progress", role: "Chief Operating Officer", bullets: ["16+ years as a CA professional in real estate lending.", "Operational backbone ensuring execution excellence."], accent: "coral" },
  { name: "Sahana Ghosh Dastidar", image: "/about_us/sahanamam.jpeg", education: "Ex Professor · PhD Fellow, Jadavpur University", role: "Strategy Head", bullets: ["8+ years in real estate strategy and market intelligence.", "Insight-driven strategist shaping growth and GTM success."], accent: "purple" },
];

const VALUES = [
  { icon: FiTarget, accent: "teal", title: "Our Mission", body: "To democratize institutional-grade real estate intelligence by combining agentic AI, spatial analytics, and domain expertise — enabling every decision maker to act with precision and confidence." },
  { icon: FiCompass, accent: "coral", title: "Our Vision", body: "A world where every real estate transaction, development, and investment is powered by transparent, AI-driven intelligence — eliminating guesswork and driving sustainable value creation across markets." },
  { icon: FiHeart, accent: "purple", title: "Our Values", body: "Integrity in data. Excellence in delivery. Innovation without compromise. We build for the long term — partnering deeply with clients to create measurable, lasting impact." },
  { icon: FiZap, accent: "teal", title: "Our Approach", body: "We combine first-principles thinking with cutting-edge AI. Our agentic systems are purpose-built for real estate — not adapted from generic tools — giving clients an unfair advantage in complex markets." },
];

const AWARDS = [
  ["2024", "Best PropTech Innovation", "Recognised for breakthrough Agentic AI deployment in Indian real estate markets.", "teal", FiAward],
  ["2024", "Top AI Startup – Real Estate", "Featured among India's top AI-first startups transforming the real estate ecosystem.", "coral", FiStar],
  ["2023", "Excellence in Spatial Analytics", "Awarded for the Catchment Intelligence (MMA) platform enabling micro-market precision.", "purple", FiAward],
  ["2023", "Valuation Technology Pioneer", "Recognised for the Automated Valuation Model (AVM) achieving institutional-grade accuracy.", "teal", FiStar],
  ["2022", "Emerging PropTech Leader", "Honoured by industry bodies for technology leadership and market disruption in real estate advisory.", "coral", FiAward],
];

const PARTNERS = [
  ["Google Cloud", "AI & Cloud Infrastructure", "teal"], ["Microsoft Azure", "Enterprise AI Platform", "coral"],
  ["Esri India", "Geo-Spatial Technology", "purple"], ["RICS", "Valuation Standards & Advisory", "teal"],
  ["National Real Estate Development Council", "Industry Body", "coral"], ["IIM Ahmedabad", "Research & Academia", "purple"],
  ["HDFC Capital", "Capital & Investment Advisory", "teal"], ["Knight Frank India", "Market Intelligence", "coral"],
];

function TeamPanel() {
  return <div className="aup-grid aup-team-grid">{TEAM.map((member, index) => <motion.article key={member.name} className={`aup-card aup-team-card aup-${member.accent}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><div className="aup-photo-ring"><img className="aup-team-photo" src={member.image} alt={member.name} /></div><small>{member.education}</small><h3>{member.name}</h3><strong>{member.role}</strong><ul>{member.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul><a className="aup-social" href="https://www.linkedin.com/company/sigmavalue/" target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><FiLinkedin /></a></motion.article>)}</div>;
}

function ValuesPanel() {
  return <div className="aup-grid">{VALUES.map(({ icon: Icon, ...value }, index) => <motion.article key={value.title} className={`aup-card aup-${value.accent}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }}><Icon className="aup-card-icon" /><h3>{value.title}</h3><p>{value.body}</p></motion.article>)}</div>;
}

function AwardsPanel() {
  return <div className="aup-list">{AWARDS.map(([year, title, body, accent, Icon], index) => <motion.article key={title} className={`aup-card aup-award aup-${accent}`} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .07 }}><b>{year}</b><Icon className="aup-card-icon" /><div><h3>{title}</h3><p>{body}</p></div></motion.article>)}</div>;
}

function PartnersPanel() {
  return <div className="aup-grid aup-partners">{PARTNERS.map(([name, category, accent], index) => <motion.article key={name} className={`aup-card aup-${accent}`} initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * .05 }}><h3>{name}</h3><p>{category}</p></motion.article>)}</div>;
}

const PANELS = { team: <TeamPanel />, mission: <ValuesPanel />, awards: <AwardsPanel />, partners: <PartnersPanel /> };

export function AboutUsPage({ initialTab = "team", onRequestDemo, onExplore }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  useEffect(() => setActiveTab(initialTab), [initialTab]);
  return <div className="aup-root">
    <div className="aup-glow aup-glow-one" /><div className="aup-glow aup-glow-two" />
    <main className="aup-main"><section className="aup-hero"><motion.div className="aup-hero-copy" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}><span>ABOUT SIGMAVALUE</span><h1>Built by experts.<em>Driven by intelligence.</em></h1><p>India's leading Agentic AI and real estate intelligence platform — combining deep domain expertise with cutting-edge AI to transform how markets are understood and decisions are made.</p><div className="aup-hero-actions"><button type="button" className="aup-primary" onClick={onRequestDemo}>Request a Demo <FiArrowUpRight /></button><button type="button" className="aup-secondary" onClick={onExplore}>Explore Solutions <FiArrowUpRight /></button></div></motion.div><motion.div className="aup-hero-visual" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12 }}><img src="/about_us/about_us.png" alt="AI-powered real estate intelligence network" /></motion.div></section>
      {/* <section className="aup-stats" aria-label="SigmaValue achievements"><div><b>98.4%</b><span>Valuation Precision</span></div><div><b>10M+</b><span>Indexed Records</span></div><div><b>7+</b><span>Industry Awards</span></div><div><b>50+</b><span>Enterprise Partners</span></div></section> */}
      {/* <nav className="aup-tabs" aria-label="About Us sections">{TABS.map(({ id, label, icon: Icon }) => <button type="button" key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}><Icon />{label}</button>)}</nav> */}
      <section className="aup-content">{activeTab === "team" && <div className="aup-section-heading"><span /><h2>Leadership Team</h2><span /></div>}<AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>{PANELS[activeTab]}</motion.div></AnimatePresence></section>
    </main>
    <footer className="aup-footer"><span>© 2025 Creasophere Tech Private Limited. All rights reserved.</span><div><a href="https://sigmavalue.ai/" target="_blank" rel="noreferrer">Main Website</a><a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer">SigmaValue OS</a><a href="https://sigmavalue.ai/real-estate-consultancy/" target="_blank" rel="noreferrer">Consultancy</a></div></footer>
  </div>;
}
