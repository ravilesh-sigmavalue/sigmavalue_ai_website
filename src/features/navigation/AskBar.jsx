import { useState } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";

export function AskBar({ show }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([{ sender: "ai", text: "Hello! I am SigmaValue Assistant. Ask me about Simulator 361, Automated Valuation (AVM), SIGMATRACK, or SigmaValue OS." }]);

  const handleSend = () => {
    if (!query.trim()) return;
    const userQ = query.trim();
    const qLower = userQ.toLowerCase();
    setQuery("");
    let reply = "Explore our platform modules using the top menu or left navigation rail, or jump straight to SigmaValue OS at os.sigmavalue.ai.";
    if (qLower.includes("simulator") || qLower.includes("irr") || qLower.includes("feasibility")) reply = "Simulator 361 is our AI feasibility agent that forecasts IRRs, tests scenario unit mixes, and provides risk metrics in under 3 minutes.";
    else if (qLower.includes("valuation") || qLower.includes("avm") || qLower.includes("price")) reply = "SigmaValue AVM delivers institutional-grade automated valuations with 98.4% precision calibrated to local micro-market transaction comps.";
    else if (qLower.includes("os") || qLower.includes("operating system")) reply = "SigmaValue OS connects valuation, pipeline management, and risk scoring in one autonomous workspace at os.sigmavalue.ai.";
    else if (qLower.includes("demo") || qLower.includes("contact")) reply = "You can schedule a personalized demo via the 'Request Demo' button in the header or the Contact section.";
    setMessages((current) => [...current, { sender: "user", text: userQ }, { sender: "ai", text: reply }]);
  };

  if (!show) return null;
  return (
    <div className="ai-assistant-wrapper">
      {!isOpen ? (
        <button className="ai-trigger-btn" onClick={() => setIsOpen(true)}><div className="pulse-indicator" /><FiMessageSquare className="icon" /><span>Ask SigmaValue AI</span></button>
      ) : (
        <div className="ai-chat-card">
          <div className="ai-chat-header"><div className="header-left"><div className="ai-status-dot" /><span>SigmaValue AI Assistant</span></div><button className="close-btn" onClick={() => setIsOpen(false)}><FiX /></button></div>
          <div className="ai-chat-body">{messages.map((message, index) => <div key={index} className={`chat-bubble ${message.sender}`}><p>{message.text}</p></div>)}</div>
          <div className="ai-chat-input-bar"><input value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === "Enter" && handleSend()} placeholder="Ask a question..." /><button onClick={handleSend} className="send-btn"><FiSend /></button></div>
        </div>
      )}
    </div>
  );
}
