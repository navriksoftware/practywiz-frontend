import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { socket } from "../../Utils/socket";
import { useSelector } from "react-redux";
import {
  Clock,
  CheckCircle,
  Users,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import "./ChatSidebar.css";

const ChatSidebar = React.memo(function ChatSidebar({
  isOpen,
  onToggle,
  participants = [],
  menteeFirstname,
  onSendMessage,
  roomIdProvided = null,
}) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const sidebarRef = useRef(null);
  const [error, setError] = useState("");

  const userId = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_dtls_id
  );
  const userName = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_firstname
  );
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const handleSendMessage = useCallback(() => {
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
  }, [message, menteeFirstname, onSendMessage]);

  // Mock participants data if none provided
  const defaultParticipants = useMemo(
    () => [
      { id: 1, name: "Dr. Sarah Johnson", role: "Faculty", isOnline: true },
      { id: 2, name: "Avega AI", role: "AI Assistant", isOnline: true },
      {
        id: 3,
        name: menteeFirstname || "You",
        role: "Student",
        isOnline: true,
      },
    ],
    [menteeFirstname]
  );

  //socket connection start

  // Room and user state variables (same names as previous version)
  const [roomId] = useState(roomIdProvided.toString());
  const [studentName] = useState(userName);
  const [isRoomJoined, setIsRoomJoined] = useState(false);

  // Question state variables (maintaining previous naming)
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [textAnswer, setTextAnswer] = useState(""); // New: for subjective questions
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  // Previous questions tracking
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);

  // UI state variables
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [roomStats, setRoomStats] = useState({ studentCount: 0 });

  // Student user ID (consistent with previous version)
  // const userId = `student_${Date.now()}`

  // Refs for tracking user engagement
  const questionStartTime = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Auto-scroll effect for new questions and chat messages
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, currentQuestion]);

  // Socket event handlers setup
  useEffect(() => {
    // Define all event handlers outside of the useEffect to use them in cleanup
    // Handle receiving new questions (both MCQ and subjective)
    const handleReceiveQuestion = (question) => {
      setCurrentQuestion(question);
      setSelectedOption("");
      setTextAnswer(""); // Reset text answer for new question
      setHasSubmitted(false);
      setTimeLeft(question.timer);
      setError("");
      setSuccessMessage("");
      questionStartTime.current = Date.now();

      // Update engagement status to thinking when new question arrives
      socket.emit("updateEngagement", { engagement: "thinking" });

      // Scroll to the new question after a brief delay
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    };

    // Handle session restoration (for reconnection scenarios)
    const handleSessionRestored = (data) => {
      if (data.currentQuestion) {
        setCurrentQuestion(data.currentQuestion);
        setTimeLeft(data.timeLeft);
        setHasSubmitted(data.hasSubmitted);

        // Restore previous answers based on question type
        if (data.currentQuestion.questionType === "mcq") {
          setSelectedOption(data.selectedOption || "");
        } else if (data.currentQuestion.questionType === "subjective") {
          setTextAnswer(data.textAnswer || "");
        }

        if (data.hasSubmitted) {
          socket.emit("updateEngagement", { engagement: "answered" });
        }
      }
      setIsReconnecting(false);
    };

    // Handle successful answer submission
    const handleAnswerSubmitted = (data) => {
      setHasSubmitted(true);
      setSuccessMessage(data.message || "Answer submitted successfully!");
      setError("");

      // Update engagement status to answered
      socket.emit("updateEngagement", { engagement: "answered" });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    };

    // Handle successful room joining
    const handleRoomJoined = (data) => {
      if (data.success) {
        setIsRoomJoined(true);
        setRoomStats({ studentCount: data.studentCount });
        setError("");
        setConnectionStatus("connected");

        if (data.isRejoining) {
          setIsReconnecting(true);
          console.log("Student rejoined session");
        }
      }
    };

    // Handle error messages
    const handleError = (data) => {
      setError(data.message || "An error occurred")
      setSuccessMessage("")
    }


       // Handle session ended by faculty
    const handleSessionEnded = (data) => {
      setSuccessMessage(`Session ended by ${data.endedBy}`)
      setIsRoomJoined(false)
      setCurrentQuestion(null)
      setHasSubmitted(false)
      setSelectedOption("")
      setTextAnswer("")
      setTimeLeft(0)

      // Show message for 5 seconds then redirect
      setTimeout(() => {
        setSuccessMessage("")
        // You can add navigation logic here if needed
      }, 5000)
    } 


    // Handle specific error messages
    const handleErrorMessage = (message) => {
      setError(message);
      setSuccessMessage("");
    };

    // Handle connection status changes
    const handleConnect = () => {
      setConnectionStatus("connected");
      setIsReconnecting(false);
    };

    const handleDisconnect = () => {
      setConnectionStatus("disconnected");
      setIsReconnecting(true);
    };

    const handleReconnect = () => {
      setConnectionStatus("connected");
      setIsReconnecting(false);
    };

    // Register all socket event listeners
    socket.on("receiveQuestion", handleReceiveQuestion)
    socket.on("sessionRestored", handleSessionRestored)
    socket.on("answerSubmitted", handleAnswerSubmitted)
    socket.on("roomJoined", handleRoomJoined)
    socket.on("error", handleError)
    socket.on("errorMessage", handleErrorMessage)
    socket.on("sessionEnded", handleSessionEnded)
    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)
    socket.on("reconnect", handleReconnect)

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("receiveQuestion", handleReceiveQuestion)
      socket.off("sessionRestored", handleSessionRestored)
      socket.off("answerSubmitted", handleAnswerSubmitted)
      socket.off("roomJoined", handleRoomJoined)
       socket.off("sessionEnded", handleSessionEnded)
      socket.off("error", handleError)
      socket.off("errorMessage", handleErrorMessage)
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
      socket.off("reconnect", handleReconnect)
    }
  }, [])

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !hasSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasSubmitted]);

  // Debounced typing indicator function
  const debouncedEmitThinking = useCallback(() => {
    socket.emit("updateEngagement", { engagement: "thinking" });
  }, []);

  // Handle typing indicators for subjective questions
  useEffect(() => {
    // Only run this effect when needed
    if (!currentQuestion?.questionType === "subjective" || hasSubmitted) {
      return;
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // If there's text, emit typing status
    if (textAnswer.trim()) {
      socket.emit("studentTyping");

      // Set timeout to change back to thinking after 2 seconds of no typing
      typingTimeoutRef.current = setTimeout(debouncedEmitThinking, 2000);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [
    textAnswer,
    currentQuestion?.questionType,
    hasSubmitted,
    debouncedEmitThinking,
  ]);

  // Function to join room as student
  const joinRoom = useCallback(() => {
    if (!roomId.trim() || !studentName.trim()) {
      setError("Please enter both room ID and your name");
      return;
    }

    setConnectionStatus("connecting");
    socket.emit("joinRoom", {
      roomId: roomId.trim(),
      userId: userId.toString(),
      userName: studentName.trim(),
      role: "student",
    });
  }, [roomId, studentName, userId]);

  // Function to handle MCQ option selection
  const handleOptionSelect = useCallback(
    (option) => {
      if (hasSubmitted || currentQuestion?.questionType !== "mcq") return;

      setSelectedOption(option);
      setError("");

      // Update engagement status to thinking when option is selected
      socket.emit("updateEngagement", { engagement: "thinking" });
    },
    [hasSubmitted, currentQuestion?.questionType]
  );

  // Function to handle subjective text input changes
  const handleTextAnswerChange = useCallback(
    (e) => {
      if (hasSubmitted || currentQuestion?.questionType !== "subjective")
        return;

      setTextAnswer(e.target.value);
      setError("");
    },
    [hasSubmitted, currentQuestion?.questionType]
  );

  // Function to submit answer (both MCQ and subjective)
  const submitAnswer = useCallback(() => {
    if (hasSubmitted) return;

    // Validation for MCQ questions
    if (currentQuestion?.questionType === "mcq" && !selectedOption) {
      setError("Please select an option before submitting");
      return;
    }

    // Validation for subjective questions
    if (currentQuestion?.questionType === "subjective" && !textAnswer.trim()) {
      setError("Please enter your answer before submitting");
      return;
    }

    // Calculate time spent on question
    const timeSpent = questionStartTime.current
      ? Math.floor((Date.now() - questionStartTime.current) / 1000)
      : 0;

    // Prepare submission data based on question type
    const submissionData = {
      studentId: userId,
      roomId,
      questionId: currentQuestion.questionId,
      timeSpent,
    };

    if (currentQuestion.questionType === "mcq") {
      submissionData.selectedOption = selectedOption;
    } else if (currentQuestion.questionType === "subjective") {
      submissionData.textAnswer = textAnswer.trim();
    }

    // Save the current question to previous questions
    const answeredQuestion = {
      ...currentQuestion,
      userAnswer:
        currentQuestion.questionType === "mcq"
          ? selectedOption
          : textAnswer.trim(),
      answeredAt: new Date(),
    };

    setPreviousQuestions((prev) => [...prev, answeredQuestion]);

    socket.emit("submitAnswer", submissionData);
  }, [
    hasSubmitted,
    currentQuestion,
    selectedOption,
    textAnswer,
    userId,
    roomId,
  ]);

  // Helper function to get option labels (A, B, C, D)
  const getOptionLabel = useCallback(
    (index) => String.fromCharCode(65 + index),
    []
  );

  // Helper function to format time display
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, []);

  // Memoize word count calculation
  const wordCount = useMemo(
    () =>
      textAnswer
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length,
    [textAnswer]
  );

  // No form, just a join button with room ID and username
  if (!isRoomJoined) {
    return (
      <>
        {/* Chat Toggle Button with Join */}
        <button
          className="join-chat-btn"
          onClick={joinRoom}
          disabled={connectionStatus === "connecting"}
        >
          <div className="join-btn-content">
            <div className="join-icon">
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
            </div>
            <div className="join-btn-text">
              <span className="join-btn-label">
                {connectionStatus === "connecting"
                  ? "Joining..."
                  : "Join Chat Room"}
              </span>
              <div className="join-btn-details">
                <span className="join-room-id">Room: {roomId}</span>
                <span className="join-username">as {studentName}</span>
              </div>
            </div>
          </div>
        </button>

        {/* Error display if any */}
        {error && <div className="join-error-popup">{error}</div>}
      </>
    );
  }

  // Main chat sidebar UI
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
        <div className="toggle-btn-info">
          <div className="toggle-btn-room">Room: {roomId}</div>
          <div className="toggle-btn-user">{studentName}</div>
        </div>
        {!isOpen && chatMessages.length > 0 && (
          <span className="chat-notification-badge">{chatMessages.length}</span>
        )}
      </button>

      {/* Chat Sidebar */}
      <div ref={sidebarRef} className={`chat-sidebar ${isOpen ? "open" : ""}`}>
        <div className="chat-sidebar-header sticky-header">
          <div className="chat-header-content">
            <div className="header-title-section">
              <div className="faculty-info">
                <div className="faculty-avatar">
                  <span className="faculty-initial">DJ</span>
                </div>
                <div className="faculty-details">
                  <h3 className="faculty-name">Dr. Sarah Johnson</h3>
                  <span className="faculty-role">Faculty</span>
                </div>
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
            <div className="header-status-container">
              <div className="connection-status">
                <div className={`status-indicator ${connectionStatus}`} />
                <span className="status-text">{connectionStatus}</span>
              </div>
              <div className="room-id">Room: {roomId}</div>
              <div className="student-count">
                <Users className="user-icon" />
                {roomStats.studentCount}
              </div>
            </div>
          </div>
        </div>

        {/* Reconnection banner */}
        {isReconnecting && (
          <div className="reconnecting-banner">
            <RefreshCw className="spinner-icon" />
            <span className="reconnecting-text">
              Reconnecting to session...
            </span>
          </div>
        )}

        {/* Success & Error messages */}
        {successMessage && (
          <div className="success-banner">
            <CheckCircle className="success-icon" />
            <span className="message-text">{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="error-banner">
            <AlertCircle className="error-icon" />
            <span className="message-text">{error}</span>
          </div>
        )}

        <div className="chat-content-area">
          {/* Previous Questions */}
          {previousQuestions.length > 0 && (
            <div className="questions-timeline">
              {previousQuestions.map((question, index) => (
                <div
                  key={question.questionId || index}
                  className="question-bubble answered"
                >
                  <div className="question-header">
                    <div className="question-meta">
                      <span className="question-time">
                        {question.answeredAt?.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }) || ""}
                      </span>
                    </div>
                  </div>
                  <div
                    className="question-content"
                    onClick={() =>
                      setExpandedQuestionId(
                        expandedQuestionId === question.questionId
                          ? null
                          : question.questionId
                      )
                    }
                  >
                    <div className="question-text">{question.text}</div>
                    <div className="question-toggle">
                      <svg
                        className={`toggle-icon ${
                          expandedQuestionId === question.questionId
                            ? "open"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {expandedQuestionId === question.questionId && (
                    <div className="question-options-expanded">
                      {question.questionType === "mcq" &&
                        question.options.map((option, optIndex) => (
                          <div
                            key={optIndex}
                            className={`option-item ${
                              option === question.userAnswer
                                ? "selected-answer"
                                : ""
                            }`}
                          >
                            <div className="option-marker">
                              {String.fromCharCode(65 + optIndex)}
                            </div>
                            <span className="option-text">{option}</span>
                            {option === question.userAnswer && (
                              <CheckCircle className="answer-check" />
                            )}
                          </div>
                        ))}

                      {question.questionType === "subjective" && (
                        <div className="subjective-answer-display">
                          <div className="answer-label">Your answer:</div>
                          <div className="answer-content">
                            {question.userAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Current Question */}
          {currentQuestion && (
            <div className="question-bubble current" ref={messagesEndRef}>
              <div className="question-header">
                <div className="question-meta">
                  <div className="new-question-indicator">
                    <div className="red-dot"></div>
                    <span className="new-label">New Question</span>
                  </div>
                  <div className="timer-display">
                    <Clock className="timer-icon" />
                    <span
                      className={`timer-text ${timeLeft <= 10 ? "urgent" : ""}`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="question-content">
                <div className="question-text">{currentQuestion.text}</div>

                {currentQuestion.questionType === "mcq" && (
                  <div className="mcq-options">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(option)}
                        disabled={hasSubmitted || timeLeft === 0}
                        className={`option-button ${
                          selectedOption === option ? "selected" : ""
                        } ${hasSubmitted || timeLeft === 0 ? "disabled" : ""}`}
                      >
                        <div className="option-marker">
                          {getOptionLabel(index)}
                        </div>
                        <span className="option-text">{option}</span>
                        {selectedOption === option && (
                          <CheckCircle className="option-check" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {currentQuestion.questionType === "subjective" && (
                  <div className="subjective-input">
                    <textarea
                      value={textAnswer}
                      onChange={handleTextAnswerChange}
                      disabled={hasSubmitted || timeLeft === 0}
                      placeholder="Type your answer here..."
                      rows={4}
                      className={`answer-textarea ${
                        hasSubmitted || timeLeft === 0 ? "disabled" : ""
                      }`}
                    />
                    <div className="input-stats">
                      <span>Characters: {textAnswer.length}</span>
                      <span>Words: {wordCount}</span>
                    </div>
                  </div>
                )}

                <div className="submit-section">
                  {!hasSubmitted ? (
                    <button
                      onClick={submitAnswer}
                      disabled={
                        timeLeft === 0 ||
                        (currentQuestion.questionType === "mcq" &&
                          !selectedOption) ||
                        (currentQuestion.questionType === "subjective" &&
                          !textAnswer.trim())
                      }
                      className={`submit-btn ${
                        timeLeft === 0 ||
                        (currentQuestion.questionType === "mcq" &&
                          !selectedOption) ||
                        (currentQuestion.questionType === "subjective" &&
                          !textAnswer.trim())
                          ? "disabled"
                          : ""
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <div className="submitted-status">
                      <CheckCircle className="success-icon" />
                      <span className="success-text">
                        Answer Submitted Successfully!
                      </span>
                    </div>
                  )}
                </div>

                {hasSubmitted && (
                  <div className="submission-feedback">
                    <div className="feedback-content">
                      <div className="your-response">
                        <span className="response-label">Your Response:</span>
                        {currentQuestion.questionType === "mcq" ? (
                          <span className="selected-answer">
                            {selectedOption}
                          </span>
                        ) : (
                          <div className="subjective-response">
                            {textAnswer}
                          </div>
                        )}
                      </div>
                      <p className="waiting-message">
                        Waiting for other students to complete...
                      </p>
                    </div>
                  </div>
                )}

                {timeLeft === 0 && !hasSubmitted && (
                  <div className="timeout-notice">
                    <div className="timeout-content">
                      <h4 className="timeout-title">Time's Up!</h4>
                      <p className="timeout-message">
                        The question has expired. Wait for the next question.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Waiting for Question */}
          {!currentQuestion && (
            <div className="waiting-state">
              <div className="waiting-content">
                <div className="clock-container">
                  <Clock className="big-clock-icon" />
                </div>
                <h2 className="waiting-title">Waiting for Question</h2>
                <p className="waiting-subtitle">
                  Your instructor will send a question shortly
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Messages Section */}
        {/* <div className="chat-messages-section">
          <div className="chat-messages-container">
            {chatMessages.length === 0 ? (
              <div className="empty-chat">
                <div className="chat-icon-wrapper">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
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
            }
            <div ref={messagesEndRef} />
          </div>
        </div> */}
      </div>

      {/* Overlay for mobile - only shows on mobile devices */}
      {isOpen && (
        <div className="chat-sidebar-overlay" onClick={onToggle}></div>
      )}
    </>
  );
});

export default ChatSidebar;
