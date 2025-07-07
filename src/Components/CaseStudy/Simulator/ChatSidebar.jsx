import { useState, useEffect, useRef } from "react";
import { socket } from "../../Utils/socket";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  Users,
  AlertCircle,
  RefreshCw,
  FileText,
  List,
} from "lucide-react";

function ChatSidebar({
  isOpen,
  onToggle,
  participants = [],
  menteeFirstname,
  onSendMessage,
  roomIdProvided,
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

  // const formatTime = (timestamp) => {
  //   return timestamp.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  // Mock participants data if none provided
  const defaultParticipants = [
    { id: 1, name: "Dr. Sarah Johnson", role: "Faculty", isOnline: true },
    { id: 2, name: "Avega AI", role: "AI Assistant", isOnline: true },
    { id: 3, name: menteeFirstname || "You", role: "Student", isOnline: true },
  ];

  const displayParticipants =
    participants.length > 0 ? participants : defaultParticipants;

  //scoket connection start

  // Room and user state variables (same names as previous version)
  const [roomId, setRoomId] = useState(roomIdProvided.toString());
  const [studentName, setStudentName] = useState(userName);
  const [isRoomJoined, setIsRoomJoined] = useState(false);

  // Question state variables (maintaining previous naming)
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [textAnswer, setTextAnswer] = useState(""); // New: for subjective questions
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  // const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("");

  // UI state variables
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("connected");
  const [roomStats, setRoomStats] = useState({ studentCount: 0 });

  // Student user ID (consistent with previous version)
  // const userId = `student_${Date.now()}`

  // Refs for tracking user engagement
  const questionStartTime = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Socket event handlers setup
  useEffect(() => {
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
      setError(data.message || "An error occurred");
      setSuccessMessage("");
    };

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
    socket.on("receiveQuestion", handleReceiveQuestion);
    socket.on("sessionRestored", handleSessionRestored);
    socket.on("answerSubmitted", handleAnswerSubmitted);
    socket.on("roomJoined", handleRoomJoined);
    socket.on("error", handleError);
    socket.on("errorMessage", handleErrorMessage);
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("reconnect", handleReconnect);

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("receiveQuestion", handleReceiveQuestion);
      socket.off("sessionRestored", handleSessionRestored);
      socket.off("answerSubmitted", handleAnswerSubmitted);
      socket.off("roomJoined", handleRoomJoined);
      socket.off("error", handleError);
      socket.off("errorMessage", handleErrorMessage);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("reconnect", handleReconnect);
    };
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0 && !hasSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, hasSubmitted]);

  // Handle typing indicators for subjective questions
  useEffect(() => {
    if (currentQuestion?.questionType === "subjective" && !hasSubmitted) {
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // If there's text, emit typing status
      if (textAnswer.trim()) {
        socket.emit("studentTyping");

        // Set timeout to change back to thinking after 2 seconds of no typing
        typingTimeoutRef.current = setTimeout(() => {
          socket.emit("updateEngagement", { engagement: "thinking" });
        }, 2000);
      }
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [textAnswer, currentQuestion, hasSubmitted]);

  // Function to join room as student
  const joinRoom = () => {
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
  };

  // Function to handle MCQ option selection
  const handleOptionSelect = (option) => {
    if (hasSubmitted || currentQuestion?.questionType !== "mcq") return;

    setSelectedOption(option);
    setError("");

    // Update engagement status to thinking when option is selected
    socket.emit("updateEngagement", { engagement: "thinking" });
  };

  // Function to handle subjective text input changes
  const handleTextAnswerChange = (e) => {
    if (hasSubmitted || currentQuestion?.questionType !== "subjective") return;

    setTextAnswer(e.target.value);
    setError("");
  };

  // Function to submit answer (both MCQ and subjective)
  const submitAnswer = () => {
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

    socket.emit("submitAnswer", submissionData);
  };

  // Helper function to get option labels (A, B, C, D)
  const getOptionLabel = (index) => String.fromCharCode(65 + index);

  // Helper function to format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Helper function to get connection status color
  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  // Render room joining form if not joined yet
  if (!isRoomJoined) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="container mx-auto max-w-md">
          <div className="flex items-center mb-6">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">Join Room</h2>
            <p className="text-gray-600 mb-6">
              Enter your details to join the session
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  placeholder="Enter room ID"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                onClick={joinRoom}
                disabled={connectionStatus === "connecting"}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {connectionStatus === "connecting" ? "Joining..." : "Join Room"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main student dashboard render
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
          </div>

          {/* Connection status and room info */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${getConnectionStatusColor()}`}
              />
              <span className="text-sm text-gray-600 capitalize">
                {connectionStatus}
              </span>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Room: {roomId}
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              {roomStats.studentCount}
            </div>
          </div>
        </div>

        {/* Reconnection banner */}
        {isReconnecting && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span>Reconnecting to session...</span>
          </div>
        )}

        {/* Success message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {/* Main content area */}
        {!currentQuestion ? (
          // Waiting for question state
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">
                Waiting for Question
              </h2>
              <p className="text-gray-600 mb-4">
                Your instructor will send a question shortly
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        ) : (
          // Question display area
          <div className="space-y-6">
            {/* Question header with timer */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {currentQuestion.questionType === "mcq" ? (
                    <List className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                  <h2 className="text-xl font-semibold">
                    {currentQuestion.questionType === "mcq"
                      ? "Multiple Choice Question"
                      : "Subjective Question"}
                  </h2>
                </div>

                {/* Timer display */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span
                      className={`font-mono text-lg ${
                        timeLeft <= 10 ? "text-red-600" : "text-gray-700"
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        timeLeft <= 10 ? "bg-red-500" : "bg-blue-600"
                      }`}
                      style={{
                        width: `${(timeLeft / currentQuestion.timer) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Question text */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">
                  {currentQuestion.text}
                </h3>
              </div>
            </div>

            {/* Answer input area */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* MCQ Options */}
              {currentQuestion.questionType === "mcq" && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700 mb-4">
                    Select your answer:
                  </h4>
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option)}
                      disabled={hasSubmitted || timeLeft === 0}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedOption === option
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      } ${
                        hasSubmitted || timeLeft === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                            selectedOption === option
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {getOptionLabel(index)}
                        </div>
                        <span className="flex-1">{option}</span>
                        {selectedOption === option && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Subjective Text Input */}
              {currentQuestion.questionType === "subjective" && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-700">
                    Write your answer:
                  </h4>
                  <textarea
                    value={textAnswer}
                    onChange={handleTextAnswerChange}
                    disabled={hasSubmitted || timeLeft === 0}
                    placeholder="Type your answer here..."
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      hasSubmitted || timeLeft === 0
                        ? "opacity-50 cursor-not-allowed bg-gray-50"
                        : "border-gray-300"
                    }`}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Characters: {textAnswer.length}</span>
                    <span>
                      Words:{" "}
                      {
                        textAnswer
                          .trim()
                          .split(/\s+/)
                          .filter((word) => word.length > 0).length
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="mt-6 flex justify-center">
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
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">
                      Answer Submitted Successfully!
                    </span>
                  </div>
                )}
              </div>

              {/* Submission status */}
              {hasSubmitted && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-center">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Your Response:
                    </h4>
                    {currentQuestion.questionType === "mcq" ? (
                      <p className="text-green-700">
                        Selected:{" "}
                        <span className="font-medium">{selectedOption}</span>
                      </p>
                    ) : (
                      <div className="text-green-700">
                        <p className="font-medium mb-2">Your answer:</p>
                        <div className="bg-white p-3 rounded border text-left">
                          {textAnswer}
                        </div>
                      </div>
                    )}
                    <p className="text-sm text-green-600 mt-2">
                      Waiting for other students to complete...
                    </p>
                  </div>
                </div>
              )}

              {/* Time up message */}
              {timeLeft === 0 && !hasSubmitted && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                  <h4 className="font-semibold text-red-800">Time's Up!</h4>
                  <p className="text-red-600">
                    The question has expired. Wait for the next question.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatSidebar;
