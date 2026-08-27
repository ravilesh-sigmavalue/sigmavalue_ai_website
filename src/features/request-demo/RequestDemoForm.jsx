import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

export function RequestDemoForm({ persona, formData, onChange, onBack, onSubmit, backLabel = "Change Role" }) {
  const PersonaIcon = persona.icon;

  return (
    <motion.div
      key="persona-form"
      className="persona-form-wrapper"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="persona-form-head">
        <button type="button" className="btn-back-persona" onClick={onBack}>
          <FiArrowLeft /><span>{backLabel}</span>
        </button>
        <div className="active-persona-pill" style={{ borderColor: persona.accentColor }}>
          <PersonaIcon style={{ color: persona.accentColor }} />
          <span>Role: <strong>{persona.title}</strong></span>
        </div>
      </div>
      <form onSubmit={onSubmit} className="contact-form">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" required value={formData.name} onChange={onChange} placeholder="e.g. Michael Vance" />
        </div>
        <div className="form-group">
          <label>Work Email</label>
          <input name="email" type="email" required value={formData.email} onChange={onChange} placeholder="e.g. michael@enterprise.com" />
        </div>
        <div className="form-group">
          <label>Project / Requirement Overview</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={onChange}
            placeholder={`Tell us about your ${persona.title.toLowerCase()} goals, team size, or integration needs...`}
          />
        </div>
        <button type="submit" className="btn-primary full-width">
          <span>Schedule {persona.title} Demo</span><FiArrowUpRight />
        </button>
      </form>
    </motion.div>
  );
}
