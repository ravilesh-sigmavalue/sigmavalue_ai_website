import { useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { DeveloperDetailPanel } from "../personas/DeveloperDetailPanel";
import { WhoYouAreCard } from "../personas/WhoYouAreCard";

export function ContactChapter({ show, onClose }) {
  const [selectedPersona, setSelectedPersona] = useState(null);
  if (!show) return null;

  if (selectedPersona === "developer") {
    return (
      <motion.div id="contact" className="contact-panel who-you-are-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
        <div className="who-you-are-card who-you-are-card--wide"><div className="who-you-are-matrix-bg" /><DeveloperDetailPanel onBack={() => setSelectedPersona(null)} /></div>
      </motion.div>
    );
  }

  return (
    <motion.div id="contact" className="contact-panel who-you-are-panel" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.4 }}>
      <div className="who-you-are-card">
        <button type="button" className="who-you-are-close" onClick={onClose} aria-label="Close Who you are panel"><FiX /></button>
        <div className="who-you-are-matrix-bg" />
        <div className="who-you-are-header">
          <div className="hero-badge"><span className="pulse-dot" /><span>DIRECT ENTERPRISE ENGAGEMENT</span></div>
          <h2 className="who-you-are-title">Who you are?</h2>
          <p className="who-you-are-subtitle">Select your industry role to explore customized AI solutions and schedule a personalized demo.</p>
        </div>
        <WhoYouAreCard selectedPersona={selectedPersona} onSelect={setSelectedPersona} />
        <div className="contact-note"><span>Official inquiry handled directly through SigmaValue secure enterprise routing.</span></div>
        <div className="contact-links">
          <a href="https://sigmavalue.ai/" target="_blank" rel="noreferrer">Main Website</a><span className="sep">•</span>
          <a href="https://sigmavalue.ai/real-estate-consultancy/" target="_blank" rel="noreferrer">Consultancy</a><span className="sep">•</span>
          <a href="https://os.sigmavalue.ai/" target="_blank" rel="noreferrer">SigmaValue OS</a>
        </div>
        <div className="foot">© 2025 Creasophere Tech Private Limited. All rights reserved.</div>
      </div>
    </motion.div>
  );
}
