import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { PERSONAS } from "./contactPersonas";
import { RequestDemoForm } from "./RequestDemoForm";
import "./RequestDemoModal.css";

export function RequestDemoModal({ open, onClose }) {
  const persona = PERSONAS[0];
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  const submit = (event) => {
    event.preventDefault();
    const query = new URLSearchParams({
      page: "design04-request-demo-modal",
      role: persona.title,
      ...formData
    });
    window.location.href = `https://sigmavalue.ai/contact/?${query}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="request-demo-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
          role="presentation"
        >
          <motion.section
            className="request-demo-modal-card"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-demo-modal-title"
          >
            <button className="request-demo-modal-close" type="button" onClick={onClose} aria-label="Close request demo form">
              <FiX />
            </button>
            <div className="hero-badge"><span className="pulse-dot" /><span>DIRECT ENTERPRISE ENGAGEMENT</span></div>
            <h2 id="request-demo-modal-title">Let’s build what’s next</h2>
            <p className="request-demo-modal-intro">Connect with our real estate AI specialists to discuss your requirements and schedule a personalized demo.</p>
            <RequestDemoForm
              persona={persona}
              formData={formData}
              onChange={(event) => setFormData({ ...formData, [event.target.name]: event.target.value })}
              onBack={onClose}
              onSubmit={submit}
              backLabel="Close"
            />
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
