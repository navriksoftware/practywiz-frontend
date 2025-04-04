"use client";

import React, { useState, useEffect } from "react";
import { BasicInformation } from "./BasicInformation";
import { QuestionsSection } from "./QuestionsSection";

export const CaseStudyForm = () => {
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
    tags: [],
    questions: [],
  };

  const [formData, setFormData] = useState(loadSavedData() || defaultFormData);
  const [formErrors, setFormErrors] = useState({});

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

  const handleTagAdd = (tag) => {
    if (!formData.tags.includes(tag) && tag.trim() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleQuestionChange = (questionId, field, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) =>
        question.id === questionId ? { ...question, [field]: value } : question
      ),
    });
  };

  const handleOptionChange = (questionId, optionId, value) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) => {
        if (question.id === questionId) {
          return {
            ...question,
            options: question.options.map((option) =>
              option.id === optionId ? { ...option, text: value } : option
            ),
          };
        }
        return question;
      }),
    });
  };

  //   const handleAddOption = (questionId) => {
  //     const nextOptionId = String.fromCharCode(
  //       "A".charCodeAt(0) +
  //         formData.questions.find((q) => q.id === questionId).options.length
  //     );

  //     setFormData({
  //       ...formData,
  //       questions: formData.questions.map((question) => {
  //         if (question.id === questionId) {
  //           return {
  //             ...question,
  //             options: [...question.options, { id: nextOptionId, text: "" }],
  //           };
  //         }
  //         return question;
  //       }),
  //     });
  //   };

  //   const handleRemoveOption = (questionId, optionId) => {
  //     setFormData({
  //       ...formData,
  //       questions: formData.questions.map((question) => {
  //         if (question.id === questionId) {
  //           // Don't remove if there are only 2 options left
  //           if (question.options.length <= 2) {
  //             alert("A multiple choice question must have at least 2 options.");
  //             return question;
  //           }

  //           return {
  //             ...question,
  //             options: question.options
  //               .filter((option) => option.id !== optionId)
  //               // Reindex the options after removal
  //               .map((option, index) => ({
  //                 ...option,
  //                 id: String.fromCharCode("A".charCodeAt(0) + index),
  //               })),
  //           };
  //         }
  //         return question;
  //       }),
  //     });
  //   };

  const handleAddQuestion = (type = "multiple") => {
    const newQuestionId =
      formData.questions.length > 0
        ? Math.max(...formData.questions.map((q) => q.id)) + 1
        : 1;

    const newQuestion = {
      id: newQuestionId,
      text: "",
      type: type,
    };

    if (type === "multiple") {
      newQuestion.options = [
        { id: "A", text: "" },
        { id: "B", text: "" },
        { id: "C", text: "" },
        { id: "D", text: "" },
      ];
    } else {
      newQuestion.answer = "";
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

  const handleQuestionTypeChange = (questionId, type) => {
    setFormData({
      ...formData,
      questions: formData.questions.map((question) => {
        if (question.id === questionId) {
          if (type === "multiple") {
            return {
              ...question,
              type,
              options: question.options || [
                { id: "A", text: "" },
                { id: "B", text: "" },
                { id: "C", text: "" },
                { id: "D", text: "" },
              ],
            };
          } else {
            // Convert to subjective
            const { options, ...rest } = question;
            return {
              ...rest,
              type,
              answer: question.answer || "",
            };
          }
        }
        return question;
      }),
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

      if (!question.text.trim()) {
        qErrors.text = "Question text is required";
      }

      if (question.type === "multiple") {
        const optionErrors = [];
        let hasEmptyOption = false;

        question.options.forEach((option, optIndex) => {
          if (!option.text.trim()) {
            hasEmptyOption = true;
            optionErrors[optIndex] = "Option text is required";
          }
        });

        if (hasEmptyOption) {
          qErrors.options = optionErrors;
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

  const handleSubmit = (isDraft = false) => {
    // For drafts, save without validation
    if (isDraft) {
      console.log("Saving draft:", formData);
      alert("Case study draft saved successfully!");
      return;
    }

    // For publishing, validate the form
    if (!validateForm()) {
      alert("Please fix the errors in the form before publishing.");
      return;
    }

    // In a real application, you would send this data to your backend
    console.log("Publishing case study:", formData);

    // Simulate API call
    setTimeout(() => {
      alert("Case study published successfully!");
      // Clear form after successful submission
      //   if (confirm("Would you like to create another case study?")) {
      //     setFormData(defaultFormData);
      //   }
    }, 1000);
  };

  return (
    <form className="new-case-add-form" onSubmit={(e) => e.preventDefault()}>
      <BasicInformation
        title={formData.title}
        author={formData.author}
        category={formData.category}
        tags={formData.tags}
        onInputChange={handleInputChange}
        onTagAdd={handleTagAdd}
        onTagRemove={handleTagRemove}
        errors={formErrors}
      />

      <QuestionsSection
        questions={formData.questions}
        onQuestionChange={handleQuestionChange}
        onOptionChange={handleOptionChange}
        // onAddOption={handleAddOption}
        // onRemoveOption={handleRemoveOption}
        onAddQuestion={handleAddQuestion}
        onQuestionTypeChange={handleQuestionTypeChange}
        onRemoveQuestion={handleRemoveQuestion}
      />

      <div className="new-case-add-actions">
        <button
          type="button"
          className="new-case-add-save-draft"
          onClick={() => handleSubmit(true)}
        >
          Save Draft
        </button>
        <button
          type="button"
          className="new-case-add-publish"
          onClick={() => handleSubmit(false)}
        >
          Publish Case Study
        </button>
      </div>
    </form>
  );
};
