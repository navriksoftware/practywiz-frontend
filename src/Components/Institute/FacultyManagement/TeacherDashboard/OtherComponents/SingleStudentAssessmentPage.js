import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  User,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Edit,
  Home,
  GraduationCap,
  FileText,
  TrendingUp,
  Divide,
} from "lucide-react";
import "../DashboardCSS/SingleStudentAssessmentPage.css"; // Assuming you have a CSS file for styling
import { useParams } from "react-router-dom";
import { ApiURL } from "../../../../../Utils/ApiURL";
import axios from "axios";
import formatDate from "../../../../../Utils/FormatDate.js"; // Assuming you have a utility function for date formatting

const SingleStudentAssessmentPage = () => {
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
            `${type} - Q${
              i + 1
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

  return (
    <div className="single-student-assessment-page">
      {/* Header */}
      <div className="single-student-assessment-page__header">
        <h1
          className="single-student-assessment-page__title"
          style={{ color: minimalisticColors.accent }}
        >
          Case Study Review
        </h1>{" "}
        <nav
          className="single-student-assessment-page__breadcrumb"
          style={{ color: minimalisticColors.secondary }}
        >
          <Home size={14} />
          <span>Dashboard</span>
          <ChevronRight size={14} />
          <span>Case Studies</span>
          <ChevronRight size={14} />
          <span className="single-student-assessment-page__breadcrumb--active">
            Student Review
          </span>
        </nav>
      </div>

      {/* Student Info Card */}
      <div className="single-student-assessment-page__info-card">
        <div className="single-student-assessment-page__info-row">
          <div className="single-student-assessment-page__info-group">
            <div className="single-student-assessment-page__info-item">
              <span className="single-student-assessment-page__label">
                Student Name
              </span>
              <div className="single-student-assessment-page__value">
                <User
                  size={16}
                  className="single-student-assessment-page__icon"
                />
                {singleData?.user_firstname}
              </div>
            </div>

            <div className="single-student-assessment-page__info-item">
              <span className="single-student-assessment-page__label">
                Roll Number
              </span>
              <div className="single-student-assessment-page__value single-student-assessment-page__roll-number">
                {singleData?.mentee_roll_no}
              </div>
            </div>
          </div>

          <div className="single-student-assessment-page__info-group">
            {" "}
            <div className="single-student-assessment-page__info-item">
              <span className="single-student-assessment-page__label">
                Class Name
              </span>
              <div className="single-student-assessment-page__value">
                <GraduationCap
                  size={16}
                  className="single-student-assessment-page__icon"
                />
                {singleData?.class_name}
              </div>
            </div>
            <div className="single-student-assessment-page__info-item">
              <span className="single-student-assessment-page__label">
                Class Code
              </span>
              <div className="single-student-assessment-page__value">
                {singleData?.class_subject_code}
              </div>
            </div>
          </div>

          <div className="single-student-assessment-page__info-group">
            {" "}
            <div className="single-student-assessment-page__info-item">
              <span className="single-student-assessment-page__label">
                Case Study Title
              </span>
              <div className="single-student-assessment-page__value">
                <FileText
                  size={16}
                  className="single-student-assessment-page__icon"
                />
                {singleData?.case_study_title}
              </div>
            </div>
            <div className="single-student-assessment-page__date-row">
              <div className="single-student-assessment-page__date-item">
                <span className="single-student-assessment-page__label">
                  Assign Date
                </span>
                <div className="single-student-assessment-page__value">
                  <Calendar size={14} />
                  {formatDate(singleData?.faculty_case_assign_start_date)}
                </div>
              </div>
              <div className="single-student-assessment-page__date-item">
                <span className="single-student-assessment-page__label">
                  Due Date
                </span>
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
          <span className="single-student-assessment-page__large-score">
            {totalObtained}/{totalMax}
          </span>
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
        <div
          key={FBQuestion?.qId}
          className="single-student-assessment-page__question-block"
        >
          <h2 className="single-student-assessment-page__question-title">
            Question {index + 1}
          </h2>
          <p className="single-student-assessment-page__question-text">
            {FBQuestion?.question}
          </p>

          <div className="single-student-assessment-page__student-answer">
            {FBQuestion?.answer}
          </div>

          <div className="single-student-assessment-page__ai-section single-student-assessment-page__student-answer">
            <div className="single-student-assessment-page__ai-title">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.9995"
                height="20"
                viewBox="0 0 19.9995 20"
              >
                <path
                  d="M8.12493 20.0002C7.92269 20.0012 7.73817 19.9446 7.57137 19.8302C7.40456 19.7159 7.28518 19.5642 7.21321 19.3752L5.65696 15.3283C5.62509 15.2459 5.5779 15.1734 5.5154 15.1109C5.4529 15.0484 5.38042 15.0012 5.29797 14.9694L1.24993 13.4119C1.06119 13.3395 0.909561 13.22 0.79505 13.0534C0.680538 12.8868 0.623283 12.7024 0.623283 12.5002C0.623283 12.298 0.680538 12.1137 0.79505 11.9471C0.909561 11.7805 1.06119 11.6609 1.24993 11.5885L5.2968 10.0322C5.37925 10.0004 5.45173 9.95319 5.51423 9.89069C5.57673 9.82819 5.62392 9.75571 5.65579 9.67326L7.21321 5.62521C7.28565 5.43647 7.40517 5.28485 7.57177 5.17034C7.73838 5.05583 7.92276 4.99857 8.12493 4.99857C8.32709 4.99857 8.51147 5.05583 8.67808 5.17034C8.84468 5.28485 8.96421 5.43647 9.03664 5.62521L10.5929 9.67209C10.6248 9.75454 10.6719 9.82701 10.7345 9.88952C10.797 9.95202 10.8694 9.99921 10.9519 10.0311L14.9753 11.5791C15.1719 11.652 15.3297 11.7747 15.4488 11.9472C15.5678 12.1198 15.6266 12.3109 15.6249 12.5205C15.6219 12.7191 15.5634 12.8996 15.4494 13.0622C15.3354 13.2248 15.1855 13.3414 14.9999 13.4119L10.9531 14.9682C10.8706 15.0001 10.7981 15.0472 10.7356 15.1097C10.6731 15.1722 10.6259 15.2447 10.5941 15.3272L9.03664 19.3752C8.96468 19.5642 8.84529 19.7159 8.67848 19.8302C8.51168 19.9446 8.32716 20.0012 8.12493 20.0002ZM3.43743 6.87521C3.31891 6.87521 3.21079 6.84166 3.11309 6.77457C3.01538 6.70749 2.94524 6.61864 2.90266 6.50803L2.24407 4.79553C2.22963 4.75765 2.20808 4.72438 2.17942 4.69572C2.15076 4.66706 2.11749 4.64551 2.07961 4.63107L0.367114 3.97248C0.256519 3.92989 0.167684 3.85974 0.100611 3.76204C0.0335369 3.66434 -3.03165e-12 3.55623 0 3.43771C2.05758e-08 3.3192 0.0335369 3.21109 0.100611 3.11339C0.167684 3.01568 0.256519 2.94554 0.367114 2.90295L2.07961 2.24436C2.11745 2.22986 2.15069 2.20828 2.17934 2.17963C2.20799 2.15098 2.22957 2.11774 2.24407 2.0799L2.8968 0.382636C2.93431 0.280824 2.99539 0.195976 3.08003 0.128093C3.16467 0.06021 3.26076 0.0190161 3.36829 0.00451143C3.49862 -0.011333 3.62006 0.0145575 3.7326 0.0821829C3.84514 0.149808 3.925 0.244881 3.97219 0.367402L4.63079 2.0799C4.64529 2.11774 4.66686 2.15098 4.69551 2.17963C4.72416 2.20828 4.7574 2.22986 4.79524 2.24436L6.50774 2.90295C6.61833 2.94554 6.70717 3.01568 6.77424 3.11339C6.84131 3.21109 6.87485 3.3192 6.87485 3.43771C6.87485 3.55623 6.84131 3.66433 6.77424 3.76204C6.70717 3.85974 6.61833 3.92989 6.50774 3.97248L4.79524 4.63107C4.75736 4.64551 4.72409 4.66706 4.69543 4.69572C4.66677 4.72438 4.64522 4.75765 4.63079 4.79553L3.97219 6.50803C3.92962 6.61864 3.85947 6.70748 3.76177 6.77457C3.66406 6.84166 3.55595 6.87521 3.43743 6.87521ZM15.6249 10.0002C15.4956 10.0002 15.3777 9.96354 15.2711 9.89031C15.1646 9.81708 15.0881 9.72012 15.0417 9.59943L14.1495 7.28029C14.1337 7.23897 14.1101 7.20266 14.0788 7.17136C14.0475 7.14006 14.0112 7.11648 13.9698 7.10061L11.6507 6.20842C11.5301 6.16195 11.4333 6.08544 11.3601 5.97889C11.287 5.87234 11.2504 5.75445 11.2504 5.62521C11.2504 5.49598 11.287 5.37809 11.3601 5.27154C11.4333 5.16499 11.5301 5.08848 11.6507 5.04201L13.9698 4.14982C14.0112 4.13395 14.0475 4.11037 14.0788 4.07907C14.1101 4.04777 14.1337 4.01146 14.1495 3.97014L15.0351 1.6674C15.0763 1.55647 15.143 1.46397 15.2353 1.3899C15.3276 1.31584 15.4323 1.27071 15.5495 1.25451C15.6918 1.23729 15.8243 1.26563 15.947 1.33953C16.0697 1.41342 16.1568 1.51724 16.2081 1.651L17.1003 3.97014C17.1162 4.01146 17.1398 4.04777 17.1711 4.07907C17.2024 4.11037 17.2387 4.13395 17.28 4.14982L19.5991 5.04201C19.7197 5.08848 19.8166 5.16499 19.8897 5.27154C19.9629 5.37809 19.9994 5.49598 19.9994 5.62521C19.9994 5.75445 19.9629 5.87234 19.8897 5.97889C19.8166 6.08544 19.7197 6.16195 19.5991 6.20842L17.28 7.10061C17.2387 7.11648 17.2024 7.14006 17.1711 7.17136C17.1398 7.20266 17.1162 7.23897 17.1003 7.28029L16.2081 9.59943C16.1617 9.72012 16.0853 9.81708 15.9787 9.89031C15.8722 9.96354 15.7542 10.0002 15.6249 10.0002Z"
                  fill-rule="nonzero"
                  transform="matrix(1 0 0 1 7.36409e-05 -0.000214553)"
                  fill="rgb(37, 99, 235)"
                />
              </svg>
              AI-Generated Analysis
            </div>{" "}
            <div className="single-student-assessment-page__analysis-item single-student-assessment-page__feedback">
              <CheckCircle
                size={13}
                className="single-student-assessment-page__analysis-icon"
              />
              <div>
                <h4>Feedback</h4>
                <p>{FBQuestion?.feedback}</p>
              </div>
            </div>
            <div className="single-student-assessment-page__analysis-grid">
              {" "}
              <div className="single-student-assessment-page__analysis-item single-student-assessment-page__strengths">
                <TrendingUp
                  size={13}
                  className="single-student-assessment-page__analysis-icon"
                />
                <div>
                  <h4>Strengths</h4>
                  <p>{FBQuestion?.strength}</p>
                </div>
              </div>{" "}
              <div className="single-student-assessment-page__analysis-item single-student-assessment-page__improvements">
                <AlertTriangle
                  size={13}
                  className="single-student-assessment-page__analysis-icon"
                />
                <div>
                  <h4>Areas to Improve</h4>
                  <p>{FBQuestion?.areaToImprove}</p>
                </div>
              </div>
            </div>
            <div className="single-student-assessment-page__score-row">
              <div className="single-student-assessment-page__score-inputs">
                <div className="single-student-assessment-page-flexVertical">
                  {" "}
                  <span className="single-student-assessment-page__score-label">
                    Gained Score
                  </span>
                  <input
                    type="number"
                    value={FBQuestion?.obtainedMark}
                    onChange={(e) =>
                      handleScoreUpdate(
                        "fact",
                        index,
                        "obtainedMark",
                        e.target.value
                      )
                    }
                    className="single-student-assessment-page__score-input"
                  />{" "}
                </div>
                <span className="single-student-assessment-page__score-divider">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                  ></svg>
                  <path
                    d="M10.2348 -0.334973L10.235 -0.335207Q10.5874 -0.6875 11.0858 -0.6875Q11.5843 -0.6875 11.9368 -0.335001L11.9604 -0.311382Q12.3125 0.0410418 12.3125 0.53926Q12.3125 1.03748 11.9602 1.39008L11.5918 1.75852Q11.5439 1.8064 11.4876 1.84402Q11.4313 1.88164 11.3687 1.90755Q11.3062 1.93346 11.2397 1.94667Q11.1733 1.95988 11.1056 1.95989Q11.0379 1.95988 10.9715 1.94667Q10.9051 1.93346 10.8425 1.90755Q10.78 1.88164 10.7237 1.84402Q10.6674 1.8064 10.6195 1.75852L9.86616 1.00519Q9.7695 0.90845 9.71722 0.782085Q9.66494 0.65572 9.665 0.518968Q9.66506 0.382216 9.71744 0.255896Q9.76983 0.129575 9.86657 0.0329179L10.2348 -0.334973ZM8.53324 1.36625L0.0285792 9.89185Q-0.0679352 9.9886 -0.12011 10.1149L-0.635422 11.3624Q-0.661274 11.425 -0.67442 11.4914Q-0.687565 11.5578 -0.6875 11.6256Q-0.687434 11.6933 -0.674159 11.7597Q-0.660885 11.8261 -0.634911 11.8886Q-0.608938 11.9511 -0.571264 12.0074Q-0.53359 12.0637 -0.485663 12.1115Q-0.437737 12.1593 -0.381399 12.1969Q-0.325061 12.2345 -0.262478 12.2603Q-0.136405 12.3124 -2.23517e-08 12.3124Q0.136405 12.3124 0.262478 12.2603L1.50998 11.745Q1.63629 11.6928 1.73304 11.5963L10.258 3.09224Q10.306 3.04442 10.3437 2.98817Q10.3814 2.93191 10.4073 2.86939Q10.4333 2.80686 10.4466 2.74046Q10.4599 2.67407 10.46 2.60636Q10.4601 2.53864 10.447 2.47221Q10.4338 2.40579 10.408 2.3432Q10.3822 2.28061 10.3446 2.22426Q10.3071 2.16791 10.2592 2.11997L9.50551 1.36625Q9.45763 1.31837 9.40133 1.28075Q9.34503 1.24313 9.28247 1.21722Q9.21991 1.19131 9.1535 1.1781Q9.08709 1.16489 9.01937 1.16489Q8.95166 1.16489 8.88525 1.1781Q8.81884 1.19131 8.75628 1.21722Q8.69372 1.24313 8.63742 1.28075Q8.58112 1.31837 8.53324 1.36625Z"
                    fill-rule="evenodd"
                    transform="matrix(1 0 0 1 0.6875 0.687615)"
                    fill="rgb(100, 116, 139)"
                  />
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
                </div>{" "}
                <Divide
                  size={16}
                  className="single-student-assessment-page__score-divider"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Question 1 Analysis Base */}
      {singleData?.mentee_result_analysis_details &&
      analysisDetails?.questions &&
      Array.isArray(analysisDetails.questions) ? (
        analysisDetails.questions.map((ABQuestion, index) => (
          <div
            key={index}
            className="single-student-assessment-page__question-block"
          >
            <h2 className="single-student-assessment-page__question-title">
              Question {index + 1} analysis base
            </h2>
            <p className="single-student-assessment-page__question-text">
              {ABQuestion?.question}
            </p>
            <div className="single-student-assessment-page__student-answer">
              {ABQuestion?.answer}
            </div>{" "}
            <div className="single-student-assessment-page__ai-section single-student-assessment-page__student-answer">
              <div className="single-student-assessment-page__ai-title">
                <Star size={19} />
                AI-Generated Analysis
              </div>
              <div className="single-student-assessment-page__analysis-item single-student-assessment-page__feedback">
                <CheckCircle
                  size={13}
                  className="single-student-assessment-page__analysis-icon"
                />
                <div>
                  <h4>Feedback</h4>
                  <p>{ABQuestion?.feedback}</p>
                </div>
              </div>
              <div className="single-student-assessment-page__analysis-grid">
                <div className="single-student-assessment-page__analysis-item single-student-assessment-page__strengths">
                  <div className="single-student-assessment-page__analysis-icon">
                    ↗
                  </div>
                  <div>
                    <h4>Strengths</h4>
                    <p>{ABQuestion?.strength}</p>
                  </div>
                </div>
                <div className="single-student-assessment-page__analysis-item single-student-assessment-page__improvements">
                  <div className="single-student-assessment-page__analysis-icon">
                    ⚠
                  </div>
                  <div>
                    <h4>Areas to Improve</h4>
                    <p>{ABQuestion?.areaToImprove}</p>
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
          </div>
        ))
      ) : (
        <p>Error parsing assessment data.</p>
      )}

      {/* Question 1 Reseach  Base */}

      {researchDetails.map((RBQuestion, index) => (
        <div
          key={RBQuestion?.qId}
          className="single-student-assessment-page__question-block"
        >
          <h2 className="single-student-assessment-page__question-title">
            Question {index + 1}
          </h2>
          <p className="single-student-assessment-page__question-text">
            {RBQuestion?.question} research base
          </p>

          <div className="single-student-assessment-page__student-answer">
            {RBQuestion?.answer}
          </div>
        </div>
      ))}
      {/* Overall Performance */}
      {singleData?.mentee_result_analysis_details &&
        (() => {
          try {
            const parsedDetails = JSON.parse(
              singleData.mentee_result_analysis_details
            );
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
                    <span className="single-student-assessment-page__total-label">
                      Total Score
                    </span>
                    <div className="single-student-assessment-page__final-numbers">
                      <span className="single-student-assessment-page__final-score">
                        {totalObtained}
                      </span>
                      <span className="single-student-assessment-page__final-divider">
                        /
                      </span>
                      <span className="single-student-assessment-page__final-max">
                        {totalMax}
                      </span>
                    </div>
                  </div>

                  <button
                    className="single-student-assessment-page__update-button"
                    onClick={handleSubmit}
                  >
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
