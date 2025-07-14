"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ApiURL } from "../../../../../Utils/ApiURL"
import axios from "axios"
import formatDate from "../../../../../Utils/FormatDate.js"
import { Home, CheckCircle, AlertTriangle, TrendingUp, ChevronLeft } from "lucide-react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import "./case-study-review.css"

const COLORS = ["#3B82F6", "#10B981"] // Blue for Analysis, Green for Fact

const CaseStudyReview = () => {
    const { Mid, ACid } = useParams()
    const [singleData, setSingleData] = useState([])
    const [factDetails, setFactDetails] = useState([])
    const [analysisDetails, setAnalysisDetails] = useState({ questions: [] })
    const [researchDetails, setResearchDetails] = useState([])
    const [activeTab, setActiveTab] = useState("fact")
    const [totalObtained, setTotalObtained] = useState(0)
    const [totalMax, setTotalMax] = useState(0)
    const [loading, setLoading] = useState(false);
    const url = ApiURL()

    const fetchSingleAssessmentDtls = async () => {
        try {
            setLoading(true);
            const response = await Promise.race([
                axios.post(`${url}api/v1/faculty/dashboard/single-assessment-details`, {
                    MenteeId: Mid,
                    FacultyAssignId: ACid,
                }),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 45000)),
            ])
            if (response.data.success) {
                setSingleData(response.data.success[0])
                console.log(response.data.success[0])
            } else if (response.data.error) {
                setSingleData([])
            }
        } catch (error) {
            setSingleData([])
            console.log("An error occurred. Please try again.", error)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSingleAssessmentDtls()
    }, [url])

    useEffect(() => {
        if (singleData?.mentee_result_fact_details) {
            try {
                const parsedFact = JSON.parse(singleData.mentee_result_fact_details)
                setFactDetails(Array.isArray(parsedFact) ? parsedFact : [])
            } catch {
                setFactDetails([])
            }
        }
        if (singleData?.mentee_result_analysis_details) {
            try {
                const parsedAnalysis = JSON.parse(singleData.mentee_result_analysis_details)
                setAnalysisDetails({
                    ...parsedAnalysis,
                    questions: Array.isArray(parsedAnalysis.questions) ? parsedAnalysis.questions : [],
                })
            } catch {
                setAnalysisDetails({ questions: [] })
            }
        }
        if (singleData?.mentee_result_research_details) {
            try {
                const parsedResearch = JSON.parse(singleData.mentee_result_research_details)
                setResearchDetails(Array.isArray(parsedResearch) ? parsedResearch : [])
            } catch {
                setResearchDetails([])
            }
        }
    }, [singleData])

    useEffect(() => {
        calculateCombinedMarks(factDetails, analysisDetails.questions)
    }, [factDetails, analysisDetails.questions])

    const calculateCombinedMarks = (factQuestions, analysisQuestions) => {
        let obtainedSum = 0
        let maxSum = 0
        const allQuestions = [...factQuestions, ...analysisQuestions]
        allQuestions.forEach((q) => {
            const obtained = Number(q.obtainedMark)
            const max = Number(q.maxMark)
            if (!isNaN(obtained)) obtainedSum += obtained
            if (!isNaN(max)) maxSum += max
        })
        setTotalObtained(obtainedSum)
        setTotalMax(maxSum)
    }

    const handleScoreUpdate = (type, index, field, value) => {
        const update = (data) => data.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        if (type === "fact") {
            setFactDetails((prev) => update(prev))
        } else if (type === "analysis") {
            setAnalysisDetails((prev) => ({
                ...prev,
                questions: update(prev.questions || []),
            }))
        }
    }

    const handleSubmit = async () => {
        const validateMarks = (details, type) => {
            for (let i = 0; i < details.length; i++) {
                const item = details[i]
                const obtained = item.obtainedMark
                const max = item.maxMark
                if (obtained === "" || obtained === null || obtained === undefined) {
                    alert(`${type} - Q${i + 1}: Obtained mark cannot be empty`)
                    return false
                }
                if (isNaN(obtained) || Number(obtained) > Number(max)) {
                    alert(`${type} - Q${i + 1}: Obtained mark must be a number and not exceed Max mark (${max})`)
                    return false
                }
            }
            return true
        }

        const isAnalysisValid = validateMarks(analysisDetails.questions, "Analysis")

        if (!isAnalysisValid) {
            return // Stop submission if validation fails
        }

        const payload = {
            menteeId: Mid,
            AssignId: ACid,
            factDetails,
            analysisDetails,
            researchDetails,
            updateTotalMarks,
            totalMax,
        }

        try {
            const response = await Promise.race([
                axios.post(`${url}api/v1/faculty/dashboard/single-Student-assessment/update`, payload),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), 45000)),
            ])
            if (response.data.success) {
                console.log("Scores updated successfully:", response.data.success)
                fetchSingleAssessmentDtls()
                alert("Scores updated successfully!")
            }
        } catch (error) {
            console.log("An error occurred. Please try again.", error)
            alert("Error updating scores. Please try again.")
        }
    }

    // Calculate chart data
    const factObtained = factDetails.reduce((sum, q) => sum + Number(q.obtainedMark || 0), 0)
    const analysisObtained = analysisDetails.questions.reduce((sum, q) => sum + Number(q.obtainedMark || 0), 0)
    const updateTotalMarks = factDetails.reduce((sum, q) => sum + Number(q.obtainedMark || 0), 0) + analysisDetails.questions.reduce((sum, q) => sum + Number(q.obtainedMark || 0), 0)



    const chartData = [
        {
            name: "Analysis Questions",
            value: analysisObtained,
            percentage: totalObtained ? Math.round((analysisObtained / totalObtained) * 100) : 0,
        },
        {
            name: "Fact Questions",
            value: factObtained,
            percentage: totalObtained ? Math.round((factObtained / totalObtained) * 100) : 0,
        },
    ]

    useEffect(() => {
        // Set default active tab based on available data
        if (factDetails.length > 0) {
            setActiveTab("fact")
        } else if (analysisDetails.questions.length > 0) {
            setActiveTab("analysis")
        } else if (researchDetails.length > 0) {
            setActiveTab("research")
        }
    }, [factDetails, analysisDetails.questions, researchDetails])

    console.log(analysisDetails)
    return (<>
        {loading ? (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading ...</p>
            </div>
        ) :
            <div className="result-page-single-details-container">
                {/* Header */}
                <div className="result-page-single-details-header">
                    <div className="result-page-single-details-breadcrumb">
                        <ChevronLeft className="result-page-single-details-back-icon" />
                        <Home className="result-page-single-details-home-icon" />
                        <span>Dashboard</span>
                        <span>/</span>
                        <span>Case Studies</span>
                        <span>/</span>
                        <span className="result-page-single-details-current">Student Review</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="result-page-single-details-main">
                    <h1 className="result-page-single-details-title">{singleData?.case_study_title}</h1>

                    <div className="result-page-single-details-layout">
                        {/* Left Column */}
                        <div className="result-page-single-details-left-column">
                            {/* Performance Breakdown */}
                            <div className="result-page-single-details-card">
                                <h2 className="result-page-single-details-card-title">Performance Breakdown</h2>
                                <div className="result-page-single-details-score-display">
                                    <div className="result-page-single-details-score-large">
                                        {singleData?.mentee_result_total_score || updateTotalMarks}/{totalMax}
                                    </div>
                                    <div className="result-page-single-details-status">
                                        <span className="result-page-single-details-status-badge">Submitted</span>
                                        <span className="result-page-single-details-last-updated">
                                            Last updated: {formatDate(singleData?.mentee_result_update_date)}
                                        </span>
                                    </div>
                                </div>

                                <div className="result-page-single-details-chart-container">
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="result-page-single-details-chart-legend">
                                        <div className="result-page-single-details-legend-item">
                                            <div className="result-page-single-details-legend-color result-page-single-details-legend-fact"></div>
                                            <span>Fact Questions: {chartData[1]?.percentage || 0}%</span>
                                        </div>
                                        <div className="result-page-single-details-legend-item">
                                            <div className="result-page-single-details-legend-color result-page-single-details-legend-analysis"></div>
                                            <span>Analysis Questions: {chartData[0]?.percentage || 0}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Student Information */}
                            <div className="result-page-single-details-card">
                                <h2 className="result-page-single-details-card-title">Student Information</h2>
                                <div className="result-page-single-details-info-grid">
                                    <div className="result-page-single-details-info-item">
                                        <span className="result-page-single-details-info-label">Student Name</span>
                                        <span className="result-page-single-details-info-value">{singleData?.user_firstname}</span>
                                    </div>
                                    <div className="result-page-single-details-info-item">
                                        <span className="result-page-single-details-info-label">Roll Number</span>
                                        <span className="result-page-single-details-info-value">{singleData?.mentee_roll_no}</span>
                                    </div>
                                    <div className="result-page-single-details-info-item">
                                        <span className="result-page-single-details-info-label">Class Name</span>
                                        <span className="result-page-single-details-info-value">{singleData?.class_name}</span>
                                    </div>
                                    <div className="result-page-single-details-info-item">
                                        <span className="result-page-single-details-info-label">Subject Code</span>
                                        <span className="result-page-single-details-info-value">{singleData?.class_subject_code}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Details */}
                            <div className="result-page-single-details-card">
                                <h2 className="result-page-single-details-card-title">Case Study Details</h2>
                                <div className="result-page-single-details-info-grid">
                                    <div className="result-page-single-details-info-item result-page-single-details-info-item-full">
                                        <span className="result-page-single-details-info-label">Case Study Title</span>
                                        <span className="result-page-single-details-info-value">{singleData?.case_study_title}</span>
                                    </div>
                                    <div className="result-page-single-details-info-item result-page-single-details-info-item-full">
                                        <span className="result-page-single-details-info-label">Categories</span>
                                        <div className="result-page-single-details-tags">
                                            <span className="result-page-single-details-tag result-page-single-details-tag-blue">
                                                Team Collaboration
                                            </span>
                                            <span className="result-page-single-details-tag result-page-single-details-tag-purple">
                                                Problem Solving
                                            </span>
                                            <span className="result-page-single-details-tag result-page-single-details-tag-green">
                                                Knowledge Sharing
                                            </span>
                                        </div>
                                    </div>
                                    <div className="result-page-single-details-info-item result-page-single-details-info-item-full">
                                        <span className="result-page-single-details-info-label">Review Period</span>
                                        <div className="result-page-single-details-date-range">
                                            <div>
                                                <span className="result-page-single-details-date-label">Start</span>
                                                <span className="result-page-single-details-date-value">
                                                    {formatDate(singleData?.faculty_case_assign_start_date)}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="result-page-single-details-date-label">End</span>
                                                <span className="result-page-single-details-date-value">
                                                    {formatDate(singleData?.faculty_case_assign_end_date)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="result-page-single-details-right-column">
                            {/* Score Summary */}
                            <div className="result-page-single-details-card">
                                <h2 className="result-page-single-details-card-title">Score Summary</h2>
                                {/* <div className="result-page-single-details-score-summary">
                                <div className="result-page-single-details-score-large">
                                    {updateTotalMarks}/{totalMax}
                                </div>
                                <div className="result-page-single-details-status">
                                    <span className="result-page-single-details-status-badge">Submitted</span>
                                    <span className="result-page-single-details-last-updated">
                                        Last updated: {formatDate(singleData?.mentee_result_update_date)}
                                    </span>
                                </div>
                            </div> */}

                                {singleData?.mentee_result_analysis_details &&
                                    (() => {
                                        try {
                                            const parsedDetails = JSON.parse(singleData.mentee_result_analysis_details)
                                            return <p className="result-page-single-details-performance-text">{parsedDetails.performance}</p>
                                        } catch (error) {
                                            return <p>Error parsing performance feedback.</p>
                                        }
                                    })()}
                            </div>

                            {/* Question Tabs */}
                            <div className="result-page-single-details-card">
                                <div className="result-page-single-details-tabs">
                                    {factDetails.length > 0 && <button
                                        className={`result-page-single-details-tab ${activeTab === "fact" ? "result-page-single-details-tab-active" : ""}`}
                                        onClick={() => setActiveTab("fact")}
                                    >
                                        Fact Questions ({factDetails.length})
                                    </button>}
                                    {analysisDetails.questions.length > 0 && <button
                                        className={`result-page-single-details-tab ${activeTab === "analysis" ? "result-page-single-details-tab-active" : ""}`}
                                        onClick={() => setActiveTab("analysis")}
                                    >
                                        Analysis Questions ({analysisDetails.questions.length})
                                    </button>}

                                    {researchDetails.length > 0 && <button
                                        className={`result-page-single-details-tab ${activeTab === "research" ? "result-page-single-details-tab-active" : ""}`}
                                        onClick={() => setActiveTab("research")}
                                    >
                                        Research Questions ({researchDetails.length})
                                    </button>}
                                </div>

                                <div className="result-page-single-details-tab-content">
                                    {activeTab === "fact" && <> {factDetails.length > 0 ? (
                                        <>
                                            {factDetails.map((question, index) => (
                                                <div key={index} className="result-page-single-details-question">
                                                    <div className="result-page-single-details-question-header">
                                                        <h3 className="result-page-single-details-question-title">
                                                            Question {index + 1}
                                                        </h3>
                                                        <span className="result-page-single-details-question-score">
                                                            {question?.isCorrect ? question?.maxMark : 0}/{question?.maxMark}
                                                        </span>
                                                    </div>

                                                    <p className="result-page-single-details-question-text">
                                                        {question?.Question}
                                                    </p>

                                                    <div className="result-page-single-details-answer-box">
                                                        {question?.userAnswer}
                                                    </div>

                                                    <div className="result-page-single-details-question-status">
                                                        <CheckCircle
                                                            className={`result-page-single-details-status-icon ${question?.isCorrect
                                                                ? "result-page-single-details-correct"
                                                                : "result-page-single-details-incorrect"
                                                                }`}
                                                        />
                                                        <span className="result-page-single-details-status-text">
                                                            {question?.isCorrect ? "Correct" : "Incorrect answer provided."}
                                                        </span>
                                                    </div>

                                                    <div className="result-page-single-details-feedback-row">
                                                        <div className="result-page-single-details-feedback-item result-page-single-details-strengths">
                                                            <TrendingUp className="result-page-single-details-feedback-icon" />
                                                            <div>
                                                                <span className="result-page-single-details-feedback-label">
                                                                    Strengths
                                                                </span>
                                                                <p className="result-page-single-details-feedback-text">
                                                                    {question?.strength || "Strong factual recall"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="result-page-single-details-feedback-item result-page-single-details-improvements">
                                                            <AlertTriangle className="result-page-single-details-feedback-icon" />
                                                            <div>
                                                                <span className="result-page-single-details-feedback-label">
                                                                    Areas to Improve
                                                                </span>
                                                                <p className="result-page-single-details-feedback-text">
                                                                    {question?.areaToImprove || "None"}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="result-page-single-details-no-questions">
                                            No Fact Questions available.
                                        </div>
                                    )
                                    } </>}


                                    {activeTab === "analysis" &&
                                        analysisDetails.questions.map((question, index) => (
                                            <div key={index} className="result-page-single-details-question">
                                                <div className="result-page-single-details-question-header">
                                                    <h3 className="result-page-single-details-question-title">Question {index + 1}</h3>
                                                    <span className="result-page-single-details-question-score">
                                                        {question?.obtainedMark}/{question?.maxMark}
                                                    </span>
                                                </div>
                                                <p className="result-page-single-details-question-text">{question?.Question}</p>
                                                <div className="result-page-single-details-answer-box">{question?.userAnswer}</div>
                                                <div className="result-page-single-details-question-status">
                                                    <CheckCircle className="result-page-single-details-status-icon result-page-single-details-correct" />
                                                    <span className="result-page-single-details-status-text">{question?.feedback}</span>
                                                </div>
                                                <div className="result-page-single-details-feedback-row">
                                                    <div className="result-page-single-details-feedback-item result-page-single-details-strengths">
                                                        <TrendingUp className="result-page-single-details-feedback-icon" />
                                                        <div>
                                                            <span className="result-page-single-details-feedback-label">Strengths</span>
                                                            <p className="result-page-single-details-feedback-text">{question?.strengths}</p>
                                                        </div>
                                                    </div>
                                                    <div className="result-page-single-details-feedback-item result-page-single-details-improvements">
                                                        <AlertTriangle className="result-page-single-details-feedback-icon" />
                                                        <div>
                                                            <span className="result-page-single-details-feedback-label">Areas to Improve</span>
                                                            <p className="result-page-single-details-feedback-text">{question?.areaToImprove}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Score Update Section */}
                                                <div className="result-page-single-details-score-update">
                                                    <div className="result-page-single-details-score-inputs">
                                                        <div className="result-page-single-details-score-input-group">
                                                            <label className="result-page-single-details-score-label">Gained Score</label>
                                                            <input
                                                                type="number"
                                                                value={question?.obtainedMark}
                                                                onChange={(e) => handleScoreUpdate("analysis", index, "obtainedMark", e.target.value)}
                                                                className="result-page-single-details-score-input"
                                                                min="0"
                                                                max={question?.maxMark}
                                                            />
                                                        </div>
                                                        <span className="result-page-single-details-score-divider">/</span>
                                                        <div className="result-page-single-details-score-input-group">
                                                            <label className="result-page-single-details-score-label">Total Score</label>
                                                            <input
                                                                type="number"
                                                                value={question?.maxMark}

                                                                className="result-page-single-details-score-input"
                                                                min="1"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    {activeTab === "research" && <>{researchDetails.length > 0 ? <>
                                        {researchDetails.map((question, index) => (
                                            <div key={index} className="result-page-single-details-question">
                                                <div className="result-page-single-details-question-header">
                                                    <h3 className="result-page-single-details-question-title">Question {index + 1}</h3>
                                                    <span className="result-page-single-details-question-score">
                                                        {question?.isCorrect ? question?.maxMark : 0}/{question?.maxMark}
                                                    </span>
                                                </div>
                                                <p className="result-page-single-details-question-text">{question?.Question}</p>
                                                <div className="result-page-single-details-answer-box">{question?.userAnswer}</div>
                                                <div className="result-page-single-details-question-status">
                                                    <CheckCircle
                                                        className={`result-page-single-details-status-icon ${question?.isCorrect ? "result-page-single-details-correct" : "result-page-single-details-incorrect"}`}
                                                    />
                                                    <span className="result-page-single-details-status-text">
                                                        {question?.isCorrect ? "Correct" : "Incorrect answer provided."}
                                                    </span>
                                                </div>
                                                <div className="result-page-single-details-feedback-row">
                                                    <div className="result-page-single-details-feedback-item result-page-single-details-strengths">
                                                        <TrendingUp className="result-page-single-details-feedback-icon" />
                                                        <div>
                                                            <span className="result-page-single-details-feedback-label">Strengths</span>
                                                            <p className="result-page-single-details-feedback-text">
                                                                {question?.strength || "Strong factual recall"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="result-page-single-details-feedback-item result-page-single-details-improvements">
                                                        <AlertTriangle className="result-page-single-details-feedback-icon" />
                                                        <div>
                                                            <span className="result-page-single-details-feedback-label">Areas to Improve</span>
                                                            <p className="result-page-single-details-feedback-text">
                                                                {question?.areaToImprove || "None"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </>
                                        : (
                                            <div className="result-page-single-details-no-questions">
                                                No Research Questions available.
                                            </div>
                                        )
                                    }</>}


                                </div>
                            </div>

                            {/* Update Button - Only show on Analysis tab */}
                            {activeTab === "analysis" && (
                                <div className="result-page-single-details-actions">
                                    <button className="result-page-single-details-update-btn" onClick={handleSubmit}>
                                        Update Scores
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        }</>
    )
}

export default CaseStudyReview
