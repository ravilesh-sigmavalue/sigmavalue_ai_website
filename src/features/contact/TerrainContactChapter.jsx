import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck, FiMail, FiMap, FiPhone, FiX } from "react-icons/fi";
import "./terrain-contact.css";

export function TerrainContactChapter({ show, onClose }) {
  if (!show) return null;

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = new URLSearchParams({
      page: "elevation-terrain-agent-access",
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      message: data.get("message"),
    });
    window.location.href = `https://sigmavalue.ai/contact/?${query}`;
  };

  return (
    <motion.div id="contact" className="contact-panel terrain-contact-panel" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.38 }}>
      <div className="terrain-contact-shell">
        <button type="button" className="terrain-contact-close" onClick={onClose} aria-label="Close contact form"><FiX /></button>
        <div className="terrain-contact-grid">
          <section className="terrain-contact-intro">
            <div className="terrain-contact-eyebrow"><span className="pulse-dot" /> CONTACT US</div>
            <div className="terrain-contact-icon"><FiMap /></div>
            <h2>Request access to <span>Elevation &amp; Terrain Agent</span></h2>
            <p>Connect with our team to explore terrain intelligence, elevation analysis, site feasibility, and location-aware decision support.</p>
            <ul>
              <li><FiCheck /> Elevation and slope intelligence</li>
              <li><FiCheck /> Terrain-aware site evaluation</li>
              <li><FiCheck /> Enterprise access and onboarding</li>
            </ul>
            <div className="terrain-contact-direct"><span><FiMail /> business@sigmavalue.ai</span><span><FiPhone /> Talk to our specialist team</span></div>
          </section>
          <form className="terrain-contact-form" onSubmit={submit}>
            <div className="terrain-form-heading"><span>ACCESS REQUEST</span><h3>Tell us about your requirement</h3><p>Fields marked with * are required.</p></div>
            <div className="terrain-form-row">
              <label><span>Your Name</span><input name="name" type="text" autoComplete="name" placeholder="Enter your full name" /></label>
              <label><span>Work Email *</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
            </div>
            <div className="terrain-form-row">
              <label><span>Company / Organization</span><input name="company" type="text" autoComplete="organization" placeholder="Company name" /></label>
              <label><span>Phone Number *</span><input name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+91 98765 43210" required /></label>
            </div>
            <label><span>Message</span><textarea name="message" rows="5" placeholder="Tell us how you plan to use the Elevation & Terrain Agent" /></label>
            <button className="terrain-submit" type="submit"><span>Request Access</span><FiArrowUpRight /></button>
            <small>By submitting this form, you agree to be contacted by the SigmaValue team about your request.</small>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
