/* ────────────────────────────────────────────────────────────
   High-Fidelity SVG Illustrations for Persona Detail Panels
   Zero external asset dependencies — pure reactive vector graphics
   ──────────────────────────────────────────────────────────── */

export function PersonaIllustration({ personaId, tabId, accentColor }) {
  // Common background grid helper
  const renderGrid = (color = "currentColor", opacity = 0.05) => (
    <>
      {[...Array(7)].map((_, i) => (
        <line
          key={`hg-${i}`}
          x1="0"
          y1={i * 42 + 15}
          x2="480"
          y2={i * 42 + 15}
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth="1"
        />
      ))}
      {[...Array(11)].map((_, i) => (
        <line
          key={`vg-${i}`}
          x1={i * 44 + 20}
          y1="0"
          x2={i * 44 + 20}
          y2="300"
          stroke={color}
          strokeOpacity={opacity}
          strokeWidth="1"
        />
      ))}
    </>
  );

  // ═══════════════════════════════════════════════════════════════
  // 1. DEVELOPER ILLUSTRATIONS
  // ═══════════════════════════════════════════════════════════════
  if (personaId === "developer") {
    if (tabId === "feasibility") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid(accentColor, 0.06)}
          {/* Building silhouette */}
          <rect x="60" y="80" width="100" height="200" rx="4" fill={accentColor} fillOpacity="0.12" stroke={accentColor} strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x="75" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="100" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="125" y="100" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="75" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="100" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="125" y="135" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="75" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="100" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="125" y="170" width="15" height="20" rx="2" fill={accentColor} fillOpacity="0.4" />
          <rect x="95" y="220" width="30" height="60" rx="2" fill={accentColor} fillOpacity="0.6" />
          {/* IRR graph */}
          <polyline points="230,240 270,180 310,200 350,140 390,100 420,120" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="420" cy="120" r="6" fill={accentColor} />
          <text x="425" y="116" fill={accentColor} fontSize="11" fontWeight="700" fontFamily="monospace">IRR 22.4%</text>
          {/* Axis */}
          <line x1="230" y1="260" x2="430" y2="260" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          <line x1="230" y1="80" x2="230" y2="260" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
          {/* Data labels */}
          <rect x="240" y="195" width="85" height="28" rx="6" fill={accentColor} fillOpacity="0.15" stroke={accentColor} strokeOpacity="0.3" />
          <text x="282" y="213" textAnchor="middle" fill={accentColor} fontSize="11" fontWeight="700">NPV ₹24.8Cr</text>
        </svg>
      );
    }
    if (tabId === "site") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#38bdf8", 0.08)}
          <polygon points="160,80 310,70 330,180 270,210 140,200" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.7" />
          <circle cx="235" cy="140" r="18" fill="#38bdf8" fillOpacity="0.25" />
          <circle cx="235" cy="140" r="8" fill="#38bdf8" />
          <rect x="260" y="95" width="105" height="52" rx="8" fill="rgba(6,15,25,0.85)" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.6" />
          <text x="312" y="115" textAnchor="middle" fill="#38bdf8" fontSize="9" letterSpacing="1" opacity="0.8">SITE SCORE</text>
          <text x="312" y="136" textAnchor="middle" fill="#38bdf8" fontSize="19" fontWeight="800">8.6 / 10</text>
          <line x1="40" y1="200" x2="440" y2="200" stroke="white" strokeOpacity="0.1" strokeWidth="8" />
          <line x1="310" y1="30" x2="310" y2="270" stroke="white" strokeOpacity="0.1" strokeWidth="8" />
        </svg>
      );
    }
    if (tabId === "market") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#f59e0b", 0.05)}
          {[60, 90, 70, 120, 100, 145, 110, 165].map((h, i) => (
            <rect key={i} x={50 + i * 48} y={260 - h} width="32" height={h} rx="4" fill="#f59e0b" fillOpacity={0.2 + i * 0.08} />
          ))}
          <polyline points="66,200 114,170 162,190 210,140 258,160 306,115 354,130 402,95" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />
          <circle cx="402" cy="95" r="7" fill="#f59e0b" />
          <rect x="316" y="60" width="105" height="28" rx="6" fill="rgba(245,158,11,0.18)" stroke="#f59e0b" strokeOpacity="0.6" strokeWidth="1" />
          <text x="368" y="78" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700">+18.4% YoY</text>
          <line x1="40" y1="260" x2="440" y2="260" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
          {["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3", "Q4"].map((q, i) => (
            <text key={q + i} x={66 + i * 48} y="278" textAnchor="middle" fill="currentColor" fillOpacity="0.4" fontSize="9">{q}</text>
          ))}
        </svg>
      );
    }
    if (tabId === "financial") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#e87042", 0.05)}
          {[
            { x: 50, y: 80, h: 140, label: "Revenue", color: "#e87042" },
            { x: 120, y: 160, h: 60, label: "Land", color: "#ef4444" },
            { x: 190, y: 200, h: 20, label: "Const.", color: "#ef4444" },
            { x: 260, y: 180, h: 40, label: "Finance", color: "#ef4444" },
            { x: 330, y: 120, h: 100, label: "GP", color: "#43a09b" },
            { x: 400, y: 140, h: 80, label: "IRR", color: "#e87042" },
          ].map(({ x, y, h, label, color }) => (
            <g key={x}>
              <rect x={x} y={y} width="50" height={h} rx="4" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" strokeOpacity="0.6" />
              <text x={x + 25} y={260 + 14} textAnchor="middle" fill="currentColor" fillOpacity="0.5" fontSize="9">{label}</text>
            </g>
          ))}
          <rect x="300" y="35" width="140" height="60" rx="10" fill="rgba(232,112,66,0.15)" stroke="#e87042" strokeWidth="1" />
          <text x="370" y="60" textAnchor="middle" fill="#e87042" fontSize="10" opacity="0.8">Project IRR</text>
          <text x="370" y="82" textAnchor="middle" fill="#e87042" fontSize="22" fontWeight="800">21.4%</text>
          <line x1="40" y1="260" x2="460" y2="260" stroke="currentColor" strokeOpacity="0.1" />
        </svg>
      );
    }
    if (tabId === "portfolio") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {[
            { x: 30, label: "Skyview Res.", status: "On Track", pct: 72, color: "#43a09b" },
            { x: 190, label: "Meridian Comm.", status: "Delayed", pct: 41, color: "#f59e0b" },
            { x: 350, label: "Harbor Gate", status: "Completed", pct: 100, color: "#a78bfa" },
          ].map(({ x, label, status, pct, color }) => (
            <g key={x}>
              <rect x={x} y="40" width="135" height="215" rx="12" fill="rgba(255,255,255,0.035)" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
              <text x={x + 67} y="68" textAnchor="middle" fill="white" fillOpacity="0.85" fontSize="11" fontWeight="700">{label}</text>
              <text x={x + 67} y="86" textAnchor="middle" fill={color} fontSize="9">{status}</text>
              <rect x={x + 25} y="105" width="85" height="10" rx="5" fill="rgba(255,255,255,0.05)" />
              <rect x={x + 25} y="105" width={(85 * pct) / 100} height="10" rx="5" fill={color} />
              <text x={x + 67} y="134" textAnchor="middle" fill="white" fillOpacity="0.6" fontSize="9">{pct}% complete</text>
              <text x={x + 67} y="185" textAnchor="middle" fill={color} fontSize="17" fontWeight="800">IRR {pct === 100 ? "19.2%" : pct > 60 ? "18.7%" : "16.1%"}</text>
            </g>
          ))}
        </svg>
      );
    }
    // regulatory default
    return (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {[
          { label: "Zoning Classification", done: true },
          { label: "FSI / FAR Calculation", done: true },
          { label: "Environmental Clearance", done: true },
          { label: "Building Plan Approval", done: false },
          { label: "Occupation Certificate", done: false },
        ].map(({ label, done }, i) => (
          <g key={i}>
            <rect x="70" y="35 + i * 44" width="240" height="34" rx="7" fill={done ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.03)"} stroke={done ? "#34d399" : "rgba(255,255,255,0.08)"} strokeWidth="1" />
            <circle cx="92" cy={52 + i * 44} r="8" fill={done ? "#34d399" : "rgba(255,255,255,0.05)"} stroke={done ? "#34d399" : "rgba(255,255,255,0.2)"} strokeWidth="1.5" />
            {done && <text x="92" y={56 + i * 44} textAnchor="middle" fill="#08121c" fontSize="9" fontWeight="800">✓</text>}
            <text x="110" y={56 + i * 44} fill="white" fillOpacity={done ? 0.9 : 0.4} fontSize="11">{label}</text>
          </g>
        ))}
        <rect x="330" y="90" width="130" height="90" rx="12" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1" />
        <text x="395" y="125" textAnchor="middle" fill="#34d399" fontSize="10" opacity="0.8">Est. Approval</text>
        <text x="395" y="152" textAnchor="middle" fill="#34d399" fontSize="20" fontWeight="800">8-11 Mos</text>
      </svg>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 2. BANK ILLUSTRATIONS
  // ═══════════════════════════════════════════════════════════════
  if (personaId === "bank") {
    if (tabId === "avm") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#e87042", 0.06)}
          {/* Confidence interval area */}
          <polygon points="60,220 140,180 240,130 340,110 430,70 430,130 340,160 240,180 140,210 60,240" fill="#e87042" fillOpacity="0.12" />
          {/* Median Valuation line */}
          <polyline points="60,230 140,195 240,155 340,135 430,100" fill="none" stroke="#e87042" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          {/* Scatter Comps */}
          {[
            { x: 120, y: 190 }, { x: 180, y: 170 }, { x: 220, y: 160 }, { x: 280, y: 140 },
            { x: 320, y: 130 }, { x: 380, y: 110 }, { x: 410, y: 95 }
          ].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#f36b2e" stroke="#fff" strokeWidth="1" />
          ))}
          {/* Main valuation card */}
          <rect x="70" y="45" width="165" height="75" rx="10" fill="rgba(8,18,28,0.9)" stroke="#e87042" strokeWidth="1.2" />
          <text x="85" y="68" fill="#e87042" fontSize="9" letterSpacing="1" fontWeight="700">VALUATION MODEL</text>
          <text x="85" y="94" fill="#ffffff" fontSize="22" fontWeight="800">₹8.45 Cr</text>
          <text x="85" y="110" fill="#34d399" fontSize="10" fontWeight="600">✓ 99.4% Confidence</text>

          {/* Sub-registrar Verified badge */}
          <rect x="290" y="45" width="140" height="42" rx="8" fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth="1" />
          <text x="360" y="65" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">SUB-REGISTRAR</text>
          <text x="360" y="78" textAnchor="middle" fill="white" fillOpacity="0.8" fontSize="9">Registry Verified</text>
        </svg>
      );
    }
    if (tabId === "risk") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#ef4444", 0.05)}
          {/* Risk Gauge arc */}
          <path d="M 120 220 A 120 120 0 0 1 360 220" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="18" strokeLinecap="round" />
          <path d="M 120 220 A 120 120 0 0 1 270 108" fill="none" stroke="url(#riskGradient)" strokeWidth="18" strokeLinecap="round" />
          <defs>
            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="60%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          {/* Center Hub */}
          <circle cx="240" cy="220" r="16" fill="#08121c" stroke="#ef4444" strokeWidth="3" />
          <line x1="240" y1="220" x2="210" y2="135" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="240" cy="220" r="6" fill="#ef4444" />
          {/* Score cards */}
          <rect x="40" y="40" width="110" height="60" rx="8" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1" />
          <text x="95" y="65" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">RISK GRADE</text>
          <text x="95" y="88" textAnchor="middle" fill="white" fontSize="20" fontWeight="800">AA</text>

          <rect x="330" y="40" width="110" height="60" rx="8" fill="rgba(232,112,66,0.12)" stroke="#e87042" strokeWidth="1" />
          <text x="385" y="65" textAnchor="middle" fill="#e87042" fontSize="10" fontWeight="700">CURRENT LTV</text>
          <text x="385" y="88" textAnchor="middle" fill="white" fontSize="20" fontWeight="800">54.2%</text>

          <text x="240" y="260" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="700">Low Downside Volatility Risk</text>
        </svg>
      );
    }
    if (tabId === "portfolio_health") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#f59e0b", 0.05)}
          {/* Donut chart for distribution */}
          <circle cx="150" cy="150" r="70" fill="none" stroke="#43a09b" strokeWidth="24" strokeDasharray="260 440" strokeDashoffset="0" />
          <circle cx="150" cy="150" r="70" fill="none" stroke="#f59e0b" strokeWidth="24" strokeDasharray="120 440" strokeDashoffset="-260" />
          <circle cx="150" cy="150" r="70" fill="none" stroke="#e87042" strokeWidth="24" strokeDasharray="60 440" strokeDashoffset="-380" />
          <text x="150" y="145" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">₹420Cr</text>
          <text x="150" y="162" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">Total Book</text>

          {/* Breakdown cards on the right */}
          <g transform="translate(260, 60)">
            <rect x="0" y="0" width="180" height="46" rx="8" fill="rgba(67,160,155,0.12)" stroke="#43a09b" strokeWidth="1" />
            <circle cx="20" cy="23" r="6" fill="#43a09b" />
            <text x="36" y="22" fill="white" fontSize="11" fontWeight="700">Residential (60%)</text>
            <text x="36" y="36" fill="#43a09b" fontSize="9">Avg LTV 51.2% • Healthy</text>
          </g>
          <g transform="translate(260, 118)">
            <rect x="0" y="0" width="180" height="46" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="20" cy="23" r="6" fill="#f59e0b" />
            <text x="36" y="22" fill="white" fontSize="11" fontWeight="700">Commercial (28%)</text>
            <text x="36" y="36" fill="#f59e0b" fontSize="9">Avg LTV 58.4% • Monitored</text>
          </g>
          <g transform="translate(260, 176)">
            <rect x="0" y="0" width="180" height="46" rx="8" fill="rgba(232,112,66,0.12)" stroke="#e87042" strokeWidth="1" />
            <circle cx="20" cy="23" r="6" fill="#e87042" />
            <text x="36" y="22" fill="white" fontSize="11" fontWeight="700">Mixed-Use (12%)</text>
            <text x="36" y="36" fill="#e87042" fontSize="9">Avg LTV 62.0% • Performing</text>
          </g>
        </svg>
      );
    }
    if (tabId === "underwriting") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#43a09b", 0.05)}
          {/* Credit Memo card */}
          <rect x="60" y="40" width="220" height="220" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <rect x="80" y="60" width="100" height="12" rx="3" fill="#43a09b" fillOpacity="0.4" />
          <line x1="80" y1="90" x2="260" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <text x="80" y="115" fill="white" fontSize="11" fontWeight="600">Debt Service Coverage</text>
          <text x="80" y="140" fill="#43a09b" fontSize="24" fontWeight="800">1.85x DSCR</text>
          <text x="80" y="165" fill="rgba(255,255,255,0.6)" fontSize="10">Policy Minimum: 1.30x</text>

          {/* Checklist on credit memo */}
          <rect x="80" y="185" width="180" height="24" rx="4" fill="rgba(52,211,153,0.1)" />
          <text x="90" y="201" fill="#34d399" fontSize="10" fontWeight="700">✓ Credit Committee Approved</text>

          {/* Stress test box */}
          <rect x="305" y="60" width="135" height="85" rx="8" fill="rgba(67,160,155,0.12)" stroke="#43a09b" strokeWidth="1" />
          <text x="372" y="86" textAnchor="middle" fill="#43a09b" fontSize="10" fontWeight="700">STRESS DSCR</text>
          <text x="372" y="114" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">1.42x</text>
          <text x="372" y="132" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">@ +250bps Rate Spike</text>

          {/* Underwriting speed badge */}
          <rect x="305" y="160" width="135" height="85" rx="8" fill="rgba(232,112,66,0.12)" stroke="#e87042" strokeWidth="1" />
          <text x="372" y="186" textAnchor="middle" fill="#e87042" fontSize="10" fontWeight="700">TIME TO MEMO</text>
          <text x="372" y="214" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">4 Mins</text>
          <text x="372" y="232" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">vs 4 Days Manual</text>
        </svg>
      );
    }
    if (tabId === "comps") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#38bdf8", 0.06)}
          {/* Registry verification cluster */}
          <circle cx="200" cy="150" r="90" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="50" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Verified dots */}
          {[
            { x: 180, y: 130, val: "₹14.2k" },
            { x: 220, y: 140, val: "₹14.8k" },
            { x: 195, y: 170, val: "₹14.5k" },
            { x: 150, y: 160, val: "₹13.9k" },
            { x: 240, y: 120, val: "₹15.1k" },
          ].map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="6" fill="#38bdf8" />
              <text x={pt.x} y={pt.y - 10} textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="700">{pt.val}</text>
            </g>
          ))}
          {/* Stamp Duty Seal */}
          <g transform="translate(330, 80)">
            <rect x="0" y="0" width="115" height="135" rx="10" fill="rgba(8,18,28,0.92)" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="57" cy="45" r="22" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="1.5" />
            <text x="57" y="49" textAnchor="middle" fill="#34d399" fontSize="16" fontWeight="800">✓</text>
            <text x="57" y="85" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">SUB-REGISTRAR</text>
            <text x="57" y="100" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="600">STAMP VERIFIED</text>
            <text x="57" y="118" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8">Doc #4920/2025</text>
          </g>
        </svg>
      );
    }
    // Compliance default
    return (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {[
          { label: "Basel III RWA Weighting Engine", stat: "100% Parsed", done: true },
          { label: "Stage 1/2/3 ECL Loss Provisions", stat: "₹2.4M ECL", done: true },
          { label: "Central Bank Audit Trail Ledger", stat: "Immutable", done: true },
          { label: "Statutory Reporting XML Generator", stat: "Ready", done: true },
        ].map((item, i) => (
          <g key={i}>
            <rect x="50" y={40 + i * 54} width="380" height="42" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeOpacity="0.4" strokeWidth="1" />
            <circle cx="75" cy={61 + i * 54} r="10" fill="#34d399" />
            <text x="75" y={65 + i * 54} textAnchor="middle" fill="#08121c" fontSize="10" fontWeight="800">✓</text>
            <text x="96" y={66 + i * 54} fill="white" fontSize="12" fontWeight="600">{item.label}</text>
            <rect x="330" y={48 + i * 54} width="88" height="26" rx="6" fill="rgba(255,255,255,0.08)" />
            <text x="374" y={65 + i * 54} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">{item.stat}</text>
          </g>
        ))}
      </svg>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. CONSULTANTS ILLUSTRATIONS
  // ═══════════════════════════════════════════════════════════════
  if (personaId === "consultants") {
    if (tabId === "propgpt") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#38bdf8", 0.05)}
          {/* AI Chat / Monograph visual */}
          <rect x="50" y="35" width="220" height="230" rx="10" fill="rgba(8,18,28,0.9)" stroke="#38bdf8" strokeWidth="1" />
          <rect x="68" y="52" width="90" height="18" rx="4" fill="#38bdf8" fillOpacity="0.2" />
          <text x="76" y="65" fill="#38bdf8" fontSize="9" fontWeight="700">PROPGPT ADVISORY</text>
          {/* Chat bubbles */}
          <rect x="68" y="82" width="160" height="34" rx="6" fill="rgba(255,255,255,0.05)" />
          <text x="78" y="103" fill="rgba(255,255,255,0.8)" fontSize="10">"Draft 40-page advisory note for CBD site"</text>
          <rect x="88" y="128" width="166" height="60" rx="6" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeOpacity="0.4" />
          <text x="98" y="148" fill="#38bdf8" fontSize="10" fontWeight="700">✓ Monograph Generated (42 pgs)</text>
          <text x="98" y="165" fill="rgba(255,255,255,0.7)" fontSize="9">Absorption IRR: 23.4% • 18 Comps</text>
          <text x="98" y="179" fill="#34d399" fontSize="8">Citations: Registry Doc #1284</text>

          {/* Node graph on the right */}
          <circle cx="370" cy="90" r="28" fill="rgba(56,189,248,0.15)" stroke="#38bdf8" strokeWidth="2" />
          <text x="370" y="94" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="800">LLM AI</text>
          <circle cx="310" cy="180" r="22" fill="rgba(67,160,155,0.15)" stroke="#43a09b" strokeWidth="1.5" />
          <text x="310" y="184" textAnchor="middle" fill="#43a09b" fontSize="9" fontWeight="700">GIS</text>
          <circle cx="430" cy="180" r="22" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="430" y="184" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">Comps</text>

          <line x1="352" y1="112" x2="322" y2="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="388" y1="112" x2="418" y2="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    }
    if (tabId === "spatial") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#43a09b", 0.06)}
          {/* Isochrone rings */}
          <ellipse cx="220" cy="150" rx="140" ry="90" fill="#43a09b" fillOpacity="0.05" stroke="#43a09b" strokeWidth="1" strokeDasharray="4 4" />
          <ellipse cx="220" cy="150" rx="95" ry="60" fill="#43a09b" fillOpacity="0.1" stroke="#43a09b" strokeWidth="1.5" />
          <ellipse cx="220" cy="150" rx="50" ry="32" fill="#43a09b" fillOpacity="0.2" stroke="#43a09b" strokeWidth="2" />
          <circle cx="220" cy="150" r="8" fill="#43a09b" />

          {/* Time markers */}
          <text x="275" y="154" fill="#43a09b" fontSize="9" fontWeight="700">5 MIN</text>
          <text x="320" y="154" fill="#43a09b" fontSize="9" fontWeight="700">10 MIN</text>
          <text x="365" y="154" fill="#43a09b" fontSize="9" fontWeight="700">15 MIN</text>

          {/* Catchment score badge */}
          <rect x="50" y="50" width="130" height="70" rx="8" fill="rgba(8,18,28,0.9)" stroke="#43a09b" strokeWidth="1" />
          <text x="115" y="75" textAnchor="middle" fill="#43a09b" fontSize="9" fontWeight="700">TRANSIT SCORE</text>
          <text x="115" y="102" textAnchor="middle" fill="white" fontSize="22" fontWeight="800">92 / 100</text>
        </svg>
      );
    }
    if (tabId === "structuring") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#f59e0b", 0.05)}
          {/* JDA Split Visualization */}
          <rect x="60" y="70" width="360" height="40" rx="8" fill="rgba(255,255,255,0.05)" />
          <rect x="60" y="70" width="150" height="40" rx="8" fill="#f59e0b" fillOpacity="0.8" />
          <rect x="210" y="70" width="210" height="40" rx="8" fill="#43a09b" fillOpacity="0.8" />
          <text x="135" y="95" textAnchor="middle" fill="#08121c" fontSize="12" fontWeight="800">Landowner 42%</text>
          <text x="315" y="95" textAnchor="middle" fill="#08121c" fontSize="12" fontWeight="800">Developer 58%</text>

          {/* Scenario comparison cards */}
          <g transform="translate(60, 140)">
            <rect x="0" y="0" width="165" height="100" rx="10" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" strokeWidth="1" />
            <text x="20" y="26" fill="#f59e0b" fontSize="11" fontWeight="700">Option A: JDA Revenue</text>
            <text x="20" y="54" fill="white" fontSize="20" fontWeight="800">₹88.4 Cr</text>
            <text x="20" y="75" fill="#34d399" fontSize="10">IRR: 24.2% • Tax Efficient</text>
          </g>
          <g transform="translate(255, 140)">
            <rect x="0" y="0" width="165" height="100" rx="10" fill="rgba(67,160,155,0.12)" stroke="#43a09b" strokeWidth="1" />
            <text x="20" y="26" fill="#43a09b" fontSize="11" fontWeight="700">Option B: Outright Sale</text>
            <text x="20" y="54" fill="white" fontSize="20" fontWeight="800">₹62.0 Cr</text>
            <text x="20" y="75" fill="rgba(255,255,255,0.6)" fontSize="10">Immediate Liquidity</text>
          </g>
        </svg>
      );
    }
    if (tabId === "benchmarking") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#e87042", 0.05)}
          {/* Regression curve & scatter */}
          <polyline points="70,220 150,180 240,140 330,110 420,70" fill="none" stroke="#e87042" strokeWidth="2.5" />
          {[
            { x: 100, y: 200 }, { x: 130, y: 175 }, { x: 190, y: 165 }, { x: 220, y: 130 },
            { x: 270, y: 135 }, { x: 310, y: 105 }, { x: 360, y: 95 }, { x: 400, y: 75 }
          ].map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#e87042" fillOpacity="0.7" />
          ))}
          <rect x="60" y="45" width="160" height="55" rx="8" fill="rgba(8,18,28,0.9)" stroke="#e87042" strokeWidth="1" />
          <text x="75" y="68" fill="#e87042" fontSize="9" fontWeight="700">HEDONIC REGRESSION</text>
          <text x="75" y="88" fill="white" fontSize="14" fontWeight="800">R² = 0.942 Model Fit</text>
        </svg>
      );
    }
    if (tabId === "decks") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {/* Storyboard slides */}
          {[
            { x: 40, label: "01. Executive IM", color: "#38bdf8" },
            { x: 180, label: "02. Financial Stack", color: "#a78bfa" },
            { x: 320, label: "03. Spatial Comps", color: "#43a09b" },
          ].map((slide, i) => (
            <g key={i}>
              <rect x={slide.x} y="60" width="125" height="175" rx="8" fill="rgba(255,255,255,0.04)" stroke={slide.color} strokeWidth="1.2" />
              <rect x={slide.x + 12} y="75" width="60" height="8" rx="2" fill={slide.color} fillOpacity="0.6" />
              <rect x={slide.x + 12} y="95" width="100" height="50" rx="4" fill="rgba(255,255,255,0.05)" />
              <text x={slide.x + 62} y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">{slide.label}</text>
              <text x={slide.x + 62} y="210" textAnchor="middle" fill={slide.color} fontSize="9">Live Sync Ready</text>
            </g>
          ))}
        </svg>
      );
    }
    // market advisory default
    return (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {renderGrid("#34d399", 0.05)}
        {/* Absorption vs Launch bars */}
        {[
          { q: "Q1", launch: 80, abs: 95 },
          { q: "Q2", launch: 110, abs: 130 },
          { q: "Q3", launch: 90, abs: 140 },
          { q: "Q4", launch: 70, abs: 160 },
        ].map((item, i) => (
          <g key={i} transform={`translate(${70 + i * 95}, 0)`}>
            <rect x="0" y={240 - item.launch} width="24" height={item.launch} rx="4" fill="#38bdf8" fillOpacity="0.5" />
            <rect x="28" y={240 - item.abs} width="24" height={item.abs} rx="4" fill="#34d399" fillOpacity="0.8" />
            <text x="26" y="260" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="10">{item.q}</text>
          </g>
        ))}
        <rect x="300" y="45" width="145" height="60" rx="8" fill="rgba(52,211,153,0.12)" stroke="#34d399" strokeWidth="1" />
        <text x="372" y="68" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">INVENTORY OVERHANG</text>
        <text x="372" y="92" textAnchor="middle" fill="white" fontSize="20" fontWeight="800">11.2 Months</text>
      </svg>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. INVESTORS ILLUSTRATIONS
  // ═══════════════════════════════════════════════════════════════
  if (personaId === "investors") {
    if (tabId === "sigmatrack") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#f59e0b", 0.06)}
          {/* Live HUD box */}
          <rect x="50" y="40" width="380" height="210" rx="12" fill="rgba(8,18,28,0.9)" stroke="#f59e0b" strokeWidth="1.2" />
          <circle cx="75" cy="65" r="5" fill="#34d399" />
          <text x="88" y="69" fill="#34d399" fontSize="10" fontWeight="700">SIGMATRACK LIVE SURVEILLANCE</text>

          {/* Metric Tiles inside HUD */}
          <g transform="translate(70, 90)">
            <rect x="0" y="0" width="100" height="65" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" strokeOpacity="0.4" strokeWidth="1" />
            <text x="14" y="22" fill="#f59e0b" fontSize="9" fontWeight="700">LIVE NOI</text>
            <text x="14" y="48" fill="white" fontSize="18" fontWeight="800">₹4.8 Cr</text>
          </g>
          <g transform="translate(190, 90)">
            <rect x="0" y="0" width="100" height="65" rx="8" fill="rgba(67,160,155,0.12)" stroke="#43a09b" strokeOpacity="0.4" strokeWidth="1" />
            <text x="14" y="22" fill="#43a09b" fontSize="9" fontWeight="700">NET YIELD</text>
            <text x="14" y="48" fill="white" fontSize="18" fontWeight="800">8.94%</text>
          </g>
          <g transform="translate(310, 90)">
            <rect x="0" y="0" width="100" height="65" rx="8" fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1" />
            <text x="14" y="22" fill="#38bdf8" fontSize="9" fontWeight="700">OCCUPANCY</text>
            <text x="14" y="48" fill="white" fontSize="18" fontWeight="800">96.2%</text>
          </g>

          {/* Bottom sparkline */}
          <polyline points="70,210 130,195 200,200 270,180 340,170 410,165" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="70" y="235" fill="rgba(255,255,255,0.5)" fontSize="9">Mark-to-Market Valuation Trend: +14.2% YTD</text>
        </svg>
      );
    }
    if (tabId === "acquisitions") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#43a09b", 0.05)}
          {/* Acquisition Underwriting Funnel */}
          <polygon points="60,60 420,60 360,110 120,110" fill="#43a09b" fillOpacity="0.3" stroke="#43a09b" strokeWidth="1" />
          <text x="240" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">124 Deals Screened</text>

          <polygon points="120,115 360,115 300,165 180,165" fill="#43a09b" fillOpacity="0.5" stroke="#43a09b" strokeWidth="1" />
          <text x="240" y="145" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">18 IC Shortlisted</text>

          <polygon points="180,170 300,170 270,220 210,220" fill="#43a09b" fillOpacity="0.8" stroke="#43a09b" strokeWidth="1" />
          <text x="240" y="200" textAnchor="middle" fill="#08121c" fontSize="12" fontWeight="800">3 Underwritten</text>

          {/* Hurdle card */}
          <rect x="330" y="180" width="120" height="60" rx="8" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" strokeWidth="1" />
          <text x="390" y="202" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">TARGET MOIC</text>
          <text x="390" y="226" textAnchor="middle" fill="white" fontSize="20" fontWeight="800">2.6x</text>
        </svg>
      );
    }
    if (tabId === "yield") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#38bdf8", 0.05)}
          {/* Yield Sensitivity Heatmap Matrix */}
          <text x="60" y="60" fill="white" fontSize="11" fontWeight="700">Cap Rate Sensitivity Matrix (Exit Yield vs IRR)</text>
          {[
            ["7.00%", "24.2%", "22.8%", "21.4%"],
            ["7.50%", "22.1%", "20.6%", "19.2%"],
            ["8.00%", "19.8%", "18.4%", "17.1%"],
          ].map((row, rIdx) => (
            <g key={rIdx} transform={`translate(60, ${85 + rIdx * 45})`}>
              <text x="0" y="26" fill="rgba(255,255,255,0.6)" fontSize="11">{row[0]}</text>
              {row.slice(1).map((val, cIdx) => (
                <g key={cIdx} transform={`translate(${60 + cIdx * 95}, 0)`}>
                  <rect x="0" y="0" width="85" height="36" rx="6" fill={rIdx === 0 ? "rgba(52,211,153,0.2)" : rIdx === 1 ? "rgba(245,158,11,0.18)" : "rgba(232,112,66,0.2)"} stroke="rgba(255,255,255,0.1)" />
                  <text x="42" y="23" textAnchor="middle" fill="white" fontSize="12" fontWeight="700">{val}</text>
                </g>
              ))}
            </g>
          ))}
          <text x="160" y="245" fill="#34d399" fontSize="10" fontWeight="600">✓ Hurdle Met Across 92% of Monte Carlo Scenarios</text>
        </svg>
      );
    }
    if (tabId === "portfolio_alpha") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#a78bfa", 0.05)}
          {/* Multi-fund TVPI Bar Chart */}
          <g transform="translate(60, 60)">
            <rect x="0" y="0" width="160" height="180" rx="10" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" strokeWidth="1" />
            <text x="80" y="30" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700">FUND I (2022)</text>
            <text x="80" y="65" textAnchor="middle" fill="white" fontSize="24" fontWeight="800">2.4x TVPI</text>
            <text x="80" y="90" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">DPI: 1.1x Realized</text>
            <rect x="25" y="115" width="110" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
            <rect x="25" y="115" width="85" height="8" rx="4" fill="#a78bfa" />
            <text x="80" y="150" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Net IRR: 26.2%</text>
          </g>
          <g transform="translate(260, 60)">
            <rect x="0" y="0" width="160" height="180" rx="10" fill="rgba(67,160,155,0.1)" stroke="#43a09b" strokeWidth="1" />
            <text x="80" y="30" textAnchor="middle" fill="#43a09b" fontSize="11" fontWeight="700">FUND II (2024)</text>
            <text x="80" y="65" textAnchor="middle" fill="white" fontSize="24" fontWeight="800">1.9x TVPI</text>
            <text x="80" y="90" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">DPI: 0.4x Realized</text>
            <rect x="25" y="115" width="110" height="8" rx="4" fill="rgba(255,255,255,0.1)" />
            <rect x="25" y="115" width="60" height="8" rx="4" fill="#43a09b" />
            <text x="80" y="150" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Net IRR: 22.8%</text>
          </g>
        </svg>
      );
    }
    if (tabId === "pipeline") {
      return (
        <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          {renderGrid("#e87042", 0.06)}
          {/* Radar circle with blips */}
          <circle cx="200" cy="150" r="100" fill="none" stroke="#e87042" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="150" r="60" fill="none" stroke="#e87042" strokeWidth="1.5" />
          <line x1="200" y1="150" x2="270" y2="80" stroke="#e87042" strokeWidth="2" strokeLinecap="round" />

          {/* Deal blips */}
          <circle cx="250" cy="110" r="7" fill="#ef4444" />
          <rect x="265" y="98" width="85" height="22" rx="4" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1" />
          <text x="307" y="113" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="700">-18% Off-Market</text>

          <circle cx="160" cy="190" r="6" fill="#f59e0b" />
          <rect x="70" y="180" width="80" height="22" rx="4" fill="rgba(245,158,11,0.2)" stroke="#f59e0b" strokeWidth="1" />
          <text x="110" y="195" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">Distressed Land</text>

          <rect x="320" y="170" width="130" height="70" rx="8" fill="rgba(8,18,28,0.9)" stroke="#e87042" strokeWidth="1" />
          <text x="385" y="195" textAnchor="middle" fill="#e87042" fontSize="9" fontWeight="700">DEAL SOURCING</text>
          <text x="385" y="220" textAnchor="middle" fill="white" fontSize="18" fontWeight="800">42 Pipelines</text>
        </svg>
      );
    }
    // esg default
    return (
      <svg viewBox="0 0 480 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {renderGrid("#34d399", 0.05)}
        {/* ESG Health Meter */}
        <circle cx="150" cy="150" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="#34d399" strokeWidth="16" strokeDasharray="380 440" />
        <text x="150" y="145" textAnchor="middle" fill="white" fontSize="26" fontWeight="800">88</text>
        <text x="150" y="168" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">LEED PLATINUM</text>

        <g transform="translate(260, 60)">
          <rect x="0" y="0" width="180" height="50" rx="8" fill="rgba(52,211,153,0.1)" stroke="#34d399" strokeWidth="1" />
          <text x="16" y="24" fill="#34d399" fontSize="10" fontWeight="700">RENT PREMIUM</text>
          <text x="16" y="42" fill="white" fontSize="14" fontWeight="800">+12.4% vs Non-Green</text>
        </g>
        <g transform="translate(260, 125)">
          <rect x="0" y="0" width="180" height="50" rx="8" fill="rgba(56,189,248,0.1)" stroke="#38bdf8" strokeWidth="1" />
          <text x="16" y="24" fill="#38bdf8" fontSize="10" fontWeight="700">ENERGY SAVINGS</text>
          <text x="16" y="42" fill="white" fontSize="14" fontWeight="800">-28% OPEX Reduction</text>
        </g>
        <g transform="translate(260, 190)">
          <rect x="0" y="0" width="180" height="50" rx="8" fill="rgba(245,158,11,0.1)" stroke="#f59e0b" strokeWidth="1" />
          <text x="16" y="24" fill="#f59e0b" fontSize="10" fontWeight="700">SFDR / GRESB</text>
          <text x="16" y="42" fill="white" fontSize="14" fontWeight="800">Article 8 Ready</text>
        </g>
      </svg>
    );
  }

  // Fallback
  return null;
}
