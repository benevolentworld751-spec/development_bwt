import { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const WHATSAPP_NUMBER = "9871047857";
const MAP_LINK =
  "https://maps.google.com/?q=Benevolent+World+Travel+Dwarka+Delhi";

const AskAIModal = ({
  isOpen,
  onClose,
  onAsk,
  messages,
  loading,
}) => {
  const [prompt, setPrompt] = useState("");
  const replyBoxRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    if (replyBoxRef.current) {
      replyBoxRef.current.scrollTop = replyBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Auto-open WhatsApp (first visit only)
  useEffect(() => {
    const opened = localStorage.getItem("whatsappOpened");
    if (isOpen && !opened) {
      setTimeout(() => {
        window.open(`https://wa.me/91${WHATSAPP_NUMBER}`, "_blank");
        localStorage.setItem("whatsappOpened", "true");
      }, 3000);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    onAsk(prompt);
    setPrompt("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl w-[90%] max-w-lg border">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🤖 Travel Assistant</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Chat Area */}
        <div
          ref={replyBoxRef}
          className="mb-3 p-4 h-64 overflow-y-auto rounded-lg bg-zinc-100 dark:bg-zinc-800"
        >
          {messages.length === 0 && !loading && (
            <div className="text-center text-zinc-400">
              👋 Ask me about visas, packages, flights or bookings.
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-3 py-2 rounded-lg text-sm max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white"
                }`}
              >
                {msg.text}

                {/* CONTACT ACTIONS */}
                {msg.action?.type === "contact" && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <a
                      href={`https://wa.me/91${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs"
                    >
                      <FaWhatsapp /> WhatsApp
                    </a>

                    <a
                      href={`tel:+91${WHATSAPP_NUMBER}`}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-full text-xs"
                    >
                      <FaPhoneAlt /> Call
                    </a>

                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-full text-xs"
                    >
                      <FaMapMarkerAlt /> Map
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-sm text-blue-500 animate-pulse">
              🤖 Thinking...
            </div>
          )}
        </div>

        {/* Quick Suggestion Buttons */}
        <div className="flex gap-2 mb-2 flex-wrap">
          {["Visa", "Packages", "Flights", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => onAsk(item)}
              className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Input */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="w-full h-20 p-3 rounded-lg border resize-none"
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSubmit} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskAIModal;
