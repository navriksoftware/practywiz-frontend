import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import ChatInterface from "./ChatInterface";
import Navbar from "../../Navbar/Navbar";
import { ApiURL } from "../../../Utils/ApiURL";

function Simulation( { setInclassChatOpen }) {
  document.title = "Practywiz | Avega";
  const URL = ApiURL();
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from navigation state
  const {
    questionStatus,
    facultyCaseAssignId,
    caseStudyData,
    maxMarksSummary,
    isInClass,
  } = location.state || {};

  // Get mentee ID from Redux store
  const menteeId = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_dtls_id
  );
  const menteeFirstname = useSelector(
    (state) => state.mentee.singleMentee[0]?.mentee_firstname
  );

  // --- Follow-up configuration flag ---
  const [followUpEnabled] = useState(true);

  // State management
  const [parsedQuestions, setParsedQuestions] = useState(null);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputVisible, setInputVisible] = useState(true);

  // Separate data storage for each question type
  const [factBasedResponses, setFactBasedResponses] = useState([]);
  const [analysisBasedResponses, setAnalysisBasedResponses] = useState([]);
  const [researchBasedResponses, setResearchBasedResponses] = useState([]);

  // Follow-up state for analysis questions
  const [analysisFollowUpLevel, setAnalysisFollowUpLevel] = useState(0); // 0, 1, 2 (2 means done)
  const [analysisFollowUpQuestion, setAnalysisFollowUpQuestion] =
    useState(null);
  const [pendingAnalysisResponse, setPendingAnalysisResponse] = useState(null);
  const [lastFollowUpUserAnswer, setLastFollowUpUserAnswer] = useState(""); // for 2nd follow-up
  const [firstFollowUpObj, setFirstFollowUpObj] = useState(null);
  // Add processing state to prevent race conditions
  const [isProcessingAnswer, setIsProcessingAnswer] = useState(false);

  // --- NEW: Submission flag to ensure single, correct submission ---
  const [simulationComplete, setSimulationComplete] = useState(false);

  useEffect(() => {
    // Helper function to check for null, undefined, or blank
    const isMissing = (val) =>
      val === null ||
      val === undefined ||
      (typeof val === "string" && val.trim() === "");

    if (
      isMissing(questionStatus) ||
      isMissing(facultyCaseAssignId) ||
      isMissing(caseStudyData) ||
      isMissing(menteeId)
    ) {
      navigate("/mentee/dashboard");
    }
  }, [questionStatus, facultyCaseAssignId, caseStudyData, menteeId, navigate]);

  useEffect(() => {

    console.log("Is in class chat open:", isInClass);
    
    setInclassChatOpen(isInClass);
    if (facultyCaseAssignId && menteeId) {
      fetchQuestions();
    }
    // eslint-disable-next-line
  }, [facultyCaseAssignId, menteeId]);

  useEffect(() => {
    if (parsedQuestions && !currentQuestionType) {
      initializeFirstQuestion();
    }
    // eslint-disable-next-line
  }, [parsedQuestions, currentQuestionType]);

  // --- Submission effect: runs only when simulationComplete is set true ---
  useEffect(() => {
    if (simulationComplete) {
      completeSimulationWithResponses(
        factBasedResponses,
        analysisBasedResponses,
        researchBasedResponses
      );
    }
    // eslint-disable-next-line
  }, [simulationComplete]);

  const getQuestionTypeLabel = (type) => {
    switch (type) {
      case "factBased":
        return "Fact-based Questions";
      case "analyzeBased":
        return "Analysis-based Questions";
      case "researchBased":
        return "Research-based Questions";
      default:
        return "Questions";
    }
  };

  // Helper to add a transition message
  const addTransitionMessage = (type) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: `Now starting: ${getQuestionTypeLabel(
          type
        )}. Get ready for a new set of questions!`,
        isTransition: true,
      },
    ]);
  };

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);

      const response = await Promise.race([
        axios.post(`${URL}api/v1/case-studies/generate-questions`, {
          facultyCaseAssignId: facultyCaseAssignId,
          menteeId: menteeId,
          questionStatus: questionStatus,
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 45000)
        ),
      ]);

      if (response.data.success && response.data.question) {
        const questionsData = JSON.parse(response.data.question);
        setParsedQuestions(questionsData);
        // console.log("Questions fetched successfully:", questionsData);
      } else {
        navigate("/mentee/dashboard");
      }
    } catch (error) {
      navigate("/mentee/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeFirstQuestion = () => {
    let firstQuestionType = null;

    if (
      parsedQuestions.factBasedQuestions &&
      parsedQuestions.factBasedQuestions.length > 0
    ) {
      firstQuestionType = "factBased";
    } else if (
      parsedQuestions.analysisBasedQuestions &&
      parsedQuestions.analysisBasedQuestions.length > 0
    ) {
      firstQuestionType = "analyzeBased";
    } else if (
      parsedQuestions.researchBasedQuestions &&
      parsedQuestions.researchBasedQuestions.length > 0
    ) {
      firstQuestionType = "researchBased";
    }

    if (firstQuestionType) {
      setCurrentQuestionType(firstQuestionType);
      setCurrentQuestionIndex(0);
      addTransitionMessage(firstQuestionType);
      setTimeout(() => {
        showQuestion(firstQuestionType, 0);
      }, 600);
    } else {
      navigate("/mentee/dashboard");
    }
  };

  const showQuestion = (questionType, questionIndex) => {
    const questionArray = getQuestionArray(questionType);
    if (questionArray && questionArray[questionIndex]) {
      const question = questionArray[questionIndex];

      const messageObj = {
        sender: "AI",
        text: question.Question,
        questionType: question.questionType,
      };

      if (question.questionType === "multiple-choice" && question.options) {
        messageObj.options = question.options;
      }

      setMessages((prev) => [...prev, messageObj]);
      setInputVisible(true);
    }
  };

  const getQuestionArray = (questionType) => {
    if (!parsedQuestions) return null;

    switch (questionType) {
      case "factBased":
        return parsedQuestions.factBasedQuestions;
      case "analyzeBased":
        return parsedQuestions.analysisBasedQuestions;
      case "researchBased":
        return parsedQuestions.researchBasedQuestions;
      default:
        return null;
    }
  };

  const isLastQuestion = (questionType, questionIndex) => {
    const currentArray = getQuestionArray(questionType);
    const isLastInCurrentType = questionIndex === currentArray?.length - 1;

    if (!isLastInCurrentType) return false;

    if (questionType === "factBased") {
      return !(
        parsedQuestions.analysisBasedQuestions?.length > 0 ||
        parsedQuestions.researchBasedQuestions?.length > 0
      );
    } else if (questionType === "analyzeBased") {
      return !(parsedQuestions.researchBasedQuestions?.length > 0);
    } else if (questionType === "researchBased") {
      return true;
    }

    return false;
  };

  const submitResponses = async (completeResults) => {
    try {
      const payload = {
        menteeId: completeResults.menteeId,
        facultyCaseAssignId: completeResults.facultyCaseAssignId,
        summary: completeResults.summary,
        completedAt: completeResults.completedAt,
        maxMarks: maxMarksSummary.total,
      };

      if (
        Array.isArray(completeResults.factBasedResponses) &&
        completeResults.factBasedResponses.length > 0
      ) {
        payload.factBasedResponses = completeResults.factBasedResponses;
      }
      if (
        Array.isArray(completeResults.analysisBasedResponses) &&
        completeResults.analysisBasedResponses.length > 0
      ) {
        payload.analysisBasedResponses = completeResults.analysisBasedResponses;
      }
      if (
        Array.isArray(completeResults.researchBasedResponses) &&
        completeResults.researchBasedResponses.length > 0
      ) {
        payload.researchBasedResponses = completeResults.researchBasedResponses;
      }

      const response = await axios.post(
        `${URL}api/v1/case-studies/submit-responses`,
        payload
      );

      toast.success("Responses submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit responses!");
      console.error("Submission error:", error);
    }
  };

  const completeSimulationWithResponses = (
    updatedFactBased,
    updatedAnalysis,
    updatedResearch
  ) => {
    setIsAITyping(false);

    const completeResults = {
      menteeId,
      facultyCaseAssignId,
      completedAt: new Date().toISOString(),
      factBasedResponses: updatedFactBased,
      analysisBasedResponses: updatedAnalysis,
      researchBasedResponses: updatedResearch,
      maxMarks: maxMarksSummary.total,
      summary: {
        totalQuestions:
          updatedFactBased.length +
          updatedAnalysis.length +
          updatedResearch.length,
        factBasedCount: updatedFactBased.length,
        analysisBasedCount: updatedAnalysis.length,
        researchBasedCount: updatedResearch.length,
        totalFollowUps: updatedAnalysis.reduce(
          (total, response) =>
            total + (response.followUpQuestions?.length || 0),
          0
        ),
        followUpEnabled: followUpEnabled,
        expectedCounts: {
          factBased: parsedQuestions?.factBasedQuestions?.length || 0,
          analysisBased: parsedQuestions?.analysisBasedQuestions?.length || 0,
          researchBased: parsedQuestions?.researchBasedQuestions?.length || 0,
        },
      },
    };

    // Only this log will show on submit
    // console.log("SUBMIT Result:", completeResults);

    // Submit responses to backend
    submitResponses(completeResults);

    setMessages((prev) => [
      ...prev,
      {
        sender: "AI",
        text: "Your responses have been submitted successfully! Redirecting to dashboard...",
      },
    ]);

    setTimeout(() => {
      navigate("/mentee/dashboard");
    }, 3000);
  };

  // --- MAIN LOGIC ---

  const handleAnswer = useCallback(
    (answer) => {
      if (isProcessingAnswer) {
        return;
      }
      setIsProcessingAnswer(true);
      setInputVisible(false);

      setMessages((prev) => [...prev, { sender: "User", text: answer }]);
      const questionArray = getQuestionArray(currentQuestionType);
      const currentQuestion = questionArray[currentQuestionIndex];
      const isLast = isLastQuestion(currentQuestionType, currentQuestionIndex);

      if (currentQuestionType === "factBased") {
        const responseObj = {
          ...currentQuestion,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: currentQuestion.correctAnswer === answer,
          questionIndex: currentQuestionIndex,
          timestamp: new Date().toISOString(),
        };

        setFactBasedResponses((prev) => {
          const newResponses = [...prev, responseObj];
          setTimeout(
            () => {
              setIsProcessingAnswer(false);
              if (isLast) {
                setSimulationComplete(true); // <-- Only set the flag, do not call submit here
              } else {
                proceedToNextQuestion();
              }
            },
            isLast ? 500 : 200
          );
          return newResponses;
        });
      } else if (currentQuestionType === "analyzeBased") {
        const responseObj = {
          ...currentQuestion,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: currentQuestion.correctAnswer === answer,
          followUpQuestions: [],
          questionIndex: currentQuestionIndex,
          timestamp: new Date().toISOString(),
        };

        setAnalysisBasedResponses((prev) => [...prev, responseObj]);
        setPendingAnalysisResponse(responseObj);
        setAnalysisFollowUpLevel(0);
        setTimeout(() => {
          setIsProcessingAnswer(false);
          if (followUpEnabled) {
            // 1st follow-up: analysis question ka data bhejo
            fetchFollowUpQuestionFromBackend({
              id: responseObj.id,
              question: responseObj.Question,
              correctAnswer: responseObj.correctAnswer,
              userAnswer: responseObj.userAnswer,
              followUpLevel: 1,
            });
          } else {
            proceedToNextAnalysisQuestion();
          }
        }, 200);
      } else if (currentQuestionType === "researchBased") {
        const responseObj = {
          ...currentQuestion,
          userAnswer: answer,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: currentQuestion.correctAnswer === answer,
          questionIndex: currentQuestionIndex,
          timestamp: new Date().toISOString(),
        };

        setResearchBasedResponses((prev) => {
          const newResponses = [...prev, responseObj];
          setTimeout(
            () => {
              setIsProcessingAnswer(false);
              if (isLast) {
                setSimulationComplete(true); // <-- Only set the flag, do not call submit here
              } else {
                proceedToNextQuestion();
              }
            },
            isLast ? 500 : 200
          );
          return newResponses;
        });
      }
    },
    [
      currentQuestionType,
      currentQuestionIndex,
      isProcessingAnswer,
      parsedQuestions,
      followUpEnabled,
      // Remove factBasedResponses, analysisBasedResponses, researchBasedResponses from deps
      // to avoid stale closure issues and unnecessary re-renders
    ]
  );

  // Fetch follow-up question from backend
  const fetchFollowUpQuestionFromBackend = async ({
    id,
    question,
    correctAnswer,
    userAnswer,
    followUpLevel,
  }) => {
    setCurrentQuestionType("followUp");
    setAnalysisFollowUpLevel(followUpLevel - 1); // 0 for first, 1 for second
    setIsAITyping(true);

    let followUpQuestionText = "";
    let followUpCorrectAnswer = "";
    try {
      const res = await axios.post(
        `${URL}api/v1/case-studies/generate-follow-up-question`,
        {
          id,
          question,
          correctAnswer,
          userAnswer,
          followUpLevel,
        }
      );
      if (res.data.success && res.data.followUpQuestion) {
        followUpQuestionText = res.data.followUpQuestion.question;
        followUpCorrectAnswer = res.data.followUpQuestion.correctAnswer;

        // console.log("Follow-up question fetched:", followUpQuestionText);
        // console.log("Follow-up correct answer:", followUpCorrectAnswer);
      }
    } catch (e) {}

    // fallback
    if (!followUpQuestionText) {
      if (followUpLevel === 1) {
        followUpQuestionText =
          "Can you explain your reasoning behind this answer in more detail?";
        followUpCorrectAnswer = correctAnswer;
      } else {
        followUpQuestionText =
          "What additional factors should be considered in your analysis?";
        followUpCorrectAnswer = correctAnswer;
      }
    }

    setTimeout(() => {
      setIsAITyping(false);
      setAnalysisFollowUpQuestion({
        id: `FU_${id}_${followUpLevel}`,
        question: followUpQuestionText,
        parentQuestionId: id,
        level: followUpLevel,
        correctAnswer: followUpCorrectAnswer,
      });
      setMessages((prev) => [
        ...prev,
        {
          sender: "AI",
          text: `Follow-up Question ${followUpLevel}/2: ${followUpQuestionText}`,
          isFollowUp: true,
          followUpLevel: followUpLevel,
          questionType: "subjective",
        },
      ]);
      setInputVisible(true);
    }, 800);
  };

  // Handle follow-up answer
  const handleFollowUpAnswer = (answer) => {
    setInputVisible(false);
    const timeSpent = 120; // Placeholder

    setMessages((prev) => [
      ...prev,
      {
        sender: "User",
        text: answer,
        isFollowUpAnswer: true,
      },
    ]);

    const followUpResponseObj = {
      id: analysisFollowUpQuestion.id,
      question: analysisFollowUpQuestion.question,
      userAnswer: answer,
      correctAnswer: analysisFollowUpQuestion.correctAnswer,
      timeSpent,
      isForPractice: true,
      level: analysisFollowUpLevel + 1,
    };

    setAnalysisBasedResponses((prev) =>
      prev.map((response) =>
        response.id === pendingAnalysisResponse.id
          ? {
              ...response,
              followUpQuestions: [
                ...(response.followUpQuestions || []),
                followUpResponseObj,
              ],
            }
          : response
      )
    );

    setPendingAnalysisResponse((prev) => ({
      ...prev,
      followUpQuestions: [
        ...(prev.followUpQuestions || []),
        followUpResponseObj,
      ],
    }));

    // Store 1st follow-up object for 2nd follow-up
    if (analysisFollowUpLevel === 0) {
      setFirstFollowUpObj(followUpResponseObj);
    }

    setIsAITyping(true);
    setTimeout(() => {
      setIsAITyping(false);
      setTimeout(() => {
        if (analysisFollowUpLevel < 1) {
          // 2nd follow-up: send 1st follow-up's data
          if (firstFollowUpObj) {
            fetchFollowUpQuestionFromBackend({
              id: firstFollowUpObj.id,
              question: firstFollowUpObj.question,
              correctAnswer: firstFollowUpObj.correctAnswer,
              userAnswer: firstFollowUpObj.userAnswer,
              followUpLevel: 2,
            });
          } else {
            // fallback: send current follow-up's data (should not happen)
            fetchFollowUpQuestionFromBackend({
              id: analysisFollowUpQuestion.id,
              question: analysisFollowUpQuestion.question,
              correctAnswer: analysisFollowUpQuestion.correctAnswer,
              userAnswer: answer,
              followUpLevel: 2,
            });
          }
        } else {
          setTimeout(() => {
            setFirstFollowUpObj(null); // clear for next analysis question
            proceedToNextAnalysisQuestion();
          }, 800);
        }
      }, 800);
    }, 800);
  };

  const proceedToNextAnalysisQuestion = () => {
    setAnalysisFollowUpLevel(0);
    setAnalysisFollowUpQuestion(null);
    setPendingAnalysisResponse(null);

    const questionArray = getQuestionArray("analyzeBased");
    const nextIndex = currentQuestionIndex + 1;

    if (questionArray && nextIndex < questionArray.length) {
      setCurrentQuestionType("analyzeBased");
      setCurrentQuestionIndex(nextIndex);
      setIsAITyping(false);
      showQuestion("analyzeBased", nextIndex);
    } else {
      moveToNextQuestionType();
    }
  };

  const proceedToNextQuestion = useCallback(() => {
    setIsAITyping(true);
    setTimeout(() => {
      const questionArray = getQuestionArray(currentQuestionType);
      const nextIndex = currentQuestionIndex + 1;

      if (questionArray && nextIndex < questionArray.length) {
        setCurrentQuestionIndex(nextIndex);
        setIsAITyping(false);
        showQuestion(currentQuestionType, nextIndex);
      } else {
        moveToNextQuestionType();
      }
    }, 800);
    // eslint-disable-next-line
  }, [currentQuestionType, currentQuestionIndex]);

  const moveToNextQuestionType = () => {
    let nextQuestionType = null;

    if (currentQuestionType === "factBased") {
      if (
        parsedQuestions.analysisBasedQuestions &&
        parsedQuestions.analysisBasedQuestions.length > 0
      ) {
        nextQuestionType = "analyzeBased";
      } else if (
        parsedQuestions.researchBasedQuestions &&
        parsedQuestions.researchBasedQuestions.length > 0
      ) {
        nextQuestionType = "researchBased";
      }
    } else if (
      currentQuestionType === "analyzeBased" ||
      currentQuestionType === "followUp"
    ) {
      if (
        parsedQuestions.researchBasedQuestions &&
        parsedQuestions.researchBasedQuestions.length > 0
      ) {
        nextQuestionType = "researchBased";
      }
    }

    if (nextQuestionType) {
      setCurrentQuestionType(nextQuestionType);
      setCurrentQuestionIndex(0);
      setIsAITyping(false);
      addTransitionMessage(nextQuestionType); // <-- Add this line
      setTimeout(() => {
        showQuestion(nextQuestionType, 0);
      }, 600);
    } else {
      setSimulationComplete(true); // <-- Only set the flag, do not call submit here
    }
  };

  const handleChatAnswer = (answer) => {
    if (currentQuestionType === "followUp") {
      handleFollowUpAnswer(answer);
    } else {
      handleAnswer(answer);
    }
  };

  const getQuestionTypeForChat = () => {
    if (currentQuestionType === "followUp") {
      return "analyzeBased"; // Show as text input
    } else if (currentQuestionType === "factBased") {
      return "factBased";
    } else {
      return "analyzeBased";
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="main-container">
          <div
            className="loading-container"
            style={{ textAlign: "center", margin: "auto" }}
          >
            <div className="loading-spinner"></div>
            <h3>Loading questions...</h3>
          </div>
        </div>
      </>
    );
  }

  if (!caseStudyData) {
    return (
      <>
        <Navbar />
        <div className="main-container">
          <div className="error-container">
            <h2>No case study data found</h2>
            <button onClick={() => navigate("/mentee/dashboard")}>
              Go to Dashboard
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="main-container">
        <div className="question-page-container">
          <h1 className="question-page-title">Avega</h1>
          <div className="question-page-content">
            <ChatInterface
              messages={messages}
              questionType={getQuestionTypeForChat()}
              onAnswer={handleChatAnswer}
              isAITyping={isAITyping}
              name={menteeFirstname}
              inputVisible={inputVisible}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Simulation;
