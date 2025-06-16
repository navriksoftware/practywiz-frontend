import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { X } from 'lucide-react';
import axios from "axios";
import {
  generateQuestionId,
  validateForm,
  addQuestion,
  updateQuestion,
  removeQuestion,
  addOption,
  removeOption,
  updateOption,
  transformQuestionsForAPI,
} from "./caseStudyUtils";
import "./CaseStudyForm.css";
import { ApiURL } from "../../../../../Utils/ApiURL";
import { toast } from "react-toastify";

const categories = [
  "Management",
  "Marketing",
  "Finance",
  "Operations",
  "Strategy",
  "Ethics",
  "Leadership",
  "Innovation",
];

const defaultFormData = {
  title: "",
  author: "",
  category: "",
  factBasedQuestions: [],
  analysisBasedQuestions: [],
  researchBasedQuestions: [],
};

const CaseStudyForm = ({ setActivePage,showQuestion, setEditQuestion }) => {
  // Get facultyId from Redux
  const facultyData = useSelector((state) => state.faculty.facultyDtls);
  const facultyId = facultyData?.faculty_id;
  console.log("hello this is the data i want to show to the page", showQuestion);
  const url = ApiURL();



  const [formData, setFormData] = useState(() => {
    try {
      if (showQuestion && typeof showQuestion === "object") {
        const {
          non_practywiz_case_title,
          non_practywiz_case_author,
          non_practywiz_case_category,
          non_practywiz_case_question
        } = showQuestion;

        let parsedQuestions = {};
        try {
          parsedQuestions = JSON.parse(non_practywiz_case_question);
        } catch (e) {
          console.error("Failed to parse questions JSON:", e);
        }

        return {
          title: non_practywiz_case_title || "",
          author: non_practywiz_case_author || "",
          category: non_practywiz_case_category || "",
          factBasedQuestions: parsedQuestions.factBasedQuestions || [],
          analysisBasedQuestions: parsedQuestions.analysisBasedQuestions || [],
          researchBasedQuestions: parsedQuestions.researchBasedQuestions || [],
        };
      } else {
        // Fallback to localStorage if no showQuestion is provided
        const saved = localStorage.getItem("caseStudyFormData");
        return saved ? JSON.parse(saved) : defaultFormData;
      }
    } catch (e) {
      console.error("Error initializing form data:", e);
      return defaultFormData;
    }
  });


  const [activeTab, setActiveTab] = useState("fact");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-save to localStorage
  useEffect(() => {

    localStorage.setItem("caseStudyFormData", JSON.stringify(formData));
  }, [formData]);

  // Utility wrappers to pass setFormData
  const handleAddQuestion = (type) => addQuestion(type, setFormData, formData);
  const handleUpdateQuestion = (type, index, field, value) =>
    updateQuestion(type, index, field, value, setFormData, formData);
  const handleRemoveQuestion = (type, index) =>
    removeQuestion(type, index, setFormData, formData);
  const handleAddOption = (type, questionIndex) =>
    addOption(type, questionIndex, setFormData, formData);
  const handleRemoveOption = (type, questionIndex, optionIndex) =>
    removeOption(type, questionIndex, optionIndex, setFormData, formData);
  const handleUpdateOption = (type, questionIndex, optionIndex, value) =>
    updateOption(
      type,
      questionIndex,
      optionIndex,
      value,
      setFormData,
      formData
    );

  const handleValidateForm = () => validateForm(formData, setErrors);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasFact = formData.factBasedQuestions.length > 0;
    const hasAnalysis = formData.analysisBasedQuestions.length > 0;
    if (!hasFact && !hasAnalysis) {
      toast.error(
        "Please add at least one Fact-Based or Analysis-Based question before publishing."
      );
      return;
    }

    if (!handleValidateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setLoading(true);

    try {
      // Prepare API data in the same format as localStorage, but remove options from subjective questions
      const apiData = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        facultyId: facultyId,
        questions: {
          factBasedQuestions: transformQuestionsForAPI(
            formData.factBasedQuestions,
            "fact"
          ),
          analysisBasedQuestions: transformQuestionsForAPI(
            formData.analysisBasedQuestions,
            "analysis"
          ),
          researchBasedQuestions: transformQuestionsForAPI(
            formData.researchBasedQuestions,
            "research"
          ),
        },
      };

      // Remove any unwanted fields if necessary (e.g., loading, errors, etc.)

      // API call
      const response = await axios.post(
        `${url}api/v1/faculty/case-study/add-non-practywiz-case`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Case study published successfully!");

      // Reset form
      setFormData({
        title: "",
        author: "",
        category: "",
        factBasedQuestions: [],
        analysisBasedQuestions: [],
        researchBasedQuestions: [],
      });
      setActivePage("store")

    } catch (error) {
      toast.error("Failed to publish case study");
    } finally {
      setLoading(false);
    }
  };

  // UI: Add a colored badge for question type
  const renderQuestion = (question, type, index) => {
    const prefix = `${type}_${index}`;
    const isFact = type === "fact";
    const isAnalysis = type === "analysis";
    const isResearch = type === "research";

    return (
      <div
        key={question.id}
        className="non-practywiz-case-add-question-card non-practywiz-case-add-enhanced-card"
      >
        <div className="non-practywiz-case-add-question-header">
          <div className="non-practywiz-case-add-question-title">
            <div
              className={`non-practywiz-case-add-question-badge non-practywiz-case-add-badge-${type}`}
            >
              {isFact && "Multiple Choice"}
              {isAnalysis && "Subjective"}
              {isResearch &&
                (question.questionType === "multiple-choice"
                  ? "Multiple Choice"
                  : "Subjective")}
            </div>
            <span>Question {index + 1}</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleRemoveQuestion(type, index)}
              className="non-practywiz-case-add-remove-button"
              title="Remove this question"
            >
              ×
            </button>
          </div>
        </div>

        <div className="non-practywiz-case-add-form-group">
          <label>Question</label>
          <textarea
            value={question.Question}
            onChange={(e) =>
              handleUpdateQuestion(type, index, "Question", e.target.value)
            }
            placeholder="Enter your question..."
            className="non-practywiz-case-add-textarea"
          />
          {errors[`${prefix}_question`] && (
            <span className="non-practywiz-case-add-error">
              {errors[`${prefix}_question`]}
            </span>
          )}
        </div>

        {/* Fact-based: always multiple choice */}
        {isFact && (
          <div className="non-practywiz-case-add-form-group">
            <label>Options</label>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="non-practywiz-case-add-option-row">
                <span className="non-practywiz-case-add-option-index">
                  {String.fromCharCode(65 + optIndex)}.
                </span>
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleUpdateOption(type, index, optIndex, e.target.value)
                  }
                  placeholder={`Option ${optIndex + 1}`}
                  className="non-practywiz-case-add-input"
                />
                {question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(type, index, optIndex)}
                    className="non-practywiz-case-add-small-remove-button"
                    title="Remove option"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            {question.options.length < 6 && (
              <button
                type="button"
                onClick={() => handleAddOption(type, index)}
                className="non-practywiz-case-add-add-option-button"
              >
                + Add Option
              </button>
            )}

            {errors[`${prefix}_options`] && (
              <span className="non-practywiz-case-add-error">
                {errors[`${prefix}_options`]}
              </span>
            )}

            <div className="non-practywiz-case-add-form-group">
              <label>Answer</label>
              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleUpdateQuestion(
                    type,
                    index,
                    "correctAnswer",
                    e.target.value
                  )
                }
                className="non-practywiz-case-add-select"
              >
                <option value="">Select correct answer</option>
                {question.options
                  .filter((opt) => opt.trim())
                  .map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
              {errors[`${prefix}_answer`] && (
                <span className="non-practywiz-case-add-error">
                  {errors[`${prefix}_answer`]}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Analysis-based: always subjective */}
        {isAnalysis && (
          <div className="non-practywiz-case-add-form-group">
            <label>Answer</label>
            <textarea
              value={question.correctAnswer}
              onChange={(e) =>
                handleUpdateQuestion(type, index, "correctAnswer", e.target.value)
              }
              placeholder="Enter the answer..."
              className="non-practywiz-case-add-textarea"
            />
            {errors[`${prefix}_answer`] && (
              <span className="non-practywiz-case-add-error">
                {errors[`${prefix}_answer`]}
              </span>
            )}
          </div>
        )}

        {/* Research-based: allow both formats, but NO correct/model answer */}
        {isResearch && (
          <>
            <div className="non-practywiz-case-add-form-group">
              <label>Question Type</label>
              <select
                value={question.questionType}
                onChange={(e) => {
                  const newFormat = e.target.value;
                  handleUpdateQuestion(
                    type,
                    index,
                    "questionType",
                    newFormat
                  );
                  if (newFormat === "subjective") {
                    handleUpdateQuestion(type, index, "options", []);
                  } else {
                    handleUpdateQuestion(type, index, "options", ["", ""]);
                  }
                }}
                className="non-practywiz-case-add-select"
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="subjective">Subjective</option>
              </select>
            </div>
            {question.questionType === "multiple-choice" && (
              <div className="non-practywiz-case-add-form-group">
                <label>Options</label>
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className="non-practywiz-case-add-option-row"
                  >
                    <span className="non-practywiz-case-add-option-index">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleUpdateOption(
                          type,
                          index,
                          optIndex,
                          e.target.value
                        )
                      }
                      placeholder={`Option ${optIndex + 1}`}
                      className="non-practywiz-case-add-input"
                    />
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveOption(type, index, optIndex)
                        }
                        className="non-practywiz-case-add-small-remove-button"
                        title="Remove option"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}

                {question.options.length < 6 && (
                  <button
                    type="button"
                    onClick={() => handleAddOption(type, index)}
                    className="non-practywiz-case-add-add-option-button"
                  >
                    + Add Option
                  </button>
                )}

                {errors[`${prefix}_options`] && (
                  <span className="non-practywiz-case-add-error">
                    {errors[`${prefix}_options`]}
                  </span>
                )}
              </div>
            )}
            {/* No correct/model answer for research-based */}
          </>
        )}

        {type !== "research" && (
          <div className="non-practywiz-case-add-form-group">
            <label>Maximum Marks</label>
            <input
              type="number"
              min="1"
              value={question.maxMark || ""}
              onChange={(e) =>
                handleUpdateQuestion(
                  type,
                  index,
                  "maxMark",
                  parseInt(e.target.value) || ""
                )
              }
              className="non-practywiz-case-add-input"
            />
            {errors[`${prefix}_marks`] && (
              <span className="non-practywiz-case-add-error">
                {errors[`${prefix}_marks`]}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderQuestionsTab = (type, title) => {
    const questions = formData[`${type}BasedQuestions`];

    return (
      <div className="non-practywiz-case-add-tab-content">
        {questions.map((question, index) =>
          renderQuestion(question, type, index)
        )}

        <button
          type="button"
          onClick={() => handleAddQuestion(type)}
          className="non-practywiz-case-add-add-option-button"
        >
          + Add {title} Question
        </button>
      </div>
    );
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    const hasFact = formData.factBasedQuestions.length > 0;
    const hasAnalysis = formData.analysisBasedQuestions.length > 0;

    // Validation: Ensure at least one question
    if (!hasFact && !hasAnalysis) {
      toast.error(
        "Please add at least one Fact-Based or Analysis-Based question before publishing."
      );
      return;
    }

    // Validate form fields
    if (!handleValidateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);

    try {
      // Prepare the request payload
      const apiData = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        category: formData.category.trim(),
        facultyId: facultyId,
        caseStudyId: showQuestion?.non_practywiz_case_dtls_id,
        questions: {
          factBasedQuestions: transformQuestionsForAPI(
            formData.factBasedQuestions,
            "fact"
          ),
          analysisBasedQuestions: transformQuestionsForAPI(
            formData.analysisBasedQuestions,
            "analysis"
          ),
          researchBasedQuestions: transformQuestionsForAPI(
            formData.researchBasedQuestions,
            "research"
          ),
        },
      };

      // Make the API request
      const response = await axios.post(
        `${url}api/v1/faculty/case-study/add-non-practywiz-case/update`,
        apiData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Case study updated successfully!");

      // Reset form state
      setFormData({
        title: "",
        author: "",
        category: "",
        factBasedQuestions: [],
        analysisBasedQuestions: [],
        researchBasedQuestions: [],
      });

      // Clear saved draft
      localStorage.removeItem("caseStudyFormData");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update the case study. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="non-practywiz-case-add-container">
      {showQuestion && typeof showQuestion === "object" && <div className="Edit-QuestionShow-CloseBtn" onClick={() => {
        setEditQuestion(false)
        localStorage.removeItem("caseStudyFormData");
      }}>  <X size={24} /></div>}
      <div className="non-practywiz-case-add-header">
        <h1>Add New Case Study</h1>
        <p>Create a new non Practywiz case study for students</p>
      </div>

      <div className="non-practywiz-case-add-form">
        <div className="non-practywiz-case-add-section">
          <h2>Basic Information</h2>

          <div className="non-practywiz-case-add-form-group">
            <label>Case Study Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter case study title"
              className="non-practywiz-case-add-input"
            />
            {errors.title && (
              <span className="non-practywiz-case-add-error">
                {errors.title}
              </span>
            )}
          </div>

          <div className="non-practywiz-case-add-form-group">
            <label>Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              placeholder="Enter author name"
              className="non-practywiz-case-add-input"
            />
            {errors.author && (
              <span className="non-practywiz-case-add-error">
                {errors.author}
              </span>
            )}
          </div>

          <div className="non-practywiz-case-add-form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              className="non-practywiz-case-add-select"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="non-practywiz-case-add-error">
                {errors.category}
              </span>
            )}
          </div>
        </div>

        <div className="non-practywiz-case-add-section">
          <h2>Questions</h2>

          <div className="non-practywiz-case-add-tabs">
            <button
              type="button"
              onClick={() => setActiveTab("fact")}
              className={`non-practywiz-case-add-tab${activeTab === "fact" ? " non-practywiz-case-add-active-tab" : ""
                }`}
            >
              Fact-Based
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("analysis")}
              className={`non-practywiz-case-add-tab${activeTab === "analysis"
                ? " non-practywiz-case-add-active-tab"
                : ""
                }`}
            >
              Analysis-Based
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("research")}
              className={`non-practywiz-case-add-tab${activeTab === "research"
                ? " non-practywiz-case-add-active-tab"
                : ""
                }`}
            >
              Research-Based
            </button>
          </div>

          {activeTab === "fact" && renderQuestionsTab("fact", "Fact-Based")}
          {activeTab === "analysis" &&
            renderQuestionsTab("analysis", "Analysis-Based")}
          {activeTab === "research" &&
            renderQuestionsTab("research", "Research-Based")}
        </div>

        {showQuestion && typeof showQuestion === "object" ?
          <div className="non-practywiz-case-add-submit-section">
            <button
              type="button"
              onClick={handleUpdateForm}
              disabled={loading}
              className="non-practywiz-case-add-submit-button"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div> :
          <div className="non-practywiz-case-add-submit-section">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="non-practywiz-case-add-submit-button"
              style={{ opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Publishing..." : "Publish Case Study"}
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default CaseStudyForm;
