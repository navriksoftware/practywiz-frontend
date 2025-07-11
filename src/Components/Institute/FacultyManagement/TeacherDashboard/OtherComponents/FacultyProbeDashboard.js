import { useState, useEffect, useMemo } from "react";
import {
  ArrowLeft,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  Search,
  TrendingUp,
  Brain,
  MessageCircle,
  UserX,
  FileText,
  List,
  Eye,
} from "lucide-react";
import "../DashboardCSS/FacultyProbeDashboard.css";
import { socket } from "../../../../Utils/socket"
import { useSelector } from "react-redux";

// Dummy data
const dummyStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "thinking",
    time: "Typing...",
  },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "silent",
    time: "No activity",
  },
  {
    id: 4,
    name: "Emily Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
  {
    id: 5,
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "thinking",
    time: "Typing...",
  },
  {
    id: 6,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
  {
    id: 7,
    name: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "silent",
    time: "No activity",
  },
  {
    id: 8,
    name: "Lisa Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
  {
    id: 9,
    name: "Robert Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "thinking",
    time: "Typing...",
  },
  {
    id: 10,
    name: "Jennifer Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
  {
    id: 11,
    name: "Thomas Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "silent",
    time: "No activity",
  },
  {
    id: 12,
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "answered",
    time: "2m ago",
  },
];

const previousQuestions = [
  "What are the key market segments identified in the case?",
  "How would you evaluate the company's pricing strategy?",
  "What external factors might impact the marketing plan?",
];

const responseData = [12, 8, 5, 3];
const keyInsights = [
  "Students understand the market segmentation concept well",
  "Financial analysis aspects need more clarification",
  "Several students identified future technology risks",
];

const insightfulResponses = [
  {
    name: "Alex Johnson",
    text: "The case demonstrates how market segmentation directly influenced the company's ability to target specific customer needs.",
  },
  {
    name: "Emily Chen",
    text: "I noticed that the financial analysis overlooked potential market volatility factors that could impact long-term strategy.",
  },
];

export default function FacultyProbsResultPage({ facultyroomId, facultyuserName, facultyuserId }) {
  // const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [questionCategory, setQuestionCategory] = useState("Fact");
  const [responseFormat, setResponseFormat] = useState("Multiple Choice");
  const [responseTimer, setResponseTimer] = useState("No Timer");
  const [roomId, setRoomId] = useState(facultyroomId) // faculty_case_assign_dtls_id
  const [facultyName, setFacultyName] = useState(facultyuserName)
  const [isRoomJoined, setIsRoomJoined] = useState(false)
  const [roomInfo, setRoomInfo] = useState(null) // Class and faculty details

  // Student tracking variables (same names as previous version)
  const [students, setStudents] = useState([])
  const [studentStatuses, setStudentStatuses] = useState([])

  // Question and analytics variables (maintaining previous naming)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [questionHistory, setQuestionHistory] = useState([])
  const [questionDetails, setQuestionDetails] = useState(null)
  const [selectedQuestionId, setSelectedQuestionId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [showEndSessionConfirm, setShowEndSessionConfirm] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  // const [currentQuestion, setCurrentQuestion] = useState("");
  // const [activeTab, setActiveTab] = useState("Question Management");

  // Debounce search functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter students based on search and filter
  // const filteredStudents = useMemo(() => {
  //   let filtered = dummyStudents;

  //   if (debouncedSearchTerm) {
  //     filtered = filtered.filter((student) =>
  //       student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //     );
  //   }

  //   if (selectedFilter !== "All") {
  //     filtered = filtered.filter(
  //       (student) => student.status === selectedFilter.toLowerCase()
  //     );
  //   }

  //   return filtered;
  // }, [debouncedSearchTerm, selectedFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case "answered":
        return "#10B981";
      case "thinking":
        return "#F59E0B";
      case "silent":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getStatusCount = (status) => {
    return dummyStudents.filter((student) => student.status === status).length;
  };

  // const [options, setOptions] = useState(["", ""]); // Start with 2 empty options
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };
  const deleteOption = (indexToRemove) => {
    const newOptions = options.filter((_, idx) => idx !== indexToRemove);
    setOptions(newOptions);
  };


  // --------------------------------------------------------------------------------------------------

  // Room and user state variables (using existing database structure)


  // UI state variables
  const [activeTab, setActiveTab] = useState("engagement")

  const [statusFilter, setStatusFilter] = useState("all")

  // Question form state variables (same as previous version)
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState("mcq") // MCQ or subjective
  const [options, setOptions] = useState(["", "", "", ""])
  const [timer, setTimer] = useState(30)
  const [timeLeft, setTimeLeft] = useState(0)
  const [error, setError] = useState("")

  // Faculty user ID (consistent with previous version)
  const userId = useSelector(
    (state) => state.faculty?.facultyDtls?.faculty_id || null
  );

  /**
   * Socket event handlers setup
   * Handles real-time communication with SQL Server backend
   */
  useEffect(() => {
    // Handle new student joining the room
    const handleUserJoined = (data) => {
      if (data.role === "student") {
        setStudents((prev) => {
          const existingIndex = prev.findIndex((s) => s.id === data.userId)
          if (existingIndex >= 0) {
            // Update existing student (rejoining case)
            const updated = [...prev]
            updated[existingIndex] = {
              ...updated[existingIndex],
              status: "online",
              lastSeen: new Date(data.joinedAt),
            }
            return updated
          } else {
            // Add new student
            return [
              ...prev,
              {
                id: data.userId,
                name: data.userName || `Student ${data.userId.slice(-4)}`,
                joinedAt: new Date(data.joinedAt),
                status: "online",
                lastSeen: new Date(data.joinedAt),
              },
            ]
          }
        })
      }
    }

    // Handle student leaving the room
    const handleUserLeft = (data) => {
      if (data.role === "student") {
        setStudents((prev) =>
          prev.map((student) =>
            student.id === data.userId ? { ...student, status: "offline", lastSeen: new Date() } : student,
          ),
        )
      }
    }

    // Handle real-time student status updates from SQL Server
    const handleStudentStatuses = (statuses) => {
      setStudentStatuses(statuses)
    }

    // Handle question analytics (only for MCQ questions)
    const handleQuestionAnalytics = (data) => {
      const totalResponses = data.analytics.reduce((sum, item) => sum + item.count, 0)
      const responses = data.analytics.map((item) => ({
        option: item.SelectedOption,
        count: item.count,
        percentage: totalResponses > 0 ? Math.round((item.count / totalResponses) * 100) : 0,
      }))

      setAnalytics({
        questionId: data.questionId,
        responses,
        totalResponses,
      })
    }

    // Handle successful question sending
    const handleQuestionSent = (question) => {
      setCurrentQuestion(question)
      setQuestionHistory((prev) => [question, ...prev])
      setTimeLeft(question.timer)
    }

    // Handle detailed question response data
    const handleQuestionDetails = (data) => {
      setQuestionDetails(data)
    }

    // Handle successful room joining with SQL Server data
    const handleRoomJoined = (data) => {
      if (data.success) {
        setIsRoomJoined(true)
        setRoomInfo(data.roomInfo) // Class and faculty information
        setError("")
        if (data.isRejoining) {
          console.log("Faculty rejoined session")
        }
      }
    }

    // Handle session ended by faculty
    const handleSessionEnded = (data) => {
      setSuccessMessage(`Session ended by ${data.endedBy}`)
      setIsRoomJoined(false)
      setCurrentQuestion(null)
      setAnalytics(null)
      setQuestionHistory([])
      setStudentStatuses([])
      setStudents([])

      // Redirect or show message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
        // You can add navigation logic here if needed
      }, 3000)
    }

    // Handle session end confirmation
    const handleSessionEndedConfirm = (data) => {
      if (data.success) {
        setSuccessMessage("Session ended successfully")
        setIsRoomJoined(false)
        setCurrentQuestion(null)
        setAnalytics(null)
        setQuestionHistory([])
        setStudentStatuses([])
        setStudents([])
        setShowEndSessionConfirm(false)

        setTimeout(() => {
          setSuccessMessage("")
        }, 3000)
      }
    }

    // Handle error messages
    const handleError = (data) => {
      setError(data.message || "An error occurred")
    }

    // Register all socket event listeners
    socket.on("userJoined", handleUserJoined)
    socket.on("userLeft", handleUserLeft)
    socket.on("studentStatuses", handleStudentStatuses)
    socket.on("questionAnalytics", handleQuestionAnalytics)
    socket.on("questionSent", handleQuestionSent)
    socket.on("questionDetails", handleQuestionDetails)
    socket.on("roomJoined", handleRoomJoined)
    socket.on("sessionEnded", handleSessionEnded)
    socket.on("sessionEndedConfirm", handleSessionEndedConfirm)
    socket.on("error", handleError)

    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("userJoined", handleUserJoined)
      socket.off("userLeft", handleUserLeft)
      socket.off("studentStatuses", handleStudentStatuses)
      socket.off("questionAnalytics", handleQuestionAnalytics)
      socket.off("questionSent", handleQuestionSent)
      socket.off("questionDetails", handleQuestionDetails)
      socket.off("roomJoined", handleRoomJoined)
      socket.off("sessionEnded", handleSessionEnded)
      socket.off("sessionEndedConfirm", handleSessionEndedConfirm)
      socket.off("error", handleError)
    }
  }, [])

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  /**
   * Function to join room as faculty
   * Uses faculty_case_assign_dtls_id as roomId
   */
  const joinRoom = () => {
    if (!roomId.trim() || !facultyName.trim()) {
      setError("Please enter both room ID and your name")
      return
    }

    // Validate roomId is numeric (faculty_case_assign_dtls_id)
    if (isNaN(Number.parseInt(roomId.trim()))) {
      setError("Room ID must be a valid number")
      return
    }

    socket.emit("joinRoom", {
      roomId: Number.parseInt(roomId.trim()), // faculty_case_assign_dtls_id
      userId,
      userName: facultyName.trim(),
      role: "faculty",
    })
  }

  /**
   * Function to send question (MCQ or subjective)
   * Integrates with SQL Server mcq_question_dtls table
   */
  const sendQuestion = () => {
    // Validation for MCQ questions
    if (questionType === "mcq" && (!questionText.trim() || options.some((opt) => !opt.trim()))) {
      setError("Please fill in question text and all options for MCQ")
      return
    }

    // Validation for subjective questions
    if (questionType === "subjective" && !questionText.trim()) {
      setError("Please enter the question text")
      return
    }

    const questionId = Date.now() // Will be replaced by SQL Server auto-increment
    const question = {
      questionId,
      roomId: Number.parseInt(roomId.trim()), // faculty_case_assign_dtls_id
      questionType,
      text: questionText,
      options: questionType === "mcq" ? options.filter((opt) => opt.trim()) : [],
      timer,
    }

    socket.emit("sendQuestion", question)

    // Reset form after sending
    setQuestionText("")
    setOptions(["", "", "", ""])
    setTimer(30)
    setAnalytics(null)
    setQuestionDetails(null)
    setError("")
  }

  /**
   * Function to view detailed question responses
   * Retrieves data from SQL Server tables
   */
  const viewQuestionDetails = (questionId) => {
    setSelectedQuestionId(questionId)
    socket.emit("getQuestionDetails", { questionId, roomId: Number.parseInt(roomId) })
    setActiveTab("details")
  }

  // Function to update MCQ option
  const updateOption = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  // Helper function to get option labels (A, B, C, D)
  const getOptionLabel = (index) => String.fromCharCode(65 + index)

  // Helper function to get engagement status icon
  const getEngagementIcon = (engagement) => {
    switch (engagement) {
      case "answered":
        return (
          <CheckCircle className="probes-faculty-side-answered" />
        );
      case "thinking":
        return (
          <Brain className="probes-faculty-side-thinking" />
        );
      case "typing":
        return (
          <MessageCircle className="probes-faculty-side-typing" />
        );
      case "silent":
        return (
          <UserX className="probes-faculty-side-silent" />
        );
      default:
        return (
          <Users className="probes-faculty-side-default" />
        );
    }
  };


  // Helper function to get engagement status color classes
  const getEngagementColor = (engagement) => {
    switch (engagement) {
      case "answered":
        return "bg-green-100 text-green-800 border-green-200"
      case "thinking":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "typing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "silent":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Helper function to get engagement status text
  const getEngagementText = (engagement, lastActivity) => {
    const timeDiff = Math.floor((new Date() - new Date(lastActivity)) / 1000)
    switch (engagement) {
      case "answered":
        return "Answered"
      case "thinking":
        return "Thinking..."
      case "typing":
        return "Typing..."
      case "silent":
        return timeDiff > 60 ? `${Math.floor(timeDiff / 60)}m ago` : "No activity"
      default:
        return "Unknown"
    }
  }

  // Filter students based on search term and status filter
  const filteredStudents = studentStatuses.filter((student) => {
    const matchesSearch = student.userName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = statusFilter === "all" || student.engagement === statusFilter
    return matchesSearch && matchesFilter
  })

  // Calculate status counts for filter tabs
  const getStatusCounts = () => {
    const counts = {
      all: studentStatuses.length,
      answered: studentStatuses.filter((s) => s.engagement === "answered").length,
      thinking: studentStatuses.filter((s) => s.engagement === "thinking").length,
      typing: studentStatuses.filter((s) => s.engagement === "typing").length,
      silent: studentStatuses.filter((s) => s.engagement === "silent").length,
    }
    return counts
  }


  /**
 * Function to end session
 */
  const endSession = () => {
    socket.emit("endSession", {
      roomId: Number.parseInt(roomId.trim()),
    })
  }

  // Render room joining form if not joined yet
  if (!isRoomJoined) {
    return (
      <div className="before-join-room-container">

        <div className="before-join-room-header">
          <div className="before-join-room-header-left">
            <h1 className="before-join-room-title">Join Faculty Room</h1>
          </div>

          <div className="before-join-room-header-right">



            <button
              onClick={joinRoom}
              className="before-join-room-JoinButton"
            >
              Join Room
            </button>
            {error && <div className="before-join-room-errorMessage">{error}</div>}
          </div>
        </div>

      </div>
    )
  }

  const statusCounts = getStatusCounts()

  // Main faculty dashboard render
  return (
    <div className="probes-faculty-side-container">
      <div className="probes-faculty-side-main-container">

        {/* End Session Confirmation Modal */}
        {showEndSessionConfirm && (
          <div className="faculty-dashboard-modal-overlay">
            <div className="faculty-dashboard-modal">
              <div className="faculty-dashboard-modal-header">
                <h3 className="faculty-dashboard-modal-title">End Session</h3>
                <button onClick={() => setShowEndSessionConfirm(false)} className="faculty-dashboard-modal-close">
                  ✕
                </button>
              </div>
              <div className="faculty-dashboard-modal-content">
                <p>Are you sure you want to end this session?</p>
                <p className="faculty-dashboard-modal-warning">
                  This will disconnect all students and faculty from the room and cannot be undone.
                </p>
              </div>
              <div className="faculty-dashboard-modal-actions">
                <button onClick={() => setShowEndSessionConfirm(false)} className="faculty-dashboard-modal-cancel">
                  Cancel
                </button>
                <button onClick={endSession} className="faculty-dashboard-modal-confirm">
                  End Session
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Header section with room information */}
        <div className="probes-faculty-side-header">
          <div className="probes-faculty-side-header-left">
            <div>
              <h1 className="probes-faculty-side-title">Faculty Dashboard</h1>
              {roomInfo && (
                <p className="probes-faculty-side-subtitle">
                  {roomInfo.className} • {roomInfo.facultyName}
                </p>
              )}
            </div>
          </div>
          <div className="probes-faculty-side-header-right">
            <div className="probes-faculty-side-room-badge">Room: {roomId}</div>
            {roomInfo && (
              <div className="probes-faculty-side-class-badge">{roomInfo.className}</div>
            )}
            <button onClick={() => setShowEndSessionConfirm(true)} className="faculty-dashboard-end-session-button">
              End Session
            </button>
          </div>
        </div>

        {/* Main Dashboard Layout - Three Column Grid */}
        <div className="probes-faculty-side-grid">
          {/* Left Panel - Question Creation */}
          <div className="probes-faculty-side-col-1">
            <div className="probes-faculty-side-card probes-faculty-side-card-mb">
              <h3 className="probes-faculty-side-question-title">Live Question Push</h3>

              <div className="probes-faculty-side-form-space">
                {/* Question Type Selector */}
                <div className="probes-faculty-side-form-group">
                  <label className="probes-faculty-side-label">Question Type</label>
                  <select
                    value={questionType}
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="probes-faculty-side-select"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="subjective">Subjective (Text Answer)</option>
                  </select>
                </div>

                {/* Question Text Input */}
                <div className="probes-faculty-side-form-group">
                  <label className="probes-faculty-side-label">Question</label>
                  <textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Type your question here..."
                    rows={3}
                    className="probes-faculty-side-textarea"
                  />
                </div>

                {/* Options Input - Only show for MCQ questions */}
                {questionType === "mcq" && (
                  <div className="probes-faculty-side-form-group">
                    <label className="probes-faculty-side-label">Options</label>
                    {options.map((option, index) => (
                      <input
                        key={index}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                        className="probes-faculty-side-option-input"
                      />
                    ))}
                  </div>
                )}

                {/* Response Format Display */}
                {/* <div className="probes-faculty-side-form-group">
                  <label className="probes-faculty-side-label">Response Format</label>
                  <div className="probes-faculty-side-response-format">
                    {questionType === "mcq" ? <List className="probes-faculty-side-response-icon" /> : <FileText className="probes-faculty-side-response-icon" />}
                    <span className="probes-faculty-side-response-text">{questionType === "mcq" ? "Multiple Choice" : "Text Response"}</span>
                  </div>
                </div> */}

                {/* Timer Input */}
                <div className="probes-faculty-side-form-group">
                  <label className="probes-faculty-side-label">Timer (seconds)</label>
                  <input
                    type="number"
                    value={timer}
                    onChange={(e) => setTimer(Number(e.target.value))}
                    min={10}
                    max={300}
                    className="probes-faculty-side-input"
                  />
                </div>

                {/* Error Display */}
                {error && <div className="probes-faculty-side-error">{error}</div>}

                {/* Send Question Button */}
                <button
                  onClick={sendQuestion}
                  className="probes-faculty-side-send-button"
                >
                  Push Question to Class
                </button>
              </div>
            </div>

            {/* Previous Questions List */}
            {questionHistory.slice(0, 3).map((question, index) => (
              <div className="probes-faculty-side-card">
                <h4 className="probes-faculty-side-previous-title">Previous Questions</h4>
                <div className="probes-faculty-side-previous-space">

                  <div
                    key={question.questionId}
                    className="probes-faculty-side-previous-item"
                    onClick={() => viewQuestionDetails(question.questionId)}
                  >
                    <div className="probes-faculty-side-previous-header">
                      {question.questionType === "mcq" ? (
                        <List className="probes-faculty-side-previous-icon" />
                      ) : (
                        <FileText className="probes-faculty-side-previous-icon" />
                      )}
                      <span className="probes-faculty-side-previous-text">{question.text}</span>
                    </div>
                    <div className="probes-faculty-side-previous-meta">
                      {question.questionType.toUpperCase()} • {new Date(question.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* Center Panel - Student Engagement */}
          <div className="probes-faculty-side-col-1 ">
            <div className="probes-faculty-side-card probes-faculty-side-ai-cardHeight">
              <div className="probes-faculty-side-engagement-header">
                <h3 className="probes-faculty-side-engagement-title">Student Engagement</h3>
                <div className="probes-faculty-side-engagement-badges">
                  <span className="probes-faculty-side-badge-answered">
                    Answered ({statusCounts.answered})
                  </span>
                  <span className="probes-faculty-side-badge-thinking">
                    Thinking ({statusCounts.thinking})
                  </span>
                  <span className="probes-faculty-side-badge-silent">
                    Silent ({statusCounts.silent})
                  </span>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="probes-faculty-side-filter-tabs">
                {[
                  { id: "all", label: "All", count: statusCounts.all },
                  { id: "answered", label: "Answered", count: statusCounts.answered },
                  { id: "thinking", label: "Thinking", count: statusCounts.thinking },
                  { id: "silent", label: "Silent", count: statusCounts.silent },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setStatusFilter(filter.id)}
                    className={`probes-faculty-side-filter-tab ${statusFilter === filter.id
                      ? "probes-faculty-side-filter-tab-active"
                      : "probes-faculty-side-filter-tab-inactive"
                      }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="probes-faculty-side-search-container">
                <Search className="probes-faculty-side-search-icon" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="probes-faculty-side-search-input"
                />
              </div>

              {/* Student List with Real-time Status from SQL Server */}
              <div className="probes-faculty-side-student-list">
                {filteredStudents.map((student) => (
                  <div key={student.userId} className="probes-faculty-side-student-item">
                    {/* Student Avatar */}
                    <div className="probes-faculty-side-student-avatar">
                      {student.userName.charAt(0).toUpperCase()}
                    </div>

                    {/* Student Info */}
                    <div className="probes-faculty-side-student-info">
                      <div className="probes-faculty-side-student-name-row">
                        <h4 className="probes-faculty-side-student-name">{student.userName}</h4>
                        {getEngagementIcon(student.engagement)}
                      </div>
                      <p className="probes-faculty-side-student-status">
                        {getEngagementText(student.engagement, student.lastActivity)}
                      </p>
                      {/* {student.menteeId && <p className="probes-faculty-side-student-id">ID: {student.menteeId}</p>} */}
                    </div>

                    {/* Online Status Indicator */}
                    <div
                      className={`probes-faculty-side-online-indicator ${student.status === "online" ? "probes-faculty-side-online-indicator-green" : "probes-faculty-side-online-indicator-gray"}`}
                    />
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredStudents.length === 0 && (
                <div className="probes-faculty-side-empty-state">
                  {statusFilter === "all" ? "No students connected" : `No students in ${statusFilter} state`}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Analytics (Only for MCQ) */}
          <div className="probes-faculty-side-col-1">
  {currentQuestion && (
              <div className="probes-faculty-side-card probes-faculty-side-current-question">
                <div className="probes-faculty-side-current-question-header">
                  <h3 className="probes-faculty-side-current-question-title">
                    <Clock className="probes-faculty-side-current-question-icon" />
                    Current Question ({currentQuestion.questionType.toUpperCase()})
                  </h3>
                  <div className="probes-faculty-side-current-question-timer">
                    <span className="probes-faculty-side-timer-text">{timeLeft}s</span>
                    <div className="probes-faculty-side-timer-progress">
                      <div
                        className="probes-faculty-side-timer-progress-fill"
                        style={{ width: `${(timeLeft / currentQuestion.timer) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="probes-faculty-side-current-question-grid">
                  {/* Question Display */}
                  <div className="probes-faculty-side-question-display">
                    <div className="probes-faculty-side-question-type">
                      {currentQuestion.questionType === "mcq" ? (
                        <List className="probes-faculty-side-question-type-icon" />
                      ) : (
                        <FileText className="probes-faculty-side-question-type-icon" />
                      )}
                      <span className="probes-faculty-side-question-type-text">
                        {currentQuestion.questionType === "mcq" ? "Multiple Choice Question" : "Subjective Question"}
                      </span>
                    </div>
                    <h4 className="probes-faculty-side-question-text">{currentQuestion.text}</h4>

                    {/* Show options only for MCQ */}
                    {currentQuestion.questionType === "mcq" && (
                      <ul className="probes-faculty-side-question-options">
                        {currentQuestion.options.map((option, index) => (
                          <li key={index} className="probes-faculty-side-question-option">
                            {getOptionLabel(index)}. {option}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Show instruction for subjective questions */}
                    {currentQuestion.questionType === "subjective" && (
                      <p className="probes-faculty-side-question-instruction">Students will provide text answers</p>
                    )}
                  </div>

                  {/* Live Response Summary */}
                  <div className="probes-faculty-side-response-summary">
                    <h5>Live Responses: {statusCounts.answered}</h5>

                    {/* Show analytics only for MCQ */}
                    {currentQuestion.questionType === "mcq" && analytics ? (
                      analytics.responses.map((response, index) => (
                        <div key={index} className="probes-faculty-side-response-item">
                          <span>
                            {getOptionLabel(index)}. {response.count} votes
                          </span>
                          <span>{response.percentage}%</span>
                        </div>
                      ))
                    ) : (
                      <div className="probes-faculty-side-response-waiting">
                        {currentQuestion.questionType === "subjective"
                          ? "View individual responses in the Details tab"
                          : "Waiting for responses..."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="probes-faculty-side-card probes-faculty-side-card-mb">
              <h3 className="probes-faculty-side-analytics-title">Live Answer Summary</h3>

              {/* Show analytics only for MCQ questions */}
              {!analytics || (currentQuestion && currentQuestion.questionType === "subjective") ? (
                <div className="probes-faculty-side-analytics-empty">
                  <BarChart3 className="probes-faculty-side-analytics-icon" />
                  <p>
                    {currentQuestion && currentQuestion.questionType === "subjective"
                      ? "Analytics not available for subjective questions"
                      : "Send an MCQ question to see live analytics"}
                  </p>
                </div>
              ) : (
                <div className="probes-faculty-side-analytics-content">
                  <div className="probes-faculty-side-analytics-header">
                    <h4>Response Distribution</h4>
                    <p>{analytics.totalResponses} responses</p>
                  </div>

                  <div className="probes-faculty-side-analytics-responses">
                    {analytics.responses.map((response, index) => (
                      <div key={index} className="probes-faculty-side-analytics-response">
                        <div className="probes-faculty-side-analytics-response-header">
                          <span className="probes-faculty-side-analytics-response-label">Option {getOptionLabel(index)}</span>
                          <span className="probes-faculty-side-analytics-response-percentage">{response.percentage}%</span>
                        </div>
                        <div className="probes-faculty-side-progress-bar">
                          <div
                            className="probes-faculty-side-progress-fill"
                            style={{ width: `${response.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* AI Teaching Assistant */}
            <div className="probes-faculty-side-card">
              <div className="probes-faculty-side-ai-header">

                <h3 className="probes-faculty-side-engagement-title">AI Teaching Assistant</h3>
                <button className="probes-faculty-side-ai-refresh">
                  <TrendingUp className="probes-faculty-side-ai-refresh-icon" />
                  Refresh Insights
                </button>
              </div>

              <div className="probes-faculty-side-ai-insights">
                <div className="probes-faculty-side-ai-insight">
                  <h5>Engagement Analysis</h5>
                  <p>
                    {statusCounts.answered > 0 && (
                      <span className="probes-faculty-side-text-green">{statusCounts.answered} students actively participating. </span>
                    )}
                    {statusCounts.silent > statusCounts.answered && (
                      <span className="probes-faculty-side-text-orange">Consider engaging silent students. </span>
                    )}
                  </p>
                </div>

                {/* Show insights based on question type */}
                {currentQuestion && (
                  <div className="probes-faculty-side-ai-insight">
                    <h5>Current Question Insights</h5>
                    <ul>
                      <li>• Question Type: {currentQuestion.questionType.toUpperCase()}</li>
                      <li>• Response rate: {Math.round((statusCounts.answered / statusCounts.all) * 100)}%</li>
                      {currentQuestion.questionType === "mcq" && analytics && (
                        <li>
                          • Most popular option: {" "}
                          {analytics.responses.length > 0
                            ? analytics.responses.reduce((a, b) => (a.count > b.count ? a : b)).option
                            : "N/A"}
                        </li>
                      )}
                      <li>• {statusCounts.thinking} students still thinking</li>
                    </ul>
                  </div>
                )}

                {/* Database Integration Status */}
                {/* <div className="probes-faculty-side-ai-insight">
                  <h5>System Status</h5>
                  <ul>
                    <li>• Database: SQL Server Connected</li>
                    <li>• Room ID: {roomId} (faculty_case_assign_dtls_id)</li>
                    <li>• Real-time sync: Active</li>
                  </ul>
                </div> */}


              </div>

            </div>
          
          </div>
        </div>

        {/* Current Question Display */}


        {/* Question Details Modal/Panel - Enhanced for SQL Server */}
        {questionDetails && (
          <div className="probes-faculty-side-card probes-faculty-side-question-details">
            <div className="probes-faculty-side-question-details-header">
              <h3 className="probes-faculty-side-question-details-title">
                <Eye className="probes-faculty-side-question-details-icon" />
                Question Responses ({questionDetails.questionType.toUpperCase()})
              </h3>
              <button onClick={() => setQuestionDetails(null)} className="probes-faculty-side-question-details-close">
                ✕
              </button>
            </div>

            <div className="probes-faculty-side-question-details-summary">
              <h4>Question: {questionDetails.question}</h4>
              <p>Total Responses: {questionDetails.totalResponses}</p>
            </div>

            {/* MCQ Question Details */}
            {questionDetails.questionType === "mcq" && questionDetails.analytics && (
              <div className="probes-faculty-side-mcq-details">
                {questionDetails.analytics.map((optionData, index) => (
                  <div key={index} className="probes-faculty-side-mcq-option">
                    <div className="probes-faculty-side-mcq-option-header">
                      <h5 className="probes-faculty-side-mcq-option-title">
                        {getOptionLabel(index)}. {optionData.option}
                      </h5>
                      <div className="probes-faculty-side-mcq-option-stats">
                        {optionData.count} responses ({optionData.percentage}%)
                      </div>
                    </div>

                    {optionData.students.length > 0 ? (
                      <div className="probes-faculty-side-mcq-students">
                        <h6>Students who selected this option:</h6>
                        <div className="probes-faculty-side-mcq-students-grid">
                          {optionData.students.map((student, studentIndex) => (
                            <div key={studentIndex} className="probes-faculty-side-mcq-student">
                              <div className="probes-faculty-side-mcq-student-name">{student.studentName}</div>
                              <div className="probes-faculty-side-mcq-student-time">
                                Submitted: {new Date(student.submittedAt).toLocaleTimeString()}
                                {student.timeSpent > 0 && ` • Time: ${student.timeSpent}s`}
                              </div>
                              <div className="probes-faculty-side-mcq-student-id">Student ID: {student.studentId}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="probes-faculty-side-mcq-no-students">No students selected this option</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Subjective Question Details */}
            {questionDetails.questionType === "subjective" && questionDetails.responses && (
              <div className="probes-faculty-side-subjective-details">
                <h5 className="probes-faculty-side-subjective-title">Student Text Responses:</h5>
                {questionDetails.responses.map((response, index) => (
                  <div key={index} className="probes-faculty-side-subjective-response">
                    <div className="probes-faculty-side-subjective-response-header">
                      <h6 className="probes-faculty-side-subjective-response-name">{response.studentName}</h6>
                      <div className="probes-faculty-side-subjective-response-time">
                        {new Date(response.submittedAt).toLocaleTimeString()}
                        {response.timeSpent > 0 && ` • ${response.timeSpent}s`}
                      </div>
                    </div>
                    <div className="probes-faculty-side-subjective-response-id">Student ID: {response.studentId}</div>
                    <div className="probes-faculty-side-subjective-response-text">
                      <p>{response.textAnswer}</p>
                    </div>
                  </div>
                ))}

                {questionDetails.responses.length === 0 && (
                  <div className="probes-faculty-side-subjective-no-responses">No responses submitted yet</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )




  // return (
  //   <div className="faculty-probs-result-page-container">

  //     {/* Navigation Tabs */}
  //     <nav className="faculty-probs-result-page-nav">
  //       {[
  //         "Overview",
  //         "Question Management",
  //         "Student Responses",
  //         "Insights",
  //       ].map((tab) => (
  //         <button
  //           key={tab}
  //           className={`faculty-probs-result-page-nav-tab ${
  //             activeTab === tab ? "active" : ""
  //           }`}
  //           onClick={() => setActiveTab(tab)}
  //         >
  //           {tab}
  //         </button>
  //       ))}
  //       <button className="faculty-probs-result-page-footer-btn danger">
  //         <Square size={16} />
  //         End Session
  //       </button>
  //     </nav>

  //     {/* Main Content */}
  //     <main className="faculty-probs-result-page-main">
  //       {/*  Left Panel- Live Question Push */}
  //       <div className="faculty-probs-result-page-left-panel">
  //         <div className="faculty-probs-result-page-section">
  //           <h2 className="faculty-probs-result-page-section-title">
  //             Live Question Push
  //           </h2>

  //           <div className="faculty-probs-result-page-form-group">
  //             <label className="faculty-probs-result-page-label">
  //               Question
  //             </label>
  //             <textarea
  //               className="faculty-probs-result-page-textarea"
  //               placeholder="Type your question here..."
  //               value={currentQuestion}
  //               onChange={(e) => setCurrentQuestion(e.target.value)}
  //             />
  //           </div>
  //           {(responseFormat === "Multiple Choice" ||
  //             responseFormat === "True/False") && (
  //             <div className="faculty-probs-result-page-form-group">
  //               <label className="faculty-probs-result-page-label">
  //                 Options
  //               </label>
  //               <div className="faculty-probs-result-page-item">
  //                 {options.map((opt, idx) => (
  //                   <div
  //                     key={idx}
  //                     className="faculty-probs-result-page-option-row"
  //                     style={{
  //                       display: "flex",
  //                       alignItems: "center",
  //                       marginBottom: "8px",
  //                     }}
  //                   >
  //                     <input
  //                       type="text"
  //                       className="faculty-probs-result-page-input"
  //                       placeholder={`Option ${idx + 1}`}
  //                       value={opt}
  //                       onChange={(e) =>
  //                         handleOptionChange(idx, e.target.value)
  //                       }
  //                       style={{ flex: 1, marginRight: "8px" }}
  //                     />
  //                     {options.length > 2 && (
  //                       <button
  //                         type="button"
  //                         className="faculty-probs-result-page-delete-option-btn"
  //                         onClick={() => deleteOption(idx)}
  //                         style={{
  //                           background: "red",
  //                           color: "white",
  //                           border: "none",
  //                           padding: "4px 8px",
  //                           borderRadius: "4px",
  //                         }}
  //                       >
  //                         Delete
  //                       </button>
  //                     )}
  //                   </div>
  //                 ))}
  //               </div>
  //               {responseFormat === "Multiple Choice" && (
  //                 <button
  //                   type="button"
  //                   onClick={addOptionField}
  //                   className="faculty-probs-result-page-add-option-btn"
  //                   style={{ marginTop: "8px" }}
  //                 >
  //                   + Add Option
  //                 </button>
  //               )}
  //             </div>
  //           )}

  //           <div className="faculty-probs-result-page-form-row">
  //             <div className="faculty-probs-result-page-form-group">
  //               <label className="faculty-probs-result-page-label">
  //                 Response Format
  //               </label>
  //               <select
  //                 className="faculty-probs-result-page-select"
  //                 value={responseFormat}
  //                 onChange={(e) => setResponseFormat(e.target.value)}
  //               >
  //                 <option>Multiple Choice</option>
  //                 <option>Text Response</option>
  //                 <option>True/False</option>
  //               </select>
  //             </div>
  //             <div className="faculty-probs-result-page-form-group">
  //               <button className="faculty-probs-result-page-push-btn">
  //                 Push Question to Class
  //               </button>
  //             </div>
  //           </div>

  //           <div className="faculty-probs-result-page-previous-questions">
  //             <h3 className="faculty-probs-result-page-subsection-title">
  //               Previous Questions
  //             </h3>
  //             {previousQuestions.map((question, index) => (
  //               <div
  //                 key={index}
  //                 className="faculty-probs-result-page-previous-question"
  //               >
  //                 {question}
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //       {/* Center Panel - Student Engagement */}
  //       <div className="faculty-probs-result-page-center-panel">
  //         <div className="faculty-probs-result-page-section">
  //           <div className="faculty-probs-result-page-section-header">
  //             <h2 className="faculty-probs-result-page-section-title">
  //               Student Engagement
  //             </h2>
  //             <div className="faculty-probs-result-page-engagement-stats">
  //               <span className="faculty-probs-result-page-stat answered">
  //                 Answered ({getStatusCount("answered")})
  //               </span>
  //               <span className="faculty-probs-result-page-stat thinking">
  //                 Thinking ({getStatusCount("thinking")})
  //               </span>
  //               <span className="faculty-probs-result-page-stat silent">
  //                 Silent ({getStatusCount("silent")})
  //               </span>
  //               {/* <Filter size={16} /> */}
  //             </div>
  //           </div>

  //           <div className="faculty-probs-result-page-filter-tabs">
  //             {["All", "Answered", "Thinking", "Silent"].map((filter) => (
  //               <button
  //                 key={filter}
  //                 className={`faculty-probs-result-page-filter-tab ${
  //                   selectedFilter === filter ? "active" : ""
  //                 }`}
  //                 onClick={() => setSelectedFilter(filter)}
  //               >
  //                 {filter}
  //               </button>
  //             ))}
  //           </div>

  //           <div className="faculty-probs-result-page-search-container">
  //             <Search
  //               size={16}
  //               className="faculty-probs-result-page-search-icon"
  //             />
  //             <input
  //               type="text"
  //               className="faculty-probs-result-page-search-input"
  //               placeholder="Search students..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //           </div>

  //           <div className="faculty-probs-result-page-student-list">
  //             {filteredStudents.map((student) => (
  //               <div
  //                 key={student.id}
  //                 className="faculty-probs-result-page-student-item"
  //               >
  //                 <img
  //                   src={student.avatar || "/placeholder.svg"}
  //                   alt={student.name}
  //                   className="faculty-probs-result-page-student-avatar"
  //                 />
  //                 <div className="faculty-probs-result-page-student-info">
  //                   <span className="faculty-probs-result-page-student-name">
  //                     {student.name}
  //                   </span>
  //                   <span className="faculty-probs-result-page-student-time">
  //                     {student.time}
  //                   </span>
  //                 </div>
  //                 <div
  //                   className="faculty-probs-result-page-status-indicator"
  //                   style={{
  //                     backgroundColor: getStatusColor(student.status),
  //                   }}
  //                 ></div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //       {/* Right Panel- Live Answer Summary */}
  //       <div className="faculty-probs-result-page-right-panel">
  //         <div className="faculty-probs-result-page-section">
  //           <h2 className="faculty-probs-result-page-section-title">
  //             Live Answer Summary
  //           </h2>

  //           <div className="faculty-probs-result-page-response-distribution">
  //             <h3 className="faculty-probs-result-page-subsection-title">
  //               Response Distribution
  //             </h3>
  //             <div className="faculty-probs-result-page-chart">
  //               {responseData.map((value, index) => (
  //                 <div
  //                   key={index}
  //                   className="faculty-probs-result-page-bar-container"
  //                 >
  //                   <div
  //                     className="faculty-probs-result-page-bar"
  //                     style={{
  //                       height: `${(value / Math.max(...responseData)) * 100}%`,
  //                     }}
  //                   ></div>
  //                   <span className="faculty-probs-result-page-bar-label">
  //                     Option {String.fromCharCode(65 + index)}
  //                   </span>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //           <div className="faculty-probs-result-page-ai-assistant">
  //             <div className="faculty-probs-result-page-ai-header">
  //               <h3 className="faculty-probs-result-page-subsection-title">
  //                 AI Teaching Assistant
  //               </h3>
  //               <button className="faculty-probs-result-page-refresh-btn">
  //                 <RefreshCw size={14} />
  //                 Refresh Insights
  //               </button>
  //             </div>

  //             <div className="faculty-probs-result-page-engagement-analysis">
  //               <h4>Engagement Analysis</h4>
  //               <span className="faculty-probs-result-page-student-count">
  //                 12 students
  //               </span>
  //               <div className="faculty-probs-result-page-donut-chart">
  //                 <div className="faculty-probs-result-page-donut-center">
  //                   <span>85%</span>
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="faculty-probs-result-page-key-insights">
  //               <h4>Key Insights</h4>
  //               {keyInsights.map((insight, index) => (
  //                 <div
  //                   key={index}
  //                   className="faculty-probs-result-page-insight-item"
  //                 >
  //                   <Sparkles size={12} />
  //                   <span>{insight}</span>
  //                 </div>
  //               ))}
  //             </div>

  //             <div className="faculty-probs-result-page-insightful-responses">
  //               <h4>Insightful Responses</h4>
  //               {insightfulResponses.map((response, index) => (
  //                 <div
  //                   key={index}
  //                   className="faculty-probs-result-page-response-item"
  //                 >
  //                   <div className="faculty-probs-result-page-response-header">
  //                     <span className="faculty-probs-result-page-response-name">
  //                       {response.name}
  //                     </span>
  //                     <button className="faculty-probs-result-page-ai-insight-btn">
  //                       <Sparkles size={12} />
  //                       AI Insight
  //                     </button>
  //                   </div>
  //                   <p className="faculty-probs-result-page-response-text">
  //                     {response.text}
  //                   </p>
  //                   {index === 0 && (
  //                     <button className="faculty-probs-result-page-highlight-btn">
  //                       Highlight
  //                     </button>
  //                   )}
  //                 </div>
  //               ))}
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </main>


  //   </div>
  // );
}
