import { useEffect, useRef, useState } from "react";
import {
  FiMessageSquare,
  FiSend,
  FiX,
} from "react-icons/fi";

const INITIAL_MESSAGES = [
  {
    sender: "ai",
    text:
      "Hello! I am SigmaValue Assistant. Ask me about Simulator 361, Automated Valuation (AVM), SIGMATRACK, or SigmaValue OS.",
  },
];

export function AskBar({ show }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!show) {
      setIsOpen(false);
    }
  }, [show]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, isOpen]);

  const handleSend = () => {
    const userQ = query.trim();

    if (!userQ) {
      return;
    }

    const qLower = userQ.toLowerCase();

    let reply =
      "Explore our platform modules using the top menu or navigation drawer, or jump straight to SigmaValue OS at os.sigmavalue.ai.";

    if (
      qLower.includes("simulator") ||
      qLower.includes("irr") ||
      qLower.includes("feasibility")
    ) {
      reply =
        "Simulator 361 is our AI feasibility agent that forecasts IRRs, tests scenario unit mixes, and provides risk metrics in under 3 minutes.";
    } else if (
      qLower.includes("valuation") ||
      qLower.includes("avm") ||
      qLower.includes("price")
    ) {
      reply =
        "SigmaValue AVM delivers institutional-grade automated valuations with 98.4% precision calibrated to local micro-market transaction comps.";
    } else if (
      qLower.includes("os") ||
      qLower.includes("operating system")
    ) {
      reply =
        "SigmaValue OS connects valuation, pipeline management, and risk scoring in one autonomous workspace at os.sigmavalue.ai.";
    } else if (
      qLower.includes("demo") ||
      qLower.includes("contact")
    ) {
      reply =
        "You can schedule a personalized demo using the Request Demo button in the header or navigation drawer.";
    }

    setQuery("");

    setMessages((current) => [
      ...current,
      {
        sender: "user",
        text: userQ,
      },
      {
        sender: "ai",
        text: reply,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSend();
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="ai-assistant-wrapper">
      {!isOpen ? (
        <button
          type="button"
          className="ai-trigger-btn"
          onClick={() => {
            setIsOpen(true);
          }}
          aria-expanded="false"
          aria-controls="sigma-ai-chat"
        >
          <span
            className="pulse-indicator"
            aria-hidden="true"
          />

          <FiMessageSquare
            className="icon"
            aria-hidden="true"
          />

          <span>Ask SigmaValue AI</span>
        </button>
      ) : (
        <section
          id="sigma-ai-chat"
          className="ai-chat-card"
          role="dialog"
          aria-label="SigmaValue AI Assistant"
        >
          <div className="ai-chat-header">
            <div className="header-left">
              <span
                className="ai-status-dot"
                aria-hidden="true"
              />

              <span>
                SigmaValue AI Assistant
              </span>
            </div>

            <button
              type="button"
              className="close-btn"
              onClick={closeAssistant}
              aria-label="Close SigmaValue AI Assistant"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div
            className="ai-chat-body"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}-${message.text.slice(0, 18)}`}
                className={`chat-bubble ${message.sender}`}
              >
                <p>{message.text}</p>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <form
            className="ai-chat-input-bar"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              placeholder="Ask a question..."
              aria-label="Ask SigmaValue AI a question"
              autoComplete="off"
            />

            <button
              type="submit"
              className="send-btn"
              aria-label="Send message"
              disabled={!query.trim()}
            >
              <FiSend aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
