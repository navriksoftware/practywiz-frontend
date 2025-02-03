import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatInterface from "../../Components/CaseStudy/PurchasedCaseStudy/ChatInterface";
import "./SimulationPage.css";
import Navbar from "../../Components/Navbar/Navbar";
import { ApiURL } from "../../Utils/ApiURL";

function SimulationPage() {
  const URL = ApiURL();
  const navigate = useNavigate();
  const location = useLocation();
  const { caseStudy } = location.state || {};

  const [parsedQuestions, setParsedQuestions] = useState(null);
  const [analysisQuestions, setAnalysisQuestions] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionType, setQuestionType] = useState("factBased");
  const [userResponses, setUserResponses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isAITyping, setIsAITyping] = useState(false);
  const [followUpCount, setFollowUpCount] = useState(0);
  const [currentAnalysisQuestion, setCurrentAnalysisQuestion] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null); // Added to track current question

  useEffect(() => {
    if (caseStudy?.case_study_id) {
      fetchAnalysisQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy]);

  const fetchAnalysisQuestions = async () => {
    try {
      const response = await fetch(
        `${URL}api/v1/case-studies/generate-questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ case_study_id: caseStudy.case_study_id }),
        }
      );
      const data = await response.json();
      setAnalysisQuestions(data.questions);
    } catch (error) {
      console.error("Error fetching analysis questions:", error);
    }
  };

  const generateFollowUpQuestion = async (question, answer) => {
    try {
      const response = await fetch(
        `${URL}api/v1/case-studies/generate-follow-up-question`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            case_study_id: caseStudy.case_study_id,
            question: currentQuestion, // Using tracked current question
            answer: answer,
          }),
        }
      );
      const data = await response.json();
      return data.followUpQuestion;
    } catch (error) {
      console.error("Error generating follow-up question:", error);
      return null;
    }
  };

  const proceedToNextQuestionOrResult = async (updatedUserResponses) => {
    setIsAITyping(true);

    if (questionType === "factBased") {
      if (
        parsedQuestions &&
        questionIndex + 1 < parsedQuestions[questionType].length
      ) {
        setTimeout(() => {
          setIsAITyping(false);
          const nextIndex = questionIndex + 1;
          setQuestionIndex(nextIndex);
          const nextQuestion = parsedQuestions[questionType][nextIndex];
          setCurrentQuestion(nextQuestion.question);
          setMessages((prev) => [
            ...prev,
            {
              sender: "AI",
              text: nextQuestion.question,
              options: nextQuestion.options,
            },
          ]);
        }, 1000);
      } else if (analysisQuestions && analysisQuestions.length > 0) {
        setQuestionType("analyzeBased");
        setQuestionIndex(0);
        setCurrentAnalysisQuestion(analysisQuestions[0]);
        setFollowUpCount(0);
        setCurrentQuestion(analysisQuestions[0].question);
        setTimeout(() => {
          setIsAITyping(false);
          setMessages((prev) => [
            ...prev,
            {
              sender: "AI",
              text: analysisQuestions[0].question,
            },
          ]);
        }, 1000);
      }
    } else if (questionType === "analyzeBased") {
      const lastUserAnswer =
        updatedUserResponses[updatedUserResponses.length - 1].userAnswer;

      if (followUpCount < 2) {
        const followUpQuestion = await generateFollowUpQuestion(
          currentQuestion,
          lastUserAnswer
        );
        setFollowUpCount((prev) => prev + 1);
        setCurrentQuestion(followUpQuestion); // Update current question with follow-up
        setTimeout(() => {
          setIsAITyping(false);
          setMessages((prev) => [
            ...prev,
            {
              sender: "AI",
              text: followUpQuestion,
            },
          ]);
        }, 1000);
      } else {
        const nextIndex = questionIndex + 1;
        if (nextIndex < analysisQuestions.length) {
          setQuestionIndex(nextIndex);
          setCurrentAnalysisQuestion(analysisQuestions[nextIndex]);
          setFollowUpCount(0);
          setCurrentQuestion(analysisQuestions[nextIndex].question); // Update current question
          setTimeout(() => {
            setIsAITyping(false);
            setMessages((prev) => [
              ...prev,
              {
                sender: "AI",
                text: analysisQuestions[nextIndex].question,
              },
            ]);
          }, 1000);
        } else {
          navigate("/results", {
            state: { responses: updatedUserResponses, caseStudy },
          });
        }
      }
    }
  };

  const handleAnswer = (answer) => {
    let currentQuestionObj;
    if (questionType === "factBased" && parsedQuestions) {
      currentQuestionObj = parsedQuestions[questionType][questionIndex];
    } else if (questionType === "analyzeBased" && currentAnalysisQuestion) {
      currentQuestionObj = currentAnalysisQuestion;
    } else {
      return;
    }

    const isCorrect =
      questionType === "factBased"
        ? answer === currentQuestionObj.correctAnswer
        : true;

    const newResponse = {
      type: questionType,
      question: currentQuestion, // Using tracked current question
      userAnswer: answer,
      isCorrect,
      correctAnswer:
        questionType === "factBased" ? currentQuestionObj.correctAnswer : null,
    };

    const updatedUserResponses = [...userResponses, newResponse];
    setUserResponses(updatedUserResponses);

    setMessages((prev) => [
      ...prev,
      {
        sender: "User",
        text: answer,
      },
    ]);

    proceedToNextQuestionOrResult(updatedUserResponses);
  };

  useEffect(() => {
    if (!caseStudy) {
      navigate("/purchased-case-studies");
      return;
    }
    try {
      const questionsData = JSON.parse(caseStudy.case_study_questions);
      setParsedQuestions(questionsData);
      initializeMessages(questionsData);
    } catch (error) {
      console.error("Error parsing questions:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudy, navigate]);

  const initializeMessages = (questionsData) => {
    if (!questionsData) return;
    const firstQuestion = questionsData[questionType][0];
    setCurrentQuestion(firstQuestion.question);
    const initialMessage = {
      sender: "AI",
      text: firstQuestion.question,
      options: questionType === "factBased" ? firstQuestion.options : null,
    };
    setMessages([initialMessage]);
  };

  return (
    <>
      <Navbar />
      <div className="main-container">
        <div className="case-study-container">
          <h1 className="case-study-title">{caseStudy?.case_study_title}</h1>
          <div className="case-study-content">
            {caseStudy?.case_study_content
              .split("\n")
              .map((line, index) =>
                line.trim() ? <p key={index}>{line}</p> : <br key={index} />
              )}
          </div>
        </div>

        <div className="question-page-container">
          <h1 className="question-page-title">A.I Simulator</h1>
          <div className="question-page-content">
            <ChatInterface
              messages={messages}
              questionType={questionType}
              onAnswer={handleAnswer}
              isAITyping={isAITyping}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SimulationPage;
