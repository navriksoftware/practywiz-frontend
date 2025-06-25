import { useState, useEffect, useMemo } from "react"
import {
    Search,
    Calendar,
    Users,
    Clock,
    Filter,
    Bell,
    Settings,
    BarChart3,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
    Download,
    Square,
    Sparkles,
    Grid3X3,
} from "lucide-react"
import "../DashboardCSS/FacultyProbeDashboard.css"
// Dummy data
const dummyStudents = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40", status: "answered", time: "2m ago" },
    { id: 2, name: "Maria Garcia", avatar: "/placeholder.svg?height=40&width=40", status: "thinking", time: "Typing..." },
    { id: 3, name: "James Wilson", avatar: "/placeholder.svg?height=40&width=40", status: "silent", time: "No activity" },
    { id: 4, name: "Emily Chen", avatar: "/placeholder.svg?height=40&width=40", status: "answered", time: "2m ago" },
    { id: 5, name: "David Kim", avatar: "/placeholder.svg?height=40&width=40", status: "thinking", time: "Typing..." },
    { id: 6, name: "Sarah Williams", avatar: "/placeholder.svg?height=40&width=40", status: "answered", time: "2m ago" },
    {
        id: 7,
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "silent",
        time: "No activity",
    },
    { id: 8, name: "Lisa Taylor", avatar: "/placeholder.svg?height=40&width=40", status: "answered", time: "2m ago" },
    {
        id: 9,
        name: "Robert Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "thinking",
        time: "Typing...",
    },
    { id: 10, name: "Jennifer Lee", avatar: "/placeholder.svg?height=40&width=40", status: "answered", time: "2m ago" },
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
]

const previousQuestions = [
    "What are the key market segments identified in the case?",
    "How would you evaluate the company's pricing strategy?",
    "What external factors might impact the marketing plan?",
]

const responseData = [12, 8, 5, 3]
const keyInsights = [
    "Students understand the market segmentation concept well",
    "Financial analysis aspects need more clarification",
    "Several students identified future technology risks",
]

const insightfulResponses = [
    {
        name: "Alex Johnson",
        text: "The case demonstrates how market segmentation directly influenced the company's ability to target specific customer needs.",
    },
    {
        name: "Emily Chen",
        text: "I noticed that the financial analysis overlooked potential market volatility factors that could impact long-term strategy.",
    },
]

export default function FacultyProbsResultPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
    const [selectedFilter, setSelectedFilter] = useState("All")
    const [questionCategory, setQuestionCategory] = useState("Fact")
    const [responseFormat, setResponseFormat] = useState("Multiple Choice")
    const [responseTimer, setResponseTimer] = useState("No Timer")
    const [currentQuestion, setCurrentQuestion] = useState("")
    const [activeTab, setActiveTab] = useState("Question Management")

    // Debounce search functionality
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm])

    // Filter students based on search and filter
    const filteredStudents = useMemo(() => {
        let filtered = dummyStudents

        if (debouncedSearchTerm) {
            filtered = filtered.filter((student) => student.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        }

        if (selectedFilter !== "All") {
            filtered = filtered.filter((student) => student.status === selectedFilter.toLowerCase())
        }

        return filtered
    }, [debouncedSearchTerm, selectedFilter])

    const getStatusColor = (status) => {
        switch (status) {
            case "answered":
                return "#10B981"
            case "thinking":
                return "#F59E0B"
            case "silent":
                return "#EF4444"
            default:
                return "#6B7280"
        }
    }

    const getStatusCount = (status) => {
        return dummyStudents.filter((student) => student.status === status).length
    }

    const [options, setOptions] = useState(["", ""]); // Start with 2 empty options
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


    return (
        <div className="faculty-probs-result-page-container">
            {/* Header */}
            {/* <header className="faculty-probs-result-page-header">
        <div className="faculty-probs-result-page-header-left">
          <div className="faculty-probs-result-page-logo">
            <Grid3X3 size={24} />
            <span>Avega Platform</span>
          </div>
          <div className="faculty-probs-result-page-breadcrumb">Faculty Teaching Panel</div>
        </div>
        <div className="faculty-probs-result-page-header-right">
          <button className="faculty-probs-result-page-live-class-btn">Live Class Panel</button>
          <button className="faculty-probs-result-page-case-dashboard-btn">Case Dashboard</button>
          <div className="faculty-probs-result-page-notification">
            <Bell size={20} />
            <span className="faculty-probs-result-page-notification-badge">1</span>
          </div>
          <Settings size={20} />
          <div className="faculty-probs-result-page-profile">
            <img src="/placeholder.svg?height=32&width=32" alt="Profile" />
            <div className="faculty-probs-result-page-profile-info">
              <span className="faculty-probs-result-page-profile-name">Prof. Sarah Miller</span>
              <span className="faculty-probs-result-page-profile-role">Business School</span>
            </div>
          </div>
        </div>
      </header> */}

            {/* Course Header */}

            <div className="faculty-probs-result-page-course-header">
                <div className="faculty-probs-result-page-header-row">
                    <h1 className="faculty-probs-result-page-course-title">Marketing Strategy Case Study 101</h1>
                    <div className="faculty-probs-result-page-course-meta">
                        <div className="faculty-probs-result-page-meta-item">
                            <Calendar size={16} />
                            <span>Oct 15, 2023</span>
                        </div>
                        <div className="faculty-probs-result-page-meta-item">
                            <Users size={16} />
                            <span>MBA Batch 2023, Marketing 301</span>
                        </div>
                        <div className="faculty-probs-result-page-meta-item">
                            <Clock size={16} />
                            <span>Session: 1h 15m</span>
                        </div>
                    </div>
                </div>
                <button className="faculty-probs-result-page-footer-btn danger">
                    <Square size={16} />
                    End Session
                </button>
            </div>

            {/* Navigation Tabs */}
            <nav className="faculty-probs-result-page-nav">
                {["Overview", "Question Management", "Student Responses", "Insights"].map((tab) => (
                    <button
                        key={tab}
                        className={`faculty-probs-result-page-nav-tab ${activeTab === tab ? "active" : ""}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            {/* Main Content */}
            <main className="faculty-probs-result-page-main">
                {/*  Left Panel- Live Question Push */}
                <div className="faculty-probs-result-page-left-panel">
                    <div className="faculty-probs-result-page-section">
                        <h2 className="faculty-probs-result-page-section-title">Live Question Push</h2>

                        <div className="faculty-probs-result-page-form-group">
                            <label className="faculty-probs-result-page-label">Question</label>
                            <textarea
                                className="faculty-probs-result-page-textarea"
                                placeholder="Type your question here..."
                                value={currentQuestion}
                                onChange={(e) => setCurrentQuestion(e.target.value)}
                            />
                        </div>
                        {(responseFormat === "Multiple Choice" || responseFormat === "True/False") && (
                            <div className="faculty-probs-result-page-form-group">
                                <label className="faculty-probs-result-page-label">Options</label>
                                <div className="faculty-probs-result-page-item">
                                    {options.map((opt, idx) => (
                                        <div
                                            key={idx}
                                            className="faculty-probs-result-page-option-row"
                                            style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
                                        >
                                            <input
                                                type="text"
                                                className="faculty-probs-result-page-input"
                                                placeholder={`Option ${idx + 1}`}
                                                value={opt}
                                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                                style={{ flex: 1, marginRight: '8px' }}
                                            />
                                            {options.length > 2 && (
                                                <button
                                                    type="button"
                                                    className="faculty-probs-result-page-delete-option-btn"
                                                    onClick={() => deleteOption(idx)}
                                                    style={{ background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                {responseFormat === "Multiple Choice" && (
                                    <button
                                        type="button"
                                        onClick={addOptionField}
                                        className="faculty-probs-result-page-add-option-btn"
                                        style={{ marginTop: '8px' }}
                                    >
                                        + Add Option
                                    </button>
                                )}
                            </div>
                        )}


                        <div className="faculty-probs-result-page-form-row">
                            <div className="faculty-probs-result-page-form-group">
                                <label className="faculty-probs-result-page-label">Response Format</label>
                                <select
                                    className="faculty-probs-result-page-select"
                                    value={responseFormat}
                                    onChange={(e) => setResponseFormat(e.target.value)}
                                >
                                    <option>Multiple Choice</option>
                                    <option>Text Response</option>
                                    <option>True/False</option>
                                </select>
                            </div>
                            <div className="faculty-probs-result-page-form-group">
                                <button className="faculty-probs-result-page-push-btn">Push Question to Class</button>
                            </div>
                        </div>





                        <div className="faculty-probs-result-page-previous-questions">
                            <h3 className="faculty-probs-result-page-subsection-title">Previous Questions</h3>
                            {previousQuestions.map((question, index) => (
                                <div key={index} className="faculty-probs-result-page-previous-question">
                                    {question}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Center Panel - Student Engagement */}
                <div className="faculty-probs-result-page-center-panel">
                    <div className="faculty-probs-result-page-section">
                        <div className="faculty-probs-result-page-section-header">
                            <h2 className="faculty-probs-result-page-section-title">Student Engagement</h2>
                            <div className="faculty-probs-result-page-engagement-stats">
                                <span className="faculty-probs-result-page-stat answered">Answered ({getStatusCount("answered")})</span>
                                <span className="faculty-probs-result-page-stat thinking">Thinking ({getStatusCount("thinking")})</span>
                                <span className="faculty-probs-result-page-stat silent">Silent ({getStatusCount("silent")})</span>
                                {/* <Filter size={16} /> */}
                            </div>
                        </div>

                        <div className="faculty-probs-result-page-filter-tabs">
                            {["All", "Answered", "Thinking", "Silent"].map((filter) => (
                                <button
                                    key={filter}
                                    className={`faculty-probs-result-page-filter-tab ${selectedFilter === filter ? "active" : ""}`}
                                    onClick={() => setSelectedFilter(filter)}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>

                        <div className="faculty-probs-result-page-search-container">
                            <Search size={16} className="faculty-probs-result-page-search-icon" />
                            <input
                                type="text"
                                className="faculty-probs-result-page-search-input"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="faculty-probs-result-page-student-list">
                            {filteredStudents.map((student) => (
                                <div key={student.id} className="faculty-probs-result-page-student-item">
                                    <img
                                        src={student.avatar || "/placeholder.svg"}
                                        alt={student.name}
                                        className="faculty-probs-result-page-student-avatar"
                                    />
                                    <div className="faculty-probs-result-page-student-info">
                                        <span className="faculty-probs-result-page-student-name">{student.name}</span>
                                        <span className="faculty-probs-result-page-student-time">{student.time}</span>
                                    </div>
                                    <div
                                        className="faculty-probs-result-page-status-indicator"
                                        style={{ backgroundColor: getStatusColor(student.status) }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Right Panel- Live Answer Summary */}
                <div className="faculty-probs-result-page-right-panel">
                    <div className="faculty-probs-result-page-section">
                        <h2 className="faculty-probs-result-page-section-title">Live Answer Summary</h2>

                        <div className="faculty-probs-result-page-response-distribution">
                            <h3 className="faculty-probs-result-page-subsection-title">Response Distribution</h3>
                            <div className="faculty-probs-result-page-chart">
                                {responseData.map((value, index) => (
                                    <div key={index} className="faculty-probs-result-page-bar-container">
                                        <div
                                            className="faculty-probs-result-page-bar"
                                            style={{ height: `${(value / Math.max(...responseData)) * 100}%` }}
                                        ></div>
                                        <span className="faculty-probs-result-page-bar-label">
                                            Option {String.fromCharCode(65 + index)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="faculty-probs-result-page-ai-assistant">
                            <div className="faculty-probs-result-page-ai-header">
                                <h3 className="faculty-probs-result-page-subsection-title">AI Teaching Assistant</h3>
                                <button className="faculty-probs-result-page-refresh-btn">
                                    <RefreshCw size={14} />
                                    Refresh Insights
                                </button>
                            </div>

                            <div className="faculty-probs-result-page-engagement-analysis">
                                <h4>Engagement Analysis</h4>
                                <span className="faculty-probs-result-page-student-count">12 students</span>
                                <div className="faculty-probs-result-page-donut-chart">
                                    <div className="faculty-probs-result-page-donut-center">
                                        <span>85%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="faculty-probs-result-page-key-insights">
                                <h4>Key Insights</h4>
                                {keyInsights.map((insight, index) => (
                                    <div key={index} className="faculty-probs-result-page-insight-item">
                                        <Sparkles size={12} />
                                        <span>{insight}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="faculty-probs-result-page-insightful-responses">
                                <h4>Insightful Responses</h4>
                                {insightfulResponses.map((response, index) => (
                                    <div key={index} className="faculty-probs-result-page-response-item">
                                        <div className="faculty-probs-result-page-response-header">
                                            <span className="faculty-probs-result-page-response-name">{response.name}</span>
                                            <button className="faculty-probs-result-page-ai-insight-btn">
                                                <Sparkles size={12} />
                                                AI Insight
                                            </button>
                                        </div>
                                        <p className="faculty-probs-result-page-response-text">{response.text}</p>
                                        {index === 0 && <button className="faculty-probs-result-page-highlight-btn">Highlight</button>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Footer Navigation */}
            {/* <footer className="faculty-probs-result-page-footer">
        <button className="faculty-probs-result-page-footer-btn secondary">
          <ChevronLeft size={16} />
          Previous Question
        </button>
        <button className="faculty-probs-result-page-footer-btn primary">
          Next Question
          <ChevronRight size={16} />
        </button>
        <div className="faculty-probs-result-page-footer-actions">
          <button className="faculty-probs-result-page-footer-btn secondary">
            <BarChart3 size={16} />
            View Analytics
          </button>
          <button className="faculty-probs-result-page-footer-btn secondary">
            <Download size={16} />
            Export Summary
          </button>
          <button className="faculty-probs-result-page-footer-btn danger">
            <Square size={16} />
            End Session
          </button>
        </div>
      </footer> */}
        </div >
    )
}
