import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { PERSONAS } from "./data/contactPersonas";

export function WhoYouAreCard({ selectedPersona, onSelect }) {
  return (
    <motion.div
      key="persona-cards"
      className="persona-grid-container"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="persona-grid">
        {PERSONAS.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.id;
          return (
            <div
              key={persona.id}
              className={`persona-card ${isSelected ? "selected" : ""}`}
              style={{ "--persona-accent": persona.accentColor }}
              onClick={() => onSelect(persona.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") onSelect(persona.id);
              }}
            >
              <div className="persona-card-header">
                <div className="persona-icon-box"><Icon className="persona-icon" /></div>
                {isSelected && <div className="persona-checked-pill"><FiCheck className="check-icon" /><span>Selected</span></div>}
              </div>
              <div className="persona-info">
                <h3 className="persona-title">{persona.title}</h3>
                <span className="persona-badge-label">{persona.badge}</span>
                <p className="persona-desc">{persona.desc}</p>
              </div>
              <div className="persona-tags">
                {persona.tags.map((tag) => <span key={tag} className="persona-tag">{tag}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
