
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { BasicInformation } from "./BasicInformation";
import { QuestionsSection } from "./QuestionsSection";
import axios from "axios"; 
import { ApiURL } from "../../../../../Utils/ApiURL";
export const CaseStudyForm = ({setActivePage}) => {


  const url = ApiURL();
  
  // Try to load saved form data from localStorage
  const loadSavedData = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("caseStudyFormData");
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error("Error parsing saved form data:", e);
        }
      }
    }
    return null;
  };

  // Default form data structure
  const defaultFormData = {
    title: "",
    author: "",
    category: "",
    // tags: [],
    questions: [],
  };

  const facultyData = useSelector((state) => state.faculty.facultyDtls);
  const facultyId = facultyData?.faculty_id;

  const [formData, setFormData] = useState(loadSavedData() || defaultFormData);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("caseStudyFormData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: null,
      });
    }
  };

  // ... (other handlers remain unchanged)

  const handleQuestionChange = (questionId, field, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) =>
        question.id === questionId ? { ...question, [field]: value } : question
      ),
    });
  };

  const handleOptionChange = (questionId, optionIndex, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = [...question.options];
          updatedOptions[optionIndex] = value;
          return {
            ...question,
            options: updatedOptions,
          };
        }
        return question;
      }),
    });
  };

  const handleAnswerChange = (questionId, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) =>
        question.id === questionId ? { ...question, answer: value } : question
      ),
    });
  };

  const handleAddQuestion = (category) => {
    // Generate a new question ID in the format "q{number}"
    const newQuestionId = `q${formData.questions.length + 1}`;
    
    let newQuestion = {
      id: newQuestionId,
      category: category,
      question: "",
    };

    // Set default values based on category
    if (category === "fact") {
      newQuestion.question_format = "multiple-choice";
      newQuestion.options = ["", "", "", ""];
      newQuestion.answer = "";
      newQuestion.marks = 1;
    } else if (category === "analysis") {
      newQuestion.question_format = "subjective";
      newQuestion.answer = "";
      newQuestion.marks = 5;
    } else if (category === "research") {
      // For research, we'll default to multiple-choice but it can be changed
      newQuestion.question_format = "multiple-choice";
      newQuestion.options = ["", "", "", ""];
      newQuestion.answer = "";
      newQuestion.marks = 5;
    }

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion],
    });
  };

  const handleRemoveQuestion = (questionId) => {
    // Don't remove if it's the last question
    if (formData.questions.length <= 1) {
      alert("You must have at least one question in your case study.");
      return;
    }

    setFormData({
      ...formData,
      questions: formData.questions.filter(
        (question) => question.id !== questionId
      ),
    });
  };

  const handleQuestionTypeChange = (questionId, newFormat) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) => {
        if (question.id === questionId) {
          if (newFormat === "multiple-choice") {
            return {
              ...question,
              question_format: newFormat,
              options: question.options || ["", "", "", ""],
              answer: "",
            };
          } else {
            // Convert to subjective
            const { options, ...rest } = question;
            return {
              ...rest,
              question_format: newFormat,
              answer: "",
            };
          }
        }
        return question;
      }),
    });
  };

  const handleMarksChange = (questionId, marks) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) =>
        question.id === questionId ? { ...question, marks: parseInt(marks) } : question
      ),
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Case study title is required";
    }

    if (!formData.author.trim()) {
      errors.author = "Author name is required";
    }

    if (!formData.category) {
      errors.category = "Please select a category";
    }

    // Validate questions
    const questionErrors = [];
    formData.questions.forEach((question, index) => {
      const qErrors = {};

      if (!question.question || !question.question.trim()) {
        qErrors.question = "Question text is required";
      }

      if (question.question_format === "multiple-choice") {
        const optionErrors = [];
        let hasEmptyOption = false;

        question.options.forEach((option, optIndex) => {
          if (!option || !option.trim()) {
            hasEmptyOption = true;
            optionErrors[optIndex] = "Option text is required";
          }
        });

        if (hasEmptyOption) {
          qErrors.options = optionErrors;
        }

        if (!question.answer) {
          qErrors.answer = "Please select a correct answer";
        }
      } else if (question.question_format === "subjective") {
        if (!question.answer || !question.answer.trim()) {
          qErrors.answer = "Model answer is required";
        }
      }

      if (Object.keys(qErrors).length > 0) {
        questionErrors[index] = qErrors;
      }
    });

    if (questionErrors.length > 0) {
      errors.questions = questionErrors;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // =========================
  // UPDATED handleSubmit
  // =========================
  const handleSubmit = async (isDraft = false) => {
    // For drafts, save without validation
    if (isDraft) {
      alert("Case study draft saved successfully!");
      return;
    }

    // For publishing, validate the form
    if (!validateForm()) {
      alert("Please fix the errors in the form before publishing.");
      return;
    }

    if (!facultyId) {
      alert("Faculty ID not found. Please login again.");
      return;
    }

    setLoading(true);

    try {
      // Prepare payload as per backend API
      const payload = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        questions: formData.questions,
        facultyId: facultyId,
      };

      // Replace with your actual backend URL
      const response = await axios.post(
        `${url}api/v1/faculty/case-study/add-non-practywiz-case`,
        payload
      );

      if (response.data && response.data.message) {
        alert("Case study published successfully!");
        setFormData(defaultFormData);
        localStorage.removeItem("caseStudyFormData");
        setFormErrors({});
        setActivePage("store")
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Error publishing case study:", error);
      if (error.response && error.response.data && error.response.data.error) {
        alert("Error: " + error.response.data.error);
      } else {
        alert("Failed to publish case study. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="new-case-add-form" onSubmit={(e) => e.preventDefault()}>
      <BasicInformation
        title={formData.title}
        author={formData.author}
        category={formData.category}
        // tags={formData.tags}
        onInputChange={handleInputChange}
        // onTagAdd={handleTagAdd}
        // onTagRemove={handleTagRemove}
        errors={formErrors}
      />

      <QuestionsSection
        questions={formData.questions}
        onQuestionChange={handleQuestionChange}
        onOptionChange={handleOptionChange}
        onAnswerChange={handleAnswerChange}
        onAddQuestion={handleAddQuestion}
        onQuestionTypeChange={handleQuestionTypeChange}
        onRemoveQuestion={handleRemoveQuestion}
        onMarksChange={handleMarksChange}
        errors={formErrors}
      />

      <div className="new-case-add-actions">
        {/* <button
          type="button"
          className="new-case-add-save-draft"
          onClick={() => handleSubmit(true)}
        >
          Save Draft
        </button> */}
        <button
          type="button"
          className="new-case-add-publish"
          onClick={() => handleSubmit(false)}
          disabled={loading}
        >
          {loading ? "Publishing..." : "Publish Case Study"}
        </button>
      </div>
    </form>
  );
};
