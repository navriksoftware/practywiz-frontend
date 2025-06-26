import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiURL } from "../../../../../Utils/ApiURL";
import axios from "axios";
import formatDate from "../../../../../Utils/FormatDate.js"; // Assuming you have a utility function for date formatting
import { Home, CheckCircle, AlertTriangle, TrendingUp, Divide, Star } from 'lucide-react';
import '../DashboardCSS/TestAssessmentpage.css'; // Adjust the path as necessary
import "../DashboardCSS/SingleStudentAssessmentPage.css";
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d"]; // analysis, fact

const TestAssessmentPage = () => {
    const { Mid, ACid } = useParams();

    console.log(Mid, ACid);
    const [singleData, setsingleData] = useState([]);
    const url = ApiURL();

    const fetchSingleAssessmentDtls = async () => {
        try {
            const response = await Promise.race([
                axios.post(`${url}api/v1/faculty/dashboard/single-assessment-details`, {
                    MenteeId: Mid,
                    FacultyAssignId: ACid,
                }),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), 45000)
                ),
            ]);

            if (response.data.success) {
                setsingleData(response.data.success[0]);
                console.log("response.data.success[0]", response.data.success[0]);
            } else if (response.data.error) {
                setsingleData([]);
            }
        } catch (error) {
            setsingleData([]);

            if (error.message === "Request timed out") {
                console.log("Request timed out. Please try again.");
            } else {
                console.log("An error occurred. Please try again.", error);
            }
        } finally {
        }
    };

    useEffect(() => {
        fetchSingleAssessmentDtls();
    }, [url]);

    const [factDetails, setFactDetails] = useState([]);
    const [analysisDetails, setAnalysisDetails] = useState({ questions: [] }); // initialize with an object, as your code expects analysisDetails.questions
    const [researchDetails, setResearchDetails] = useState([]);

    useEffect(() => {
        if (singleData?.mentee_result_fact_details) {
            try {
                const parsedFact = JSON.parse(singleData.mentee_result_fact_details);
                setFactDetails(Array.isArray(parsedFact) ? parsedFact : []);
            } catch {
                setFactDetails([]);
            }
        }

        if (singleData?.mentee_result_analysis_details) {
            try {
                const parsedAnalysis = JSON.parse(
                    singleData.mentee_result_analysis_details
                );
                // ensure parsedAnalysis has questions array to prevent errors
                setAnalysisDetails({
                    ...parsedAnalysis,
                    questions: Array.isArray(parsedAnalysis.questions)
                        ? parsedAnalysis.questions
                        : [],
                });
            } catch {
                setAnalysisDetails({ questions: [] });
            }
        }

        if (singleData?.mentee_result_research_details) {
            try {
                const parsedResearch = JSON.parse(
                    singleData.mentee_result_research_details
                );
                setResearchDetails(Array.isArray(parsedResearch) ? parsedResearch : []);
            } catch {
                setResearchDetails([]);
            }
        }
    }, [singleData]);

    useEffect(() => {
        calculateCombinedMarks(factDetails, analysisDetails.questions);
    }, [factDetails, analysisDetails.questions]);

    const handleScoreUpdate = (type, index, field, value) => {
        const update = (data) =>
            data.map((item, i) => (i === index ? { ...item, [field]: value } : item));

        if (type === "fact") {
            setFactDetails((prev) => update(prev));
            calculateCombinedMarks(factDetails, analysisDetails.questions);
        } else if (type === "analysis") {
            setAnalysisDetails((prev) => ({
                ...prev,
                questions: update(prev.questions || []),
            }));
            calculateCombinedMarks(factDetails, analysisDetails.questions);
        }

        // else if (type === "research") setResearchDetails(prev => update(prev));
    };

    const [totalObtained, setTotalObtained] = useState(
        singleData?.mentee_result_total_score || 0
    );
    const [totalMax, setTotalMax] = useState(
        singleData?.mentee_result_max_score || 0
    );

    const calculateCombinedMarks = (factQuestions, analysisQuestions) => {
        let obtainedSum = 0;
        let maxSum = 0;

        const allQuestions = [...factQuestions, ...analysisQuestions];

        allQuestions.forEach((q) => {
            const obtained = Number(q.obtainedMark);
            const max = Number(q.maxMark);

            if (!isNaN(obtained)) obtainedSum += obtained;
            if (!isNaN(max)) maxSum += max;
        });

        setTotalObtained(obtainedSum);
        setTotalMax(maxSum);
    };

    const handleSubmit = async () => {
        const validateMarks = (details, type) => {
            for (let i = 0; i < details.length; i++) {
                const item = details[i];
                const obtained = item.obtainedMark;
                const max = item.maxMark;

                if (obtained === "" || obtained === null || obtained === undefined) {
                    alert(`${type} - Q${i + 1}: Obtained mark cannot be empty`);
                    return false;
                }

                if (isNaN(obtained) || Number(obtained) > Number(max)) {
                    alert(
                        `${type} - Q${i + 1
                        }: Obtained mark must be a number and not exceed Max mark (${max})`
                    );
                    return false;
                }
            }
            return true;
        };

        const isFactValid = validateMarks(factDetails, "Fact");
        const isAnalysisValid = validateMarks(
            analysisDetails.questions,
            "Analysis"
        );
        //   const isResearchValid = validateMarks(researchDetails, 'Research');

        if (!isFactValid || !isAnalysisValid) {
            return; // Stop submission if validation fails
        }

        // // ✅ Calculate combined total marks
        // const { totalObtained, totalMax } = calculateCombinedMarks(factDetails, analysisDetails.questions);

        const payload = {
            menteeId: Mid,
            AssignId: ACid,
            factDetails,
            analysisDetails,
            researchDetails,
            totalObtained,
            totalMax,
        };

        console.log("Updated Score Payload", payload);

        try {
            const response = await Promise.race([
                axios.post(
                    `${url}api/v1/faculty/dashboard/single-Student-assessment/update`,
                    payload
                ),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Request timed out")), 45000)
                ),
            ]);

            if (response.data.success) {
                console.log("Scores updated successfully:", response.data.success);
                fetchSingleAssessmentDtls();
            } else if (response.data.error) {
                console.log("Error updating scores:", response.data.error);
            }
        } catch (error) {
            if (error.message === "Request timed out") {
                console.log("Request timed out. Please try again.");
            } else {
                console.log("An error occurred. Please try again.", error);
            }
        }
    };

    const minimalisticColors = {
        primary: "#4A5568", // Dark gray
        secondary: "#A0AEC0", // Light gray
        accent: "#2D3748", // Slightly darker gray
    };

    // Parse JSON strings
    const analysisQuestions = analysisDetails.questions;
    // const factQuestions = JSON.parse(singleData?.mentee_result_fact_details);

    // Calculate obtained scores
    const factObtained = factDetails.reduce((sum, q) => sum + Number(q.obtainedMark), 0);
    const analysisObtained = analysisQuestions.reduce((sum, q) => sum + Number(q.obtainedMark), 0);

    // Total score
    const total = factObtained + analysisObtained;

    const chartData = [
        { name: "Analysis-Based Score", value: analysisObtained },
        { name: "Fact-Based Score", value: factObtained },
    ];


    const [ActivePage, setActivePage] = useState("overview")
    const [ActiveSubPage, setActiveSubPage] = useState("fact")





    return (
        <div className="single-student-assessment-pages">
            {/* Header Navigation */}
            <nav className="single-student-assessment-pages__nav">
                <div className="single-student-assessment-pages__breadcrumb">

                    <span onClick={() => setActivePage("overview")}>Overview</span>

                    <span onClick={() => setActivePage("questions")}>Question</span>

                    <span onClick={() => setActivePage("research")}>Research</span>
                </div>
            </nav>


            {ActivePage === "overview" &&
                <div className="single-student-assessment-pages__Overview-Layout">
                    <div className="single-student-assessment-pages__Overview-Item">
                        {/* Student Information */}
                        <div className="single-student-assessment-pages__card">
                            <h2 className="single-student-assessment-pages__card-title">Student Information</h2>
                            <div className="single-student-assessment-pages__info-grid">
                                <div className="single-student-assessment-pages__info-item">
                                    <span className="single-student-assessment-pages__info-label">Student Name</span>
                                    <span className="single-student-assessment-pages__info-value">{singleData?.user_firstname}</span>
                                </div>
                                <div className="single-student-assessment-pages__info-item">
                                    <span className="single-student-assessment-pages__info-label">Roll Number</span>
                                    <span className="single-student-assessment-pages__info-value">{singleData?.mentee_roll_no}</span>
                                </div>
                                <div className="single-student-assessment-pages__info-item">
                                    <span className="single-student-assessment-pages__info-label">Class Name</span>
                                    <span className="single-student-assessment-pages__info-value">{singleData?.class_name}</span>
                                </div>
                                <div className="single-student-assessment-pages__info-item">
                                    <span className="single-student-assessment-pages__info-label">Class Subject Code</span>
                                    <span className="single-student-assessment-pages__info-value">    {singleData?.class_subject_code}</span>
                                </div>
                            </div>
                        </div>

                        {/* Case Study Details */}
                        <div className="single-student-assessment-pages__card">
                            <h2 className="single-student-assessment-pages__card-title">Case Study Details</h2>
                            <div className="single-student-assessment-pages__info-grid">
                                <div className="single-student-assessment-pages__info-item single-student-assessment-pages__info-item--full">
                                    <span className="single-student-assessment-pages__info-label">Case Study Title</span>
                                    <span className="single-student-assessment-pages__info-value">{singleData?.case_study_title}</span>
                                </div>
                                <div className="single-student-assessment-pages__info-item single-student-assessment-pages__info-item--full">
                                    <span className="single-student-assessment-pages__info-label">Categories</span>
                                    <div className="single-student-assessment-pages__tags">
                                        {/* {JSON.parse(singleData?.case_study_category || '[]')?.map((category, index) => (
                                            <span key={index} className="single-student-assessment-pages__tag single-student-assessment-pages__tag--blue">
                                                {category}
                                            </span>
                                        ))} */}
                                        <span  className="single-student-assessment-pages__tag single-student-assessment-pages__tag--blue">
                                            {singleData?.case_study_category}
                                        </span>
                                    </div>
                                </div>
                                <div className="single-student-assessment-pages__info-item single-student-assessment-pages__info-item--full">
                                    <span className="single-student-assessment-pages__info-label">Review Dates</span>
                                    <span className="single-student-assessment-pages__info-value"> {formatDate(singleData?.faculty_case_assign_start_date)} - {formatDate(singleData?.faculty_case_assign_end_date)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="single-student-assessment-pages__Overview-Item">

                        <div className="single-student-assessment-pages__status-card">
                            <div className="single-student-assessment-pages__status-header">
                                <CheckCircle className="single-student-assessment-pages__status-icon single-student-assessment-pages__status-icon--success" />
                                <span className="single-student-assessment-pages__status-text">Submitted</span>
                                <span className="single-student-assessment-pages__status-date"> Last updated: {formatDate(singleData?.mentee_result_update_date)}</span>
                            </div>
                            {singleData?.mentee_result_analysis_details &&
                                (() => {
                                    try {
                                        const parsedDetails = JSON.parse(
                                            singleData.mentee_result_analysis_details
                                        );
                                        return (
                                            <div className="single-student-assessment-pages__performance-text-Row" >
                                                <p className="single-student-assessment-pages__performance-text">
                                                    {parsedDetails.performance}
                                                </p>
                                                <span className="single-student-assessment-pages__score-large"> {totalObtained}/{totalMax}</span>
                                            </div>
                                        );
                                    } catch (error) {
                                        return <p>Error parsing performance feedback.</p>;
                                    }
                                })()}

                        </div>

                        {/* Performance Breakdown */}
                        <div className="single-student-assessment-pages__card">
                            <h2 className="single-student-assessment-pages__card-title">Performance Breakdown</h2>
                            <div className="single-student-assessment-pages__score-section">

                                <div style={{ width: "100%", height: 400 }}>
                                    {/* <h3>Score Contribution: Analysis vs Fact-Based Questions</h3> */}
                                    <ResponsiveContainer>
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={true}
                                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                                                outerRadius={120}
                                                dataKey="value"
                                            >
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            }
            {ActivePage === "questions" &&
                <div className="">

                    <div>
                        <ul className="single-student-assessment-pages__list">
                            <li><div onClick={() => setActiveSubPage("fact")}>Fact BAse Question</div></li>
                            <li><div onClick={() => setActiveSubPage("Analysis")}>Analysis BAse Question</div></li>
                        </ul>
                    </div>

                    {ActiveSubPage === "fact" &&

                        /* Fact Questions */
                        <div className="single-student-assessment-pages__card">




                            {factDetails.map((FBQuestion, index) => (

                                <div className="single-student-assessment-pages__question">
                                    <div className="single-student-assessment-pages__question-header">
                                        <span className="single-student-assessment-pages__question-title">Question {index + 1}</span>
                                    </div>
                                    <p className="single-student-assessment-pages__question-text">  {FBQuestion?.Question}</p>
                                    <p className="single-student-assessment-pages__answer"> {FBQuestion?.userAnswer}</p>
                                    <div className="single-student-assessment-pages__question-status">
                                        <CheckCircle className="single-student-assessment-pages__status-icon single-student-assessment-pages__status-icon--success" />
                                        <span className="single-student-assessment-pages__status-text">{FBQuestion?.correctAnswer}</span>
                                    </div>

                                    {/* <div className="single-student-assessment-pages__feedback-section">
                                        <div className="single-student-assessment-pages__feedback-item single-student-assessment-pages__feedback-item--strength">
                                            <TrendingUp className="single-student-assessment-pages__feedback-icon" />
                                            <div>
                                                <span className="single-student-assessment-pages__feedback-label">Strengths</span>
                                                <p className="single-student-assessment-pages__feedback-text">{FBQuestion?.strength}</p>
                                            </div>
                                        </div>
                                        <div className="single-student-assessment-pages__feedback-item single-student-assessment-pages__feedback-item--improvement">
                                            <AlertTriangle className="single-student-assessment-pages__feedback-icon" />
                                            <div>
                                                <span className="single-student-assessment-pages__feedback-label">Areas to Improve</span>
                                                <p className="single-student-assessment-pages__feedback-text">{FBQuestion?.areaToImprove}</p>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="single-student-assessment-page__score-row">
                                        <div className="single-student-assessment-page__score-inputs">
                                            <div className="single-student-assessment-page-flexVertical">
                                                {" "}
                                                <span className="single-student-assessment-page__score-label">
                                                    Gained Score
                                                </span>
                                                <input
                                                    type="number"
                                                    value={FBQuestion?.isCorrect ? FBQuestion?.maxMark : 0}
                                                    // onChange={(e) =>
                                                    //     handleScoreUpdate(
                                                    //         "fact",
                                                    //         index,
                                                    //         "obtainedMark",
                                                    //         Number(e.target.value)
                                                    //     )
                                                    // }
                                                    className="single-student-assessment-page__score-input"
                                                />

                                            </div>
                                            {/* <span className="single-student-assessment-page__score-divider">
                                                /
                                            </span>
                                            <div className="single-student-assessment-page-flexVertical">
                                                {" "}
                                                <span className="single-student-assessment-page__score-label">
                                                    Total Score
                                                </span>
                                                <input
                                                    type="number"
                                                    value={FBQuestion?.maxMark}
                                                    onChange={(e) =>
                                                        handleScoreUpdate("question1", "total", e.target.value)
                                                    }
                                                    className="single-student-assessment-page__score-input"
                                                />
                                            </div>{" "} */}
                                        </div>
                                    </div>
                                </div>

                            ))}

                        </div>
                    }

                    {ActiveSubPage === "Analysis" &&
                        /* Analysis Questions */

                        <div className="single-student-assessment-pages__card">

                            {/* Analysis Question */}
                            {singleData?.mentee_result_analysis_details &&
                                analysisDetails?.questions &&
                                Array.isArray(analysisDetails.questions) ? (
                                analysisDetails.questions.map((ABQuestion, index) => (
                                    <div className="single-student-assessment-pages__question">
                                        <div className="single-student-assessment-pages__question-header">
                                            <span className="single-student-assessment-pages__question-title">Question {index + 1}</span>
                                        </div>
                                        <p className="single-student-assessment-pages__question-text">{ABQuestion?.Question}</p>
                                        <p className="single-student-assessment-pages__answer"> {ABQuestion?.userAnswer}</p>
                                        <div className="single-student-assessment-pages__question-status">
                                            <CheckCircle className="single-student-assessment-pages__status-icon single-student-assessment-pages__status-icon--success" />
                                            <span className="single-student-assessment-pages__status-text">{ABQuestion?.feedback}</span>
                                        </div>

                                        <div className="single-student-assessment-pages__feedback-section">
                                            <div className="single-student-assessment-pages__feedback-item single-student-assessment-pages__feedback-item--strength">
                                                <TrendingUp className="single-student-assessment-pages__feedback-icon" />
                                                <div>
                                                    <span className="single-student-assessment-pages__feedback-label">Strengths</span>
                                                    <p className="single-student-assessment-pages__feedback-text">{ABQuestion?.strengths}</p>
                                                </div>
                                            </div>
                                            <div className="single-student-assessment-pages__feedback-item single-student-assessment-pages__feedback-item--improvement">
                                                <AlertTriangle className="single-student-assessment-pages__feedback-icon" />
                                                <div>
                                                    <span className="single-student-assessment-pages__feedback-label">Areas to Improve</span>
                                                    <p className="single-student-assessment-pages__feedback-text">{ABQuestion?.areaToImprove}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="single-student-assessment-page__score-row">
                                            <div className="single-student-assessment-page__score-inputs">
                                                <div className="single-student-assessment-page-flexVertical">
                                                    <span className="single-student-assessment-page__score-label">
                                                        Gained Score
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={ABQuestion?.obtainedMark}
                                                        onChange={(e) =>
                                                            handleScoreUpdate(
                                                                "analysis",
                                                                index,
                                                                "obtainedMark",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="single-student-assessment-page__score-input"
                                                    />
                                                </div>

                                                <span className="single-student-assessment-page__score-divider">
                                                    /
                                                </span>

                                                <div className="single-student-assessment-page-flexVertical">
                                                    <span className="single-student-assessment-page__score-label">
                                                        Total Score
                                                    </span>
                                                    <input
                                                        type="number"
                                                        value={ABQuestion?.maxMark}
                                                        onChange={(e) =>
                                                            handleScoreUpdate(
                                                                "analysis",
                                                                index,
                                                                "maxMark",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="single-student-assessment-page__score-input"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                <p>Error parsing assessment data.</p>
                            )}


                        </div>
                    }
                    {/* Overall Performance */}
                    {/* <div className="single-student-assessment-pages__card">
                            <h2 className="single-student-assessment-pages__card-title">Overall Performance</h2>
                            <p className="single-student-assessment-pages__performance-text">
                                Overall performance is good. Strong in fundamentals, needs improvement in practical application examples.
                            </p>
                            <div className="single-student-assessment-pages__final-score">
                                <span className="single-student-assessment-pages__score-label">Total Score</span>
                                <span className="single-student-assessment-pages__score-value">17/17</span>
                            </div>
                            <button className="single-student-assessment-pages__update-btn">Update Scores</button>
                        </div> */}

                    <div className="single-student-assessment-pages__card">
                        <div className="single-student-assessment-pages__final-score">
                            <span className="single-student-assessment-pages__score-label">Total Score</span>
                            <span className="single-student-assessment-pages__score-value">    {totalObtained}/ {totalMax}</span>
                        </div>
                        <button className="single-student-assessment-pages__update-btn" onClick={handleSubmit}>Update Scores</button>
                    </div>

                </div>}


            {ActivePage === "research" && <>{researchDetails.map((FBQuestion, index) => (

                <div className="single-student-assessment-pages__question">
                    <div className="single-student-assessment-pages__question-header">
                        <span className="single-student-assessment-pages__question-title">Question {index + 1}</span>
                    </div>
                    <p className="single-student-assessment-pages__question-text">  {FBQuestion?.Question}</p>
                    <p className="single-student-assessment-pages__answer"> {FBQuestion?.userAnswer}</p>
                    {/* <div className="single-student-assessment-pages__question-status">
                        <CheckCircle className="single-student-assessment-pages__status-icon single-student-assessment-pages__status-icon--success" />
                        <span className="single-student-assessment-pages__status-text">{FBQuestion?.correctAnswer}</span>
                    </div> */}




                </div>

            ))}</>}



        </div >
    );
};

export default TestAssessmentPage;