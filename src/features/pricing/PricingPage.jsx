import { useEffect } from "react";
import { Link, useNavigate, } from "react-router-dom";
import {
  FiArrowRight,
  FiBriefcase,
  FiCheck,
  FiCreditCard,
  FiGlobe,
  FiMail,
  FiShield,
  FiZap,
} from "react-icons/fi";
import { Header } from "../navigation/Header";
import "./PricingPage.css";

const FREE_FEATURES = ["10,000 tokens included at signup", "Full Valuation Agent access", "No approval required", "Tokens never expire"];
const PRO_FEATURES = ["1,000,000 tokens added instantly", "International cards accepted", "UPI & NetBanking supported", "Tokens credited within seconds", "No limit on purchases"];
const ENTERPRISE_FEATURES = ["1 Owner + unlimited Employees", "Shared organization token pool", "Email-based member onboarding", "Organization-wide usage analytics", "Dedicated support & SLA"];

function Feature({ children }) {
  return <div className="pricing-feature"><span className="pricing-feature-check"><FiCheck /></span><span>{children}</span></div>;
}

function TrustItem({ icon, title, description, tone = "teal" }) {
  return <article className="pricing-trust-card"><div className={`pricing-trust-icon pricing-trust-icon--${tone}`}>{icon}</div><div className="pricing-trust-copy"><h4>{title}</h4><p>{description}</p></div></article>;
}

export default function PricingPage() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleGo = () => {
    navigate("/");
  };

  const handleMenu = () => {
    navigate("/");
  };

  const handleRequestDemo = () => {
    navigate("/");
  };

  const handleAboutUs = () => {
    navigate("/");
  };
  return (
    <main className="pricing-page">
      <Header
        go={handleGo}
        onMenu={handleMenu}
        onRequestDemo={handleRequestDemo}
        onAboutUs={handleAboutUs}
      />
      <div className="pricing-grid-overlay" /><div className="pricing-orb pricing-orb--left" /><div className="pricing-orb pricing-orb--right" />
      <section className="pricing-content">
        <div className="pricing-hero">
          <div className="pricing-kicker"><span className="pricing-kicker-dot" />SIMPLE & TRANSPARENT PRICING</div>
          <h1>Pick Your <span className="pricing-gradient-text">Token Plan</span></h1>
          <p className="pricing-hero-description">Every user gets <strong>10,000 free tokens</strong> on signup. Upgrade whenever you need more.</p>
          <p className="pricing-hero-note">International cards accepted.</p>
        </div>

        <div className="pricing-card-grid">
          <article className="pricing-card pricing-card--free">
            <div className="pricing-card-glow" />
            <div className="pricing-card-header"><div><span className="pricing-plan-type">FREE TIER</span><h2>Free</h2><p>Auto-credited on signup</p></div><div className="pricing-card-icon"><FiCreditCard /></div></div>
            <div className="pricing-card-divider" />
            <div className="pricing-feature-list">{FREE_FEATURES.map((feature) => <Feature key={feature}>{feature}</Feature>)}</div>
            <div className="pricing-card-footer"><Link to="/" className="pricing-action pricing-action--secondary"><span>Get Started Free</span><FiArrowRight /></Link></div>
          </article>

          <article className="pricing-card pricing-card--pro">
            <div className="pricing-card-glow" /><div className="pricing-popular-label">MOST POPULAR</div>
            <div className="pricing-card-header"><div><span className="pricing-plan-type pricing-plan-type--warm">INDIVIDUAL PRO PACK</span><div className="pricing-price-line"><h2>₹5,000</h2><span>/ pack</span></div><p className="pricing-token-highlight">1,000,000 tokens per pack</p></div><div className="pricing-card-icon pricing-card-icon--warm"><FiZap /></div></div>
            <div className="pricing-card-divider" />
            <div className="pricing-feature-list">{PRO_FEATURES.map((feature) => <Feature key={feature}>{feature}</Feature>)}</div>
            <div className="pricing-payment-box"><span className="pricing-payment-label">ACCEPTED PAYMENT METHODS</span><div className="pricing-payment-methods"><span>VISA</span><span>Mastercard</span><span>AMEX</span><span>UPI</span><span>NetBanking</span></div></div>
            <div className="pricing-card-footer"><button type="button" className="pricing-action pricing-action--primary"><FiZap /><span>Buy 1M Token Pack — ₹5,000</span></button><div className="pricing-secure-note"><FiShield /><span>Secured payment · 256-bit SSL encryption</span></div></div>
          </article>

          <article className="pricing-card pricing-card--enterprise">
            <div className="pricing-card-glow" />
            <div className="pricing-card-header"><div><span className="pricing-plan-type">ENTERPRISE ORGANIZATION</span><h2>Custom</h2><p>Negotiated contract with sales team</p></div><div className="pricing-card-icon pricing-card-icon--enterprise"><FiBriefcase /></div></div>
            <div className="pricing-card-divider" />
            <div className="pricing-feature-list">{ENTERPRISE_FEATURES.map((feature) => <Feature key={feature}>{feature}</Feature>)}</div>
            <div className="pricing-card-footer"><a href="mailto:contact@sigmavalue.ai" className="pricing-action pricing-action--enterprise"><FiMail /><span>Contact Us for Enterprise</span></a></div>
          </article>
        </div>

        <div className="pricing-trust-grid">
          <TrustItem icon={<FiShield />} title="Secure Payments" description="Enterprise-grade encrypted payment processing." />
          <TrustItem icon={<FiGlobe />} title="International Cards" description="Visa, Mastercard, Amex and global cards supported." />
          <TrustItem icon={<FiZap />} title="Instant Credits" description="Tokens are credited within seconds after payment." tone="warm" />
        </div>
        <div className="pricing-bottom-note"><FiShield /><span>Secure payments · Transparent pricing · No hidden fees</span></div>
      </section>
    </main>
  );
}
