import React, { useState, useEffect, useRef } from "react";
import "./ChatInterface.css";
import AiImage from "./images/AI.png";
import UserImage from "./images/User.png";
// Import internal modules as required

function ChatInterface({ messages, questionType, onAnswer, isAITyping }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, options]);

  useEffect(() => {
    if (questionType === "factBased") {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage && latestMessage.options) {
        setOptions(latestMessage.options);
      }
    }
  }, [messages, questionType]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionClick = (option) => {
    onAnswer(option);
    setOptions([]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    autoResizeTextarea(e.target);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      onAnswer(inputValue.trim());
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "50px";
      }
    }
  };

  const autoResizeTextarea = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div ref={chatContainerRef} className="chat-interface-container">
      <div className="chat-interface-messages">
        <div className="chat-interface-message chat-interface-ai-message">
          <img src={AiImage} alt="AI" className="chat-interface-avatar" />
          <div className="chat-interface-message-text">
            <span>
              <p>Hello and welcome to the A.I Simulator! 🤖</p>
              <p>
                Let&rsquo;s put your knowledge to the test in this interactive
                case study. Ready to dive in and see how you handle the
                challenges ahead? Let&rsquo;s get started!
              </p>
            </span>
          </div>
        </div>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-interface-message ${
              msg.sender === "AI"
                ? "chat-interface-ai-message"
                : "chat-interface-user-message"
            }`}
          >
            {msg.sender === "AI" ? (
              <>
                <img src={AiImage} alt="AI" className="chat-interface-avatar" />
                <div className="chat-interface-message-text">{msg.text}</div>
              </>
            ) : (
              <>
                <div className="chat-interface-message-text">{msg.text}</div>
                <img
                  src={UserImage}
                  alt="User"
                  className="chat-interface-avatar"
                />
              </>
            )}
          </div>
        ))}
        {isAITyping && (
          <div className="chat-interface-message chat-interface-ai-message">
            <img src={AiImage} alt="AI" className="chat-interface-avatar" />
            <div className="chat-interface-message-text">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-interface-input">
        {questionType === "factBased" && options ? (
          <div className="chat-interface-options-container">
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="chat-interface-option-button"
                aria-label={`Option ${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        ) : questionType === "analyzeBased" ? (
          // Update the submit button in ChatInterface.jsx
          <div className="chat-interface-input-container">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your answer here..."
              className="chat-interface-textarea"
              aria-label="Your answer"
              style={{ overflowY: "hidden" }}
              disabled={isAITyping} // Disable textarea while AI is typing
            ></textarea>
            <button
              onClick={handleSubmit}
              className={`chat-interface-submit-button ${
                isAITyping ? "disabled" : ""
              }`}
              aria-label="Submit your answer"
              disabled={isAITyping || !inputValue.trim()} // Disable if AI is typing or input is empty
            >
              Submit
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ChatInterface;
