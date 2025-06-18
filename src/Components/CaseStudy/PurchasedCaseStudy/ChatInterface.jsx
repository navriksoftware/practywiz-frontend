import React, { useEffect, useRef, useState } from "react";
import AiImage from "./images/AI.png";
import UserImage from "./images/User.png";
import "./ChatInterface.css";

function ChatInterface({ messages, questionType, onAnswer, isAITyping, name }) {

  
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, options, isAITyping]);

  useEffect(() => {
    if (questionType === "subjective" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [questionType, options]);

  // Find the latest question message with options and questionType
  useEffect(() => {
    scrollToBottom();
    // Find the latest message with options and questionType
    let latestMsg = null;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        messages[i].options &&
        messages[i].questionType === "multiple-choice"
      ) {
        latestMsg = messages[i];
        break;
      }
    }
    if (latestMsg) {
      setOptions(latestMsg.options);
    } else {
      setOptions([]);
    }
  }, [messages]);

  // Auto-focus textarea for subjective questions
  useEffect(() => {
    if (questionType === "subjective" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [questionType]);

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

  // Function to get message styling classes
  const getMessageClasses = (msg) => {
    let baseClass = `chat-interface-message ${
      msg.sender === "AI"
        ? "chat-interface-ai-message"
        : "chat-interface-user-message"
    }`;

    // Add follow-up specific classes
    if (msg.isFollowUp) {
      baseClass += " chat-interface-followup-question";
    }
    if (msg.isFollowUpPrompt) {
      baseClass += " chat-interface-followup-prompt";
    }
    if (msg.isFollowUpAnswer) {
      baseClass += " chat-interface-followup-answer";
    }
    if (msg.isFollowUpAcknowledgment) {
      baseClass += " chat-interface-followup-acknowledgment";
    }

    return baseClass;
  };

  // Find the latest question message to determine input type
  const latestQuestionMsg = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        messages[i].sender === "AI" &&
        (messages[i].questionType === "multiple-choice" ||
          messages[i].questionType === "subjective")
      ) {
        return messages[i];
      }
    }
    return null;
  })();

  // Determine input type: multiple-choice or subjective
  const inputType =
    latestQuestionMsg && latestQuestionMsg.questionType
      ? latestQuestionMsg.questionType
      : questionType;

  return (
    <div ref={chatContainerRef} className="chat-interface-container">
      <div className="chat-interface-messages">
        <div className="chat-interface-message chat-interface-ai-message">
          <img src={AiImage} alt="AI" className="chat-interface-avatar" />
          <div className="chat-interface-message-text">
            <span>
              <p className="greeting">Hello {name ? `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}!` : "Learner!"}</p>
              <p>
                welcome to the Avega the A.I Simulator! 🤖</p>
              <p>
                Let&rsquo;s put your knowledge to the test in this interactive
                case study. Ready to dive in and see how you handle the
                challenges ahead? Let&rsquo;s get started!
              </p>
            </span>
          </div>
        </div>
        {messages.map((msg, idx) => (
          <div key={idx} className={getMessageClasses(msg)}>
            {msg.sender === "AI" ? (
              <>
                <img src={AiImage} alt="AI" className="chat-interface-avatar" />
                <div className="chat-interface-message-text">
                  {msg.text}
                  {msg.isFollowUp && (
                    <div className="followup-indicator">
                      📝 Follow-up Question{" "}
                      {msg.followUpLevel && `(Level ${msg.followUpLevel})`}
                    </div>
                  )}
                  {msg.isFollowUpPrompt && (
                    <div className="followup-prompt-indicator">
                      💡 Follow-up Option
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="chat-interface-message-text">
                  {msg.text}
                  {msg.isFollowUpAnswer && (
                    <div className="followup-answer-indicator">
                      📝 Follow-up Response
                    </div>
                  )}
                </div>
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
        {!isAITyping && (
          <>
            {inputType === "multiple-choice" && options.length > 0 ? (
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
            ) : inputType === "subjective" ? (
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
                  autoFocus
                ></textarea>
                <button
                  onClick={handleSubmit}
                  className="chat-interface-submit-button"
                  aria-label="Submit your answer"
                  disabled={!inputValue.trim()}
                >
                  Submit
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default ChatInterface;
