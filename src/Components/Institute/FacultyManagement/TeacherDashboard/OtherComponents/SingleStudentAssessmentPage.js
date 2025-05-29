import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Calendar, Clock, CheckCircle, AlertTriangle, Star, Edit } from 'lucide-react';
import '../DashboardCSS/SingleStudentAssessmentPage.css'; // Assuming you have a CSS file for styling
import { useParams } from 'react-router-dom';
import { ApiURL } from '../../../../../Utils/ApiURL';
import axios from 'axios';
import formatDate from '../../../../../Utils/FormatDate.js'; // Assuming you have a utility function for date formatting

const SingleStudentAssessmentPage = () => {
    const { Mid, ACid } = useParams();

    console.log(Mid, ACid);
    const [singleData, setsingleData] = useState([])
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
                const parsedAnalysis = JSON.parse(singleData.mentee_result_analysis_details);
                // ensure parsedAnalysis has questions array to prevent errors
                setAnalysisDetails({
                    ...parsedAnalysis,
                    questions: Array.isArray(parsedAnalysis.questions) ? parsedAnalysis.questions : [],
                });
            } catch {
                setAnalysisDetails({ questions: [] });
            }
        }

        if (singleData?.mentee_result_research_details) {
            try {
                const parsedResearch = JSON.parse(singleData.mentee_result_research_details);
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
        const update = (data) => data.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );

        if (type === "fact") {
            setFactDetails(prev => update(prev));
            calculateCombinedMarks(factDetails, analysisDetails.questions);
        }
        else if (type === "analysis") {
            setAnalysisDetails(prev => ({
                ...prev,
                questions: update(prev.questions || [])
            }));
            calculateCombinedMarks(factDetails, analysisDetails.questions);

        }

        // else if (type === "research") setResearchDetails(prev => update(prev));
    };

    const [totalObtained, setTotalObtained] = useState(singleData?.mentee_result_total_score || 0);
    const [totalMax, setTotalMax] = useState(singleData?.mentee_result_max_score || 0);

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

                if (obtained === '' || obtained === null || obtained === undefined) {
                    alert(`${type} - Q${i + 1}: Obtained mark cannot be empty`);
                    return false;
                }

                if (isNaN(obtained) || Number(obtained) > Number(max)) {
                    alert(`${type} - Q${i + 1}: Obtained mark must be a number and not exceed Max mark (${max})`);
                    return false;
                }
            }
            return true;
        };

        const isFactValid = validateMarks(factDetails, 'Fact');
        const isAnalysisValid = validateMarks(analysisDetails.questions, 'Analysis');
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
            totalMax
        };

        console.log("Updated Score Payload", payload);

        try {
            const response = await Promise.race([
                axios.post(`${url}api/v1/faculty/dashboard/single-Student-assessment/update`, payload),
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

    return (
        <div className="single-student-assessment-page">

            {/* Student Info Card */}
            <div className="single-student-assessment-page__info-card">
                <div className="single-student-assessment-page__info-row">
                    <div className="single-student-assessment-page__info-group">
                        <div className="single-student-assessment-page__info-item">
                            <span className="single-student-assessment-page__label">Student Name</span>
                            <div className="single-student-assessment-page__value">
                                <User size={16} className="single-student-assessment-page__icon" />
                                {singleData?.user_firstname}
                            </div>
                        </div>

                        <div className="single-student-assessment-page__info-item">
                            <span className="single-student-assessment-page__label">Roll Number</span>
                            <div className="single-student-assessment-page__value single-student-assessment-page__roll-number">
                                {singleData?.mentee_roll_no}
                            </div>
                        </div>
                    </div>

                    <div className="single-student-assessment-page__info-group">
                        <div className="single-student-assessment-page__info-item">
                            <span className="single-student-assessment-page__label">Class Name</span>
                            <div className="single-student-assessment-page__value">
                                🎓 {singleData?.class_name}
                            </div>
                        </div>

                        <div className="single-student-assessment-page__info-item">
                            <span className="single-student-assessment-page__label">Class Code</span>
                            <div className="single-student-assessment-page__value">
                                {singleData?.class_subject_code}
                            </div>
                        </div>
                    </div>

                    <div className="single-student-assessment-page__info-group">
                        <div className="single-student-assessment-page__info-item">
                            <span className="single-student-assessment-page__label">Case Study Title</span>
                            <div className="single-student-assessment-page__value">
                                📄{singleData?.case_study_title}
                            </div>
                        </div>

                        <div className="single-student-assessment-page__date-row">
                            <div className="single-student-assessment-page__date-item">
                                <span className="single-student-assessment-page__label">Assign Date</span>
                                <div className="single-student-assessment-page__value">
                                    <Calendar size={14} />
                                    {formatDate(singleData?.faculty_case_assign_start_date)}
                                </div>
                            </div>
                            <div className="single-student-assessment-page__date-item">
                                <span className="single-student-assessment-page__label">Due Date</span>
                                <div className="single-student-assessment-page__value">
                                    <Clock size={14} />
                                    {formatDate(singleData?.faculty_case_assign_end_date)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Score Section */}
            <div className="single-student-assessment-page__score-section">
                <div className="single-student-assessment-page__main-score">
                    <span className="single-student-assessment-page__large-score">{totalObtained}/{totalMax}</span>
                    <div className="single-student-assessment-page__status-badge">
                        <CheckCircle size={16} />
                        Submitted
                    </div>
                </div>
                <div className="single-student-assessment-page__timestamp">
                    Last updated: {formatDate(singleData?.mentee_result_update_date)}
                </div>
            </div>

            {/* Question 1 fact Base */}
            {factDetails.map((FBQuestion, index) => (
                <div key={FBQuestion?.qId} className="single-student-assessment-page__question-block">
                    <h2 className="single-student-assessment-page__question-title">Question {index + 1}</h2>
                    <p className="single-student-assessment-page__question-text">
                        {FBQuestion?.question} fact base
                    </p>

                    <div className="single-student-assessment-page__student-answer">
                        {FBQuestion?.answer}
                    </div>

                    <div className="single-student-assessment-page__ai-section single-student-assessment-page__student-answer">
                        <div className="single-student-assessment-page__ai-title">
                            <Star size={16} />
                            AI-Generated Analysis
                        </div>
                        <div className="single-student-assessment-page__analysis-item single-student-assessment-page__feedback">
                            <div className="single-student-assessment-page__analysis-icon">●</div>
                            <div>
                                <h4>Feedback</h4>
                                <p>{FBQuestion?.feedback}</p>
                            </div>
                        </div>

                        <div className="single-student-assessment-page__analysis-grid">




                            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__strengths">
                                <div className="single-student-assessment-page__analysis-icon">↗</div>
                                <div>
                                    <h4>Strengths</h4>
                                    <p>{FBQuestion?.strength}</p>
                                </div>
                            </div>

                            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__improvements">
                                <div className="single-student-assessment-page__analysis-icon">⚠</div>
                                <div>
                                    <h4>Areas to Improve</h4>
                                    <p>{FBQuestion?.areaToImprove}</p>
                                </div>
                            </div>


                        </div>

                        <div className="single-student-assessment-page__score-row">
                            <div className="single-student-assessment-page__score-inputs">
                                <div className='single-student-assessment-page-flexVertical'> <span className="single-student-assessment-page__score-label">Gained Score</span>
                                    <input
                                        type="number"
                                        value={FBQuestion?.obtainedMark}
                                        onChange={(e) => handleScoreUpdate('fact', index, 'obtainedMark', e.target.value)}
                                        className="single-student-assessment-page__score-input"
                                    /> </div>

                                <span className="single-student-assessment-page__score-divider">/</span>
                                <div className='single-student-assessment-page-flexVertical'> <span className="single-student-assessment-page__score-label">Total Score</span>
                                    <input
                                        type="number"
                                        value={FBQuestion?.maxMark}
                                        onChange={(e) => handleScoreUpdate('question1', 'total', e.target.value)}
                                        className="single-student-assessment-page__score-input"
                                    />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>))}



            {/* Question 1 Analysis Base */}
            {singleData?.mentee_result_analysis_details && analysisDetails?.questions && Array.isArray(analysisDetails.questions) ? (
                analysisDetails.questions.map((ABQuestion, index) => (
                    <div key={index} className="single-student-assessment-page__question-block">
                        <h2 className="single-student-assessment-page__question-title">Question {index + 1} analysis base</h2>
                        <p className="single-student-assessment-page__question-text">{ABQuestion?.question}</p>

                        <div className="single-student-assessment-page__student-answer">
                            {ABQuestion?.answer}
                        </div>

                        <div className="single-student-assessment-page__ai-section single-student-assessment-page__student-answer">
                            <div className="single-student-assessment-page__ai-title">
                                <Star size={16} />
                                AI-Generated Analysis
                            </div>

                            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__feedback">
                                <div className="single-student-assessment-page__analysis-icon">●</div>
                                <div>
                                    <h4>Feedback</h4>
                                    <p>{ABQuestion?.feedback}</p>
                                </div>
                            </div>

                            <div className="single-student-assessment-page__analysis-grid">
                                <div className="single-student-assessment-page__analysis-item single-student-assessment-page__strengths">
                                    <div className="single-student-assessment-page__analysis-icon">↗</div>
                                    <div>
                                        <h4>Strengths</h4>
                                        <p>{ABQuestion?.strength}</p>
                                    </div>
                                </div>

                                <div className="single-student-assessment-page__analysis-item single-student-assessment-page__improvements">
                                    <div className="single-student-assessment-page__analysis-icon">⚠</div>
                                    <div>
                                        <h4>Areas to Improve</h4>
                                        <p>{ABQuestion?.areaToImprove}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="single-student-assessment-page__score-row">
                                <div className="single-student-assessment-page__score-inputs">
                                    <div className="single-student-assessment-page-flexVertical">
                                        <span className="single-student-assessment-page__score-label">Gained Score</span>
                                        <input
                                            type="number"
                                            value={ABQuestion?.obtainedMark}
                                            onChange={(e) => handleScoreUpdate('analysis', index, 'obtainedMark', e.target.value)}
                                            className="single-student-assessment-page__score-input"
                                        />
                                    </div>

                                    <span className="single-student-assessment-page__score-divider">/</span>

                                    <div className="single-student-assessment-page-flexVertical">
                                        <span className="single-student-assessment-page__score-label">Total Score</span>
                                        <input
                                            type="number"
                                            value={ABQuestion?.maxMark}
                                            onChange={(e) => handleScoreUpdate('analysis', index, 'maxMark', e.target.value)}
                                            className="single-student-assessment-page__score-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Error parsing assessment data.</p>
            )}

            {/* Question 1 Reseach  Base */}

            {researchDetails.map((RBQuestion, index) => (
                <div key={RBQuestion?.qId} className="single-student-assessment-page__question-block">
                    <h2 className="single-student-assessment-page__question-title">Question {index + 1}</h2>
                    <p className="single-student-assessment-page__question-text">
                        {RBQuestion?.question} research base
                    </p>

                    <div className="single-student-assessment-page__student-answer">
                        {RBQuestion?.answer}
                    </div>
                    {/* 
                    <div className="single-student-assessment-page__ai-section single-student-assessment-page__student-answer">
                        <div className="single-student-assessment-page__ai-title">
                            <Star size={16} />
                            AI-Generated Analysis
                        </div>
                        <div className="single-student-assessment-page__analysis-item single-student-assessment-page__feedback">
                            <div className="single-student-assessment-page__analysis-icon">●</div>
                            <div>
                                <h4>Feedback</h4>
                                <p>{FBQuestion?.feedback}</p>
                            </div>
                        </div>

                        <div className="single-student-assessment-page__analysis-grid">




                            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__strengths">
                                <div className="single-student-assessment-page__analysis-icon">↗</div>
                                <div>
                                    <h4>Strengths</h4>
                                    <p>{FBQuestion?.strength}</p>
                                </div>
                            </div>

                            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__improvements">
                                <div className="single-student-assessment-page__analysis-icon">⚠</div>
                                <div>
                                    <h4>Areas to Improve</h4>
                                    <p>{FBQuestion?.areaToImprove}</p>
                                </div>
                            </div>


                        </div>

                        <div className="single-student-assessment-page__score-row">
                            <div className="single-student-assessment-page__score-inputs">
                                <div className='single-student-assessment-page-flexVertical'> <span className="single-student-assessment-page__score-label">Gained Score</span>
                                    <input
                                        type="number"
                                        value={RBQuestion?.obtainedMark}
                                        onChange={(e) => handleScoreUpdate('research', index, 'obtainedMark', e.target.value)}
                                        className="single-student-assessment-page__score-input"
                                    /> </div>

                                <span className="single-student-assessment-page__score-divider">/</span>
                                <div className='single-student-assessment-page-flexVertical'> <span className="single-student-assessment-page__score-label">Total Score</span>
                                    <input
                                        type="number"
                                        value={RBQuestion?.maxMark}

                                        className="single-student-assessment-page__score-input"
                                    />
                                </div>


                            </div>
                        </div>
                    </div> */}
                </div>))}
            {/* Overall Performance */}
            {singleData?.mentee_result_analysis_details && (() => {
                try {
                    const parsedDetails = JSON.parse(singleData.mentee_result_analysis_details);
                    return (
                        <div className="single-student-assessment-page__overall-performance">
                            <div className="single-student-assessment-page__overall-header">
                                <Star size={20} />
                                <h2>Overall Performance</h2>
                            </div>

                            <p className="single-student-assessment-page__overall-description">
                                {parsedDetails.performance}
                            </p>

                            <div className="single-student-assessment-page__final-score-section">
                                <div className="single-student-assessment-page__total-score-display">
                                    <span className="single-student-assessment-page__total-label">Total Score</span>
                                    <div className="single-student-assessment-page__final-numbers">
                                        <span className="single-student-assessment-page__final-score">{totalObtained}</span>
                                        <span className="single-student-assessment-page__final-divider">/</span>
                                        <span className="single-student-assessment-page__final-max">{totalMax}</span>
                                    </div>
                                </div>

                                <button className="single-student-assessment-page__update-button" onClick={handleSubmit}>
                                    Update Scores
                                </button>
                            </div>
                        </div>
                    );
                } catch (error) {
                    return <p>Error parsing performance feedback.</p>;
                }
            })()}

        </div>
    );
};

export default SingleStudentAssessmentPage;