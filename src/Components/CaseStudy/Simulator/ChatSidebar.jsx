import React, { useState, useRef, useEffect } from "react";
import "./ChatSidebar.css";

function ChatSidebar({
  isOpen,
  onToggle,
  participants = [],
  menteeFirstname,
  onSendMessage,
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".chat-toggle-btn")
      ) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  // Add/remove body class to push content
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("chat-sidebar-open");
    } else {
      document.body.classList.remove("chat-sidebar-open");
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("chat-sidebar-open");
    };
  }, [isOpen]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: menteeFirstname || "You",
        text: message.trim(),
        timestamp: new Date(),
        isOwnMessage: true,
      };

      setChatMessages((prev) => [...prev, newMessage]);
      setMessage("");

      // Call parent handler if provided
      if (onSendMessage) {
        onSendMessage(newMessage);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mock participants data if none provided
  const defaultParticipants = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Faculty", isOnline: true },
    { id: 2, name: "Avega AI", role: "AI Assistant", isOnline: true },
    { id: 3, name: menteeFirstname || "You", role: "Student", isOnline: true },
  ];

  const displayParticipants =
    participants.length > 0 ? participants : defaultParticipants;

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle-btn ${isOpen ? "open" : ""}`}
        onClick={onToggle}
        aria-label="Toggle chat sidebar"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {!isOpen && chatMessages.length > 0 && (
          <span className="chat-notification-badge">{chatMessages.length}</span>
        )}
      </button>{" "}
      {/* Chat Sidebar */}
      <div ref={sidebarRef} className={`chat-sidebar ${isOpen ? "open" : ""}`}>
        <div className="chat-sidebar-header">
          <div className="chat-header-content">
            <h3>Simulation Chat</h3>
            <span className="participants-count">
              {displayParticipants.filter((p) => p.isOnline).length} online
            </span>
          </div>
          <button
            className="chat-close-btn"
            onClick={onToggle}
            aria-label="Close chat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Participants Section */}
        {/* <div className="chat-participants">
          <h4>Participants</h4>
          <div className="participants-list">
            {displayParticipants.map((participant) => (
              <div key={participant.id} className="participant-item">
                <div className="participant-avatar">
                  <div className={`avatar-circle ${participant.role.toLowerCase()}`}>
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  {participant.isOnline && <div className="online-indicator"></div>}
                </div>
                <div className="participant-info">
                  <span className="participant-name">{participant.name}</span>
                  <span className="participant-role">{participant.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Chat Messages Section */}
        <div className="chat-messages-section">
          <h4>Discussion</h4>
          <div className="chat-messages-container">
            {chatMessages.length === 0 ? (
              <div className="no-messages">
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-message ${
                    msg.isOwnMessage ? "own-message" : "other-message"
                  }`}
                >
                  <div className="message-content">
                    <div className="message-header">
                      <span className="message-sender">{msg.sender}</span>
                      <span className="message-time">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div className="chat-input-section">
          <div className="chat-input-container">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="chat-send-btn"
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 2L9 11M18 2l-7 18-2-8-8-2L18 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>{" "}
        </div>
      </div>
      {/* Overlay for mobile - only shows on mobile devices */}
      {isOpen && (
        <div className="chat-sidebar-overlay" onClick={onToggle}></div>
      )}
    </>
  );
}

export default ChatSidebar;
